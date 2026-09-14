"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function RouteProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // When route finishes changing, complete the bar
  useEffect(() => {
    setProgress(100);
    const timer = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 250);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  // Intercept all internal link clicks for instant 0ms visual response
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      const targetAttr = target.getAttribute("target");

      // Check if internal navigation link
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("#") &&
        targetAttr !== "_blank" &&
        href !== pathname
      ) {
        setLoading(true);
        setProgress(35);

        // Smooth incremental progress tick while page prepares
        const t1 = setTimeout(() => setProgress(65), 100);
        const t2 = setTimeout(() => setProgress(85), 250);

        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      }
    };

    window.addEventListener("click", handleAnchorClick, { capture: true });
    return () => window.removeEventListener("click", handleAnchorClick, { capture: true });
  }, [pathname]);

  if (!loading && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[99999] pointer-events-none overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 shadow-[0_0_12px_rgba(99,102,241,0.9)] transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transitionProperty: "width, opacity",
        }}
      />
      {/* Moving shimmer gleam */}
      <div 
        className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[1px] animate-pulse"
        style={{ transform: `translateX(${progress}%)` }}
      />
    </div>
  );
}
