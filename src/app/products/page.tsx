"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
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
      <section className="bg-surface-light pt-44 pb-20 border-b border-primary-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-2xl space-y-4">
              <h1 className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.4em]">Product Catalog</h1>
              <h2 className="text-4xl md:text-5xl font-bold text-surface-dark tracking-tight">
                Our Healthcare <span className="text-brand-secondary">Solutions.</span>
              </h2>
              <p className="text-lg text-surface-dark/60 font-medium">
                Browse our comprehensive range of pharmaceutical products, manufactured to the highest global quality standards.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:max-w-xl">
               <div className="relative flex-1 group w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-dark/20 group-focus-within:text-brand-primary transition-colors" />
                  <input 
                    type="text"
                    placeholder="Search by name or SKU..."
                    className="w-full bg-white border border-primary-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all font-bold text-surface-dark"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="mt-12 flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
             {categories.map((cat) => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={cn(
                   "px-6 py-3 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
                   activeCategory === cat 
                     ? "bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/20" 
                     : "bg-white text-surface-dark/60 border-primary-100 hover:border-brand-primary/30"
                 )}
               >
                 {cat}
               </button>
             ))}
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
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={p._id}
                  className="bg-white rounded-4xl border border-primary-50 overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] flex flex-col"
                >
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
                       <Link 
                         href={`/products/${p._id}`}
                         className="w-10 h-10 rounded-xl bg-primary-50 text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all"
                       >
                         <ChevronRight className="w-5 h-5" />
                       </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Banner */}
      <section className="bg-surface-dark py-12 text-white overflow-hidden relative">
         <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex items-center gap-6">
               <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white/40">
                  <Info className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-lg font-bold">Can't find what you're looking for?</p>
                  <p className="text-white/60 text-sm font-medium">Contact our sales team for custom manufacturing or bulk enquiries.</p>
               </div>
            </div>
            <Link 
              href="/contact-us"
              className="bg-brand-primary text-white font-bold px-8 py-4 rounded-2xl hover:scale-[1.05] transition-all whitespace-nowrap"
            >
               Get in Touch
            </Link>
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
