"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

type AnimationVariant = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scaleIn" | "blur";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const getInitial = (variant: AnimationVariant) => {
  switch (variant) {
    case "fadeUp": return { opacity: 0, y: 24 };
    case "fadeDown": return { opacity: 0, y: -24 };
    case "fadeLeft": return { opacity: 0, x: -30 };
    case "fadeRight": return { opacity: 0, x: 30 };
    case "scaleIn": return { opacity: 0, scale: 0.92 };
    case "blur": return { opacity: 0 };
    default: return { opacity: 0, y: 24 };
  }
};

const getAnimate = (variant: AnimationVariant) => {
  switch (variant) {
    case "fadeUp":
    case "fadeDown": return { opacity: 1, y: 0 };
    case "fadeLeft":
    case "fadeRight": return { opacity: 1, x: 0 };
    case "scaleIn": return { opacity: 1, scale: 1 };
    case "blur": return { opacity: 1 };
    default: return { opacity: 1, y: 0 };
  }
};

export function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.4,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={getInitial(variant)}
      animate={isInView ? getAnimate(variant) : getInitial(variant)}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
