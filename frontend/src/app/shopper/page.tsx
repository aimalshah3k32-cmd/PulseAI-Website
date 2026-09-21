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
    <div className="min-h-screen bg-white pb-20 font-sans">
      
      {/* Mobile Top Bar */}
      <div className="border-b border-slate-200 bg-white sticky top-16 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block leading-tight">Shopper Field Radar</span>
              <span className="text-[10px] text-slate-500">GPS Proximity: Active</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold">
              Trust Score: 96.8
            </div>
            <div className="px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold">
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
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Audits Available Near You
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Walk within the 150m GPS geofence perimeter to unlock capture.
                </p>
              </div>
              <span className="text-xs font-bold font-mono text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                {INITIAL_LOCATIONS.length} Available
              </span>
            </div>

            <div className="grid gap-3.5">
              {INITIAL_LOCATIONS.map((task) => (
                <div
                  key={task.id}
                  className="p-5 rounded-md border border-slate-200 bg-white hover:border-blue-500 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold uppercase font-mono">
                        {(task.type || "Retail Audit").replace("_", " ")}
                      </span>
                      <span className="text-xs text-slate-500">â€¢ {task.city}</span>
                    </div>
                    <h2 className="text-base font-bold text-slate-900">{task.store_name}</h2>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      <span>{task.address}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-left sm:text-right">
                      <span className="text-lg font-bold text-emerald-600 font-mono block">
                        ${task.payout} USD
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Per Audit Release</span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setActiveStep("checkin");
                      }}
                      className="px-5 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
                    >
                      <span>Check In</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: GEOFENCED GPS CHECK-IN GATE */}
        {activeStep === "checkin" && selectedTask && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8 rounded-md border border-slate-200 bg-white space-y-6 shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <button
                onClick={() => setActiveStep("radar")}
                className="text-xs text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1"
              >
                â† Back to Radar
              </button>
              <span className="text-xs font-mono font-bold text-blue-600">Step 1 of 2: GPS Gate</span>
            </div>

            <div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold uppercase font-mono">
                Hardware Geofence Check
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">{selectedTask.store_name}</h2>
              <p className="text-xs text-slate-500">{selectedTask.address}</p>
            </div>

            {/* Radar Distance Meter */}
            <div className="p-6 rounded-md bg-slate-50 border border-slate-200 text-center space-y-4">
              <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full border-2 border-dashed animate-spin ${isWithinGeofence ? "border-emerald-500/50" : "border-rose-500/50"}`} style={{ animationDuration: "12s" }} />
                <div className={`w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-sm ${isWithinGeofence ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                  <Navigation className="w-6 h-6 mb-1" />
                  <span className="text-xs font-bold font-mono">{userDistance}m</span>
                </div>
              </div>

              <div>
                <span className={`text-xs font-bold px-3.5 py-1 rounded-md ${isWithinGeofence ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-800 border border-rose-200"}`}>
                  {isWithinGeofence ? "âœ“ Inside Geofence (Unlocked)" : "âš  Outside Geofence Perimeter"}
                </span>
                <p className="text-xs text-slate-600 mt-2">
                  Allowed perimeter radius: <strong className="text-slate-900">{selectedTask.geofence_radius_meters} meters</strong>.
                </p>
              </div>

              {/* Simulation Toggles for testing */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={handleSimulateMoveCloser}
                  className="px-3.5 py-2 rounded-md bg-white hover:bg-slate-100 text-xs font-bold text-slate-800 border border-slate-200 shadow-sm"
                >
                  ðŸ“ Simulate Inside (24m)
                </button>
                <button
                  onClick={handleSimulateMoveAway}
                  className="px-3.5 py-2 rounded-md bg-white hover:bg-slate-100 text-xs font-bold text-slate-800 border border-slate-200 shadow-sm"
                >
                  ðŸš« Simulate Spoof/Outside (280m)
                </button>
              </div>
            </div>

            <button
              onClick={() => setActiveStep("audit")}
              disabled={!isWithinGeofence}
              className="w-full py-4 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2"
            >
              <span>Unlock & Begin Evidence Capture</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* STEP 3: MULTI-MODAL EVIDENCE CAPTURE FORM */}
        {activeStep === "audit" && selectedTask && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8 rounded-md border border-slate-200 bg-white space-y-6 shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <button
                onClick={() => setActiveStep("checkin")}
                className="text-xs text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1"
              >
                â† Back to Geofence
              </button>
              <span className="text-xs font-mono font-bold text-emerald-600">Step 2 of 2: Evidence Proofs</span>
            </div>

            <div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold uppercase font-mono">
                Active Audit Execution
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">{selectedTask.store_name}</h2>
              <p className="text-xs text-slate-500">Reward upon AI verification: <strong className="text-emerald-600 font-mono font-bold">${selectedTask.payout} USD</strong></p>
            </div>

            <div className="space-y-5">
              
              {/* Question 1: Shelf Photo Upload */}
              <div className="p-5 rounded-md bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-blue-600" />
                    <span>1. Capture Wide-Angle Shelf Facing Photo</span>
                  </label>
                  <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono font-bold">AI CV Engine</span>
                </div>
                
                {photoCaptured ? (
                  <div className="relative rounded-md overflow-hidden border border-blue-200">
                    <img 
                      src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80" 
                      alt="Shelf capture" 
                      className="w-full h-44 object-cover"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] px-2.5 py-1 rounded-md font-bold shadow-sm">
                      âœ“ EXIF Validated
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setPhotoCaptured(true)}
                    className="w-full py-8 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-md bg-white flex flex-col items-center justify-center text-slate-600 hover:text-slate-900 transition-all gap-2"
                  >
                    <UploadCloud className="w-7 h-7 text-blue-600" />
                    <span className="text-xs font-bold">Tap to Take or Upload Shelf Photo</span>
                  </button>
                )}
              </div>

              {/* Question 2: OOS Checklist */}
              <div className="p-5 rounded-md bg-slate-50 border border-slate-200 space-y-2.5">
                <label className="text-xs font-bold text-slate-900 block">
                  2. Are any target SKUs completely Out-of-Stock (OOS)?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["None (Full Stock)", "1-2 SKUs OOS", "Heavy OOS (>3 SKUs)", "Section Empty"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setOosStatus(opt)}
                      className={`p-3 rounded-md text-xs font-bold transition-colors ${
                        oosStatus === opt ? "bg-blue-600 text-white shadow-sm" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Shelf Tag Price */}
              <div className="p-5 rounded-md bg-slate-50 border border-slate-200 space-y-2">
                <label className="text-xs font-bold text-slate-900 block">
                  3. Shelf Price Tag Amount ($ USD)
                </label>
                <input
                  type="text"
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  className="w-full p-3.5 rounded-md bg-white border border-slate-200 text-slate-900 text-xs font-mono font-bold focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Question 4: Audio Voice Note */}
              <div className="p-5 rounded-md bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <Mic className="w-4 h-4 text-rose-500" />
                    <span>4. Record 30-Second Voice Diary</span>
                  </label>
                  <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded font-mono font-bold">NLP Sentiment</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-md bg-white border border-slate-200">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsRecordingAudio(!isRecordingAudio);
                        setAudioCaptured(true);
                      }}
                      className={`p-2.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-colors ${
                        isRecordingAudio ? "bg-rose-600 text-white animate-pulse" : "bg-slate-100 text-slate-800 border border-slate-200"
                      }`}
                    >
                      {isRecordingAudio ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-rose-500" />}
                      <span>{isRecordingAudio ? "Stop (0:18)" : audioCaptured ? "Re-record" : "Record Voice"}</span>
                    </button>
                    {audioCaptured && (
                      <span className="text-xs text-emerald-600 font-bold">âœ“ Audio file attached (2.4 MB)</span>
                    )}
                  </div>
                </div>
              </div>

            </div>

            <button
              onClick={handleExecuteAuditSubmission}
              disabled={isSubmitting}
              className="w-full py-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Submitting to AI Engine...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
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
            className="p-6 sm:p-8 rounded-md border border-slate-200 bg-white space-y-6 shadow-sm"
          >
            <div className="text-center pb-4 border-b border-slate-100">
              <div className="w-14 h-14 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">AI Quality Verification Complete</h2>
              <p className="text-xs text-slate-500 mt-1">Computer vision, acoustic sentiment, and hardware geofence analysis complete.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-4 rounded-md bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Overall AI Grade</span>
                <span className={`text-xl font-bold font-mono ${submissionResult.overall_quality_score >= 85 ? "text-emerald-600" : "text-rose-600"}`}>
                  {submissionResult.overall_quality_score}%
                </span>
              </div>
              <div className="p-4 rounded-md bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Planogram Match</span>
                <span className="text-xl font-bold text-blue-600 font-mono">
                  {submissionResult.planogram_compliance}%
                </span>
              </div>
              <div className="p-4 rounded-md bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Shelf Emptiness</span>
                <span className="text-xl font-bold text-cyan-600 font-mono">
                  {submissionResult.shelf_emptiness}%
                </span>
              </div>
              <div className="p-4 rounded-md bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Escrow Payout</span>
                <span className="text-xl font-bold text-emerald-600 font-mono">
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
              className="w-full py-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              Return to Radar & Find More Audits
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}


