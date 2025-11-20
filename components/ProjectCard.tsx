import React, { useRef } from 'react';
import { Project } from '../types';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Server, ExternalLink, ArrowUpRight } from 'lucide-react';
import { SOCIALS } from '../constants';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative perspective-1000"
    >
      <a 
        href={SOCIALS.calendar} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block h-full relative"
      >
        <div className="relative h-full p-6 bg-zinc-900/80 border border-zinc-800 rounded-xl backdrop-blur-sm transition-colors hover:border-green-500/50 overflow-hidden shadow-xl">
          
          {/* Glossy Reflection Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ transform: "translateZ(1px)" }} />
          
          {/* Header */}
          <div className="flex justify-between items-start mb-4 relative z-10" style={{ transform: "translateZ(20px)" }}>
            <div className="text-xs font-mono px-2 py-1 bg-black/50 border border-zinc-700 text-green-400 rounded flex items-center gap-2">
                <Server size={12} />
                {project.category}
            </div>
            {project.status === 'Live' && (
                <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded border border-green-500/20 animate-pulse">
                    LIVE SYSTEM
                </div>
            )}
          </div>

          {/* Title & Link */}
          <div className="relative z-10 mb-3 group-hover:translate-x-1 transition-transform duration-300" style={{ transform: "translateZ(30px)" }}>
             <h3 className="text-2xl font-bold text-white font-[Space_Grotesk] group-hover:text-green-400 transition-colors flex items-center gap-2">
               {project.title}
               <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
             </h3>
          </div>

          {/* Description */}
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed relative z-10" style={{ transform: "translateZ(25px)" }}>
            {project.description}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-6 border-t border-zinc-800 pt-4 relative z-10 bg-black/20 rounded p-2" style={{ transform: "translateZ(20px)" }}>
            {project.metrics.map((metric, idx) => (
                <div key={idx}>
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">{metric.label}</div>
                    <div className="text-lg font-mono font-bold text-white group-hover:text-green-200 transition-colors shadow-green-500/50 drop-shadow-sm">{metric.value}</div>
                </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 relative z-10" style={{ transform: "translateZ(15px)" }}>
            {project.tags.map((tag, i) => (
              <span key={i} className="text-[10px] text-zinc-400 border border-zinc-700 px-2 py-1 bg-zinc-900 rounded hover:border-green-500/50 hover:text-green-500 transition-colors cursor-default">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default ProjectCard;