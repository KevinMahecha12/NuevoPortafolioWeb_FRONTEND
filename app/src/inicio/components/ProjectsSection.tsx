"use client";
import { motion } from "framer-motion";
import { useRef, useState, useMemo, useEffect } from "react";
import Typography from "../../components/ui/Typography";
import GlassCard from "../../components/ui/GlassCard";
import ProjectFilters from "./ProjectFilters";
import { ProjectDetails, ProjectCategory } from "../../types/projects";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FilterEmptyState from "./FilterEmptyState";

interface ProjectsSectionProps {
  projects: ProjectDetails[];
  projectCategories: ProjectCategory[];
  opacity: any;
  onNavigate: () => void;
}

export default function ProjectsSection({ projects, projectCategories, opacity, onNavigate }: ProjectsSectionProps) {
  const sectionRef = useRef(null);
  const router = useRouter();
  const [activeCategoryId, setActiveCategoryId] = useState<number | "all">("all");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project =>
      activeCategoryId === "all" || project.project_category.id === activeCategoryId
    );
  }, [projects, activeCategoryId]);

  const handleProjectClick = (slug: string) => {
    onNavigate(); 
    router.push(`/proyectos/${slug}`); 
  };

  return (
    <motion.section 
      ref={sectionRef} 
      style={{ opacity: isMobile ? 1 : opacity }} 
      className={`relative z-10 min-h-screen bg-black px-4 md:px-10 py-32 ${isMobile ? '' : 'sticky top-0'}`}
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <Typography variant="caption" glow className="mb-4">Proyectos realizados</Typography>
            <Typography variant="title">Experiencia <br /> Profesional.</Typography>
          </div>

          <ProjectFilters
            categories={projectCategories}
            activeId={activeCategoryId}
            onSelect={setActiveCategoryId}
            totalProjects={projects.length}
          />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => {
              const extraTechCount = project.technologies_used.length - 5;
              
              return (
                <div key={project.id} className="h-full">
                  <motion.div
                    initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: isMobile ? 0 : 0.4 }}
                    className="h-full"
                  >
                    <GlassCard
                      onClick={() => handleProjectClick(project.slug)}
                      className="flex flex-col h-full group cursor-pointer"
                      hoverEffect={!isMobile}
                    >
                      <div className="relative h-56 w-full overflow-hidden rounded-t-[2.5rem]">
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
                      
                      <div className="p-8 flex flex-col flex-grow">
                        <Typography variant="title_mid" className="mb-4 group-hover:text-purple-400 transition-colors">
                          {project.title}
                        </Typography>
                        <Typography variant="body" className="mb-6 line-clamp-3 italic text-white/50">
                          {project.description_short}
                        </Typography>
                        
                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {project.technologies_used.slice(0, 5).map((tech) => (
                              <div key={tech.id} className="w-8 h-8 rounded-full bg-[#0a0a0a] border border-white/10 p-1.5 flex items-center justify-center">
                                <img src={tech.icon_url} alt={tech.name} className="w-full h-full object-contain" />
                              </div>
                            ))}

                            {extraTechCount > 0 && (
                              <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center backdrop-blur-sm">
                                <span className="text-[10px] font-bold text-purple-400">+{extraTechCount}</span>
                              </div>
                            )}
                          </div>

                          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 transition-all">
                            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className="text-white/20 group-hover:text-purple-400">
                              <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full">
               <FilterEmptyState onReset={() => setActiveCategoryId("all")} />
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}