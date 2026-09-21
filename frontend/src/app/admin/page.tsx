"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Eye, 
  RefreshCw, 
  Unlock, 
  Sliders, 
  MapPin, 
  Scan, 
  ShieldCheck, 
  Building2, 
  Clock, 
  Sparkles, 
  Search, 
  Filter, 
  Layers, 
  Volume2, 
  FileText, 
  Lock, 
  ChevronRight, 
  Maximize2, 
  Check, 
  Compass, 
  Cpu, 
  BadgeAlert,
  Activity,
  Zap,
  DollarSign,
  Radio
} from "lucide-react";
import { INITIAL_SUBMISSIONS, SubmissionItem } from "@/lib/api";

export default function AdminQCCommand() {
  const [submissions, setSubmissions] = useState<SubmissionItem[]>(INITIAL_SUBMISSIONS);
  const [selectedSub, setSelectedSub] = useState<SubmissionItem>(INITIAL_SUBMISSIONS[0]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [overrideScore, setOverrideScore] = useState<number>(selectedSub.overall_quality_score);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  
  // Inspection Canvas Layer toggles
  const [activeLayer, setActiveLayer] = useState<"boxes" | "heatmap" | "ocr" | "raw">("boxes");
  const [activeInspectorTab, setActiveInspectorTab] = useState<"fraud" | "transcript" | "receipt">("fraud");
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);

  // Sync override score whenever selected submission changes
  useEffect(() => {
    setOverrideScore(selectedSub.overall_quality_score);
  }, [selectedSub]);

  const filteredSubmissions = statusFilter === "all"
    ? submissions
    : submissions.filter(s => s.status === statusFilter);

  const handleQCAction = (action: "approve" | "reject" | "reassign") => {
    let newStatus: SubmissionItem["status"] = selectedSub.status;
    let message = "";

    if (action === "approve") {
      newStatus = "qc_approved";
      message = `âœ“ Submission #${selectedSub.submission_id} manually APPROVED. Escrow payout of $32.00 USD released!`;
    } else if (action === "reject") {
      newStatus = "rejected";
      message = `âš  Submission #${selectedSub.submission_id} REJECTED. Evaluator notified with fraud audit report.`;
    } else {
      newStatus = "escalated";
      message = `ðŸ”„ Submission #${selectedSub.submission_id} reassigned to secondary field evaluator.`;
    }

    const updated = submissions.map(s => 
      s.submission_id === selectedSub.submission_id
        ? { ...s, status: newStatus, overall_quality_score: overrideScore }
        : s
    );

    setSubmissions(updated);
    setSelectedSub({ ...selectedSub, status: newStatus, overall_quality_score: overrideScore });
    setActionSuccess(message);
    setTimeout(() => setActionSuccess(null), 4500);
  };

  return (
    <div className="min-h-screen bg-transparent pb-24 font-sans text-slate-900">
      
      {/* 1. ENTERPRISE TELEMETRY COMMAND HEADER */}
      <div className="border-b border-slate-200 bg-white sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-blue-600 flex items-center justify-center text-white">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  AI Computer Vision & Fraud Control Studio
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                Quality Assurance & Escrow Command
              </h1>
            </div>
          </div>

          {/* Quick Metrics KPI Bar */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-md bg-slate-50 border border-slate-200 text-right shadow-sm">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Autonomous Pass Rate</span>
              <span className="text-sm font-bold text-emerald-600 font-mono">88.5% Rate</span>
            </div>
            <div className="px-4 py-2 rounded-md bg-slate-50 border border-slate-200 text-right shadow-sm">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Escrow In-Transit</span>
              <span className="text-sm font-bold text-blue-600 font-mono">$14,820 USD</span>
            </div>
            <div className="px-4 py-2 rounded-md bg-slate-50 border border-slate-200 text-right shadow-sm">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">CV Model Inference</span>
              <span className="text-sm font-bold text-blue-600 font-mono">1.18s / 4K</span>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        
        {/* Global Toast Notification */}
        <AnimatePresence>
          {actionSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-sm font-bold flex items-center justify-between shadow-xl shadow-emerald-500/10 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>{actionSuccess}</span>
              </div>
              <button 
                onClick={() => setActionSuccess(null)}
                className="text-xs px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN COMMAND GRID */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* =========================================================================
              LEFT COLUMN: AUDIT QUEUE STREAM & LIVE SYSTEM HEALTH WIDGET (4 Cols)
             ========================================================================= */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Filter Selector */}
            <div className="p-1.5 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <button
                onClick={() => setStatusFilter("all")}
                className={`flex-1 py-2 rounded-sm font-semibold transition-colors text-center ${
                  statusFilter === "all" 
                    ? "bg-blue-600 text-white shadow-sm" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All ({submissions.length})
              </button>
              <button
                onClick={() => setStatusFilter("escalated")}
                className={`flex-1 py-2 rounded-sm font-semibold transition-colors text-center ${
                  statusFilter === "escalated" 
                    ? "bg-rose-600 text-white shadow-sm" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Escalated ({submissions.filter(s => s.status === "escalated").length})
              </button>
              <button
                onClick={() => setStatusFilter("auto_approved")}
                className={`flex-1 py-2 rounded-sm font-semibold transition-colors text-center ${
                  statusFilter === "auto_approved" 
                    ? "bg-emerald-600 text-white shadow-sm" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Auto-Pass ({submissions.filter(s => s.status === "auto_approved" || s.status === "qc_approved").length})
              </button>
            </div>

            {/* Submission Cards Stream */}
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {filteredSubmissions.map((sub) => {
                const isSelected = sub.submission_id === selectedSub.submission_id;
                const isEscalated = sub.status === "escalated";
                const isPassed = sub.status === "auto_approved" || sub.status === "qc_approved";

                return (
                  <motion.div
                    key={sub.submission_id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedSub(sub)}
                    className={`p-4 sm:p-5 rounded-md border transition-colors cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? "bg-white border-blue-600 shadow-sm"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm"
                    }`}
                  >
                    {/* Top Row: Status + Timestamp */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-sm border ${
                        isPassed
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : isEscalated
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}>
                        {sub.status.replace("_", " ")}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 font-bold">
                        {sub.submitted_at}
                      </span>
                    </div>

                    {/* Store Title */}
                    <h2 className="font-bold text-slate-900 text-base tracking-tight truncate">
                      {sub.store_name}
                    </h2>
                    
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                      <span className="truncate">{sub.city}, {sub.country}</span>
                    </div>

                    {/* Evaluator & Quality Score Footer */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200 text-xs">
                      <div className="flex items-center gap-2">
                        {sub.shopper_avatar ? (
                          <img src={sub.shopper_avatar} alt={sub.shopper_name} className="w-6 h-6 rounded-full object-cover border border-slate-200" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 font-bold text-[10px] flex items-center justify-center">
                            {sub.shopper_name.charAt(0)}
                          </div>
                        )}
                        <span className="font-semibold text-slate-800 truncate max-w-[110px]">{sub.shopper_name}</span>
                        <span className="text-[10px] font-mono text-emerald-600 font-bold">â˜… {sub.shopper_trust_score}</span>
                      </div>

                      <div className="font-mono font-bold text-sm">
                        <span className={sub.overall_quality_score >= 85 ? "text-emerald-600" : "text-rose-600"}>
                          {sub.overall_quality_score}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* LIVE AI SYSTEM HEALTH & QC TELEMETRY WIDGET (Fills Bottom Left Area) */}
            <div className="p-5 rounded-md border border-slate-200 bg-white shadow-sm space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Neural Pipeline Health
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-100">
                  ALL ENGINES 100%
                </span>
              </div>

              {/* Models Status List */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-800 block">Vision: YOLOv9 Planogram</span>
                    <span className="text-[10px] text-slate-500">Object Detection & Shelf Voids</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600">1.18s / 4K</span>
                </div>

                <div className="p-3 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-800 block">Audio: Whisper v3 NLP</span>
                    <span className="text-[10px] text-slate-500">Acoustic Diary Sentiment</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-600">98.4% Acc</span>
                </div>

                <div className="p-3 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-800 block">Anti-Spoof Hardware Gate</span>
                    <span className="text-[10px] text-slate-500">GPS Polygon & Camera EXIF</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-600">0 Bypasses</span>
                </div>
              </div>

              {/* Keyboard Assist Help Bar */}
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between font-mono">
                <span>âš¡ Shortcuts:</span>
                <span className="font-semibold text-slate-700">[A] Approve</span>
                <span className="font-semibold text-slate-700">[R] Reject</span>
                <span className="font-semibold text-slate-700">[E] Re-Audit</span>
              </div>

            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: COMPUTER VISION HUD & MULTI-MODAL INSPECTOR (8 Cols)
             ========================================================================= */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Main AI Workspace Card */}
            <div className="p-6 sm:p-8 rounded-md border border-slate-200 bg-white shadow-sm space-y-6">
              
              {/* Header Title & Score Gauge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-sm bg-blue-50 text-blue-700 font-bold uppercase font-mono border border-blue-100">
                      Sub ID: #{selectedSub.submission_id}
                    </span>
                    <span className="text-xs text-slate-500">â€¢ {selectedSub.project_title}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                    {selectedSub.store_name}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Evaluator: <strong className="text-slate-800">{selectedSub.shopper_name}</strong> â€¢ Biometric KYC Verified
                  </p>
                </div>

                {/* Score Gauge Badge */}
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-md border border-slate-200 shadow-sm">
                  <div className="text-right">
                    <div className={`text-2xl sm:text-3xl font-bold font-mono leading-none ${
                      selectedSub.overall_quality_score >= 85 ? "text-emerald-600" : "text-rose-600"
                    }`}>
                      {selectedSub.overall_quality_score}%
                    </div>
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold block mt-1">
                      AI Quality Score
                    </span>
                  </div>
                  <div className={`w-12 h-12 rounded-md flex items-center justify-center text-lg font-bold ${
                    selectedSub.overall_quality_score >= 85
                      ? "bg-emerald-600 text-white"
                      : "bg-rose-600 text-white"
                  }`}>
                    {selectedSub.overall_quality_score >= 85 ? "A+" : "C-"}
                  </div>
                </div>
              </div>

              {/* 2. HIGH-TECH COMPUTER VISION INSPECTION CANVAS */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <Scan className="w-4 h-4 text-blue-600" />
                    <span>Multi-Layer Computer Vision Neural Inspector</span>
                  </div>

                  {/* Canvas HUD Layer Controls */}
                  <div className="flex items-center gap-1 p-1 rounded-md bg-slate-50 border border-slate-200 text-xs">
                    <button
                      onClick={() => setActiveLayer("boxes")}
                      className={`px-3 py-1.5 rounded-sm font-semibold transition-colors ${
                        activeLayer === "boxes" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Bounding HUD
                    </button>
                    <button
                      onClick={() => setActiveLayer("heatmap")}
                      className={`px-3 py-1.5 rounded-sm font-semibold transition-colors ${
                        activeLayer === "heatmap" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Planogram Heatmap
                    </button>
                    <button
                      onClick={() => setActiveLayer("ocr")}
                      className={`px-3 py-1.5 rounded-sm font-semibold transition-colors ${
                        activeLayer === "ocr" ? "bg-cyan-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Price OCR Tags
                    </button>
                    <button
                      onClick={() => setActiveLayer("raw")}
                      className={`px-3 py-1.5 rounded-sm font-semibold transition-colors ${
                        activeLayer === "raw" ? "bg-slate-800 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Raw Proof
                    </button>
                  </div>
                </div>

                {/* Simulated Computer Vision Visual Frame */}
                <div className="relative rounded-md overflow-hidden aspect-video border border-slate-200 bg-slate-100 shadow-sm group">
                  
                  <img
                    src={selectedSub.media_proofs[0]?.storage_url || "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1200&q=80"}
                    alt="Audited Shelf"
                    className="w-full h-full object-cover"
                  />

                  {/* Top-Right HUD Telemetry Chip */}
                  <div className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono font-semibold text-slate-800 shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>INFERENCE: 1.18s â€¢ YOLOv9</span>
                  </div>

                  {/* Bounding Box HUD Overlays */}
                  {activeLayer !== "raw" && selectedSub.vision_scores?.bounding_boxes?.map((b, idx) => {
                    const [ymin, xmin, ymax, xmax] = b.box;
                    const isVoid = b.status === "void_alert";
                    const isComp = b.status === "compliant";
                    const isOCR = b.status === "ocr_verified";

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onMouseEnter={() => setHoveredBox(idx)}
                        onMouseLeave={() => setHoveredBox(null)}
                        className={`absolute border-2 rounded-sm transition-all cursor-pointer z-10 ${
                          isVoid
                            ? "border-rose-500 bg-rose-500/20"
                            : isComp
                            ? "border-emerald-500 bg-emerald-500/20"
                            : isOCR
                            ? "border-cyan-500 bg-cyan-500/20"
                            : "border-amber-500 bg-amber-500/20"
                        }`}
                        style={{
                          top: `${ymin * 100}%`,
                          left: `${xmin * 100}%`,
                          width: `${(xmax - xmin) * 100}%`,
                          height: `${(ymax - ymin) * 100}%`,
                        }}
                      >
                        {/* Bounding Box Title Pill */}
                        <div className="p-1 flex items-center justify-between text-[10px] font-mono font-bold text-white bg-slate-900/90">
                          <span>{b.label}</span>
                          <span className="text-blue-300">{(b.confidence * 100).toFixed(0)}%</span>
                        </div>

                        {/* Hover Details Card */}
                        {b.details && (
                          <div className="p-1 text-[9px] font-mono text-slate-200 bg-slate-800/90 border-t border-slate-700 hidden group-hover:block">
                            {b.details}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
                   {/* 3. MULTI-MODAL INSPECTOR TABS */}
              <div className="space-y-4 pt-2">
                
                {/* Tabs bar */}
                <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold">
                  <button
                    onClick={() => setActiveInspectorTab("fraud")}
                    className={`pb-3 transition-colors flex items-center gap-2 border-b-2 ${
                      activeInspectorTab === "fraud"
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Hardware GPS & Anti-Fraud Diagnostics</span>
                  </button>

                  <button
                    onClick={() => setActiveInspectorTab("transcript")}
                    className={`pb-3 transition-colors flex items-center gap-2 border-b-2 ${
                      activeInspectorTab === "transcript"
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Acoustic Diary & NLP Sentiment</span>
                  </button>

                  <button
                    onClick={() => setActiveInspectorTab("receipt")}
                    className={`pb-3 transition-colors flex items-center gap-2 border-b-2 ${
                      activeInspectorTab === "receipt"
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>OCR Price & Shelf Questionnaire</span>
                  </button>
                </div>

                {/* TAB CONTENT 1: FRAUD & HARDWARE DIAGNOSTICS */}
                {activeInspectorTab === "fraud" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-4 rounded-md bg-slate-50 border border-slate-200 shadow-sm">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Hardware Geofence</span>
                        <span className={`font-bold font-mono text-sm block mt-1 ${selectedSub.geo_distance_meters > 150 ? "text-rose-600" : "text-emerald-600"}`}>
                          {selectedSub.geo_distance_meters}m {selectedSub.geo_distance_meters > 150 ? "(BREACHED)" : "(VERIFIED)"}
                        </span>
                      </div>

                      <div className="p-4 rounded-md bg-slate-50 border border-slate-200 shadow-sm">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Image Hash Integrity</span>
                        <span className="font-bold font-mono text-sm text-emerald-600 block mt-1">Unique (0 Dups)</span>
                      </div>

                      <div className="p-4 rounded-md bg-slate-50 border border-slate-200 shadow-sm">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">EXIF Timestamp</span>
                        <span className="font-bold font-mono text-sm text-emerald-600 block mt-1">Live (+1.2m)</span>
                      </div>

                      <div className="p-4 rounded-md bg-slate-50 border border-slate-200 shadow-sm">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Acoustic Sentiment</span>
                        <span className={`font-bold font-mono text-sm block mt-1 ${selectedSub.text_sentiment_score >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                          {selectedSub.text_sentiment_score >= 0 ? "+ Positive" : "- Negative"} ({selectedSub.text_sentiment_score})
                        </span>
                      </div>
                    </div>

                    {/* Fraud Escalation Callout Box */}
                    {selectedSub.fraud_flags?.flag_reasons?.length ? (
                      <div className="p-4 rounded-md bg-rose-50 border border-rose-200 text-rose-900 text-sm shadow-sm">
                        <span className="font-bold text-rose-700 block mb-1.5 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Automated AI Escalation Trigger:
                        </span>
                        <ul className="list-disc pl-5 space-y-1 font-medium">
                          {selectedSub.fraud_flags.flag_reasons.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="p-4 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2 shadow-sm font-medium">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>All hardware geofences, tamper-proof EXIF logs, and biometric checks passed without anomalies.</span>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB CONTENT 2: AUDIO TRANSCRIPT */}
                {activeInspectorTab === "transcript" && (
                  <div className="p-5 rounded-md bg-slate-50 border border-slate-200 space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 flex items-center gap-2">
                        <Volume2 className="w-5 h-5 text-blue-600" />
                        Voice Diary Audio Transcript:
                      </span>
                      <span className="font-mono text-xs text-emerald-600 font-bold">
                        Confidence: 98.2%
                      </span>
                    </div>
                    <p className="p-4 rounded-md bg-white border border-slate-200 text-slate-700 leading-relaxed font-sans shadow-sm">
                      &quot;{selectedSub.answers_data?.q4_audio || "Voice diary recorded: Store display verified and compliant."}&quot;
                    </p>
                  </div>
                )}

                {/* TAB CONTENT 3: OCR QUESTIONNAIRE */}
                {activeInspectorTab === "receipt" && (
                  <div className="p-5 rounded-md bg-slate-50 border border-slate-200 space-y-4 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-md bg-white border border-slate-200 shadow-sm">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Shelf Price Tag OCR:</span>
                        <span className="font-bold font-mono text-blue-600 text-base mt-1 block">
                          {selectedSub.answers_data?.q3_price || "$3.49 / unit"}
                        </span>
                      </div>
                      <div className="p-4 rounded-md bg-white border border-slate-200 shadow-sm">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Stock Void Status:</span>
                        <span className="font-bold text-slate-800 text-base mt-1 block">
                          {selectedSub.answers_data?.q2_oos || "None (Full Stock)"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

              </div>           </div>

              {/* 4. HUMAN QC ESCROW RELEASE ACTION DOCK */}
              <div className="p-6 rounded-md bg-blue-50 border border-blue-200 space-y-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-blue-900 flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-blue-600" />
                    Human Reviewer Escrow Override & Settlement
                  </span>
                  <span className="text-xs font-mono font-bold text-blue-900 bg-white px-3.5 py-1.5 rounded-md border border-blue-200 shadow-sm">
                    Settlement Score: {overrideScore}%
                  </span>
                </div>

                {/* Reactive Score Slider */}
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={overrideScore}
                  onChange={(e) => setOverrideScore(Number(e.target.value))}
                  className="w-full h-2 bg-white border border-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <button
                    onClick={() => handleQCAction("approve")}
                    className="py-3 px-3 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Approve & Release</span>
                  </button>

                  <button
                    onClick={() => handleQCAction("reject")}
                    className="py-3 px-3 rounded-md bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject & Quarantine</span>
                  </button>

                  <button
                    onClick={() => handleQCAction("reassign")}
                    className="py-3 px-3 rounded-md bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm transition-colors flex items-center justify-center gap-2 border border-slate-200 shadow-sm"
                  >
                    <RefreshCw className="w-4 h-4 text-slate-600" />
                    <span>Re-Audit</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}


