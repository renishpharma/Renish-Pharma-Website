"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Share2, 
  MessageSquare, 
  ArrowUpRight 
} from "lucide-react";
import api from "@/lib/api";
import FeedbackModal from "@/components/FeedbackModal";

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about-us" },
      { name: "Our Commitment", href: "/about-us#commitment" },
      { name: "Global Presence", href: "/about-us#global" },
      { name: "Contact", href: "/contact-us" },
    ],
  },
  {
    title: "Products",
    links: [], // Populated dynamically
  },
  {
    title: "Resources",
    links: [
      { name: "Product Catalog", href: "/products" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  const [footerProducts, setFooterProducts] = useState<{name: string, href: string}[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchFooterProducts = async () => {
      try {
        const response = await api.get("/product", { params: { limit: 20, status: "active" } });
        const allProducts = response.data.data;
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4).map((p: any) => ({
          name: p.name,
          href: `/products/${p._id}`
        }));
        setFooterProducts(selected);
      } catch (error) {
        console.error("Failed to fetch footer products", error);
      }
    };
    fetchFooterProducts();
  }, []);

  return (
    <footer className="bg-white border-t border-primary-50 pt-20 pb-10 overflow-hidden relative">
      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-linear-to-bl from-primary-50/50 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-primary/20">
                R
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-surface-dark">
                  Renish <span className="text-brand-primary">Pharma</span>
                </span>
                <span className="text-[10px] font-bold text-brand-secondary tracking-[0.2em] uppercase -mt-1">
                  Healthcare Excellence
                </span>
              </div>
            </Link>
            
            <p className="text-surface-dark/60 max-w-sm leading-relaxed font-medium">
              Precision-engineered medicines, backed by global standards and a vision for healthier generations. Our promise, your health.
            </p>

            <div className="flex items-center gap-3">
              {[Globe, Share2, MessageSquare].map((Icon, idx) => (
                <button 
                  key={idx}
                  className="w-10 h-10 rounded-xl border border-primary-100 flex items-center justify-center text-surface-dark/40 hover:text-brand-primary hover:border-brand-primary hover:bg-primary-50 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-primary-50 text-brand-primary font-bold px-6 py-3 rounded-xl border border-primary-100 hover:bg-brand-primary hover:text-white transition-all group shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Give Feedback
            </button>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column) => (
            <div key={column.title} className="space-y-6">
              <h4 className="text-sm font-bold text-surface-dark uppercase tracking-widest">{column.title}</h4>
              <ul className="space-y-4">
                {(column.title === "Products" ? footerProducts : column.links).map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-surface-dark/50 hover:text-brand-primary text-sm font-bold transition-colors flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-t border-primary-50">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-surface-dark/40 uppercase tracking-widest">Call Us</p>
              <p className="text-sm font-bold text-surface-dark">9115990072</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-surface-dark/40 uppercase tracking-widest">Email Support</p>
              <p className="text-sm font-bold text-surface-dark">adminrenish@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-surface-dark/40 uppercase tracking-widest">Global HQ</p>
              <p className="text-sm font-bold text-surface-dark">Industrial Area, Pharma City, IN</p>
            </div>
          </div>
        </div>

        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-surface-dark/30 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Renish Pharma. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-surface-dark/40 uppercase tracking-widest">System Status: Optimal</span>
          </div>
        </div>
      </div>

      <FeedbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </footer>
  );
}
