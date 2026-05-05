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
      {/* Premium Header Section */}
      <section className="bg-surface-light pt-44 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary-50/50 to-transparent pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.5em] mb-8">Pioneering Healthcare Excellence</h1>
              <h2 className="text-5xl md:text-7xl font-bold text-surface-dark leading-[1.05] tracking-tight mb-10">
                Professionalism in
                Every Single <span className="text-brand-secondary">Dose.</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                 <p className="text-xl text-surface-dark/60 font-medium leading-relaxed">
                   Renish Pharmaceutical is the best PCD pharma franchise company in Chandigarh and Panchkula. We provide professionalism in every dose, by manufacturing precision-engineered medicines, backed by global standards and a vision for healthier generations.
                 </p>
                 <p className="text-lg text-surface-dark/50 font-medium leading-relaxed pt-1">
                   With our years of experience in this industry and dedicated teamwork as a family, we deal in a general range of pharmaceutical products, including third party manufacturing and monopoly rights services. We deploy the best skilled and experienced workforce for R&D, quality management, production, packaging, and logistics.
                 </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="pb-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="relative aspect-square rounded-[4rem] overflow-hidden shadow-3xl border-8 border-white group"
           >
             <Image
               src="/images/team.png"
               alt="Renish Pharmaceutical Team"
               fill
               sizes="(max-width: 768px) 100vw, 50vw"
               className="object-cover group-hover:scale-105 transition-transform duration-1000"
             />
             <div className="absolute inset-0 bg-linear-to-t from-brand-primary/40 to-transparent" />
           </motion.div>

           <div className="space-y-12">
              <div className="space-y-4">
                 <h3 className="text-4xl font-bold text-surface-dark tracking-tight">Leading the Way in PCD Pharma Franchise</h3>
                 <div className="h-1.5 w-24 bg-brand-secondary rounded-full" />
              </div>
              
              <div className="space-y-8">
                 <p className="text-xl text-surface-dark/70 font-medium leading-relaxed">
                   We are one of the leading PCD pharma franchise companies in India, specializing in monopoly rights and high-quality third party manufacturing. Our commitment to excellence is reflected in our state-of-the-art facilities and our unwavering focus on global quality standards.
                 </p>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {[
                      { icon: FlaskConical, title: "Precision R&D", desc: "Skilled workforce for advanced formulations." },
                      { icon: ShieldCheck, title: "Quality First", desc: "Rigorous quality management systems." },
                      { icon: Globe2, title: "Global Reach", desc: "Medicines backed by global standards." },
                      { icon: Users2, title: "Family Values", desc: "Dedicated teamwork as a family unit." },
                    ].map((item, idx) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex gap-4"
                      >
                         <div className="w-12 h-12 rounded-2xl bg-surface-light flex items-center justify-center text-brand-primary shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-all">
                            <item.icon className="w-6 h-6" />
                         </div>
                         <div>
                            <h4 className="font-bold text-surface-dark mb-1">{item.title}</h4>
                            <p className="text-sm text-surface-dark/40 font-medium">{item.desc}</p>
                         </div>
                      </motion.div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Mission & Vision: Glassmorphism */}
      <section className="py-32 bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,#fff_0%,transparent_50%)]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-xl p-12 md:p-16 rounded-[4rem] border border-white/10 space-y-8 group hover:bg-white/10 transition-all duration-500"
            >
              <div className="w-20 h-20 rounded-3xl bg-brand-primary/20 flex items-center justify-center text-brand-primary shadow-xl shadow-brand-primary/10">
                <Target className="w-10 h-10" />
              </div>
              <div className="space-y-4">
                 <h3 className="text-4xl font-bold text-white">Our Mission</h3>
                 <p className="text-xl text-white/60 font-medium leading-relaxed">
                   To redefine healthcare by delivering precision-engineered pharmaceutical products that meet global standards, ensuring a healthier and safer future for generations to come.
                 </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-xl p-12 md:p-16 rounded-[4rem] border border-white/10 space-y-8 group hover:bg-white/10 transition-all duration-500"
            >
              <div className="w-20 h-20 rounded-3xl bg-brand-secondary/20 flex items-center justify-center text-brand-secondary shadow-xl shadow-brand-secondary/10">
                <Eye className="w-10 h-10" />
              </div>
              <div className="space-y-4">
                 <h3 className="text-4xl font-bold text-white">Our Vision</h3>
                 <p className="text-xl text-white/60 font-medium leading-relaxed">
                   To be recognized as the global benchmark for professionalism and integrity in pharmaceutical, expanding our family of partners and patients worldwide.
                 </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid: Clean Cards */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
             <h2 className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.4em]">Guided by Integrity</h2>
             <h3 className="text-4xl md:text-5xl font-bold text-surface-dark tracking-tight">The Renish Pharmaceutical Way</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 rounded-[3rem] border border-primary-50 bg-surface-light/50 hover:bg-white hover:shadow-2xl hover:shadow-brand-primary/10 transition-all group cursor-default"
              >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm", v.color, v.text)}>
                  <v.icon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-surface-dark mb-4">{v.title}</h4>
                <p className="text-surface-dark/60 font-medium leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
