"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    const stepTime = (duration * 1000) / end;

    // For large numbers use exponential easing
    if (end > 100) {
      const totalFrames = 60 * duration;
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        // Ease out cubic
        const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
        const current = Math.round(progress * end);
        setCount(current);
        if (frame >= totalFrames) {
          setCount(end);
          clearInterval(timer);
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    } else {
      const timer = setInterval(() => {
        start++;
        setCount(start);
        if (start >= end) {
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, target, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
}
