"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Scan, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Radio, 
  Globe2, 
  Building2, 
  Smartphone,
  Eye,
  Activity,
  Check
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroVisualAnimation() {
  const [isScanning, setIsScanning] = useState(true);

  // Parallax physics on mouse move
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
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
    <div className="relative w-full">
      
      {/* Continuous Dynamic Floating Animation Wrapper */}
      <motion.div
        animate={{
          y: [-7, 7, -7],
          rotate: [-0.6, 0.6, -0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full"
      >
        {/* Background Soft Glow Aura with Pulse */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.65, 0.95, 0.65],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-2 bg-gradient-to-r from-emerald-500/25 via-blue-500/25 to-cyan-500/25 rounded-3xl blur-2xl -z-10"
        />

        {/* 3D Motion Container */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-3xl border border-slate-200/90 dark:border-blue-500/40 bg-white/95 dark:bg-slate-950/90 backdrop-blur-2xl p-4 sm:p-5 shadow-2xl shadow-blue-500/10 dark:shadow-3d-card overflow-hidden group"
        >
        
        {/* Top Control Bar with Live Status & Mode Pills */}
        <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-200/80 dark:border-slate-800/80">
          
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center">
              <span className="absolute w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold font-heading text-slate-900 dark:text-white uppercase tracking-wider">
                  Live Mystery Audit in Progress
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  AI VISION: 98%
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-[11px] font-bold">
              <Building2 className="w-3 h-3 text-blue-500" />
              <span>Retail &amp; Supermarket</span>
            </span>
          </div>

        </div>

        {/* The Front Picture Frame with Realistic Mystery Shopper */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-inner">
          
          {/* Main Front Picture - Luxury Dubai Mystery Shopping Audit */}
          <Image
            src="/images/undercover-style-hero.jpg"
            alt="PulseAI Luxury Mystery Shopping & Retail Audit in Dubai UAE"
            fill
            priority
            className="object-cover object-center scale-[1.01] group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Animated Green Laser Scanline */}
          {isScanning && (
            <motion.div
              animate={{
                top: ["-10%", "110%"],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-emerald-400/25 to-blue-500/35 pointer-events-none border-b-2 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)] z-20"
            />
          )}

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/30 pointer-events-none z-10" />

          {/* Live Floating AR Badges & Telemetry */}
          <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between pointer-events-none z-30">
            
            {/* Top Row Badges */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/85 border border-emerald-500/50 backdrop-blur-md text-emerald-400 font-mono text-[11px] font-bold shadow-lg"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Shelf Compliance: 100% Passed</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/85 border border-cyan-500/50 backdrop-blur-md text-cyan-300 font-mono text-[11px] font-bold shadow-lg"
              >
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>GPS Check-In: Verified</span>
              </motion.div>

            </div>

            {/* Middle Feature Highlights */}
            <div className="grid grid-cols-2 gap-2 pointer-events-none max-w-sm">
              <div className="p-2 rounded-xl bg-slate-950/85 border border-blue-400/50 backdrop-blur-md text-white shadow-lg">
                <div className="text-[10px] text-blue-300 font-mono font-bold flex items-center gap-1">
                  <Scan className="w-3 h-3 text-blue-400" />
                  Product SKU Detection
                </div>
                <div className="text-xs font-bold font-heading text-white mt-0.5">24 Facings Verified</div>
              </div>

              <div className="p-2 rounded-xl bg-slate-950/85 border border-emerald-400/50 backdrop-blur-md text-white shadow-lg">
                <div className="text-[10px] text-emerald-300 font-mono font-bold flex items-center gap-1">
                  <Eye className="w-3 h-3 text-emerald-400" />
                  Customer Experience
                </div>
                <div className="text-xs font-bold font-heading text-white mt-0.5">98.4% Quality Score</div>
              </div>
            </div>

            {/* Bottom Floating Interactive Registration Bar */}
            <div className="flex items-center justify-between flex-wrap gap-2 pointer-events-auto">
              
              <div className="flex items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-lg bg-black/80 border border-slate-700 text-white text-[10px] font-mono flex items-center gap-1 backdrop-blur-md">
                  <Globe2 className="w-3 h-3 text-emerald-400" />
                  <span>52 Global Hubs Active</span>
                </span>
              </div>

              {/* Instant Simple Registration CTAs */}
              <div className="flex items-center gap-2">
                <Link
                  href="/register/client"
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 !text-white text-xs font-bold font-heading shadow-md shadow-blue-600/30 flex items-center gap-1 scale-100 hover:scale-105 transition-all"
                >
                  <Building2 className="w-3.5 h-3.5 !text-white" />
                  <span>Register Client</span>
                </Link>

                <Link
                  href="/register/shopper"
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 !text-white text-xs font-bold font-heading shadow-md shadow-emerald-600/30 flex items-center gap-1 scale-100 hover:scale-105 transition-all"
                >
                  <Smartphone className="w-3.5 h-3.5 !text-white" />
                  <span>Join Shopper</span>
                </Link>
              </div>

            </div>

          </div>

        </div>

        {/* Micro-Telemetry Bottom Ticker */}
        <div className="mt-2.5 pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Automated Computer Vision &amp; Mystery Visit Sync
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsScanning(!isScanning)}
              className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-1 font-bold"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{isScanning ? "Pause Scanner" : "Resume Scanner"}</span>
            </button>
          </div>
        </div>

      </motion.div>
    </motion.div>
  </div>
);
}


