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

    const apiBase = (typeof window !== "undefined" && `${window.location.protocol}//${window.location.hostname}:8000/api/v1`) || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanName = fullName.trim();
      const cleanCompany = companyName.trim() || `${cleanName}'s Enterprise`;

      const payload = {
        email: cleanEmail,
        password,
        full_name: cleanName,
        phone: phone.trim() || "+971 50 123 4567",
        role,
        company_name: role === "client" ? cleanCompany : undefined,
        industry: role === "client" ? "Retail & Consumer" : undefined,
        city: role === "shopper" ? city : "Dubai, UAE"
      };

      try {
        const res = await axios.post(`${apiBase}/auth/register`, payload, {
          timeout: 4000
        });

        if (res.data?.access_token) {
          localStorage.setItem("pulseai_token", res.data.access_token);
        }
      } catch (err: any) {
        // If email already exists, attempt automatic login
        if (err.response?.status === 400 || err.response?.data?.detail?.includes("already exists")) {
          try {
            const loginRes = await axios.post(`${apiBase}/auth/login`, {
              email: cleanEmail,
              password
            }, { timeout: 4000 });

            if (loginRes.data?.access_token) {
              localStorage.setItem("pulseai_token", loginRes.data.access_token);
            }
          } catch (loginErr) {
            throw loginErr;
          }
        } else {
          throw err;
        }
      }

      if (role === "client") {
        try {
          localStorage.setItem("pulseai_client_company", cleanCompany);
          localStorage.setItem("pulseai_client_name", cleanName || "Brand Executive");
          localStorage.setItem("pulseai_client_email", cleanEmail);
        } catch {}
        setSuccessMsg(`âœ“ Welcome ${cleanCompany}! Redirecting to Client Studio...`);
        setTimeout(() => router.push("/client"), 700);
      } else {
        try {
          localStorage.setItem("pulseai_shopper_name", cleanName || "Field Evaluator");
          localStorage.setItem("pulseai_shopper_city", city);
          localStorage.setItem("pulseai_shopper_email", cleanEmail);
        } catch {}
        setSuccessMsg(`âœ“ Welcome ${cleanName}! Redirecting to Shopper Radar...`);
        setTimeout(() => router.push("/shopper"), 700);
      }

    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || "Registration error. Please check your details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Breadcrumb Bar */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link href="/" prefetch={true} className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-blue-600 font-bold">Registration Hub</span>
        </div>

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Unified Onboarding Portal</span>
          </div>

          <h1 className="font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Join the PulseAI Intelligence Ecosystem
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl mx-auto">
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
              className={`p-5 rounded-md border transition-colors cursor-pointer ${
                role === "client"
                  ? "bg-blue-50 border-blue-500 shadow-sm"
                  : "bg-white border-slate-200 hover:border-slate-400"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-md ${role === "client" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                  <Building2 className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md ${role === "client" ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-500"}`}>
                  For Brands
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900">Brand Client</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Deploy mystery audits, retail shelf planogram checks, and access real-time executive CX analytics.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>Select Client Account</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Shopper Option Card */}
            <div 
              onClick={() => { setRole("shopper"); setErrorMsg(null); }}
              className={`p-5 rounded-md border transition-colors cursor-pointer ${
                role === "shopper"
                  ? "bg-emerald-50 border-emerald-500 shadow-sm"
                  : "bg-white border-slate-200 hover:border-slate-400"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-md ${role === "shopper" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md ${role === "shopper" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"}`}>
                  For Evaluators
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900">Mystery Shopper</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Visit nearby stores &amp; luxury boutiques, complete photo missions on your mobile, and earn guaranteed cash.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-emerald-600">
                <span>Select Shopper Account</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Trust badge */}
            <div className="p-4 rounded-md bg-white border border-slate-200 text-xs text-slate-500 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>MSPA &amp; ESOMAR Compliance</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                All data is encrypted under SOC-2 Type II standards with strict GDPR &amp; GCC privacy governance.
              </p>
            </div>

          </div>

          {/* Right Column: Dynamic Responsive Form Card */}
          <div className="lg:col-span-8">
            <div className="rounded-md border border-slate-200 bg-white p-6 sm:p-8 shadow-sm relative overflow-hidden">
              
              {/* Role Switcher Tabs */}
              <div className="grid grid-cols-2 p-1.5 bg-slate-50 rounded-md border border-slate-200 mb-6">
                <button
                  type="button"
                  onClick={() => { setRole("client"); setErrorMsg(null); }}
                  className={`py-3 px-3 text-xs sm:text-sm font-bold rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    role === "client"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span>Client Enterprise</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setRole("shopper"); setErrorMsg(null); }}
                  className={`py-3 px-3 text-xs sm:text-sm font-bold rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    role === "shopper"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Smartphone className="w-4 h-4 shrink-0" />
                  <span>Mystery Shopper</span>
                </button>
              </div>

              {/* Feedback Messages */}
              {errorMsg && (
                <div className="p-4 mb-6 rounded-md bg-rose-50 border border-rose-200 text-rose-600 text-xs sm:text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-4 mb-6 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs sm:text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Responsive 2-Column Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Row 1: Full Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
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
                        className="w-full pl-10 pr-4 py-3 rounded-md border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
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
                        className="w-full pl-10 pr-4 py-3 rounded-md border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Phone + Role-Specific Field */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
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
                        className="w-full pl-10 pr-4 py-3 rounded-md border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  {role === "client" ? (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
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
                          className="w-full pl-10 pr-4 py-3 rounded-md border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        City &amp; Country *
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full pl-10 pr-10 py-3 rounded-md border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 cursor-pointer appearance-none transition-colors"
                        >
                          {globalCities.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                          â–¼
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Row 3: Role Service / Payout + Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {role === "client" ? (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Service Needed
                      </label>
                      <div className="relative">
                        <select
                          value={serviceNeeded}
                          onChange={(e) => setServiceNeeded(e.target.value)}
                          className="w-full px-4 pr-10 py-3 rounded-md border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 cursor-pointer appearance-none transition-colors"
                        >
                          <option value="Mystery Shopping & CX Evaluation">Mystery Shopping &amp; CX Audits</option>
                          <option value="Retail Shelf Planogram CV Audits">Retail Planograms &amp; Computer Vision</option>
                          <option value="Video & Audio Mystery Visits">Video &amp; Audio Mystery Audits</option>
                          <option value="Price & Competitor Benchmarking">Price &amp; Competitor Checks</option>
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                          â–¼
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Preferred Payout Method
                      </label>
                      <div className="relative">
                        <select
                          value={payoutMethod}
                          onChange={(e) => setPayoutMethod(e.target.value)}
                          className="w-full px-4 pr-10 py-3 rounded-md border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 cursor-pointer appearance-none transition-colors"
                        >
                          <option value="Direct Bank Transfer / IBAN">Direct Bank Transfer / IBAN</option>
                          <option value="PayPal Fast Cashout">PayPal Instant Transfer</option>
                          <option value="Wise / Revolut Account">Wise / Revolut</option>
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                          â–¼
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 rounded-md border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
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
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Direct Links */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <Link href="/register/client" prefetch={true} className="hover:text-blue-600 underline">
                      Dedicated Client Page
                    </Link>
                    <span>â€¢</span>
                    <Link href="/register/shopper" prefetch={true} className="hover:text-emerald-600 underline">
                      Dedicated Shopper Page
                    </Link>
                  </div>
                  <Link href="/login" prefetch={true} className="text-slate-700 font-bold hover:underline">
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


