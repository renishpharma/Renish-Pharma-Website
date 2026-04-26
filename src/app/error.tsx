"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, Home, MessageSquare } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("System Runtime Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Visual background element */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,76,163,0.02)_0%,transparent_100%)]" />
      
      <div className="max-w-2xl w-full text-center space-y-12 relative z-10">
        <div className="relative inline-block">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shadow-2xl shadow-red-500/10"
          >
            <AlertTriangle className="w-12 h-12 md:w-16 md:h-16" />
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-red-500/10 -z-10" 
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-surface-dark tracking-tight">
            Something went <span className="text-red-500">wrong.</span>
          </h1>
          <p className="text-lg text-surface-dark/60 font-medium max-w-lg mx-auto leading-relaxed">
            Our system encountered an unexpected clinical anomaly. Our team has been notified and we are working to resolve the diagnostic error.
          </p>
          {error.digest && (
             <p className="text-[10px] font-mono font-bold text-surface-dark/20 uppercase tracking-widest">
               Error ID: {error.digest}
             </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-brand-primary text-white font-bold px-10 py-5 rounded-2xl shadow-2xl shadow-brand-primary/20 flex items-center justify-center gap-2 hover:scale-[1.05] active:scale-[0.95] transition-all"
          >
            <RefreshCcw className="w-5 h-5" />
            Try Again
          </button>
          <a
            href="/"
            className="w-full sm:w-auto bg-white text-surface-dark font-bold px-10 py-5 rounded-2xl border border-primary-100 shadow-lg flex items-center justify-center gap-2 hover:bg-surface-light transition-all"
          >
            <Home className="w-5 h-5" />
            Return Home
          </a>
        </div>

        <div className="pt-12">
           <a href="/contact-us" className="text-sm font-bold text-brand-primary hover:underline flex items-center justify-center gap-2">
             <MessageSquare className="w-4 h-4" />
             Report this issue to support
           </a>
        </div>
      </div>
    </div>
  );
}
