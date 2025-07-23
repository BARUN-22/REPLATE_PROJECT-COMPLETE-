"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Testimonials data
const testimonials = [
  {
    name: "— Anita Verma, NGO Staff, Rural UP",
    image: "/images/ss.jpg",
    text: `“I’ve seen families go to bed hungry with nothing but water. With RePlate, we’re able to bring them real meals. It’s not just food—it’s dignity. I’m proud to be a part of this mission.”`,
  },
  {
    name: "— Ramesh Bhai, Head Cook, Shanti Dhaba, Gujarat",
    image: "/images/ramesh.jpg",
    text: `I cook food with love every day, but it used to hurt seeing good food go to waste. Thanks to RePlate, now that same food feeds people who truly need it. I feel proud that our hotel is part of this mission.`,
  },
  {
    name: "Shreya Suman Patra",
    image: "/images/aarti.png",
    text: `I’ve seen families go to bed hungry with nothing but water. With RePlate, we’re able to bring them real meals. It’s not just food—it’s dignity. I’m proud to be a part of this mission.`,
  },
  {
    name: "— Bhola Ram, Farmer, Madhya Pradesh",
    image: "/images/bhola.jpg",
    text: `I live alone in the village and sometimes don't even have enough to cook a full meal. Since RePlate started reaching us, I get fresh food almost every day. For someone like me, it means everything.`,
  },
  {
    name: "— Meena Joshi, Homemaker, Pune",
    image: "/images/Meena.jpg",
    text: `As a homemaker, I always try to make the best out of whatever is in my kitchen. But sometimes, even I run out of ideas with leftovers. RePlate gave me smart tips and recipes to turn extra food into healthy meals. Now, nothing goes to waste in my house`,
  },
];

// Testimonial Card
const TestimonialCard = ({ name, image, text }) => (
  <div className="min-w-full flex-shrink-0 px-4">
    <div className="bg-gradient-to-r from-green-100 to-white p-6 rounded-xl shadow-lg max-w-xl mx-auto text-center transition duration-500 ease-in-out">
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <h4 className="font-semibold text-gray-800 mb-2">{name}</h4>
      <p className="text-gray-700 text-sm">{text}</p>
    </div>
  </div>
);

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const nextSlide = () => setIndex((prev) => (prev + 1) % testimonials.length);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          What People Are Saying
        </h2>

        {/* Slider with transition */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {testimonials.map((testimonial, i) => (
              <TestimonialCard
                key={i}
                name={testimonial.name}
                image={testimonial.image}
                text={testimonial.text}
              />
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white shadow-md rounded-full hover:bg-gray-100 z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white shadow-md rounded-full hover:bg-gray-100 z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                i === index ? "bg-yellow-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
