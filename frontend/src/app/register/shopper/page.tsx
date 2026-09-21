"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Key, 
  User, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  Eye,
  EyeOff,
  Building2,
  Sparkles,
  ArrowRight,
  Wallet,
  ChevronRight,
  TrendingUp,
  MessageCircle
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ShopperRegistrationAndPortalPage() {
  const router = useRouter();

  // Mode: "register" vs "login"
  const [mode, setMode] = useState<"register" | "login">("register");

  // Form states matching pulse_ai_schema.sql (dbo.users & dbo.shopper_profiles)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Dubai, UAE");
  const [country, setCountry] = useState("United Arab Emirates");
  const [payoutMethod, setPayoutMethod] = useState("Direct Bank Transfer / IBAN");
  const [transportMode, setTransportMode] = useState("Car");
  const [showPassword, setShowPassword] = useState(false);

  // Status states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const globalCities = [
    { city: "Dubai, UAE", country: "United Arab Emirates" },
    { city: "Abu Dhabi, UAE", country: "United Arab Emirates" },
    { city: "Sharjah, UAE", country: "United Arab Emirates" },
    { city: "Riyadh, Saudi Arabia", country: "Saudi Arabia" },
    { city: "Jeddah, Saudi Arabia", country: "Saudi Arabia" },
    { city: "Doha, Qatar", country: "Qatar" },
    { city: "Kuwait City, Kuwait", country: "Kuwait" },
    { city: "London, UK", country: "United Kingdom" },
    { city: "New York, USA", country: "United States" },
    { city: "Other International City", country: "Global" }
  ];

  const handleCityChange = (cityName: string) => {
    setCity(cityName);
    const found = globalCities.find((c) => c.city === cityName);
    if (found) setCountry(found.country);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      try {
        // Attributes matched 100% with dbo.users and dbo.shopper_profiles in pulse_ai_schema.sql
        const payload = {
          email,
          password,
          full_name: fullName || "Field Evaluator",
          phone: phone || "+971 50 123 4567",
          role: "shopper",
          city: city,
          country: country,
          payout_method: payoutMethod,
          transport_mode: transportMode,
          trust_score: 95.0,
          kyc_status: "verified"
        };

        const apiBase = (typeof window !== "undefined" && `${window.location.protocol}//${window.location.hostname}:8000/api/v1`) || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
        const endpoint = mode === "register" ? "/auth/register" : "/auth/login";
        const res = await axios.post(`${apiBase}${endpoint}`, payload, {
          timeout: 6000
        });

        if (res.data?.access_token) {
          localStorage.setItem("pulseai_token", res.data.access_token);
        }
      } catch (err: any) {
        throw err;
      }

      // Persist local profile data matching SQL schema
      localStorage.setItem("pulseai_shopper_name", fullName || "Field Evaluator");
      localStorage.setItem("pulseai_shopper_email", email);
      localStorage.setItem("pulseai_shopper_city", city);
      localStorage.setItem("pulseai_shopper_country", country);
      localStorage.setItem("pulseai_shopper_payout_method", payoutMethod);
      localStorage.setItem("pulseai_shopper_trust_score", "95.0");

      if (mode === "register") {
        setSuccessMsg(`✓ Evaluator Profile Activated! Loading Shopper Radar...`);
      } else {
        setSuccessMsg(`✓ Authentication Successful! Loading Shopper Radar...`);
      }

      setTimeout(() => {
        router.push("/shopper");
      }, 700);

    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || "Authentication error. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0e1a] text-slate-900 dark:text-white py-10 px-4 sm:px-6 lg:px-8 relative font-sans transition-colors duration-200">
      
      {/* PulseAI Live Support Floating Icon */}
      <a
        href="https://wa.me/971544780113"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-13 h-13 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer group"
        title="PulseAI Enterprise Concierge"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
      </a>

      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb Bar */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
          <Link href="/" prefetch={true} className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/register" prefetch={true} className="hover:text-blue-600 transition-colors">Register</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-blue-600 dark:text-blue-400 font-bold">Shopper Portal</span>
        </div>

        {/* =========================================================================
            SECTION 1: CREDENTIALS / SHOPPER FORM (AT THE TOP)
            ========================================================================= */}
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm mb-12">
          
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h1 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                Shopper Registration &amp; Portal
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Register as a verified field evaluator or log in to your mystery shopping audit dashboard.
              </p>
            </div>
            
            <Link
              href="/register/client"
              prefetch={true}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Client Portal →</span>
            </Link>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex gap-3 mb-6 p-1.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 w-fit">
            <button
              type="button"
              onClick={() => { setMode("register"); setErrorMsg(null); }}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                mode === "register"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Shopper Register
            </button>
            <button
              type="button"
              onClick={() => { setMode("login"); setErrorMsg(null); }}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                mode === "login"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Shopper Log In
            </button>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="p-4 mb-6 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs sm:text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-4 mb-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* If Register: Full Legal Name */}
            {mode === "register" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Legal Name <span className="text-blue-600 dark:text-blue-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Sarah Jenkins"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#060913] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                />
              </div>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                E-Mail <span className="text-blue-600 dark:text-blue-400">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="evaluator@pulseai.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#060913] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Password <span className="text-blue-600 dark:text-blue-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 pr-10 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#060913] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* If Register: Phone, City & Payout */}
            {mode === "register" && (
              <>
                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Phone / Mobile Number <span className="text-blue-600 dark:text-blue-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 50 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#060913] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                  />
                </div>

                {/* City & Country Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Operating City &amp; Country <span className="text-blue-600 dark:text-blue-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={city}
                        onChange={(e) => handleCityChange(e.target.value)}
                        className="w-full px-4 pr-10 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#060913] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 cursor-pointer appearance-none transition-all"
                      >
                        {globalCities.map((c) => (
                          <option key={c.city} value={c.city}>
                            {c.city}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                        ▼
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Preferred Payout Method
                    </label>
                    <div className="relative">
                      <select
                        value={payoutMethod}
                        onChange={(e) => setPayoutMethod(e.target.value)}
                        className="w-full px-4 pr-10 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#060913] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 cursor-pointer appearance-none transition-all"
                      >
                        <option value="Direct Bank Transfer / IBAN">
                          Direct Bank Transfer (IBAN / Wire)
                        </option>
                        <option value="PayPal Instant Transfer">
                          PayPal Instant Transfer
                        </option>
                        <option value="Wise / Revolut">
                          Wise / Revolut Multi-Currency
                        </option>
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                        ▼
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Submit Action Button */}
            <div className="pt-2 flex items-center justify-between">
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 font-heading uppercase tracking-wider disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{mode === "login" ? "Log In" : "Submit"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>

              <button
                type="button"
                onClick={() => alert("Password reset link sent to your registered email.")}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 underline font-medium cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

          </form>

        </div>

        {/* =========================================================================
            SECTION 2: THEORY SIDE (BELOW THE CREDENTIALS)
            ========================================================================= */}
        <div className="pt-4 pb-10 space-y-6 border-t border-slate-200 dark:border-slate-800">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Field Evaluator &amp; Auditor Network</span>
          </div>

          <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight uppercase leading-snug">
            SHOPPER REGISTRATION: JOIN THE PREMIER FIELD EVALUATOR NETWORK
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
            Welcome to the PulseAI Shopper Portal. As a verified field auditor across Dubai, Abu Dhabi, Riyadh, and GCC markets, you play a vital role in evaluating retail store standards, luxury brand service execution, and customer experience quality.
          </p>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-800 dark:text-slate-100 uppercase tracking-tight mb-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>SHOPPER BENEFITS &amp; GUARANTEED PAYOUTS</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl">
              Evaluators in our network enjoy flexible auditing schedules, instant automated payout transfers via IBAN or PayPal, and direct assignment to top tier luxury retail, dining, automotive, and hospitality audits.
            </p>
          </div>

          <div className="pt-2">
            <h4 className="font-heading font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 mb-2">
              Enhanced Features of Shopper Registration
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Instant dispatch notifications for nearby mystery shopping missions</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Verified trust score tracking &amp; priority assignment for high-value audits</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Direct payout transfers via IBAN, PayPal, or Wise Multi-Currency</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Mobile AI upload portal for photo proof &amp; audio evaluations</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}


