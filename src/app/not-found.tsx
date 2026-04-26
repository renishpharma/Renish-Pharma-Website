"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FlaskConical, ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-light flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-12">
        {/* Animated Icon */}
        <div className="relative inline-block">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-32 h-32 md:w-48 md:h-48 rounded-5xl bg-white shadow-2xl flex items-center justify-center text-brand-primary border border-primary-50 relative z-10"
          >
            <FlaskConical className="w-16 h-16 md:w-24 md:h-24" />
          </motion.div>
          {/* Background Glow */}
          <div className="absolute inset-0 bg-brand-primary blur-3xl opacity-10 scale-150" />
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h1 className="text-8xl md:text-9xl font-black text-brand-primary/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none -z-0">
            404
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-surface-dark tracking-tight relative z-10">
            Resource <span className="text-brand-secondary">Not Found.</span>
          </h2>
          <p className="text-xl text-surface-dark/60 font-medium max-w-lg mx-auto leading-relaxed relative z-10">
            The clinical data or page you are looking for has been moved, archived, or never existed in our laboratory.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10"
        >
          <Link
            href="/"
            className="w-full sm:w-auto bg-brand-primary text-white font-bold px-10 py-5 rounded-2xl shadow-2xl shadow-brand-primary/20 flex items-center justify-center gap-2 hover:scale-[1.05] transition-all"
          >
            <Home className="w-5 h-5" />
            Back to Safety
          </Link>
          <Link
            href="/products"
            className="w-full sm:w-auto bg-white text-surface-dark font-bold px-10 py-5 rounded-2xl border border-primary-100 shadow-lg flex items-center justify-center gap-2 hover:bg-surface-light transition-all"
          >
            <Search className="w-5 h-5" />
            Browse Catalog
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
