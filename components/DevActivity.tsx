"use client";

import { motion } from "framer-motion";
import { Caveat } from "next/font/google";
import TextReveal from "@/components/TextReveal";

const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

const activityData = [
  { label: "Contributions (Last Year)", value: "1,240+", color: "text-teal" },
  { label: "Active Repositories", value: "34", color: "text-white" },
  { label: "Top Languages", value: "TS, JS, Next", color: "text-amber" },
  { label: "Global Ranking", value: "Top 5%", color: "text-white/60" },
];

export default function DevActivity() {
  return (
    <section id="activity" className="py-24 px-6 md:px-16 lg:px-24 bg-navy relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Title */}
        <div className="flex flex-col items-center mb-16 relative">
          <TextReveal
            text="ACTIVITY"
            className="font-sans font-black text-[10vw] md:text-7xl tracking-tighter text-white/20"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
            className="flex items-center justify-center gap-3 mt-4 absolute top-1/2 -translate-y-1/2"
          >
            <span className="font-sans font-bold text-sm tracking-widest text-teal uppercase">DEV</span>
            <span className={`${caveat.className} text-4xl text-white`}>dashboard</span>
          </motion.div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {activityData.map((data, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, ease: "easeOut" }}
              className="bg-[#242837] border border-white/5 rounded-2xl p-8 flex flex-col items-start hover:border-teal/30 transition-colors group"
            >
              <span className={`font-sans font-black text-4xl lg:text-5xl mb-2 ${data.color} group-hover:scale-105 transition-transform origin-left`}>
                {data.value}
              </span>
              <span className="font-sans font-bold text-xs tracking-widest text-white/40 uppercase">
                {data.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
