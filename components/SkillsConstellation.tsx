"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const NODES = [
  { id: "react", label: "React", x: -100, y: -50 },
  { id: "next", label: "Next.js", x: 0, y: -100 },
  { id: "ts", label: "TypeScript", x: 100, y: -50 },
  { id: "tw", label: "Tailwind", x: -80, y: 50 },
  { id: "node", label: "Node.js", x: 80, y: 50 },
  { id: "fm", label: "Framer", x: 0, y: 0 },
];

export default function SkillsConstellation() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <section className="py-32 bg-navy relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-10 left-10 md:top-20 md:left-24">
        <span className="font-sans font-bold text-sm tracking-widest text-teal uppercase block mb-2">Capabilities</span>
        <h2 className="font-sans font-black text-4xl text-white">TECH<br/>STACK</h2>
      </div>

      <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center mt-20">
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <g transform="translate(450, 300)">
            {NODES.map((node, i) => (
              <motion.path
                key={`path-${node.id}`}
                d={`M 0 0 L ${node.x * 2} ${node.y * 2}`}
                stroke="white"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            ))}
            {NODES.map((node, i) => {
              if (i === 0) return null;
              const prev = NODES[i - 1];
              return (
                <motion.path
                  key={`connect-${node.id}`}
                  d={`M ${prev.x * 2} ${prev.y * 2} L ${node.x * 2} ${node.y * 2}`}
                  stroke="rgba(94,201,168,0.3)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                />
              );
            })}
          </g>
        </svg>

        <div className="relative w-full h-full">
          {NODES.map((node) => (
            <motion.div
              key={node.id}
              className={`absolute left-1/2 top-1/2 z-30 cursor-pointer flex items-center justify-center transition-all duration-300 ${hoveredNode && hoveredNode !== node.id ? 'opacity-30 scale-90' : 'opacity-100 scale-100'}`}
              style={{ x: node.x * 2, y: node.y * 2 }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <div className={`relative px-6 py-3 rounded-full font-sans text-sm font-bold tracking-widest uppercase transition-all duration-300 ${hoveredNode === node.id ? 'bg-teal text-navy shadow-[0_0_30px_rgba(94,201,168,0.5)] scale-110' : 'bg-navy-light text-white/70 border border-white/10 hover:border-teal'}`}>
                {node.label}
              </div>
            </motion.div>
          ))}
          
          <motion.div 
            className="absolute left-1/2 top-1/2 w-8 h-8 bg-white rounded-full  pointer-events-none blur-sm"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ x: "-50%", y: "-50%" }}
          />
        </div>
      </div>
    </section>
  );
}
