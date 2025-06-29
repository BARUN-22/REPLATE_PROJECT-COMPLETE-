"use client";

import React, { useState } from "react";
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
import error from "next/error";

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState([""]);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);

  // ✅ Header component
  const Header = () => (
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
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold uppercase px-5 py-2 rounded-full text-sm shadow-md transition duration-300" variant={undefined} size={undefined}          >
            Login / Signup
          </Button>
        </div>
      </div>
    </header>
  );

  // ✅ Handlers
  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: ingredients.filter(Boolean) }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setGeneratedRecipe(data.recipe);
    } catch (error) {
      console.error("Error generating recipe:", error);
      setGeneratedRecipe({ error: "Failed to generate recipe. Please try again." });
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
                  className="bg-red-600 px-3 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <div className="flex gap-2">
            <button type="button" onClick={handleAddIngredient} className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
              Add Ingredient
            </button>
            <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
              Submit
            </button>
          </div>
        </form>

        {generatedRecipe && (
          <div className="mt-6 bg-gray-900 p-4 rounded">
            <h3 className="text-xl mb-2">Your Generated Recipe:</h3>
            {generatedRecipe.error ? (
              <p className="text-red-500">{generatedRecipe.error}</p>
            ) : (
              <pre className="whitespace-pre-wrap">{JSON.stringify(generatedRecipe, null, 2)}</pre>
            )}
          </div>
        )}
      </main>
    </div>
  );
}