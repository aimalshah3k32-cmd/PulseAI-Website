"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileCode, 
  Radar, 
  Scan, 
  Coins, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Pause, 
  RotateCcw,
  Sparkles,
  ShieldCheck,
  MapPin,
  Cpu,
  Clock,
  Layers,
  Check,
  AlertCircle,
  TrendingUp,
  Zap,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

interface ProcessStep {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ReactNode;
  duration: string;
  summary: string;
  highlights: string[];
  metrics: { label: string; value: string; color: string }[];
}

export function ProcessWorkflow() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  // Interactive Checklist State (Process SOP Runner)
  const [checklist, setChecklist] = useState([
    { id: 1, title: "Hardware Geofence GPS Handshake", step: 1, completed: true, detail: "Â±2.4m coordinate lock confirmed" },
    { id: 2, title: "EXIF Timestamp & Gyroscope Anti-Spoofing", step: 1, completed: true, detail: "Tamper-proof hardware signature verified" },
    { id: 3, title: "High-Res Planogram Panorama Ingestion", step: 2, completed: true, detail: "4K ultra-wide aisle image processed" },
    { id: 4, title: "YOLOv8 Edge Object Detection & Facings", step: 2, completed: true, detail: "18 facings identified in 840ms" },
    { id: 5, title: "Competitor Price Tag OCR Extraction", step: 3, completed: false, detail: "Shelf tag read: $4.99 vs Promo $3.99" },
    { id: 6, title: "Instant Escrow Smart Payout Dispatch", step: 3, completed: false, detail: "Automated $45 release upon 90%+ QC" },
  ]);

  const toggleChecklistItem = (id: number) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = checklist.filter(c => c.completed).length;
  const auditScore = Math.round((completedCount / checklist.length) * 100);

  const steps: ProcessStep[] = [
    {
      id: 0,
      title: "AI Brief & Planogram Setup",
      subtitle: "Autonomous Rule Generation",
      badge: "Stage 01 â€¢ Ingestion",
      icon: <FileCode className="w-5 h-5" />,
      duration: "< 3.5 Seconds",
      summary: "Upload your raw PDF guidelines, Excel planograms, or plain text instructions. Our multi-modal LLM parser converts enterprise briefs into hardware-enforced audit checklists and computer vision target weights.",
      highlights: [
        "Instant parsing of messy PDFs, images, and Excel spreadsheets",
        "Automated extraction of SKU facings, price limits, and void rules",
        "Auto-calibrated geofence coordinates and store roster mapping",
        "Configurable SLA criteria and instant escrow fund reservation"
      ],
      metrics: [
        { label: "Brief Parsing Time", value: "3.2s", color: "text-blue-600 dark:text-blue-400" },
        { label: "Rule Accuracy", value: "99.8%", color: "text-emerald-600 dark:text-emerald-400" },
        { label: "Manual Hours Saved", value: "96%", color: "text-cyan-600 dark:text-cyan-400" }
      ]
    },
    {
      id: 1,
      title: "Geofenced Shopper Dispatch",
      subtitle: "Biometric KYC Field Mesh",
      badge: "Stage 02 â€¢ Mobilization",
      icon: <Radar className="w-5 h-5" />,
      duration: "12-18 Minutes",
      summary: "Our intelligent dispatch engine pings pre-vetted, KYC-verified field shoppers within a 1.5km radius of your target retail branches. Submissions are cryptographically locked behind hardware GPS geofence fences.",
      highlights: [
        "Sub-hour dispatch across 50+ global metropolitan hubs",
        "Strict anti-mock GPS detection and hardware-verified EXIF logs",
        "Live dispatch radar tracking active evaluators in real-time",
        "Biometric face-match authentication before entering the store"
      ],
      metrics: [
        { label: "Avg Dispatch Radius", value: "1.2 km", color: "text-blue-600 dark:text-blue-400" },
        { label: "Acceptance Rate", value: "94.6%", color: "text-emerald-600 dark:text-emerald-400" },
        { label: "GPS Accuracy Gate", value: "Â±3 Meters", color: "text-cyan-600 dark:text-cyan-400" }
      ]
    },
    {
      id: 2,
      title: "Edge AI Vision Inspection",
      subtitle: "Sub-Second CV Verification",
      badge: "Stage 03 â€¢ Inference",
      icon: <Scan className="w-5 h-5" />,
      duration: "840 Milliseconds",
      summary: "The moment a shopper snaps a shelf panorama, our fine-tuned YOLOv8 computer vision model analyzes shelf facings, eye-level share of shelf, promotional wobblers, and OCR pricing tags with sub-second latency.",
      highlights: [
        "Real-time bounding box detection for hundreds of SKUs simultaneously",
        "Instant Out-of-Stock (OOS) root-cause alerts sent to category managers",
        "OCR text extraction for shelf tag prices vs POS promotion compliance",
        "Automated quarantine of blurry, angled, or duplicate images"
      ],
      metrics: [
        { label: "Inference Latency", value: "840ms", color: "text-blue-600 dark:text-blue-400" },
        { label: "Detection Precision", value: "99.2%", color: "text-emerald-600 dark:text-emerald-400" },
        { label: "Fraud Rejection", value: "100%", color: "text-rose-600 dark:text-rose-400" }
      ]
    },
    {
      id: 3,
      title: "Escrow Payout & Live Analytics",
      subtitle: "Autonomous Smart Settlement",
      badge: "Stage 04 â€¢ Settlement",
      icon: <Coins className="w-5 h-5" />,
      duration: "Instant (< 5s)",
      summary: "Submissions passing the AI QC score threshold trigger instant automated escrow disbursement to the shopper's digital wallet. Executive dashboards update live with planogram compliance benchmarks and actionable store alerts.",
      highlights: [
        "Instant micro-escrow payout releases upon passing AI threshold",
        "Zero payment disputes: transparent AI scoring log provided to shoppers",
        "Real-time Planogram Compliance Index & Share of Shelf charting",
        "Direct export to Snowflake, PowerBI, BigQuery, or CSV"
      ],
      metrics: [
        { label: "Payout Latency", value: "< 5 Sec", color: "text-blue-600 dark:text-blue-400" },
        { label: "Shopper Retention", value: "92.4%", color: "text-emerald-600 dark:text-emerald-400" },
        { label: "Dispute Rate", value: "< 0.08%", color: "text-cyan-600 dark:text-cyan-400" }
      ]
    }
  ];

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((curr) => (curr + 1) % steps.length);
          return 0;
        }
        return prev + 2;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setProgress(0);
  };

  return (
    <section id="process" className="py-28 border-t border-slate-200 dark:border-slate-800/60 bg-transparent relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Zap className="w-4 h-4 text-blue-500 animate-pulse" />
            <span>Interactive Workflow Engine</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            How The Autonomous <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-orange-500 to-cyan-500 dark:from-blue-400 dark:via-orange-400 dark:to-cyan-400">
              Audit Process Works
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            From brief ingestion to instant smart escrow payout in under 60 minutes. Watch the live interactive pipeline in motion below.
          </p>

          {/* Controls Bar: Auto Play / Pause */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 transition-all shadow-sm"
              title={isPlaying ? "Pause auto-simulation" : "Resume auto-simulation"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pause Simulation</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Play Auto-Walkthrough</span>
                </>
              )}
            </button>
            
            <button
              onClick={() => { setActiveStep(0); setProgress(0); }}
              className="p-2 rounded-xl text-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-all shadow-sm"
              title="Restart from Step 1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4-Step Interactive Pipeline Stepper */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            const isCompleted = activeStep > idx;

            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(idx)}
                className={`relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                  isActive
                    ? "border-blue-500/80 bg-white dark:bg-slate-900/90 shadow-xl shadow-blue-500/10 scale-[1.02]"
                    : "border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900/70"
                }`}
              >
                {/* Active Step Top Accent Line */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-orange-500 to-cyan-400" />
                )}

                {/* Progress bar inside active step */}
                {isActive && isPlaying && (
                  <div 
                    className="absolute bottom-0 left-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                )}

                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm transition-all ${
                    isActive 
                      ? "bg-blue-600 !text-white shadow-md shadow-blue-600/30 scale-110" 
                      : isCompleted
                      ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : step.icon}
                  </div>

                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    isActive 
                      ? "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300"
                      : "text-slate-400 dark:text-slate-500"
                  }`}>
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className={`font-heading font-black text-sm sm:text-base transition-colors ${
                    isActive ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1 font-medium">
                    {step.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Stage Viewer */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Narrative, Bullets, Metrics */}
              <div className="lg:col-span-6 space-y-6">
                
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold uppercase px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
                    {steps[activeStep].badge}
                  </span>
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Turnaround: <strong className="text-slate-700 dark:text-slate-300">{steps[activeStep].duration}</strong>
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                    {steps[activeStep].summary}
                  </p>
                </div>

                {/* Key Highlights Checklist */}
                <div className="space-y-2.5 pt-2">
                  {steps[activeStep].highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Micro Metric Badges */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {steps[activeStep].metrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80">
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">{m.label}</div>
                      <div className={`font-mono font-black text-lg sm:text-xl mt-1 ${m.color}`}>{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Action CTA link */}
                <div className="pt-2 flex items-center gap-4">
                  <Link
                    href="/client"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 !text-white font-heading font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/25"
                  >
                    <span>Launch Campaign in Studio</span>
                    <ArrowRight className="w-4 h-4 !text-white" />
                  </Link>

                  <button
                    onClick={() => handleStepClick((activeStep + 1) % steps.length)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span>Next Stage</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Right Column: Live Animated Simulation View */}
              <div className="lg:col-span-6">
                
                {/* STEP 0: AI Brief Parser Simulation */}
                {activeStep === 0 && (
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-6 text-slate-300 font-mono text-xs shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                        <span className="text-[11px] text-slate-400 font-sans font-bold ml-2">Brief_Ingestion_Engine.py</span>
                      </div>
                      <span className="text-emerald-400 text-[10px] bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                        â— LIVE STREAMING
                      </span>
                    </div>

                    {/* Visual Planogram & Retail Guideline Ingestion Picture Viewfinder */}
                    <div className="relative aspect-video max-h-[190px] w-full rounded-xl bg-slate-900 overflow-hidden border border-slate-800 mb-4 group">
                      <img
                        src="https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=1000&q=80"
                        alt="AI Retail Planogram & Beverage Cooler Shelf Setup"
                        className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                      {/* Scanning Laser Beam */}
                      <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_20px_#818cf8] animate-scan-laser pointer-events-none z-20" />

                      {/* Document Ingestion Badge */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/90 border border-blue-500/50 text-[10px] text-blue-300 backdrop-blur-md z-10 shadow-lg">
                        <FileCode className="w-3.5 h-3.5 text-blue-400" />
                        <span className="font-bold">Campaign_Brief_Q3.pdf (100% Ingested)</span>
                      </div>

                      {/* OCR Confidence Badge */}
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-950/90 border border-emerald-500/50 text-[10px] text-emerald-300 font-mono backdrop-blur-md z-10 shadow-lg">
                        <Check className="w-3 h-3" />
                        <span>OCR 99.8%</span>
                      </div>

                      {/* Live Shelf Planogram Tag Overlays */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] z-10">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/90 border border-slate-700 text-slate-200 backdrop-blur-md shadow-md">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                          <span className="font-mono font-bold text-cyan-300">Planogram: 12 Cooler SKUs</span>
                        </div>
                        <div className="px-2.5 py-1 rounded-lg bg-blue-950/90 border border-blue-500/40 text-blue-200 font-mono font-bold backdrop-blur-md shadow-md">
                          Geofence: 150m Strict GPS Lock
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-slate-400">
                        <span className="text-blue-400 font-bold">$ pulseai parse</span> --source "Campaign_Brief_Q3.pdf" --extract-rules
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-1 text-slate-300">
                        <div className="text-cyan-400 font-bold">âœ“ Campaign Title Extracted:</div>
                        <div className="text-white">"Beverage Category Share-of-Shelf &amp; Cooler Audit"</div>
                        <div className="text-slate-400 mt-2">Target Locations: <span className="text-emerald-400 font-bold">350 Supermarkets</span></div>
                        <div className="text-slate-400">Geofence Radius: <span className="text-emerald-400 font-bold">150m strict GPS lock</span></div>
                        <div className="text-slate-400">Target SKUs: <span className="text-cyan-400 font-bold">12 Cold Beverages (Eye-Level 40%+)</span></div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="p-2.5 rounded-lg bg-blue-950/50 border border-blue-900/60 flex items-center justify-between">
                          <span className="text-blue-300">Escrow Reserved:</span>
                          <span className="text-white font-bold">$15,750 USD</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-emerald-950/50 border border-emerald-900/60 flex items-center justify-between">
                          <span className="text-emerald-300">Validation Gates:</span>
                          <span className="text-emerald-400 font-bold">6 Automated</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-slate-400 text-[11px] pt-1">
                        <Cpu className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: "5s" }} />
                        <span>Generating planogram embeddings &amp; dispatch beacons...</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 1: Shopper Radar Dispatch Simulation */}
                {activeStep === 1 && (
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-6 text-slate-300 font-mono text-xs shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-400 animate-bounce" />
                        <span className="text-[11px] text-white font-sans font-bold">Sub-Hour Radar Dispatch Active</span>
                      </div>
                      <span className="text-emerald-400 text-[10px] bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
                        4 SHOPS DISPATCHED
                      </span>
                    </div>

                    {/* Radar Screen Visual */}
                    <div className="relative aspect-video max-h-[250px] w-full rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center overflow-hidden">
                      {/* Satellite City Aerial Map Background */}
                      <img
                        src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
                        alt="City Dispatch Map"
                        className="absolute inset-0 w-full h-full object-cover opacity-25"
                      />
                      {/* Concentric Radar Rings */}
                      <div className="absolute w-48 h-48 rounded-full border border-blue-500/20" />
                      <div className="absolute w-32 h-32 rounded-full border border-blue-500/30" />
                      <div className="absolute w-16 h-16 rounded-full border border-blue-500/40" />
                      
                      {/* Crosshairs */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-full h-[1px] bg-blue-500/10" />
                        <div className="h-full w-[1px] bg-blue-500/10" />
                      </div>

                      {/* Rotating Radar Sweep */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-emerald-500/20 rounded-full animate-spin pointer-events-none" style={{ animationDuration: "3s" }} />

                      {/* Target Retail Store Center Pin */}
                      <div className="relative z-10 p-2 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/50 flex items-center justify-center">
                        <MapPin className="w-4 h-4" />
                      </div>

                      {/* Shopper Ping 1 */}
                      <div className="absolute top-[28%] left-[25%] flex items-center gap-1.5 z-10">
                        <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping absolute" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative" />
                        <span className="text-[9px] bg-slate-950/90 px-1.5 py-0.5 rounded border border-emerald-500/40 text-emerald-300 font-bold">
                          Shopper #419 (0.4km)
                        </span>
                      </div>

                      {/* Shopper Ping 2 */}
                      <div className="absolute bottom-[25%] right-[22%] flex items-center gap-1.5 z-10">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="text-[9px] bg-slate-950/90 px-1.5 py-0.5 rounded border border-emerald-500/40 text-emerald-300 font-bold">
                          Shopper #782 (0.9km)
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Hardware GPS Accuracy:</span>
                      <span className="text-emerald-400 font-bold">Â±1.8m (Exif Anti-Spoof Locked)</span>
                    </div>
                  </div>
                )}

                {/* STEP 2: Computer Vision Inference Simulation */}
                {activeStep === 2 && (
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-6 text-slate-300 font-mono text-xs shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                      <div className="flex items-center gap-2">
                        <Scan className="w-4 h-4 text-cyan-400 animate-pulse" />
                        <span className="text-[11px] text-white font-sans font-bold">YOLOv8 Edge Vision Pipeline</span>
                      </div>
                      <span className="text-cyan-400 text-[10px] bg-cyan-950/80 border border-cyan-800 px-2 py-0.5 rounded font-mono">
                        LATENCY: 840ms
                      </span>
                    </div>

                    {/* Simulated Shelf Viewfinder */}
                    <div className="relative aspect-video max-h-[250px] w-full rounded-xl bg-slate-900 overflow-hidden border border-slate-800">
                      <img
                        src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80"
                        alt="Shelf Inspection"
                        className="w-full h-full object-cover opacity-80"
                      />

                      {/* Scanning Laser Beam */}
                      <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee] animate-scan-laser pointer-events-none z-20" />

                      {/* Bounding Box 1 */}
                      <div className="absolute top-[20%] left-[12%] w-[24%] h-[45%] border-2 border-emerald-400 bg-emerald-500/20 rounded-lg p-1.5 flex flex-col justify-between z-10 shadow-lg">
                        <span className="text-[9px] font-bold text-emerald-100 bg-emerald-950/90 px-1 py-0.5 rounded w-fit">
                          SKU-A: 99.1%
                        </span>
                        <span className="text-[8px] text-emerald-300 bg-slate-950/90 px-1 py-0.5 rounded self-end font-bold">
                          Facings: 6
                        </span>
                      </div>

                      {/* Bounding Box 2: Out of Stock Alert */}
                      <div className="absolute top-[20%] right-[18%] w-[22%] h-[45%] border-2 border-rose-500 bg-rose-500/20 rounded-lg p-1.5 flex flex-col justify-between z-10 shadow-lg">
                        <span className="text-[9px] font-bold text-rose-100 bg-rose-950/90 px-1 py-0.5 rounded w-fit flex items-center gap-1">
                          <AlertCircle className="w-2.5 h-2.5" /> OOS VOID!
                        </span>
                        <span className="text-[8px] text-rose-300 bg-slate-950/90 px-1 py-0.5 rounded self-end font-bold">
                          Facings: 0
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4 text-[10px]">
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
                        <span className="text-slate-400">Planogram Match:</span>
                        <span className="text-emerald-400 font-bold">94.8% (Target: 90%)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
                        <span className="text-slate-400">OCR Tag Price:</span>
                        <span className="text-white font-bold">$4.99 âœ“ Verified</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Automated Escrow Payout Simulation */}
                {activeStep === 3 && (
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-6 text-slate-300 font-mono text-xs shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-emerald-400 animate-bounce" />
                        <span className="text-[11px] text-white font-sans font-bold">Instant Smart Escrow Settlement</span>
                      </div>
                      <span className="text-emerald-400 text-[10px] bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                        SETTLED &lt; 4.2s
                      </span>
                    </div>

                    {/* Escrow Payment Receipt Card */}
                    <div className="p-5 rounded-xl bg-gradient-to-b from-emerald-950/40 to-slate-900 border border-emerald-500/30 text-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">Milestone Payment:</span>
                        <span className="text-xl font-bold font-mono text-emerald-400">+$45.00 USD</span>
                      </div>

                      <div className="space-y-1 text-[11px] text-slate-300 border-t border-slate-800 pt-3">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Recipient:</span>
                          <span className="text-white">Shopper #419 (Biometric Verified)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Audit Score:</span>
                          <span className="text-emerald-400 font-bold">96.4% (Tier-A Quality)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Settlement Protocol:</span>
                          <span className="text-blue-300">PulseAI Smart Escrow #TX-8921</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Funds disbursed instantly to evaluator wallet. Zero human dispute lag.</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Client Analytics Sync:</span>
                      <span className="text-cyan-400 font-bold">Snowflake &amp; PowerBI Live</span>
                    </div>
                  </div>
                )}

              </div>

            </motion.div>
          </AnimatePresence>

        </div>

        {/* INTERACTIVE PROCESS SOP CHECKLIST (Process Street Inspired) */}
        <div className="mt-14 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-heading font-black text-lg sm:text-xl text-slate-900 dark:text-white">
                  Interactive SOP &amp; Quality Check-Gate Runner
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Click any process checkpoint below to simulate automated AI validation passes in real time.
              </p>
            </div>

            {/* Score & Progress Badge */}
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shrink-0">
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400">Audit Confidence</div>
                <div className="text-base font-black font-mono text-emerald-600 dark:text-emerald-400">
                  {auditScore}% SLA GRADE
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs font-mono">
                {completedCount}/6
              </div>
            </div>
          </div>

          {/* Checklist Items Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-6">
            {checklist.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className={`text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 group cursor-pointer ${
                  item.completed
                    ? "border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  item.completed 
                    ? "bg-emerald-600 text-white scale-110 shadow-sm shadow-emerald-600/30" 
                    : "border border-slate-300 dark:border-slate-600 group-hover:border-blue-500"
                }`}>
                  {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div>
                  <span className={`text-xs sm:text-sm font-bold block transition-colors ${
                    item.completed ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"
                  }`}>
                    {item.title}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    {item.detail}
                  </span>
                </div>
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}


