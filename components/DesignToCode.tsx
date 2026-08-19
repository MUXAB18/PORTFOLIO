"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function DesignToCode() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const clipPercentage = useTransform(scrollYProgress, [0.3, 0.7], [100, 0]);

  return (
    <section ref={containerRef} className="py-32 bg-navy relative flex flex-col items-center">
      <div className="max-w-5xl w-full px-6 md:px-16 mb-16 text-center">
        <h2 className="font-sans font-black text-4xl md:text-6xl text-white mb-6">
          PIXEL <span className="text-teal">PERFECT</span>
        </h2>
        <p className="font-sans text-white/60 text-lg max-w-2xl mx-auto">
          I bridge the gap between design and engineering, translating complex Figma mockups into flawless, performant code.
        </p>
      </div>

      <div className="relative w-full max-w-5xl h-[350px] sm:h-[450px] md:h-auto md:aspect-video bg-navy-light rounded-2xl md:rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
        
        {/* Layer 1: Code/Development (Background) */}
        <div className="absolute inset-0 bg-[#0d1117] p-4 sm:p-8 md:p-12 font-mono text-[10px] sm:text-xs md:text-sm text-white/70 overflow-hidden">
          <div className="opacity-50">
            <pre><code>{`
function Hero() {
  return (
    <section className="relative h-screen bg-navy">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 dot-grid"
      />
      <div className="container flex flex-col items-center">
        <h1 className="text-8xl font-black text-white">
          BUILD <span className="text-teal">EXPERIENCES</span>
        </h1>
        <Button variant="magnetic">Explore</Button>
      </div>
    </section>
  )
}
            `}</code></pre>
          </div>
        </div>

        {/* Layer 2: Design/Visual (Foreground clipped) */}
        <motion.div 
          className="absolute inset-0 bg-navy flex items-center justify-center p-4 sm:p-8"
          style={{ clipPath: useTransform(clipPercentage, (val) => `inset(0 ${val}% 0 0)`) }}
        >
          <div className="w-full h-full rounded-xl border border-white/5 bg-gradient-to-br from-navy-light to-navy relative overflow-hidden flex flex-col items-center justify-center text-center">
             <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white px-2">
              BUILD <span className="text-teal">EXPERIENCES</span>
            </h1>
            <div className="mt-4 md:mt-8 px-6 md:px-8 py-3 md:py-4 bg-teal text-navy font-bold rounded-full text-sm md:text-base">Explore</div>
          </div>
        </motion.div>

        {/* Slider Line */}
        <motion.div 
          className="absolute top-0 bottom-0 w-1 bg-teal z-20 cursor-ew-resize"
          style={{ left: useTransform(clipPercentage, (val) => `${100 - val}%`) }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-teal rounded-full flex items-center justify-center shadow-lg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="navy" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
