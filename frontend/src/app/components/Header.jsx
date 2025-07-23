'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Menu, X, Sun, Moon, LogOut } from 'lucide-react';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const mobileNavRef = useRef(null);

  // Close mobile nav on ESC or click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target)) {
        setIsMobileNavOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMobileNavOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const darkModePreference = localStorage.getItem('darkMode') === 'true';

    if (token && user) {
      setIsAuthenticated(true);
      setUserName(user.username || 'User');
    }
    if (darkModePreference) {
      document.body.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    document.body.classList.toggle('dark', newMode);
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md h-16 sm:h-20 fixed top-0 w-full z-50 px-2 sm:px-4">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto h-full">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" passHref>
            <Image
              src="/images/logo1.png"
              alt="Re-Plate Logo"
              width={140}
              height={140}
              priority
              className="w-28 sm:w-40 h-auto"
            />
          </Link>
        </div>

        {/* Desktop: Navigation + Auth (right side) */}
        <div className="hidden md:flex items-center gap-6 xl:gap-8">
          <nav className="flex items-center gap-6 xl:gap-8 text-gray-700 dark:text-gray-200 font-medium">
    
            <Link
              href="/AboutUs"
              className="hover:text-yellow-500 transition-colors duration-200 font-semibold text-sm sm:text-base"
            >
              About Us
            </Link>

            {/* Updated Products Dropdown – ALL Links */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-yellow-500 transition-colors duration-200 text-sm sm:text-base">
                Our Products <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                sideOffset={8}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-2 p-2 min-w-[200px] animate-in fade-in-80 slide-in-from-top-2 data-[side=left]:slide-in-from-right-2"
              >
                <DropdownMenuItem asChild>
                  <Link
                    href="/donate"
                    className="block px-4 py-2 hover:bg-yellow-100/50 dark:hover:bg-gray-700 rounded text-sm font-semibold text-gray-700 dark:text-white cursor-pointer transition-colors"
                  >
                    Food Donation Portal
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/recipe"
                    className="block px  -4 py-2 hover:bg-yellow-100/50 dark:hover:bg-gray-700 rounded text-sm font-semibold text-gray-700 dark:text-white cursor-pointer transition-colors"
                  >
                    AI-Powered Recipe Generator
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/track-impact"
                    className="block px-4 py-2 hover:bg-yellow-100/50 dark:hover:bg-gray-700 rounded text-sm font-semibold text-gray-700 dark:text-white cursor-pointer transition-colors"
                  >
                    Impact Tracker
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/community"
                    className="block px-4 py-2 hover:bg-yellow-100/50 dark:hover:bg-gray-700 rounded text-sm font-semibold text-gray-700 dark:text-white cursor-pointer transition-colors"
                  >
                    Community Hub
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/contact"
              className="hover:text-yellow-500 transition-colors duration-200 font-semibold text-sm sm:text-base"
            >
              Contact
            </Link>
          </nav>

          {/* Profile/Login & Dark Mode */}
          {!isAuthenticated ? (
            <Link href="/signup">
              <button
                aria-label="Login or Signup"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold uppercase px-4 py-2 rounded-full text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02]"
              >
                Login / Signup
              </button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold uppercase px-4 py-2 rounded-full text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02]">
                  Profile
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                sideOffset={8}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-2 p-2 min-w-[160px] animate-in fade-in-80 slide-in-from-top-2"
              >
                <DropdownMenuItem
                  className="text-gray-600 dark:text-white font-semibold text-sm cursor-default px-4 py-2 flex items-center gap-2"
                  inset={undefined}
                >
                  <Image
                    src="/images/logo1.png"
                    alt="Re-Plate Logo"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  {userName}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={toggleDarkMode}
                  className="px-4 py-2 hover:bg-yellow-100/50 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-white cursor-pointer text-sm flex items-center gap-2 transition-colors"
                  inset={undefined}
                >
                  {isDarkMode ? (
                    <>
                      <Sun size={16} /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon size={16} /> Dark Mode
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="px-4 py-2 text-red-600 hover:bg-red-50/50 dark:hover:bg-gray-700 rounded cursor-pointer text-sm flex items-center gap-2 transition-colors"
                  inset={undefined}
                >
                  <LogOut size={16} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-3">
          {!isAuthenticated ? (
            <Link href="/signup">
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold uppercase px-3 py-1.5 rounded-full text-xs shadow-md transition-all">
                Login
              </button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold uppercase px-3 py-1.5 rounded-full text-xs shadow-md transition-all">
                  Profile
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-white dark:bg-gray-800 rounded-md shadow-lg mt-2 p-2 min-w-[160px] animate-in fade-in-80"
                sideOffset={8}
              >
                <DropdownMenuItem
                  className="text-gray-600 dark:text-white font-semibold text-sm cursor-default px-4 py-2 flex items-center gap-2"
                  inset={undefined}
                >
                  <Image
                    src="/images/logo1.png"
                    alt="Re-Plate Logo"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  {userName}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={toggleDarkMode}
                  className="px-4 py-2 hover:bg-yellow-100/50 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-white cursor-pointer text-sm flex items-center gap-2 transition-colors"
                  inset={undefined}
                >
                  {isDarkMode ? (
                    <>
                      <Sun size={16} /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon size={16} /> Dark Mode
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="px-4 py-2 text-red-600 hover:bg-red-50/50 dark:hover:bg-gray-700 rounded cursor-pointer text-sm flex items-center gap-2 transition-colors"
                  inset={undefined}
                >
                  <LogOut size={16} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <button
            onClick={toggleMobileNav}
            aria-label="Toggle menu"
            className="p-1.5 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm z-40 md:hidden transition-opacity">
          <div
            ref={mobileNavRef}
            className={`fixed top-16 right-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 ease-in-out ${
              isMobileNavOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="overflow-y-auto h-full py-6 px-6">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-bold dark:text-white">Menu</h3>
              </div>
              <nav className="space-y-4 mt-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    About Us
                  </h3>
                  <Link
                    href="/about/our-story"
                    onClick={toggleMobileNav}
                    className="block py-2 px-3 hover:bg-yellow-50/50 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    Our Story
                  </Link>
                  <Link
                    href="/about/mission"
                    onClick={toggleMobileNav}
                    className="block py-2 px-3 hover:bg-yellow-50/50 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    Mission & Vision
                  </Link>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Our Products
                  </h3>
                  <Link
                    href="/products/donation-portal"
                    onClick={toggleMobileNav}
                    className="block py-2 px-3 hover:bg-yellow-50/50 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    Food Donation Portal
                  </Link>
                  <Link
                    href="/products/recipe-generator"
                    onClick={toggleMobileNav}
                    className="block py-2 px-3 hover:bg-yellow-50/50 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    AI-Powered Recipe Generator
                  </Link>
                  <Link
                    href="/products/impact-tracker"
                    onClick={toggleMobileNav}
                    className="block py-2 px-3 hover:bg-yellow-50/50 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    Impact Tracker
                  </Link>
                  <Link
                    href="/products/ngo-hub"
                    onClick={toggleMobileNav}
                    className="block py-2 px-3 hover:bg-yellow-50/50 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    NGO & Volunteer Hub
                  </Link>
                </div>
                <Link
                  href="/contact"
                  onClick={toggleMobileNav}
                  className="block py-2 px-3 text-gray-7w00 dark:text-gray-200 hover:bg-yellow-50/50 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
