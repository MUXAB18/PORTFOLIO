export const projects = [
  {
    title: "Enterprise E-commerce Platform",
    description: "A high-performance B2B e-commerce solution processing high-volume transactions with real-time inventory sync.",
    role: "Full Stack Lead",
    architecture: "Next.js 14 App Router, Node.js microservices, PostgreSQL, Redis for cart caching.",
    challenge: "Optimized complex SQL queries to reduce product catalog search latency from 2.4s to under 150ms.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/MUXAB18/project"
  },
  {
    title: "Financial Analytics Dashboard",
    description: "Real-time data visualization platform for financial analysts to track market trends and portfolio performance.",
    role: "Frontend Architect",
    architecture: "React, WebSockets for live data feeds, optimized Canvas API for rendering thousands of data points.",
    challenge: "Prevented React re-render cascades during high-frequency WebSocket updates using strict memoization and refs.",
    tech: ["React", "TypeScript", "WebSockets", "Canvas API", "Framer Motion"],
    liveUrl: "https://example.com"
  },
  {
    title: "Multi-tenant SaaS CRM",
    description: "A customer relationship management tool built specifically for small healthcare practices with HIPAA compliance in mind.",
    role: "Full Stack Developer",
    architecture: "Next.js Server Actions, AWS RDS (PostgreSQL) with Row-Level Security, AWS S3 for secure document storage.",
    challenge: "Implemented strict multi-tenant data isolation at the database level using PostgreSQL Row-Level Security (RLS) policies.",
    tech: ["Next.js", "PostgreSQL", "AWS", "Prisma", "Shadcn UI"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/MUXAB18/crm"
  }
];
