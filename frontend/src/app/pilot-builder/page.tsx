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
    <div className="min-h-screen bg-white text-slate-900 relative overflow-hidden font-sans">
      
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-4 relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-blue-600 font-bold">RFP &amp; Enterprise Pilot Configurator</span>
        </div>

        {/* Page Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Interactive Enterprise Configurator</span>
            </div>
            <h1 className="font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight">
              Enterprise RFP Builder: <br />
              <span className="text-blue-600">
                Custom Blueprint &amp; Instant Quote
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 max-w-3xl mt-4 leading-relaxed">
              Configure target store count, deliverable requirements, turnaround SLAs, and get an instant downloadable RFP proposal with transparent pricing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/client"
              className="px-5 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-sm flex items-center gap-2 transition-colors"
            >
              <Building2 className="w-4 h-4" />
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


