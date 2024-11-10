import React, { useState, useEffect, useRef } from 'react';

import '../CSS/HeroCarousel.css';

const Hero1 = "https://golive.bg/wp-content/uploads/2017/09/pexels-photo-382177.jpeg"
const Hero2 = "https://images.pexels.com/photos/3041347/pexels-photo-3041347.jpeg?auto=compress&cs=tinysrgb&dpr=2&fit=crop&h=700&w=1200"
const Hero3 = "https://rispoliviajes.com.ar/wp-content/uploads/2017/07/pexels-photo-210012-1500x1000.jpeg"
const Hero4 = "https://images.pexels.com/photos/1660995/pexels-photo-1660995.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
const HeroCarousel = () => {
  const images = [Hero1, Hero2, Hero3, Hero4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayInterval = useRef(null);

  // Preload images
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  // Carousel auto-play function
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayInterval.current = setInterval(() => {
        goToNextSlide();
      }, 5000);
    }
    return () => clearInterval(autoPlayInterval.current);
  }, [currentIndex, isAutoPlay]);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="carousel-container" onMouseEnter={() => setIsAutoPlay(false)} onMouseLeave={() => setIsAutoPlay(true)}>
      <div className="carousel">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            <div className="overlay"></div>
            <h1 className="carousel-title">Discover Your Next Adventure</h1>
            <p className="carousel-description">Find the best travel plans tailored to your needs</p>
          </div>
        ))}
        <button className="carousel-control carousel-control-left" onClick={goToPrevSlide}>
          &lt;
        </button>
        <button className="carousel-control carousel-control-right" onClick={goToNextSlide}>
          &gt;
        </button>
      </div>

      {/* Dots for navigation */}
      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
