"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Quote, 
  Award, 
  Clock, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  BarChart3,
  Store
} from "lucide-react";
import Link from "next/link";

interface CaseStudy {
  id: string;
  clientCategory: string;
  clientTitle: string;
  badge: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorCompany: string;
  challenge: string;
  solution: string;
  stats: { label: string; value: string; sub: string; color: string }[];
  tags: string[];
}

export function EnterpriseCaseStudies() {
  const [activeCase, setActiveCase] = useState<number>(0);

  const cases: CaseStudy[] = [
    {
      id: "fmcg-beverage",
      clientCategory: "Global FMCG & Beverage Conglomerate",
      clientTitle: "Recovering $4.2M in Out-of-Stock Cooler Revenue",
      badge: "FMCG • 3,200 Coolers Audited",
      quote: "PulseAI replaced three fragmented regional agencies with a unified automated AI pipeline. Detecting out-of-stock cooler voids in 840 milliseconds instead of waiting 3 weeks for spreadsheets completely transformed our sales velocity.",
      authorName: "Marcus Vance",
      authorTitle: "VP of Global Commercial Operations",
      authorCompany: "Tier-1 Beverage Enterprise",
      challenge: "High SKU churn across 3,200 convenience hypermarkets led to frequent empty cooler shelves, missing promotional banners, and inconsistent pricing tags. Legacy agencies submitted audits with 24% unverified or stale photos.",
      solution: "Deployed PulseAI's autonomous shopper mesh with hardware-locked GPS geofencing and sub-second YOLOv8 computer vision. Out-of-stock voids immediately trigger automated alerts to local distributor teams.",
      stats: [
        { label: "Revenue Recovered", value: "$4.2M", sub: "Annualized stock loss prevented", color: "text-emerald-600 dark:text-emerald-400" },
        { label: "Turnaround Time", value: "840ms", sub: "Down from 21 days manual QC", color: "text-indigo-600 dark:text-indigo-400" },
        { label: "On-Shelf Availability", value: "+14.2%", sub: "Measured across 50 markets", color: "text-cyan-600 dark:text-cyan-400" }
      ],
      tags: ["Real-Time CV", "Planogram Compliance", "Escrow Settlement"]
    },
    {
      id: "luxury-cosmetics",
      clientCategory: "Prestige Beauty & Luxury Boutiques",
      clientTitle: "100% Elimination of Freelancer Fraud Across 450 Boutiques",
      badge: "Luxury Retail • Paris, Dubai, Tokyo, NY",
      quote: "Our boutique experience demands perfection. The cryptographic EXIF verification, biometric shopper checks, and printed receipt OCR ensured our board received authentic customer journey intelligence without fabricated data.",
      authorName: "Elena Rostova",
      authorTitle: "Chief Experience Officer (CXO)",
      authorCompany: "International Luxury Beauty Group",
      challenge: "Previous mystery shopping providers suffered from rampant GPS spoofing and recycled stock photos. Executives had zero confidence in consultant greeting latency reports and fragrance upsell compliance.",
      solution: "Enforced strict hardware-level geofence checks (±1.8m accuracy), audio consultation sentiment scoring, and instant receipt OCR verification with automated escrow payout incentives.",
      stats: [
        { label: "Fraud Attempt Rate", value: "0.00%", sub: "100% spoofing quarantined", color: "text-emerald-600 dark:text-emerald-400" },
        { label: "Greeting Latency", value: "24 Sec", sub: "Benchmarked from 65s average", color: "text-indigo-600 dark:text-indigo-400" },
        { label: "Store Net Promoter Score", value: "+19 Pts", sub: "Customer satisfaction lift", color: "text-cyan-600 dark:text-cyan-400" }
      ],
      tags: ["Audio Sentiment", "Receipt OCR", "Biometric KYC"]
    },
    {
      id: "consumer-tech",
      clientCategory: "Consumer Tech & Display Merchandising",
      clientTitle: "98.4% Display Stand Uptime Across 1,800 Flagship Retail Floors",
      badge: "Consumer Electronics • 1,800 Floors",
      quote: "During our flagship product launch, 30% of display stands at traditional retail partners were powered off or missing security cables. PulseAI gave us same-day verification and proof-of-performance across 1,800 doors.",
      authorName: "Kenji Takahashi",
      authorTitle: "Global Retail Merchandising Director",
      authorCompany: "Leading Consumer Electronics Brand",
      challenge: "Third-party electronics retailers frequently turned off live demo interactive software loops and unplugged alarm cables to save power, hurting consumer conversion during peak product launch weeks.",
      solution: "Dispatched verified shoppers within a 15-minute radius with customized edge CV models to detect screen loop playback, interactive touch response, and cable integrity.",
      stats: [
        { label: "Display Uptime", value: "98.4%", sub: "Up from 68% pre-pilot", color: "text-emerald-600 dark:text-emerald-400" },
        { label: "Dispatch Velocity", value: "14 Mins", sub: "Average shopper response time", color: "text-indigo-600 dark:text-indigo-400" },
        { label: "Product Trial Conversions", value: "+38%", sub: "Direct in-store sales correlation", color: "text-cyan-600 dark:text-cyan-400" }
      ],
      tags: ["Display Auditing", "Hardware Geofencing", "Sub-Hour Dispatch"]
    }
  ];

  return (
    <section id="case-studies" className="py-28 border-t border-slate-200 dark:border-slate-800/60 bg-transparent relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Award className="w-4 h-4 text-indigo-500" />
            <span>Proven Enterprise Impact</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            Documented Results <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400">
              Across Global Retailers
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            See how category leaders eliminate agency delays, recover millions in lost sales, and automate field intelligence with PulseAI.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10">
          {cases.map((cs, idx) => {
            const isSelected = activeCase === idx;
            return (
              <button
                key={cs.id}
                onClick={() => setActiveCase(idx)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-heading font-black transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-indigo-600 !text-white shadow-xl shadow-indigo-600/30 scale-105"
                    : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <span>0{idx + 1}.</span>
                <span>{cs.clientCategory}</span>
              </button>
            );
          })}
        </div>

        {/* Active Case Study Presentation Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border border-slate-200 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/70 backdrop-blur-2xl p-7 sm:p-12 shadow-2xl relative overflow-hidden"
          >
            
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Problem, Solution, Quote */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-mono font-bold uppercase px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                    {cases[activeCase].badge}
                  </span>
                  {cases[activeCase].tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-heading text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {cases[activeCase].clientTitle}
                </h3>

                {/* Challenge & Solution Grid */}
                <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 text-slate-700 dark:text-slate-300">
                    <span className="font-heading font-black text-rose-600 dark:text-rose-400 block text-xs uppercase tracking-wider mb-1">
                      Legacy Agency Bottleneck:
                    </span>
                    {cases[activeCase].challenge}
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 text-slate-700 dark:text-slate-300">
                    <span className="font-heading font-black text-emerald-600 dark:text-emerald-400 block text-xs uppercase tracking-wider mb-1">
                      PulseAI Autonomous Solution:
                    </span>
                    {cases[activeCase].solution}
                  </div>
                </div>

                {/* Executive Quote Box */}
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 relative">
                  <Quote className="w-8 h-8 text-indigo-500/20 absolute top-4 right-4" />
                  <p className="text-sm sm:text-base italic text-slate-700 dark:text-slate-200 leading-relaxed font-serif">
                    "{cases[activeCase].quote}"
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-heading font-black text-xs sm:text-sm text-slate-900 dark:text-white">
                        {cases[activeCase].authorName}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {cases[activeCase].authorTitle}, <strong className="text-indigo-600 dark:text-indigo-400">{cases[activeCase].authorCompany}</strong>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Key Quantifiable ROI Metrics */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-2 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
                    Verified Outcome Metrics
                  </span>
                </div>

                {cases[activeCase].stats.map((stat, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950/90 shadow-md flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block uppercase font-heading">
                        {stat.label}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {stat.sub}
                      </span>
                    </div>

                    <div className={`font-mono font-black text-3xl sm:text-4xl ${stat.color}`}>
                      {stat.value}
                    </div>
                  </div>
                ))}

                <div className="pt-4">
                  <Link
                    href="/client"
                    className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 !text-white dark:!text-slate-900 font-heading font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Replicate These Results in Client Studio</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
