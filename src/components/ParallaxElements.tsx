"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

export default function ParallaxElements() {
  const { scrollYProgress } = useScroll();

  // Vertical movement
  const leftY = useTransform(scrollYProgress, [0, 1], ["60vh", "-150vh"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["120vh", "-200vh"]);

  // Horizontal drift
  const leftX = useTransform(scrollYProgress, [0, 1], ["0px", "40px"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]);

  // Rotation
  const rotateLeft = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], [10, -10]);

  // Scale
  const scaleLeft = useTransform(scrollYProgress, [0, 1], [1.1, 0.9]);
  const scaleRight = useTransform(scrollYProgress, [0, 1], [1.2, 0.85]);

  // Blur
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], ["8px", "2px", "8px"]);

  // Opacity
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.2, 0.8, 0.92, 1],
    [0, 0.15, 0.15, 0.15, 0.15, 0]
  );

  // Smooth everything
  const smoothLeftY = useSpring(leftY, { stiffness: 50, damping: 20 });
  const smoothRightY = useSpring(rightY, { stiffness: 50, damping: 20 });
  const smoothOpacity = useSpring(opacity, { stiffness: 40, damping: 20 });

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden select-none">

      {/* Left */}
      <motion.div
        style={{
          y: smoothLeftY,
          x: leftX,
          rotate: rotateLeft,
          scale: scaleLeft,
          opacity: smoothOpacity,
          filter: blur,
        }}
        className="absolute left-[-50px] top-0 w-[350px] lg:w-[500px] aspect-[1/2]"
      >
        <Image
          src="/images/test_tube.webp"
          alt="Pharma Left"
          width={500}
          height={1000}
          sizes="(max-width: 768px) 350px, 500px"
          style={{ height: "auto" }}
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Right */}
      <motion.div
        style={{
          y: smoothRightY,
          x: rightX,
          rotate: rotateRight,
          scale: scaleRight,
          opacity: smoothOpacity,
          filter: blur,
        }}
        className="absolute right-[-50px] top-0 w-[350px] lg:w-[500px] aspect-[1/2] scale-x-[-1]"
      >
        <Image
          src="/images/test_tube.webp"
          alt="Pharma Right"
          width={500}
          height={1000}
          sizes="(max-width: 768px) 350px, 500px"
          style={{ height: "auto" }}
          className="object-contain"
          priority
        />
      </motion.div>
    </div>
  );
}