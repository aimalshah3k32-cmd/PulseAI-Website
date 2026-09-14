"use client";

import React from "react";
import { motion } from "framer-motion";
import { EnterprisePilotBuilder } from "@/components/EnterprisePilotBuilder";
import { 
  Sparkles, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  Building2, 
  ShieldCheck, 
  DollarSign,
  Cpu,
  Layers
} from "lucide-react";
import Link from "next/link";

export default function PilotBuilderPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] relative overflow-hidden font-sans">
      
      {/* 3D Ambient Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-amber-600/20 via-indigo-500/15 to-cyan-600/20 blur-[170px] pointer-events-none rounded-full" />

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-4 relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-amber-600 dark:text-amber-400 font-bold">RFP &amp; Enterprise Pilot Configurator</span>
        </div>

        {/* Page Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Interactive Enterprise Configurator</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight">
              Enterprise RFP Builder: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-indigo-500 dark:from-amber-400 dark:via-orange-400 dark:to-indigo-300">
                Custom Blueprint &amp; Instant Quote
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mt-4 leading-relaxed">
              Configure target store count, deliverable requirements, turnaround SLAs, and get an instant downloadable RFP proposal with transparent pricing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/client"
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 !text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 font-heading transition-all"
            >
              <Building2 className="w-4 h-4 !text-white" />
              <span>Launch Client Studio</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Main Interactive RFP Pilot Builder Component */}
      <div className="relative z-10">
        <EnterprisePilotBuilder />
      </div>

    </div>
  );
}
