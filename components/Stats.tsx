"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const BigCounter = ({ end, label, suffix = "" }: { end: number, label: string, suffix?: string }) => {
  const [count, setCount] = useState(0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onViewportEnter={() => {
        let start = 0;
        const duration = 2000;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }}
      className="flex flex-col items-center text-center relative z-10"
    >
      <span className="font-sans font-black text-8xl md:text-[140px] leading-none text-white tracking-tighter" style={{ textShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
        {count}<span className="text-teal">{suffix}</span>
      </span>
      <span className="font-sans font-bold text-sm md:text-lg tracking-widest text-white/50 uppercase mt-4">
        {label}
      </span>
    </motion.div>
  );
};

export default function Stats() {
  return (
    <section className="py-32 px-6 md:px-16 lg:px-24 bg-[#151722] relative overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none "></div>
      
      {/* Decorative floating elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 w-32 h-32 rounded-full bg-teal/5 blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-amber/5 blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 backdrop-blur-md flex justify-center shadow-[0_0_40px_rgba(0,0,0,0.2)] hover:bg-white/[0.04] transition-colors duration-500 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <BigCounter end={1} suffix="+" label="Years Experience" />
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 backdrop-blur-md flex justify-center shadow-[0_0_40px_rgba(0,0,0,0.2)] hover:bg-white/[0.04] transition-colors duration-500 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <BigCounter end={10} suffix="+" label="Projects Built" />
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 backdrop-blur-md flex justify-center shadow-[0_0_40px_rgba(0,0,0,0.2)] hover:bg-white/[0.04] transition-colors duration-500 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <BigCounter end={99} suffix="" label="Performance Score" />
        </div>
      </div>
    </section>
  );
}
