"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

export default function HomepageEnquiry() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Enquiry",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post("/enquiries/submit", {
        ...formData,
        source: "homepage"
      });
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Enquiry",
        message: ""
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Failed to submit enquiry", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-16 bg-brand-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#fff_0%,transparent_50%)]" />
         <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,#01A3D4_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto bg-white rounded-5xl shadow-2xl p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-brand-primary mx-auto mb-6">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-surface-dark mb-3">
              Send an <span className="text-brand-primary">Enquiry</span>
            </h2>
            <p className="text-base text-surface-dark/60 font-medium max-w-xl mx-auto">
              Have questions about our products or partnership opportunities? Let us know and we&apos;ll get back to you promptly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-surface-dark/60 ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="w-full bg-surface-light border-none rounded-2xl py-3.5 px-6 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-surface-dark/60 ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  className="w-full bg-surface-light border-none rounded-2xl py-3.5 px-6 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-surface-dark/60 ml-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +1 234 567 890"
                  className="w-full bg-surface-light border-none rounded-2xl py-3.5 px-6 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-surface-dark/60 ml-1">Subject</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-surface-light border-none rounded-2xl py-3.5 px-6 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark appearance-none"
                >
                  <option>General Enquiry</option>
                  <option>Product Information</option>
                  <option>Partnership Opportunity</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-surface-dark/60 ml-1">Your Message</label>
              <textarea
                name="message"
                rows={3}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help you..."
                className="w-full bg-surface-light border-none rounded-2xl py-3.5 px-6 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                disabled={isSubmitting || submitted}
                className={cn(
                  "w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all text-white text-base",
                  submitted ? "bg-green-500 shadow-xl" : "bg-brand-primary shadow-2xl shadow-brand-primary/30 hover:scale-[1.01] active:scale-[0.99] hover:bg-brand-primary/90"
                )}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : submitted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{submitted ? "Enquiry Sent Successfully" : "Submit Enquiry"}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
