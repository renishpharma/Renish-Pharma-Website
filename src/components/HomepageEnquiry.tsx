"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HomepageEnquiry() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-24 bg-brand-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#fff_0%,transparent_50%)]" />
         <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,#01A3D4_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-5xl shadow-2xl p-8 md:p-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-brand-primary mx-auto mb-6">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-surface-dark mb-4">
              Send an <span className="text-brand-primary">Enquiry</span>
            </h2>
            <p className="text-lg text-surface-dark/60 font-medium max-w-2xl mx-auto">
              Have questions about our products or partnership opportunities? Let us know and our team will get back to you promptly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-surface-dark/60 ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  className="w-full bg-surface-light border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-surface-dark/60 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. john@example.com"
                  className="w-full bg-surface-light border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-surface-dark/60 ml-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. +1 234 567 890"
                  className="w-full bg-surface-light border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-surface-dark/60 ml-1">Subject</label>
                <select className="w-full bg-surface-light border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark appearance-none">
                  <option>General Enquiry</option>
                  <option>Product Information</option>
                  <option>Partnership Opportunity</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-surface-dark/60 ml-1">Your Message</label>
              <textarea
                rows={4}
                required
                placeholder="Tell us how we can help you..."
                className="w-full bg-surface-light border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                disabled={isSubmitting || submitted}
                className={cn(
                  "w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all text-white text-lg",
                  submitted ? "bg-green-500 shadow-xl" : "bg-brand-primary shadow-2xl shadow-brand-primary/30 hover:scale-[1.01] active:scale-[0.99] hover:bg-brand-primary/90"
                )}
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : submitted ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span>{submitted ? "Enquiry Sent Successfully" : "Submit Enquiry"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
