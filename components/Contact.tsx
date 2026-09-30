"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className="pt-32 pb-8 px-6 md:px-16 lg:px-24 bg-navy-light relative overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none "></div>

      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 relative"
        >
          <span className="font-sans font-bold text-sm tracking-widest text-teal uppercase mb-6 block">Ready to start?</span>
          <h2 className="font-sans font-black text-[15vw] sm:text-[12vw] md:text-8xl lg:text-[120px] text-white leading-none tracking-tighter">
            LET'S BUILD
            <br />
            <span className="text-teal">SOMETHING</span>
            <br />
            GREAT.
          </h2>

          {/* Handwritten Annotation */}
          <motion.div
            initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
            whileInView={{ opacity: 1, rotate: -6, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute -right-4 md:-right-16 top-1/2 font-script text-2xl md:text-3xl text-white/60 max-w-[200px] text-left"
          >
            "have an idea? let's make it real."
            <br />
            <span className="text-teal text-xl">↓</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-12 py-6 font-sans font-bold text-xl tracking-widest uppercase text-navy bg-teal rounded-full overflow-hidden transition-transform shadow-[0_0_40px_rgba(94,201,168,0.4)] hover:shadow-[0_0_60px_rgba(94,201,168,0.6)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                LET'S TALK
                <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-2xl leading-none">↗</span>
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 flex flex-col md:flex-row items-center gap-8 md:gap-16 border-t border-white/10 pt-12 w-full justify-center"
        >
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal"></span>
            </div>
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-white/60">AVAILABLE FOR HIRE</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://github.com/MUXAB18" target="_blank" rel="noreferrer" aria-label="GitHub" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-teal hover:text-teal hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(94,201,168,0.2)] transition-all duration-300">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/musab-iftikhar-94668a330" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-teal hover:text-teal hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(94,201,168,0.2)] transition-all duration-300">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://wa.me/923255442007" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-[#25D366] hover:text-[#25D366] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all duration-300">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 mb-4"
        >
          <p className="font-sans font-bold text-xs tracking-[0.2em] text-white/40 uppercase">
            DEVELOPED BY <span className="text-teal">MUSAB</span> <span className="text-white">IFTIKHAR</span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
