"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Caveat } from "next/font/google";
import TextReveal from "@/components/TextReveal";

const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

const projects = [
  {
    id: "webifypro",
    title: "Webify Pro",
    category: "CORPORATE",
    image: "/webify-new.png",
    link: "https://webifypro.live",
    description: "Elevate your brand with high-performance web development and strategic digital marketing.",
    tags: "NEXT.JS, TAILWINDCSS, FRAMER MOTION",
    bgColor: "bg-[#1d4ed8]/20"
  },
  {
    id: 1,
    title: "Rasheed Clothing Intl",
    tags: "NEXT.JS, TAILWIND, E-COMMERCE",
    description: "A high-performance modern e-commerce platform built for a premium clothing brand, featuring seamless checkout and dynamic inventory management.",
    image: "/rasheed-new.png",
    bgColor: "bg-[#7c8f9c]/20" // subtle cool tone
  },
  {
    id: 2,
    title: "IMAS Worldwide",
    tags: "REACT, NODE.JS, CORPORATE",
    description: "A comprehensive corporate website and internal management dashboard designed for global operations and client onboarding.",
    image: "/imas-new.png",
    bgColor: "bg-[#e2c179]/20" // subtle warm tone
  }
];

export default function PortfolioSection() {
  return (
    <section id="work" className="py-32 px-6 md:px-16 lg:px-24 bg-navy relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Title */}
        <div className="flex flex-col items-center mb-16 relative">
          <TextReveal
            text="PORTFOLIO"
            className="font-sans font-black text-[13vw] md:text-8xl tracking-tighter text-white"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
            className="flex items-center justify-center gap-3 mt-4"
          >
            <span className="font-sans font-bold text-sm tracking-widest text-teal uppercase">MY</span>
            <span className={`${caveat.className} text-4xl text-white`}>projects</span>
          </motion.div>
        </div>



        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              data-cursor="project"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-[#242837] rounded-[32px] overflow-hidden group hover:-translate-y-2 transition-transform duration-300 shadow-xl"
            >
              {/* Image Container */}
              <div className={`w-full p-6 sm:p-8 ${project.bgColor} flex items-center justify-center relative`}>
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl group-hover:scale-[1.03] transition-transform duration-500 ease-out">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 pt-10 flex flex-col items-start">
                <span className="font-sans font-bold text-[10px] tracking-widest text-teal uppercase mb-3">
                  {project.tags}
                </span>
                <h3 className="font-sans font-bold text-2xl text-white mb-4">
                  {project.title}
                </h3>
                <p className="font-sans text-[15px] text-white/60 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
