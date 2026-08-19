"use client";

import { motion } from "framer-motion";

export default function CodeShowcase() {
  const codeSnippet = `
// hooks/useWebSocketBatch.ts
import { useEffect, useRef, useState } from 'react';

export function useWebSocketBatch<T>(url: string, batchSize = 50) {
  const [data, setData] = useState<T[]>([]);
  const buffer = useRef<T[]>([]);

  useEffect(() => {
    const ws = new WebSocket(url);
    
    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      buffer.current.push(payload);

      if (buffer.current.length >= batchSize) {
        setData((prev) => [...prev, ...buffer.current].slice(-1000));
        buffer.current = [];
      }
    };

    return () => ws.close();
  }, [url, batchSize]);

  return data;
}
`.trim();

  return (
    <section className="py-32 px-6 md:px-16 lg:px-24 bg-navy-light relative overflow-hidden">
      <div className="absolute inset-0 dot-grid-teal opacity-10 mix-blend-screen pointer-events-none"></div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">

        <div className="w-full lg:w-1/3">
          <motion.div
            initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-sans font-bold text-sm tracking-widest text-teal uppercase mb-4 block">Architecture</span>
            <h2 className="font-sans font-black text-5xl md:text-6xl text-white mb-6 leading-tight">UNDER<br />THE HOOD</h2>
            <p className="font-sans text-white/60 leading-relaxed mb-8">
              I don't just bolt libraries together. I build systems from the ground up to be type-safe, highly concurrent, and deeply optimized for the browser's render cycle.
            </p>

            <div className="flex flex-wrap gap-3">
              {["FAST", "REUSABLE", "TYPE-SAFE", "SCALABLE"].map((label, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="font-sans font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded bg-teal/10 text-teal border border-teal/20"
                >
                  {label}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
          className="w-full lg:w-2/3 perspective-1000"
        >
          <div className="code-editor-window overflow-hidden flex flex-col w-full max-w-full border border-white/10 rounded-xl bg-[#0d1117]">
            {/* MacOS Window Controls */}
            <div className="bg-[#1a1d24] px-4 py-3 border-b border-white/5 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
              <span className="font-mono text-xs text-white/30 ml-4 font-medium tracking-wide">useWebSocketBatch.ts</span>
            </div>

            {/* Code Area */}
            <div className="p-4 md:p-6 overflow-x-auto text-[10px] sm:text-xs md:text-sm w-full">
              <pre className="font-mono leading-relaxed md:leading-loose min-w-max">
                <code className="text-white/80">
                  {codeSnippet.split('\n').map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="flex"
                    >
                      <span className="w-8 text-white/20 select-none text-right mr-4">{i + 1}</span>
                      <span className="text-white/90">
                        {/* Super simple syntax highlighting hack for the visual */}
                        {line.includes('import') || line.includes('export') || line.includes('const') || line.includes('return')
                          ? <span className="text-teal">{line}</span>
                          : line.includes('//')
                            ? <span className="text-white/30 italic">{line}</span>
                            : line
                        }
                      </span>
                    </motion.div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
