"use client";

import React, { useState } from "react";
import Header from "../components/Header";

export default function DonationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    pickupDate: "",
    address: "",
    confirmed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/donate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");

      alert("✅ Donation submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        pickupDate: "",
        address: "",
        confirmed: false,
      });
    } catch (err) {
      alert("❌ Error submitting donation: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Header />

      <main className="flex flex-col md:flex-row max-w-5xl w-full mt-24 p-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4 text-green-700">
            Donate Food, Change Lives
          </h2>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              name="fullName"
              type="text"
              placeholder="Full name"
              value={formData.fullName}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
            <input
              name="pickupDate"
              type="date"
              value={formData.pickupDate}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
            <input
              name="address"
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                name="confirmed"
                checked={formData.confirmed}
                onChange={handleChange}
                className="mr-2"
              />
              I confirm that the donated food items are in good condition
            </label>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Donate Food
            </button>
          </form>
        </div>

        <div className="flex-1 mt-6 md:mt-0 md:ml-6 flex justify-center">
          <img
            src="/images/donate-here.jpg"
            alt="Donate Here"
            className="rounded max-w-xs"
          />
        </div>
      </main>
    </div>
  );
}
