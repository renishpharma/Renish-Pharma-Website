"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import api from "@/lib/api";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      designation: formData.get("designation"),
      rating: Number(formData.get("rating")),
      comment: formData.get("comment"),
    };

    setIsSubmitting(true);
    try {
      await api.post("/reviews/submit", data);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Failed to submit review", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-surface-dark/40 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-white rounded-5xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="text-2xl font-bold text-surface-dark tracking-tight">Share Your Experience</h3>
                 <button onClick={onClose} className="text-surface-dark/20 hover:text-surface-dark transition-colors">
                   <X className="w-6 h-6" />
                 </button>
              </div>

              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-4">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h4 className="text-2xl font-bold text-surface-dark">Feedback Received!</h4>
                  <p className="text-surface-dark/60 font-medium">Thank you for helping us improve. Your testimonial will be visible once approved by our team.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-surface-dark/60 ml-1">Full Name</label>
                        <input name="name" required placeholder="e.g. Dr. Amit Kumar" className="w-full bg-surface-light border-none rounded-2xl py-4 px-5 outline-none focus:ring-2 focus:ring-brand-primary/20 font-bold text-surface-dark" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-surface-dark/60 ml-1">Designation</label>
                        <input name="designation" required placeholder="e.g. Chief Pharmacist" className="w-full bg-surface-light border-none rounded-2xl py-4 px-5 outline-none focus:ring-2 focus:ring-brand-primary/20 font-bold text-surface-dark" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-surface-dark/60 ml-1">Rating</label>
                     <select name="rating" className="w-full bg-surface-light border-none rounded-2xl py-4 px-5 outline-none focus:ring-2 focus:ring-brand-primary/20 font-bold text-surface-dark appearance-none cursor-pointer">
                        {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars Experience</option>)}
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-surface-dark/60 ml-1">Your Detailed Feedback</label>
                     <textarea name="comment" required rows={4} placeholder="Tell us about our product quality and service..." className="w-full bg-surface-light border-none rounded-2xl py-4 px-5 outline-none focus:ring-2 focus:ring-brand-primary/20 font-bold text-surface-dark resize-none" />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-brand-primary text-white font-bold py-5 rounded-2xl shadow-xl shadow-brand-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "Submit Feedback"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
