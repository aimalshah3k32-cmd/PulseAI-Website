"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-xl shadow-indigo-600/25">
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div className="absolute inset-0 w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 animate-ping opacity-20" />
        </div>
        <div className="text-sm font-bold text-slate-500 dark:text-slate-400 font-heading animate-pulse">
          Loading...
        </div>
      </motion.div>
    </div>
  );
}
