"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { EnterpriseBrandTrust } from "@/components/EnterpriseBrandTrust";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ScrollReveal } from "@/components/ScrollReveal";
import { 
  ShieldCheck, 
  Eye, 
  Building2, 
  Smartphone, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  MapPin, 
  Award, 
  Zap, 
  Cpu, 
  BarChart3, 
  Sliders, 
  FileText,
  Scan,
  Radar,
  Radio
} from "lucide-react";

export default function Home() {
  const trustMetrics = [
    { value: 10000, label: "Projects Completed", sub: "Enterprise Mystery Audits", suffix: " +" },
    { value: 40000, label: "Secret Shoppers", sub: "Vetted & Biometric Verified", suffix: " +" },
    { value: 40, label: "Nationalities", sub: "Multilingual Native Field", suffix: " +" },
    { value: 50, label: "Locations Covered", sub: "Dubai, Abu Dhabi & GCC", suffix: " +" },
  ];

  const solutions = [
    {
      title: "Mystery Shopping & CX",
      subtitle: "Undercover In-Store Audits",
      desc: "Discreet evaluation of customer service quality, associate hospitality, checkout speed, and verified purchase receipts.",
      icon: <Eye className="w-6 h-6 text-blue-500" />,
      tag: "Customer Journey",
      href: "/process",
      actionText: "Explore Process & Workflow"
    },
    {
      title: "AI Computer Vision Audits",
      subtitle: "Autonomous Shelf Inspection",
      desc: "Sub-second planogram compliance, out-of-stock void detection, and price tag OCR extraction with YOLOv8 inference.",
      icon: <Scan className="w-6 h-6 text-cyan-500" />,
      tag: "Real-Time AI",
      href: "/admin",
      actionText: "View AI QC Command"
    },
    {
      title: "Field Shopper Radar",
      subtitle: "On-Demand Dispatch Network",
      desc: "Hardware-locked geofencing, biometric check-in, and instant automated payouts for certified shoppers across the UAE.",
      icon: <Smartphone className="w-6 h-6 text-emerald-500" />,
      tag: "Shopper Network",
      href: "/shopper",
      actionText: "Open Shopper Radar"
    }
  ];

  const valuePillars = [
    {
      step: "01",
      icon: <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      title: "Hardware GPS Geofenced Check-In",
      desc: "Zero spoofing. Evaluators must physically enter the geofenced perimeter before audit tasks activate on mobile."
    },
    {
      step: "02",
      icon: <Cpu className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
      title: "Sub-Second AI Computer Vision",
      desc: "Shelf photos and receipts are parsed immediately by AI models, flagging planogram compliance and out-of-stock voids."
    },
    {
      step: "03",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      title: "Guaranteed SLA Quality Escrow",
      desc: "Submissions pass anti-fraud inspection before approval. High-quality shoppers are rewarded immediately."
    }
  ];



  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* ================================================================
          1. CINEMATIC 2-COLUMN HERO WITH ANIMATED SCANNER PICTURE
          ================================================================ */}
      <section className="relative pt-12 pb-16 sm:pb-24 overflow-hidden bg-slate-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* 2-COLUMN EXECUTIVE SPLIT HERO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Headlines & Actions */}
            <div className="lg:col-span-6 text-left">

              {/* Primary Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
              >
                Mystery Shopping &amp; <br />
                <span className="text-blue-600">
                  AI Retail Audits
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-slate-600 mt-6 leading-relaxed"
              >
                Empowering luxury retailers, hospitality, and FMCG brands across Dubai, Abu Dhabi, and the GCC with 40,000+ certified secret shoppers and sub-second computer vision shelf compliance.
              </motion.p>

              {/* Direct Action Navigation Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-3.5 mt-8"
              >
                {/* Register as Client */}
                <Link
                  href="/register/client"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors flex items-center gap-2"
                >
                  <Building2 className="w-5 h-5" />
                  <span>Register as Client</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Join as Shopper */}
                <Link
                  href="/register/shopper"
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-md transition-colors flex items-center gap-2"
                >
                  <Smartphone className="w-5 h-5" />
                  <span>Join as Shopper</span>
                </Link>

                {/* Launch Studio */}
                <Link
                  href="/client"
                  className="px-6 py-3 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-md transition-colors flex items-center gap-2"
                >
                  <span>Client Login</span>
                </Link>
              </motion.div>

              {/* Micro Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 text-left">
                <div>
                  <div className="font-heading font-black text-base sm:text-lg text-blue-600 dark:text-blue-400">
                    <AnimatedCounter target={10000} suffix="+" />
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">Projects Done</div>
                </div>
                <div>
                  <div className="font-heading font-black text-base sm:text-lg text-emerald-600 dark:text-emerald-400">
                    <AnimatedCounter target={40000} suffix="+" />
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">Vetted Shoppers</div>
                </div>
                <div>
                  <div className="font-heading font-black text-base sm:text-lg text-cyan-600 dark:text-cyan-400">
                    <AnimatedCounter target={50} suffix="+" />
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">GCC Locations</div>
                </div>
              </div>
            </div>

            {/* Right Column: Corporate Image */}
            <motion.div 
              className="lg:col-span-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src="/hero-corporate.jpg" 
                alt="Mystery Shopping Professional" 
                className="w-full h-[500px] object-cover rounded-md shadow-md border border-slate-200" 
              />
            </motion.div>
          </div>

          {/* ============================================================
              2. METRIC COUNTERS BAR (Undercover.ae Parallel)
              ============================================================ */}
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 p-8 bg-white border border-slate-200 rounded-md shadow-sm">
              {trustMetrics.map((m, idx) => (
                <div key={idx} className="text-center p-4">
                  <div className="text-4xl font-bold text-blue-600">
                    <AnimatedCounter target={m.value} suffix={m.suffix} duration={2} />
                  </div>
                  <div className="text-lg font-semibold text-slate-800 mt-2">
                    {m.label}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    {m.sub}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </section>



      {/* ================================================================
          4. "WE SPECIALIZE IN" â€” CORE SOLUTIONS (Direct Navigation Links)
          ================================================================ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <ScrollReveal variant="fadeUp">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2 block">
                Core Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                We Specialize In
              </h2>
              <p className="text-slate-600 text-lg mt-4">
                Select any capability below to explore its dedicated workflow, live portal, or case study.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol, index) => (
              <ScrollReveal key={index} variant="fadeUp" delay={index * 0.07}>
                <div className="p-8 bg-white border border-slate-200 rounded-md flex flex-col justify-between h-full">
                  <div>
                    <div className="mb-6 text-blue-600">
                      {sol.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {sol.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {sol.desc}
                    </p>
                  </div>
                  <div className="mt-8">
                    <Link
                      href={sol.href}
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                    >
                      <span>{sol.actionText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================================
          5. WHY LEADING BRANDS CHOOSE US (3 Pillars)
          ================================================================ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <ScrollReveal variant="fadeUp">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2 block">
                Ground Truth Standard
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why Choose PulseAI Over Legacy Agencies
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valuePillars.map((vp, i) => (
              <ScrollReveal key={i} variant="fadeUp" delay={i * 0.1}>
                <div className="p-8 bg-white border border-slate-200 rounded-md flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-4 mb-6 text-blue-600">
                      {vp.icon}
                      <span className="text-2xl font-bold text-slate-300">
                        {vp.step}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">
                      {vp.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {vp.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================================
          6. TRUSTED BRANDS BANNER
          ================================================================ */}
      <ScrollReveal variant="fadeUp">
        <EnterpriseBrandTrust />
      </ScrollReveal>



    </div>
  );
}


