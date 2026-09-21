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
    <div className="min-h-screen bg-white text-slate-900 relative overflow-hidden font-sans">
      
      {/* Hero Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6 relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-blue-600 dark:text-blue-400 font-bold">Process &amp; AI Engine</span>
        </div>

        {/* Page Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md border border-slate-200 bg-white text-slate-700 text-sm font-semibold mb-3 shadow-sm">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Autonomous Workflow Pipeline</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
              How PulseAI Works: <br />
              <span className="text-blue-600">
                From Natural Brief to Instant Escrow
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mt-6 leading-relaxed">
              Explore the autonomous 6-stage lifecycle connecting natural language client prompts with verified field shoppers and real-time computer vision quality control.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/client"
              className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Test AI Brief Creator</span>
            </Link>
            <Link
              href="/shopper"
              className="px-6 py-3 rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>Launch Shopper Radar</span>
            </Link>
          </div>
        </div>

        {/* 6-Step Fast Overview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {stepsHighlight.map((st, i) => (
            <div
              key={i}
              className="p-5 rounded-md border border-slate-200 bg-white shadow-sm hover:border-blue-500 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                  {st.number}
                </span>
                <h2 className="font-bold text-slate-900 text-sm mt-3">{st.label}</h2>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
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
        <div className="p-8 sm:p-12 rounded-md border border-slate-200 bg-slate-50 shadow-sm relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Ready to deploy your first automated retail audit?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Describe your requirements in plain English, and our AI pipeline will configure branches, quotas, and questionnaires instantly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/client"
              className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center gap-2"
            >
              <span>Launch Client Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pilot-builder"
              className="px-6 py-3 rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-semibold text-sm"
            >
              Configure RFP Blueprint
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}


