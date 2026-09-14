"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProcessWorkflow } from "@/components/ProcessWorkflow";
import { 
  Zap, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Radar, 
  CheckCircle2, 
  ChevronRight,
  Eye,
  Scan,
  MapPin,
  Lock,
  Smartphone
} from "lucide-react";
import Link from "next/link";

export default function ProcessPage() {
  const stepsHighlight = [
    { number: "01", label: "AI Brief Parser", desc: "Transforms voice or text prompts into structured store branches & questionnaires in 3.4 seconds." },
    { number: "02", label: "Radar Dispatch", desc: "Geofenced push notifications sent to nearest KYC-vetted shoppers across 50+ global markets." },
    { number: "03", label: "GPS Check-In", desc: "Hardware-level GPS perimeter lock ensures evaluator is physically inside the target store." },
    { number: "04", label: "AI Computer Vision", desc: "Sub-second shelf facing counting, planogram compliance % and out-of-stock void detection." },
    { number: "05", label: "Anti-Fraud Quarantine", desc: "Multi-layered validation checks image hashes, EXIF hardware metadata & speech sentiment." },
    { number: "06", label: "Instant Escrow", desc: "Auto-approves valid audits and releases bounties instantly to evaluator wallets." }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] relative overflow-hidden font-sans">
      
      {/* 3D Background Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-indigo-600/20 via-cyan-500/15 to-purple-600/20 blur-[170px] pointer-events-none rounded-full" />

      {/* Hero Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6 relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">Process &amp; AI Engine</span>
        </div>

        {/* Page Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Zap className="w-4 h-4 text-indigo-500" />
              <span>Autonomous Workflow Pipeline</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight">
              How PulseAI Works: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 dark:from-indigo-400 dark:via-cyan-400 dark:to-teal-300">
                From Natural Brief to Instant Escrow
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mt-4 leading-relaxed">
              Explore the autonomous 6-stage lifecycle connecting natural language client prompts with verified field shoppers and real-time computer vision quality control.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/client"
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 !text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 font-heading transition-all"
            >
              <Sparkles className="w-4 h-4 !text-white" />
              <span>Test AI Brief Creator</span>
            </Link>
            <Link
              href="/shopper"
              className="px-5 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all"
            >
              <Smartphone className="w-4 h-4 text-emerald-500" />
              <span>Launch Shopper Radar</span>
            </Link>
          </div>
        </div>

        {/* 6-Step Fast Overview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {stepsHighlight.map((st, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-sm hover:border-indigo-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-lg">
                  {st.number}
                </span>
                <h2 className="font-heading font-black text-slate-900 dark:text-white text-sm mt-2">{st.label}</h2>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-tight">
                {st.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Main Interactive Workflow Component */}
      <div className="relative z-10">
        <ProcessWorkflow />
      </div>

      {/* Bottom CTA Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl border border-indigo-200 dark:border-indigo-500/30 bg-gradient-to-tr from-indigo-50 dark:from-indigo-950/60 via-white dark:via-slate-900 to-cyan-50 dark:to-cyan-950/40 shadow-xl relative overflow-hidden">
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 dark:text-white mb-3">
            Ready to deploy your first automated retail audit?
          </h2>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6">
            Describe your requirements in plain English, and our AI pipeline will configure branches, quotas, and questionnaires instantly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/client"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 !text-white font-heading font-black text-sm uppercase tracking-wider shadow-xl shadow-indigo-600/30 flex items-center gap-2"
            >
              <span>Launch Client Studio</span>
              <ArrowRight className="w-4 h-4 !text-white" />
            </Link>
            <Link
              href="/pilot-builder"
              className="px-7 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-heading font-bold text-sm"
            >
              Configure RFP Blueprint
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
