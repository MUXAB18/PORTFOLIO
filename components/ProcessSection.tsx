"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "DISCOVER",
    desc: "Understand the problem, audience, requirements, and goals. We dive deep into your business logic to ensure we are solving the right problems from day one.",
    icon: (
      <svg className="w-6 h-6 md:w-8 md:h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  },
  {
    num: "02",
    title: "PLAN",
    desc: "Define architecture, features, technology, and development strategy. We architect a scalable foundation that anticipates future growth.",
    icon: (
      <svg className="w-6 h-6 md:w-8 md:h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    )
  },
  {
    num: "03",
    title: "DESIGN",
    desc: "Create the interface, user experience, structure, and visual direction. We craft pixel-perfect, accessible designs that engage and convert.",
    icon: (
      <svg className="w-6 h-6 md:w-8 md:h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  {
    num: "04",
    title: "DEVELOP",
    desc: "Build the product using modern technologies and clean engineering practices. We write robust, type-safe code tailored for performance.",
    icon: (
      <svg className="w-6 h-6 md:w-8 md:h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    num: "05",
    title: "TEST",
    desc: "Check responsiveness, performance, functionality, accessibility, and edge cases. We rigorously test across devices to ensure a flawless experience.",
    icon: (
      <svg className="w-6 h-6 md:w-8 md:h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    num: "06",
    title: "DEPLOY",
    desc: "Launch, monitor, optimize, and continuously improve the product. We ensure a smooth rollout and setup CI/CD for ongoing feature delivery.",
    icon: (
      <svg className="w-6 h-6 md:w-8 md:h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-navy relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left Side: Header */}
        <div className="w-full lg:w-1/3 flex flex-col justify-start">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans font-bold text-xs tracking-[0.3em] text-teal uppercase mb-6 block"
          >
            MY PROCESS
          </motion.span>
          
          <h2 className="font-sans font-black text-5xl md:text-7xl text-white leading-[0.9] tracking-tighter mb-8 flex flex-col">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              >
                From idea
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                className="text-white/40"
              >
                to reality.
              </motion.div>
            </div>
          </h2>
          
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-sans text-base md:text-lg text-white/50 leading-relaxed"
          >
            Every project follows a thoughtful process — from understanding the problem to building, testing, and delivering the final experience.
          </motion.p>
        </div>

        {/* Right Side: Accordion */}
        <div className="w-full lg:w-2/3 flex flex-col gap-2">
          {steps.map((step, i) => {
            const isActive = activeStep === i;
            
            return (
              <motion.div
                key={step.num}
                layout
                initial={false}
                onMouseEnter={() => setActiveStep(i)}
                onClick={() => setActiveStep(i)}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`group relative flex flex-col justify-center overflow-hidden rounded-2xl cursor-pointer border-l-4 transition-colors duration-500 ${
                  isActive 
                    ? "bg-[#1a1f2e] border-teal" 
                    : "bg-transparent border-white/5 hover:bg-white/[0.02]"
                }`}
                style={{
                  height: isActive ? "auto" : "80px",
                }}
              >
                {/* Active Background Glow */}
                {isActive && (
                  <motion.div 
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-gradient-to-r from-teal/5 to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}

                <div className="relative z-10 flex flex-col w-full h-full p-6 md:px-10">
                  {/* Always Visible Row: Number + Title */}
                  <motion.div layout className="flex items-center gap-6 md:gap-12 w-full h-[32px]">
                    <span className={`font-sans font-black text-xl md:text-2xl transition-colors duration-500 ${
                      isActive ? "text-teal" : "text-white/20 group-hover:text-white/40"
                    }`}>
                      {step.num}
                    </span>
                    <h3 className={`font-sans font-black text-2xl md:text-3xl tracking-wide transition-colors duration-500 ${
                      isActive ? "text-white" : "text-white/50 group-hover:text-white/80"
                    }`}>
                      {step.title}
                    </h3>
                  </motion.div>

                  {/* Expandable Content */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex flex-col md:flex-row gap-6 md:gap-10 items-start overflow-hidden"
                      >
                        {/* Icon Box */}
                        <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-xl bg-navy border border-white/5 shadow-inner flex items-center justify-center">
                          {step.icon}
                        </div>
                        
                        {/* Description */}
                        <p className="font-sans text-base md:text-lg text-white/60 leading-relaxed md:leading-loose">
                          {step.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
