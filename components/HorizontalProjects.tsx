"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const PROJECTS = [
  {
    num: "01",
    title: "IMAS Worldwide",
    desc: "Luxury travel redefined. Executive chauffeured services platform.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    image: "/imas.png"
  },
  {
    num: "02",
    title: "Rasheed Clothing Intl",
    desc: "Where imagination meets fabrication. Custom premium clothing manufacturer.",
    tags: ["React", "E-Commerce", "Framer Motion"],
    image: "/rasheed.png"
  }
];

export default function HorizontalProjects() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]); // Adjusted for 2 items

  return (
    <section ref={targetRef} className="relative h-[200vh] bg-navy" id="work">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Background Decorative */}
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none "></div>
        <div className="absolute top-10 left-10 md:top-20 md:left-24 z-10">
          <span className="font-sans font-bold text-sm tracking-widest text-teal uppercase block">Selected Work</span>
        </div>

        <motion.div style={{ x }} className="flex h-[70vh] items-center px-10 md:px-24 gap-16 md:gap-32 w-[200vw]">
          {PROJECTS.map((project, idx) => (
            <div 
              key={idx} 
              data-cursor="project"
              className="relative w-[85vw] md:w-[60vw] h-full flex flex-col justify-center group cursor-pointer"
            >
              <div className="w-full h-[60%] md:h-[70%] relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/5 bg-navy-light shadow-2xl">
                {/* Visual Layers */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal/20 rounded-full blur-[80px] group-hover:bg-teal/40 transition-colors duration-700"></div>
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 85vw, 60vw"
                  className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0 object-top"
                />
                
                {/* Large Number Overlay */}
                <span className="absolute bottom-4 right-8 font-sans font-black text-8xl md:text-[180px] leading-none text-white/10 pointer-events-none group-hover:text-teal/20 transition-colors duration-500">
                  {project.num}
                </span>
              </div>

              <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-sans font-black text-3xl md:text-5xl text-white mb-2 group-hover:text-teal transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="font-sans text-white/60 text-sm md:text-lg max-w-xl">
                    {project.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={tag} 
                      className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-wider text-teal bg-teal/10 border border-teal/20 px-3 py-1.5 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
