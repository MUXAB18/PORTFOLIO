"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if it's already played in this session
    const hasPlayed = sessionStorage.getItem("introPlayed");
    if (hasPlayed) {
      setIsVisible(false);
      onComplete();
      return;
    }

    // Mark as played and start sequence timer
    sessionStorage.setItem("introPlayed", "true");

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Give time for exit animation
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0c]"
      >
        <div className="relative flex flex-col items-center">
          {/* Subtle ambient light */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1.2 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute -inset-20 bg-teal/5 rounded-full blur-3xl pointer-events-none transform-gpu will-change-transform"
          />

          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes introFade {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .lcp-fade {
              animation: introFade 0.6s ease-out 0.2s both;
            }
          `}} />
          <motion.div
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center lcp-fade"
          >
            <span className="font-sans font-black text-white text-sm md:text-base tracking-[0.4em] uppercase mb-4 z-10">
              Musab Iftikhar
            </span>

            {/* Expanding Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="h-[1px] bg-white/40 mb-4"
            />

            <motion.span
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="font-sans font-medium text-[10px] md:text-xs text-teal tracking-[0.2em] uppercase z-10"
            >
              Software Engineer
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
