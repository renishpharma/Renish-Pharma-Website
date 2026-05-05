"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ChevronRight, FileText, ArrowRight } from "lucide-react";
import api from "@/lib/api";
import { BlogPost } from "@/types";

export default function LatestBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs", { params: { status: "published", limit: 3 } });
        setBlogs(res.data.data);
      } catch (error) {
        console.error("Failed to fetch latest blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading || blogs.length === 0) {
    return null; // Don't show the section if loading or no blogs exist
  }

  return (
    <section className="py-24 bg-surface-light relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">Latest News</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-surface-dark">Blogs</h3>
          </div>
          <Link
            href="/blogs"
            className="group flex items-center gap-2 text-brand-primary font-bold hover:text-primary-600 transition-colors"
          >
            View All Blogs
            <div className="w-10 h-10 rounded-full border border-primary-100 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={`/blogs/${blog.slug}`} className="group block h-full">
                <div className="bg-white rounded-4xl border border-surface-light overflow-hidden hover:border-brand-primary/20 hover:shadow-card transition-all h-full flex flex-col">
                  
                  {/* Image */}
                  <div className="aspect-[4/3] relative bg-surface-light overflow-hidden">
                    {blog.coverImage ? (
                      <Image 
                        src={blog.coverImage.url} 
                        alt={blog.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-brand-primary/5">
                        <FileText className="w-12 h-12 text-brand-primary/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/10 transition-colors duration-300" />
                    
                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {blog.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-bold text-brand-primary uppercase tracking-widest shadow-sm">
                            {tag.replace(/[\[\]"]/g, '')}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 mb-4 text-xs font-bold text-surface-dark/40 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                      <span className="w-1 h-1 rounded-full bg-surface-dark/20" />
                      <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {blog.author}</span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-surface-dark mb-4 line-clamp-2 group-hover:text-brand-primary transition-colors">
                      {blog.title}
                    </h2>
                    
                    <div className="mt-auto pt-6 flex items-center justify-between text-brand-primary font-bold text-sm">
                      Read Article
                      <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ChevronRight className="w-4 h-4" />
                      </div>
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
