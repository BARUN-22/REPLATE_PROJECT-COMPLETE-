"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-md h-20 fixed top-0 w-full z-50 px-2">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto h-full">
        {/* Logo */}
        <div className="flex items-center gap-2 mt-1">
          <Image
            src="/images/logo1.png"
            alt="Re-Plate Logo"
            width={180}
            height={180}
            priority
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-10 pr-4">
          <nav className="flex items-center gap-10 text-gray-700 font-medium">
            {/* About Us */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-yellow-500 transition duration-200">
                About Us <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white rounded-md shadow-lg mt-2 p-2">
                <DropdownMenuItem className="px-4 py-2 hover:bg-yellow-100 hover:scale-105 transition rounded text-sm font-semibold text-gray-700 cursor-pointer">
                  Our Story
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-2 hover:bg-yellow-100 hover:scale-105 transition rounded text-sm font-semibold text-gray-700 cursor-pointer">
                  Mission & Vision
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
          </nav>

          {/* Login/Signup Button — goes to signup first */}
          <Link href="/signup">
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold uppercase px-5 py-2 rounded-full text-sm shadow-md transition duration-300">
              Login / Signup
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
