"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      alert("Signup successful! Please log in.");
      router.push("/login");

    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-lg overflow-hidden shadow-xl border border-gray-200">
        
        {/* Left Illustration */}
        <div className="md:w-1/2 bg-green-100 relative p-10 flex flex-col justify-center z-10">
          <blockquote className="text-white text-lg font-medium leading-relaxed max-w-md z-10">
            <span className="text-xl font-bold">“</span>
            At Re-Plate, we're committed to reducing food waste and feeding those in need — one plate at a time.
            <span className="text-xl font-bold">”</span>
          </blockquote>

          <div className="w-72 h-auto mt-10 z-10">
            <Image
              src="/images/login.jpg"
              alt="Food Donation Illustration"
              width={400}
              height={400}
              className="object-contain"
              priority
            />
          </div>

          <div className="absolute top-0 left-0 h-full w-full bg-[#089B23] rounded-tr-[100px] rounded-br-[400px] z-0 pointer-events-none" />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 bg-white p-10 z-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Create your account
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form className="space-y-5" onSubmit={handleSignup}>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#089B23]"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#089B23]"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create your password"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#089B23]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#089B23] hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow transition duration-300"
            >
              Sign Up
            </button>
            <p className="text-sm text-center mt-4 text-gray-700">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
