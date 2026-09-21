"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("PulseAI App Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center mb-4">
        âš 
      </div>
      <h2 className="text-2xl font-black text-white mb-2">Something went wrong!</h2>
      <p className="text-xs text-slate-400 max-w-md mb-6">{error.message || "An unexpected error occurred during rendering."}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}


