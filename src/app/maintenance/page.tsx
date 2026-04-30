"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hammer, Clock, Mail, Phone, ShieldCheck } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-linear-to-bl from-primary-50/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-linear-to-tr from-brand-secondary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-3xl w-full text-center space-y-12 relative z-10">
        {/* Animated Visual */}
        <div className="relative inline-flex flex-col items-center">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 rounded-3xl bg-brand-primary flex items-center justify-center text-white shadow-2xl shadow-brand-primary/20 mb-6"
          >
            <Hammer className="w-12 h-12" />
          </motion.div>
          
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Scheduled System Upgrade</span>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-surface-dark tracking-tight leading-tight">
            Our Digital Lab is <br />
            Under <span className="text-brand-primary">Maintenance.</span>
          </h1>
          <p className="text-xl text-surface-dark/60 font-medium max-w-xl mx-auto leading-relaxed">
            We are currently optimizing our pharmaceutical platform to serve you better. We&apos;ll be back online with enhanced clinical data shortly.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-primary-50">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-surface-light flex items-center justify-center text-brand-primary mx-auto">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-surface-dark uppercase tracking-widest">ETA</p>
            <p className="text-sm font-bold text-surface-dark/60">~ 2 Hours</p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-surface-light flex items-center justify-center text-brand-primary mx-auto">
              <Mail className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-surface-dark uppercase tracking-widest">Urgent Enquiry</p>
            <p className="text-sm font-bold text-surface-dark/60">renishpharmaceutical@gmail.com</p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-surface-light flex items-center justify-center text-brand-primary mx-auto">
              <Phone className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-surface-dark uppercase tracking-widest">Emergency Call</p>
            <p className="text-sm font-bold text-surface-dark/60">+91 91159 90072</p>
          </div>
        </div>

        {/* Trust Footer */}
        <div className="pt-8 flex items-center justify-center gap-2 opacity-40">
           <ShieldCheck className="w-4 h-4" />
           <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Quality is our first priority</span>
        </div>
      </div>
    </div>
  );
}
