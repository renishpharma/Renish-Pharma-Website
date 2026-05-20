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
          src="/images/hero_bg.webp"
          alt="Loading..."
          fill
          priority
          className="object-cover opacity-20"
        />
      </div>
    );
  }

  const getOptimizedImageUrl = (url: string, width: number) => {
    if (url.startsWith("/")) return url;
    return `/_next/image?url=${encodeURIComponent(url)}&w=${width}&q=75`;
  };

  const renderImage = (img: any, isPriority: boolean) => {
    // Defensive check for legacy data
    const desktopUrl = img.desktop?.url || img.url || "/images/hero_bg.webp";
    const tabletUrl = img.tablet?.url || desktopUrl;
    const mobileUrl = img.mobile?.url || desktopUrl;

    const optDesktop = getOptimizedImageUrl(desktopUrl, 1920);
    const optTablet = getOptimizedImageUrl(tabletUrl, 1080);
    const optMobile = getOptimizedImageUrl(mobileUrl, 640);

    return (
      <picture className="absolute inset-0 w-full h-full">
        {/* Desktop Image */}
        <source media="(min-width: 1024px)" srcSet={optDesktop} />
        {/* Tablet Image */}
        <source media="(min-width: 640px)" srcSet={optTablet} />
        {/* Mobile Image (Fallback) */}
        <img
          src={optMobile}
          alt="Top PCD Pharma Franchise in India - Renish Pharmaceutical"
          className="object-cover w-full h-full absolute inset-0"
          loading={isPriority ? "eager" : "lazy"}
        />
      </picture>
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
              src="/images/hero_image.webp"
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
