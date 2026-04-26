"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  ShieldCheck, 
  Info, 
  ArrowRight,
  FlaskConical,
  Package,
  Layers,
  Scale,
  Loader2,
  PhoneCall
} from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import EnquiryModal from "@/components/products/EnquiryModal";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/product/${id}`);
      setProduct(response.data.data);
    } catch (error) {
      console.error("Failed to fetch product", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
        <p className="text-[10px] font-bold text-surface-dark/20 uppercase tracking-[0.4em]">Retrieving Specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center px-6">
        <Package className="w-16 h-16 text-surface-dark/10" />
        <h1 className="text-3xl font-bold text-surface-dark">Product Not Found</h1>
        <p className="text-surface-dark/60 font-medium">The product you are looking for might have been moved or discontinued.</p>
        <Link href="/products" className="bg-brand-primary text-white font-bold px-8 py-4 rounded-2xl">
          Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Breadcrumb & Quick Actions */}
      <section className="bg-surface-light pt-32 pb-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/products"
              className="flex items-center gap-2 text-sm font-bold text-surface-dark/40 hover:text-brand-primary transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
                 <ChevronLeft className="w-4 h-4" />
              </div>
              Back to Catalog
            </Link>
            <div className="flex items-center gap-4">
               <span className="hidden md:inline text-[10px] font-bold text-surface-dark/30 uppercase tracking-widest">Available globally</span>
               <div className="flex items-center gap-1.5 text-green-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">In Stock</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Media Gallery */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square relative rounded-5xl bg-surface-light overflow-hidden shadow-2xl border border-primary-50"
            >
              <Image
                src={product.media[activeImage]?.url || "/placeholder-product.png"}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
            
            {product.media.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.media.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "aspect-square relative rounded-2xl overflow-hidden border-2 transition-all",
                      activeImage === idx ? "border-brand-primary shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={img.url}
                      alt={`${product.name} - view ${idx + 1}`}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:col-span-6 space-y-10">
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-primary-50 text-brand-primary text-[10px] font-bold uppercase tracking-widest border border-primary-100">
                    {product.category}
                  </span>
                  <span className="text-[10px] font-bold text-surface-dark/40 uppercase tracking-widest">SKU: {product.sku}</span>
               </div>
               <h1 className="text-4xl md:text-5xl font-bold text-surface-dark leading-tight">{product.name}</h1>
               <p className="text-lg text-surface-dark/60 font-medium leading-relaxed">
                 {product.description}
               </p>
            </div>

            {/* Key Specs Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
               <div className="p-6 rounded-3xl bg-surface-light space-y-2 border border-surface-light hover:border-primary-100 transition-all">
                  <Package className="w-5 h-5 text-brand-primary" />
                  <p className="text-[10px] font-bold text-surface-dark/40 uppercase tracking-widest">Packaging</p>
                  <p className="font-bold text-surface-dark truncate">{product.packaging || "N/A"}</p>
               </div>
               <div className="p-6 rounded-3xl bg-surface-light space-y-2 border border-surface-light hover:border-primary-100 transition-all">
                  <Layers className="w-5 h-5 text-brand-primary" />
                  <p className="text-[10px] font-bold text-surface-dark/40 uppercase tracking-widest">Dosage</p>
                  <p className="font-bold text-surface-dark truncate">{product.dosage || "N/A"}</p>
               </div>
               <div className="p-6 rounded-3xl bg-surface-light space-y-2 border border-surface-light hover:border-primary-100 transition-all md:col-span-1 col-span-2">
                  <Scale className="w-5 h-5 text-brand-primary" />
                  <p className="text-[10px] font-bold text-surface-dark/40 uppercase tracking-widest">Sizes</p>
                  <p className="font-bold text-surface-dark truncate">{product.sizes || "N/A"}</p>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
               <button 
                 onClick={() => setIsEnquiryOpen(true)}
                 className="w-full sm:flex-1 bg-brand-primary text-white font-bold py-5 rounded-2xl shadow-2xl shadow-brand-primary/30 flex items-center justify-center gap-2 hover:bg-brand-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
               >
                 Enquire Now
                 <ArrowRight className="w-5 h-5" />
               </button>
               <a 
                 href="tel:+1234567890"
                 className="w-full sm:w-auto px-8 py-5 rounded-2xl border border-primary-100 text-surface-dark font-bold flex items-center justify-center gap-2 hover:bg-surface-light transition-all"
               >
                  <PhoneCall className="w-5 h-5 text-brand-secondary" />
                  Call Support
               </a>
            </div>

            {/* Additional Info Tabs Placeholder */}
            <div className="pt-10 border-t border-primary-50 space-y-8">
               <div className="flex items-center gap-8">
                  <button className="text-sm font-bold text-brand-primary border-b-2 border-brand-primary pb-2">Technical Info</button>
                  <button className="text-sm font-bold text-surface-dark/40 hover:text-surface-dark transition-colors pb-2">Usage & Care</button>
               </div>
               
               <div className="space-y-6">
                  <div className="flex flex-col gap-4">
                     {[
                       { label: "Storage Temperature", value: product.specialCare || "Keep in cool, dry place" },
                       { label: "Product Dimensions", value: product.dimensions || "Standard International" },
                       { label: "Quality Compliance", value: "WHO-GMP / ISO 9001:2015" },
                     ].map((item, i) => (
                       <div key={i} className="flex items-center justify-between py-3 border-b border-surface-light last:border-none">
                          <span className="text-sm font-medium text-surface-dark/40">{item.label}</span>
                          <span className="text-sm font-bold text-surface-dark">{item.value}</span>
                       </div>
                     ))}
                  </div>
                  
                  {product.additionalInfo && (
                    <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-100/50 flex gap-4">
                       <Info className="w-5 h-5 text-blue-600 shrink-0" />
                       <p className="text-sm font-medium text-blue-900/80 leading-relaxed">
                         {product.additionalInfo}
                       </p>
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="container mx-auto px-6 py-24">
         <div className="bg-surface-light rounded-4xl p-12 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 rounded-3xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <ShieldCheck className="w-8 h-8" />
               </div>
               <div className="space-y-1">
                  <p className="text-2xl font-bold text-surface-dark">Quality Guaranteed</p>
                  <p className="text-surface-dark/60 font-medium">Certified by global healthcare regulatory bodies.</p>
               </div>
            </div>
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 rounded-3xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                  <FlaskConical className="w-8 h-8" />
               </div>
               <div className="space-y-1">
                  <p className="text-2xl font-bold text-surface-dark">Lab Tested</p>
                  <p className="text-surface-dark/60 font-medium">Batch-wise quality control in our ISO facility.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal 
        isOpen={isEnquiryOpen} 
        onClose={() => setIsEnquiryOpen(false)} 
        product={product} 
      />
    </div>
  );
}
