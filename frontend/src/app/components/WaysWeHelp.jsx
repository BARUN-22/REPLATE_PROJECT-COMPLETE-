import React from "react";
import { FaRecycle, FaUtensils, FaLeaf } from "react-icons/fa";

const WaysWeHelp = () => {
  const ways = [
    {
      icon: <FaRecycle size={28} />,
      title: "Reducing Waste",
      desc: "Rescues surplus food and prevents waste.",
      bgGradient: "bg-gradient-to-r from-lime-500 to-green-700 hover:from-lime-500 hover:to-green-600",
    },
    {
      icon: <FaUtensils size={28} />,
      title: "Feeding People",
      desc: "Connects surplus food with local NGOs and shelters.",
      bgGradient: "bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600",
    },
    {
      icon: <FaLeaf size={28} />,
      title: "Promoting Sustainability",
      desc: "Encourages responsible consumption and eco-friendly practices.",
      bgGradient: "bg-gradient-to-r from-orange-400 to-orange-700 hover:from-orange-400 hover:to-orange-600",
    },
  ];

  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "url('/images/bgP.webp')",
          backgroundSize: "280% auto",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800 -mt-6">
          Making a difference:{" "}
          <span className="text-green-700">3 Ways We Help</span>
        </h2>

        {/* Info Blocks */}
        <div className="flex flex-col gap-8 md:gap-10">
          {ways.map((way, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row justify-between items-center text-left rounded-xl shadow-md transition duration-300 p-6 md:p-8 text-white cursor-pointer ${way.bgGradient}`}
            >
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                {way.icon}
                <h3 className="text-xl md:text-2xl font-semibold">
                  {way.title}
                </h3>
              </div>
              <p className="md:text-base text-sm max-w-xl">
                {way.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WaysWeHelp;
