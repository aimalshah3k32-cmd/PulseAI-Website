"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Smartphone, 
  ShieldAlert, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  KeyRound, 
  Check, 
  AlertCircle,
  Cpu,
  RefreshCw,
  Globe2,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [activePortal, setActivePortal] = useState<"client" | "shopper" | "admin">("client");
  
  // Form fields
  const [email, setEmail] = useState<string>("client@unilever-cpg.com");
  const [password, setPassword] = useState<string>("client123");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  // Status states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const portalConfigs = {
    client: {
      title: "Client Enterprise Portal",
      subtitle: "Access live campaign audits, planogram compliance & executive reports",
      defaultEmail: "client@unilever-cpg.com",
      defaultPass: "client123",
      registerLink: "/register/client",
      registerLabel: "New Client? Register Brand & RFP",
      destination: "/client",
      icon: <Building2 className="w-5 h-5 text-indigo-500" />,
      colorClass: "from-indigo-600 to-cyan-500"
    },
    shopper: {
      title: "Shopper / Evaluator Portal",
      subtitle: "Access mystery audits, photo submissions & instant payout balance",
      defaultEmail: "tariq@shopper.pulseai.io",
      defaultPass: "shopper123",
      registerLink: "/register/shopper",
      registerLabel: "New Evaluator? Apply & Get Certified",
      destination: "/shopper",
      icon: <Smartphone className="w-5 h-5 text-emerald-500" />,
      colorClass: "from-emerald-600 to-teal-500"
    },
    admin: {
      title: "AI QC Command Center",
      subtitle: "System super-admin, CV moderation & node operations",
      defaultEmail: "admin@pulseai.io",
      defaultPass: "admin123",
      registerLink: "/register/client",
      registerLabel: "Need Enterprise Access?",
      destination: "/admin",
      icon: <ShieldAlert className="w-5 h-5 text-cyan-500" />,
      colorClass: "from-cyan-600 to-indigo-600"
    }
  };

  const switchPortal = (portal: "client" | "shopper" | "admin") => {
    setActivePortal(portal);
    setEmail(portalConfigs[portal].defaultEmail);
    setPassword(portalConfigs[portal].defaultPass);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      let destination = portalConfigs[activePortal].destination;

      try {
        const res = await axios.post("http://localhost:8000/api/v1/auth/login", {
          email,
          password
        }, { timeout: 3000 });
        
        if (res.data?.access_token) {
          localStorage.setItem("pulseai_token", res.data.access_token);
        }

        if (res.data?.user?.role) {
          const userRole = res.data.user.role;
          if (userRole === "super_admin" || userRole === "admin") destination = "/admin";
          else if (userRole === "shopper") destination = "/shopper";
          else destination = "/client";
        }
      } catch (backendErr) {
        // graceful fallback
      }

      setSuccessMsg(`✓ Authentication Verified. Entering ${portalConfigs[activePortal].title}...`);
      setTimeout(() => {
        router.push(destination);
      }, 1000);

    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || "Authentication error. Please check credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      
      {/* 3D Ambient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-cyan-500/20 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-12 right-12 w-[400px] h-[400px] bg-indigo-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
        
        {/* Logo & Headline */}
        <div className="text-center mb-7">
          <Link href="/" className="inline-flex items-center gap-2.5 group mb-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center font-black text-white text-lg shadow-xl shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              P
            </div>
            <div className="flex flex-col text-left">
              <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 font-heading">
                Pulse<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">AI</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </span>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest -mt-1">
                Shopmetrics Gateway
              </span>
            </div>
          </Link>

          <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            Sign In to Your Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5">
            Single sign-on gateway for Clients, Mystery Shoppers &amp; Quality Auditors.
          </p>
        </div>

        {/* Shopmetrics Style Dual Portal Switcher Tabs */}
        <div className="grid grid-cols-3 p-1.5 bg-slate-100 dark:bg-slate-950/90 rounded-2xl border border-slate-200 dark:border-slate-800 mb-6 shadow-inner">
          <button
            type="button"
            onClick={() => switchPortal("client")}
            className={`py-2.5 px-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activePortal === "client"
                ? "bg-indigo-600 !text-white shadow-md shadow-indigo-600/30"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Building2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Client Portal</span>
          </button>

          <button
            type="button"
            onClick={() => switchPortal("shopper")}
            className={`py-2.5 px-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activePortal === "shopper"
                ? "bg-emerald-600 !text-white shadow-md shadow-emerald-600/30"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Shopper PWA</span>
          </button>

          <button
            type="button"
            onClick={() => switchPortal("admin")}
            className={`py-2.5 px-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activePortal === "admin"
                ? "bg-cyan-600 !text-white shadow-md shadow-cyan-600/30"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">AI QC Admin</span>
          </button>
        </div>

        {/* Main Auth Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/80 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Active Portal Header */}
          <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 shrink-0">
              {portalConfigs[activePortal].icon}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                {portalConfigs[activePortal].title}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                {portalConfigs[activePortal].subtitle}
              </div>
            </div>
          </div>

          {/* Error / Success Banners */}
          {errorMsg && (
            <div className="p-3.5 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 mb-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 font-heading">
                {activePortal === "client" ? "Corporate Email" : "Registered Email"}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-heading">
                  Password
                </label>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 mt-2 rounded-2xl bg-gradient-to-r ${portalConfigs[activePortal].colorClass} hover:opacity-95 !text-white font-heading font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin !text-white" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to {activePortal === "client" ? "Client Studio" : activePortal === "shopper" ? "Shopper Radar" : "AI QC Command"}</span>
                  <ArrowRight className="w-4 h-4 !text-white" />
                </>
              )}
            </button>

          </form>

          {/* Dedicated Registration Link */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link
              href={portalConfigs[activePortal].registerLink}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{portalConfigs[activePortal].registerLabel} →</span>
            </Link>
          </div>

        </div>

        {/* Quick Registration Cards Footer */}
        <div className="mt-6 grid grid-cols-2 gap-3 text-center">
          <Link
            href="/register/client"
            className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:border-indigo-500/60 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition-all flex flex-col items-center gap-1 group shadow-sm"
          >
            <Building2 className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Register as Client</span>
            <span className="text-[10px] text-slate-400">Launch Brand Audits</span>
          </Link>

          <Link
            href="/register/shopper"
            className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:border-emerald-500/60 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-all flex flex-col items-center gap-1 group shadow-sm"
          >
            <Smartphone className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Join as Shopper</span>
            <span className="text-[10px] text-slate-400">Earn from Field Missions</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
