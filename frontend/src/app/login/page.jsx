"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-lg overflow-hidden shadow-xl border border-gray-200">
        
        {/* Left Side Illustration */}
        <div className="md:w-1/2 bg-green-100 relative p-10 flex flex-col justify-center z-10">
          <blockquote className="text-white text-lg font-medium leading-relaxed max-w-md z-10">
            <span className="text-xl font-bold">“</span>
            Empower communities by reducing food waste — log in and join the movement!
            <span className="text-xl font-bold">”</span>
          </blockquote>

          <div className="w-72 h-auto mt-10 z-10">
            <Image
              src="/images/login.jpg"
              alt="Login Illustration"
              width={400}
              height={400}
              className="object-contain"
              priority
            />
          </div>

          {/* Curved Background */}
          <div className="absolute top-0 left-0 h-full w-full bg-[#089B23] rounded-tr-[100px] rounded-br-[400px] z-0 pointer-events-none" />
        </div>

        {/* Right Side Login Form */}
        <div className="md:w-1/2 bg-white p-10 z-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Welcome Back
          </h2>
          <form className="space-y-5">
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#089B23]"
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
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#089B23] hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow transition duration-300"
            >
              Log In
            </button>
            <p className="text-sm text-center mt-4 text-gray-700">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
