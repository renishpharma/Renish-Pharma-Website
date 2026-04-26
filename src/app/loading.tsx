"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] bg-white/80 backdrop-blur-md flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-brand-primary flex items-center justify-center text-white shadow-2xl shadow-brand-primary/20 animate-pulse">
            <span className="text-2xl font-bold">R</span>
          </div>
          <Loader2 className="absolute -top-2 -right-2 w-6 h-6 text-brand-secondary animate-spin" />
        </div>
        <div className="space-y-2 text-center">
          <p className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.4em] animate-pulse">
            Loading System
          </p>
          <div className="w-32 h-1 bg-primary-50 rounded-full overflow-hidden mx-auto">
             <div className="w-1/2 h-full bg-brand-primary animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
