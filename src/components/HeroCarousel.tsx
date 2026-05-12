"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";

interface HeroImage {
  _id: string;
  desktop: { url: string };
  tablet?: { url: string };
  mobile?: { url: string };
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
        // Short delay to prevent layout jump but keep it snappy
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (loading) {
    return (
      <div className="absolute inset-0 z-0 bg-surface-light">
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-transparent z-10" />
        <Image
          src="/images/hero_bg.png"
          alt="Loading..."
          fill
          priority
          className="object-cover opacity-20"
        />
      </div>
    );
  }

  const renderImage = (img: any, isPriority: boolean) => {
    // Defensive check for legacy data
    const desktopUrl = img.desktop?.url || img.url || "/images/hero_bg.png";
    const tabletUrl = img.tablet?.url || desktopUrl;
    const mobileUrl = img.mobile?.url || desktopUrl;

    return (
      <>
        {/* Desktop Image */}
        <div className="hidden lg:block absolute inset-0">
          <Image
            src={desktopUrl}
            alt="Top PCD Pharma Franchise in India - Renish Pharmaceutical"
            fill
            priority={isPriority}
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {/* Tablet Image */}
        <div className="hidden sm:block lg:hidden absolute inset-0">
          <Image
            src={tabletUrl}
            alt="Best PCD Pharma Franchise Company - Renish Pharmaceutical"
            fill
            priority={isPriority}
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {/* Mobile Image */}
        <div className="block sm:hidden absolute inset-0">
          <Image
            src={mobileUrl}
            alt="Top Generic Pharma Company in Chandigarh - Renish Pharmaceutical"
            fill
            priority={isPriority}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </>
    );
  };

  const carouselImages = images.length > 0 ? images : null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-white">
      <AnimatePresence initial={false}>
        {!carouselImages ? (
          <motion.div
            key="fallback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
          >
            <Image
              src="/images/hero_bg.png"
              alt="Renish Pharmaceutical Fallback"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </motion.div>
        ) : (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            {renderImage(carouselImages[currentIndex], true)}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-linear-to-r from-white via-white/70 to-surface-light/30 z-10" />

      {/* Carousel Indicators */}
      {carouselImages && carouselImages.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {carouselImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full ${idx === currentIndex
                  ? "w-8 h-2 bg-brand-primary"
                  : "w-2 h-2 bg-brand-primary/20 hover:bg-brand-primary/40"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
