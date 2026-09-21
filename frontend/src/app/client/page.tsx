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
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider">
                Enterprise Client Studio
              </div>
              <span className="text-slate-500 text-xs font-medium">â€¢ Campaign Orchestration & Field Radar</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-2">
              AI Campaign Command & Brief Studio
            </h1>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-1.5 rounded-md">
            <button
              onClick={() => setActiveTab("builder")}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-semibold transition-colors ${
                activeTab === "builder" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Brief Parser</span>
            </button>
            <button
              onClick={() => setActiveTab("map")}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-semibold transition-colors ${
                activeTab === "map" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Live Store Map</span>
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-semibold transition-colors ${
                activeTab === "analytics" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
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
              <div className="p-6 sm:p-8 rounded-md border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">Natural Language & Voice Brief</h2>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">AI Model: Pulse-NLP-v2</span>
                </div>

                <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                  Type your raw business instructions or dictate with voice. The AI engine will extract target locations, recommended payouts, quotas, and build validation questionnaires.
                </p>

                {/* Textarea */}
                <div className="relative">
                  <textarea
                    rows={5}
                    value={briefInput}
                    onChange={(e) => setBriefInput(e.target.value)}
                    placeholder="e.g. Audit 50 supermarket locations in New York, London, and Paris for infant formula stock, shelf tag prices, and promotional banners..."
                    className="w-full p-4 rounded-md bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
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
                    className={`px-4 py-2 rounded-md border text-sm font-semibold flex items-center gap-2 transition-colors ${
                      isRecording 
                        ? "bg-rose-600 text-white border-rose-600" 
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-blue-600" />}
                    <span>{isRecording ? "Stop Dictation" : "Voice Dictate"}</span>
                  </button>

                  <button
                    onClick={() => handleParseBrief()}
                    disabled={isParsing || !briefInput.trim()}
                    className="px-6 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
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
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3">
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
                        className="w-full text-left p-3 rounded-md bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-slate-100 transition-colors text-sm text-slate-700 flex items-center justify-between group"
                      >
                        <span className="font-semibold text-slate-900">{sample.title}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
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
                  className="p-6 sm:p-8 rounded-md border border-slate-200 bg-white relative overflow-hidden shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span className="text-base font-bold text-slate-900">AI Schema Synthesized Successfully</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold">
                      Ready to Deploy
                    </span>
                  </div>

                  {/* Title & Stats */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{parsedResult.suggested_title}</h3>
                  <p className="text-sm text-blue-900 bg-blue-50 border border-blue-100 p-4 rounded-md mb-6">
                    ðŸ¤– {parsedResult.ai_rationale}
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="p-3 rounded-md bg-slate-50 border border-slate-200 text-center">
                      <span className="text-xs text-slate-500 uppercase font-semibold block">Type</span>
                      <span className="text-sm font-bold text-blue-600 uppercase">{parsedResult.project_type.replace("_", " ")}</span>
                    </div>
                    <div className="p-3 rounded-md bg-slate-50 border border-slate-200 text-center">
                      <span className="text-xs text-slate-500 uppercase font-semibold block">Payout / Audit</span>
                      <span className="text-sm font-bold text-emerald-600 font-mono">${parsedResult.recommended_payout}</span>
                    </div>
                    <div className="p-3 rounded-md bg-slate-50 border border-slate-200 text-center">
                      <span className="text-xs text-slate-500 uppercase font-semibold block">Branches</span>
                      <span className="text-sm font-bold text-blue-600 font-mono">{parsedResult.extracted_locations.length} Stores</span>
                    </div>
                  </div>

                  {/* Extracted Locations */}
                  <div className="mb-6">
                    <span className="text-sm font-semibold text-slate-800 uppercase tracking-wider block mb-3">
                      Extracted Branch Coordinates & Geofences:
                    </span>
                    <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                      {parsedResult.extracted_locations.map((loc: any, i: number) => (
                        <div key={i} className="p-3 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span className="font-semibold text-slate-800">{loc.store_name}</span>
                          </div>
                          <span className="text-xs text-slate-500">{loc.city}, {loc.country} ({loc.geofence_radius_meters}m)</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Generated Questionnaire */}
                  <div className="mb-6">
                    <span className="text-sm font-semibold text-slate-800 uppercase tracking-wider block mb-3">
                      Generated Multi-Modal Questionnaire:
                    </span>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {parsedResult.generated_questions.map((q: any, i: number) => (
                        <div key={i} className="p-4 rounded-md bg-slate-50 border border-slate-200 text-sm">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-blue-700">Q{i + 1}: {q.title}</span>
                            <span className="text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-700 uppercase font-mono font-semibold">{q.type}</span>
                          </div>
                          {q.options && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {q.options.map((opt: string, optIdx: number) => (
                                <span key={optIdx} className="text-xs px-2 py-1 rounded bg-white border border-slate-200 text-slate-600 font-medium">
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
                    className={`w-full py-4 rounded-md font-bold text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                      deployedSuccess
                        ? "bg-emerald-600 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {deployedSuccess ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Campaign Live on Global Shopper Radar!</span>
                      </>
                    ) : (
                      <>
                        <Globe2 className="w-5 h-5" />
                        <span>Deploy Campaign to Global Radar (${parsedResult.estimated_budget} Total Escrow)</span>
                      </>
                    )}
                  </button>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-12 rounded-md border border-dashed border-slate-300 text-center text-slate-500 bg-slate-50">
                  <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">AI Schema Generator Idle</h3>
                  <p className="text-sm text-slate-600 max-w-sm">Enter raw text on the left or select a sample brief to watch the schema, geofence, and questionnaire automatically generate.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: LIVE STORE GEOFENCE MAP RADAR */}
        {activeTab === "map" && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-md border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Active Global Auditing Radar & Geofence Clusters
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Real-time hardware geofences dispatched across 50+ international metropolitan markets.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-md w-fit">
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
                  <div key={i} className="p-5 rounded-md bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">{item.store}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 font-mono font-bold">
                        {item.status}
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>{item.city}</span>
                    </div>
                    <div className="pt-3 border-t border-slate-200 flex justify-between text-xs font-mono">
                      <span className="text-slate-600">{item.evaluators} Shoppers</span>
                      <span className="text-blue-600 font-bold">{item.response} Dispatch</span>
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
              <div className="p-6 rounded-md bg-white border border-slate-200 shadow-sm">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block">Planogram Compliance Index</span>
                <div className="text-3xl font-bold text-emerald-600 font-mono mt-3">94.8%</div>
                <p className="text-sm text-slate-600 mt-2">+6.4% improvement vs previous quarter</p>
              </div>

              <div className="p-6 rounded-md bg-white border border-slate-200 shadow-sm">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block">Average Audit Turnaround</span>
                <div className="text-3xl font-bold text-blue-600 font-mono mt-3">1.18s</div>
                <p className="text-sm text-slate-600 mt-2">Autonomous CV verification latency</p>
              </div>

              <div className="p-6 rounded-md bg-white border border-slate-200 shadow-sm">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block">Net Escalation / Fraud Rate</span>
                <div className="text-3xl font-bold text-rose-600 font-mono mt-3">2.1%</div>
                <p className="text-sm text-slate-600 mt-2">Quarantined by hardware geofence check</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}


