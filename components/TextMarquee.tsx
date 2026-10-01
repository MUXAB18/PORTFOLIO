"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
  children: string;
  baseVelocity: number;
  isVisible: React.MutableRefObject<boolean>;
}

function ParallaxText({ children, baseVelocity = 100, isVisible }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  
  const directionFactor = useRef<number>(1);
  const lastScrollY = useRef(0);
  const smoothVelocity = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
  }, []);

  useAnimationFrame((t, delta) => {
    // Skip CPU work when marquee is off-screen
    if (!isVisible.current) return;

    // Native scroll velocity calculation with Lerp (zero hook overhead)
    const currentScrollY = window.scrollY;
    const rawVelocity = currentScrollY - lastScrollY.current;
    lastScrollY.current = currentScrollY;
    
    // Smooth the velocity
    smoothVelocity.current = smoothVelocity.current * 0.9 + rawVelocity * 0.1;
    const velocityFactor = smoothVelocity.current * 0.1; // Scale factor

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    
    if (velocityFactor < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor > 0) {
      directionFactor.current = 1;
    }
    
    moveBy += directionFactor.current * moveBy * Math.abs(velocityFactor);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div
        className="font-sans font-black text-[10vw] md:text-[6vw] uppercase flex whitespace-nowrap text-white/5 tracking-tighter"
        style={{ x }}
      >
        <span className="block mr-12">{children} </span>
        <span className="block mr-12">{children} </span>
        <span className="block mr-12">{children} </span>
        <span className="block mr-12">{children} </span>
      </motion.div>
    </div>
  );
}

export default function TextMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  // Shared ref — ParallaxText checks this before doing any work
  const isVisible = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0.01 }
    );
    observer.observe(section);

    // Also pause when tab is backgrounded
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") isVisible.current = false;
      // Re-check intersection when tab regains focus
      if (document.visibilityState === "visible" && section) {
        const rect = section.getBoundingClientRect();
        isVisible.current = rect.top < window.innerHeight && rect.bottom > 0;
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 relative bg-navy overflow-hidden z-10 pointer-events-none"
    >
      <ParallaxText baseVelocity={-2} isVisible={isVisible}>FULL-STACK DEVELOPMENT — NEXT.JS — REACT — NODE.JS — </ParallaxText>
      <ParallaxText baseVelocity={2} isVisible={isVisible}>UI/UX — MOBILE DEVELOPMENT — HIGH PERFORMANCE — </ParallaxText>
    </section>
  );
}
