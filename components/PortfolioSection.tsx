"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TextReveal from "@/components/TextReveal";

import { projects } from "@/data/projects";

export default function PortfolioSection() {
  return (
    <section id="work" className="py-32 px-6 md:px-16 lg:px-24 bg-navy relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Title */}
        <div className="flex flex-col items-center mb-20 relative">
          {/* Premium Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[150px] bg-teal/10 blur-[100px] rounded-full pointer-events-none" />
          
          <TextReveal
            text="PORTFOLIO"
            className="font-sans font-black text-[13vw] md:text-8xl tracking-tighter text-white drop-shadow-lg relative z-10"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
            className="flex items-center justify-center gap-3 mt-2 relative z-10"
          >
            <span className="font-sans font-bold text-sm tracking-widest text-teal uppercase bg-teal/10 px-4 py-1.5 rounded-full border border-teal/20">MY</span>
            <span className="font-script text-4xl text-white/90">projects</span>
          </motion.div>
        </div>



        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {projects.map((project, i) => {
            const cardContent = (
              <>
                {/* Premium Inner Glow */}
                <div className="absolute inset-0 rounded-[32px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] pointer-events-none z-20" />
                
                {/* Image Container */}
                <div className={`w-full p-8 ${project.bgColor} flex items-center justify-center relative border-b border-white/[0.05] overflow-hidden`}>
                  {/* @ts-ignore */}
                  {project.mobileImages ? (
                    <div className="relative w-full aspect-video flex justify-center items-center gap-4 group-hover:scale-[1.05] group-hover:-translate-y-2 transition-all duration-700 ease-out z-10">
                      {/* @ts-ignore */}
                      {project.mobileImages.map((img, idx) => (
                        <div key={idx} className="relative h-[90%] aspect-[9/19.5] rounded-xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-white/10 group-hover:shadow-[0_25px_45px_rgba(0,0,0,0.6)] transition-all duration-700">
                          <Image 
                            src={img} 
                            alt={`${project.title} screenshot ${idx + 1}`} 
                            fill 
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                            quality={85}
                            className="object-cover" 
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover:scale-[1.05] group-hover:-translate-y-2 group-hover:shadow-[0_30px_50px_rgba(0,0,0,0.5)] transition-all duration-700 ease-out z-10">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={90}
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 pt-8 flex flex-col items-start relative z-10 bg-gradient-to-b from-transparent to-black/20 flex-grow">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                    <span className="font-sans font-bold text-[9px] tracking-[0.2em] text-teal uppercase opacity-90">
                      {project.tags}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-2xl text-white mb-4 group-hover:text-teal transition-colors duration-300 drop-shadow-md">
                    {project.title}
                  </h3>
                  <p className="font-sans text-[14px] text-white/60 leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>
              </>
            );

            return (
              <motion.div
                key={project.id}
                data-cursor="project"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-white/[0.02] border border-white/[0.05] rounded-[32px] overflow-hidden group hover:-translate-y-3 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500 shadow-2xl flex flex-col h-full"
              >
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex flex-col w-full h-full cursor-pointer relative z-30">
                    {cardContent}
                  </a>
                ) : (
                  <div className="flex flex-col w-full h-full relative z-30">
                    {cardContent}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
