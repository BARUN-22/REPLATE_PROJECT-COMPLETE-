"use client";

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

export default function DonationPage() {
  // Copy of your Header component inside the same file
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
              {/* About Us */}
              <Link
                href="/AboutUs"
                className="hover:text-yellow-500 cursor-pointer transition duration-200 font-semibold"
              >
                About Us
              </Link>

              {/* Our Products */}
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

              {/* Contact */}
              <span className="hover:text-yellow-500 cursor-pointer transition duration-200 font-semibold">
                Contact
              </span>

              {/* Menu */}
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

            {/* Login/Signup Button */}
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

  // Main return
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Header />

      <main className="flex flex-col md:flex-row bg-white max-w-5xl w-full mt-24 p-4">
        {/* Left: Form */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Donate Food, Change Lives</h2>
          <form className="space-y-3">
            <input type="text" placeholder="Full name" className="border p-2 w-full rounded" />
            <input type="email" placeholder="Email" className="border p-2 w-full rounded" />
            <input type="tel" placeholder="Phone Number" className="border p-2 w-full rounded" />
            <input type="date" placeholder="Pickup Date" className="border p-2 w-full rounded" />
            <input type="text" placeholder="Address" className="border p-2 w-full rounded" />
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              I confirm that the donated food items are in good condition and safe for consumption
            </label>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
              Donate Food
            </button>
          </form>
        </div>

        {/* Right: Image */}
        <div className="flex-1 mt-6 md:mt-0 md:ml-6 flex justify-center">
          <img src="/images/donate-here.jpg" alt="Donate Here" className="rounded max-w-xs" />
        </div>
      </main>
    </div>
  );
}