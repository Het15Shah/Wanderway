import React, { useState, useEffect } from 'react';
import Hero1 from '../assets/carousel-1.jpg'; // Replace with actual image URLs
import Hero2 from '../assets/carousel-2.jpg';
import Hero3 from '../assets/carousel-3.jpg';
import Hero4 from '../assets/carousel-4.jpg';
import Hero5 from '../assets/carousel-5.jpg';

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of images for the carousel
  const heroImages = [Hero1, Hero2, Hero3, Hero4, Hero5];

  // Preload images
  useEffect(() => {
    heroImages.forEach(image => {
      const img = new Image();
      img.src = image;
    });
  }, [heroImages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % heroImages.length);
    }, 5000); // 5000ms = 5 seconds between each slide

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const heroSectionStyles = {
    backgroundImage: `url(${heroImages[currentIndex]})`, // Dynamic background image
    backgroundSize: 'cover', // Ensures the image covers the entire area of the section
    backgroundPosition: 'center', // Keeps the image centered
    backgroundAttachment: 'fixed', // Keeps background fixed for parallax effect
    color: '#ffffff',
    height: '100vh', // Full viewport height (ensures full screen)
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 20px',
    position: 'relative',
    overflow: 'hidden',
  };

  const overlayStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text contrast
    zIndex: 1,
  };

  const headingStyles = {
    fontSize: '48px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    zIndex: 2,
    animation: 'fadeIn 1.5s ease-in-out',
  };

  const paragraphStyles = {
    fontSize: '20px',
    margin: '0',
    zIndex: 2,
    animation: 'fadeIn 2s ease-in-out',
  };

  return (
    <section style={heroSectionStyles}>
      <div style={overlayStyles}></div>
      <h1 style={headingStyles}>Discover Your Next Adventure</h1>
      <p style={paragraphStyles}>Find the best travel plans tailored to your needs</p>
    </section>
  );
};

export default HeroSection;
