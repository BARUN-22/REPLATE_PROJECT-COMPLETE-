"use client";

import { useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function CommunityConnection() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");

  const Header = () => {
    return (
      <header className="bg-white shadow-md h-20 fixed top-0 w-full z-50 px-2">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto h-full">
          <div className="flex items-center gap-2 mt-1">
            <Image
              src="/images/logo1.png"
              alt="Re-Plate Logo"
              width={180}
              height={180}
              priority
            />
          </div>

          <div className="flex items-center gap-10 pr-4">
            <nav className="flex items-center gap-10 text-gray-700 font-medium">
              <Link
                href="/AboutUs"
                className="hover:text-yellow-500 cursor-pointer transition duration-200 font-semibold"
              >
                About Us
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 hover:text-yellow-500 transition duration-200">
                  Our Products <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white rounded-md shadow-lg mt-2 p-2">
                  <DropdownMenuItem className="px-4 py-2 hover:bg-yellow-100 hover:scale-105 transition rounded text-sm font-semibold text-gray-700 cursor-pointer">
                    Food Donation Portal
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-4 py-2 hover:bg-yellow-100 hover:scale-105 transition rounded text-sm font-semibold text-gray-700 cursor-pointer">
                    AI-Powered Recipe Generator
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-4 py-2 hover:bg-yellow-100 hover:scale-105 transition rounded text-sm font-semibold text-gray-700 cursor-pointer">
                    Impact Tracker
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-4 py-2 hover:bg-yellow-100 hover:scale-105 transition rounded text-sm font-semibold text-gray-700 cursor-pointer">
                    NGO & Volunteer Hub
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <span className="hover:text-yellow-500 cursor-pointer transition duration-200 font-semibold">
                Contact
              </span>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 hover:text-yellow-500 transition duration-200">
                  Menu <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white rounded-md shadow-lg mt-2 p-2">
                  <DropdownMenuItem className="px-4 py-2 hover:bg-yellow-100 hover:scale-105 transition rounded text-sm font-semibold text-gray-700 cursor-pointer">
                    Item 1
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-4 py-2 hover:bg-yellow-100 hover:scale-105 transition rounded text-sm font-semibold text-gray-700 cursor-pointer">
                    Item 2
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            <Button
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold uppercase px-5 py-2 rounded-full text-sm shadow-md transition duration-300"
              variant={undefined}
              size={undefined}
            >
              Login / Signup
            </Button>
          </div>
        </div>
      </header>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Post created:", { title, description, label });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Header />

      <main className="flex flex-col flex-1 justify-center items-center p-4 w-full mt-24 space-y-6">
        {/* New heading */}
        <h1 className="text-3xl font-black tracking-widest text-center">Community Hub</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl space-y-4 border"
        >
          <h2 className="text-xl font-semibold text-green-700">Create a New Post</h2>
          <div>
            <label className="block mb-1 text-gray-700">Title:</label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Description:</label>
            <textarea
              placeholder="Enter your description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Label:</label>
            <input
              type="text"
              placeholder="e.g., Recipe, Tips"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}