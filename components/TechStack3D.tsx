"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const TECH_STACK = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js",
  "TailwindCSS", "Framer Motion", "GSAP", "PostgreSQL", "MongoDB",
  "Prisma", "Express", "Docker", "AWS", "Vercel", "Git", "GitHub",
  "GraphQL", "REST APIs", "Redux", "Zustand", "TRPC", "Figma", "HTML5", "CSS3"
];

export default function TechStack3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<any[]>([]);
  const animationRef = useRef<number>(0);
  const rotationRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0.005, y: 0.005 }); // initial auto-rotation speed

  useEffect(() => {
    // Generate initial sphere points using Fibonacci sphere algorithm
    const N = TECH_STACK.length;
    // Dynamic radius based on screen size to prevent mobile overflow
    const r = window.innerWidth < 768 ? 140 : 200;

    const initialItems = TECH_STACK.map((tech, i) => {
      const phi = Math.acos(-1 + (2 * i) / N);
      const theta = Math.sqrt(N * Math.PI) * phi;

      return {
        text: tech,
        x: r * Math.cos(theta) * Math.sin(phi),
        y: r * Math.sin(theta) * Math.sin(phi),
        z: r * Math.cos(phi),
        origX: r * Math.cos(theta) * Math.sin(phi),
        origY: r * Math.sin(theta) * Math.sin(phi),
        origZ: r * Math.cos(phi),
      };
    });

    setItems(initialItems);

    // Animation Loop
    const animate = () => {
      rotationRef.current.x += mouseRef.current.y;
      rotationRef.current.y += mouseRef.current.x;

      const sx = Math.sin(rotationRef.current.x);
      const cx = Math.cos(rotationRef.current.x);
      const sy = Math.sin(rotationRef.current.y);
      const cy = Math.cos(rotationRef.current.y);

      setItems((prev) =>
        prev.map((item) => {
          // Rotate around X axis
          const y1 = item.origY * cx - item.origZ * sx;
          const z1 = item.origY * sx + item.origZ * cx;

          // Rotate around Y axis
          const x2 = item.origX * cy + z1 * sy;
          const z2 = -item.origX * sy + z1 * cy;

          return { ...item, x: x2, y: y1, z: z2 };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate mouse position relative to center of container (-1 to 1)
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    // Smoothly update rotation speed based on mouse position
    mouseRef.current = {
      x: x * 0.02, // max rotation speed
      y: y * 0.02
    };
  };

  const handleMouseLeave = () => {
    // Return to slow auto-rotation
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
            <span className="px-4 py-2 rounded-full border border-white/20 text-white/70 text-[10px] md:text-xs font-bold tracking-widest uppercase bg-white/5">Cloud & DevOps</span>
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

          {items.map((item, idx) => {
            // Calculate scale and opacity based on Z depth to create 3D illusion
            const scale = (item.z + 300) / 400; // Normalized between ~0.5 and 1.5
            const opacity = (item.z + 200) / 400; // Fade out items in the back
            const zIndex = Math.round(item.z + 200);

            return (
              <div
                key={idx}
                className="absolute font-sans font-bold whitespace-nowrap transition-colors duration-300 hover:text-teal hover:!opacity-100"
                style={{
                  transform: `translate3d(${item.x}px, ${item.y}px, ${item.z}px) scale(${scale})`,
                  opacity: Math.max(0.1, opacity), // don't go fully invisible
                  zIndex: zIndex,
                  color: item.z > 0 ? '#ffffff' : '#888888',
                  textShadow: item.z > 50 ? '0 0 20px rgba(94,201,168,0.4)' : 'none',
                  fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '0.85rem' : '1.25rem'
                }}
              >
                {item.text}
              </div>
            );
          })}
        </motion.div>
      </div>

    </section>
  );
}
