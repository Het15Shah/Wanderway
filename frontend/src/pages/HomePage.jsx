// src/pages/HomePage.js
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SearchSection from "../components/SearchSection";
import FeaturedPlans from "../components/FeaturedPlans";
// import AboutUs from '../components/AboutUs';
import Footer from "../components/Footer";


const HomePage = () => {
  
  return (
    <div>
      <Navbar />
      <HeroSection />
      <SearchSection />
      <FeaturedPlans />
      <Footer />
    </div>
  );
};

export default HomePage;
