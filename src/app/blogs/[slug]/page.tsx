"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Calendar, User, Loader2 } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import api from "@/lib/api";
import { BlogPost } from "@/types";

export default function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${resolvedParams.slug}`);
        setBlog(res.data.data);
      } catch (error) {
        console.error("Failed to fetch blog post", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-light/30">
        <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-surface-light/30 text-center px-6">
        <h1 className="text-4xl font-bold text-surface-dark mb-4">Blog Not Found</h1>
        <p className="text-surface-dark/60 font-medium mb-8">The blog post you are looking for does not exist or has been removed.</p>
        <Link href="/blogs" className="bg-brand-primary text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-brand-primary/20 hover:bg-primary-600 transition-all">
          Return to Blogs
        </Link>
      </div>
    );
  }

  // Sanitize the HTML content from React Quill
  const cleanContent = DOMPurify.sanitize(blog.content);

  return (
    <article className="bg-white min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-surface-dark">
        {blog.coverImage && (
          <div className="absolute inset-0 opacity-20">
            <Image src={blog.coverImage.url} alt={blog.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-linear-to-t from-surface-dark to-transparent" />
          </div>
        )}
        <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-white/60 hover:text-white font-semibold transition-colors mb-8">
            <ChevronLeft className="w-4 h-4" />
            Back to Blogs
          </Link>
          
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {blog.tags.map(tag => (
                <span key={tag} className="bg-brand-primary/20 text-brand-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-brand-primary/30">
                  {tag.replace(/[\[\]"]/g, '')}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
            {blog.title}
          </h1>

          <div className="flex items-center justify-center gap-6 text-sm font-bold text-white/60 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-primary" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="flex items-center gap-2"><User className="w-4 h-4 text-brand-primary" /> {blog.author}</span>
          </div>
        </div>
      </section>

      {/* Main Cover Image (if exists, displayed cleanly) */}
      {blog.coverImage && (
        <div className="container mx-auto px-6 max-w-5xl -mt-10 relative z-20 mb-16">
          <div className="aspect-[21/9] w-full relative rounded-4xl overflow-hidden shadow-2xl border-4 border-white">
            <Image src={blog.coverImage.url} alt={blog.title} fill className="object-cover" priority />
          </div>
        </div>
      )}

      {/* Blog Content */}
      <section className={`container mx-auto px-6 max-w-3xl ${!blog.coverImage ? "pt-16" : ""}`}>
        <div 
          className="prose prose-lg prose-headings:font-bold prose-headings:text-surface-dark prose-p:text-surface-dark/80 prose-p:leading-relaxed prose-a:text-brand-primary hover:prose-a:text-primary-600 prose-img:rounded-2xl max-w-none"
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        />
        
        {/* Author Bio Footer */}
        <div className="mt-20 p-8 rounded-3xl bg-surface-light border border-surface-light flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
            <User className="w-8 h-8 text-brand-primary" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-surface-dark mb-1">Written by {blog.author}</h4>
            <p className="text-surface-dark/60 font-medium">Providing insights and updates on healthcare, medicine, and pharmaceutical innovation.</p>
          </div>
        </div>
      </section>
    </article>
  );
}
