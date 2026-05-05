"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxElements() {
  const { scrollYProgress } = useScroll();

  // Parallax: Move up at different speeds to create depth
  const leftY = useTransform(scrollYProgress, [0, 1], ["20vh", "-120vh"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["40vh", "-180vh"]);
  const capsuleY = useTransform(scrollYProgress, [0, 1], ["50vh", "-150vh"]);
  const capsuleRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  
  // Fade in after hero, fade out during stats, fade back in for middle sections
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.05, 0.1, 0.2, 0.3, 0.95, 1], 
    [0, 0, 0.3, 0, 0.3, 0.3, 0] // Fade out at 0.2 (stats), back in at 0.3
  );
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Left Test Tube */}
      <motion.div
        style={{ y: leftY, opacity }}
        className="absolute left-[-100px] top-0 w-[350px] lg:w-[500px] h-auto aspect-[1/2]"
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
        style={{ y: rightY, opacity }}
        className="absolute right-[-100px] top-0 w-[350px] lg:w-[500px] h-auto aspect-[1/2] scale-x-[-1]"
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

      {/* Floating Capsule */}
      <motion.div
        style={{ y: capsuleY, rotate: capsuleRotate, opacity }}
        className="absolute left-[15%] top-0 w-[80px] lg:w-[120px] h-auto aspect-square blur-[2px]"
      >
        <Image
          src="/images/capsule.webp"
          alt="Medical Capsule"
          width={120}
          height={120}
          className="object-contain opacity-60"
        />
      </motion.div>
    </div>
  );
}
