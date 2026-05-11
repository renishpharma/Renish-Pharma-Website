"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ShieldCheck,
  Globe2,
  FlaskConical,
  Users2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

import ReviewSection from "@/components/ReviewSection";
import CertificationSection from "@/components/CertificationSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroCarousel from "@/components/HeroCarousel";
import LatestBlogs from "@/components/LatestBlogs";
import HomepageEnquiry from "@/components/HomepageEnquiry";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import ParallaxElements from "@/components/ParallaxElements";
import CommitmentCarousel from "@/components/CommitmentCarousel";

export default function Home() {
  return (
    <div className="flex flex-col w-full relative overflow-hidden ">
      {/* Global Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{ backgroundImage: "radial-gradient(#01A3D4 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <ParallaxElements />

      {/* Global Decorative Blobs for Alignment */}
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-primary-50/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[30%] h-[30%] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[70%] left-[-5%] w-[25%] h-[25%] bg-primary-50/40 rounded-full blur-[80px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-20 bg-white min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Dynamic Carousel Background */}
        <HeroCarousel />

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

              <h1 className="hidden sm:block text-5xl md:text-7xl font-bold text-surface-dark leading-[1.1] tracking-tight mb-8">
                Professionalism in <br />
                Every <span className="text-brand-primary">Dose.</span>
              </h1>
              <h1 className="block sm:hidden text-4xl md:text-7xl font-bold text-surface-dark leading-[1.1] tracking-tight mb-8">
                Professionalism in Every <span className="text-brand-primary">Dose.</span>
              </h1>

              <p className="text-lg sm:text-xl text-surface-dark/60 font-medium leading-relaxed mb-10 max-w-xl">
                Renish Pharmaceutical is the <span className="text-brand-primary font-bold">Top PCD pharma franchise company</span> in Chandigarh. We manufacture precision-engineered medicines backed by global standards, offering exclusive monopoly rights and third party manufacturing services.
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
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 w-1/2 items-center justify-center pr-12 z-20 pointer-events-auto"
        >
          <div className="relative w-[130%] sm:w-[150%] lg:w-full aspect-square max-w-125 sm:max-w-150 lg:max-w-xl flex items-center justify-center">
            <div className="absolute inset-0 bg-brand-primary/10 rounded-full blur-[60px] lg:blur-[100px] animate-pulse" />
            <InteractiveGlobe />
          </div>
        </motion.div>
      </section>

      {/* Commitment Section */}
      <section className="py-24 bg-surface-light relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-3/2 rounded-4xl overflow-hidden shadow-2xl relative group">
                <CommitmentCarousel />
                
                {/* Floating Card */}
                <div className="absolute hidden md:block bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl z-20">
                  <p className="text-lg font-bold text-surface-dark mb-1">Uncompromising Quality</p>
                  <p className="text-sm text-surface-dark/60 font-medium">Every product undergoes rigorous multi-stage testing in our state-of-the-art facility.</p>
                </div>
              </div>

              {/* Experience Badge */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-secondary rounded-full flex flex-col items-center justify-center text-white shadow-xl rotate-12 z-20">
                <span className="text-3xl font-bold">5+</span>
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
                  Top PCD Pharma Franchise <br />
                  <span className="text-brand-secondary">Company in Panchkula.</span>
                </h3>
              </div>

              <p className="text-lg text-surface-dark/60 font-medium leading-relaxed">
                We deploy a highly skilled workforce for R&D, quality management, and logistics. Our vision is for healthier generations, dealing in a general range of premium pharmaceutical products with years of experience.
              </p>

              <div className="space-y-6">
                {[
                  "Exclusive Monopoly Rights",
                  "Premium Quality Products",
                  "Professionalism in Every Dose",
                  "Global Standard Manufacturing"
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

      {/* Featured Statistics */}
      <section className="py-20 bg-white border-b border-surface-light relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Products", value: "100+", icon: FlaskConical },
              { label: "Team Members", value: "10+", icon: Globe2 },
              { label: "Client Satisfaction Rate", value: "96%", icon: Users2 },
              { label: "Years Excellence", value: "5+", icon: ShieldCheck },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  delay: idx * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="flex flex-col items-center text-center space-y-3 p-6 rounded-3xl hover:bg-surface-light transition-colors group cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-brand-primary mb-2 group-hover:rotate-12 transition-transform shadow-sm">
                  <stat.icon className="w-7 h-7" />
                </div>
                <h3 className="text-3xl md:text-5xl font-bold text-surface-dark tracking-tight">{stat.value}</h3>
                <p className="text-[10px] font-bold text-surface-dark/40 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <FeaturedProducts />
      </div>

      <section className="py-24 bg-white relative overflow-hidden">
        {/* Excellence Pillars Section (Based on Reference Images) */}

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">Our Excellence</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-surface-dark mb-6">Built on Trust & Innovation</h3>
            <p className="text-lg text-surface-dark/60 font-medium leading-relaxed">
              Renish Pharmaceutical is the best PCD pharma franchise company in Chandigarh and Panchkula. We provide professionalism in every dose, manufacturing precision-engineered medicines backed by global standards, specialized in monopoly rights and third party manufacturing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "PCD PHARMA FRANCHISE",
                desc: "We provide pharma franchise opportunities, boosting business growth of pharma professionals through marketing strategies and provision of quality products.",
                icon: <Users2 className="w-8 h-8" />,
                color: "bg-blue-50 text-blue-600"
              },
              {
                title: "RESEARCH & INNOVATION",
                desc: "Our research and development division introduces novel formulations and enhances the existing ones to meet the evolving requirements of patients.",
                icon: <FlaskConical className="w-8 h-8" />,
                color: "bg-purple-50 text-purple-600"
              },
              {
                title: "COMPETITIVE PRICING",
                desc: "We strive to ensure essential medicines remain reachable without compromising their quality, maintaining high standards with competitive pricing.",
                icon: <ShieldCheck className="w-8 h-8" />,
                color: "bg-green-50 text-green-600"
              },
              {
                title: "TIMELY DELIVERY",
                desc: "We ensure fast and reliable delivery across India to support your business without delays, backed by efficient logistics management.",
                icon: <Globe2 className="w-8 h-8" />,
                color: "bg-orange-50 text-orange-600"
              },
              {
                title: "MONOPOLY RIGHTS",
                desc: "Get exclusive monopoly rights in your area to grow your pharma business without competition, ensuring sustainable market presence.",
                icon: <ShieldCheck className="w-8 h-8" />,
                color: "bg-cyan-50 text-cyan-600"
              },
              {
                title: "PREMIUM QUALITY PRODUCTS",
                desc: "We deploy the best skilled and experienced workforce for R&D and production to deliver premium, precision-engineered medicines.",
                icon: <FlaskConical className="w-8 h-8" />,
                color: "bg-indigo-50 text-indigo-600"
              }
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: idx * 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="p-10 rounded-4xl bg-surface-light/50 border border-surface-light hover:border-brand-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-brand-primary/5 transition-all group"
              >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500", pillar.color)}>
                  {pillar.icon}
                </div>
                <h4 className="text-xl font-bold text-surface-dark mb-4 group-hover:text-brand-primary transition-colors">{pillar.title}</h4>
                <p className="text-surface-dark/60 font-medium leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 text-center mb-16 relative z-10">
          <h2 className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">Portfolio</h2>
          <h3 className="text-4xl font-bold text-surface-dark">Medicine Categories</h3>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {[
            { name: "Tablets & Capsules", desc: "Solid dosage forms with precise active ingredients.", color: "bg-blue-50", text: "text-blue-600" },
            { name: "Liquid Orals", desc: "Palatable syrups and suspensions for all ages.", color: "bg-cyan-50", text: "text-cyan-600" },
            { name: "Ayurvedic", desc: "Time-tested herbal remedies for holistic wellness.", color: "bg-emerald-50", text: "text-emerald-600" },
            { name: "Others", desc: "Specialized Ointments, Nutraceuticals, and more.", color: "bg-indigo-50", text: "text-indigo-600" },
          ].map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-surface-light rounded-4xl border border-surface-light hover:border-brand-primary/20 transition-all group cursor-pointer shadow-card flex flex-col h-full"
            >
              <Link href={`/products?category=${encodeURIComponent(cat.name)}`} className="p-10 flex flex-col h-full w-full">
                <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center mb-8 shadow-sm", cat.color, cat.text)}>
                  <FlaskConical className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-surface-dark mb-4">{cat.name}</h4>
                <p className="text-surface-dark/60 font-medium mb-8 leading-relaxed grow">
                  {cat.desc}
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-brand-primary uppercase tracking-widest transition-all mt-auto">
                  View Items
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <ReviewSection />

      <LatestBlogs />

      <HomepageEnquiry />

      {/* Trust Badges Banner */}
      <section className="py-16 bg-surface-light relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h3 className="text-surface-dark/60 font-bold uppercase tracking-[0.4em] mb-12 text-sm">Certified By Global Regulatory Bodies</h3>
          <CertificationSection />
        </div>
      </section>
    </div>
  );
}
