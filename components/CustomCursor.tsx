"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<"default" | "hover" | "project">("default");

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
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
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center mix-blend-difference"
      animate={{
        width: cursorState === "project" ? 140 : cursorState === "hover" ? 48 : 12,
        height: cursorState === "project" ? 140 : cursorState === "hover" ? 48 : 12,
        x: mousePosition.x - (cursorState === "project" ? 70 : cursorState === "hover" ? 24 : 6),
        y: mousePosition.y - (cursorState === "project" ? 70 : cursorState === "hover" ? 24 : 6),
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      style={{
        backgroundColor: cursorState === "project" ? "#5EC9A8" : cursorState === "hover" ? "transparent" : "#5EC9A8",
        border: cursorState === "hover" ? "1px solid #5EC9A8" : "none",
        borderRadius: "50%",
      }}
    >
      <AnimatePresence>
        {cursorState === "project" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="font-sans font-bold text-xs text-[#1A1D29] tracking-widest text-center"
          >
            VIEW<br />CASE STUDY ↗
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
