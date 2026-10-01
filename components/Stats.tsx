"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface BigCounterProps {
  end: number;
  label: string;
  suffix?: string;
}

const BigCounter = ({ end, label, suffix = "" }: BigCounterProps) => {
  // Use a ref to update the DOM directly — no React state re-renders per frame
  const numberRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;

    // IntersectionObserver triggers the counter once when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();

        const duration = 2000;
        const start = performance.now();

        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out: 1 - (1 - progress)^3
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * end);
          if (el) el.textContent = String(current);
          if (progress < 1) requestAnimationFrame(tick);
          else if (el) el.textContent = String(end);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center text-center relative z-10"
    >
      <span
        className="font-sans font-black text-5xl sm:text-7xl md:text-[140px] leading-none text-white tracking-tighter"
        style={{ textShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
      >
        <span ref={numberRef}>0</span>
        <span className="text-teal">{suffix}</span>
      </span>
      <span className="font-sans font-bold text-[9px] sm:text-xs md:text-lg tracking-widest text-white/50 uppercase mt-2 md:mt-4">
        {label}
      </span>
    </motion.div>
  );
};

export default function Stats() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none"></div>

      {/* Decorative floating elements — reduced to CSS animation (no framer-motion RAF overhead) */}
      <div
        className="absolute top-20 left-20 w-32 h-32 rounded-full bg-teal/5 blur-3xl pointer-events-none animate-[float1_6s_ease-in-out_infinite]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-amber/5 blur-3xl pointer-events-none animate-[float2_8s_ease-in-out_infinite]"
        aria-hidden="true"
      />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-3 gap-3 md:gap-8 px-2 md:px-0">
        <div className="flex justify-center group">
          <BigCounter end={1} suffix="+" label="Years Experience" />
        </div>
        <div className="flex justify-center group">
          <BigCounter end={10} suffix="+" label="Projects Built" />
        </div>
        <div className="flex justify-center group">
          <BigCounter end={99} suffix="" label="Performance Score" />
        </div>
      </div>
    </div>
  );
}
