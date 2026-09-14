"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Smartphone, 
  ShieldAlert, 
  Sparkles, 
  Globe, 
  Sun, 
  Moon, 
  Sparkle,
  Zap,
  Award,
  Terminal,
  Lock,
  Menu,
  X,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
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
    { href: "/", label: "Overview", icon: <Globe className="w-4 h-4" /> },
    { href: "/process", label: "Process", icon: <Zap className="w-4 h-4 text-indigo-500" /> },
    { href: "/case-studies", label: "Case Studies", icon: <Award className="w-4 h-4 text-cyan-500" /> },
    { href: "/pilot-builder", label: "RFP Builder", icon: <Sparkles className="w-4 h-4 text-amber-500" />, badge: "Instant" },
    { href: "/client", label: "Client Studio", icon: <Building2 className="w-4 h-4 text-indigo-500" />, badge: "AI Brief" },
    { href: "/shopper", label: "Shopper PWA", icon: <Smartphone className="w-4 h-4 text-emerald-500" /> },
    { href: "/admin", label: "AI QC Command", icon: <ShieldAlert className="w-4 h-4 text-rose-500" />, badge: "CV Engine" },
    { href: "/api-docs", label: "API Console", icon: <Terminal className="w-4 h-4 text-cyan-500" />, badge: "Docs" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`border-b sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-slate-200/80 dark:border-slate-700/50 bg-white/80 dark:bg-slate-950/70 backdrop-blur-2xl shadow-lg shadow-black/[0.03] dark:shadow-black/20"
            : "border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/80 backdrop-blur-xl shadow-sm dark:shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center font-black text-white shadow-lg shadow-indigo-500/25 transition-transform"
            >
              P
            </motion.div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 font-heading">
                Pulse<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">AI</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </span>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest -mt-1">Enterprise</span>
            </div>
          </Link>

          {/* Desktop Portal Switcher Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 p-1 rounded-xl shadow-inner backdrop-blur-sm">
            {navLinks.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "!text-white shadow-md shadow-indigo-600/30 scale-[1.02]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800/60"
                  }`}
                >
                  {/* Active background with animation */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 bg-indigo-600 rounded-lg"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold ${
                          isActive 
                            ? "bg-indigo-800/90 !text-indigo-100" 
                            : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right Action Header */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, rotate: 15 }}
              aria-label="Toggle Theme"
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-indigo-500/30 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1.5 text-xs shadow-sm cursor-pointer group"
              title="Toggle Theme"
            >
              {theme === "dark" && <Moon className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />}
              {theme === "midnight" && <Sparkle className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform" />}
              {theme === "light" && <Sun className="w-4 h-4 text-amber-500 group-hover:rotate-90 transition-transform" />}
              
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 leading-none">Theme</span>
                <span className="text-[11px] font-mono capitalize font-bold text-indigo-600 dark:text-indigo-300 leading-tight">
                  {theme}
                </span>
              </div>
            </motion.button>

            {/* Register Dropdown */}
            <div className="relative group hidden sm:block">
              <Link
                href="/register"
                className="text-xs font-extrabold px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-500/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 transition-all flex items-center gap-1.5 shadow-sm font-heading"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Register</span>
              </Link>
              
              <div className="absolute right-0 top-full mt-1 w-52 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/register/client"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all"
                >
                  <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/50">
                    <Building2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  </div>
                  <div>
                    <div>Client Account</div>
                    <div className="text-[10px] text-slate-400 font-normal">For Brands & Retail</div>
                  </div>
                </Link>
                <Link
                  href="/register/shopper"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all"
                >
                  <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/50">
                    <Smartphone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  </div>
                  <div>
                    <div>Field Shopper</div>
                    <div className="text-[10px] text-slate-400 font-normal">Earn from Audits</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Sign In */}
            <Link
              href="/login"
              className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-indigo-500/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Lock className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>

            {/* Launch Studio CTA */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/client"
                className="text-xs font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 !text-white px-3.5 py-2 rounded-xl transition-all shadow-md shadow-indigo-600/25 flex items-center gap-1.5 font-heading"
              >
                <Sparkles className="w-3.5 h-3.5 !text-white" />
                <span className="hidden sm:inline">Launch Studio</span>
                <span className="sm:hidden">Studio</span>
              </Link>
            </motion.div>

            {/* Mobile Hamburger */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

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
              className="fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 z-50 lg:hidden overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                <span className="font-black text-lg text-slate-900 dark:text-white font-heading">
                  Navigation
                </span>
                <motion.button
                  onClick={() => setMobileOpen(false)}
                  whileTap={{ scale: 0.9, rotate: 90 }}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300"
                >
                  <X className="w-5 h-5" />
                </motion.button>
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
                        className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                          isActive
                            ? "bg-indigo-600 !text-white shadow-md"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span className="text-sm font-bold">{item.label}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Drawer CTAs */}
              <div className="p-4 space-y-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                <Link
                  href="/register/client"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/25"
                >
                  <Building2 className="w-4 h-4" />
                  Register as Client
                </Link>
                <Link
                  href="/register/shopper"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-600/25"
                >
                  <Smartphone className="w-4 h-4" />
                  Join as Shopper
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
