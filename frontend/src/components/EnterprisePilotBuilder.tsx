"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sliders, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  ShieldCheck, 
  Clock, 
  FileText, 
  Sparkles, 
  Zap, 
  Download, 
  Check, 
  HelpCircle,
  TrendingDown,
  Layers,
  MapPin
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function EnterprisePilotBuilder() {
  const router = useRouter();

  const industries = [
    { id: "fmcg", name: "FMCG & Packaged Goods", icon: "🛒", avgStores: 350, defaultRate: 26 },
    { id: "beauty", name: "Prestige Beauty & Luxury", icon: "✨", avgStores: 120, defaultRate: 42 },
    { id: "tech", name: "Consumer Electronics", icon: "📱", avgStores: 180, defaultRate: 38 },
    { id: "pharma", name: "Pharma & Supermarket OTC", icon: "💊", avgStores: 220, defaultRate: 29 },
    { id: "qsr", name: "QSR & Fast-Casual Chains", icon: "🍔", avgStores: 400, defaultRate: 24 }
  ];

  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);
  const [storeCount, setStoreCount] = useState<number>(150);
  const [frequency, setFrequency] = useState<number>(2); // 1 = monthly, 2 = bi-weekly, 4 = weekly
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    "cv_facings",
    "gps_geofence",
    "price_ocr",
    "instant_escrow"
  ]);

  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [contactEmail, setContactEmail] = useState<string>("");
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Calculations
  const totalMonthlyAudits = storeCount * frequency;
  const pulseCostPerAudit = selectedIndustry.defaultRate;
  const legacyAgencyRate = pulseCostPerAudit * 3.4; // 3.4x legacy agency markup
  
  const monthlyPulseCost = totalMonthlyAudits * pulseCostPerAudit;
  const monthlyLegacyCost = totalMonthlyAudits * legacyAgencyRate;
  const monthlySavings = monthlyLegacyCost - monthlyPulseCost;
  const savingsPct = Math.round((monthlySavings / monthlyLegacyCost) * 100);

  const handleLaunchStudio = () => {
    router.push(`/client?industry=${selectedIndustry.id}&stores=${storeCount}&freq=${frequency}`);
  };

  const handleRequestProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail) return;
    setSubmittedSuccess(true);
    setTimeout(() => {
      setShowConfirmationModal(false);
      setSubmittedSuccess(false);
      setContactEmail("");
    }, 2800);
  };

  return (
    <section id="pilot-builder" className="py-28 border-t border-slate-200 dark:border-slate-800/60 bg-transparent relative overflow-hidden">
      
      {/* Ambient background orbs */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Interactive RFP &amp; Pilot Configurator</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            Design Your Custom <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400">
              Enterprise Field Pilot
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            Select your industry, store footprint, and automated AI gates to generate an instant executive proposal with guaranteed SLA metrics.
          </p>
        </div>

        {/* 2-Column Interactive Configurator Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Parameter Sliders & Selections (7 cols) */}
          <div className="lg:col-span-7 space-y-8 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/60 backdrop-blur-xl p-6 sm:p-9 shadow-xl">
            
            {/* 1. Industry Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3 font-heading">
                Step 01 • Select Your Sector
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {industries.map((ind) => {
                  const isSelected = selectedIndustry.id === ind.id;
                  return (
                    <button
                      key={ind.id}
                      onClick={() => setSelectedIndustry(ind)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 shadow-md ring-2 ring-indigo-500/20"
                          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-slate-300 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <span className="text-xl">{ind.icon}</span>
                      <div>
                        <div className="font-heading font-bold text-xs sm:text-sm leading-snug">{ind.name}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Store Count Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-heading">
                  Step 02 • Target Store Footprint
                </label>
                <div className="font-mono font-black text-xl text-indigo-600 dark:text-indigo-400">
                  {storeCount.toLocaleString()} Locations
                </div>
              </div>
              <input
                type="range"
                min="20"
                max="1000"
                step="10"
                value={storeCount}
                onChange={(e) => setStoreCount(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1.5">
                <span>20 Stores (Pilot)</span>
                <span>250 Stores (Regional)</span>
                <span>1,000 Stores (Enterprise Multi-Country)</span>
              </div>
            </div>

            {/* 3. Audit Cadence */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3 font-heading">
                Step 03 • Audit Cadence &amp; Frequency
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 1, label: "Monthly Baseline", sub: "1 audit / store / mo" },
                  { value: 2, label: "Bi-Weekly Pulse", sub: "2 audits / store / mo", badge: "RECOMMENDED" },
                  { value: 4, label: "Weekly Continuous", sub: "4 audits / store / mo" }
                ].map((cad) => (
                  <button
                    key={cad.value}
                    onClick={() => setFrequency(cad.value)}
                    className={`p-3.5 rounded-2xl border text-center transition-all relative overflow-hidden ${
                      frequency === cad.value
                        ? "border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/40 text-slate-900 dark:text-white shadow-md ring-2 ring-indigo-500/20"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    {cad.badge && (
                      <span className="absolute top-1 right-2 text-[8px] font-mono font-black bg-indigo-600 text-white px-1.5 py-0.2 rounded-full">
                        {cad.badge}
                      </span>
                    )}
                    <div className="font-heading font-black text-xs sm:text-sm">{cad.label}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{cad.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Automated AI Validation Gates (Add-ons) */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3 font-heading">
                Step 04 • Autonomous AI Quality Gates Included
              </label>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {[
                  { id: "cv_facings", title: "YOLOv8 Shelf Facing & OOS Detection", desc: "Sub-second product facing count & void alerts" },
                  { id: "gps_geofence", title: "Hardware Geofence Anti-Spoofing", desc: "±1.8m coordinate gate with EXIF timestamp lock" },
                  { id: "price_ocr", title: "Competitor Price Tag OCR Extraction", desc: "Automated shelf tag reading vs promo compliance" },
                  { id: "instant_escrow", title: "Autonomous Smart Escrow Settlement", desc: "Instant automated micro-payments upon AI QC pass" },
                ].map((gate) => {
                  const isChecked = selectedAddons.includes(gate.id);
                  return (
                    <div
                      key={gate.id}
                      onClick={() => toggleAddon(gate.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isChecked 
                          ? "border-emerald-500/40 bg-emerald-50/40 dark:bg-emerald-950/20" 
                          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 opacity-60"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isChecked ? "bg-emerald-600 text-white" : "border border-slate-300 dark:border-slate-600"
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="font-heading font-bold text-xs text-slate-900 dark:text-white leading-tight">
                          {gate.title}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {gate.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Live Executive Proposal Blueprint Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-7 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-slate-900/90 dark:via-indigo-950/20 dark:to-slate-900/90 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              
              {/* Proposal Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">
                    Executive Proposal Preview
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                    {selectedIndustry.name} Pilot
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold">
                    SLA 99.2% GRADE
                  </span>
                  <div className="text-xs font-mono text-slate-400 mt-1">CODE: PULSE-{selectedIndustry.id.toUpperCase()}</div>
                </div>
              </div>

              {/* Monthly Audits & SLA Guarantee */}
              <div className="grid grid-cols-2 gap-3 my-6">
                <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Monthly Field Audits</span>
                  <span className="font-mono font-black text-2xl text-slate-900 dark:text-white block mt-0.5">
                    {totalMonthlyAudits.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400">across {storeCount} stores</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Deployment Lead Time</span>
                  <span className="font-mono font-black text-2xl text-emerald-600 dark:text-emerald-400 block mt-0.5">
                    &lt; 48 Hours
                  </span>
                  <span className="text-[10px] text-slate-400">worldwide dispatch</span>
                </div>
              </div>

              {/* Financial Comparison: Legacy Agency vs PulseAI */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 shadow-inner">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Traditional Agency Quote:</span>
                  <span className="line-through text-rose-400 font-mono font-bold">
                    ${Math.round(monthlyLegacyCost).toLocaleString()} /mo
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-white font-heading">PulseAI Enterprise Rate:</span>
                  <span className="text-2xl font-mono font-black text-emerald-400">
                    ${Math.round(monthlyPulseCost).toLocaleString()}{" "}
                    <span className="text-xs text-slate-400 font-normal">/mo</span>
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4 text-emerald-400" />
                    Monthly Budget Saved:
                  </span>
                  <span className="font-mono font-black text-emerald-400 text-sm">
                    -${Math.round(monthlySavings).toLocaleString()} ({savingsPct}% SAVED)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mt-6">
                <button
                  onClick={handleLaunchStudio}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 !text-white font-heading font-black text-sm uppercase tracking-wider transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Launch This Blueprint in Studio</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>

                <button
                  onClick={() => setShowConfirmationModal(true)}
                  className="w-full py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Download className="w-4 h-4 text-indigo-500" />
                  <span>Download Executive PDF Blueprint</span>
                </button>
              </div>

              <div className="mt-4 text-center">
                <span className="text-[10px] text-slate-400 font-medium">
                  Zero setup fees • 30-day pilot guarantee • Dedicated enterprise solutions architect
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* MODAL: Request Executive Proposal / Download Blueprint */}
      <AnimatePresence>
        {showConfirmationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-lg"
              >
                ✕
              </button>

              {submittedSuccess ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white">
                    Blueprint Dispatched!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
                    Your custom {selectedIndustry.name} RFP Pilot Blueprint and contract terms have been generated and sent.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white">
                    Request Executive RFP Blueprint
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
                    Receive the full {selectedIndustry.name} deployment proposal with custom pricing, SLA commitments, and API integration specifications.
                  </p>

                  <form onSubmit={handleRequestProposal} className="space-y-4">
                    <div>
                      <label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 block mb-1">
                        Corporate Work Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="vp.retail@enterprise.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 !text-white font-heading font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/30"
                    >
                      Instant Blueprint Access
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
