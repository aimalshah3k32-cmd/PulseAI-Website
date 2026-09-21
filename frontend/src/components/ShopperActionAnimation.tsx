"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Smartphone, 
  CheckCircle2, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  Radio, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Scan,
  Clock,
  Award,
  Globe2,
  Activity,
  Zap
} from "lucide-react";

export function ShopperActionAnimation() {
  const [bountyClaimed, setBountyClaimed] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  // 3D Parallax physics on mouse move
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 90, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-6deg", "6deg"]);

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

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-emerald-500/30 bg-slate-950 shadow-2xl">
      
      {/* ================================================================
          1. FULL BACKGROUND PICTURE (Attractive Luxury Dubai Mystery Shopper)
          ================================================================ */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/undercover-style-hero.jpg"
          alt="Attractive Luxury Mystery Shopper in Dubai Boutique"
          fill
          priority
          className="object-cover object-center brightness-[0.45] sm:brightness-[0.40] scale-[1.02] transition-transform duration-1000"
        />
        
        {/* Cinematic Multi-stop Dark Gradients for pristine text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
      </div>

      {/* ================================================================
          2. ANIMATED SWEEPING LASER SCANNER ACROSS FULL BACKGROUND
          ================================================================ */}
      {isScanning && (
        <motion.div
          animate={{
            top: ["-5%", "105%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-emerald-400/20 to-cyan-500/30 pointer-events-none border-b-2 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.8)] z-10"
        />
      )}

      {/* ================================================================
          3. FOREGROUND CONTENT & FLOATING INTERACTIVE AR HUD
          ================================================================ */}
      <div className="relative z-20 p-6 sm:p-10 lg:p-14">
        
        {/* Top Status Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-6 mb-8 border-b border-white/15">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <span className="text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider">
              Live Shopper Radar Dispatch
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-mono font-bold text-emerald-300">
              GPS LOCK: 100%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono backdrop-blur-md flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Dubai Mall â€¢ Luxury Fashion &amp; Watch Boutiques</span>
            </span>
          </div>
        </div>

        {/* 2-Column Split: Left Copy & Value Points + Right Floating 3D HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Shopper Benefits */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-widest backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Earn On The Go â€¢ UAE &amp; GCC Evaluator Network</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
              Join 40,000+ Undercover <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300">
                Mystery Shoppers
              </span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
              Turn everyday boutique visits, dining, and luxury shopping into flexible income. Get paid for discreet service evaluations across Dubai, Abu Dhabi, and GCC cities.
            </p>

            {/* Frosted Glass Value Points */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-start gap-3 text-left">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white text-sm font-heading">Sub-Hour Task Dispatch:</span>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">Receive instant geofenced mission notifications whenever you are near partner boutiques.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-start gap-3 text-left">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white text-sm font-heading">Instant Escrow Payouts ($35 - $120+ USD):</span>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">Bounties are automatically approved and credited to your wallet via smart escrow.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-start gap-3 text-left">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white text-sm font-heading">Discreet Mobile Workflow:</span>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">Simple mobile checklists, automated receipt OCR, and voice sentiment recording.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              <Link
                href="/register/shopper"
                className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 !text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-xl shadow-emerald-500/30 flex items-center gap-2 font-heading group scale-100 hover:scale-[1.02]"
              >
                <Smartphone className="w-4 h-4 !text-white" />
                <span>Join as Mystery Shopper (Free)</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform !text-white" />
              </Link>

              <Link
                href="/shopper"
                className="px-5 py-3.5 bg-white/15 hover:bg-white/25 border border-white/25 !text-white font-bold text-xs sm:text-sm rounded-xl transition-all backdrop-blur-md flex items-center gap-2 font-heading scale-100 hover:scale-[1.02]"
              >
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Explore Shopper Radar</span>
              </Link>
            </div>

          </div>

          {/* Right Column: FLOATING 3D AR TELEMETRY CARD (Continuous Float + Parallax) */}
          <div className="lg:col-span-5">
            <motion.div
              animate={{
                y: [-7, 7, -7],
                rotate: [-0.5, 0.5, -0.5],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Outer Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-cyan-500/30 rounded-3xl blur-2xl opacity-75 -z-10" />

              {/* 3D Motion Glass Card */}
              <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                className="rounded-3xl border border-white/25 bg-slate-950/85 backdrop-blur-2xl p-5 sm:p-6 shadow-2xl space-y-5 text-left"
              >
                {/* Header status */}
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-emerald-300">
                      Shopper Biometrics: Verified
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-md">
                    <Clock className="w-3 h-3 text-cyan-300" />
                    <span>Audit Time: 14m</span>
                  </div>
                </div>

                {/* Interactive Mission Reward Escrow Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/40 shadow-inner flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 font-black text-lg">
                      $
                    </div>
                    <div>
                      <div className="text-[10px] text-emerald-300 font-mono font-bold uppercase tracking-wider">
                        Verified Mission Bounty
                      </div>
                      <div className="text-xl font-black font-heading text-white">
                        +$55.00 USD
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setBountyClaimed(!bountyClaimed)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
                      bountyClaimed 
                        ? "bg-emerald-500 text-white shadow-emerald-500/40" 
                        : "bg-emerald-600 hover:bg-emerald-500 text-white"
                    }`}
                  >
                    {bountyClaimed ? "âœ“ Escrow Released" : "Claim Bounty"}
                  </button>
                </div>

                {/* Active Checklist Badges */}
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-300">âœ“ Hardware GPS Check-In</span>
                    <span className="text-emerald-400 font-bold">Passed (18m)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-300">âœ“ Shelf Photo Planogram</span>
                    <span className="text-emerald-400 font-bold">100% Match</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-300">âœ“ Purchase Receipt OCR</span>
                    <span className="text-cyan-300 font-bold">Auto-Validated</span>
                  </div>
                </div>

                {/* Hardware Security Tag */}
                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <span className="flex items-center gap-1 text-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Hardware Anti-Spoofing Active</span>
                  </span>

                  <button
                    onClick={() => setIsScanning(!isScanning)}
                    className="text-cyan-300 hover:text-white underline cursor-pointer flex items-center gap-1"
                  >
                    <Activity className="w-3 h-3" />
                    <span>{isScanning ? "Pause Laser" : "Resume Laser"}</span>
                  </button>
                </div>

              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* Micro-Telemetry Bottom Ticker */}
        <div className="mt-8 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>40,000+ Certified Mystery Evaluators Available Across Dubai, Abu Dhabi, Riyadh &amp; GCC</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-emerald-300">âœ“ Instant Mobile Dispatch</span>
            <span>â€¢</span>
            <span className="text-cyan-300">âœ“ Biometric Vetted</span>
            <span>â€¢</span>
            <span className="text-blue-300">âœ“ Verified Payouts</span>
          </div>
        </div>

      </div>

    </div>
  );
}


