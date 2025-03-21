import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";


const imagesC = [
    "https://t4.ftcdn.net/jpg/04/39/89/01/360_F_439890152_sYbPxa1ANTSKcZuUsKzRAf9O7bJ1Tx5B.jpg",
    "https://www.shutterstock.com/shutterstock/videos/1094514863/thumb/1.jpg?ip=x480"
  ];
  

export default function Carousel2 (){
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handleDragEnd = (event, info) => {
      if (info.offset.x > 50) {
        setCurrentIndex((prev) => (prev === 0 ? imagesC.length - 1 : prev - 1)); // Swipe right
      } else if (info.offset.x < -50) {
        setCurrentIndex((prev) => (prev === imagesC.length - 1 ? 0 : prev + 1)); // Swipe left
      }
    };
  
    return (
      <div className="relative w-full max-w-md mx-auto overflow-hidden">
        <motion.div
          key={currentIndex}
          className="w-full h-64 flex justify-center items-center"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <img
            src={imagesC[currentIndex]}
            alt="Gallery Image"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    );
  };
  