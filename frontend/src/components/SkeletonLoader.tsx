"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "card" | "circle" | "rect";
  count?: number;
}

export function SkeletonLoader({
  className = "",
  variant = "text",
  count = 1,
}: SkeletonProps) {
  const baseClass =
    "animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 bg-[length:200%_100%] animate-shimmer-text rounded-lg";

  const variantStyles: Record<string, string> = {
    text: "h-4 w-full rounded-md",
    card: "h-40 w-full rounded-2xl",
    circle: "h-12 w-12 rounded-full",
    rect: "h-20 w-full rounded-xl",
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${baseClass} ${variantStyles[variant]}`}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}
