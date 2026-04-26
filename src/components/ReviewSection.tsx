"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, Plus, CheckCircle2, Loader2, X } from "lucide-react";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

interface Review {
  _id: string;
  name: string;
  designation: string;
  rating: number;
  comment: string;
}

import FeedbackModal from "@/components/FeedbackModal";

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await api.get("/reviews/approved");
      setReviews(response.data.data);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (!loading && reviews.length === 0) return null;

  return (
    <section className="py-24 bg-surface-light overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em]">Testimonials</h2>
            <h3 className="text-4xl font-bold text-surface-dark tracking-tight">Trusted by Professionals</h3>
            <p className="text-lg text-surface-dark/60 font-medium max-w-xl">
              Hear from the doctors, hospitals, and wholesalers who rely on Renish Pharma every day.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-4xl shadow-card border border-primary-50 relative"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn(
                        "w-4 h-4", 
                        i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-surface-dark/10"
                      )} 
                    />
                  ))}
                </div>
                <p className="text-surface-dark font-medium leading-relaxed mb-8 italic">
                  "{review.comment}"
                </p>
                <div className="flex items-center gap-4 border-t border-primary-50 pt-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-brand-primary font-bold text-xl">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-surface-dark">{review.name}</h4>
                    <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest">{review.designation}</p>
                  </div>
                </div>
                <MessageSquare className="absolute top-8 right-8 w-12 h-12 text-primary-50 -z-0 opacity-50" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      <FeedbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}
