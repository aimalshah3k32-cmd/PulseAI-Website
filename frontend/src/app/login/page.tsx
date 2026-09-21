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
      icon: <Building2 className="w-5 h-5 text-blue-600" />,
    },
    shopper: {
      title: "Shopper / Evaluator Portal",
      subtitle: "Access mystery audits, photo submissions & instant payout balance",
      defaultEmail: "tariq@shopper.pulseai.io",
      defaultPass: "shopper123",
      registerLink: "/register/shopper",
      registerLabel: "New Evaluator? Apply & Get Certified",
      destination: "/shopper",
      icon: <Smartphone className="w-5 h-5 text-emerald-600" />,
    },
    admin: {
      title: "AI QC Command Center",
      subtitle: "System super-admin, CV moderation & node operations",
      defaultEmail: "admin@pulseai.io",
      defaultPass: "admin123",
      registerLink: "/register/client",
      registerLabel: "Need Enterprise Access?",
      destination: "/admin",
      icon: <ShieldAlert className="w-5 h-5 text-slate-600" />,
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
        const apiBase = (typeof window !== "undefined" && `${window.location.protocol}//${window.location.hostname}:8000/api/v1`) || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
        const res = await axios.post(`${apiBase}/auth/login`, {
          email,
          password
        }, { timeout: 6000 });
        
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
        throw backendErr;
      }

      setSuccessMsg(`âœ“ Authentication Verified. Entering ${portalConfigs[activePortal].title}...`);
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">

      <div className="sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
        
        {/* Logo & Headline */}
        <div className="text-center mb-7">
          <Link href="/" className="inline-flex items-center gap-2.5 group mb-4">
            <div className="w-11 h-11 rounded-md bg-blue-600 flex items-center justify-center font-bold text-white text-lg shadow-sm">
              P
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-2xl tracking-tight text-slate-900 flex items-center gap-1.5">
                Pulse<span className="text-blue-600">AI</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest -mt-1">
                Shopmetrics Gateway
              </span>
            </div>
          </Link>

          <h1 className="font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Sign In to Your Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            Single sign-on gateway for Clients, Mystery Shoppers &amp; Quality Auditors.
          </p>
        </div>

        {/* Portal Switcher Tabs */}
        <div className="grid grid-cols-3 p-1.5 bg-white rounded-md border border-slate-200 mb-6 shadow-sm">
          <button
            type="button"
            onClick={() => switchPortal("client")}
            className={`py-2.5 px-2 text-xs font-bold rounded-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              activePortal === "client"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Building2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Client Portal</span>
          </button>

          <button
            type="button"
            onClick={() => switchPortal("shopper")}
            className={`py-2.5 px-2 text-xs font-bold rounded-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              activePortal === "shopper"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Shopper PWA</span>
          </button>

          <button
            type="button"
            onClick={() => switchPortal("admin")}
            className={`py-2.5 px-2 text-xs font-bold rounded-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              activePortal === "admin"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">AI QC Admin</span>
          </button>
        </div>

        {/* Main Auth Card */}
        <div className="rounded-md border border-slate-200 bg-white p-6 sm:p-8 shadow-sm relative overflow-hidden">
          
          {/* Active Portal Header */}
          <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-100">
            <div className="p-2.5 rounded-md bg-slate-50 border border-slate-200 shrink-0">
              {portalConfigs[activePortal].icon}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">
                {portalConfigs[activePortal].title}
              </div>
              <div className="text-[11px] text-slate-500 leading-tight">
                {portalConfigs[activePortal].subtitle}
              </div>
            </div>
          </div>

          {/* Error / Success Banners */}
          {errorMsg && (
            <div className="p-3.5 mb-4 rounded-md bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 mb-4 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                {activePortal === "client" ? "Corporate Email" : "Registered Email"}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Password
                </label>
                <span className="text-[11px] text-blue-600 hover:underline cursor-pointer">
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
                  className="w-full pl-10 pr-10 py-3 rounded-md border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to {activePortal === "client" ? "Client Studio" : activePortal === "shopper" ? "Shopper Radar" : "AI QC Command"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Dedicated Registration Link */}
          <div className="mt-5 pt-4 border-t border-slate-100 text-center">
            <Link
              href={portalConfigs[activePortal].registerLink}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{portalConfigs[activePortal].registerLabel} â†’</span>
            </Link>
          </div>

        </div>

        {/* Quick Registration Cards Footer */}
        <div className="mt-6 grid grid-cols-2 gap-3 text-center">
          <Link
            href="/register/client"
            className="p-3.5 rounded-md border border-slate-200 bg-white hover:border-blue-500 transition-colors flex flex-col items-center gap-1 group shadow-sm"
          >
            <Building2 className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800">Register as Client</span>
            <span className="text-[10px] text-slate-400">Launch Brand Audits</span>
          </Link>

          <Link
            href="/register/shopper"
            className="p-3.5 rounded-md border border-slate-200 bg-white hover:border-emerald-500 transition-colors flex flex-col items-center gap-1 group shadow-sm"
          >
            <Smartphone className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800">Join as Shopper</span>
            <span className="text-[10px] text-slate-400">Earn from Field Missions</span>
          </Link>
        </div>

      </div>

    </div>
  );
}


