"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<"default" | "hover" | "project">("default");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 600, mass: 0.1 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Use requestAnimationFrame to throttle cursor updates and eliminate React event lag
    let rafId: number;
    const updateMousePosition = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const projectHover = target.closest('[data-cursor="project"]');
      if (projectHover) {
        setCursorState(prev => prev !== "project" ? "project" : prev);
        return;
      }

      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setCursorState(prev => prev !== "hover" ? "hover" : prev);
      } else {
        setCursorState(prev => prev !== "default" ? "default" : prev);
      }
    };

    // Use passive listeners
    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Compute scale based on state
  const scale = cursorState === "project" ? 6.66 : cursorState === "hover" ? 4 : 1;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center w-3 h-3"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          scale: scale,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            backgroundColor: cursorState === "hover" || cursorState === "project" ? "transparent" : "#5EC9A8",
            border: cursorState === "hover" || cursorState === "project" ? "1px solid #5EC9A8" : "0px solid transparent",
            borderWidth: cursorState === "hover" || cursorState === "project" ? (1 / scale) + "px" : "0px"
          }}
          transition={{ duration: 0.2 }}
        />
      <AnimatePresence>
        {cursorState === "project" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="font-sans font-bold text-[10px] text-[#5EC9A8] tracking-widest text-center"
          >
            VIEW
          </motion.span>
        )}
      </AnimatePresence>
      </motion.div>
    </>
  );
}
