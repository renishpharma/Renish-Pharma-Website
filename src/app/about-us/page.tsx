"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Target, 
  Eye, 
  Heart, 
  Award,
  FlaskConical,
  Globe2,
  Users2
} from "lucide-react";
import { cn } from "@/lib/utils";

const values = [
  {
    title: "Uncompromising Quality",
    desc: "We adhere to the highest international standards in every batch we produce.",
    icon: ShieldCheck,
    color: "bg-blue-50",
    text: "text-blue-600"
  },
  {
    title: "Patient Centricity",
    desc: "Every innovation is driven by a deep commitment to improving patient outcomes.",
    icon: Heart,
    color: "bg-red-50",
    text: "text-red-600"
  },
  {
    title: "Global Innovation",
    desc: "Leveraging cutting-edge R&D to develop next-generation medical solutions.",
    icon: FlaskConical,
    color: "bg-cyan-50",
    text: "text-cyan-600"
  },
  {
    title: "Ethical Leadership",
    desc: "Maintaining transparency and integrity in all our business relationships.",
    icon: Award,
    color: "bg-orange-50",
    text: "text-orange-600"
  }
];

export default function AboutUs() {
  return (
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <section className="bg-surface-light pt-40 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary-50/50 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.4em] mb-6">About Our Company</h1>
              <h2 className="text-5xl md:text-6xl font-bold text-surface-dark leading-[1.1] tracking-tight mb-8">
                Professionalism in <br />
                Every <span className="text-brand-secondary">Dose.</span>
              </h2>
              <p className="text-xl text-surface-dark/60 font-medium leading-relaxed">
                Precision-engineered medicines, backed by global standards and a vision for healthier generations. Our medicines are crafted with the highest level of professionalism, ensuring quality, safety, and trust.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="container mx-auto px-6 -mt-20 relative z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="aspect-video md:aspect-[21/9] rounded-5xl overflow-hidden shadow-3xl border-8 border-white"
        >
          <Image
            src="/images/hero_bg.png"
            alt="Laboratory"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-4xl border border-surface-light shadow-card space-y-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold text-surface-dark">Our Mission</h3>
            <p className="text-lg text-surface-dark/60 font-medium leading-relaxed">
              To enhance quality of life by providing innovative, high-quality, and affordable pharmaceutical products through continuous R&D and excellence in manufacturing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-4xl border border-surface-light shadow-card space-y-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold text-surface-dark">Our Vision</h3>
            <p className="text-lg text-surface-dark/60 font-medium leading-relaxed">
              To be a global benchmark in the pharmaceutical industry, recognized for our commitment to healthcare accessibility and scientific breakthrough.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-surface-light">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
             <h2 className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em]">Core Values</h2>
             <h3 className="text-4xl font-bold text-surface-dark tracking-tight">What Drives Our Success</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-4xl shadow-sm hover:shadow-xl transition-all group"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", v.color, v.text)}>
                  <v.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-surface-dark mb-3">{v.title}</h4>
                <p className="text-surface-dark/60 font-medium text-sm leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History/Timeline Section Placeholder */}
      <section className="py-24 container mx-auto px-6">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
               <h3 className="text-4xl font-bold text-surface-dark tracking-tight leading-tight">
                 A Legacy of <br />
                 <span className="text-brand-primary">Pharmaceutical Integrity</span>
               </h3>
               <p className="text-lg text-surface-dark/60 font-medium leading-relaxed">
                 From our first production line in 2008 to our current multi-national operations, Renish Pharma has remained steadfast in its goal: Healthcare for all.
               </p>
               
               <div className="space-y-4 pt-4">
                  {[
                    { year: "2008", event: "Foundation of Renish Pharma" },
                    { year: "2012", event: "Achievement of WHO-GMP Certification" },
                    { year: "2018", event: "Expansion into Global Export Markets" },
                    { year: "2024", event: "Launch of Advanced Biopharma Division" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-6 group">
                       <span className="text-2xl font-bold text-brand-primary/20 group-hover:text-brand-primary transition-colors duration-500 w-20">{item.year}</span>
                       <div className="flex-1 p-4 rounded-2xl border border-surface-light group-hover:bg-primary-50 group-hover:border-primary-100 transition-all font-bold text-surface-dark">
                         {item.event}
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="relative">
               <div className="aspect-square rounded-full border-[32px] border-surface-light overflow-hidden shadow-2xl relative">
                  <Image
                    src="/images/team.png"
                    alt="Our Team"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-tr from-brand-primary/40 to-transparent" />
               </div>
               {/* Floating Icon Badges */}
               <div className="absolute top-10 right-10 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-brand-primary animate-bounce">
                  <Globe2 className="w-8 h-8" />
               </div>
               <div className="absolute bottom-20 -left-5 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-brand-secondary animate-pulse">
                  <Users2 className="w-8 h-8" />
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
