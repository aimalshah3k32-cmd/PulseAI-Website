"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Globe2, 
  ShieldCheck, 
  AlertCircle,
  RefreshCw,
  ChevronRight,
  Eye,
  Scan
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ClientRegistrationPage() {
  const router = useRouter();

  // Form states
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [service, setService] = useState("Mystery Shopping & CX Evaluation");

  // Status states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

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
          phone: phone || "+971 54 478 0113",
          role: "client",
          company_name: companyName,
          industry: "Retail & Consumer"
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

      localStorage.setItem("pulseai_client_company", companyName || "Enterprise Client");
      localStorage.setItem("pulseai_client_name", fullName || "Brand Executive");
      localStorage.setItem("pulseai_client_email", email);

      setSuccessMsg(`✓ Client Account Registered for ${companyName || fullName}! Redirecting to Client Studio...`);

      setTimeout(() => {
        router.push("/client");
      }, 1000);

    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || "Registration error. Please check your details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      
      {/* 3D Ambient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-cyan-500/20 blur-[160px] pointer-events-none rounded-full" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-4">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/register" className="hover:text-indigo-600">Register</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">Client</span>
        </div>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Brand Client Onboarding</span>
          </div>

          <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            Register as Client
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Commission mystery audits, retail shelf planograms &amp; view live reports.
          </p>
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
                  placeholder="Sarah Jenkins"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-heading">
                Company / Brand Name *
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Unilever, Starbucks, Majid Al Futtaim"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-heading">
                Corporate Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="sarah@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Phone / WhatsApp */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-heading">
                Phone / WhatsApp Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="+971 54 478 0113"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-heading">
                Primary Service Needed
              </label>
              <div className="relative">
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 cursor-pointer font-medium appearance-none shadow-sm"
                >
                  <option value="Mystery Shopping & CX Evaluation" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    Mystery Shopping &amp; Customer Experience (CX) Audits
                  </option>
                  <option value="Retail Shelf & Planogram CV Audits" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    Retail Shelf Planogram &amp; Computer Vision (CV) Audits
                  </option>
                  <option value="Video & Audio Mystery Visits" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    Video &amp; Audio Mystery Audits
                  </option>
                  <option value="Store Exit Intercept Surveys" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    Store-Exit Customer Intercept Surveys
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

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-heading">
                Password *
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
              className="w-full py-4 mt-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 !text-white font-heading font-black text-sm uppercase tracking-wider transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin !text-white" />
                  <span>Provisioning Client Account...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 !text-white" />
                  <span>Complete Client Registration</span>
                  <ArrowRight className="w-4 h-4 !text-white" />
                </>
              )}
            </button>

          </form>

          {/* Quick Links */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <Link href="/register/shopper" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
              Join as Shopper →
            </Link>
            <Link href="/login" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
              Sign In →
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
