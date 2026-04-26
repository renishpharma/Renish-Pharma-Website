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
            alt={`${name} Certification`}
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

  return (
    <div className="mt-16 flex flex-wrap items-center gap-6 md:gap-12 opacity-80">
      {certs.map((cert) => (
        <CertificationBadge key={cert} name={cert} />
      ))}
    </div>
  );
}
