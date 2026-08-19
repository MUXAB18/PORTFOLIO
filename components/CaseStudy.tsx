export interface CaseStudyProps {
  title: string;
  stack: string[];
  problem: string;
  solution: string;
}

export default function CaseStudy({ title, stack, problem, solution }: CaseStudyProps) {
  return (
    <div className="glass-panel p-8 rounded-3xl flex flex-col gap-6 group hover:-translate-y-2 transition-transform duration-300">
      <h3 className="font-sans font-bold text-2xl text-white group-hover:text-teal transition-colors leading-tight">
        {title}
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span 
            key={tech} 
            className="font-sans text-xs font-medium tracking-wide text-teal bg-teal/10 px-3 py-1.5 rounded-full border border-teal/20"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-auto pt-6 border-t border-white/5">
        <div>
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Problem</span>
          <p className="font-sans text-white/80 text-sm leading-relaxed">{problem}</p>
        </div>
        <div>
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Solution</span>
          <p className="font-sans text-white/80 text-sm leading-relaxed">{solution}</p>
        </div>
      </div>
    </div>
  );
}
