"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const SKILL_CATEGORIES = [
  {
    title: "FRONTEND",
    skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind"],
  },
  {
    title: "BACKEND",
    skills: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"],
  },
  {
    title: "CLOUD / TOOLS",
    skills: ["AWS", "Docker", "Git", "GitHub", "Figma"],
  }
];

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-32 px-6 md:px-16 lg:px-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 dot-grid-dense opacity-30  pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 flex flex-col items-center text-center"
        >
          <span className="font-sans font-bold text-sm tracking-widest text-teal uppercase mb-4 block">Ecosystem</span>
          <h2 className="font-sans font-black text-5xl md:text-7xl text-white">TECHNICAL <span className="text-stroke">ARSENAL</span></h2>
          <p className="font-script text-3xl text-teal mt-6 -rotate-2">Tools of the trade ↗</p>
        </motion.div>

        <div className="flex flex-col gap-24">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center"
            >
              <h3 className="font-sans font-bold text-xl tracking-widest text-white/40 uppercase w-48 shrink-0">
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill) => (
                  <button
                    key={skill}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`
                      relative px-6 py-3 rounded-full font-sans text-sm font-semibold tracking-wide transition-all duration-300
                      ${hoveredSkill === skill 
                        ? 'bg-teal text-navy scale-110 shadow-[0_0_20px_rgba(94,201,168,0.4)] z-10' 
                        : hoveredSkill 
                          ? 'bg-navy-light text-white/30 border border-white/5 scale-95' 
                          : 'bg-navy-light text-white/80 border border-border-teal hover:border-teal'
                      }
                    `}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
