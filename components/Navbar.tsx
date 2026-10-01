"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  
  const getHref = (hash: string) => (isHome ? hash : `/${hash}`);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      // Throttle to one state update per animation frame max
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const sections = [
    { label: "Home", href: getHref("#top") },
    { label: "Portfolio", href: getHref("#work") },
    { label: "Experience", href: getHref("#experience") },
    { label: "Contact", href: getHref("#contact") },
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 1.5 }}
        className={`fixed left-0 right-0 z-50 pointer-events-none transition-all duration-500 flex justify-center ${isScrolled ? 'top-4 px-4 md:px-8' : 'top-0 px-6 md:px-16 lg:px-24 py-8'}`}
      >
        <div className={`max-w-7xl w-full flex items-center justify-between relative transition-all duration-500 ${isScrolled ? 'bg-[#1A1D29]/80 backdrop-blur-lg border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] rounded-2xl py-3 px-6 md:px-8 transform-gpu' : ''}`}>
          <Link href={getHref("#top")} className={`pointer-events-auto flex items-center -ml-5 transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100'}`} aria-label="Home">
            <Image
              src="/logo.png"
              alt="Musab Logo"
              width={120}
              height={60}
              className="object-contain hover:scale-105 transition-transform duration-300 origin-left"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 pointer-events-auto absolute left-1/2 -translate-x-1/2 bg-white/5 rounded-full p-1.5 border border-white/10 backdrop-blur-md shadow-lg transform-gpu">
            {sections.map((sec, i) => (
              <Link
                key={sec.label}
                href={sec.href}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-5 py-2 font-sans font-bold text-sm tracking-wide text-white/70 hover:text-white transition-colors z-10"
              >
                {hoveredIndex === i && (
                  <motion.div
                    layoutId="nav-hover"
                    className="absolute inset-0 bg-white/10 rounded-full z-[-1]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {sec.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block pointer-events-auto">
            <Link
              href="/contact"
              className="group relative overflow-hidden px-7 py-2.5 bg-teal text-navy font-sans font-bold text-sm rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(94,201,168,0.5)] active:scale-95 transition-all duration-300 block"
            >
              <span className="relative z-10">Let's Talk</span>
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"></div>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center pointer-events-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white hover:bg-teal hover:text-navy transition-colors duration-300 shadow-lg group"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between overflow-hidden">
                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-left ${isOpen ? 'rotate-45 translate-x-px' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-4' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-left ${isOpen ? '-rotate-45 translate-x-px' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 md:hidden flex justify-end pointer-events-auto"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#0f111a]/80 backdrop-blur-sm transform-gpu"
            />

            {/* Slide-in Menu Panel with elastic curve effect */}
            <motion.div
              initial={{ x: "100%", borderTopLeftRadius: "100%", borderBottomLeftRadius: "100%" }}
              animate={{ x: 0, borderTopLeftRadius: "0%", borderBottomLeftRadius: "0%" }}
              exit={{ x: "100%", borderTopLeftRadius: "100%", borderBottomLeftRadius: "100%" }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="relative w-[85%] max-w-sm h-full bg-[#1A1D29] border-l border-white/10 shadow-[-20px_0_40px_rgba(0,0,0,0.4)] flex flex-col justify-center px-6 min-[400px]:px-10"
            >
              {/* Background glow inside the menu */}
              <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="absolute -top-[10%] -right-[20%] w-[80vw] h-[80vw] rounded-full bg-teal/10 blur-[80px]"
                />
              </div>

              <nav className="flex flex-col gap-8 relative z-10">
                {sections.map((sec, i) => (
                  <div key={sec.label} className="overflow-hidden py-1">
                    <motion.div
                      onClick={() => setIsOpen(false)}
                      initial={{ y: 80, opacity: 0, rotate: 10 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 80, opacity: 0, transition: { duration: 0.3 } }}
                      transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                      className="flex flex-col group relative overflow-hidden"
                    >
                      <Link href={sec.href} className="flex flex-col">
                        <span className="font-sans font-bold text-[10px] tracking-[0.3em] text-teal/60 mb-0.5 group-hover:text-teal transition-colors duration-300">
                          0{i + 1}
                        </span>
                        <span className="font-sans font-black text-4xl min-[400px]:text-5xl text-white/80 tracking-tight group-hover:text-white transition-colors duration-300">
                          {sec.label}
                        </span>
                        {/* Hover underline effect */}
                        <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-teal to-transparent group-hover:w-full transition-all duration-500 ease-out opacity-0 group-hover:opacity-100" />
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute bottom-12 left-10 right-10 flex flex-col gap-6 border-t border-white/10 pt-8 z-10"
              >
                <Link href="/contact" onClick={() => setIsOpen(false)} className="text-white font-sans font-bold text-xl flex items-center justify-between group">
                  Let's Talk
                  <span className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-navy text-sm group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(94,201,168,0.5)] transition-all duration-300">
                    →
                  </span>
                </Link>
                <div className="flex gap-3 mt-2">
                  <a href="https://github.com/MUXAB18" target="_blank" className="font-sans text-[10px] tracking-widest text-white/50 hover:text-teal transition-colors">GITHUB</a>
                  <span className="text-white/20 text-[10px]">•</span>
                  <a href="https://www.linkedin.com/in/musab-iftikhar-94668a330" target="_blank" className="font-sans text-[10px] tracking-widest text-white/50 hover:text-teal transition-colors">LINKEDIN</a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
