"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Building2, 
  Sparkles, 
  Sliders, 
  BarChart3, 
  ShieldCheck, 
  CheckCircle2, 
  Activity, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Globe2
} from "lucide-react";

export function ExecutiveCtaAnimation() {
  const [isScanning, setIsScanning] = useState(true);

  // 3D Parallax Mouse Physics
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 90, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-7deg", "7deg"]);

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
    <div className="relative w-full overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-[#0c1024] via-[#111638] to-[#080b18] text-white shadow-2xl p-6 sm:p-10 lg:p-12">
      
      {/* Dynamic Animated Ambient Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.35, 0.65, 0.35],
          x: [-20, 20, -20],
          y: [-10, 10, -10],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.55, 0.25],
          x: [20, -20, 20],
          y: [10, -10, 10],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/25 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* Left Column: Executive Value Offer & Action */}
        <div className="lg:col-span-6 text-left space-y-5">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" style={{ animationDuration: "8s" }} />
            <span>Ready to Upgrade Your Audits?</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] text-white">
            Start Measuring Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-white">
              Customer Experience Today
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Deploy mystery shoppers across 50+ GCC locations or set up automated computer vision shelf compliance in minutes. Access live executive dashboards with audited proof of visit.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-blue-500/30 text-left">
            <div>
              <div className="font-heading font-black text-lg text-cyan-400">99.4%</div>
              <div className="text-[11px] text-slate-400 font-bold">Audit Accuracy</div>
            </div>
            <div>
              <div className="font-heading font-black text-lg text-emerald-400">100%</div>
              <div className="text-[11px] text-slate-400 font-bold">GPS Geofenced</div>
            </div>
            <div>
              <div className="font-heading font-black text-lg text-blue-300">&lt; 1 Hour</div>
              <div className="text-[11px] text-slate-400 font-bold">Dispatch Speed</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Link
              href="/register/client"
              className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-xl shadow-cyan-500/20 flex items-center gap-2 font-heading group scale-100 hover:scale-[1.02]"
            >
              <Building2 className="w-4 h-4 text-white" />
              <span>Register as Client</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/pilot-builder"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-black text-xs sm:text-sm rounded-xl transition-all backdrop-blur-md flex items-center gap-2 font-heading scale-100 hover:scale-[1.02]"
            >
              <Sliders className="w-4 h-4 text-amber-300" />
              <span>Configure RFP Pilot</span>
            </Link>
          </div>

        </div>

        {/* Right Column: ANIMATED 3D EXECUTIVE CARD (Continuous Float + Parallax) */}
        <div className="lg:col-span-6">
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
            {/* Background Multi-layer Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-orange-500/30 rounded-3xl blur-2xl opacity-75 -z-10" />

            {/* 3D Motion Container */}
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative rounded-3xl border border-white/20 bg-slate-950/80 backdrop-blur-2xl p-4 sm:p-5 shadow-2xl overflow-hidden group cursor-pointer"
            >
              
              {/* Header Bar with Live Ticker */}
              <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-200">
                    EXECUTIVE AUDIT PORTAL â€¢ LIVE
                  </span>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-[10px] font-mono font-bold text-cyan-300">
                  DUBAI HUB SYNC
                </span>
              </div>

              {/* Main Image Frame with Executive in Dubai Office */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 bg-slate-900 shadow-inner">
                <Image
                  src="/images/dubai-executive-review.jpg"
                  alt="Executive reviewing mystery shopping intelligence in Dubai"
                  fill
                  priority
                  className="object-cover object-center scale-[1.01] group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Animated Sweeping Cyan Laser */}
                {isScanning && (
                  <motion.div
                    animate={{
                      top: ["-10%", "110%"],
                    }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-cyan-400/30 to-blue-500/40 pointer-events-none border-b-2 border-cyan-400 shadow-[0_0_22px_rgba(34,211,238,0.9)] z-20"
                  />
                )}

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/30 pointer-events-none z-10" />

                {/* Live Floating AR Badges */}
                <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between pointer-events-none z-30">
                  
                  {/* Top Floating Badge */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <motion.div
                      animate={{ y: [-3, 3, -3] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-cyan-400/60 backdrop-blur-md text-cyan-300 font-mono text-[11px] font-bold shadow-xl"
                    >
                      <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Live Store Score: 94.2%</span>
                    </motion.div>

                    <motion.div
                      animate={{ y: [3, -3, 3] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-emerald-400/60 backdrop-blur-md text-emerald-400 font-mono text-[11px] font-bold shadow-xl"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Escrow Released</span>
                    </motion.div>
                  </div>

                  {/* Middle Floating Telemetry Box */}
                  <motion.div
                    animate={{ x: [-2, 2, -2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="max-w-xs p-2.5 rounded-2xl bg-slate-950/90 border border-blue-400/50 backdrop-blur-md text-white shadow-2xl"
                  >
                    <div className="text-[10px] text-cyan-300 font-mono font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-cyan-400" />
                      GCC Fleet Intelligence
                    </div>
                    <div className="text-xs font-bold font-heading text-white mt-0.5">
                      52 Active Regional Audits Today
                    </div>
                  </motion.div>

                  {/* Bottom Strip */}
                  <div className="flex items-center justify-between flex-wrap gap-2 pointer-events-auto">
                    <span className="px-2.5 py-1 rounded-lg bg-black/80 border border-white/20 text-white text-[10px] font-mono flex items-center gap-1 backdrop-blur-md">
                      <Globe2 className="w-3 h-3 text-cyan-400" />
                      <span>Burj Khalifa Hub â€¢ Dubai</span>
                    </span>

                    <button
                      onClick={() => setIsScanning(!isScanning)}
                      className="text-[11px] font-mono text-cyan-300 hover:text-white underline cursor-pointer flex items-center gap-1"
                    >
                      <Activity className="w-3 h-3" />
                      <span>{isScanning ? "Pause Scanner" : "Resume Scanner"}</span>
                    </button>
                  </div>

                </div>

              </div>

            </motion.div>
          </motion.div>
        </div>

      </div>

    </div>
  );
}


