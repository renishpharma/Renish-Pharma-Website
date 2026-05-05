"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Products", href: "/products" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact-us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          isScrolled
            ? "py-3"
            : "py-5"
        )}
      >
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "flex items-center justify-between rounded-2xl border transition-all duration-300",
              isScrolled
                ? "border-black/5 bg-white/75 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                : "border-transparent bg-white/75 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
            )}
          >
            <div className="flex h-16 w-full items-center justify-between px-3 sm:px-4">
              <Link href="/" className="group flex items-center gap-3">
                <Image 
                  src="/logo/renishLogo.svg" 
                  alt="Renish Pharmaceutical" 
                  width={44} 
                  height={44} 
                  className="transition-transform duration-300 group-hover:scale-[1.04]"
                />

                <div className="leading-tight">
                  <div className="text-[1.02rem] font-bold tracking-tight text-surface-dark">
                    Renish <span className="text-brand-primary">Pharmaceutical</span>
                  </div>
                  <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-secondary/80">
                    Healthcare Excellence
                  </div>
                </div>
              </Link>

              <div className="hidden md:flex items-center rounded-2xl border border-black/5 bg-white/70 p-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "relative rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200",
                        isActive
                          ? "text-brand-primary"
                          : "text-surface-dark/70 hover:text-surface-dark"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-xl bg-primary-50 border border-brand-primary/10"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="hidden md:flex items-center">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-2xl bg-brand-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-primary/90 active:translate-y-0"
                >
                  Explore Catalog
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <button
                type="button"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/5 bg-white/80 text-brand-primary transition-colors hover:bg-primary-50 md:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            />

            <motion.div
              id="mobile-menu"
              key="menu"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-24 z-50 rounded-3xl border border-black/5 bg-white p-4 shadow-2xl md:hidden"
            >
              <div className="space-y-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold transition-colors",
                        isActive
                          ? "bg-primary-50 text-brand-primary"
                          : "text-surface-dark/75 hover:bg-surface-light"
                      )}
                    >
                      <span>{link.name}</span>
                      {isActive && <ChevronRight className="h-4 w-4" />}
                    </Link>
                  );
                })}
              </div>

              <div className="my-4 h-px bg-black/5" />

              <Link
                href="/products"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-primary px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
              >
                Explore Catalog
                <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}