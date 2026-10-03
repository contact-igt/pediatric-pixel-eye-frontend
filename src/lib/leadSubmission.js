const SERVICE_NAME = "Pediatric";
const SOURCE_KEY = "pediatric";

// Fallback only: used when the backend API call fails.
const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzG-ZMTUI44rNY7i80bvBVcA6UFPdi95c-2HKZ4ZmI2NJWyWZpKsYV9V9HqlMBjyhF1/exec";

// Base URL may be given with or without the /api/v1 suffix.
const buildBackendLeadUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not configured.");
  }

  const apiBase = `${baseUrl.replace(/\/+(api\/v1)?\/*$/, "")}/api/v1`;
  return `${apiBase}/pixeleye/website-leads/register`;
};

const getIpAddress = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    if (!response.ok) return "";
    const data = await response.json();
    return data?.ip || "";
  } catch (error) {
    console.error("IP lookup failed, continuing without IP address", error);
    return "";
  }
};

const submitToBackend = async ({ name, mobile, ipAddress, utmSource }) => {
  const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY?.trim() || "pixeleye";

  const response = await fetch(buildBackendLeadUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Client-Key": clientKey,
    },
    body: JSON.stringify({
      name: name || "Guest Patient",
      mobile_number: mobile,
      service: SERVICE_NAME,
      source_key: SOURCE_KEY,
      ip_address: ipAddress,
      utm_source: utmSource,
    }),
  });

  if (!response.ok) {
    throw new Error(`Backend submit failed with status ${response.status}`);
  }
};

const submitToGoogleAppsScript = async ({ name, mobile, ipAddress, utmSource }) => {
  await fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      PatientName: name,
      MobileNumber: mobile,
      IP_Address: ipAddress,
      utm_source: utmSource,
    }).toString(),
  });
};

// The backend saves the lead and mirrors it to the Google Sheet itself, so
// the Apps Script is only called when the backend call fails.
export const submitLeadWithFallback = async ({ name, mobile }) => {
  const ipAddress = await getIpAddress();
  const utmSource = localStorage.getItem("utm_source") || "";
  const lead = { name, mobile, ipAddress, utmSource };

  try {
    await submitToBackend(lead);
    return { submittedVia: "backend" };
  } catch (backendError) {
    console.error(
      "Backend submit failed, falling back to Google Apps Script",
      backendError,
    );

    await submitToGoogleAppsScript(lead);
    return { submittedVia: "google-apps-script" };
  }
};
