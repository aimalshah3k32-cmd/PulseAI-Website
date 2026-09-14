"use client";

import React from "react";
import { motion } from "framer-motion";
import { EnterpriseCaseStudies } from "@/components/EnterpriseCaseStudies";
import { EnterpriseBrandTrust } from "@/components/EnterpriseBrandTrust";
import { 
  Award, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  ChevronRight, 
  Building2,
  DollarSign,
  ShieldCheck,
  Star
} from "lucide-react";
import Link from "next/link";

export default function CaseStudiesPage() {
  const stats = [
    { value: "68%", label: "Average QC Cost Reduction", sub: "Compared to traditional legacy agencies" },
    { value: "1.2s", label: "AI Verification Speed", sub: "Planogram & Out-of-Stock computer vision" },
    { value: "99.4%", label: "Geofence Accuracy", sub: "Hardware GPS & Biometric verification" },
    { value: "50+", label: "Global Enterprise Clients", sub: "Unilever, Starbucks, Sephora, Majid Al Futtaim" }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] relative overflow-hidden font-sans">
      
      {/* 3D Ambient Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-cyan-600/20 via-indigo-500/15 to-purple-600/20 blur-[170px] pointer-events-none rounded-full" />

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6 relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-cyan-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-cyan-600 dark:text-cyan-400 font-bold">Case Studies &amp; ROI Benchmarks</span>
        </div>

        {/* Page Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Award className="w-4 h-4 text-cyan-500" />
              <span>Proven Enterprise Results</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight">
              Enterprise Case Studies: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-500 to-purple-500 dark:from-cyan-400 dark:via-indigo-400 dark:to-purple-300">
                Ground-Truth Impact at Global Scale
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mt-4 leading-relaxed">
              Discover how Fortune 500 retail giants, luxury brands, and global CPG leaders deploy PulseAI to replace slow manual mystery shopping agencies with automated computer vision verification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/client"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 !text-white text-xs sm:text-sm font-bold shadow-lg shadow-cyan-600/30 flex items-center gap-2 font-heading transition-all"
            >
              <Sparkles className="w-4 h-4 !text-white" />
              <span>Deploy Similar Campaign</span>
            </Link>
          </div>
        </div>

        {/* Benchmark Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-sm">
          {stats.map((s, idx) => (
            <div key={idx} className="text-center p-2">
              <div className="font-heading text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600 dark:from-cyan-400 dark:to-indigo-300">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-2 font-heading uppercase tracking-wide">
                {s.label}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {s.sub}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Main Interactive Case Studies Component */}
      <div className="relative z-10">
        <EnterpriseCaseStudies />
      </div>

      {/* Brand Trust Section */}
      <div className="relative z-10 border-t border-slate-200 dark:border-slate-800/80">
        <EnterpriseBrandTrust />
      </div>

      {/* Bottom Action Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl border border-cyan-200 dark:border-cyan-500/30 bg-gradient-to-tr from-cyan-50 dark:from-cyan-950/60 via-white dark:via-slate-900 to-indigo-50 dark:to-indigo-950/40 shadow-xl relative overflow-hidden">
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 dark:text-white mb-3">
            Want to benchmark your brand's retail compliance?
          </h2>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6">
            Get an instant RFP proposal with custom quotation, SLA guarantees, and sample AI planogram output for your store network.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/pilot-builder"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 !text-white font-heading font-black text-sm uppercase tracking-wider shadow-xl shadow-cyan-600/30 flex items-center gap-2"
            >
              <span>Build Custom RFP Blueprint</span>
              <ArrowRight className="w-4 h-4 !text-white" />
            </Link>
            <Link
              href="/client"
              className="px-7 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-heading font-bold text-sm"
            >
              Launch Client Studio
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
