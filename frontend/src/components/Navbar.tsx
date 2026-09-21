"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home,
  Building2, 
  Smartphone, 
  ShieldAlert, 
  Sparkles, 
  Globe, 
  Zap, 
  Award, 
  Terminal, 
  Lock, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight 
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll-based glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "home" },
    { href: "/process", label: "process" },
    { href: "/case-studies", label: "case studies" },
    { href: "/client", label: "client studio" },
    { href: "/shopper", label: "shopper radar" },
    { href: "/admin", label: "ai qc command" },
    { href: "/#contact", label: "contact us" },
  ];

  return (
    <>
      <nav className="border-b sticky top-0 z-50 bg-white border-slate-200 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group shrink-0"
          >
            <div className="w-8 h-8 rounded-sm bg-blue-600 flex items-center justify-center font-bold text-white">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-slate-900 leading-none">
                PulseAI
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5">Enterprise</span>
            </div>
          </Link>

          {/* Minimal Tab Bar */}
          <div className="hidden md:flex items-center gap-8 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap mx-4">
            {navLinks.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={`relative py-5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-blue-600 font-bold border-b-2 border-blue-600"
                      : "text-slate-600 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action Header */}
          <div className="flex items-center gap-3">
            
            {/* Register Dropdown */}
            <div className="relative group hidden sm:block">
              <Link
                href="/register"
                className="text-sm font-semibold px-4 py-2 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
              >
                Register
              </Link>
              
              <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200 shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/register/client"
                  className="flex items-center gap-3 p-3 hover:bg-slate-50 text-sm font-medium text-slate-800 transition-colors"
                >
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <div>
                    <div>Client Account</div>
                  </div>
                </Link>
                <Link
                  href="/register/shopper"
                  className="flex items-center gap-3 p-3 hover:bg-slate-50 text-sm font-medium text-slate-800 transition-colors border-t border-slate-100"
                >
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <div>
                    <div>Field Shopper</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Sign In */}
            <Link
              href="/login"
              className="text-sm font-semibold px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors hidden sm:block"
            >
              Sign In
            </Link>

            {/* Launch Studio CTA */}
            <Link
              href="/client"
              className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <span className="hidden sm:inline">Client Login</span>
              <span className="sm:hidden">Login</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-md border border-slate-300 text-slate-600"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white border-l border-slate-200 z-50 lg:hidden overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <span className="font-bold text-lg text-slate-900">
                  Menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-md bg-slate-100 text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="p-4 space-y-1">
                {navLinks.map((item, i) => {
                  const isActive = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        prefetch={true}
                        className={`flex items-center justify-between p-3 rounded-md transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-600 font-bold"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold capitalize">{item.label}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Drawer CTAs */}
              <div className="p-4 space-y-3 border-t border-slate-100 mt-2">
                <Link
                  href="/register/client"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-md bg-blue-600 text-white font-semibold text-sm"
                >
                  <Building2 className="w-4 h-4" />
                  Client Registration
                </Link>
                <Link
                  href="/register/shopper"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-md bg-slate-800 text-white font-semibold text-sm"
                >
                  <Smartphone className="w-4 h-4" />
                  Shopper Signup
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}


