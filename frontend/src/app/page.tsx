"use client";

import React, { useState, useRef, lazy, Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { HeroVisualAnimation } from "@/components/HeroVisualAnimation";
import { ParticleField } from "@/components/ParticleField";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ScrollReveal } from "@/components/ScrollReveal";

// Lazy-load heavy below-the-fold components for fast initial render
const ProcessWorkflow = dynamic(() => import("@/components/ProcessWorkflow").then(m => ({ default: m.ProcessWorkflow })), { ssr: false });
const EnterpriseBrandTrust = dynamic(() => import("@/components/EnterpriseBrandTrust").then(m => ({ default: m.EnterpriseBrandTrust })), { ssr: false });
const EnterprisePilotBuilder = dynamic(() => import("@/components/EnterprisePilotBuilder").then(m => ({ default: m.EnterprisePilotBuilder })), { ssr: false });
const EnterpriseCaseStudies = dynamic(() => import("@/components/EnterpriseCaseStudies").then(m => ({ default: m.EnterpriseCaseStudies })), { ssr: false });
const EnterpriseArchitecture = dynamic(() => import("@/components/EnterpriseArchitecture").then(m => ({ default: m.EnterpriseArchitecture })), { ssr: false });
import { 
  ShieldCheck, 
  Eye, 
  FileText, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Globe2, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Building2, 
  Smartphone, 
  ShieldAlert,
  Activity,
  Scan,
  MapPin,
  TrendingUp,
  Radar,
  Radio,
  Lock,
  ChevronRight,
  Zap,
  Sliders,
  DollarSign,
  Check
} from "lucide-react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeVisionLayer, setActiveVisionLayer] = useState<"all" | "facings" | "voids" | "ocr">("all");
  
  // Interactive 3D Parallax Mouse Physics
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Interactive 3D ROI Calculator State
  const [storeCount, setStoreCount] = useState<number>(350);
  const [auditFrequency, setAuditFrequency] = useState<number>(2); // audits/month
  
  // Dynamic Calculations
  const manualHours = storeCount * auditFrequency * 4.5;
  const pulseHours = Math.round(storeCount * auditFrequency * 0.2);
  const manualCost = storeCount * auditFrequency * 85;
  const pulseCost = storeCount * auditFrequency * 26;
  const monthlySavings = manualCost - pulseCost;

  const trustMetrics = [
    { value: 10000, label: "Audits Completed", sub: "Enterprise SLA Grade", suffix: "+" },
    { value: 40000, label: "Verified Shoppers", sub: "KYC & Hardware Geofenced", suffix: "+" },
    { value: 40, label: "Nationalities Covered", sub: "Multilingual Native Field", suffix: "+" },
    { value: 50, label: "Global Markets", sub: "Sub-Hour Dispatch", suffix: "+" },
  ];

  const globalHubs = [
    { city: "Dubai", country: "UAE", activeShoppers: "3,840", responseTime: "18 mins", flag: "🇦🇪" },
    { city: "London", country: "UK", activeShoppers: "6,200", responseTime: "12 mins", flag: "🇬🇧" },
    { city: "New York", country: "USA", activeShoppers: "8,950", responseTime: "9 mins", flag: "🇺🇸" },
    { city: "Paris", country: "France", activeShoppers: "4,120", responseTime: "24 mins", flag: "🇫🇷" },
    { city: "Tokyo", country: "Japan", activeShoppers: "5,430", responseTime: "15 mins", flag: "🇯🇵" },
    { city: "Singapore", country: "Singapore", activeShoppers: "2,980", responseTime: "14 mins", flag: "🇸🇬" },
  ];

  const customerProblems = [
    {
      icon: <AlertTriangle className="w-9 h-9 text-amber-500" />,
      title: "The Freelancer Reliability Gap",
      badge: "Marketplace Risk",
      problem: "Unvetted gig workers on generic platforms miss strict audit windows, fabricate responses, and create serious corporate liability.",
      solution: "Enterprise vetted shopper network with biometric KYC verification, hardware-locked geofencing, and binding SLAs."
    },
    {
      icon: <Layers className="w-9 h-9 text-rose-500" />,
      title: "Manual Review Bottlenecks",
      badge: "Weeks of Delay",
      problem: "Traditional agencies take 3 to 4 weeks manually reviewing thousands of shelf photos, receipts, and audio recordings.",
      solution: "Sub-second Computer Vision shelf parsing, planogram compliance matching, and automated text sentiment scoring."
    },
    {
      icon: <ShieldCheck className="w-9 h-9 text-indigo-500" />,
      title: "GPS Spoofing & Recycled Photos",
      badge: "Data Pollution",
      problem: "Fake GPS location apps and recycled stock photos corrupt corporate decision models and waste millions.",
      solution: "Multi-point EXIF verification, perceptual image hashing, and strict hardware-level geofenced check-in gates."
    },
    {
      icon: <Globe2 className="w-9 h-9 text-cyan-500" />,
      title: "Vendor Fragmentation",
      badge: "Operational Drag",
      problem: "Juggling 5 different boutique agencies for mystery visits, retail auditing, translation, and AI dataset labeling.",
      solution: "Unified multi-modal intelligence engine orchestrating all field data collection and AI verification under one roof."
    }
  ];

  const allServices = [
    {
      id: "retail",
      category: "Retail & Planogram Auditing",
      tag: "retail_audit",
      icon: <CheckCircle2 className="w-8 h-8 text-emerald-500" />,
      description: "Automated shelf compliance, stock availability, and promotional display audits powered by computer vision.",
      features: [
        "Planogram Eye-Level Share of Shelf",
        "Out-of-Stock (OOS) Root Cause Alerts",
        "Promotional Wobbler & Endcap Audits",
        "Competitor Price Tag OCR Extraction"
      ],
      aiFeatures: "Object Detection Bounding Boxes + Planogram Compliance Scoring",
      badge: "Real-Time CV"
    },
    {
      id: "mystery",
      category: "Mystery Shopping & CX Benchmarking",
      tag: "mystery_shopping",
      icon: <Eye className="w-8 h-8 text-blue-500" />,
      description: "In-store and digital customer journey benchmarking across global physical locations with verified receipts.",
      features: [
        "Associate Greeting & Hospitality Time",
        "Product Demonstration Competence",
        "Checkout Speed & Upsell Compliance",
        "Verified Receipt OCR Validation"
      ],
      aiFeatures: "Acoustic Sentiment Analysis + Receipt OCR Parsing",
      badge: "Customer Journey"
    },
    {
      id: "ai_data",
      category: "AI Data Engineering & Harvesting",
      tag: "ai_data",
      icon: <FileText className="w-8 h-8 text-purple-500" />,
      description: "Custom multi-modal dataset creation, image annotation, and acoustic localization for foundation models.",
      features: [
        "Multi-Modal Retail Floor Dataset Harvest",
        "2D / 3D Bounding Box & Polygon Annotation",
        "In-Store Acoustic Noise Profiling",
        "Localized Dialect Audio Recordings"
      ],
      aiFeatures: "Perceptual Image Hashing + Automated Data Quality Grading",
      badge: "Dataset Factory"
    },
    {
      id: "surveys",
      category: "Consumer Insights & Video Diaries",
      tag: "field_survey",
      icon: <Users className="w-8 h-8 text-amber-500" />,
      description: "On-the-ground face-to-face consumer surveys and verified shopper video diaries with emotional analysis.",
      features: [
        "Store-Exit Intercept Interviews",
        "Brand Switching Decision Mapping",
        "Consumer Video Experience Logs",
        "Localized Cultural Focus Group Harvests"
      ],
      aiFeatures: "Speech-to-Text Transcription + Emotional Sentiment Extraction",
      badge: "Voice of Customer"
    }
  ];

  const filteredServices = activeCategory === "all" 
    ? allServices 
    : allServices.filter(s => s.tag === activeCategory);

  return (
    <div className="min-h-screen bg-transparent text-[var(--text-primary)] transition-colors selection:bg-indigo-500 selection:text-white font-sans">
      
      {/* ================================================================
          1. CINEMATIC 3D HERO SECTION WITH PARTICLE BACKGROUND
          ================================================================ */}
      <section className="relative pt-12 sm:pt-20 pb-28 overflow-hidden bg-grid-pattern">
        
        {/* Particle Network Canvas Background */}
        <div className="absolute inset-0 z-0">
          <ParticleField />
        </div>

        {/* Aurora Gradient Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-cyan-500/20 blur-[160px] pointer-events-none rounded-full animate-aurora" 
          style={{ backgroundSize: "400% 400%", background: "linear-gradient(135deg, var(--aurora-1), var(--aurora-2), var(--aurora-3), var(--aurora-1))" }}
        />
        <div className="absolute top-12 right-6 w-[400px] h-[400px] bg-indigo-500/10 blur-[130px] pointer-events-none rounded-full animate-float-gentle-delay" />
        <div className="absolute bottom-8 left-6 w-[400px] h-[400px] bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full animate-float-gentle-slow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Top Live Global Telemetry Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between gap-3 sm:gap-6 flex-wrap text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 py-2 px-4 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 backdrop-blur-md mb-8 max-w-5xl mx-auto shadow-sm"
          >
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              SYSTEM ONLINE: 52 GLOBAL NODES
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span>41,290 ACTIVE EVALUATORS</span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="text-cyan-600 dark:text-cyan-400">YOLOv8 INFERENCE: 840ms</span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="text-indigo-600 dark:text-indigo-400">ESCROW POOL: $1.42M+</span>
          </motion.div>

          {/* 2-COLUMN EXECUTIVE SPLIT HERO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Headlines & Actions */}
            <div className="lg:col-span-6 text-left">
              
              {/* Top Pill Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-widest mb-5 shadow-sm backdrop-blur-xl"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 animate-spin" style={{ animationDuration: "7s" }} /> 
                <span>Global Field Intelligence &amp; AI Computer Vision</span>
              </motion.div>

              {/* MASSIVE ULTRA-LARGE HEADLINE WITH SHIMMER */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-heading text-4xl sm:text-6xl lg:text-[58px] xl:text-[68px] font-black tracking-tight text-slate-900 dark:text-white leading-[1.02] glow-title"
              >
                TRANSFORM AUDITS INTO{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 animate-shimmer-text block sm:inline"
                  style={{ backgroundSize: "200% auto" }}
                >
                  AUTONOMOUS AI
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-5 leading-relaxed font-normal"
              >
                Execute verified mystery shopping, retail shelf planogram compliance, and multi-modal AI dataset operations with sub-second computer vision and hardware-level geofencing.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-3.5 mt-8 flex-wrap"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/register/client"
                    className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 !text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 text-sm group font-heading animate-glow-pulse"
                  >
                    <Building2 className="w-4 h-4 !text-white" />
                    <span>Register as Client</span>
                    <Sparkles className="w-3.5 h-3.5 !text-white group-hover:rotate-12 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/register/shopper"
                    className="w-full sm:w-auto px-6 py-4 bg-emerald-600 hover:bg-emerald-500 !text-white font-black rounded-2xl transition-all shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 text-sm group font-heading"
                  >
                    <Smartphone className="w-4 h-4 !text-white" />
                    <span>Join as Shopper</span>
                    <CheckCircle2 className="w-3.5 h-3.5 !text-white group-hover:scale-110 transition-transform" />
                  </Link>
                </motion.div>

                <Link
                  href="/client"
                  className="w-full sm:w-auto px-5 py-4 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold rounded-2xl transition-all text-sm flex items-center justify-center gap-2 shadow-md dark:shadow-xl hover:border-indigo-500/60"
                >
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span>Client Studio</span>
                </Link>

                <Link
                  href="/shopper"
                  className="w-full sm:w-auto px-5 py-4 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold rounded-2xl transition-all text-sm flex items-center justify-center gap-2 shadow-md dark:shadow-xl hover:border-emerald-500/60"
                >
                  <Radio className="w-4 h-4 text-emerald-500" />
                  <span>Shopper Radar</span>
                </Link>
              </motion.div>

              {/* Micro Trust Stats */}
              <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 text-left">
                <div>
                  <div className="font-heading font-black text-lg text-indigo-600 dark:text-indigo-400">
                    <AnimatedCounter target={10000} suffix="+" />
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">Audits Completed</div>
                </div>
                <div>
                  <div className="font-heading font-black text-lg text-emerald-600 dark:text-emerald-400">
                    <AnimatedCounter target={40000} suffix="+" />
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">Verified Shoppers</div>
                </div>
                <div>
                  <div className="font-heading font-black text-lg text-cyan-600 dark:text-cyan-400">
                    <AnimatedCounter target={52} suffix=" Markets" />
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">Sub-Hour Dispatch</div>
                </div>
              </div>

            </div>

            {/* Right Column: ANIMATED PICTURE ON TOP */}
            <motion.div 
              className="lg:col-span-6"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <HeroVisualAnimation />
            </motion.div>

          </div>

          {/* INTERACTIVE 3D COMPUTER VISION SCANNER */}
          <ScrollReveal variant="scaleIn" delay={0.1}>
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="mt-20 max-w-5xl mx-auto rounded-3xl border border-slate-200 dark:border-indigo-500/40 bg-white/95 dark:bg-slate-900/80 backdrop-blur-2xl p-6 sm:p-10 shadow-xl dark:shadow-3d-card relative overflow-hidden perspective-1000 card-3d cursor-pointer border-trace"
            >
              {/* Header Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-6 mb-6" style={{ transform: "translateZ(30px)" }}>
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-600/25 border border-indigo-200 dark:border-indigo-500/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm">
                    <Scan className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-heading">Autonomous Computer Vision Scanner</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-mono font-black">
                        LATENCY: 1.18s
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Interactive Object Detection, Planogram Alignment & Price Tag OCR</span>
                  </div>
                </div>

                {/* Layer Toggle Chips */}
                <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 text-xs">
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveVisionLayer("all"); }}
                    className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${activeVisionLayer === "all" ? "bg-indigo-600 !text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
                  >
                    All Layers
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveVisionLayer("facings"); }}
                    className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${activeVisionLayer === "facings" ? "bg-emerald-600 !text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
                  >
                    SKU Facings
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveVisionLayer("voids"); }}
                    className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${activeVisionLayer === "voids" ? "bg-rose-600 !text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
                  >
                    Void Alerts
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveVisionLayer("ocr"); }}
                    className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${activeVisionLayer === "ocr" ? "bg-cyan-600 !text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
                  >
                    Price OCR
                  </button>
                </div>
              </div>

              {/* Simulated 3D Store Shelf with Scanning Laser */}
              <div className="relative rounded-2xl overflow-hidden aspect-video max-h-[420px] w-full border border-slate-200 dark:border-slate-800 bg-slate-950" style={{ transform: "translateZ(20px)" }}>
                <img
                  src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80"
                  alt="Retail Shelf Scan"
                  className="w-full h-full object-cover opacity-90"
                />

                {/* Animated Laser Scan Line */}
                <div className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_#22d3ee] animate-scan-laser pointer-events-none z-20" />

                {/* Overlay 1: Compliant Facing 1 */}
                {(activeVisionLayer === "all" || activeVisionLayer === "facings") && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-[22%] left-[14%] w-[22%] h-[38%] border-2 border-emerald-400 bg-emerald-500/25 rounded-2xl p-2 flex flex-col justify-between z-10 backdrop-blur-[2px] shadow-2xl shadow-emerald-500/30"
                  >
                    <span className="text-[11px] font-mono font-black !text-emerald-100 bg-emerald-950/90 px-2 py-0.5 rounded-lg w-fit shadow-md">
                      ✓ SKU #1 (98.4%)
                    </span>
                    <span className="text-[10px] font-mono !text-emerald-300 font-bold self-end bg-slate-950/90 px-2 py-0.5 rounded-md">Eye-Level: 42%</span>
                  </motion.div>
                )}

                {/* Overlay 2: Compliant Facing 2 */}
                {(activeVisionLayer === "all" || activeVisionLayer === "facings") && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-[24%] left-[38%] w-[20%] h-[37%] border-2 border-emerald-400 bg-emerald-500/25 rounded-2xl p-2 flex flex-col justify-between z-10 backdrop-blur-[2px] shadow-2xl shadow-emerald-500/30"
                  >
                    <span className="text-[11px] font-mono font-black !text-emerald-100 bg-emerald-950/90 px-2 py-0.5 rounded-lg w-fit shadow-md">
                      ✓ SKU #2 (96.1%)
                    </span>
                    <span className="text-[10px] font-mono !text-emerald-300 font-bold self-end bg-slate-950/90 px-2 py-0.5 rounded-md">Compliant</span>
                  </motion.div>
                )}

                {/* Overlay 3: Shelf Void / Out of Stock Alert */}
                {(activeVisionLayer === "all" || activeVisionLayer === "voids") && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-[25%] left-[60%] w-[24%] h-[38%] border-2 border-rose-500 bg-rose-500/30 rounded-2xl p-2 flex flex-col justify-between z-10 animate-pulse backdrop-blur-[2px] shadow-2xl shadow-rose-500/40"
                  >
                    <span className="text-[11px] font-mono font-black !text-rose-100 bg-rose-950/95 px-2 py-0.5 rounded-lg w-fit flex items-center gap-1 shadow-md">
                      <AlertTriangle className="w-4 h-4 text-rose-400" /> OOS VOID ALERT
                    </span>
                    <span className="text-[10px] font-mono !text-rose-300 font-bold self-end bg-slate-950/90 px-2 py-0.5 rounded-md">Restock Required</span>
                  </motion.div>
                )}

                {/* Overlay 4: Price Tag OCR Strip */}
                {(activeVisionLayer === "all" || activeVisionLayer === "ocr") && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-[18%] left-[12%] w-[74%] h-[14%] border-2 border-cyan-400 bg-cyan-500/25 rounded-2xl px-3.5 flex items-center justify-between z-10 backdrop-blur-[2px] shadow-lg shadow-cyan-500/20"
                  >
                    <span className="text-xs font-mono font-bold !text-cyan-100 bg-slate-950/90 px-3 py-1 rounded-lg">
                      OCR Tag: $3.49 / Unit
                    </span>
                    <span className="text-xs font-mono !text-cyan-300 font-bold bg-slate-950/90 px-3 py-1 rounded-lg">100% Promo Match</span>
                  </motion.div>
                )}
              </div>

              {/* Bottom Real-time Telemetry Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8" style={{ transform: "translateZ(25px)" }}>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider block">Planogram Alignment</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">94.8%</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider block">Shelf Emptiness Void</span>
                  <span className="text-xl sm:text-2xl font-black text-cyan-600 dark:text-cyan-400 font-mono">3.8%</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider block">GPS Perimeter Lock</span>
                  <span className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">18m Verified</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider block">Escrow Status</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">Auto-Approved</span>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Trust Metrics Bar with Animated Counters */}
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 mt-20 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 sm:p-10 bg-white/90 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl dark:shadow-2xl">
              {trustMetrics.map((metric, index) => (
                <div key={index} className="text-center p-3">
                  <div className="font-heading text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-cyan-300 dark:to-indigo-200">
                    <AnimatedCounter target={metric.value} suffix={metric.suffix} duration={2.5} />
                  </div>
                  <div className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 mt-2 uppercase tracking-wider font-heading">
                    {metric.label}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                    {metric.sub}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. FORTUNE 500 CLIENT PROOF & AICPA/ISO COMPLIANCE */}
      <ScrollReveal variant="fadeUp">
        <EnterpriseBrandTrust />
      </ScrollReveal>

      {/* 3. 3D GLOBAL DISPATCH HUBS & RADAR SECTION */}
      <section className="py-24 border-y border-slate-200 dark:border-slate-800/80 bg-slate-100/80 dark:bg-slate-950/90 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal variant="fadeUp">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-500/15 px-4 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-500/30">
                  Global Footprint
                </span>
                <h2 className="font-heading text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight mt-4">
                  Sub-Hour Field Dispatch Across 50+ Markets
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3 max-w-2xl">
                  Real-time vetted evaluators deployed with biometric check-in and hardware-locked geofencing.
                </p>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-mono font-bold bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 px-4 py-2 rounded-2xl shadow-sm">
                <Radar className="w-5 h-5 animate-spin text-emerald-600 dark:text-emerald-400" style={{ animationDuration: "3s" }} />
                <span>RADAR LIVE: 40,000+ AUDITORS STANDING BY</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {globalHubs.map((hub, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, scale: 1.03 }}
                className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-slate-900/90 transition-all text-center shadow-sm dark:shadow-none border-trace"
              >
                <motion.div 
                  className="text-3xl mb-3"
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  {hub.flag}
                </motion.div>
                <div className="font-heading font-black text-slate-900 dark:text-white text-lg sm:text-xl">{hub.city}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-4">{hub.country}</div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs space-y-1">
                  <div className="text-emerald-600 dark:text-emerald-400 font-mono font-black">{hub.activeShoppers} Evaluators</div>
                  <div className="text-slate-500 font-medium">Dispatch: {hub.responseTime}</div>
                </div>
              </motion.div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 3. ENTERPRISE PROBLEMS SOLVED */}
      <section id="problems" className="py-28 border-t border-slate-200 dark:border-slate-800/60 bg-transparent relative">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal variant="fadeUp">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-500/15 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-500/30">
                Enterprise Ground Truth
              </span>
              <h2 className="font-heading text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight mt-4">
                The Critical Problems We Solve
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-4">
                Why leading retail brands replace unverified freelancer marketplaces with our unified AI field intelligence engine.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" className="grid md:grid-cols-2 gap-8">
            {customerProblems.map((problem, index) => (
              <div
                key={index}
                className="p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-slate-900/80 transition-all flex flex-col justify-between shadow-lg dark:shadow-2xl card-3d border-trace"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 shadow-sm dark:shadow-inner">
                      {problem.icon}
                    </div>
                    <span className="text-xs font-mono font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {problem.badge}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl font-black text-slate-900 dark:text-white mb-4">{problem.title}</h3>
                  <div className="space-y-4 text-sm sm:text-base">
                    <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/25 border border-rose-200 dark:border-rose-900/40 text-slate-700 dark:text-slate-300">
                      <span className="font-bold text-rose-600 dark:text-rose-400 block text-xs uppercase tracking-wider mb-1.5 font-heading">Legacy Agency Risk:</span>
                      {problem.problem}
                    </div>
                    <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-900/40 text-slate-700 dark:text-slate-300">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-xs uppercase tracking-wider mb-1.5 font-heading">PulseAI Solution:</span>
                      {problem.solution}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 4. AUTONOMOUS PROCESS WORKFLOW ENGINE (HOW IT WORKS) */}
      <ScrollReveal variant="fadeUp">
        <ProcessWorkflow />
      </ScrollReveal>

      {/* 5. VERIFIED CLIENT ROI & PROVEN CASE STUDIES */}
      <ScrollReveal variant="fadeUp">
        <EnterpriseCaseStudies />
      </ScrollReveal>

      {/* 6. UNIFIED 3D SERVICE CATALOG */}
      <section id="services" className="py-28 border-t border-slate-200 dark:border-slate-800/60 relative">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal variant="fadeUp">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-500/15 px-4 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-500/30">
                  Service Capabilities
                </span>
                <h2 className="font-heading text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight mt-4">
                  Unified Field & AI Operations
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3 max-w-2xl">
                  One platform connecting on-the-ground human fieldwork with automated computer vision verification.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 p-2 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-inner">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeCategory === "all" ? "bg-indigo-600 !text-white shadow-md shadow-indigo-600/40" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  All Services
                </button>
                <button
                  onClick={() => setActiveCategory("retail_audit")}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeCategory === "retail_audit" ? "bg-indigo-600 !text-white shadow-md shadow-indigo-600/40" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  Retail Audits
                </button>
                <button
                  onClick={() => setActiveCategory("mystery_shopping")}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeCategory === "mystery_shopping" ? "bg-indigo-600 !text-white shadow-md shadow-indigo-600/40" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  Mystery Shopping
                </button>
                <button
                  onClick={() => setActiveCategory("ai_data")}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeCategory === "ai_data" ? "bg-indigo-600 !text-white shadow-md shadow-indigo-600/40" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  AI Data Ops
                </button>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((service, idx) => (
              <ScrollReveal key={service.id} variant="fadeUp" delay={idx * 0.1}>
                <div
                  className="p-7 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-slate-900/80 transition-all flex flex-col justify-between group shadow-lg dark:shadow-2xl card-3d border-trace h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <motion.div 
                        className="p-4 w-fit rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        {service.icon}
                      </motion.div>
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-bold">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="font-heading font-black text-slate-900 dark:text-white text-xl sm:text-2xl mb-3">{service.category}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{service.description}</p>
                    
                    <div className="border-t border-slate-100 dark:border-slate-800/80 pt-5 mb-5">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-3 font-heading">Key Deliverables:</span>
                      <ul className="space-y-2.5">
                        {service.features.map((item, i) => (
                          <li key={i} className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2.5">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/60">
                    <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 text-xs text-indigo-700 dark:text-indigo-300 font-bold mb-4">
                      ⚡ {service.aiFeatures}
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href={`/client?type=${service.tag}`}
                        className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-indigo-600 dark:bg-slate-800 dark:hover:bg-indigo-600 !text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg font-heading"
                      >
                        <span>Create Campaign</span>
                        <ArrowRight className="w-4 h-4 !text-white" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CUSTOM ENTERPRISE PILOT & RFP BLUEPRINT CONFIGURATOR */}
      <ScrollReveal variant="fadeUp">
        <EnterprisePilotBuilder />
      </ScrollReveal>

      {/* 8. INTERACTIVE 3D ROI CALCULATOR */}
      <section id="roi" className="py-28 border-t border-slate-200 dark:border-slate-800/60 bg-slate-100/40 dark:bg-slate-900/30 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-14 items-center">
            
            {/* Calculator Inputs */}
            <ScrollReveal variant="fadeLeft" className="lg:col-span-6 space-y-7">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/15 px-4 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/30">
                Enterprise ROI Engine
              </span>
              <h2 className="font-heading text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                Calculate Your Annual Auditing Savings
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                See how automated computer vision and verified dispatch reduce human QC overhead by up to 68%.
              </p>

              {/* Slider 1: Store Locations */}
              <div className="p-7 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm dark:shadow-inner">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-heading">Physical Store Locations:</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-black text-lg">{storeCount} Stores</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={2500}
                  step={10}
                  value={storeCount}
                  onChange={(e) => setStoreCount(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Slider 2: Audit Frequency */}
              <div className="p-7 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm dark:shadow-inner">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-heading">Audits Per Store / Month:</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400 font-black text-lg">{auditFrequency}x / month</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  step={1}
                  value={auditFrequency}
                  onChange={(e) => setAuditFrequency(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
              </div>
            </ScrollReveal>

            {/* Dynamic 3D Results Card */}
            <ScrollReveal variant="fadeRight" className="lg:col-span-6">
              <div className="p-10 rounded-3xl border border-indigo-200 dark:border-indigo-500/40 bg-gradient-to-tr from-indigo-50 dark:from-indigo-950/70 via-white dark:via-slate-900 to-purple-50 dark:to-purple-950/50 shadow-xl dark:shadow-3d-card relative overflow-hidden card-3d">
                <div className="text-center mb-10">
                  <span className="text-xs uppercase font-bold text-indigo-700 dark:text-indigo-300 tracking-widest block font-heading">Estimated Monthly Savings</span>
                  <div className="font-heading text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 mt-3">
                    ${monthlySavings.toLocaleString()} USD
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-300 mt-2 block font-medium">{( (monthlySavings / manualCost) * 100).toFixed(0)}% Net Cost Reduction</span>
                </div>

                <div className="grid grid-cols-2 gap-5 text-sm mb-10">
                  <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-slate-500 dark:text-slate-400 block text-xs">Legacy Agency Turnaround:</span>
                    <span className="text-xl font-black text-rose-600 dark:text-rose-400 font-mono block mt-1">{manualHours.toLocaleString()} Hours</span>
                    <span className="text-[11px] text-slate-500 block mt-1">3-4 weeks manual QC</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-slate-500 dark:text-slate-400 block text-xs">PulseAI Turnaround:</span>
                    <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono block mt-1">{pulseHours} Hours</span>
                    <span className="text-[11px] text-slate-500 block mt-1">Instant AI verification</span>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/client"
                    className="w-full py-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 !text-white font-black text-sm uppercase tracking-wider transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 font-heading"
                  >
                    <span>Deploy Campaign with These Savings</span>
                    <ArrowRight className="w-4 h-4 !text-white" />
                  </Link>
                </motion.div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 9. MISSION-CRITICAL ARCHITECTURE & SECURITY */}
      <ScrollReveal variant="fadeUp">
        <EnterpriseArchitecture />
      </ScrollReveal>

      {/* 10. BRAND NARRATIVE */}
      <section id="about" className="py-28 border-t border-slate-200 dark:border-slate-800/60 bg-transparent relative">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <ScrollReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-300 text-xs sm:text-sm font-bold mb-10">
              <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Our Mission & DNA
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="p-7 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all card-3d shadow-sm border-trace">
              <div className="text-indigo-600 dark:text-indigo-400 font-black text-base mb-2 flex items-center gap-2 font-heading">
                <MapPin className="w-5 h-5" /> 01. Ground-Truth Data
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Every audit is backed by hardware GPS geofence checks and tamper-proof EXIF camera logs.
              </p>
            </div>
            <div className="p-7 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all card-3d shadow-sm border-trace">
              <div className="text-cyan-600 dark:text-cyan-400 font-black text-base mb-2 flex items-center gap-2 font-heading">
                <Cpu className="w-5 h-5" /> 02. Instant AI Vision
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Computer vision automatically detects shelf facings, price tags, and voids in under 1.2 seconds.
              </p>
            </div>
            <div className="p-7 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all card-3d shadow-sm border-trace">
              <div className="text-emerald-600 dark:text-emerald-400 font-black text-base mb-2 flex items-center gap-2 font-heading">
                <ShieldCheck className="w-5 h-5" /> 03. Automated Escrow
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                High-quality submissions are rewarded instantly; fraud attempts are automatically quarantined.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer is now rendered globally via layout.tsx */}
    </div>
  );
}
