"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("PulseAI Global Error:", error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center text-center p-4">
        <div className="max-w-md p-8 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center mb-4">
            ⚠
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Application Error</h2>
          <p className="text-xs text-slate-400 mb-6">{error.message || "A critical error occurred."}</p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
