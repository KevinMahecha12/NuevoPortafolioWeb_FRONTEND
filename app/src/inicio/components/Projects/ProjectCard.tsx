"use client";
import GlassCard from "@/app/src/components/ui/GlassCard";
import Tooltip from "@/app/src/components/ui/Tooltip";
import Typography from "@/app/src/components/ui/Typography";
import CompaniesInvolved from "./CompaniesInvolved";
import { ProjectDetails } from "@/app/src/types/projects";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  project: ProjectDetails;
  isMobile: boolean;
  onClick: (slug: string) => void;
}

export default function ProjectCard({ project, isMobile, onClick }: ProjectCardProps) {
  const extraTechCount = project.technologies_used.length - 5;

  return (
    <motion.div
      initial={false} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <GlassCard
        onClick={() => onClick(project.slug)}
        className="flex flex-col h-full group cursor-pointer overflow-hidden"
        hoverEffect={!isMobile}
      >

        <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-t-[2.5rem]">
          <Image
            src={project.thumbnail_url}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60" />
        </div>

        <div className="p-6 flex flex-col flex-1 relative">
          <div className="mb-3">
            <Typography variant="title_mid" className="group-hover:text-purple-400 transition-colors line-clamp-6 leading-tight">
              {project.title}
            </Typography>
          </div>
          
          <div className="h-[4.5rem] mb-4 flex-shrink-0">
            <Typography variant="body" className="line-clamp-3 text-white/50 text-sm italic">
              {project.description_short}
            </Typography>
          </div>

          <div className="flex-1 min-h-0" />
          
          <CompaniesInvolved project={project} project_category_id={project.project_category.id} />

          <div className="pt-4 border-t border-white/5 flex items-center justify-between flex-shrink-0">
            <div className="flex -space-x-2">
              {project.technologies_used.slice(0, 5).map((tech) => (
                <Tooltip 
                  key={tech.id} 
                  content={<span className="text-xs font-bold text-white px-2">{tech.name}</span>}
                >
                  <div className="w-8 h-8 rounded-full bg-[#0a0a0a] border border-white/10 p-1.5 flex items-center justify-center relative z-0 hover:z-10 transition-all shadow-md">
                    <img src={tech.icon_url} alt={tech.name} className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  </div>
                </Tooltip>
              ))}

              {extraTechCount > 0 && (
                <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center backdrop-blur-sm z-10">
                  <span className="text-[10px] font-bold text-purple-400">+{extraTechCount}</span>
                </div>
              )}
            </div>

            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all">
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className="text-white/20 group-hover:text-purple-400 transition-colors">
                    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}