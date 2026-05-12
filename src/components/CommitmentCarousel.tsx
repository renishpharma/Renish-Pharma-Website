"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/i_change/1.png",
  "/images/i_change/2.png",
  "/images/i_change/3.png",
  "/images/i_change/4.png",
];

export default function CommitmentCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt="Best PCD Pharma Franchise Manufacturing Facility - Renish Pharmaceutical"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover "
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-primary/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute top-6 left-6 flex gap-2 z-30">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 rounded-full transition-all duration-500 ${
              idx === currentIndex ? "w-6 bg-white" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
