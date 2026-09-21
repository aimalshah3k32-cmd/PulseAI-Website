"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Building2,
  Smartphone,
  ArrowRight,
  X,
  MessageCircle,
} from "lucide-react";

export function FloatingCTA() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex flex-col gap-2 p-3 rounded-2xl bg-white/95 border border-slate-200 shadow-2xl backdrop-blur-xl w-64"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 font-heading uppercase tracking-wider">
                Get Started
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* CTAs */}
            <Link
              href="/register/client"
              className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all group"
            >
              <div className="p-2 rounded-lg bg-blue-600 shadow-md shadow-blue-600/30">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-900">
                  Register as Client
                </div>
                <div className="text-[10px] text-slate-500">
                  Launch your first audit
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/register/shopper"
              className="flex items-center gap-3 p-3 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-all group"
            >
              <div className="p-2 rounded-lg bg-orange-500 shadow-md shadow-orange-500/30">
                <Smartphone className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-900">
                  Join as Shopper
                </div>
                <div className="text-[10px] text-slate-500">
                  Start earning today
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-orange-500 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/pilot-builder"
              className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all group"
            >
              <div className="p-2 rounded-lg bg-blue-700 shadow-md shadow-blue-700/30">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-900">
                  Request a Proposal
                </div>
                <div className="text-[10px] text-slate-500">
                  Instant RFP Builder
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all ${
          isExpanded
            ? "bg-slate-800 shadow-slate-800/40"
            : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/40"
        }`}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}


