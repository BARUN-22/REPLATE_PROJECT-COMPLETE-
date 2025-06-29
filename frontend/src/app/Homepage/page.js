"use client";

import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import WaysWeHelp from "../components/WaysWeHelp";
import HowItWorks from "../components/HowItWorks";
import TestimonialCard from "../components/TestimonialCard"; 
import ContactUs from "../components/ContactUs";
import OurProducts from "../components/OurProducts";
import SmartSolutionsSection from "../components/SmartSolutionsSection";


const Homepage = () => {
  return (
    <>
      <Header />
      <Hero />
      <AboutSection />
      <WaysWeHelp />
      <HowItWorks />
      
      <OurProducts/>
      <SmartSolutionsSection/>
      <TestimonialCard /> 
       <ContactUs />
    </>
  );
};

export default Homepage;
