"use client";

import GlassCard from "@/app/src/components/ui/GlassCard";
import Tooltip from "@/app/src/components/ui/Tooltip";
import Typography from "@/app/src/components/ui/Typography";
import { ProjectDetails } from "@/app/src/types/projects";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface SidebarProps {
  project: ProjectDetails;
}

export default function ProjectSidebar({ project }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTechId, setActiveTechId] = useState<string | number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleTechClick = (id: string | number) => {
    if (!isMobile) return;
    setActiveTechId(prev => (prev === id ? null : id));
  };

  return (
    <GlassCard className="p-8 space-y-12 relative z-30" hoverEffect={false}>
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
          <Typography variant="label" className="text-purple-400 tracking-widest uppercase">
            Core Stack
          </Typography>
        </div>

        <div className="grid grid-cols-3 gap-3 relative z-40">
          {project.technologies_used.map((tech) => {
            const isActive = activeTechId === tech.id;

            return (
              <div key={tech.id} className="flex flex-col items-center">
                <Tooltip
                  position="top"
                  className="w-auto min-w-[80px]"
                  content={
                    <Typography variant="label" className="text-[10px] whitespace-nowrap text-center block px-2">
                      {tech.name}
                    </Typography>
                  }
                >
                  <motion.div
                    onClick={() => handleTechClick(tech.id)}
                    animate={{
                      scale: isMobile && isActive ? 1.1 : 1,
                      borderColor: isMobile && isActive ? "rgba(168, 85, 247, 0.6)" : "rgba(255, 255, 255, 0.05)",
                      backgroundColor: isMobile && isActive ? "rgba(168, 85, 247, 0.1)" : "rgba(255, 255, 255, 0.02)",
                    }}
                    className={`aspect-square rounded-xl border flex items-center justify-center p-3.5 transition-all duration-200 group relative overflow-hidden cursor-pointer
                      ${!isMobile ? 'hover:border-purple-500/40 hover:bg-purple-500/[0.05]' : ''}`}
                  >
                    <img
                      src={tech.icon_url}
                      alt={tech.name}
                      className={`w-full h-full object-contain transition-all duration-200 
                        ${isMobile && isActive ? 'grayscale-0 scale-110' : 'grayscale group-hover:grayscale-0 group-hover:scale-110'}`}
                    />
                  </motion.div>
                </Tooltip>

                {/* Espacio reservado para el nombre en móvil */}
                {isMobile && (
                  <div className="h-6 mt-2 flex items-center justify-center w-full">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                        >
                          <Typography variant="label" className="text-[9px] text-purple-400 font-bold uppercase tracking-tighter">
                            {tech.name}
                          </Typography>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-10 border-t border-white/10 space-y-6 relative z-10 my-8">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          <Typography variant="label" className="text-purple-400 tracking-widest uppercase">
            Timeline
          </Typography>
        </div>

        <div className="relative pl-6 space-y-6">
          <div className="absolute left-[6px] top-3 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-purple-500/40 to-transparent" />
          <div className="flex gap-4">
            <div className="w-3 h-3 rounded-full bg-purple-500 mt-1" />
            <div>
              <Typography variant="label" className="text-white/30 !text-[9px] uppercase">Inicio del proyecto</Typography>
              <Typography variant="body" className="text-sm text-white/90">{project.start_date}</Typography>
            </div>
          </div>
          <div className="flex gap-4">
            <div className={`w-3 h-3 rounded-full mt-1 ${project.end_date ? "bg-emerald-500" : "bg-purple-500 animate-pulse"}`} />
            <div>
              <Typography variant="label" className="text-white/30 !text-[9px] uppercase">{project.end_date ? "Finalizado" : "Estado actual"}</Typography>
              <Typography variant="body" className={`text-sm ${project.end_date ? "text-emerald-400" : "text-purple-400"}`}>
                {project.end_date || "En desarrollo"}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      {project.live_url && (
        <div className="pt-2 relative z-10">
          <motion.a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl bg-white text-black font-bold text-sm text-center block"
          >
            Ver Proyecto
          </motion.a>
        </div>
      )}
    </GlassCard>
  );
}