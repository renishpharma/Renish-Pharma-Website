"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  ChevronRight,
  ShieldAlert,
  Server,
  UserCheck,
  Mail
} from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  {
    id: "info",
    title: "Information We Collect",
    icon: Eye,
    color: "text-blue-600",
    bg: "bg-blue-50",
    content: "At Renish Pharmaceutical, we collect information that helps us provide a better experience and more accurate lead management for our pharmaceutical solutions. This includes professional details like your Name, Designation, and Role in Healthcare, as well as contact information such as Email addresses and Phone numbers."
  },
  {
    id: "usage",
    title: "How We Use Your Data",
    icon: Lock,
    color: "text-brand-primary",
    bg: "bg-primary-50",
    content: "Your data is exclusively used to facilitate B2B communication and provide medical product information. We use this information to process your enquiries, improve our pharmaceutical catalog, and ensure that our medical solutions reach the right healthcare professionals."
  },
  {
    id: "security",
    title: "Security Measures",
    icon: ShieldAlert,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    content: "We implement enterprise-grade security protocols to protect your professional data. All lead submissions are encrypted and stored in our secure administrative dashboard, accessible only by authorized Renish Pharmaceutical personnel."
  },
  {
    id: "sharing",
    title: "Third-Party Disclosure",
    icon: Server,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    content: "Renish Pharmaceutical does not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website or conducting our business, so long as those parties agree to keep this information confidential."
  },
  {
    id: "consent",
    title: "Your Consent",
    icon: UserCheck,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    content: "By using our site and submitting enquiries, you consent to our website's privacy policy. We reserve the right to update this policy at any time to reflect changes in our practices or for other operational, legal, or regulatory reasons."
  }
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="bg-surface-light pt-44 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary-50/50 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="w-20 h-20 rounded-3xl bg-brand-primary flex items-center justify-center text-white mx-auto shadow-2xl shadow-brand-primary/20 mb-8">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-surface-dark tracking-tight">
              Privacy <span className="text-brand-primary">Policy.</span>
            </h1>
            <p className="text-xl text-surface-dark/60 font-medium leading-relaxed">
              Our commitment to protecting your professional data and ensuring transparency in how we handle healthcare information.
            </p>
            <div className="flex items-center justify-center gap-2 pt-4">
              <span className="px-4 py-2 rounded-full bg-white border border-primary-100 text-[10px] font-bold text-brand-primary uppercase tracking-widest">
                Version 2.0
              </span>
              <span className="text-[10px] font-bold text-surface-dark/30 uppercase tracking-widest">
                Effective: April 2026
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          {sections.map((section, idx) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start group"
            >
              <div className="md:col-span-1">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6 shadow-sm",
                  section.bg,
                  section.color
                )}>
                  <section.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="md:col-span-11 space-y-4">
                <h2 className="text-2xl font-bold text-surface-dark tracking-tight flex items-center gap-3">
                  {section.title}
                </h2>
                <p className="text-lg text-surface-dark/60 font-medium leading-relaxed">
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Contact Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 p-12 rounded-5xl bg-surface-light border border-primary-100 relative overflow-hidden text-center"
          >
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-bold text-surface-dark">Questions about our privacy practices?</h3>
              <p className="text-surface-dark/60 font-medium max-w-xl mx-auto">
                If you have any questions regarding this privacy policy, you may contact our data protection officer directly.
              </p>
              <a
                href="mailto:renishpharmaceutical@gmail.com"
                className="inline-flex items-center gap-3 bg-brand-primary text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-[1.05] transition-all"
              >
                <Mail className="w-5 h-5" />
                renishpharmaceutical@gmail.com
              </a>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl -mr-16 -mt-16" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
