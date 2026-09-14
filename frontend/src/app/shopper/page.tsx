"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Navigation, 
  Camera, 
  UploadCloud, 
  Mic, 
  MicOff, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  ShieldCheck, 
  ChevronRight,
  Smartphone,
  Scan,
  Sparkles,
  Lock,
  Compass
} from "lucide-react";
import { INITIAL_LOCATIONS, LocationItem } from "@/lib/api";

export default function ShopperRadar() {
  const [activeStep, setActiveStep] = useState<"radar" | "checkin" | "audit" | "results">("radar");
  const [selectedTask, setSelectedTask] = useState<LocationItem | null>(INITIAL_LOCATIONS[0]);
  
  // Geofence simulation state (User Distance in meters)
  const [userDistance, setUserDistance] = useState<number>(24); // 24m is inside the 150m perimeter
  const [isWithinGeofence, setIsWithinGeofence] = useState<boolean>(true);
  
  // Audit evidence state
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const [oosStatus, setOosStatus] = useState("None (Full Stock)");
  const [priceInput, setPriceInput] = useState("3.49");
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [audioCaptured, setAudioCaptured] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);

  const handleSimulateMoveCloser = () => {
    setUserDistance(24);
    setIsWithinGeofence(true);
  };

  const handleSimulateMoveAway = () => {
    setUserDistance(280); // Outside 150m geofence
    setIsWithinGeofence(false);
  };

  const handleExecuteAuditSubmission = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const isBreached = userDistance > (selectedTask?.geofence_radius_meters || 150);
      const planogramScore = isBreached ? 64.0 : 96.5;
      const overallScore = isBreached ? 62.0 : 95.8;
      const status = isBreached ? "escalated" : "auto_approved";

      setSubmissionResult({
        overall_quality_score: overallScore,
        status: status,
        planogram_compliance: planogramScore,
        shelf_emptiness: isBreached ? 24.5 : 3.8,
        sentiment: 0.85,
        payout_amount: selectedTask?.payout || 32.0,
        fraud_flags: {
          geofence_breached: isBreached,
          flag_reasons: isBreached ? ["Geofence breached: GPS coordinates 280m from store center."] : []
        },
        bounding_boxes: [
          { label: "Target Brand SKU #1", box: [0.20, 0.15, 0.55, 0.35], confidence: 0.98, status: "compliant" },
          { label: "Target Brand SKU #2", box: [0.21, 0.38, 0.56, 0.58], confidence: 0.96, status: "compliant" },
          { label: "Competitor Facing", box: [0.22, 0.62, 0.57, 0.85], confidence: 0.92, status: "competitor" },
        ]
      });
      setActiveStep("results");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-transparent pb-20 font-sans">
      
      {/* Mobile Top Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/60 backdrop-blur-md sticky top-16 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 dark:text-white font-heading block leading-tight">Shopper Field Radar</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">GPS Proximity: Active</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold">
              Trust Score: 96.8
            </div>
            <div className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-mono font-bold">
              Wallet: $340.00
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6">
        
        {/* STEP 1: RADAR NEARBY TASKS */}
        {activeStep === "radar" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading">
                  Audits Available Near You
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Walk within the 150m GPS geofence perimeter to unlock capture.
                </p>
              </div>
              <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2.5 py-1 rounded-xl">
                {INITIAL_LOCATIONS.length} Available
              </span>
            </div>

            <div className="grid gap-3.5">
              {INITIAL_LOCATIONS.map((task) => (
                <motion.div
                  key={task.id}
                  whileHover={{ scale: 1.01 }}
                  className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-indigo-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md dark:shadow-none card-3d"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-bold uppercase font-mono">
                        {(task.type || "Retail Audit").replace("_", " ")}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">• {task.city}</span>
                    </div>
                    <h2 className="text-base font-black text-slate-900 dark:text-white font-heading">{task.store_name}</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{task.address}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <div className="text-left sm:text-right">
                      <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono block">
                        ${task.payout} USD
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Per Audit Release</span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setActiveStep("checkin");
                      }}
                      className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 !text-white font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-indigo-600/25 flex items-center gap-1.5 font-heading"
                    >
                      <span>Check In</span>
                      <ChevronRight className="w-4 h-4 !text-white" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: GEOFENCED GPS CHECK-IN GATE */}
        {activeStep === "checkin" && selectedTask && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 backdrop-blur-md space-y-6 shadow-xl dark:shadow-none"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <button
                onClick={() => setActiveStep("radar")}
                className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold flex items-center gap-1"
              >
                ← Back to Radar
              </button>
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">Step 1 of 2: GPS Gate</span>
            </div>

            <div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-bold uppercase font-mono">
                Hardware Geofence Check
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading mt-1">{selectedTask.store_name}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">{selectedTask.address}</p>
            </div>

            {/* Radar Distance Meter */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
              <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full border-2 border-dashed animate-spin ${isWithinGeofence ? "border-emerald-500/50" : "border-rose-500/50"}`} style={{ animationDuration: "12s" }} />
                <div className={`w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-md ${isWithinGeofence ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400" : "bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400"}`}>
                  <Navigation className="w-6 h-6 mb-1" />
                  <span className="text-xs font-black font-mono">{userDistance}m</span>
                </div>
              </div>

              <div>
                <span className={`text-xs font-black px-3.5 py-1 rounded-full ${isWithinGeofence ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30" : "bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30"}`}>
                  {isWithinGeofence ? "✓ Inside Geofence (Unlocked)" : "⚠ Outside Geofence Perimeter"}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                  Allowed perimeter radius: <strong className="text-slate-900 dark:text-slate-200">{selectedTask.geofence_radius_meters} meters</strong>.
                </p>
              </div>

              {/* Simulation Toggles for testing */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={handleSimulateMoveCloser}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  📍 Simulate Inside (24m)
                </button>
                <button
                  onClick={handleSimulateMoveAway}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  🚫 Simulate Spoof/Outside (280m)
                </button>
              </div>
            </div>

            <button
              onClick={() => setActiveStep("audit")}
              disabled={!isWithinGeofence}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 !text-white font-black text-xs uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 font-heading"
            >
              <span>Unlock & Begin Evidence Capture</span>
              <ChevronRight className="w-4 h-4 !text-white" />
            </button>
          </motion.div>
        )}

        {/* STEP 3: MULTI-MODAL EVIDENCE CAPTURE FORM */}
        {activeStep === "audit" && selectedTask && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 backdrop-blur-md space-y-6 shadow-xl dark:shadow-none"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <button
                onClick={() => setActiveStep("checkin")}
                className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold flex items-center gap-1"
              >
                ← Back to Geofence
              </button>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">Step 2 of 2: Evidence Proofs</span>
            </div>

            <div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold uppercase font-mono">
                Active Audit Execution
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading mt-1">{selectedTask.store_name}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Reward upon AI verification: <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">${selectedTask.payout} USD</strong></p>
            </div>

            <div className="space-y-5">
              
              {/* Question 1: Shelf Photo Upload */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2 font-heading">
                    <Camera className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>1. Capture Wide-Angle Shelf Facing Photo</span>
                  </label>
                  <span className="text-[10px] bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded font-mono font-bold">AI CV Engine</span>
                </div>
                
                {photoCaptured ? (
                  <div className="relative rounded-2xl overflow-hidden border border-indigo-500/40">
                    <img 
                      src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80" 
                      alt="Shelf capture" 
                      className="w-full h-44 object-cover"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-emerald-600 !text-white text-[10px] px-2.5 py-1 rounded-lg font-bold shadow-md">
                      ✓ EXIF Validated
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setPhotoCaptured(true)}
                    className="w-full py-8 border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-indigo-500 rounded-2xl bg-white dark:bg-slate-900/40 flex flex-col items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all gap-2 shadow-sm"
                  >
                    <UploadCloud className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-xs font-bold">Tap to Take or Upload Shelf Photo</span>
                  </button>
                )}
              </div>

              {/* Question 2: OOS Checklist */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-sm">
                <label className="text-xs font-black text-slate-900 dark:text-white block font-heading">
                  2. Are any target SKUs completely Out-of-Stock (OOS)?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["None (Full Stock)", "1-2 SKUs OOS", "Heavy OOS (>3 SKUs)", "Section Empty"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setOosStatus(opt)}
                      className={`p-3 rounded-xl text-xs font-bold transition-all ${
                        oosStatus === opt ? "bg-indigo-600 !text-white shadow-md shadow-indigo-600/30" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-850 shadow-sm"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Shelf Tag Price */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
                <label className="text-xs font-black text-slate-900 dark:text-white block font-heading">
                  3. Shelf Price Tag Amount ($ USD)
                </label>
                <input
                  type="text"
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono font-bold focus:outline-none focus:border-indigo-500 shadow-sm"
                />
              </div>

              {/* Question 4: Audio Voice Note */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2 font-heading">
                    <Mic className="w-4 h-4 text-rose-500" />
                    <span>4. Record 30-Second Voice Diary</span>
                  </label>
                  <span className="text-[10px] bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded font-mono font-bold">NLP Sentiment</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsRecordingAudio(!isRecordingAudio);
                        setAudioCaptured(true);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isRecordingAudio ? "bg-rose-600 !text-white animate-pulse" : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {isRecordingAudio ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-rose-500" />}
                      <span>{isRecordingAudio ? "Stop (0:18)" : audioCaptured ? "Re-record" : "Record Voice"}</span>
                    </button>
                    {audioCaptured && (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">✓ Audio file attached (2.4 MB)</span>
                    )}
                  </div>
                </div>
              </div>

            </div>

            <button
              onClick={handleExecuteAuditSubmission}
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 !text-white font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 font-heading"
            >
              {isSubmitting ? (
                <span>Submitting to AI Engine...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 !text-white" />
                  <span>Submit Proofs for Instant AI Verification</span>
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* STEP 4: INSTANT AI VERIFICATION RESULT */}
        {activeStep === "results" && submissionResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 backdrop-blur-md space-y-6 shadow-xl dark:shadow-none"
          >
            <div className="text-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white font-heading">AI Quality Verification Complete</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Computer vision, acoustic sentiment, and hardware geofence analysis complete.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Overall AI Grade</span>
                <span className={`text-xl font-black font-mono ${submissionResult.overall_quality_score >= 85 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                  {submissionResult.overall_quality_score}%
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Planogram Match</span>
                <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                  {submissionResult.planogram_compliance}%
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Shelf Emptiness</span>
                <span className="text-xl font-black text-cyan-600 dark:text-cyan-400 font-mono">
                  {submissionResult.shelf_emptiness}%
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Escrow Payout</span>
                <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  ${submissionResult.payout_amount} USD
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveStep("radar");
                setSubmissionResult(null);
                setPhotoCaptured(false);
                setAudioCaptured(false);
              }}
              className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 !text-white font-black text-xs uppercase tracking-wider transition-all shadow-md font-heading"
            >
              Return to Radar & Find More Audits
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}
