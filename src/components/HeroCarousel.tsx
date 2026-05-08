"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";

interface HeroImage {
  _id: string;
  url: string;
  order: number;
}

export default function HeroCarousel() {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api.get("/hero", { params: { isActive: true } });
        setImages(res.data.data);
      } catch (error) {
        console.error("Failed to fetch hero images", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  if (loading) {
    // Show brand-colored background while checking/loading
    return (
      <div className="absolute inset-0 z-0 bg-linear-to-br from-brand-primary/80 to-brand-primary animate-pulse flex items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-transparent" />
      </div>
    );
  }

  if (images.length === 0) {
    // Show fallback image if no backend images are found
    return (
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_bg.png"
          alt="Renish Pharmaceutical Fallback"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/70 to-surface-light/30" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-surface-dark">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex].url}
            alt={`Hero Background ${currentIndex + 1}`}
            fill
            sizes="100vw"
            className="object-cover"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-linear-to-r from-white via-white/70 to-surface-light/30" />

      {/* Optional: Carousel Indicators (Dots) */}
      {images.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full ${idx === currentIndex
                  ? "w-8 h-2 bg-brand-primary"
                  : "w-2 h-2 bg-white/50 hover:bg-white"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
