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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 flex flex-col items-end"
      style={{ zIndex: 999999 }}
    >
      <div className="relative group">
        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
        
        <div className="relative w-15 h-15 md:w-18 md:h-18 bg-green-500 rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(34,197,94,0.4)] text-white overflow-hidden">
          <MessageCircle className="w-8 h-8 md:w-10 md:h-10 fill-white/20" />
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-linear-to-tr from-white/30 to-transparent pointer-events-none" />
        </div>

        {/* Tooltip - Always visible on desktop hover, hidden on mobile for cleaner look */}
        <div className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-white rounded-xl shadow-2xl border border-primary-50 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap hidden md:block">
          <p className="text-sm font-bold text-surface-dark">Chat with us on <span className="text-green-600">WhatsApp</span></p>
        </div>
      </div>
    </motion.a>
  );
}
