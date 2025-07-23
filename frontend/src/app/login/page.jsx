"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Login failed");
        return;
      }

      // Save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Refresh and redirect
      router.refresh(); // Force re-render of client components (like Header)
      router.push("/"); // Redirect to homepage
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-lg overflow-hidden shadow-xl border border-gray-200">
        {/* Left Side Illustration */}
        <div className="md:w-1/2 bg-green-100 relative p-10 flex flex-col justify-center z-10">
          <blockquote className="text-white text-lg font-medium leading-relaxed max-w-md z-10">
            <span className="text-xl font-bold">“</span>
            Empowering food sustainability — login to make a difference.
            <span className="text-xl font-bold">”</span>
          </blockquote>

          <div className="w-72 h-auto mt-10 z-10">
            <Image
              src="/images/login.jpg"
              alt="Food Login Illustration"
              width={400}
              height={400}
              className="object-contain"
              priority
            />
          </div>

          <div className="absolute top-0 left-0 h-full w-full bg-[#089B23] rounded-tr-[100px] rounded-br-[400px] z-0 pointer-events-none" />
        </div>

        {/* Right Side Login Form */}
        <div className="md:w-1/2 bg-white p-10 z-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Welcome Back
          </h2>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#089B23]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#089B23]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {errorMsg && (
              <p className="text-red-600 text-sm text-center">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#089B23] hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow transition duration-300"
            >
              Login
            </button>

            <p className="text-sm text-center mt-4 text-gray-700">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
