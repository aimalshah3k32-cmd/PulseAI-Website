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
      message = `✓ Submission #${selectedSub.submission_id} manually APPROVED. Escrow payout of $32.00 USD released!`;
    } else if (action === "reject") {
      newStatus = "rejected";
      message = `⚠ Submission #${selectedSub.submission_id} REJECTED. Evaluator notified with fraud audit report.`;
    } else {
      newStatus = "escalated";
      message = `🔄 Submission #${selectedSub.submission_id} reassigned to secondary field evaluator.`;
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
    <div className="min-h-screen bg-transparent pb-24 font-sans text-slate-900 dark:text-slate-100">
      
      {/* 1. ENTERPRISE TELEMETRY COMMAND HEADER */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/80 backdrop-blur-xl sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-heading">
                  AI Computer Vision & Fraud Control Studio
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading">
                Quality Assurance & Escrow Command
              </h1>
            </div>
          </div>

          {/* Quick Metrics KPI Bar */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-right shadow-sm">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Autonomous Pass Rate</span>
              <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">88.5% Rate</span>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-right shadow-sm">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Escrow In-Transit</span>
              <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 font-mono">$14,820 USD</span>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-right shadow-sm">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">CV Model Inference</span>
              <span className="text-sm font-black text-cyan-600 dark:text-cyan-400 font-mono">1.18s / 4K</span>
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
            <div className="p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs shadow-inner">
              <button
                onClick={() => setStatusFilter("all")}
                className={`flex-1 py-2 rounded-xl font-bold transition-all text-center ${
                  statusFilter === "all" 
                    ? "bg-indigo-600 !text-white shadow-md shadow-indigo-600/30" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                All ({submissions.length})
              </button>
              <button
                onClick={() => setStatusFilter("escalated")}
                className={`flex-1 py-2 rounded-xl font-bold transition-all text-center ${
                  statusFilter === "escalated" 
                    ? "bg-rose-600 !text-white shadow-md shadow-rose-600/30" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Escalated ({submissions.filter(s => s.status === "escalated").length})
              </button>
              <button
                onClick={() => setStatusFilter("auto_approved")}
                className={`flex-1 py-2 rounded-xl font-bold transition-all text-center ${
                  statusFilter === "auto_approved" 
                    ? "bg-emerald-600 !text-white shadow-md shadow-emerald-600/30" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
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
                    whileHover={{ scale: 1.015 }}
                    onClick={() => setSelectedSub(sub)}
                    className={`p-4 sm:p-5 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden card-3d ${
                      isSelected
                        ? "bg-white dark:bg-slate-900 border-indigo-600 dark:border-indigo-500 shadow-xl shadow-indigo-600/15"
                        : "bg-white/80 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
                    }`}
                  >
                    {/* Active Selection Glow Bar */}
                    {isSelected && (
                      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 via-cyan-400 to-indigo-600" />
                    )}

                    {/* Top Row: Status + Timestamp */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full border ${
                        isPassed
                          ? "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30"
                          : isEscalated
                          ? "bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/30 animate-pulse"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      }`}>
                        {sub.status.replace("_", " ")}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-bold">
                        {sub.submitted_at}
                      </span>
                    </div>

                    {/* Store Title */}
                    <h2 className="font-heading font-black text-slate-900 dark:text-white text-base tracking-tight truncate">
                      {sub.store_name}
                    </h2>
                    
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                      <span className="truncate">{sub.city}, {sub.country}</span>
                    </div>

                    {/* Evaluator & Quality Score Footer */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                      <div className="flex items-center gap-2">
                        {sub.shopper_avatar ? (
                          <img src={sub.shopper_avatar} alt={sub.shopper_name} className="w-6 h-6 rounded-full object-cover border border-indigo-400" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-bold text-[10px] flex items-center justify-center">
                            {sub.shopper_name.charAt(0)}
                          </div>
                        )}
                        <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[110px]">{sub.shopper_name}</span>
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-black">★ {sub.shopper_trust_score}</span>
                      </div>

                      <div className="font-mono font-black text-sm">
                        <span className={sub.overall_quality_score >= 85 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
                          {sub.overall_quality_score}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* LIVE AI SYSTEM HEALTH & QC TELEMETRY WIDGET (Fills Bottom Left Area) */}
            <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 backdrop-blur-xl shadow-lg space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                  <span className="text-xs font-black text-slate-900 dark:text-white font-heading uppercase tracking-wider">
                    Neural Pipeline Health
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                  ALL ENGINES 100%
                </span>
              </div>

              {/* Models Status List */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block font-heading">Vision: YOLOv9 Planogram</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Object Detection & Shelf Voids</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">1.18s / 4K</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block font-heading">Audio: Whisper v3 NLP</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Acoustic Diary Sentiment</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">98.4% Acc</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block font-heading">Anti-Spoof Hardware Gate</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">GPS Polygon & Camera EXIF</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">0 Bypasses</span>
                </div>
              </div>

              {/* Keyboard Assist Help Bar */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between font-mono">
                <span>⚡ Shortcuts:</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">[A] Approve</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">[R] Reject</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">[E] Re-Audit</span>
              </div>

            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: COMPUTER VISION HUD & MULTI-MODAL INSPECTOR (8 Cols)
             ========================================================================= */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Main AI Workspace Card */}
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 backdrop-blur-xl shadow-xl dark:shadow-none space-y-6">
              
              {/* Header Title & Score Gauge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 font-bold uppercase font-mono">
                      Sub ID: #{selectedSub.submission_id}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">• {selectedSub.project_title}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading mt-1">
                    {selectedSub.store_name}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Evaluator: <strong className="text-slate-800 dark:text-slate-200">{selectedSub.shopper_name}</strong> • Biometric KYC Verified
                  </p>
                </div>

                {/* Score Gauge Badge */}
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
                  <div className="text-right">
                    <div className={`text-2xl sm:text-3xl font-black font-mono leading-none ${
                      selectedSub.overall_quality_score >= 85 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                    }`}>
                      {selectedSub.overall_quality_score}%
                    </div>
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-extrabold block mt-1">
                      AI Quality Score
                    </span>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black shadow-md ${
                    selectedSub.overall_quality_score >= 85
                      ? "bg-emerald-600 !text-white shadow-emerald-600/30"
                      : "bg-rose-600 !text-white shadow-rose-600/30"
                  }`}>
                    {selectedSub.overall_quality_score >= 85 ? "A+" : "C-"}
                  </div>
                </div>
              </div>

              {/* 2. HIGH-TECH COMPUTER VISION INSPECTION CANVAS */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 font-heading">
                    <Scan className="w-4 h-4 text-cyan-500" />
                    <span>Multi-Layer Computer Vision Neural Inspector</span>
                  </div>

                  {/* Canvas HUD Layer Controls */}
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                    <button
                      onClick={() => setActiveLayer("boxes")}
                      className={`px-3 py-1 rounded-lg font-bold transition-all ${
                        activeLayer === "boxes" ? "bg-indigo-600 !text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      Bounding HUD
                    </button>
                    <button
                      onClick={() => setActiveLayer("heatmap")}
                      className={`px-3 py-1 rounded-lg font-bold transition-all ${
                        activeLayer === "heatmap" ? "bg-emerald-600 !text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      Planogram Heatmap
                    </button>
                    <button
                      onClick={() => setActiveLayer("ocr")}
                      className={`px-3 py-1 rounded-lg font-bold transition-all ${
                        activeLayer === "ocr" ? "bg-cyan-600 !text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      Price OCR Tags
                    </button>
                    <button
                      onClick={() => setActiveLayer("raw")}
                      className={`px-3 py-1 rounded-lg font-bold transition-all ${
                        activeLayer === "raw" ? "bg-slate-800 !text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      Raw Proof
                    </button>
                  </div>
                </div>

                {/* Simulated Computer Vision Visual Frame */}
                <div className="relative rounded-3xl overflow-hidden aspect-video border-2 border-slate-200 dark:border-slate-800 bg-slate-950 shadow-2xl group">
                  
                  <img
                    src={selectedSub.media_proofs[0]?.storage_url || "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1200&q=80"}
                    alt="Audited Shelf"
                    className="w-full h-full object-cover"
                  />

                  {/* Scanning HUD Grid Overlay */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee] animate-scan-laser pointer-events-none" />

                  {/* Top-Right HUD Telemetry Chip */}
                  <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-xl bg-slate-950/90 border border-slate-800 text-[10px] font-mono text-cyan-300 backdrop-blur-md shadow-lg flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>INFERENCE: 1.18s • YOLOv9-Planogram</span>
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
                        className={`absolute border-2 rounded-xl transition-all cursor-pointer z-10 ${
                          isVoid
                            ? "border-rose-500 bg-rose-500/25 shadow-[0_0_25px_rgba(244,63,94,0.4)]"
                            : isComp
                            ? "border-emerald-400 bg-emerald-500/20 shadow-[0_0_25px_rgba(16,185,129,0.3)]"
                            : isOCR
                            ? "border-cyan-400 bg-cyan-500/25 shadow-[0_0_25px_rgba(6,182,212,0.3)]"
                            : "border-amber-400 bg-amber-500/20 shadow-[0_0_25px_rgba(245,158,11,0.3)]"
                        }`}
                        style={{
                          top: `${ymin * 100}%`,
                          left: `${xmin * 100}%`,
                          width: `${(xmax - xmin) * 100}%`,
                          height: `${(ymax - ymin) * 100}%`,
                        }}
                      >
                        {/* Corner Reticle Brackets */}
                        <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white" />
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white" />
                        <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white" />
                        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white" />

                        {/* Bounding Box Title Pill */}
                        <div className="p-1.5 flex items-center justify-between text-[10px] font-mono font-black text-white bg-slate-950/95 backdrop-blur-md rounded-t-lg">
                          <span>{b.label}</span>
                          <span className="text-cyan-300">{(b.confidence * 100).toFixed(0)}%</span>
                        </div>

                        {/* Hover Details Card */}
                        {b.details && (
                          <div className="p-1.5 text-[9px] font-mono text-slate-200 bg-slate-950/90 rounded-b-lg border-t border-slate-800">
                            {b.details}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* 3. MULTI-MODAL INSPECTOR TABS */}
              <div className="space-y-4 pt-2">
                
                {/* Tabs bar */}
                <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-xs font-bold font-heading">
                  <button
                    onClick={() => setActiveInspectorTab("fraud")}
                    className={`pb-3 transition-colors flex items-center gap-2 border-b-2 ${
                      activeInspectorTab === "fraud"
                        ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                        : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Hardware GPS & Anti-Fraud Diagnostics</span>
                  </button>

                  <button
                    onClick={() => setActiveInspectorTab("transcript")}
                    className={`pb-3 transition-colors flex items-center gap-2 border-b-2 ${
                      activeInspectorTab === "transcript"
                        ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                        : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Acoustic Diary & NLP Sentiment</span>
                  </button>

                  <button
                    onClick={() => setActiveInspectorTab("receipt")}
                    className={`pb-3 transition-colors flex items-center gap-2 border-b-2 ${
                      activeInspectorTab === "receipt"
                        ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                        : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
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
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Hardware Geofence</span>
                        <span className={`font-black font-mono text-sm block mt-1 ${selectedSub.geo_distance_meters > 150 ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                          {selectedSub.geo_distance_meters}m {selectedSub.geo_distance_meters > 150 ? "(BREACHED)" : "(VERIFIED)"}
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Image Hash Integrity</span>
                        <span className="font-black font-mono text-sm text-emerald-600 dark:text-emerald-400 block mt-1">Unique (0 Dups)</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">EXIF Timestamp</span>
                        <span className="font-black font-mono text-sm text-emerald-600 dark:text-emerald-400 block mt-1">Live (+1.2m)</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Acoustic Sentiment</span>
                        <span className={`font-black font-mono text-sm block mt-1 ${selectedSub.text_sentiment_score >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                          {selectedSub.text_sentiment_score >= 0 ? "+ Positive" : "- Negative"} ({selectedSub.text_sentiment_score})
                        </span>
                      </div>
                    </div>

                    {/* Fraud Escalation Callout Box */}
                    {selectedSub.fraud_flags?.flag_reasons?.length ? (
                      <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-500/40 text-rose-900 dark:text-rose-300 text-xs shadow-sm">
                        <span className="font-black text-rose-700 dark:text-rose-400 block mb-1.5 flex items-center gap-2 font-heading">
                          <AlertTriangle className="w-4 h-4 text-rose-600" />
                          Automated AI Escalation Trigger:
                        </span>
                        <ul className="list-disc pl-5 space-y-1 font-semibold">
                          {selectedSub.fraud_flags.flag_reasons.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 shadow-sm font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>All hardware geofences, tamper-proof EXIF logs, and biometric checks passed without anomalies.</span>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB CONTENT 2: AUDIO TRANSCRIPT */}
                {activeInspectorTab === "transcript" && (
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
                        <Volume2 className="w-4 h-4 text-indigo-500" />
                        Voice Diary Audio Transcript:
                      </span>
                      <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-black">
                        Confidence: 98.2%
                      </span>
                    </div>
                    <p className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                      &quot;{selectedSub.answers_data?.q4_audio || "Voice diary recorded: Store display verified and compliant."}&quot;
                    </p>
                  </div>
                )}

                {/* TAB CONTENT 3: OCR QUESTIONNAIRE */}
                {activeInspectorTab === "receipt" && (
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Shelf Price Tag OCR:</span>
                        <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400 text-sm mt-0.5 block">
                          {selectedSub.answers_data?.q3_price || "$3.49 / unit"}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Stock Void Status:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5 block">
                          {selectedSub.answers_data?.q2_oos || "None (Full Stock)"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* 4. HUMAN QC ESCROW RELEASE ACTION DOCK */}
              <div className="p-6 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/30 border-2 border-indigo-200 dark:border-indigo-500/30 space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-indigo-950 dark:text-indigo-200 flex items-center gap-2 font-heading">
                    <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    Human Reviewer Escrow Override & Settlement
                  </span>
                  <span className="text-xs font-mono font-black text-indigo-900 dark:text-white bg-white dark:bg-slate-900 px-3.5 py-1 rounded-xl border border-indigo-200 dark:border-indigo-700 shadow-sm">
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
                  className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <button
                    onClick={() => handleQCAction("approve")}
                    className="py-4 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 !text-white font-black text-xs transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 active:scale-95 font-heading"
                  >
                    <Unlock className="w-4 h-4 !text-white" />
                    <span>[A] Approve & Release</span>
                  </button>

                  <button
                    onClick={() => handleQCAction("reject")}
                    className="py-4 px-3 rounded-2xl bg-rose-600 hover:bg-rose-500 !text-white font-black text-xs transition-all flex items-center justify-center gap-2 shadow-xl shadow-rose-600/30 active:scale-95 font-heading"
                  >
                    <XCircle className="w-4 h-4 !text-white" />
                    <span>[R] Reject & Quarantine</span>
                  </button>

                  <button
                    onClick={() => handleQCAction("reassign")}
                    className="py-4 px-3 rounded-2xl bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-black text-xs transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 shadow-sm active:scale-95 font-heading"
                  >
                    <RefreshCw className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span>[E] Re-Audit</span>
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
