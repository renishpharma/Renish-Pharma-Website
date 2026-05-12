"use client";

import React, { useState } from "react";
import Image from "next/image";

interface CertProps {
  name: string;
}

const CertificationBadge = ({ name }: CertProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex flex-col items-center">
      {!hasError ? (
        <div className="relative w-16 h-16 md:w-20 md:h-20 grayscale hover:grayscale-0 transition-all duration-300">
          <Image
            src={`/icons/${name}.png`}
            alt={`${name} Certified Pharmaceutical Company - Renish Pharmaceutical`}
            fill
            sizes="(max-width: 768px) 64px, 80px"
            className="object-contain"
            onError={() => setHasError(true)}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <span className="text-xs font-black text-brand-primary tracking-widest border-2 border-brand-primary px-3 py-1 rounded-md uppercase">
            {name}
          </span>
          <span className="text-[8px] font-bold text-surface-dark/40 mt-1 uppercase tracking-tighter">
            Certified
          </span>
        </div>
      )}
    </div>
  );
};

export default function CertificationSection() {
  const certs = ["WHO", "GMP", "ISO", "FSSAI", "MSME"];
  const { motion } = require("framer-motion");

  return (
    <div className="w-full max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white/60 backdrop-blur-md rounded-4xl border border-primary-50 p-8 md:p-10 shadow-sm relative overflow-hidden group"
      >
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50/50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-primary/10 transition-colors duration-700" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          <div className="text-center md:text-left space-y-2">
            <h4 className="text-xs font-bold text-brand-primary uppercase tracking-[0.3em]">Quality Assured</h4>
            <p className="text-2xl font-bold text-surface-dark">Global Standards & <br/> Certifications</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {certs.map((cert, idx) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <CertificationBadge name={cert} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-50 flex flex-wrap justify-center md:justify-start gap-8 opacity-40">
           <span className="text-[10px] font-bold text-surface-dark uppercase tracking-widest">WHO-GMP Compliant</span>
           <span className="text-[10px] font-bold text-surface-dark uppercase tracking-widest">ISO 9001:2015</span>
           <span className="text-[10px] font-bold text-surface-dark uppercase tracking-widest">Regulatory Approved</span>
        </div>
      </motion.div>
    </div>
  );
}
