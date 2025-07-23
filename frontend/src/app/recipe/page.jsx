'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Moon, Sun } from 'lucide-react';

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState([""]);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
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

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    document.body.classList.toggle('dark', newMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    router.push('/');
  };

  const Header = () => (
    <header className="bg-white dark:bg-gray-900 shadow-md h-20 fixed top-0 w-full z-50 px-2">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto h-full">
        <div className="flex items-center gap-2 mt-1">
          <Link href="/">
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

            {/* ======= Only this section is changed ======= */}
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
            {/* ======= End of changed section ======= */}

            <Link
              href="/contact"
              className="hover:text-yellow-500 cursor-pointer transition duration-200 font-semibold"
            >
              Contact
            </Link>
          </nav>
          {!isAuthenticated ? (
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold uppercase px-5 py-2 rounded-full text-sm shadow-md transition duration-300">
                Login / Signup
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-gradient-to-r from-yellow-400 to-yellow-5w00 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold uppercase px-5 py-2 rounded-full text-sm shadow-md transition duration-300">
                  Profile
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white dark:bg-gray-800 rounded-md shadow-lg mt-2 p-2 min-w-[160px]">
                <DropdownMenuItem className="text-gray-600 dark:text-white font-semibold text-sm cursor-default px-4 py-2">
                  {userName}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={toggleDarkMode}
                  className="px-4 py-2 hover:bg-yellow-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white rounded cursor-pointer text-sm flex gap-2 items-center"
                >
                  {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
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

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/recipe/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: ingredients.filter(Boolean) }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setGeneratedRecipe(data.recipe);
    } catch (error) {
      console.error('Error generating recipe:', error);
      setGeneratedRecipe({ error: 'Failed to generate recipe. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">RECIPE GENERATOR</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder={`Ingredient ${index + 1}`}
                className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-600"
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="bg-red-600 px-3 rounded hover:bg-red-7w00"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddIngredient}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              Add Ingredient
            </button>
            <button
              type="submit"
              className="bg-blue-6w00 px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
        {generatedRecipe && (
          <div className="mt-6 bg-gray-900 p-4 rounded whitespace-pre-line">
            <h3 className="text-xl mb-2">Generated Recipe:</h3>
            {generatedRecipe.error ? (
              <p className="text-red-500">{generatedRecipe.error}</p>
            ) : (
              <p>{generatedRecipe}</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
