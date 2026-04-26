"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Loader2, Phone, Mail, User } from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import { Product } from "@/types";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export default function EnquiryModal({ isOpen, onClose, product }: EnquiryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      role: formData.get("role"),
      quantity: formData.get("quantity"),
      message: formData.get("message"),
      product: product._id
    };

    setIsSubmitting(true);
    try {
      await api.post("/enquiries/submit", data);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 4000);
    } catch (error) {
      console.error("Failed to submit enquiry", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           {/* Backdrop */}
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={onClose}
             className="absolute inset-0 bg-surface-dark/40 backdrop-blur-md"
           />

           {/* Modal Content */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: 20 }}
             className="relative w-full max-w-2xl bg-white rounded-5xl shadow-2xl overflow-hidden border border-white/20"
           >
              {/* Header */}
              <div className="px-8 py-6 border-b border-primary-50 flex items-center justify-between bg-primary-50/30">
                 <div>
                    <h2 className="text-xl font-bold text-surface-dark">Product Enquiry</h2>
                    <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mt-1">
                      Requesting details for <span className="text-surface-dark">{product.name}</span>
                    </p>
                 </div>
                 <button 
                   onClick={onClose}
                   className="w-10 h-10 rounded-2xl hover:bg-white flex items-center justify-center text-surface-dark/40 hover:text-surface-dark transition-all"
                 >
                    <X className="w-5 h-5" />
                 </button>
              </div>

              {/* Form Body */}
              <div className="p-8">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center text-center space-y-6"
                  >
                     <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-green-600 shadow-xl shadow-green-500/10">
                        <CheckCircle2 className="w-10 h-10" />
                     </div>
                     <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-surface-dark">Thank You!</h3>
                        <p className="text-surface-dark/60 font-medium">Your enquiry for <span className="font-bold text-brand-primary">{product.name}</span> has been received. Our team will contact you shortly.</p>
                     </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-sm font-bold text-surface-dark/60 ml-1 flex items-center gap-2">
                            <User className="w-3 h-3" /> Full Name *
                          </label>
                          <input 
                            name="name"
                            type="text" 
                            required
                            placeholder="John Doe"
                            className="w-full bg-surface-light border-none rounded-2xl py-4 px-5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-bold text-surface-dark/60 ml-1 flex items-center gap-2">
                            <Mail className="w-3 h-3" /> Email Address *
                          </label>
                          <input 
                            name="email"
                            type="email" 
                            required
                            placeholder="john@example.com"
                            className="w-full bg-surface-light border-none rounded-2xl py-4 px-5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark"
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-sm font-bold text-surface-dark/60 ml-1 flex items-center gap-2">
                            <Phone className="w-3 h-3" /> Phone Number *
                          </label>
                          <input 
                            name="phone"
                            type="tel" 
                            required
                            placeholder="+1 (234) 567 890"
                            className="w-full bg-surface-light border-none rounded-2xl py-4 px-5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-bold text-surface-dark/60 ml-1">Professional Role *</label>
                          <select 
                            name="role"
                            required
                            className="w-full bg-surface-light border-none rounded-2xl py-4 px-5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark appearance-none"
                          >
                             <option value="">Select Role</option>
                             <option value="doctor">Doctor</option>
                             <option value="hospital">Hospital</option>
                             <option value="pharmaceutical wholesaler">Pharmaceutical Wholesaler</option>
                             <option value="pharmaceutical distributor">Pharmaceutical Distributor</option>
                          </select>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-sm font-bold text-surface-dark/60 ml-1">Expected Quantity</label>
                          <input 
                            name="quantity"
                            type="text" 
                            placeholder="e.g. 1000 Units"
                            className="w-full bg-surface-light border-none rounded-2xl py-4 px-5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-bold text-surface-dark/60 ml-1">Reference SKU</label>
                          <input 
                            disabled
                            value={product.sku}
                            className="w-full bg-surface-light/50 border-none rounded-2xl py-4 px-5 outline-none transition-all font-bold text-surface-dark/40"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-sm font-bold text-surface-dark/60 ml-1">Additional Requirements</label>
                       <textarea 
                         name="message"
                         rows={4}
                         placeholder="Any specific clinical requirements or notes..."
                         className="w-full bg-surface-light border-none rounded-2xl py-4 px-5 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark resize-none"
                       />
                    </div>

                    <div className="pt-4">
                       <button 
                         type="submit"
                         disabled={isSubmitting}
                         className="w-full bg-brand-primary text-white font-bold py-5 rounded-2xl shadow-xl shadow-brand-primary/20 hover:bg-brand-primary/90 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                       >
                          {isSubmitting ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                          ) : (
                            <Send className="w-5 h-5" />
                          )}
                          Submit Enquiry
                       </button>
                    </div>

                    <p className="text-[10px] text-center font-bold text-surface-dark/30 uppercase tracking-widest">
                      Your information is securely processed and used only for contact purposes.
                    </p>
                  </form>
                )}
              </div>
           </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
