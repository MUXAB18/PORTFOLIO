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
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    // Skip CPU work when marquee is off-screen
    if (!isVisible.current) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
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
