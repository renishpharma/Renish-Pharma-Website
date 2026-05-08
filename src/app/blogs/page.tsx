"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ChevronRight, Loader2, FileText } from "lucide-react";
import api from "@/lib/api";
import { BlogPost } from "@/types";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs", { params: { status: "published" } });
        setBlogs(res.data.data);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface-light/30">
      {/* Header */}
      <section className="pt-32 pb-16 bg-white border-b border-surface-light">
        <div className="container mx-auto px-6 text-center max-w-3xl">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Blogs & News</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-bold text-surface-dark mb-6 tracking-tight">Our Latest <span className="text-brand-primary">Blogs</span></h1>
           <p className="text-lg text-surface-dark/60 font-medium">
             Stay updated with the latest advancements in pharmaceuticals, health tips, and company news from Renish Pharmaceutical.
           </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
              <p className="text-xs font-bold text-surface-dark/40 uppercase tracking-widest">Loading Blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center max-w-md mx-auto">
              <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-6">
                <FileText className="w-10 h-10 text-surface-dark/20" />
              </div>
              <h3 className="text-2xl font-bold text-surface-dark mb-4">No Blogs Yet</h3>
              <p className="text-surface-dark/60 font-medium">We are currently working on exciting new content. Please check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, idx) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link href={`/blogs/${blog.slug}`} className="group block h-full">
                    <div className="bg-white rounded-4xl border border-surface-light overflow-hidden hover:border-brand-primary/20 hover:shadow-card transition-all h-full flex flex-col">
                      
                      {/* Image */}
                      <div className="aspect-4/3 relative bg-surface-light overflow-hidden">
                        {blog.coverImage ? (
                          <Image 
                            src={blog.coverImage.url} 
                            alt={blog.title} 
                            fill 
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
                                {tag}
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
          )}
        </div>
      </section>
    </div>
  );
}
