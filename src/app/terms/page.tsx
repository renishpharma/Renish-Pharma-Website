"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Scale, 
  AlertCircle, 
  CheckCircle,
  Globe2,
  ShieldCheck,
  Stethoscope,
  Info,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const termSections = [
  {
    title: "Acceptance of Terms",
    icon: CheckCircle,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    content: "By accessing and using the Renish Pharmaceutical website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, please do not use our services."
  },
  {
    title: "Non-Commercial Platform",
    icon: Info,
    color: "text-brand-primary",
    bg: "bg-primary-50",
    content: "This website serves as a professional product showcase for healthcare entities. No direct financial transactions for pharmaceutical purchases occur on this site. All business interactions are handled through official B2B channels."
  },
  {
    title: "Intellectual Property",
    icon: ShieldCheck,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    content: "All content, including product descriptions, images, logos, and technical specifications, is the intellectual property of Renish Pharmaceutical. Unauthorized reproduction or commercial use is strictly prohibited."
  },
  {
    title: "Professional Accuracy",
    icon: Stethoscope,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    content: "Users agree to provide accurate, current, and complete information when submitting enquiries. Our platform is intended for use by licensed healthcare professionals and authorized pharmaceutical distributors."
  },
  {
    title: "Limitation of Liability",
    icon: Scale,
    color: "text-orange-600",
    bg: "bg-orange-50",
    content: "Renish Pharmaceutical shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the information provided on this website."
  }
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="bg-surface-light pt-44 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary-50/50 to-transparent pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="w-20 h-20 rounded-3xl bg-brand-secondary flex items-center justify-center text-white mx-auto shadow-2xl shadow-brand-secondary/20 mb-8">
              <FileText className="w-10 h-10" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-surface-dark tracking-tight">
              Terms of <span className="text-brand-secondary">Service.</span>
            </h1>
            <p className="text-xl text-surface-dark/60 font-medium leading-relaxed">
              Establishing the legal framework for professional interactions on our pharmaceutical showcase platform.
            </p>
            <div className="flex items-center justify-center gap-2 pt-4">
               <span className="px-4 py-2 rounded-full bg-white border border-primary-100 text-[10px] font-bold text-brand-secondary uppercase tracking-widest">
                 Standard B2B Terms
               </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {termSections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 rounded-4xl border border-surface-light hover:border-brand-secondary/20 hover:shadow-2xl transition-all group"
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:rotate-6 shadow-sm",
                  section.bg,
                  section.color
                )}>
                  <section.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-surface-dark mb-4">{section.title}</h3>
                <p className="text-lg text-surface-dark/60 font-medium leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Legal Disclaimer Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-12 rounded-5xl bg-surface-dark text-white relative overflow-hidden"
          >
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="space-y-4 max-w-xl">
                   <h3 className="text-3xl font-bold">Medical Disclaimer</h3>
                   <p className="text-white/60 font-medium leading-relaxed">
                     The contents of this website are for informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
                   </p>
                </div>
                <div className="w-full md:w-auto">
                   <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                      <p className="text-sm font-bold uppercase tracking-widest text-brand-secondary mb-2">Governing Law</p>
                      <p className="text-lg font-bold">Indian Pharmaceutical Regulations</p>
                   </div>
                </div>
             </div>
             <AlertCircle className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5" />
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 border-t border-primary-50">
         <div className="container mx-auto px-6 text-center">
            <p className="text-surface-dark/40 font-bold uppercase tracking-[0.3em] mb-8">Need Legal Clarification?</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
               <a href="/contact-us" className="flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all">
                 Contact Support <ArrowRight className="w-4 h-4" />
               </a>
               <div className="w-2 h-2 rounded-full bg-surface-dark/10" />
               <a href="/privacy" className="flex items-center gap-2 text-brand-secondary font-bold hover:gap-3 transition-all">
                 Read Privacy Policy <ArrowRight className="w-4 h-4" />
               </a>
            </div>
         </div>
      </section>
    </div>
  );
}
