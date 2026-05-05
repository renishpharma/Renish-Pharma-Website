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

import api from "@/lib/api";

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Enquiry",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post("/enquiries/submit", {
        ...formData,
        source: "contact_us"
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
      console.error("Failed to submit contact form", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <section className="bg-brand-primary pt-40 pb-48 md:pb-64 relative overflow-hidden">
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

      <section className="pb-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 -mt-32 md:-mt-48 relative z-20">
          {/* Info Cards Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl shadow-brand-primary/10 border border-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-primary/10 transition-colors" />
               
               <div className="relative z-10 space-y-10">
                 <div>
                    <h3 className="text-2xl font-bold text-surface-dark mb-2">Contact Details</h3>
                    <p className="text-sm text-surface-dark/60 font-medium">Reach out to us through any of these channels.</p>
                 </div>

                 <div className="space-y-8">
                    {[
                      { icon: Phone, title: "Phone", value: "+91 91159 90072", color: "text-blue-600", bg: "bg-blue-50" },
                      { icon: Mail, title: "Email", value: "renishpharmaceutical@gmail.com", color: "text-cyan-600", bg: "bg-cyan-50" },
                      { icon: MapPin, title: "Location", value: "SCO 76, Sector 19, Panchkula", color: "text-indigo-600", bg: "bg-indigo-50" },
                      { icon: Clock, title: "Hours", value: "Mon-Sat: 9AM - 6PM", color: "text-orange-600", bg: "bg-orange-50" },
                    ].map((item, idx) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-5 group/item"
                      >
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover/item:scale-110 shadow-sm", item.bg, item.color)}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-surface-dark/40 uppercase tracking-[0.2em] mb-1">{item.title}</p>
                          <p className="text-base font-bold text-surface-dark group-hover/item:text-brand-primary transition-colors">{item.value}</p>
                        </div>
                      </motion.div>
                    ))}
                 </div>
               </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 md:p-16 rounded-[4rem] shadow-2xl border border-primary-50 relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="mb-12">
                  <h3 className="text-3xl md:text-4xl font-bold text-surface-dark mb-4">Send a Message</h3>
                  <p className="text-lg text-surface-dark/60 font-medium">Fill out the form below and we will get back to you shortly.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-surface-dark/60 ml-1 uppercase tracking-widest">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-surface-light border-2 border-transparent rounded-2xl py-4 px-6 outline-none focus:border-brand-primary/20 focus:bg-white transition-all font-bold text-surface-dark text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-surface-dark/60 ml-1 uppercase tracking-widest">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-surface-light border-2 border-transparent rounded-2xl py-4 px-6 outline-none focus:border-brand-primary/20 focus:bg-white transition-all font-bold text-surface-dark text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-surface-dark/60 ml-1 uppercase tracking-widest">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 00000 00000"
                        className="w-full bg-surface-light border-2 border-transparent rounded-2xl py-4 px-6 outline-none focus:border-brand-primary/20 focus:bg-white transition-all font-bold text-surface-dark text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-surface-dark/60 ml-1 uppercase tracking-widest">Inquiry Type</label>
                      <div className="relative">
                        <select 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full bg-surface-light border-2 border-transparent rounded-2xl py-4 px-6 outline-none focus:border-brand-primary/20 focus:bg-white transition-all font-bold text-surface-dark text-base appearance-none cursor-pointer"
                        >
                          <option>General Enquiry</option>
                          <option>Product Information</option>
                          <option>Partnership Opportunity</option>
                          <option>Feedback / Suggestion</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                           <Phone className="w-4 h-4 rotate-90" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-surface-dark/60 ml-1 uppercase tracking-widest">Your Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      className="w-full bg-surface-light border-2 border-transparent rounded-2xl py-4 px-6 outline-none focus:border-brand-primary/20 focus:bg-white transition-all font-bold text-surface-dark text-base resize-none"
                    />
                  </div>

                  <div className="pt-6">
                    <button
                      disabled={isSubmitting || submitted}
                      className={cn(
                        "w-full md:w-auto px-12 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all text-white text-lg",
                        submitted ? "bg-green-500 shadow-xl" : "bg-brand-primary shadow-2xl shadow-brand-primary/30 hover:scale-[1.02] active:scale-[0.98] hover:bg-brand-primary/90"
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
              </div>

              {/* Decorative Blur in Form */}
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -mr-32 -mb-32 pointer-events-none" />
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
