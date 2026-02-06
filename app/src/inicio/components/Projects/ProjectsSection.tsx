"use client";
import { motion } from "framer-motion";
import { useRef, useState, useMemo, useEffect } from "react";
import ProjectFilters from "./ProjectFilters";
import { useRouter } from "next/navigation";
import FilterEmptyState from "./FilterEmptyState";
import ProjectCard from "./ProjectCard";
import { ProjectCategory, ProjectDetails } from "@/app/src/types/projects";
import Typography from "@/app/src/components/ui/Typography";

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
      style={{ opacity }}
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
            filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id}
                project={project}
                isMobile={isMobile}
                onClick={handleProjectClick}
              />
            ))
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