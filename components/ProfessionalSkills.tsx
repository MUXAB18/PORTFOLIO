"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const skills = [
  {
    title: "Frontend Architecture",
    percentage: 95,
    description: "Develop responsive, accessible, and performant user interfaces using React, Next.js, and modern CSS frameworks like Tailwind. Strong focus on component-driven design."
  },
  {
    title: "Backend Engineering",
    percentage: 90,
    description: "Build scalable RESTful APIs and microservices using Node.js, Express, and NestJS. Implement robust authentication, caching strategies, and secure data handling."
  },
  {
    title: "Database Design",
    percentage: 85,
    description: "Design optimized relational and NoSQL database schemas using PostgreSQL, MongoDB, and Prisma ORM. Proficient in writing complex queries and optimizing performance."
  },
  {
    title: "UI/UX & Animation",
    percentage: 90,
    description: "Translate complex designs into pixel-perfect implementations. Utilize Framer Motion and GSAP to create engaging micro-interactions and seamless page transitions."
  },
  {
    title: "Cloud & DevOps",
    percentage: 80,
    description: "Automate deployment pipelines and manage cloud infrastructure using AWS, Vercel, and Docker. Experience with continuous integration and continuous delivery (CI/CD)."
  },
  {
    title: "Type Safety & Tooling",
    percentage: 95,
    description: "Ensure end-to-end type safety across the stack using TypeScript and TRPC. Maintain code quality with ESLint, Prettier, and automated testing frameworks."
  }
];

function SkillCard({ skill, index }: { skill: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for rotation
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation values (max 15 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Convert to normalized coordinates (-0.5 to 0.5)
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    // Reset to center
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="perspective-1000"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="flex flex-col h-full bg-[#242837] border border-white/5 p-8 rounded-3xl shadow-xl group hover:border-teal/30 transition-colors duration-300 relative cursor-crosshair overflow-hidden"
      >
        {/* Animated Glow on Hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(94,201,168,0.1) 0%, transparent 70%)",
            transform: "translateZ(0)"
          }}
        />

        {/* Floating Content (translateZ pushes it out in 3D space) */}
        <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="flex flex-col h-full relative z-10">

          {/* Title & Percentage */}
          <div className="flex justify-between items-end mb-6">
            <h3 className="font-sans font-black text-2xl text-white tracking-wide">{skill.title}</h3>
            <span className="font-sans font-bold text-sm text-teal tracking-widest">{skill.percentage}%</span>
          </div>

          {/* Description */}
          <p className="font-sans text-white/60 text-sm leading-relaxed mb-8 flex-grow">
            {skill.description}
          </p>

          {/* Progress Bar Container */}
          <div className="relative w-full h-[4px] bg-white/10 mt-auto flex items-center rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.percentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 h-full bg-teal rounded-full shadow-[0_0_10px_rgba(94,201,168,0.5)]"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProfessionalSkills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-16 lg:px-24 bg-[#1E2330] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="flex flex-col items-center mb-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans font-black text-4xl md:text-5xl lg:text-7xl tracking-widest text-white uppercase mb-4 leading-none"
          >
            Professional
            <br />
            <span className="text-white/20">Skills</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mt-4"
          >
            <span className="font-sans font-bold text-xs tracking-widest text-teal uppercase">MY</span>
            <span className="font-script text-4xl text-teal">Expertise</span>
          </motion.div>
        </div>

        {/* 3D Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={skill.title} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
