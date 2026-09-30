"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<"default" | "hover" | "project">("default");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const projectHover = target.closest('[data-cursor="project"]');
      if (projectHover) {
        setCursorState("project");
        return;
      }

      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setCursorState("hover");
      } else {
        setCursorState("default");
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Subtle radial light that follows the cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[0] hidden md:block"
        style={{
          width: 800,
          height: 800,
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(94, 201, 168, 0.05) 0%, transparent 60%)",
        }}
      />

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          width: cursorState === "project" ? 80 : cursorState === "hover" ? 48 : 12,
          height: cursorState === "project" ? 80 : cursorState === "hover" ? 48 : 12,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            backgroundColor: cursorState === "hover" || cursorState === "project" ? "transparent" : "#5EC9A8",
            border: cursorState === "hover" || cursorState === "project" ? "1px solid #5EC9A8" : "0px solid transparent",
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
