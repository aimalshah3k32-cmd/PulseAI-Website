"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Smartphone, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Globe2, 
  ShieldCheck, 
  DollarSign, 
  AlertCircle,
  RefreshCw,
  Eye,
  EyeOff,
  Scan,
  Coffee,
  Check,
  Award,
  Zap,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterHubPage() {
  const router = useRouter();
  const [role, setRole] = useState<"client" | "shopper">("client");

  // Common fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Client specific
  const [companyName, setCompanyName] = useState("");
  const [serviceNeeded, setServiceNeeded] = useState("Mystery Shopping & CX Evaluation");

  // Shopper specific
  const [city, setCity] = useState("Dubai, UAE");
  const [payoutMethod, setPayoutMethod] = useState("Direct Bank Transfer / IBAN");

  // Status
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const globalCities = [
    "Dubai, UAE",
    "Abu Dhabi, UAE",
    "Sharjah & Emirates, UAE",
    "Riyadh, Saudi Arabia",
    "Jeddah, Saudi Arabia",
    "Doha, Qatar",
    "Kuwait City, Kuwait",
    "London, UK",
    "New York, USA",
    "Singapore",
    "Other Global City"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      try {
        const payload = {
          email,
          password,
          full_name: fullName,
          phone: phone || "+971 50 123 4567",
          role,
          company_name: role === "client" ? (companyName || `${fullName}'s Enterprise`) : undefined,
          industry: role === "client" ? "Retail & Consumer" : undefined
        };

        const res = await axios.post("http://localhost:8000/api/v1/auth/register", payload, {
          timeout: 3000
        });

        if (res.data?.access_token) {
          localStorage.setItem("pulseai_token", res.data.access_token);
        }
      } catch (err) {
        // Fallback for offline demo
      }

      if (role === "client") {
        localStorage.setItem("pulseai_client_company", companyName || "Enterprise Client");
        localStorage.setItem("pulseai_client_name", fullName || "Brand Executive");
        localStorage.setItem("pulseai_client_email", email);
        setSuccessMsg(`✓ Welcome ${companyName || fullName}! Redirecting to Client Studio...`);
        setTimeout(() => router.push("/client"), 700);
      } else {
        localStorage.setItem("pulseai_shopper_name", fullName || "Field Evaluator");
        localStorage.setItem("pulseai_shopper_city", city);
        localStorage.setItem("pulseai_shopper_email", email);
        setSuccessMsg(`✓ Welcome ${fullName}! Redirecting to Shopper Radar...`);
        setTimeout(() => router.push("/shopper"), 700);
      }

    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || "Registration error. Please check your details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      
      {/* 3D Ambient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-emerald-500/20 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Breadcrumb Bar */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" prefetch={true} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">Registration Hub</span>
        </div>

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Unified Onboarding Portal</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Join the PulseAI Intelligence Ecosystem
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl mx-auto">
            Choose your account type below to commission enterprise mystery shopping or get paid as a field evaluator.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Role Comparison Cards */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Client Option Card */}
            <div 
              onClick={() => { setRole("client"); setErrorMsg(null); }}
              className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                role === "client"
                  ? "bg-indigo-600/10 border-indigo-500/80 shadow-lg shadow-indigo-600/10 ring-1 ring-indigo-500/50"
                  : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-400"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-2xl ${role === "client" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
                  <Building2 className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${role === "client" ? "bg-indigo-500/20 text-indigo-400" : "bg-slate-200 dark:bg-slate-800 text-slate-400"}`}>
                  For Brands
                </span>
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">Brand Client</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Deploy mystery audits, retail shelf planogram checks, and access real-time executive CX analytics.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                <span>Select Client Account</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Shopper Option Card */}
            <div 
              onClick={() => { setRole("shopper"); setErrorMsg(null); }}
              className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                role === "shopper"
                  ? "bg-emerald-600/10 border-emerald-500/80 shadow-lg shadow-emerald-600/10 ring-1 ring-emerald-500/50"
                  : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-400"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-2xl ${role === "shopper" ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${role === "shopper" ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-200 dark:bg-slate-800 text-slate-400"}`}>
                  For Evaluators
                </span>
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">Mystery Shopper</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Visit nearby stores &amp; luxury boutiques, complete photo missions on your mobile, and earn guaranteed cash.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Select Shopper Account</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Trust badge */}
            <div className="p-4 rounded-2xl bg-slate-100/60 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                <span>MSPA &amp; ESOMAR Compliance</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                All data is encrypted under SOC-2 Type II standards with strict GDPR &amp; GCC privacy governance.
              </p>
            </div>

          </div>

          {/* Right Column: Dynamic Responsive Form Card */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              
              {/* Role Switcher Tabs */}
              <div className="grid grid-cols-2 p-1.5 bg-slate-100 dark:bg-slate-950/90 rounded-2xl border border-slate-200 dark:border-slate-800 mb-6 shadow-inner">
                <button
                  type="button"
                  onClick={() => { setRole("client"); setErrorMsg(null); }}
                  className={`py-3 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    role === "client"
                      ? "bg-indigo-600 !text-white shadow-md shadow-indigo-600/30 scale-[1.01]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span>Client Enterprise</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setRole("shopper"); setErrorMsg(null); }}
                  className={`py-3 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    role === "shopper"
                      ? "bg-emerald-600 !text-white shadow-md shadow-emerald-600/30 scale-[1.01]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Smartphone className="w-4 h-4 shrink-0" />
                  <span>Mystery Shopper</span>
                </button>
              </div>

              {/* Feedback Messages */}
              {errorMsg && (
                <div className="p-4 mb-6 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs sm:text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-4 mb-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Responsive 2-Column Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Row 1: Full Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 font-heading">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Sarah Jenkins"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 font-heading">
                      {role === "client" ? "Corporate Email *" : "Personal Email *"}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder={role === "client" ? "sarah@company.com" : "sarah.shopper@gmail.com"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Phone + Role-Specific Field */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 font-heading">
                      Phone / WhatsApp Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+971 50 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      />
                    </div>
                  </div>

                  {role === "client" ? (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 font-heading">
                        Company / Brand Name *
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Starbucks, Unilever"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 font-heading">
                        City &amp; Country *
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer appearance-none transition-all"
                        >
                          {globalCities.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                          ▼
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Row 3: Role Service / Payout + Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {role === "client" ? (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 font-heading">
                        Service Needed
                      </label>
                      <div className="relative">
                        <select
                          value={serviceNeeded}
                          onChange={(e) => setServiceNeeded(e.target.value)}
                          className="w-full px-4 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 cursor-pointer appearance-none transition-all"
                        >
                          <option value="Mystery Shopping & CX Evaluation">Mystery Shopping &amp; CX Audits</option>
                          <option value="Retail Shelf Planogram CV Audits">Retail Planograms &amp; Computer Vision</option>
                          <option value="Video & Audio Mystery Visits">Video &amp; Audio Mystery Audits</option>
                          <option value="Price & Competitor Benchmarking">Price &amp; Competitor Checks</option>
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                          ▼
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 font-heading">
                        Preferred Payout Method
                      </label>
                      <div className="relative">
                        <select
                          value={payoutMethod}
                          onChange={(e) => setPayoutMethod(e.target.value)}
                          className="w-full px-4 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 cursor-pointer appearance-none transition-all"
                        >
                          <option value="Direct Bank Transfer / IBAN">Direct Bank Transfer / IBAN</option>
                          <option value="PayPal Fast Cashout">PayPal Instant Transfer</option>
                          <option value="Wise / Revolut Account">Wise / Revolut</option>
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                          ▼
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 font-heading">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit CTA Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3.5 px-6 rounded-xl text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed group font-heading mt-2 ${
                    role === "client"
                      ? "bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 shadow-indigo-600/30 hover:from-indigo-500 hover:to-cyan-400"
                      : "bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 shadow-emerald-600/30 hover:from-emerald-500 hover:to-cyan-400"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Activating {role === "client" ? "Client Workspace" : "Shopper Account"}...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {role === "client"
                          ? "Complete Client Registration & Access Studio"
                          : "Activate Evaluator Account & Start Auditing"}
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>

                {/* Direct Links */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-3">
                    <Link href="/register/client" prefetch={true} className="hover:text-indigo-600 dark:hover:text-indigo-400 underline">
                      Dedicated Client Page
                    </Link>
                    <span>•</span>
                    <Link href="/register/shopper" prefetch={true} className="hover:text-emerald-600 dark:hover:text-emerald-400 underline">
                      Dedicated Shopper Page
                    </Link>
                  </div>
                  <Link href="/login" prefetch={true} className="text-slate-700 dark:text-slate-300 font-bold hover:underline">
                    Already registered? Sign In
                  </Link>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
