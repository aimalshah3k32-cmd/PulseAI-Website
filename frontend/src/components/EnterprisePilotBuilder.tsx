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
    { id: "fmcg", name: "FMCG & Packaged Goods", icon: "ðŸ›’", avgStores: 350, defaultRate: 26 },
    { id: "beauty", name: "Prestige Beauty & Luxury", icon: "âœ¨", avgStores: 120, defaultRate: 42 },
    { id: "tech", name: "Consumer Electronics", icon: "ðŸ“±", avgStores: 180, defaultRate: 38 },
    { id: "pharma", name: "Pharma & Supermarket OTC", icon: "ðŸ’Š", avgStores: 220, defaultRate: 29 },
    { id: "qsr", name: "QSR & Fast-Casual Chains", icon: "ðŸ”", avgStores: 400, defaultRate: 24 }
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
    <section id="pilot-builder" className="py-24 border-t border-slate-200 bg-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-sm border border-blue-200 bg-blue-50 text-blue-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Interactive RFP &amp; Pilot Configurator</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight">
            Design Your Custom <br />
            <span className="text-blue-600">
              Enterprise Field Pilot
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Select your industry, store footprint, and automated AI gates to generate an instant executive proposal with guaranteed SLA metrics.
          </p>
        </div>

        {/* 2-Column Interactive Configurator Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Parameter Sliders & Selections (7 cols) */}
          <div className="lg:col-span-7 space-y-8 rounded-md border border-slate-200 bg-white p-6 sm:p-9 shadow-sm">
            
            {/* 1. Industry Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                Step 01 â€¢ Select Your Sector
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {industries.map((ind) => {
                  const isSelected = selectedIndustry.id === ind.id;
                  return (
                    <button
                      key={ind.id}
                      onClick={() => setSelectedIndustry(ind)}
                      className={`p-3.5 rounded-md border text-left transition-colors flex items-center gap-3 ${
                        isSelected
                          ? "border-blue-600 bg-blue-50 text-blue-900"
                          : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <span className="text-xl">{ind.icon}</span>
                      <div>
                        <div className="font-bold text-xs sm:text-sm leading-snug">{ind.name}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Store Count Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Step 02 â€¢ Target Store Footprint
                </label>
                <div className="font-mono font-bold text-xl text-blue-600">
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
                className="w-full h-2.5 bg-slate-200 rounded-md appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1.5">
                <span>20 Stores (Pilot)</span>
                <span>250 Stores (Regional)</span>
                <span>1,000 Stores (Enterprise Multi-Country)</span>
              </div>
            </div>

            {/* 3. Audit Cadence */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                Step 03 â€¢ Audit Cadence &amp; Frequency
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
                    className={`p-3.5 rounded-md border text-center transition-colors relative overflow-hidden ${
                      frequency === cad.value
                        ? "border-blue-600 bg-blue-50 text-slate-900"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {cad.badge && (
                      <span className="absolute top-1 right-2 text-[8px] font-mono font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded-sm">
                        {cad.badge}
                      </span>
                    )}
                    <div className="font-bold text-xs sm:text-sm">{cad.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{cad.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Automated AI Validation Gates (Add-ons) */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                Step 04 â€¢ Autonomous AI Quality Gates Included
              </label>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {[
                  { id: "cv_facings", title: "YOLOv8 Shelf Facing & OOS Detection", desc: "Sub-second product facing count & void alerts" },
                  { id: "gps_geofence", title: "Hardware Geofence Anti-Spoofing", desc: "Â±1.8m coordinate gate with EXIF timestamp lock" },
                  { id: "price_ocr", title: "Competitor Price Tag OCR Extraction", desc: "Automated shelf tag reading vs promo compliance" },
                  { id: "instant_escrow", title: "Autonomous Smart Escrow Settlement", desc: "Instant automated micro-payments upon AI QC pass" },
                ].map((gate) => {
                  const isChecked = selectedAddons.includes(gate.id);
                  return (
                    <div
                      key={gate.id}
                      onClick={() => toggleAddon(gate.id)}
                      className={`p-3.5 rounded-md border cursor-pointer transition-colors flex items-start gap-3 ${
                        isChecked 
                          ? "border-emerald-500 bg-emerald-50" 
                          : "border-slate-200 bg-white opacity-70 hover:opacity-100"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-sm flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isChecked ? "bg-emerald-600 text-white" : "border border-slate-300"
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900 leading-tight">
                          {gate.title}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
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
            
            <div className="p-7 sm:p-8 rounded-md border border-blue-200 bg-blue-50 relative overflow-hidden">
              
              {/* Proposal Header */}
              <div className="flex items-center justify-between pb-6 border-b border-blue-200">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 font-bold">
                    Executive Proposal Preview
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mt-0.5">
                    {selectedIndustry.name} Pilot
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-700 font-bold">
                    SLA 99.2% GRADE
                  </span>
                  <div className="text-xs font-mono text-blue-400 mt-1">CODE: PULSE-{selectedIndustry.id.toUpperCase()}</div>
                </div>
              </div>

              {/* Monthly Audits & SLA Guarantee */}
              <div className="grid grid-cols-2 gap-3 my-6">
                <div className="p-4 rounded-md bg-white border border-blue-100">
                  <span className="text-[11px] text-slate-500 block font-semibold">Monthly Field Audits</span>
                  <span className="font-mono font-bold text-2xl text-blue-900 block mt-0.5">
                    {totalMonthlyAudits.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400">across {storeCount} stores</span>
                </div>

                <div className="p-4 rounded-md bg-white border border-blue-100">
                  <span className="text-[11px] text-slate-500 block font-semibold">Deployment Lead Time</span>
                  <span className="font-mono font-bold text-2xl text-emerald-600 block mt-0.5">
                    &lt; 48 Hours
                  </span>
                  <span className="text-[10px] text-slate-400">worldwide dispatch</span>
                </div>
              </div>

              {/* Financial Comparison: Legacy Agency vs PulseAI */}
              <div className="p-5 rounded-md bg-white border border-slate-200 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Traditional Agency Quote:</span>
                  <span className="line-through text-rose-500 font-mono font-bold">
                    ${Math.round(monthlyLegacyCost).toLocaleString()} /mo
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-900">PulseAI Enterprise Rate:</span>
                  <span className="text-2xl font-mono font-bold text-blue-600">
                    ${Math.round(monthlyPulseCost).toLocaleString()}{" "}
                    <span className="text-xs text-slate-400 font-normal">/mo</span>
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4 text-emerald-500" />
                    Monthly Budget Saved:
                  </span>
                  <span className="font-mono font-bold text-emerald-600 text-sm">
                    -${Math.round(monthlySavings).toLocaleString()} ({savingsPct}% SAVED)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mt-6">
                <button
                  onClick={handleLaunchStudio}
                  className="w-full py-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Launch This Blueprint in Studio</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setShowConfirmationModal(true)}
                  className="w-full py-3.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-blue-600" />
                  <span>Download Executive PDF Blueprint</span>
                </button>
              </div>

              <div className="mt-4 text-center">
                <span className="text-[10px] text-slate-500 font-semibold">
                  Zero setup fees â€¢ 30-day pilot guarantee â€¢ Dedicated enterprise solutions architect
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* MODAL: Request Executive Proposal / Download Blueprint */}
      <AnimatePresence>
        {showConfirmationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-md p-6 sm:p-8 max-w-md w-full shadow-lg relative"
            >
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                âœ•
              </button>

              {submittedSuccess ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900">
                    Blueprint Dispatched!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2">
                    Your custom {selectedIndustry.name} RFP Pilot Blueprint and contract terms have been generated and sent.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="w-12 h-12 rounded-md bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900">
                    Request Executive RFP Blueprint
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 mb-5">
                    Receive the full {selectedIndustry.name} deployment proposal with custom pricing, SLA commitments, and API integration specifications.
                  </p>

                  <form onSubmit={handleRequestProposal} className="space-y-4">
                    <div>
                      <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                        Corporate Work Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="vp.retail@enterprise.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
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


