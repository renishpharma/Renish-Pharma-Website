"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, FlaskConical, Package, Star, Loader2 } from "lucide-react";
import api from "@/lib/api";
import { Product } from "@/types";

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        // Fetch only active, featured products
        const response = await api.get("/product", {
          params: { featured: true, status: "active", limit: 4 }
        });
        setFeaturedProducts(response.data.data.slice(0, 4)); // Ensure max 4
      } catch (error) {
        console.error("Failed to fetch featured products", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white border-t border-primary-50">
        <div className="container mx-auto px-6 flex justify-center">
          <Loader2 className="w-10 h-10 text-brand-primary animate-spin" />
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return null; // Don't show the section if no featured products
  }

  return (
    <section className="py-24 bg-white border-t border-primary-50 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-2">
              <Star className="w-4 h-4 text-brand-primary fill-brand-primary" />
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Premium Selection</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-surface-dark tracking-tight">Featured Products</h3>
            <p className="text-lg text-surface-dark/60 font-medium">
              Discover our top-tier pharmaceutical formulations, manufactured under strict WHO-GMP guidelines for maximum efficacy.
            </p>
          </div>
          <Link 
            href="/products"
            className="group flex items-center gap-2 text-brand-primary font-bold hover:text-brand-primary/80 transition-colors"
          >
            View Full Catalog
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ChevronRight className="w-5 h-5" />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, idx) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={`/products/${product._id}`} className="group block h-full">
                <div className="bg-surface-light rounded-4xl p-6 border border-surface-light hover:border-brand-primary/20 transition-all shadow-card hover:shadow-premium h-full flex flex-col relative overflow-hidden">
                  
                  {/* Image Container */}
                  <div className="aspect-square relative rounded-3xl bg-white mb-6 overflow-hidden">
                    <Image
                      src={product.media[0]?.url || "/placeholder-product.png"}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-colors" />
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-lg bg-white border border-primary-100 text-[10px] font-bold text-brand-primary uppercase tracking-widest shadow-sm">
                      {product.category}
                    </span>
                  </div>

                  {/* Content */}
                  <h4 className="text-xl font-bold text-surface-dark mb-2 line-clamp-1 group-hover:text-brand-primary transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-sm font-medium text-surface-dark/60 line-clamp-2 mb-6 grow">
                    {product.shortDescription || product.description}
                  </p>

                  {/* Specs */}
                  <div className="pt-4 border-t border-primary-50 grid grid-cols-2 gap-4 mt-auto">
                     <div className="flex items-center gap-2">
                        <FlaskConical className="w-4 h-4 text-brand-primary opacity-60" />
                        <span className="text-xs font-bold text-surface-dark truncate" title={product.composition || "N/A"}>
                          {product.composition || "Comp. N/A"}
                        </span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-brand-primary opacity-60" />
                        <span className="text-xs font-bold text-surface-dark truncate" title={product.packaging || "N/A"}>
                          {product.packaging || "Pack N/A"}
                        </span>
                     </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
