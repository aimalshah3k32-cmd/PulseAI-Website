"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  FileCheck, 
  Award, 
  CheckCircle2, 
  Globe2, 
  Sparkles,
  Server,
  Zap
} from "lucide-react";

export function EnterpriseBrandTrust() {
  const enterpriseClients = [
    { name: "Unilever", category: "Global FMCG", footprint: "14,000 Stores Audited", ticker: "UN" },
    { name: "Nestlé Global", category: "Nutrition & Food", footprint: "8,500 Stores Audited", ticker: "NESN" },
    { name: "L'Oréal Luxe", category: "Cosmetics & Fragrance", footprint: "3,200 Boutiques", ticker: "OR" },
    { name: "The Coca-Cola Co.", category: "Beverage Coolers", footprint: "22,000 Coolers", ticker: "KO" },
    { name: "Carrefour Group", category: "Hypermarket Retail", footprint: "1,200 Supercenters", ticker: "CA" },
    { name: "Sephora", category: "Prestige Beauty", footprint: "2,600 Beauty Bars", ticker: "LVMH" },
    { name: "Procter & Gamble", category: "Household Care", footprint: "19,500 Planograms", ticker: "PG" },
    { name: "Samsung Electronics", category: "Display Stands", footprint: "4,100 Showrooms", ticker: "SMSN" }
  ];

  const complianceBadges = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      title: "SOC 2 Type II Certified",
      subtitle: "Audited by AICPA standards",
      grade: "AAA RATED"
    },
    {
      icon: <Lock className="w-5 h-5 text-indigo-500" />,
      title: "ISO/IEC 27001 Security",
      subtitle: "End-to-end data encryption",
      grade: "CERTIFIED"
    },
    {
      icon: <FileCheck className="w-5 h-5 text-cyan-500" />,
      title: "GDPR & CCPA Compliant",
      subtitle: "Biometric & KYC privacy-first",
      grade: "ENFORCED"
    },
    {
      icon: <Award className="w-5 h-5 text-amber-500" />,
      title: "99.99% Enterprise SLA",
      subtitle: "Guaranteed 1-hour dispatch",
      grade: "CONTRACTUAL"
    }
  ];

  return (
    <section className="py-16 border-y border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 relative overflow-hidden">
      
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.02] via-transparent to-cyan-500/[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Enterprise Field Grade</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Trusted by Category Leaders Across 50+ Global Markets
          </p>
        </div>

        {/* Live Ribbon Hint */}
        <div className="flex items-center justify-center gap-2.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
          <span>Continuous Global Mesh Stream • Hover over any brand to inspect audit scope</span>
        </div>

        {/* Animated Infinite Marquee Ribbon */}
        <div className="relative overflow-hidden w-full py-3 mb-14">
          
          {/* Left & Right Soft Fade Gradient Masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-slate-50/95 dark:from-[#0a0e1a] to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-slate-50/95 dark:from-[#0a0e1a] to-transparent z-20" />

          {/* Scrolling Marquee Container */}
          <div className="animate-marquee flex gap-5 sm:gap-6 w-max cursor-pointer py-2">
            {[...enterpriseClients, ...enterpriseClients].map((client, idx) => (
              <div
                key={idx}
                className="w-64 sm:w-72 shrink-0 p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/60 backdrop-blur-md hover:border-indigo-500/80 hover:bg-white dark:hover:bg-slate-850 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl hover:shadow-indigo-500/15 hover:scale-105 hover:-translate-y-1.5 relative overflow-hidden"
              >
                {/* Top Accent Gradient on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold border border-slate-200 dark:border-slate-700/60 group-hover:border-indigo-500/40 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                      NYSE: {client.ticker}
                    </span>

                    <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Grid
                    </span>
                  </div>

                  <div className="font-heading font-black text-lg sm:text-xl text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                    {client.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                    {client.category}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/70 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    ✓ {client.footprint}
                  </span>
                  <span className="text-[10px] text-slate-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Enterprise Compliance & Security Strip */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 shadow-lg backdrop-blur-md">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceBadges.map((badge, bIdx) => (
              <div key={bIdx} className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 shrink-0">
                  {badge.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-black text-sm text-slate-900 dark:text-white">
                      {badge.title}
                    </h4>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {badge.grade}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
