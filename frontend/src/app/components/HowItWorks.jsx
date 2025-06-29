"use client";

import React from "react";
import {
  FaUtensils,
  FaDatabase,
  FaTruckPickup,
  FaPeopleCarry,
  FaChartLine,
} from "react-icons/fa";

const steps = [
  {
    title: "List Surplus Food",
    description: "Donors list surplus food on the platform",
    icon: FaUtensils,
    iconColor: "text-blue-600",
    hoverIconColor: "group-hover:text-blue-700",
    bgColor: "bg-blue-50",
  },
  {
    title: "Smart Matching",
    description: "AI matches food with nearby NGOs and charities",
    icon: FaDatabase,
    iconColor: "text-green-600",
    hoverIconColor: "group-hover:text-green-700",
    bgColor: "bg-green-50",
  },
  {
    title: "Seamless Pickup",
    description: "Volunteers or logistics partners collect it",
    icon: FaTruckPickup,
    iconColor: "text-lime-600",
    hoverIconColor: "group-hover:text-lime-700",
    bgColor: "bg-lime-50",
  },
  {
    title: "Deliver to Communities",
    description: "Food reaches people who need it",
    icon: FaPeopleCarry,
    iconColor: "text-yellow-600",
    hoverIconColor: "group-hover:text-yellow-700",
    bgColor: "bg-yellow-50",
  },
  {
    title: "Track Impact",
    description: "Monitor donations and sustainability progress",
    icon: FaChartLine,
    iconColor: "text-cyan-600",
    hoverIconColor: "group-hover:text-cyan-700",
    bgColor: "bg-cyan-50",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">How It Works</h2>
        <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
          Our platform connects food donors with those in need through a seamless process. Businesses list surplus food,
          which is matched with nearby NGOs and communities. Efficient logistics ensure timely delivery, while real-time
          tracking measures the impact, reducing waste and feeding more people.
        </p>
        <h3 className="text-xl font-semibold mb-12 text-gray-700">
          Here’s How The Magic Happens!
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 justify-items-center">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`group ${step.bgColor} border border-gray-200 rounded-xl shadow-md p-6 flex flex-col items-center transition duration-300 hover:shadow-xl hover:border-gray-300`}
              >
                <Icon
                  size={40}
                  className={`mb-4 transition-colors duration-300 ${step.iconColor} ${step.hoverIconColor}`}
                />
                <h4 className="text-base font-bold text-gray-800 mb-2 group-hover:text-black">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-600 text-center">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
