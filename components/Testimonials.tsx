"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const TESTIMONIALS = [
  {
    quote: "Musab didn't just build what we asked for; he anticipated problems we hadn't even considered. His technical depth and attention to UI details transformed our product.",
    name: "Sarah Jenkins",
    role: "CTO, TechNova",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "The fastest execution and cleanest codebase I've seen from a freelancer. He delivered a complex dashboard that performs flawlessly under heavy load.",
    name: "David Chen",
    role: "Founder, DataFlow Inc",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 px-6 md:px-16 lg:px-24 bg-navy relative">
      {/* Curved SVG Divider connecting to the top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-[calc(100%+1.3px)] h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-navy-light"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto mt-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <span className="font-sans font-bold text-sm tracking-widest text-teal uppercase mb-4 block">Feedback</span>
            <h2 className="font-sans font-black text-5xl md:text-7xl text-white">CLIENT <span className="text-stroke">VOICES</span></h2>
          </div>
          <p className="font-script text-3xl text-teal max-w-xs md:text-right -rotate-2">
            "They liked the code" ↗
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {TESTIMONIALS.map((test, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`glass-panel p-10 md:p-14 rounded-3xl relative group hover:-translate-y-4 transition-transform duration-500 ${idx === 1 ? 'md:mt-24' : ''}`}
            >
              {/* Massive Quotes */}
              <span className="absolute -top-6 -left-2 font-sans font-black text-[120px] text-teal/10 leading-none pointer-events-none group-hover:text-teal/20 transition-colors duration-500">
                &ldquo;
              </span>
              
              <p className="font-sans text-white/90 text-lg md:text-xl leading-relaxed mb-10 relative z-10">
                "{test.quote}"
              </p>

              <div className="flex items-center gap-4 relative z-10 border-t border-white/10 pt-8">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-teal/30 group-hover:border-teal transition-colors duration-300">
                  <Image src={test.avatar} alt={test.name} fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-white tracking-wide">{test.name}</h4>
                  <p className="font-sans text-sm text-teal">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
