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
  Scan,
  Coffee,
  Check
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
      // 1. Call backend API
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
          timeout: 4000
        });

        if (res.data?.access_token) {
          localStorage.setItem("pulseai_token", res.data.access_token);
        }
      } catch (err) {
        // Fallback for offline demo
      }

      // 2. Persist local profile data
      if (role === "client") {
        localStorage.setItem("pulseai_client_company", companyName || "Enterprise Client");
        localStorage.setItem("pulseai_client_name", fullName || "Brand Executive");
        localStorage.setItem("pulseai_client_email", email);
        setSuccessMsg(`✓ Welcome ${companyName || fullName}! Redirecting to Client Studio...`);
        setTimeout(() => router.push("/client"), 1000);
      } else {
        localStorage.setItem("pulseai_shopper_name", fullName || "Field Evaluator");
        localStorage.setItem("pulseai_shopper_city", city);
        localStorage.setItem("pulseai_shopper_email", email);
        setSuccessMsg(`✓ Welcome ${fullName}! Redirecting to Shopper Radar...`);
        setTimeout(() => router.push("/shopper"), 1000);
      }

    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || "Registration error. Please check your details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      
      {/* 3D Ambient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-emerald-500/20 blur-[160px] pointer-events-none rounded-full" />

      <div className="sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2.5 group mb-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center font-black text-white text-lg shadow-xl shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              P
            </div>
            <div className="flex flex-col text-left">
              <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 font-heading">
                Pulse<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">AI</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </span>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest -mt-1">
                Fast Registration
              </span>
            </div>
          </Link>

          <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            {role === "client" ? "Simple Client Registration" : "Simple Shopper Registration"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {role === "client" 
              ? "Register your brand to commission mystery audits and retail planograms."
              : "Register as a mystery shopper & auditor to earn money from field visits."}
          </p>
        </div>

        {/* Clean Role Switcher Tabs */}
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
            <span>Client Registration</span>
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
            <span>Shopper Registration</span>
          </button>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Feedback Messages */}
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

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-heading">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder={role === "client" ? "Sarah Jenkins" : "Tariq Mansoor"}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Client-Only: Company Name */}
            {role === "client" && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-heading">
                  Company / Brand Name *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Unilever, Starbucks, Al Futtaim"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-heading">
                {role === "client" ? "Corporate Email Address *" : "Email Address *"}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder={role === "client" ? "name@company.com" : "tariq@gmail.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-heading">
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
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Shopper-Only: City */}
            {role === "shopper" && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-heading">
                  Primary City / Location Hub *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 cursor-pointer font-medium appearance-none shadow-sm"
                  >
                    {globalCities.map((c) => (
                      <option key={c} value={c} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white py-1">
                        {c}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    ▼
                  </div>
                </div>
              </div>
            )}

            {/* Client-Only: Service Needed */}
            {role === "client" && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-heading">
                  Primary Audit Service Required
                </label>
                <div className="relative">
                  <select
                    value={serviceNeeded}
                    onChange={(e) => setServiceNeeded(e.target.value)}
                    className="w-full px-4 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 cursor-pointer font-medium appearance-none shadow-sm"
                  >
                    <option value="Mystery Shopping & CX Evaluation" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      Mystery Shopping &amp; Customer Experience (CX) Audits
                    </option>
                    <option value="Retail Shelf & Planogram CV Audits" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      Retail Shelf Planogram &amp; Computer Vision (CV) Audits
                    </option>
                    <option value="Video / Hidden Camera Audits" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      Video &amp; Audio Mystery Audits
                    </option>
                    <option value="Consumer Intercept Surveys" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      Store-Exit Consumer Intercept Surveys
                    </option>
                    <option value="Price & Competitor Benchmarking" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      Price Tag &amp; Competitor Benchmarking Audits
                    </option>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    ▼
                  </div>
                </div>
              </div>
            )}

            {/* Shopper-Only: Payout Method */}
            {role === "shopper" && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-heading">
                  Preferred Payout Method
                </label>
                <div className="relative">
                  <select
                    value={payoutMethod}
                    onChange={(e) => setPayoutMethod(e.target.value)}
                    className="w-full px-4 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 cursor-pointer font-medium appearance-none shadow-sm"
                  >
                    <option value="Direct Bank Transfer / IBAN" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      Direct Bank Wire / IBAN (Same-Day Settlement)
                    </option>
                    <option value="PayPal Express" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      PayPal Express (Instant Transfer)
                    </option>
                    <option value="Stripe Connect" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      Stripe Direct / Debit Card Payout
                    </option>
                    <option value="USDT Crypto Escrow" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      USDT / Web3 Crypto Escrow
                    </option>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    ▼
                  </div>
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-heading">
                Create Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 mt-3 rounded-2xl font-heading font-black text-sm uppercase tracking-wider transition-all shadow-xl !text-white flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${
                role === "client"
                  ? "bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-indigo-600/30"
                  : "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-emerald-600/30"
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin !text-white" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>{role === "client" ? "Complete Client Registration" : "Join as Field Shopper"}</span>
                  <ArrowRight className="w-4 h-4 !text-white" />
                </>
              )}
            </button>

          </form>

          {/* Quick Sign In Prompt */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
              Sign In Here →
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
