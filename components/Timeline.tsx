"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TIMELINE_DATA = [
  {
    role: "B.S. Software Engineering",
    company: "Superior University",
    duration: "2023 — 2027",
    responsibilities: [
      "Pursuing a comprehensive degree focusing on software architecture, scalable systems, and modern development practices.",
      "Bridging the gap between academic theory and real-world engineering by building robust full-stack applications.",
      "Specializing in web technologies, database design, and advanced algorithms."
    ],
    tech: ["Software Architecture", "Data Structures", "System Design", "Web Development"]
  },
  {
    role: "Full Stack Developer",
    company: "Vyntech Solutions",
    duration: "2023 — Present",
    responsibilities: [
      "Architected and deployed scalable full-stack applications using Next.js, Node.js, and PostgreSQL.",
      "Optimized legacy database queries, reducing response times by 60% across core API routes.",
      "Mentored junior developers and instituted strict TypeScript migration policies.",
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "AWS"]
  },
  {
    role: "Web Developer",
    company: "Freelance",
    duration: "2021 — 2023",
    responsibilities: [
      "Built custom web applications for international clients focusing on performance and UX.",
      "Integrated third-party payment gateways and CRM systems.",
      "Designed database architectures and RESTful APIs from scratch."
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind"]
  }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-navy relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">

        {/* Left Side: Sticky Header */}
        <div className="w-full lg:w-1/3 relative">
          <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-200px)] flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-sans font-bold text-xs tracking-[0.3em] text-teal uppercase mb-4 block">
                My Path
              </span>
              <h2 className="font-sans font-black text-5xl sm:text-6xl md:text-7xl lg:text-7xl text-white leading-[1] tracking-tighter mb-6 word-break-keep-all">
                EXPERIENCE
                <span
                  className="text-transparent block mt-2"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}
                >
                  & EDUCATION
                </span>
              </h2>
              <p className="font-sans text-white/50 text-base max-w-sm leading-relaxed mb-8">
                A continuous journey of learning and building. From academic foundations at Superior University to architecting scalable systems in production environments.
              </p>

              <div className="w-16 h-1 bg-teal/30 rounded-full"></div>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Timeline Content */}
        <div className="w-full lg:w-2/3 relative">
          {/* Vertical Timeline Line Background */}
          <div className="absolute left-[7px] md:left-[15px] top-4 bottom-0 w-[2px] bg-white/5"></div>

          {/* Animated Glowing Progress Line */}
          <motion.div
            className="absolute left-[7px] md:left-[15px] top-4 w-[2px] bg-gradient-to-b from-teal to-teal/30 z-0 origin-top shadow-[0_0_15px_rgba(94,201,168,0.8)]"
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col gap-12 md:gap-16">
            {TIMELINE_DATA.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative pl-8 md:pl-16 group"
              >
                {/* Timeline Dot (Glowing) */}
                <div className="absolute left-0 md:left-[8px] top-4 md:top-6 w-[16px] h-[16px] rounded-full bg-[#1E2330] border-2 border-teal z-10 shadow-[0_0_15px_rgba(94,201,168,0.6)] group-hover:scale-125 transition-transform duration-300"></div>

                {/* Content Card */}
                <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-3xl hover:border-teal/30 hover:bg-white/[0.03] transition-all duration-500 hover:-translate-y-1">

                  {/* Header Row */}
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-6">
                    <div>
                      <h3 className="font-sans font-black text-2xl md:text-3xl text-white leading-tight tracking-wide mb-1">
                        {exp.role}
                      </h3>
                      <h4 className="font-script text-3xl md:text-4xl text-white/60">
                        {exp.company}
                      </h4>
                    </div>
                    <span className="font-sans font-bold text-xs tracking-widest text-teal uppercase whitespace-nowrap bg-teal/10 px-4 py-2 rounded-full border border-teal/20 self-start">
                      {exp.duration}
                    </span>
                  </div>

                  {/* Responsibilities */}
                  <ul className="flex flex-col gap-3 md:gap-4 mb-8">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 md:gap-4 text-white/70 font-sans text-sm md:text-base leading-relaxed">
                        <span className="text-teal mt-1 flex-shrink-0 text-lg leading-none">▹</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {exp.tech.map((t) => (
                      <span key={t} className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-wider text-white border border-white/10 bg-white/5 px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-teal hover:text-navy hover:border-teal transition-colors duration-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
