"use client";

import { useEffect, useState } from "react";

export default function FPSMonitor() {
  const [fps, setFps] = useState(60);
  const [longTasks, setLongTasks] = useState(0);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const measureFPS = () => {
      const now = performance.now();
      frameCount++;

      if (now >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animationFrameId = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    let observer: PerformanceObserver | null = null;
    try {
      observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          setLongTasks((prev) => prev + 1);
          console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`, entry);
        }
      });
      observer.observe({ type: "longtask", buffered: true });
    } catch (e) {
      console.warn("PerformanceObserver for longtask not supported");
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (observer) observer.disconnect();
    };
  }, []);

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-4 left-4 z-[9999] bg-black/80 border border-teal/30 rounded-lg p-3 text-xs font-mono text-white pointer-events-none shadow-2xl backdrop-blur-md">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between gap-4">
          <span className="text-white/60">FPS:</span>
          <span className={fps < 30 ? "text-red-500 font-bold" : fps < 50 ? "text-amber font-bold" : "text-teal font-bold"}>{fps}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-white/60">Long Tasks:</span>
          <span className={longTasks > 5 ? "text-red-500 font-bold" : "text-teal"}>{longTasks}</span>
        </div>
      </div>
    </div>
  );
}
