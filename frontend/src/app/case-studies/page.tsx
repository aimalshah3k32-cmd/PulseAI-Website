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
    <div className="min-h-screen bg-white text-slate-900 relative overflow-hidden font-sans">
      
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6 relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-blue-600 font-bold">Case Studies &amp; ROI Benchmarks</span>
        </div>

        {/* Page Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Proven Enterprise Results</span>
            </div>
            <h1 className="font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight">
              Enterprise Case Studies: <br />
              <span className="text-blue-600">
                Ground-Truth Impact at Global Scale
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 max-w-3xl mt-4 leading-relaxed">
              Discover how Fortune 500 retail giants, luxury brands, and global CPG leaders deploy PulseAI to replace slow manual mystery shopping agencies with automated computer vision verification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/client"
              className="px-5 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-sm flex items-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Deploy Similar Campaign</span>
            </Link>
          </div>
        </div>

        {/* Benchmark Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 border border-slate-200 rounded-md p-6 bg-slate-50 shadow-sm">
          {stats.map((s, idx) => (
            <div key={idx} className="text-center p-2 border-r last:border-r-0 border-slate-200">
              <div className="text-3xl sm:text-5xl font-bold text-blue-600">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-2 uppercase tracking-wide">
                {s.label}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 mt-1">
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
      <div className="relative z-10 border-t border-slate-200">
        <EnterpriseBrandTrust />
      </div>

      {/* Bottom Action Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center relative z-10">
        <div className="p-8 sm:p-12 rounded-md border border-slate-200 bg-slate-50 shadow-sm relative overflow-hidden">
          <h2 className="font-bold text-2xl sm:text-4xl text-slate-900 mb-3">
            Want to benchmark your brand's retail compliance?
          </h2>
          <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto mb-6">
            Get an instant RFP proposal with custom quotation, SLA guarantees, and sample AI planogram output for your store network.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/pilot-builder"
              className="px-7 py-3.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider shadow-sm flex items-center gap-2 transition-colors"
            >
              <span>Build Custom RFP Blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/client"
              className="px-7 py-3.5 rounded-md border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 font-bold text-sm transition-colors"
            >
              Launch Client Studio
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}


