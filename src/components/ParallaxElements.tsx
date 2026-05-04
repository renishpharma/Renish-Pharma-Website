"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxElements() {
  const { scrollYProgress } = useScroll();

  // Parallax: Move up at different speeds to create depth
  // Left starts lower, moves slower
  const leftY = useTransform(scrollYProgress, [0, 1], ["20vh", "-120vh"]);
  // Right starts higher, moves faster
  const rightY = useTransform(scrollYProgress, [0, 1], ["40vh", "-180vh"]);
  
  // Fade in after hero (around 0.15 scroll progress)
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.25, 0.9, 1], 
    [0, 0, 0.15, 0.15, 0] // Fade in after hero, fade out before footer
  );
  
  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Left Test Tube */}
      <motion.div
        style={{ y: leftY, opacity, scale }}
        className="absolute left-[-100px] w-[350px] lg:w-[500px] h-auto aspect-[1/2]"
      >
        <Image
          src="/images/test_tube.webp"
          alt="Pharmaceutical Element Left"
          width={500}
          height={1000}
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Right Test Tube (Flipped) */}
      <motion.div
        style={{ y: rightY, opacity, scale }}
        className="absolute right-[-100px] w-[350px] lg:w-[500px] h-auto aspect-[1/2] scale-x-[-1]"
      >
        <Image
          src="/images/test_tube.webp"
          alt="Pharmaceutical Element Right"
          width={500}
          height={1000}
          className="object-contain"
          priority
        />
      </motion.div>
    </div>
  );
}
