import React from "react";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        {/* Left Text Section */}
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Who We Are & Why It Matters
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            At Re-Plate, we are on a mission to reduce food waste and fight
            hunger by connecting surplus food from businesses to those in
            need. <br />
            Every year, tons of edible food go to waste while millions struggle
            with hunger.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            We bridge this gap using smart technology, ensuring that excess food
            is redistributed efficiently and sustainably. By turning waste into
            opportunity, we’re not just feeding people—we’re building a future
            where food is valued, resources are optimized, and communities
            thrive.
          </p>
          <p className="text-gray-900 font-semibold text-lg">
            Join us in making every meal count!
          </p>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2">
          <Image
            src="/images/zeroWaste.jpg"
            alt="Zero Waste Food"
            width={640}
            height={400}
            className="rounded-md shadow-md"
          />
        </div>
      </div>
    </section>
  );
};
export default AboutSection;