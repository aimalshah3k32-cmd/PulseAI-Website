"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe2,
  Mail,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Building2,
  Smartphone,
  Zap,
  Award,
  Terminal,
  MapPin,
  Phone,
  ExternalLink,
  Heart,
  Send,
} from "lucide-react";

const footerLinks = {
  company: [
    { label: "About PulseAI", href: "/#about" },
    { label: "How It Works", href: "/process" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "ROI Calculator", href: "/#roi" },
    { label: "Careers", href: "#" },
  ],
  platform: [
    { label: "Client Studio", href: "/client", icon: <Building2 className="w-3 h-3" /> },
    { label: "Shopper PWA", href: "/shopper", icon: <Smartphone className="w-3 h-3" /> },
    { label: "AI QC Command", href: "/admin", icon: <ShieldCheck className="w-3 h-3" /> },
    { label: "RFP Builder", href: "/pilot-builder", icon: <Sparkles className="w-3 h-3" /> },
    { label: "API Console", href: "/api-docs", icon: <Terminal className="w-3 h-3" /> },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "GDPR Compliance", href: "#" },
    { label: "MSPA Standards", href: "#" },
  ],
};

const socialLinks = [
  { label: "LinkedIn", href: "#", icon: "in" },
  { label: "Twitter", href: "#", icon: "𝕏" },
  { label: "GitHub", href: "#", icon: "GH" },
  { label: "YouTube", href: "#", icon: "YT" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 overflow-hidden">
      {/* Animated Gradient Divider Line */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div
          className="h-full w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
          style={{
            backgroundSize: "200% 100%",
            animation: "gradientShimmer 4s linear infinite",
          }}
        />
      </div>

      {/* Ambient Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-indigo-500/5 via-purple-500/3 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative z-10">
        {/* Top Section: Brand + Newsletter */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 mb-14">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5 group mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center font-black text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform text-sm">
                P
              </div>
              <div>
                <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 font-heading">
                  Pulse<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">AI</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block -mt-0.5">
                  Enterprise Field Intelligence
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
              The world&apos;s most advanced AI-powered mystery shopping and retail audit platform. Trusted by leading brands across 50+ markets.
            </p>

            {/* Live Status */}
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              SYSTEM ONLINE — 52 GLOBAL NODES ACTIVE
            </div>
          </div>

          {/* Newsletter */}
          <div className="max-w-md w-full">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 font-heading uppercase tracking-wider">
              Stay Informed
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Get enterprise CX intelligence insights, platform updates, and audit methodology whitepapers.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition-all whitespace-nowrap"
              >
                {subscribed ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Subscribe</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>

        {/* 4-Column Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4 font-heading">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 h-px bg-indigo-500 group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4 font-heading">
              Platform
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                  >
                    {link.icon && (
                      <span className="text-slate-400 group-hover:text-indigo-500 transition-colors">
                        {link.icon}
                      </span>
                    )}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4 font-heading">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 h-px bg-indigo-500 group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4 font-heading">
              Connect
            </h4>
            <div className="space-y-3 mb-5">
              <a
                href="mailto:hello@pulseai.io"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                hello@pulseai.io
              </a>
              <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                Dubai · London · Lahore
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm"
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            © 2026 PulseAI Enterprise. Built with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Heart className="w-3 h-3 text-rose-500 inline-block" />
            </motion.span>
            for global field intelligence.
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              SOC 2 · ISO 27001
            </span>
            <span className="flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-indigo-500" />
              GDPR Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
