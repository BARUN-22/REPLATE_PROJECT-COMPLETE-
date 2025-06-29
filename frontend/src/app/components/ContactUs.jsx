"use client";

import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="bg-black text-white relative overflow-hidden py-20 px-4">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('/images/contact.jpg')",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Section: Contact Info */}
        <div className="space-y-10 px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-gray-300 max-w-md">
            We'd love to hear from you! Whether you're a food donor, volunteer,
            or someone in need—connect with us today and help us reduce food
            waste and feed hope.
          </p>

          {/* Address */}
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-green-400 mt-1" size={20} />
            <div>
              <h4 className="font-semibold text-lg">ADDRESS</h4>
              <p className="text-gray-300">Jagmohan Nagar, Bhubaneswar</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-green-400 mt-1" size={20} />
            <div>
              <h4 className="font-semibold text-lg">PHONE</h4>
              <p className="text-gray-300">700-838-8686</p>
              <p className="text-gray-300">768-388-4727</p>
              <p className="text-gray-300">889-369-9237</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <FaEnvelope className="text-green-400 mt-1" size={20} />
            <div>
              <h4 className="font-semibold text-lg">EMAIL</h4>
              <p className="text-gray-300">replate65@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-black w-full">
          <h3 className="text-xl font-semibold mb-4 text-center uppercase">
            Send Message
          </h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
            />
            <textarea
              rows={4}
              placeholder="Type your message"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
