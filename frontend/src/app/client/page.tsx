"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  Sparkles, 
  MapPin, 
  Mic, 
  MicOff, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  Layers, 
  Globe2, 
  ChevronRight,
  TrendingUp,
  AlertCircle,
  FileCheck,
  RefreshCw,
  Plus
} from "lucide-react";
import { INITIAL_PROJECTS, ProjectItem } from "@/lib/api";

export default function ClientStudio() {
  const [activeTab, setActiveTab] = useState<"builder" | "map" | "analytics">("builder");
  const [briefInput, setBriefInput] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [parsedResult, setParsedResult] = useState<any>(null);
  const [deployedSuccess, setDeployedSuccess] = useState<boolean>(false);

  const sampleBriefs = [
    {
      title: "Luxury Perfume Boutique CX Benchmark",
      text: "Conduct high-end mystery shopping audits across 12 boutique fragrance counters in Dubai and London. Evaluator must ask for oud-based recommendations, time the greeting latency (target under 45s), record 30-second audio of the sales consultation, and upload the printed receipt with price OCR validation. Pay $45 per validated visit."
    },
    {
      title: "Global Beverage Cooler & Planogram Compliance",
      text: "Audit 35 supermarket cooler displays across New York, Paris, and Tokyo for Tier-1 Cold Beverage brands. Shoppers must take a wide-angle cooler shelf photo to detect eye-level planogram share (target 40%), identify out-of-stock voids, and verify promotional price tag matches $2.99. Offer $28 payout per store."
    },
    {
      title: "Automotive Showroom Electric Fleet Readiness",
      text: "Send mystery evaluators to 18 EV auto dealership showrooms in Frankfurt, Munich, and Milan. Inquire about DC Fast Charging installation support and battery warranty terms. Record sentiment score and upload showroom entrance photo. Budget $65 per dealership."
    }
  ];

  const toggleVoiceRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate live speech recognition typing
      setTimeout(() => {
        setBriefInput("Audit 25 high-traffic electronics retail stores in Berlin and Amsterdam for new flagship smartphone display stands. Verify security tether is functional, product screen demo mode is looping, and take high-resolution shelf photo. Pay $35 USD per audit.");
        setIsRecording(false);
      }, 3500);
    } else {
      setIsRecording(false);
    }
  };

  const handleParseBrief = (customText?: string) => {
    const textToParse = customText || briefInput;
    if (!textToParse.trim()) return;

    setIsParsing(true);
    setTimeout(() => {
      setIsParsing(false);
      setParsedResult({
        suggested_title: textToParse.includes("Fragrance") || textToParse.includes("Perfume") 
          ? "Luxury Perfume Boutique CX & Sales Pitch Benchmark" 
          : textToParse.includes("Beverage") || textToParse.includes("Cooler") 
          ? "Global Beverage Cooler Shelf Share & Planogram Audit"
          : "Retail Display & Customer Journey Field Evaluation",
        project_type: textToParse.includes("mystery") || textToParse.includes("Fragrance") ? "mystery_shopping" : "retail_audit",
        recommended_payout: textToParse.includes("45") ? 45.0 : textToParse.includes("65") ? 65.0 : 32.0,
        estimated_budget: textToParse.includes("45") ? 540.0 : textToParse.includes("65") ? 1170.0 : 1120.0,
        ai_rationale: "Optimized for high evaluator response time with hardware-locked GPS verification and sub-second CV compliance.",
        extracted_locations: [
          { store_name: "Harrods Knightsbridge", city: "London", country: "UK", lat: 51.4994, lng: -0.1632, geofence_radius_meters: 150 },
          { store_name: "Dubai Mall Ground Atrium", city: "Dubai", country: "UAE", lat: 25.1972, lng: 55.2744, geofence_radius_meters: 180 },
          { store_name: "Galeries Lafayette Haussmann", city: "Paris", country: "France", lat: 48.8738, lng: 2.3320, geofence_radius_meters: 150 },
          { store_name: "Fifth Avenue Flagship", city: "New York", country: "USA", lat: 40.7614, lng: -73.9776, geofence_radius_meters: 160 },
        ],
        generated_questions: [
          { id: "q1", title: "Capture Wide-Angle Shelf / Counter Photo", type: "photo_cv", required: true },
          { id: "q2", title: "Sales Associate Greeting & Consultation Latency (Seconds)", type: "number", required: true },
          { id: "q3", title: "Target SKU Shelf Stock Status", type: "single_choice", options: ["Fully Stocked", "1-2 Facings Low", "Out-of-Stock (Void Alert)"], required: true },
          { id: "q4", title: "Upload Printed Purchase Receipt for OCR Verification", type: "receipt_ocr", required: true },
          { id: "q5", title: "Record 30-Second Voice Impression Diary", type: "audio_voice", required: false }
        ]
      });
    }, 1400);
  };

  const handleDeployProject = () => {
    setDeployedSuccess(true);
    setTimeout(() => {
      setDeployedSuccess(false);
      setActiveTab("map");
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-transparent pb-20 font-sans">
      
      {/* Top Banner Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase font-heading tracking-wider">
                Enterprise Client Studio
              </div>
              <span className="text-slate-500 text-xs font-medium">• Campaign Orchestration & Field Radar</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading mt-1">
              AI Campaign Command & Brief Studio
            </h1>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 rounded-2xl shadow-inner">
            <button
              onClick={() => setActiveTab("builder")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "builder" ? "bg-indigo-600 !text-white shadow-md shadow-indigo-600/30" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Brief Parser</span>
            </button>
            <button
              onClick={() => setActiveTab("map")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "map" ? "bg-indigo-600 !text-white shadow-md shadow-indigo-600/30" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Live Store Map</span>
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "analytics" ? "bg-indigo-600 !text-white shadow-md shadow-indigo-600/30" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Executive AI Reports</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        
        {/* TAB 1: AI NATURAL LANGUAGE BRIEF BUILDER */}
        {activeTab === "builder" && (
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Input Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-sm shadow-xl dark:shadow-none">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-heading">Natural Language & Voice Brief</h2>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">AI Model: Pulse-NLP-v2</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
                  Type your raw business instructions or dictate with voice. The AI engine will extract target locations, recommended payouts, quotas, and build validation questionnaires.
                </p>

                {/* Textarea */}
                <div className="relative">
                  <textarea
                    rows={5}
                    value={briefInput}
                    onChange={(e) => setBriefInput(e.target.value)}
                    placeholder="e.g. Audit 50 supermarket locations in New York, London, and Paris for infant formula stock, shelf tag prices, and promotional banners..."
                    className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none shadow-sm"
                  />
                  {isRecording && (
                    <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-500/20 border border-rose-300 dark:border-rose-500/40 text-rose-700 dark:text-rose-400 text-xs animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> Recording Voice...
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={toggleVoiceRecording}
                    className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all ${
                      isRecording 
                        ? "bg-rose-600 !text-white border-rose-500 shadow-lg shadow-rose-600/30" 
                        : "bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                    <span>{isRecording ? "Stop Dictation" : "Voice Dictate"}</span>
                  </button>

                  <button
                    onClick={() => handleParseBrief()}
                    disabled={isParsing || !briefInput.trim()}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 !text-white text-xs font-black transition-all shadow-xl shadow-indigo-600/25 flex items-center gap-2 disabled:opacity-50 font-heading"
                  >
                    {isParsing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Synthesizing Schema...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 !text-white" />
                        <span>Parse Brief with AI</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Pre-made template quick chips */}
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2.5 font-heading">
                    Or Try Sample Enterprise Briefs:
                  </span>
                  <div className="space-y-2">
                    {sampleBriefs.map((sample, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setBriefInput(sample.text);
                          handleParseBrief(sample.text);
                        }}
                        className="w-full text-left p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 hover:border-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between group shadow-sm"
                      >
                        <span className="font-bold text-slate-900 dark:text-slate-200">{sample.title}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Output Column (Parsed Schema & Preview) */}
            <div className="lg:col-span-6 space-y-6">
              {parsedResult ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 sm:p-8 rounded-3xl border border-indigo-200 dark:border-indigo-500/30 bg-white dark:bg-slate-900/60 backdrop-blur-md relative overflow-hidden shadow-xl dark:shadow-none"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm font-black text-slate-900 dark:text-white font-heading">AI Schema Synthesized Successfully</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold">
                      Ready to Deploy
                    </span>
                  </div>

                  {/* Title & Stats */}
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 font-heading">{parsedResult.suggested_title}</h3>
                  <p className="text-xs text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/20 p-3.5 rounded-2xl mb-6 shadow-sm">
                    🤖 {parsedResult.ai_rationale}
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Type</span>
                      <span className="text-xs font-black text-cyan-600 dark:text-cyan-400 uppercase">{parsedResult.project_type.replace("_", " ")}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Payout / Audit</span>
                      <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">${parsedResult.recommended_payout}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Branches</span>
                      <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 font-mono">{parsedResult.extracted_locations.length} Stores</span>
                    </div>
                  </div>

                  {/* Extracted Locations */}
                  <div className="mb-6">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider block mb-2 font-heading">
                      Extracted Branch Coordinates & Geofences:
                    </span>
                    <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                      {parsedResult.extracted_locations.map((loc: any, i: number) => (
                        <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs shadow-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                            <span className="font-bold text-slate-800 dark:text-slate-200">{loc.store_name}</span>
                          </div>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">{loc.city}, {loc.country} ({loc.geofence_radius_meters}m)</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Generated Questionnaire */}
                  <div className="mb-6">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider block mb-2 font-heading">
                      Generated Multi-Modal Questionnaire:
                    </span>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {parsedResult.generated_questions.map((q: any, i: number) => (
                        <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-xs shadow-sm">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-indigo-700 dark:text-indigo-300">Q{i + 1}: {q.title}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase font-mono font-bold">{q.type}</span>
                          </div>
                          {q.options && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {q.options.map((opt: string, optIdx: number) => (
                                <span key={optIdx} className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                                  {opt}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deploy Button */}
                  <button
                    onClick={handleDeployProject}
                    disabled={deployedSuccess}
                    className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl font-heading ${
                      deployedSuccess
                        ? "bg-emerald-600 !text-white shadow-emerald-600/30"
                        : "bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 !text-white shadow-indigo-600/30"
                    }`}
                  >
                    {deployedSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 !text-white" />
                        <span>Campaign Live on Global Shopper Radar!</span>
                      </>
                    ) : (
                      <>
                        <Globe2 className="w-4 h-4 !text-white" />
                        <span>Deploy Campaign to Global Radar (${parsedResult.estimated_budget} Total Escrow)</span>
                      </>
                    )}
                  </button>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-12 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 text-center text-slate-400 dark:text-slate-500 bg-white/40 dark:bg-slate-900/20">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-black text-slate-900 dark:text-slate-300 text-base mb-1">AI Schema Generator Idle</h3>
                  <p className="text-xs text-slate-500 max-w-sm">Enter raw text on the left or select a sample brief to watch the schema, geofence, and questionnaire automatically generate.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: LIVE STORE GEOFENCE MAP RADAR */}
        {activeTab === "map" && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 backdrop-blur-md shadow-xl dark:shadow-none">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading">
                    Active Global Auditing Radar & Geofence Clusters
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Real-time hardware geofences dispatched across 50+ international metropolitan markets.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1.5 rounded-xl w-fit">
                  RADAR ACTIVE: 40,000+ AUDITORS ONLINE
                </span>
              </div>

              {/* Grid of Global Active Pins */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { store: "Harrods Knightsbridge", city: "London, UK", evaluators: "6,200", response: "12m", status: "Active", progress: 94 },
                  { store: "Dubai Mall Flagship", city: "Dubai, UAE", evaluators: "3,840", response: "18m", status: "Active", progress: 88 },
                  { store: "Galeries Lafayette", city: "Paris, France", evaluators: "4,120", response: "24m", status: "Active", progress: 76 },
                  { store: "Fifth Avenue Retail", city: "New York, USA", evaluators: "8,950", response: "9m", status: "Active", progress: 98 },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm card-3d">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900 dark:text-white font-heading">{item.store}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                        {item.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>{item.city}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex justify-between text-xs font-mono">
                      <span className="text-slate-600 dark:text-slate-400">{item.evaluators} Shoppers</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">{item.response} Dispatch</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EXECUTIVE AI REPORTS */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-none card-3d">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-heading">Planogram Compliance Index</span>
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-2">94.8%</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">+6.4% improvement vs previous quarter</p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-none card-3d">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-heading">Average Audit Turnaround</span>
                <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono mt-2">1.18s</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Autonomous CV verification latency</p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-none card-3d">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-heading">Net Escalation / Fraud Rate</span>
                <div className="text-3xl font-black text-rose-600 dark:text-rose-400 font-mono mt-2">2.1%</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Quarantined by hardware geofence check</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
