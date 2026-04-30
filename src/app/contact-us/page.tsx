"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Clock,
  Globe2,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactUs() {
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
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <section className="bg-brand-primary pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,#fff_0%,transparent_50%)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h1 className="text-[10px] font-bold text-white/60 uppercase tracking-[0.4em] mb-6">Contact Us</h1>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-8">
              Let&apos;s Start a <br />
              <span className="text-brand-secondary">Conversation.</span>
            </h2>
            <p className="text-lg text-white/70 font-medium max-w-2xl mx-auto leading-relaxed">
              Have questions about our products or partnership opportunities? Our dedicated support team is here to assist you globally.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-32 relative z-20">
          {/* Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {[
              { icon: Phone, title: "Phone Number", details: ["+91 91159 90072"], color: "text-blue-600", bg: "bg-blue-50" },
              { icon: Mail, title: "Email Address", details: ["renishpharmaceutical@gmail.com"], color: "text-cyan-600", bg: "bg-cyan-50" },
              { icon: MapPin, title: "Global Headquarters", details: ["SCO 76, First Floor, C-1, Sector 19, Panchkula 134113"], color: "text-indigo-600", bg: "bg-indigo-50" },
              { icon: Clock, title: "Working Hours", details: ["Mon - Sat: 9:00 AM - 6:00 PM", "Sunday: Closed"], color: "text-orange-600", bg: "bg-orange-50" },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-4xl shadow-xl border border-primary-50 flex items-start gap-6 group hover:scale-[1.02] transition-all"
              >
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:rotate-12", card.bg, card.color)}>
                  <card.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-surface-dark/40 uppercase tracking-widest mb-3">{card.title}</h4>
                  {card.details.map((d, i) => (
                    <p key={i} className="text-lg font-bold text-surface-dark">{d}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-12 rounded-5xl shadow-2xl border border-primary-50"
            >
              <h3 className="text-3xl font-bold text-surface-dark mb-8">Send us a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-surface-dark/60 ml-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      className="w-full bg-surface-light border-none rounded-2xl py-5 px-6 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-surface-dark/60 ml-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      className="w-full bg-surface-light border-none rounded-2xl py-5 px-6 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-surface-dark/60 ml-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 234 567 890"
                      className="w-full bg-surface-light border-none rounded-2xl py-5 px-6 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-surface-dark/60 ml-1">Subject</label>
                    <select className="w-full bg-surface-light border-none rounded-2xl py-5 px-6 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark appearance-none">
                      <option>General Enquiry</option>
                      <option>Product Information</option>
                      <option>Partnership Opportunity</option>
                      <option>Feedback / Suggestion</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-surface-dark/60 ml-1">Your Message</label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Tell us how we can help you..."
                    className="w-full bg-surface-light border-none rounded-2xl py-5 px-6 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-surface-dark resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    disabled={isSubmitting || submitted}
                    className={cn(
                      "w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all text-white",
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
                    <span>{submitted ? "Message Sent Successfully" : "Send Message Now"}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="py-24 bg-surface-light">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-6 mb-16">
            <Globe2 className="w-16 h-16 text-brand-primary mx-auto opacity-20" />
            <h3 className="text-4xl font-bold text-surface-dark tracking-tight">Our Global Network</h3>
            <p className="text-lg text-surface-dark/60 font-medium">
              With operational centers in 3 continents, we ensure seamless delivery and support across the globe.
            </p>
          </div>

          <div className="rounded-5xl overflow-hidden shadow-2xl border-8 border-white bg-white relative h-150">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.771109503807!2d76.83241257617821!3d30.668573274615333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f94b02eb98b73%3A0xe62caaf269a81816!2sSBI%20Branch%20Sec%2019%20Panchkula!5e0!3m2!1sen!2sin!4v1777394135341!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Location Overlay Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="absolute top-10 right-10 w-80 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-primary-50 hidden md:block"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-surface-dark">Our Headquarters</h4>
              </div>
              <p className="text-sm font-medium text-surface-dark/60 leading-relaxed">
                SCO 76, First Floor, C-1, Sector 19, Panchkula 134113
              </p>
              <div className="mt-4 pt-4 border-t border-primary-100">
                <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest">Plus Code</p>
                <p className="text-xs font-bold text-surface-dark">J372+PW Patna, Bihar</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
