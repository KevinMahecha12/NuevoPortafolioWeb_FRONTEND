"use client";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProjectSidebar from "./ProjectSidebar"; 
import Typography from "@/app/src/components/ui/Typography";
import Tooltip from "@/app/src/components/ui/Tooltip";
import { ProjectDetails } from "@/app/src/types/projects";
import { useState } from "react";

interface ProjectDetailClientProps {
  project: ProjectDetails;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleBack = () => {
    setIsExiting(true);
    router.back();
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <main className="min-h-screen bg-black text-white py-20 px-4 md:px-10 selection:bg-purple-500/30">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden" animate="visible" variants={containerVariants}
      >
        <motion.button
          onClick={handleBack}
          variants={itemVariants}
          className="flex items-center gap-3 mb-16 text-white/30 hover:text-white transition-all group"
        >
          <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/5 transition-all">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </div>
          <Typography variant="label" className="text-[11px] uppercase tracking-widest">Regresar</Typography>
        </motion.button>

        <motion.header variants={itemVariants} className="mb-16">
          <Tooltip 
            position="right"
            content={<Typography variant="body" className="text-xs max-w-[200px]">{project.project_category.description}</Typography>}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/5 border border-purple-500/20 mb-6 cursor-help">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              <Typography variant="caption" className="!text-[10px] text-purple-300 uppercase tracking-tighter">
                {project.project_category.name}
              </Typography>
            </div>
          </Tooltip>
          <Typography variant="title" as="h1" className="max-w-4xl !leading-[1.1] tracking-tighter italic">
            {project.title}
          </Typography>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            <motion.div variants={itemVariants} className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
              {project.gallery_urls.map((url: string, i: number) => (
                <div key={i} className="relative min-w-[90%] md:min-w-[75%] h-[350px] md:h-[500px] rounded-[3rem] overflow-hidden snap-center border border-white/10 bg-white/5">
                  <Image src={url} alt={`Gallery view ${i}`} fill className="object-cover" sizes="(max-width: 768px) 90vw, 60vw" />
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="max-w-3xl">
              <Typography variant="title_mid" className="mb-8 flex items-center gap-4">
                Descripción
              </Typography>
              <Typography variant="body" className="text-xl leading-relaxed text-white/60 font-light italic">
                {project.description_long || project.description_short}
              </Typography>
            </motion.div>
          </div>

          <motion.aside variants={itemVariants} className="lg:col-span-4 lg:sticky lg:top-10 h-fit">
            <ProjectSidebar project={project} />
          </motion.aside>
        </div>
      </motion.div>
    </main>
  );
}