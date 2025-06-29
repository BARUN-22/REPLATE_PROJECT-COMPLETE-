'use client';

import React from "react";
import Link from "next/link";
import { FaHandsHelping, FaChartLine, FaNetworkWired } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";

const productData = [
  {
    icon: <FaHandsHelping size={36} className="text-green-600" />,
    title: "Donate Food",
    description: (
      <>
        Turn Surplus into Support! Donate excess food and help nourish communities
        in need. Every meal saved is a step toward a sustainable future!
      </>
    ),
    link: "/donate", // ✅ Make sure app/donate/page.jsx exists
  },
  {
    icon: <MdRestaurantMenu size={36} className="text-green-600" />,
    title: "Recipe Generator",
    description: (
      <>
        Turn leftovers into delicious meals! Our AI-powered Recipe Generator transforms
        your ingredients into creative, zero-waste recipes in seconds.
      </>
    ),
    link: "/recipe", // ✅ Make sure app/recipe/page.jsx exists
  },
  {
    icon: <FaChartLine size={36} className="text-green-600" />,
    title: "Track Impact",
    description: (
      <>
        See the difference you make! Track your impact with real-time stats on food
        saved, meals donated, and waste reduced.
      </>
    ),
    link: "/track-impact", // Optional page (make sure it exists)
  },
  {
    icon: <FaNetworkWired size={36} className="text-green-600" />,
    title: "Community Hub",
    description: (
      <>
        Be a part of the change! Connect, collaborate, and inspire action in our
        Community Hub.
      </>
    ),
    link: "/community", // Optional page (make sure it exists)
  },
];

const OurProducts = () => {
  return (
    <section className="py-20 px-4 text-center bg-white">
      <h2 className="text-4xl font-bold mb-4 text-green-700">Our Products</h2>
      <p className="text-gray-600 max-w-4xl mx-auto mb-12">
        Our products are designed to make food redistribution effortless and impactful.
        From tracking surplus food to generating recipes and fostering a community-driven
        movement, we provide the tools to reduce waste and feed those in need efficiently.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {productData.map((product, index) => (
          <Link
            key={index}
            href={product.link}
            className="flex flex-col md:flex-row items-center gap-6 border border-green-500 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 bg-gray-50 hover:bg-green-50 text-left"
          >
            <div className="shrink-0">{product.icon}</div>
            <div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">{product.title}</h3>
              <p className="text-gray-700 text-sm">{product.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default OurProducts;
