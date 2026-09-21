"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Sparkles,
  ShieldCheck,
  Building2,
  Smartphone,
  Terminal,
  MapPin,
  Phone,
  Heart,
  Send,
  ArrowUpRight,
  ChevronUp,
  FileText,
} from "lucide-react";

const footerLinks = {
  solutions: [
    { label: "Mystery Shopping", href: "/process" },
    { label: "Retail Audits", href: "/process" },
    { label: "AI Quality Control", href: "/admin" },
    { label: "Planogram Verification", href: "/process" },
    { label: "Field Work Services", href: "/shopper" },
    { label: "Analytics & Reporting", href: "/case-studies" },
  ],
  resources: [
    { label: "All Resources", href: "#" },
    { label: "Knowledge Base", href: "#" },
    { label: "Documentation", href: "#" },
    { label: "API Console", href: "/api-docs" },
    { label: "MSPA Standards", href: "#" },
  ],
  company: [
    { label: "About Us", href: "/#about" },
    { label: "How It Works", href: "/process" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Careers", href: "#" },
  ],
};

const socialLinks = [
  { label: "Facebook", href: "#", icon: "f" },
  { label: "Twitter", href: "#", icon: "𝕏" },
  { label: "LinkedIn", href: "#", icon: "in" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden">

      {/* ================================================================
          TOP CTA BAND — "Are you ready to get started?"
          ================================================================ */}
      <div className="bg-blue-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Left: CTA Text */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-3">
                Are you ready to get started?
              </h2>
              <p className="text-blue-100 text-sm sm:text-base max-w-lg leading-relaxed">
                Reach out today, and we'll discuss how to elevate your customer experience — together.
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-8">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white text-white font-semibold text-sm hover:bg-white hover:text-blue-600 transition-all"
                >
                  Contact us
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-all"
                >
                  <FileText className="w-4 h-4" />
                  Case Studies
                </Link>
              </div>
            </div>

            {/* Right: Logo + Social */}
            <div className="flex flex-col items-start lg:items-end gap-5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-md bg-white flex items-center justify-center font-bold text-blue-600 text-lg">
                  P
                </div>
                <span className="font-bold text-2xl text-white tracking-tight">PulseAI</span>
              </div>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-sm font-bold transition-colors"
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
          MAIN FOOTER BODY — Dark blue with columns & watermark
          ================================================================ */}
      <div className="bg-blue-700 relative overflow-hidden">

        {/* Giant watermark "PULSE AI" in background */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-end justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span className="text-[12vw] sm:text-[10vw] lg:text-[9vw] font-black text-white/[0.06] tracking-widest leading-none whitespace-nowrap pb-4">
            PULSE AI
          </span>
        </div>

        {/* Divider line + Language/Back to top */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-end gap-6 py-4 border-b border-white/10">
            <span className="text-white/60 text-xs flex items-center gap-1.5">
              🌐 EN
            </span>
            <button
              onClick={scrollToTop}
              className="text-white/60 hover:text-white text-xs flex items-center gap-1 transition-colors cursor-pointer"
            >
              Back to top
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8">

            {/* Column 1: Main Office */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4">
                PulseAI HQ
              </h4>
              <div className="space-y-2 text-blue-200 text-sm leading-relaxed">
                <p>Dubai Internet City</p>
                <p>Building 1, Office 302</p>
                <p>Dubai, UAE</p>
              </div>
              <div className="mt-4 space-y-2">
                <a href="tel:+971544780113" className="text-blue-200 hover:text-white text-sm flex items-center gap-2 transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                  +971 54 478 0113
                </a>
                <a href="mailto:hello@pulseai.io" className="text-blue-200 hover:text-white text-sm flex items-center gap-2 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  hello@pulseai.io
                </a>
              </div>
            </div>

            {/* Column 2: Regional Offices */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4">
                Regional Offices
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-white/80 font-semibold text-sm">London</p>
                  <p className="text-blue-200 text-sm">United Kingdom</p>
                </div>
                <div>
                  <p className="text-white/80 font-semibold text-sm">Lahore</p>
                  <p className="text-blue-200 text-sm">Pakistan</p>
                </div>
              </div>
            </div>

            {/* Column 3: Solutions */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4">
                Solutions
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.solutions.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-blue-200 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4">
                Resources
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-blue-200 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Company */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4">
                Company
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-blue-200 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 6: Who We Work With */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4">
                Who We Work With
              </h4>
              <ul className="space-y-2.5">
                {["Unilever", "Nestlé Global", "L'Oréal Luxe", "Carrefour Group", "Sephora", "Coca-Cola"].map((brand) => (
                  <li key={brand}>
                    <span className="text-blue-200 text-sm">
                      {brand}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-blue-300/60 text-xs">
              © 2026 PulseAI Enterprise. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-blue-300/60">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">GDPR</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
