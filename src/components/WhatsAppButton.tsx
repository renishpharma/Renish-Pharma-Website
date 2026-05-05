"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "9115990072";
  const message = "Hello Renish Pharmaceutical, I am interested in your pharmaceutical products. Can you please provide more information?";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] group"
    >
      {/* Pulse Effect */}
      <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
      
      <div className="relative w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 text-white overflow-hidden">
        <MessageCircle className="w-8 h-8 fill-white/20" />
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent pointer-events-none" />
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-white rounded-xl shadow-premium border border-primary-50 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
        <p className="text-sm font-bold text-surface-dark">Chat with us on <span className="text-green-600">WhatsApp</span></p>
      </div>
    </motion.a>
  );
}
