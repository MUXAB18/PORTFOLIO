"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { Mail } from "lucide-react";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import PortfolioSection from "@/components/PortfolioSection";
import ProfessionalSkills from "@/components/ProfessionalSkills";
import TechStack3D from "@/components/TechStack3D";
import CodeShowcase from "@/components/CodeShowcase";
import DesignToCode from "@/components/DesignToCode";
import TextReveal from "@/components/TextReveal";
import IntroSequence from "@/components/IntroSequence";
import TextMarquee from "@/components/TextMarquee";
import DevActivity from "@/components/DevActivity";
import ProcessSection from "@/components/ProcessSection";
import Stats from "@/components/Stats";

// Caveat font is loaded globally via layout.tsx; use the CSS variable directly
const caveatClass = "font-script";

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  // Handle Parallax Mouse Movement efficiently without React re-renders
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Derived motion values for specific layers
  const blobX = useTransform(smoothMouseX, (v) => v * -1);
  const blobY = useTransform(smoothMouseY, (v) => v * -1);
  
  const outlineX = useTransform(smoothMouseX, (v) => v * 0.5);
  const outlineY = useTransform(smoothMouseY, (v) => v * 0.5);
  
  const pill1X = useTransform(smoothMouseX, (v) => v * 1.5);
  const pill1Y = useTransform(smoothMouseY, (v) => v * 1.5);
  
  const pill2X = useTransform(smoothMouseX, (v) => v * -1.5);
  const pill2Y = useTransform(smoothMouseY, (v) => v * -1.5);

  // Parallax calculations
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const [introFinished, setIntroFinished] = useState(false);

  return (
    <main className="min-h-screen bg-navy selection:bg-teal selection:text-navy overflow-hidden relative">
      <IntroSequence onComplete={() => setIntroFinished(true)} />

      {/* Global Noise Background */}
      <div className="noise-bg opacity-[0.15]"></div>

      {/* Global Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-teal origin-left z-50 shadow-[0_0_10px_rgba(94,201,168,0.5)]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen flex items-center px-6 md:px-16 lg:px-24 pt-28 pb-10">
        {/* Parallax Background Grid */}
        <motion.div
          className="absolute inset-0 dot-grid opacity-30 pointer-events-none"
          style={{ y: y1 }}
        ></motion.div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-8 items-center relative z-10">

          {/* Left Column: Typography & CTAs */}
          <div className="flex flex-col items-start pt-10 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col"
            >
              <span className="font-sans font-bold text-[10px] md:text-xs tracking-[0.3em] text-white/50 mb-4 uppercase">HELLO, MY NAME IS</span>
            </motion.div>

            <div className="flex flex-col mb-6">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
                  animate={introFinished ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
                  className="font-sans font-black text-[13vw] sm:text-[10vw] md:text-8xl lg:text-[110px] leading-[0.85] tracking-tighter text-teal origin-bottom pr-6"
                >
                  MUSAB
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
                  animate={introFinished ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
                  className="font-sans font-black text-[13vw] sm:text-[10vw] md:text-8xl lg:text-[110px] leading-[0.85] tracking-tighter text-white origin-bottom pr-6"
                >
                  IFTIKHAR
                </motion.h1>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="font-sans font-bold text-xs tracking-widest text-white/40 uppercase">I AM</span>
              <span className={`${caveatClass} text-4xl md:text-5xl text-white`}>Full Stack Software Engineer</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-sans text-white/70 max-w-md text-base md:text-lg leading-relaxed mb-8"
            >
              I build fast, scalable and visually polished digital products using modern frontend and backend technologies.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-4 mb-10"
            >
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  ),
                  link: "https://github.com/MUXAB18",
                  label: "GitHub"
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  ),
                  link: "https://www.linkedin.com/in/musab-iftikhar-94668a330",
                  label: "LinkedIn"
                },
                { icon: <Mail className="w-5 h-5" />, link: "mailto:musabiftikhar44@gmail.com", label: "Email" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-teal hover:text-teal hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(94,201,168,0.2)] transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap items-center gap-4 mt-2"
            >
              <a href="#work" className="group relative inline-flex items-center justify-center px-8 py-4 font-sans font-bold text-[10px] md:text-xs tracking-widest uppercase text-white bg-navy-light border border-white/10 rounded-full overflow-hidden transition-all duration-300 hover:border-white/30">
                <span className="relative z-10">EXPLORE MY WORK</span>
                <div className="relative z-10 ml-4 w-6 h-6 rounded-full bg-teal flex items-center justify-center text-navy font-black">↓</div>
              </a>

              <a href="/resume.pdf" download="Musab_Iftikhar_Resume.pdf" className="group relative inline-flex items-center justify-center px-8 py-4 font-sans font-bold text-[10px] md:text-xs tracking-widest uppercase text-teal bg-transparent border border-teal/30 rounded-full overflow-hidden transition-all duration-300 hover:bg-teal hover:text-navy hover:border-teal">
                <span className="relative z-10 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  DOWNLOAD RESUME
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Portrait Composition */}
          <div className="relative h-[400px] md:h-[450px] lg:h-[550px] w-full flex items-center justify-center pointer-events-none mt-12 lg:mt-0">
            {/* The main circular background blob */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] bg-teal/5 rounded-full blur-2xl"
            ></motion.div>

            {/* Sharp Mint Outline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              style={{ x: outlineX, y: outlineY }}
              className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] rounded-full border border-teal/20"
            ></motion.div>

            {/* Floating Pills */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
              style={{ x: pill1X, y: pill1Y }}
              className="absolute top-[10%] right-0 md:-right-10 z-20 bg-navy-light border border-white/5 rounded-xl px-6 py-4 shadow-2xl flex flex-col items-center"
            >
              <span className="font-sans font-black text-2xl text-white">1+</span>
              <span className="font-sans font-bold text-[8px] md:text-[10px] uppercase tracking-widest text-teal mt-1">Year Exp</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50, y: -50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 1, type: "spring" }}
              style={{ x: pill2X, y: pill2Y }}
              className="absolute bottom-[20%] left-0 md:-left-10 z-20 bg-navy-light border border-white/5 rounded-xl px-6 py-4 shadow-2xl flex flex-col items-center"
            >
              <span className="font-sans font-black text-2xl text-white">10+</span>
              <span className="font-sans font-bold text-[8px] md:text-[10px] uppercase tracking-widest text-amber mt-1">Projects</span>
            </motion.div>

            {/* The Portrait Image */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] z-10"
            >
              <Image
                src="/musab-new.jpg"
                alt="Musab Iftikhar"
                fill
                sizes="(max-width: 768px) 280px, (max-width: 1024px) 380px, 420px"
                className="object-cover rounded-full object-center shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 02 - ABOUT / EDITORIAL STATEMENT */}
      <section id="about" className="py-32 px-6 md:px-16 lg:px-24 bg-[#242837] relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10"
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <TextReveal
              text="I BUILD DIGITAL EXPERIENCES"
              className="font-sans font-black text-3xl md:text-5xl lg:text-7xl leading-none text-white/20 justify-center text-center"
            />
            <TextReveal
              text="THAT COMBINE"
              className="font-sans font-black text-3xl md:text-5xl lg:text-7xl leading-none text-white/20 justify-center text-center"
              delay={3}
            />
            <div className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-6 mt-4">
              <TextReveal
                text="DESIGN +"
                className="font-sans font-black text-4xl md:text-6xl lg:text-8xl leading-none text-white justify-center"
                delay={5}
              />
              <TextReveal
                text="CODE +"
                className="font-sans font-black text-4xl md:text-6xl lg:text-8xl leading-none text-white justify-center"
                delay={7}
              />
              <TextReveal
                text="PERFORMANCE."
                className="font-sans font-black text-4xl md:text-6xl lg:text-8xl leading-none text-teal justify-center"
                delay={9}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-12 absolute right-0 bottom-32 md:right-24 md:bottom-32 rotate-[-10deg]"
          >
            <span className={`${caveatClass} text-2xl md:text-4xl text-amber`}>
              "details matter."
            </span>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="absolute -left-8 top-4 stroke-amber">
              <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Stats placed perfectly after the description */}
        <div className="relative z-10 mt-24 md:mt-32">
          <Stats />
        </div>
      </section>

      {/* 02.5 - MARQUEE */}
      <TextMarquee />

      {/* 03 - PORTFOLIO SECTION */}
      <PortfolioSection />

      {/* 04 - PROFESSIONAL SKILLS */}
      <ProfessionalSkills />

      {/* 04.5 - TECH STACK 3D */}
      <TechStack3D />

      {/* 05 - UNDER THE HOOD */}
      <CodeShowcase />

      {/* 05.5 - THE LAB / PROCESS */}
      <ProcessSection />
      {/* 06 - EXPERIENCE TIMELINE */}
      <Timeline />

      {/* 06.5 - DEV ACTIVITY */}
      <DevActivity />

      {/* 07 - DESIGN TO CODE */}
      <DesignToCode />

      {/* 08 - CONTACT & FOOTER */}
      <Contact />

    </main>
  );
}
