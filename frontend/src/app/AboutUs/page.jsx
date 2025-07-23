"use client";

import React from "react";
import Image from "next/image";
import Header from "../components/Header";

const AboutUs = () => {
  return (
    <>
      <Header />
<div className="mt-10">
</div>
      <section className="bg-green-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Serving the Vision of a Waste-Free, Hunger-Free Tomorrow.
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mt-4 rounded-full" />
          </div>

          {/* First Row: Text left, Image right */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div className="text-gray-800 text-lg leading-relaxed">
              <p>
                At the heart of our startup lies a simple but powerful idea: to create solutions
                that bring meaningful impact to everyday lives. We are a passionate team of
                innovators, problem-solvers, and changemakers who came together with a shared
                mission — to address real-world challenges through technology, creativity, and
                purpose-driven thinking. Our journey began with the belief that a good idea, fueled
                by hard work and the right mindset, can evolve into something truly transformative.
                As a startup, we value curiosity, agility, and empathy, always striving to stay
                close to the people we aim to serve while building products that are efficient,
                accessible, and sustainable.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/serve-food.jpg"
                alt="Serving food"
                width={400}
                height={250}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Second Row: Image left, Text right */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <Image
                src="/images/girl-eating.jpg"
                alt="Girl eating"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="text-gray-800 text-lg leading-relaxed">
              <p>
                What sets us apart is not just what we are building, but how we are building it. We
                are deeply committed to the success of this project, driven by a strong vision and
                an unrelenting focus on execution. Every feature we design, every line of code we
                write, and every decision we make is rooted in our desire to solve problems that
                matter. Challenges don’t scare us — they inspire us. With a growth mindset,
                adaptive strategies, and a hands-on approach, we are determined to scale this
                initiative and make it a success story that inspires others. As we continue on this
                journey, we welcome collaborators, feedback, and partnerships that align with our
                purpose — because we believe that great things happen when passionate people come
                together with a mission.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;