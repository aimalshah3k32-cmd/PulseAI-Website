"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  ChevronRight,
  Eye,
  EyeOff,
  MessageCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ClientRegistrationPage() {
  const router = useRouter();

  // Form states (Credentials)
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [service, setService] = useState("Mystery Shopping & CX Evaluation");
  const [industry, setIndustry] = useState("Retail & Consumer Goods");

  // Status states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

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
        phone: phone.trim() || "+971 54 478 0113",
        role: "client",
        company_name: cleanCompany,
        industry: industry,
        service_needed: service,
        city: "Dubai, UAE",
        country: "United Arab Emirates",
        store_count: "10-50 stores"
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

      // Safely persist client session
      try {
        localStorage.setItem("pulseai_client_company", cleanCompany);
        localStorage.setItem("pulseai_client_name", cleanName || "Brand Executive");
        localStorage.setItem("pulseai_client_email", cleanEmail);
      } catch (storageErr) {
        console.warn("Storage access notice:", storageErr);
      }

      setSuccessMsg(`âœ“ Client Registration Complete for ${cleanCompany}! Redirecting to Client Studio...`);

      setTimeout(() => {
        router.push("/client");
      }, 700);

    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || "Registration error. Please verify your details.");
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
          <span className="text-blue-600 dark:text-blue-400 font-bold">Client Registration</span>
        </div>

        {/* =========================================================================
            SECTION 1: CREDENTIALS / CLIENT REGISTRATION FORM (AT THE TOP)
            ========================================================================= */}
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm mb-12">
          
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h1 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                Client Registration
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Enter your brand credentials to commission audits, track shelf planograms, and view live intelligence reports.
              </p>
            </div>
            
            <Link
              href="/register/shopper"
              prefetch={true}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Shopper Portal â†’</span>
            </Link>
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
            
            {/* Name * */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Name <span className="text-blue-600 dark:text-blue-400">*</span>
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

            {/* Company Name * */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Company Name <span className="text-blue-600 dark:text-blue-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Unilever, Starbucks, Majid Al Futtaim"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#060913] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              />
            </div>

            {/* E-Mail * */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                E-Mail <span className="text-blue-600 dark:text-blue-400">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="sarah@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#060913] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              />
            </div>

            {/* Phone * */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Phone / Mobile Number <span className="text-blue-600 dark:text-blue-400">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+971 54 478 0113"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#060913] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              />
            </div>

            {/* Service & Industry Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Primary Service Needed
                </label>
                <div className="relative">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 pr-10 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#060913] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 cursor-pointer appearance-none transition-all"
                  >
                    <option value="Mystery Shopping & CX Evaluation">Mystery Shopping &amp; CX Evaluation</option>
                    <option value="Retail Shelf Planogram CV Audits">Retail Shelf Planogram &amp; Computer Vision</option>
                    <option value="Video & Audio Mystery Visits">Video &amp; Audio Covert Mystery Visits</option>
                    <option value="Store Exit Intercept Surveys">Store-Exit Customer Intercept Surveys</option>
                    <option value="Price & Competitor Benchmarking">Price &amp; Competitor Benchmarking</option>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                    â–¼
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Industry / Sector
                </label>
                <div className="relative">
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 pr-10 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#060913] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 cursor-pointer appearance-none transition-all"
                  >
                    <option value="Retail & Consumer Goods">Retail &amp; Consumer Goods</option>
                    <option value="Hospitality, Hotels & Dining">Hospitality, Hotels &amp; Dining</option>
                    <option value="Banking & Financial Services">Banking &amp; Financial Services</option>
                    <option value="Automotive & Dealerships">Automotive &amp; Dealerships</option>
                    <option value="FMCG & Supermarkets">FMCG &amp; Supermarkets</option>
                    <option value="Telecom & Electronics">Telecom &amp; Electronics</option>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                    â–¼
                  </div>
                </div>
              </div>
            </div>

            {/* Password * */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Password <span className="text-blue-600 dark:text-blue-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
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

            {/* Submit Action Button */}
            <div className="pt-2">
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 font-heading uppercase tracking-wider disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>

          </form>

        </div>


        {/* =========================================================================
            SECTION 2: THEORY SIDE (BELOW THE CREDENTIALS)
            ========================================================================= */}
        <div className="pt-4 pb-10 space-y-6 border-t border-slate-200 dark:border-slate-800">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enterprise Quality &amp; Intelligence Overview</span>
          </div>

          <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight uppercase leading-snug">
            CLIENT REGISTRATION: TRANSFORM YOUR BUSINESS WITH MYSTERY SHOPPING
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
            Welcome to our client registration portal. As a leading mystery shopping service provider in UAE, we make the registration process simple and efficient for businesses seeking to enhance their customer experience. Start your journey towards service excellence today.
          </p>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-800 dark:text-slate-100 uppercase tracking-tight mb-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>STREAMLINED REGISTRATION BENEFITS</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl">
              Our client registration process opens the door to comprehensive quality assessment services trusted by leading brands across UAE. According to the UAE Chamber of Commerce, businesses using mystery shopping services report a <strong className="text-blue-600 dark:text-blue-400 font-bold">40% improvement in customer satisfaction rates</strong>.
            </p>
          </div>

          <div className="pt-2">
            <h4 className="font-heading font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 mb-2">
              Enhanced Features of Client Registration
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Immediate access to <Link href="/process" prefetch={true} className="text-blue-600 dark:text-blue-400 underline font-medium">our services</Link></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Custom-tailored mystery shopping solutions</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Omnichannel retail, dining, hospitality &amp; automotive audit programs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Computer vision shelf planograms &amp; real-time CX reporting dashboards</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 3: Corporate Growth Team Illustration (At the very bottom) */}
        <div className="my-8 py-6 flex flex-col items-center justify-center text-center border-t border-slate-100 dark:border-slate-800">
          
          <div className="w-full max-w-xl mx-auto p-4 flex flex-col items-center">
            
            {/* Brand Color Swatches */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-4 h-4 rounded-sm bg-blue-600" />
              <span className="w-4 h-4 rounded-sm bg-cyan-500" />
              <span className="w-4 h-4 rounded-sm bg-orange-500" />
              <span className="w-4 h-4 rounded-sm bg-emerald-500" />
              <span className="w-4 h-4 rounded-sm bg-amber-500" />
              <span className="w-4 h-4 rounded-sm bg-slate-700" />
              <span className="w-4 h-4 rounded-sm bg-slate-300" />
            </div>

            {/* SVG team illustration with upward growth arrow */}
            <svg viewBox="0 0 600 240" className="w-full h-auto max-w-lg">
              <defs>
                <linearGradient id="pulseGrowthArrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              
              {/* Upward Growth Arrow */}
              <path
                d="M 310 210 L 410 110 L 400 95 L 470 90 L 465 160 L 450 150 L 350 250 Z"
                fill="url(#pulseGrowthArrowGrad)"
                opacity="0.9"
              />

              {/* Smaller accent arrows */}
              <path d="M 180 160 L 225 115 L 220 105 L 250 105 L 250 135 L 240 130 L 195 175 Z" fill="#6366f1" opacity="0.8" />
              <path d="M 310 120 L 335 95 L 330 90 L 350 90 L 350 110 L 345 105 L 320 130 Z" fill="#06b6d4" opacity="0.75" />

              {/* Character 1: Brand Executive */}
              <circle cx="160" cy="85" r="14" fill="#334155" />
              <circle cx="160" cy="87" r="11" fill="#fed7aa" />
              <path d="M 148 108 C 148 100 172 100 172 108 L 178 200 L 142 200 Z" fill="#4f46e5" />
              <path d="M 146 170 L 174 170 L 172 230 L 148 230 Z" fill="#1e293b" />

              {/* Character 2: AI Analyst with folder */}
              <circle cx="205" cy="98" r="12" fill="#78350f" />
              <circle cx="205" cy="100" r="10" fill="#fde68a" />
              <path d="M 194 120 C 194 114 216 114 216 120 L 218 165 L 192 165 Z" fill="#0d9488" />
              <rect x="200" y="132" width="12" height="16" rx="2" fill="#1e293b" />
              <path d="M 193 165 L 217 165 L 220 230 L 190 230 Z" fill="#334155" />

              {/* Character 3: Field Operations Lead */}
              <circle cx="260" cy="90" r="14" fill="#1e293b" />
              <circle cx="260" cy="93" r="12" fill="#fed7aa" />
              <path d="M 245 115 C 245 108 275 108 275 115 L 278 185 L 242 185 Z" fill="#06b6d4" />
              <path d="M 244 185 L 276 185 L 274 230 L 246 230 Z" fill="#475569" />

              {/* Character 4: CX Director pointing at telemetry screen */}
              <circle cx="345" cy="100" r="14" fill="#475569" />
              <circle cx="345" cy="102" r="11" fill="#fed7aa" />
              <path d="M 330 125 C 330 118 360 118 360 125 L 390 170 L 375 180 L 340 155 L 320 200 Z" fill="#1e293b" />
              <line x1="375" y1="180" x2="405" y2="200" stroke="#a855f7" strokeWidth="3" />

              {/* Character 5: Data Engineer at workstation */}
              <circle cx="420" cy="135" r="12" fill="#1e293b" />
              <circle cx="420" cy="137" r="10" fill="#fed7aa" />
              <path d="M 408 155 C 408 150 432 150 432 155 L 434 200 L 406 200 Z" fill="#6366f1" />
              <rect x="375" y="195" width="80" height="6" rx="2" fill="#cbd5e1" />
            </svg>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 font-medium">
              PulseAI Autonomous CX Intelligence â€¢ Real-Time Field Verification â€¢ Global Enterprise Reach
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}


