"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  ShieldCheck, 
  Globe2, 
  FlaskConical, 
  Users2,
  ArrowRight,
  Play
} from "lucide-react";
import { cn } from "@/lib/utils";

import ReviewSection from "@/components/ReviewSection";
import CertificationSection from "@/components/CertificationSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_bg.png"
            alt="Pharmaceutical Lab"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-white via-white/90 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Global Healthcare Leader</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-surface-dark leading-[1.1] tracking-tight mb-8">
                Professionalism in <br />
                Every <span className="text-brand-primary">Dose.</span>
              </h1>
              
              <p className="text-xl text-surface-dark/60 font-medium leading-relaxed mb-10 max-w-xl">
                Precision-engineered medicines, backed by global standards and a vision for healthier generations.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/products"
                  className="w-full sm:w-auto bg-brand-primary text-white font-bold px-10 py-5 rounded-2xl shadow-2xl shadow-brand-primary/30 flex items-center justify-center gap-2 hover:bg-brand-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  View Product Range
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/about-us"
                  className="w-full sm:w-auto bg-white text-surface-dark font-bold px-10 py-5 rounded-2xl border border-surface-light shadow-lg flex items-center justify-center gap-2 hover:bg-surface-light transition-all"
                >
                  Our Story
                </Link>
              </div>

              {/* Trust Badges */}
              <CertificationSection />
            </motion.div>
          </div>
        </div>

        {/* Decorative Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 hidden lg:block"
        >
          <div className="relative aspect-square">
             <div className="absolute inset-0 bg-brand-primary/5 rounded-full animate-pulse" />
             <div className="absolute inset-10 bg-brand-secondary/5 rounded-full animate-pulse delay-700" />
          </div>
        </motion.div>
      </section>

      {/* Featured Statistics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Products", value: "250+", icon: FlaskConical },
              { label: "Global Partners", value: "45+", icon: Globe2 },
              { label: "Expert Staff", value: "120+", icon: Users2 },
              { label: "Years Excellence", value: "15+", icon: ShieldCheck },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center space-y-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-brand-primary mb-2">
                  <stat.icon className="w-7 h-7" />
                </div>
                <h3 className="text-4xl font-bold text-surface-dark tracking-tight">{stat.value}</h3>
                <p className="text-[10px] font-bold text-surface-dark/40 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-24 bg-surface-light">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-4/5 rounded-4xl overflow-hidden shadow-2xl relative group">
                <Image
                  src="/images/team.png"
                  alt="Our Team"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-primary/40 to-transparent" />
                
                {/* Floating Card */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl">
                   <p className="text-lg font-bold text-surface-dark mb-1">Uncompromising Quality</p>
                   <p className="text-sm text-surface-dark/60 font-medium">Every product undergoes rigorous multi-stage testing in our state-of-the-art facility.</p>
                </div>
              </div>
              
              {/* Experience Badge */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-secondary rounded-full flex flex-col items-center justify-center text-white shadow-xl rotate-12">
                 <span className="text-3xl font-bold">15+</span>
                 <span className="text-[8px] font-bold uppercase tracking-widest text-center">Years of Trust</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em]">Our Commitment</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-surface-dark leading-tight">
                  Our promise, <br />
                  <span className="text-brand-secondary">Your health.</span>
                </h3>
              </div>

              <p className="text-lg text-surface-dark/60 font-medium leading-relaxed">
                Our commitment is clear — delivering quality medicines on time, every time. Quality is our first priority.
              </p>

              <div className="space-y-6">
                {[
                  "Professionalism in every pill",
                  "Global standards of healthcare",
                  "Innovation meets care",
                  "Reliability and uncompromising quality"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-surface-dark/80">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Link
                  href="/about-us"
                  className="inline-flex items-center gap-3 text-brand-primary font-bold group"
                >
                  <span>Learn more about our standards</span>
                  <div className="w-10 h-10 rounded-full border border-primary-100 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">Portfolio</h2>
          <h3 className="text-4xl font-bold text-surface-dark">Medicine Categories</h3>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Tablets & Capsules", desc: "Solid dosage forms with precise active ingredients.", color: "bg-blue-50", text: "text-blue-600" },
            { name: "Liquid Orals", desc: "Palatable syrups and suspensions for all ages.", color: "bg-cyan-50", text: "text-cyan-600" },
            { name: "Injectables", desc: "Sterile solutions for immediate clinical response.", color: "bg-indigo-50", text: "text-indigo-600" },
          ].map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-surface-light p-10 rounded-4xl border border-surface-light hover:border-brand-primary/20 transition-all group cursor-pointer shadow-card"
            >
               <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center mb-8 shadow-sm", cat.color, cat.text)}>
                  <FlaskConical className="w-8 h-8" />
               </div>
               <h4 className="text-xl font-bold text-surface-dark mb-4">{cat.name}</h4>
               <p className="text-surface-dark/60 font-medium mb-8 leading-relaxed">
                 {cat.desc}
               </p>
               <Link href={`/products?category=${encodeURIComponent(cat.name)}`} className="flex items-center gap-2 text-sm font-bold text-brand-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                 View Items
                 <ChevronRight className="w-4 h-4" />
               </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <ReviewSection />

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative rounded-5xl bg-brand-primary overflow-hidden p-12 md:p-24 text-center text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#fff_0%,transparent_50%)]" />
               <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,#01A3D4_0%,transparent_50%)]" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 space-y-10 max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                Ready to Partner with <br />
                Healthcare Leaders?
              </h2>
              <p className="text-xl text-white/80 font-medium leading-relaxed">
                Join our network of global distributors and healthcare providers. Let&apos;s make medicine accessible together.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/contact-us"
                  className="w-full sm:w-auto bg-white text-brand-primary font-bold px-12 py-5 rounded-2xl shadow-2xl hover:bg-surface-light transition-all flex items-center justify-center gap-2"
                >
                  Partner with Us
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="flex items-center gap-3 font-bold hover:text-white/80 transition-colors">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/10">
                    <Play className="w-4 h-4 fill-white" />
                  </div>
                  <span>Watch Corporate Film</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
