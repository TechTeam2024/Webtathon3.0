import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Carousel1 from "./Crsl1";
import Carousel2 from "./Crsl2";

const allImages = [
  { id: 8, url: "/WEB9.png", alt: "Abstract art" },
  { id: 2, url: "/WEB3.png", alt: "Mountain landscape" },
  { id: 5, url: "/WEB6.png", alt: "Abstract art" },
  { id: 6, url: "/WEB7.png", alt: "Urban scene" },
  { id: 9, url: "/WEB10.png", alt: "City skyline" },
  { id: 7, url: "/WEB8.png", alt: "Nature close-up" },
  { id: 1, url: "/WEB21.jpg", alt: "Architectural detail" },

];

const Gallery = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [images, setImages] = useState(allImages);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial value
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 640) {

      setImages(allImages.slice(0, 9));
    } else {
      setImages(allImages);
    }
  }, [windowWidth, currentIndex]);
  

  return (
    <section className="w-full m-0 py-16 bg-black text-white overflow-hidden">
      <div className="container overflow-hidden mx-auto px-8">
      {windowWidth < 640 && (
        <>
        <h1 className="text-center text-3xl md:text-5xl lg:text-7xl font-bold mb-4">WEBATHON 3.0</h1>
        <div className="mb-10 w-auto">
            <Carousel2 />
        </div>
        </>
    )}
    

          {/* Show description only for medium and larger screens */}
            {windowWidth >= 640 && (
        <div className="grid lg:grid-cols-2 gap-8 sm:grid-cols-1">
          <div className="mb-10 w-auto">
            <Carousel1/>
          </div>
          <div className="max-w-3xl text-center p-20">
            <h1 className="text-center text-3xl md:text-5xl lg:text-7xl font-bold mb-4">WEBATHON 3.0</h1>
              <p className="md:text-lg text-center text-gray-300">
                This is the description aligned to the left. It provides additional details about the title in a readable format.
                Using Tailwind CSS, we ensure proper spacing and responsiveness.
              </p>
          </div>
        </div>
            )}

        {/* Responsive Image Grid */}
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              className="break-inside-avoid mb-4 overflow-hidden "
              initial={{ opacity: 0, y: 50, filter: "drop-shadow(0px 0px 0px rgba(255, 255, 255, 0))" }}  // Start hidden, move up, and no shadow
              whileInView={{ opacity: 1, y: 0}}  // Show when in viewport
              whileHover={{ 
                scale: 1.05,
                filter: "drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.9))"
               }}  // Delay for staggered effect
              transition={{scale:{duration: 0.1},filter:{duration:0.3},duration:0.3, delay: 0.5 }}
              viewport={{ once: true }}  // Animate only once
            >
              <img
                src={`${image.url}?auto=format&fit=crop&w=800&q=80`}
                alt={image.alt}
                className="w-full h-auto shadow-md mb-1"
                loading="lazy"
                onError={(e) => {
                  console.error(`Failed to load image: ${image.url}`);
                  e.target.src = "/fallback-image.jpg"; // Replace with a valid fallback image
                }}
              />

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;