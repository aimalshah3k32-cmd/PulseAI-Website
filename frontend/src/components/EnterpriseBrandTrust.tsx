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
  Zap,
  Building2
} from "lucide-react";

export function EnterpriseBrandTrust() {
  const enterpriseClients = [
    { name: "Unilever", category: "Global FMCG", footprint: "14,000 Stores Audited", ticker: "UN" },
    { name: "NestlÃ© Global", category: "Nutrition & Food", footprint: "8,500 Stores Audited", ticker: "NESN" },
    { name: "L'OrÃ©al Luxe", category: "Cosmetics & Fragrance", footprint: "3,200 Boutiques", ticker: "OR" },
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
      icon: <Lock className="w-5 h-5 text-blue-500" />,
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
    <section className="py-16 border-y border-slate-200 bg-slate-50 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md border border-slate-200 bg-white text-slate-700 text-sm font-semibold mb-4 shadow-sm">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>Enterprise Field Grade</span>
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            Trusted by Category Leaders Across 50+ Global Markets
          </p>
        </div>

        {/* Animated Infinite Marquee Ribbon */}
        <div className="relative overflow-hidden w-full py-3 mb-14">
          
          {/* Left & Right Soft Fade Gradient Masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-slate-50 to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-slate-50 to-transparent z-20" />

          {/* Scrolling Marquee Container */}
          <div className="animate-marquee flex gap-5 sm:gap-6 w-max cursor-pointer py-2">
            {[...enterpriseClients, ...enterpriseClients].map((client, idx) => (
              <div
                key={idx}
                className="w-64 sm:w-72 shrink-0 p-5 rounded-md border border-slate-200 bg-white hover:border-blue-500 transition-colors flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                    {client.name}
                  </div>
                  <div className="text-sm text-slate-500 mt-1 font-medium">
                    {client.category}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-semibold text-emerald-600 flex items-center gap-1">
                    âœ“ {client.footprint}
                  </span>
                  <span className="text-sm text-slate-400 group-hover:translate-x-1 transition-transform">
                    â†’
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Picture Feature Banner */}
        <div className="my-10 rounded-2xl overflow-hidden border border-slate-200/80 shadow-xl bg-slate-900 relative group">
          <img 
            src="/images/brand-showcase-hero.jpg" 
            alt="PULSE AI Brand Enterprise Showcase" 
            className="w-full h-[380px] sm:h-[460px] object-cover opacity-90 group-hover:scale-[1.01] transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-600/30 border border-blue-400/40 text-blue-300 text-xs font-semibold backdrop-blur-md mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Global Brand Intelligence Platform</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                Empowering Top Tier Global Brands with AI Mystery Shopping & Real-Time Retail Audit Analytics
              </h3>
              <p className="text-slate-300 text-sm sm:text-base mt-2 font-medium">
                PULSE AI connects over 14,000+ verified field auditors across 50+ GCC & international markets directly to brand command centers.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-8 shadow-sm mt-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {complianceBadges.map((badge, bIdx) => (
              <div key={bIdx} className="flex items-start gap-4">
                <div className="p-3 rounded-md bg-slate-50 border border-slate-200 shrink-0">
                  {badge.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900">
                      {badge.title}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
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


