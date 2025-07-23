'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export default function CommunityConnection() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [label, setLabel] = useState('');
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchPosts();

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const darkModePref = localStorage.getItem('darkMode') === 'true';

    if (token && user) {
      setIsAuthenticated(true);
      setUserName(user.username || 'User');
    }
    if (darkModePref) {
      document.body.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/community');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { title, description, label };
    const url = editingPostId
      ? `http://localhost:8080/api/community/${editingPostId}`
      : 'http://localhost:8080/api/community';
    const method = editingPostId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setTitle('');
      setDescription('');
      setLabel('');
      setEditingPostId(null);
      fetchPosts();
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setDescription(post.description);
    setLabel(post.label);
    setEditingPostId(post._id);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:8080/api/community/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) fetchPosts();
  };

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

  const Header = () => (
    <header className="bg-white dark:bg-gray-900 shadow-md h-20 fixed top-0 w-full z-50 px-2">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto h-full">
        <div className="flex items-center gap-2 mt-1">
          <Link href="/" passHref>
            <Image
              src="/images/logo1.png"
              alt="Re-Plate Logo"
              width={180}
              height={180}
              priority
            />
          </Link>
        </div>

        <div className="flex items-center gap-10 pr-4">
          <nav className="flex items-center gap-10 text-gray-700 dark:text-gray-200 font-medium">
            <Link
              href="/about"
              className="hover:text-yellow-500 cursor-pointer transition duration-200 font-semibold"
            >
              About Us
            </Link>

            {/* Updated Products Dropdown – ALL Links */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-yellow-500 transition duration-200">
                Our Products <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white dark:bg-gray-800 rounded-md shadow-lg mt-2 p-2 min-w-[200px]">
                <DropdownMenuItem asChild>
                  <Link
                    href="/donate"
                    className="block px-4 py-2 hover:bg-yellow-100 dark:hover:bg-gray-700 rounded text-sm font-semibold text-gray-700 dark:text-white cursor-pointer transition-colors"
                  >
                    Food Donation Portal
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/recipe"
                    className="block px-4 py-2 hover:bg-yellow-100 dark:hover:bg-gray-700 rounded text-sm font-semibold text-gray-700 dark:text-white cursor-pointer transition-colors"
                  >
                    AI-Powered Recipe Generator
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/track-impact"
                    className="block px-4 py-2 hover:bg-yellow-100 dark:hover:bg-gray-700 rounded text-sm font-semibold text-gray-700 dark:text-white cursor-pointer transition-colors"
                  >
                    Impact Tracker
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/community"
                    className="block px-4 py-2 hover:bg-yellow-100 dark:hover:bg-gray-700 rounded text-sm font-semibold text-gray-700 dark:text-white cursor-pointer transition-colors"
                  >
                    NGO & Volunteer Hub
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/contact"
              className="hover:text-yellow-500 cursor-pointer transition duration-200 font-semibold"
            >
              Contact
            </Link>
          </nav>

          {/* Profile/Login & Dark Mode */}
          {!isAuthenticated ? (
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold uppercase px-5 py-2 rounded-full text-sm shadow-md transition duration-300">
                Login / Signup
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-6w00 text-white font-bold uppercase px-5 py-2 rounded-full text-sm shadow-md transition duration-300">
                  Profile
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white dark:bg-gray-800 rounded-md shadow-lg mt-2 p-2 min-w-[160px]">
                <DropdownMenuItem className="text-gray-600 dark:text-white font-semibold text-sm cursor-default px-4 py-2">
                  {userName}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={toggleDarkMode}
                  className="px-4 py-2 hover:bg-yellow-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white rounded cursor-pointer text-sm"
                >
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded cursor-pointer text-sm"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
//gjnkmjkvgdch
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center">
      <Header />
      <main className="flex flex-col flex-1 justify-center items-center p-4 w-full mt-24 space-y-6">
        <h1 className="text-3xl font-black tracking-widest text-center text-gray-800 dark:text-white">
          Community Hub
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-2xl space-y-4 border"
        >
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-400">
            Create a New Post
          </h2>
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Title:</label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Description:</label>
            <textarea
              placeholder="Enter your description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-7w00 dark:text-white"
            ></textarea>
          </div>
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Label:</label>
            <input
              type="text"
              placeholder="e.g., Recipe, Tips"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {editingPostId ? 'Update Post' : 'Submit'}
          </button>
        </form>

        <div className="w-full max-w-3xl mt-6">
          <h3 className="text-2xl font-semibold mb-4 dark:text-white">All Community Posts</h3>
          {posts.map((post) => (
            <div
              key={post._id}
              className="border rounded-lg shadow-sm p-4 mb-4 bg-gray-50 dark:bg-gray-800"
            >
              <h4 className="text-lg font-bold text-gray-800 dark:text-yellow-400">
                {post.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{post.description}</p>
              <p className="text-xs text-green-700 dark:text-green-400 font-medium">
                Label: {post.label}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-600 dark:text-red-400 text-sm font-semibold hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
