import emailjs from "emailjs-com";

async function getIpAddress() {
  try {
    const ipResponse = await fetch("https://api.ipify.org?format=json");

    if (!ipResponse.ok) {
      return "";
    }

    const ipData = await ipResponse.json();
    return ipData?.ip || "";
  } catch (error) {
    console.error("IP lookup failed", error);
    return "";
  }
}

function getUtmSource() {
  if (typeof window === "undefined") {
    return "direct";
  }

  try {
    return localStorage.getItem("utm_source") || "direct";
  } catch (error) {
    return "direct";
  }
}

async function submitLeadToPrimaryApi(payload) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not configured.");
  }

  const response = await fetch(
    `${backendUrl}/api/v1/pixeleye/website-leads/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client-Key": process.env.NEXT_PUBLIC_CLIENT_KEY || "pixeleye",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Primary lead API failed with ${response.status}: ${errorText || "Unknown error"}`
    );
  }

  return response;
}

async function submitLeadToGoogleScript({
  patientName,
  mobileNumber,
  ipAddress,
  utmSource,
}) {
  const googleScriptUrl =
    process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;

  await fetch(googleScriptUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      PatientName: patientName,
      MobileNumber: mobileNumber,
      IP_Address: ipAddress,
      utm_source: utmSource,
    }).toString(),
  });
}

async function sendLeadEmail({ patientName, mobileNumber }) {
  await emailjs.send(
    "service_9ka2q7j",
    "template_88icron",
    {
      patient_name: patientName || "Guest Patient",
      mobile_number: mobileNumber,
      service_name: "Pediatric Eye Care",
      email_subject: "Pediatric Eye Care",
      from_name: "Pixel Eye Hospitals",
      from_email: "info@pixeleyehospitals.com",
    },
    "CNcEBk9-YnTm2Zwor"
  );
}

export async function submitPediatricLead({ patientName, mobileNumber }) {
  const ipAddress = await getIpAddress();
  const utmSource = getUtmSource();

  const primaryPayload = {
    name: patientName,
    mobile_number: mobileNumber,
    service: "Pediatric",
    ip_address: ipAddress,
    utm_source: utmSource,
  };

  try {
    await submitLeadToPrimaryApi(primaryPayload);
  } catch (primaryError) {
    console.error(
      "Primary lead API failed. Falling back to Google Apps Script.",
      primaryError
    );
    await submitLeadToGoogleScript({
      patientName,
      mobileNumber,
      ipAddress,
      utmSource,
    });
  }

  await sendLeadEmail({ patientName, mobileNumber });
}
