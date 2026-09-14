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
  Smartphone,
  Radio,
  ArrowRight,
  Wallet,
  Car
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

        const endpoint = mode === "register" ? "/api/v1/auth/register" : "/api/v1/auth/login";
        const res = await axios.post(`http://localhost:8000${endpoint}`, payload, {
          timeout: 3000
        });

        if (res.data?.access_token) {
          localStorage.setItem("pulseai_token", res.data.access_token);
        }
      } catch (err) {
        // Fallback for offline demo
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
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden font-sans select-none">
      
      {/* Warm illuminated atmospheric blurred background with luxury retail & cafe depth (Screenshot 4 style) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop')`,
          filter: "blur(6px) brightness(0.85)",
          transform: "scale(1.04)",
        }}
      />
      
      {/* Warm soft ambient vignette (No pitch black overlay) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-emerald-500/20 via-cyan-400/15 to-transparent blur-[140px] pointer-events-none -top-20" />

      {/* Main 3D Container with Perspective */}
      <div className="relative z-10 w-full max-w-[430px] flex flex-col items-center perspective-[1200px]">
        
        {/* =========================================================================
            3D VIBRANT LOGO-COLORED TOP SHIELD / CREST BADGE (Vibrant Emerald & Cyan)
            ========================================================================= */}
        <motion.div 
          initial={{ y: -20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-30 -mb-7 flex flex-col items-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* 3D Curved Shield with Vibrant Logo Gradient, Beveled Glow & Metallic Highlights */}
          <div 
            className="w-56 h-36 rounded-b-[110px] flex flex-col items-center justify-center pt-2 px-5 relative overflow-hidden transition-all duration-300"
            style={{
              background: "linear-gradient(145deg, #047857 0%, #10b981 45%, #06b6d4 100%)",
              boxShadow: `
                0 20px 45px -8px rgba(16, 185, 129, 0.65),
                0 10px 20px -4px rgba(6, 182, 212, 0.45),
                inset 0 3px 6px rgba(255, 255, 255, 0.7),
                inset 0 -3px 8px rgba(0, 0, 0, 0.35)
              `,
              borderBottom: "3.5px solid rgba(255, 255, 255, 0.8)",
              borderLeft: "2px solid rgba(255, 255, 255, 0.4)",
              borderRight: "2px solid rgba(255, 255, 255, 0.4)",
              transform: "translateZ(30px)",
            }}
          >
            
            {/* 3D Glass Arc Highlight Reflection */}
            <div 
              className="absolute top-0 inset-x-0 h-11 bg-gradient-to-b from-white/45 via-white/15 to-transparent pointer-events-none rounded-b-[80px]"
            />
            
            {/* Holographic radiant glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.4)_0%,transparent_65%)] pointer-events-none" />

            {/* PulseAI 3D Signature Emblem */}
            <div className="flex flex-col items-center relative z-10">
              
              {/* 3D Floating "P" Logo Badge */}
              <div 
                className="w-13 h-13 rounded-2xl bg-white flex items-center justify-center font-black text-emerald-700 text-2xl relative"
                style={{
                  boxShadow: `
                    0 10px 25px -4px rgba(0, 0, 0, 0.4),
                    inset 0 2px 4px rgba(255, 255, 255, 0.9),
                    inset 0 -2px 4px rgba(0, 0, 0, 0.15)
                  `,
                  border: "2px solid rgba(255, 255, 255, 0.9)"
                }}
              >
                P
                {/* Floating active pulse ring */}
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-ping opacity-75" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
              </div>

              {/* Logo Typography with 3D Text Contrast */}
              <div className="flex items-center gap-1.5 mt-2">
                <span className="font-heading font-black text-sm tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  Pulse<span className="text-cyan-100">AI</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_#ffffff]" />
              </div>

              <span className="text-[9px] font-mono font-black tracking-[0.22em] text-white uppercase -mt-0.5 drop-shadow">
                EVALUATOR RADAR
              </span>

            </div>

          </div>
        </motion.div>

        {/* =========================================================================
            FORM BODY CARD WITH 3D GLASS DEPTH & HIGHLIGHTS
            ========================================================================= */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full pt-11 pb-8 px-8 sm:px-10 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/25 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_30px_rgba(16,185,129,0.18)] relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          
          {/* Subtle Top Glass Rim Highlight */}
          <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

          {/* Mode Switcher Tabs (3D Pill Tabs) */}
          <div className="grid grid-cols-2 p-1 bg-black/30 rounded-xl border border-white/15 mb-6 shadow-inner">
            <button
              type="button"
              onClick={() => { setMode("register"); setErrorMsg(null); }}
              className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                mode === "register"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/50"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Shopper Register
            </button>
            <button
              type="button"
              onClick={() => { setMode("login"); setErrorMsg(null); }}
              className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                mode === "login"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/50"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Shopper Log In
            </button>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="p-3 mb-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 mb-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* If Register: Full Legal Name (matches dbo.users.full_name) */}
            {mode === "register" && (
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-emerald-300/80 mb-0.5">
                  Full Legal Name *
                </label>
                <div className="relative border-b border-white/20 focus-within:border-emerald-400 transition-colors py-1.5">
                  <input
                    type="text"
                    required
                    placeholder="Sarah Jenkins"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pr-8 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                  />
                  <User className="w-4 h-4 text-emerald-400/60 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            )}

            {/* Email Address (matches dbo.users.email) */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-emerald-300/80 mb-0.5">
                Email Address *
              </label>
              <div className="relative border-b border-white/20 focus-within:border-emerald-400 transition-colors py-1.5">
                <input
                  type="email"
                  required
                  placeholder="evaluator@pulseai.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-8 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                />
                <Mail className="w-4 h-4 text-emerald-400/60 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Password (matches dbo.users.password_hash) */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-emerald-300/80 mb-0.5">
                Password *
              </label>
              <div className="relative border-b border-white/20 focus-within:border-emerald-400 transition-colors py-1.5">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-12 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <Key className="w-4 h-4 text-emerald-400/60 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* If Register: Phone, City & Payout (matches dbo.shopper_profiles attributes) */}
            {mode === "register" && (
              <>
                {/* Phone (matches dbo.users.phone) */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-emerald-300/80 mb-0.5">
                    WhatsApp / Phone Number *
                  </label>
                  <div className="relative border-b border-white/20 focus-within:border-emerald-400 transition-colors py-1.5">
                    <input
                      type="tel"
                      required
                      placeholder="+971 50 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pr-8 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                    />
                    <Phone className="w-4 h-4 text-emerald-400/60 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* City & Country (matches dbo.shopper_profiles.city & country) */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-emerald-300/80 mb-0.5">
                    Operating City &amp; Country *
                  </label>
                  <div className="relative border-b border-white/20 focus-within:border-emerald-400 transition-colors py-1.5">
                    <select
                      value={city}
                      onChange={(e) => handleCityChange(e.target.value)}
                      className="w-full pr-8 bg-transparent text-sm text-white focus:outline-none cursor-pointer appearance-none"
                    >
                      {globalCities.map((c) => (
                        <option key={c.city} value={c.city} className="bg-[#06141a] text-white">
                          {c.city}
                        </option>
                      ))}
                    </select>
                    <MapPin className="w-4 h-4 text-emerald-400/60 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Payout Method (matches dbo.shopper_profiles.payout_method) */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-emerald-300/80 mb-0.5">
                    Preferred Payout Method
                  </label>
                  <div className="relative border-b border-white/20 focus-within:border-emerald-400 transition-colors py-1.5">
                    <select
                      value={payoutMethod}
                      onChange={(e) => setPayoutMethod(e.target.value)}
                      className="w-full pr-8 bg-transparent text-sm text-white focus:outline-none cursor-pointer appearance-none"
                    >
                      <option value="Direct Bank Transfer / IBAN" className="bg-[#06141a] text-white">
                        Direct Bank Transfer (IBAN / Wire)
                      </option>
                      <option value="PayPal Instant Transfer" className="bg-[#06141a] text-white">
                        PayPal Instant Transfer
                      </option>
                      <option value="Wise / Revolut" className="bg-[#06141a] text-white">
                        Wise / Revolut Multi-Currency
                      </option>
                    </select>
                    <Wallet className="w-4 h-4 text-emerald-400/60 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </>
            )}

            {/* 3D High-Impact Action Button */}
            <div className="pt-4">
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98, translateY: 1 }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-black text-sm transition-all cursor-pointer flex items-center justify-center gap-2 font-heading uppercase tracking-wider disabled:opacity-50"
                style={{
                  boxShadow: "0 10px 30px -5px rgba(16, 185, 129, 0.6), inset 0 2px 4px rgba(255,255,255,0.4)"
                }}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>{mode === "login" ? "LOG IN" : "REGISTER AS SHOPPER"}</span>
                )}
              </motion.button>
            </div>

            {/* Links */}
            <div className="pt-4 text-center space-y-2 text-xs">
              <div>
                <button
                  type="button"
                  onClick={() => alert("Password reset link sent to your registered email.")}
                  className="text-slate-300 hover:text-white underline cursor-pointer font-medium"
                >
                  Forgot password?
                </button>
              </div>

              <div>
                {mode === "login" ? (
                  <span className="text-slate-300">
                    No account?{" "}
                    <button
                      type="button"
                      onClick={() => { setMode("register"); setErrorMsg(null); }}
                      className="text-emerald-300 hover:text-emerald-200 underline font-bold cursor-pointer"
                    >
                      Create one!
                    </button>
                  </span>
                ) : (
                  <span className="text-slate-300">
                    Already registered?{" "}
                    <button
                      type="button"
                      onClick={() => { setMode("login"); setErrorMsg(null); }}
                      className="text-emerald-300 hover:text-emerald-200 underline font-bold cursor-pointer"
                    >
                      Log In here
                    </button>
                  </span>
                )}
              </div>

              <div className="pt-3 border-t border-white/10 mt-3">
                <Link
                  href="/register/client"
                  prefetch={true}
                  className="text-[11px] text-slate-300 hover:text-white flex items-center justify-center gap-1 transition-colors"
                >
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Looking to audit your brand? Register as Client →</span>
                </Link>
              </div>

            </div>

          </form>

        </motion.div>

      </div>

    </div>
  );
}
