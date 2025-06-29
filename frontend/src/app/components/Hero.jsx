import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative w-full h-[calc(100vh-80px)] mt-20 overflow-hidden">
      {/* Background Image */}
     <Image
  src="/images/bg.webp"
  alt="Background"
  fill
  className="object-cover"
  priority
/>


      {/* Overlay (optional gradient) */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-200/60 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-between max-w-screen-xl mx-auto h-full px-6">
        {/* Left Text Section */}
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-md">
            Reducing Waste <br /> Feeding Hope!
          </h1>
          <Button className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-full text-lg shadow-md">
            Join the movement
          </Button>
        </div>

        {/* Right Image (Boy) */}
        <div className="mt-25 md:mt-0 md:w-1/2 flex justify-center">
          <Image
            src="/images/boy.png"
            alt="Smiling Boy"
            width={800}
            height={1000}
            className="object-contain drop-shadow-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;