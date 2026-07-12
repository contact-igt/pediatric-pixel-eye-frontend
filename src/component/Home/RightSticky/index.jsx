"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import Button from "@/common/Button";
import { useRouter } from "next/router";
import { submitPediatricLead } from "@/lib/leadSubmission";

const RightSticky = ({ isEmbedded }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    PatientName: "",
    MobileNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.MobileNumber) {
      setError("Mobile number is required.");
      return;
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.MobileNumber)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await submitPediatricLead({
        patientName: formData?.PatientName || "",
        mobileNumber: formData.MobileNumber,
      });
      setLoading(false);
      router.push("/thank-you");
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };
  return (
    <div className={isEmbedded ? "" : "container-lg my-3 p-0"}>
      <div className={`card ${styles.card} shadow-lg border-0 p-4`}>
        <h4 className="fw-semibold mb-4" style={{ color: "#2A3B77" }}>
          Book <br className="d-none d-lg-bock" /> Consultation
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              name="PatientName"
              type="text"
              onChange={handleChange}
              className="form-control rounded-3 py-3"
              placeholder="Patient Name (Optional)"
            />
          </div>

          <div className="mb-1 input-group">
            <span className="input-group-text bg-light border-end-0 rounded-start-3 py-3">
              +91
            </span>
            <input
              name="MobileNumber"
              type="tel"
              onChange={handleChange}
              className="form-control border-start-0 rounded-end-3"
              placeholder="Mobile Number"
            />
          </div>
          {error && <p className="mt-2" style={{ color: "#ff6f61" }}>{error}</p>}
          <div className="d-grid mt-4">
            <Button disabled={loading} name={loading ? "Booking..." : "Book Now"} bgcolor="#ff6f61" txtcolor="#fff" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RightSticky;
