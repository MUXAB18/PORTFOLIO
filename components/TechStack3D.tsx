"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const TECH_STACK = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js",
  "TailwindCSS", "Framer Motion", "GSAP", "PostgreSQL", "MongoDB",
  "Prisma", "Express", "Docker", "AWS", "Vercel", "Git", "GitHub",
  "GraphQL", "REST APIs", "Redux", "Zustand", "TRPC", "Figma", "HTML5", "CSS3"
];

export default function TechStack3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const rotationRef = useRef({ x: 0, y: 0 });
  // Initial auto-rotation speed
  const mouseRef = useRef({ x: 0.005, y: 0.005 });
  // Ref to each span element for direct DOM updates (avoids React re-renders)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Stable 3D coordinates computed once
  const origCoordsRef = useRef<{ x: number; y: number; z: number }[]>([]);
  // Intersection observer flag — stop RAF when off-screen
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const N = TECH_STACK.length;
    const r = window.innerWidth < 768 ? 140 : 200;

    // Compute initial sphere points once (Fibonacci sphere)
    origCoordsRef.current = TECH_STACK.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / N);
      const theta = Math.sqrt(N * Math.PI) * phi;
      return {
        x: r * Math.cos(theta) * Math.sin(phi),
        y: r * Math.sin(theta) * Math.sin(phi),
        z: r * Math.cos(phi),
      };
    });

    // Pause animation when section is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    // Pause when tab is hidden
    const handleVisibility = () => {
      isVisibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const isMobile = window.innerWidth < 768;
    const fontSize = isMobile ? "0.85rem" : "1.25rem";

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return; // Skip work when off-screen

      rotationRef.current.x += mouseRef.current.y;
      rotationRef.current.y += mouseRef.current.x;

      const sx = Math.sin(rotationRef.current.x);
      const cx = Math.cos(rotationRef.current.x);
      const sy = Math.sin(rotationRef.current.y);
      const cy = Math.cos(rotationRef.current.y);

      origCoordsRef.current.forEach((orig, idx) => {
        const el = itemRefs.current[idx];
        if (!el) return;

        // Rotate around X axis
        const y1 = orig.y * cx - orig.z * sx;
        const z1 = orig.y * sx + orig.z * cx;
        // Rotate around Y axis
        const x2 = orig.x * cy + z1 * sy;
        const z2 = -orig.x * sy + z1 * cy;

        const scale = (z2 + 300) / 400;
        const opacity = Math.max(0.1, (z2 + 200) / 400);
        const zIndex = Math.round(z2 + 200);
        const color = z2 > 0 ? "#ffffff" : "#888888";
        const textShadow = z2 > 50 ? "0 0 20px rgba(94,201,168,0.4)" : "none";

        // Direct DOM mutation — zero React re-renders
        el.style.transform = `translate3d(${x2}px, ${y1}px, ${z2}px) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(zIndex);
        el.style.color = color;
        el.style.textShadow = textShadow;
        el.style.fontSize = fontSize;
      });
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseRef.current = { x: x * 0.02, y: y * 0.02 };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: 0.005, y: 0.005 };
  };

  return (
    <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-navy relative overflow-hidden flex flex-col lg:flex-row items-center justify-between">

      {/* Background Decor */}
      <div className="absolute inset-0 dot-grid-teal opacity-5  pointer-events-none"></div>

      {/* Text Content Side */}
      <div className="w-full lg:w-1/2 relative z-10 mb-24 lg:mb-0 text-center lg:text-left flex flex-col items-center lg:items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center lg:items-start"
        >
          <span className="font-sans font-bold text-xs tracking-[0.3em] text-teal uppercase mb-4 block">Capabilities</span>
          <h2 className="font-sans font-black text-5xl sm:text-6xl md:text-8xl text-white tracking-tighter mb-6 leading-none">
            TECH <br />
            <span className="text-teal">STACK</span>
          </h2>
          <p className="font-sans text-base md:text-lg text-white/60 max-w-md leading-relaxed">
            I continuously evolve my technical ecosystem. From modern frontend frameworks to scalable backend architectures, I leverage the best tools to build world-class digital experiences.
          </p>

          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-3">
            <span className="px-4 py-2 rounded-full border border-teal/30 text-teal text-[10px] md:text-xs font-bold tracking-widest uppercase bg-teal/5">Frontend</span>
            <span className="px-4 py-2 rounded-full border border-white/20 text-white/70 text-[10px] md:text-xs font-bold tracking-widest uppercase bg-white/5">Backend</span>
            <span className="px-4 py-2 rounded-full border border-white/20 text-white/70 text-[10px] md:text-xs font-bold tracking-widest uppercase bg-white/5">Cloud &amp; DevOps</span>
          </div>
        </motion.div>
      </div>

      {/* 3D Sphere Side */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative z-10 perspective-1000 mt-10 md:mt-0">
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] flex items-center justify-center cursor-crosshair group"
        >
          {/* Glowing orb behind the sphere */}
          <div className="absolute inset-0 bg-teal/10 rounded-full blur-[80px] md:blur-[100px] scale-75 group-hover:bg-teal/20 transition-colors duration-500 pointer-events-none"></div>

          {/* Render all items statically — RAF updates their styles directly */}
          {TECH_STACK.map((tech, idx) => (
            <div
              key={idx}
              ref={(el) => { itemRefs.current[idx] = el; }}
              className="absolute font-sans font-bold whitespace-nowrap transition-colors duration-300 hover:text-teal hover:!opacity-100"
              style={{
                // Initial invisible state before first RAF frame
                opacity: 0,
                willChange: "transform, opacity",
              }}
            >
              {tech}
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
