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
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none mix-blend-screen"></div>
      
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

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
        <BigCounter end={3} suffix="+" label="Years Experience" />
        <BigCounter end={40} suffix="+" label="Projects Built" />
        <BigCounter end={99} suffix="" label="Performance Score" />
      </div>
    </section>
  );
}
