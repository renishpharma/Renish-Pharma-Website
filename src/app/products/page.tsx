"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronRight,
  FlaskConical,
  Loader2,
  Package,
  ArrowRight,
  Info
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import { Product } from "@/types";

const categories = [
  "All",
  "Tablets & Capsules",
  "Liquid Orals",
  "Ayurvedic",
  "Nutraceuticals"
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(categoryParam || "All");

  // Sync state if URL param changes
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/product", {
        params: {
          search: searchTerm,
          category: activeCategory === "All" ? undefined : activeCategory,
          status: "active" // Only show active products on website
        }
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, activeCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Search & Filter Header */}
      <section className="bg-surface-light pt-44 pb-16 border-b border-primary-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl space-y-4 mb-16">
            <h1 className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.4em]">Product Catalog</h1>
            <h2 className="text-4xl md:text-6xl font-bold text-surface-dark tracking-tight">
              Our Healthcare <span className="text-brand-secondary">Solutions.</span>
            </h2>
            <p className="text-xl text-surface-dark/60 font-medium leading-relaxed">
              Browse our comprehensive range of pharmaceutical products, manufactured to the highest global quality standards.
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            {/* Category Pills */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-6 py-3.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border",
                    activeCategory === cat
                      ? "bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/20"
                      : "bg-white text-surface-dark/60 border-primary-100 hover:border-brand-primary/30"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:max-w-sm group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-dark/20 group-focus-within:text-brand-primary transition-colors" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-white border border-primary-100 rounded-2xl py-4 pl-14 pr-6 outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all font-bold text-surface-dark text-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-20 flex-1">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
              <p className="text-[10px] font-bold text-surface-dark/20 uppercase tracking-[0.4em]">Initializing Catalog...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-40 text-center space-y-6">
              <div className="w-20 h-20 rounded-4xl bg-surface-light flex items-center justify-center text-surface-dark/20">
                <Package className="w-10 h-10" />
              </div>
              <div>
                <p className="text-2xl font-bold text-surface-dark mb-2">No products found</p>
                <p className="text-surface-dark/60 font-medium">Try adjusting your filters or search terms.</p>
              </div>
              <button
                onClick={() => { setSearchTerm(""); setActiveCategory("All"); }}
                className="text-brand-primary font-bold flex items-center gap-2 hover:gap-3 transition-all"
              >
                Clear all filters
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((p, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5,
                    delay: (idx % 4) * 0.1,
                    ease: "easeOut"
                  }}
                  key={p._id}
                  className="bg-white rounded-4xl border border-primary-50 overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] flex flex-col"
                >
                  <Link href={`/products/${p._id}`} className="flex flex-col h-full w-full">
                    {/* Image Container */}
                    <div className="aspect-square relative bg-surface-light overflow-hidden">
                      <Image
                        src={p.media?.[0]?.url || "/placeholder-product.png"}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-lg bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-brand-primary shadow-sm">
                          {p.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-1 space-y-4">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-surface-dark/40 uppercase tracking-widest">{p.sku}</p>
                        <h3 className="text-xl font-bold text-surface-dark group-hover:text-brand-primary transition-colors truncate">{p.name}</h3>
                      </div>

                      <p className="text-sm text-surface-dark/60 font-medium line-clamp-2 leading-relaxed">
                        {p.shortDescription || p.description}
                      </p>

                      <div className="pt-4 flex items-center justify-between border-t border-primary-50 mt-auto">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-brand-secondary uppercase tracking-widest">
                          <FlaskConical className="w-3 h-3" />
                          <span>Tested Quality</span>
                        </div>
                        <div
                          className="w-10 h-10 rounded-xl bg-primary-50 text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Premium Info Banner */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="relative overflow-hidden bg-brand-primary rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-brand-primary/20 group">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-secondary/20 rounded-full blur-3xl -ml-32 -mb-32" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl text-center lg:text-left space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80">
                  <Info className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Custom Requirements</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  Can&apos;t find what you&apos;re <br className="hidden md:block" />
                  looking for?
                </h3>
                <p className="text-lg text-white/70 font-medium leading-relaxed">
                  Our team of experts is ready to assist you with custom manufacturing,
                  bulk pharmaceutical enquiries, or specific formulation requests.
                </p>
              </div>

              <div className="flex flex-col items-center gap-4">
                <Link
                  href="/contact-us"
                  className="bg-white text-brand-primary font-bold px-10 py-5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all whitespace-nowrap text-lg"
                >
                  Contact Sales Team
                </Link>
                <div className="flex flex-col items-center">
                  <p className="text-white font-bold">Quick Support</p>
                  <p className="text-white/60 text-sm">Response within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ProductsListing() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
        <p className="text-[10px] font-bold text-surface-dark/20 uppercase tracking-[0.4em]">Loading Catalog...</p>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
