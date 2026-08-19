"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const PROJECTS = [
  {
    num: "01",
    title: "E-Commerce Platform Redesign",
    desc: "A complete architectural overhaul of a legacy e-commerce platform using Next.js App Router and Stripe.",
    problem: "The legacy system was monolithic, causing 4-second load times and poor SEO performance.",
    solution: "Re-architected the frontend to use React Server Components and edge caching, dropping load times to 400ms.",
    result: "42% increase in conversion rate, 100/100 Lighthouse score.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    layout: "image-left"
  },
  {
    num: "02",
    title: "Real-time Analytics Dashboard",
    desc: "A high-performance dashboard handling millions of data points via WebSockets with zero frame drops.",
    problem: "Client's previous dashboard crashed when processing more than 10k concurrent data points.",
    solution: "Implemented a custom WebGL rendering layer and batched WebSocket message processing in Web Workers.",
    result: "Fluid 60FPS rendering of 1M+ data points, zero browser locking.",
    tags: ["React", "WebGL", "WebSockets", "Node.js"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2370&auto=format&fit=crop",
    layout: "image-right"
  },
  {
    num: "03",
    title: "FinTech Mobile Application",
    desc: "A cross-platform mobile wallet application with bank-level encryption and biometric authentication.",
    problem: "Users needed a secure, instantly responsive way to transfer funds internationally.",
    solution: "Built a React Native app connecting to a microservices backend, utilizing secure enclaves for key storage.",
    result: "10k+ downloads in first month, 0 security breaches.",
    tags: ["React Native", "PostgreSQL", "Redis", "Docker"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2370&auto=format&fit=crop",
    layout: "full-width"
  }
];

export default function ProjectLayouts() {
  return (
    <section id="work" className="py-32 px-6 md:px-16 lg:px-24 bg-navy-light relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <span className="font-sans font-bold text-sm tracking-widest text-teal uppercase mb-4 block">Selected Work</span>
          <h2 className="font-sans font-black text-5xl md:text-7xl text-white">CASE <span className="text-stroke">STUDIES</span></h2>
        </div>

        <div className="flex flex-col gap-32">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col gap-12 group cursor-pointer ${
                project.layout === "image-left" ? "lg:flex-row" : 
                project.layout === "image-right" ? "lg:flex-row-reverse" : 
                "lg:flex-col"
              }`}
              data-cursor="project"
            >
              {/* Image Container */}
              <div className={`relative overflow-hidden rounded-3xl bg-navy ${project.layout === "full-width" ? "w-full aspect-[21/9]" : "w-full lg:w-1/2 aspect-[4/3]"}`}>
                <div className="absolute inset-0 bg-teal/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
                />
                
                {/* Large Number Overlay */}
                <span className="absolute -bottom-10 -right-6 font-sans font-black text-[200px] leading-none text-white/5 pointer-events-none group-hover:text-teal/10 transition-colors duration-500">
                  {project.num}
                </span>
              </div>

              {/* Content Container */}
              <div className={`flex flex-col justify-center ${project.layout === "full-width" ? "w-full lg:w-2/3" : "w-full lg:w-1/2"}`}>
                <span className="font-script text-2xl text-teal mb-4">Project {project.num}</span>
                <h3 className="font-sans font-bold text-4xl text-white mb-6 group-hover:text-teal transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-sans text-white/60 text-lg mb-8 leading-relaxed">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-sans text-xs font-bold uppercase tracking-wider text-teal bg-teal/10 border border-teal/20 px-3 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <div>
                    <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-white/30 mb-2">Problem</h4>
                    <p className="font-sans text-white/80 text-sm leading-relaxed">{project.problem}</p>
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-white/30 mb-2">Solution</h4>
                    <p className="font-sans text-white/80 text-sm leading-relaxed">{project.solution}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
