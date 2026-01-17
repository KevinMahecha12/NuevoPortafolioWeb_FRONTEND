"use client";
import { motion } from "framer-motion";
import Typography from "./ui/Typography";
import { LuStar } from "react-icons/lu";

interface MinimalistTechViewProps {
  skillsGrouped: any[];
}

export default function MinimalistTechView({ skillsGrouped }: MinimalistTechViewProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const renderStars = (level: number) => {
    return (
      <div className="flex gap-1 mt-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <LuStar
            key={star}
            size={10}
            className={`transition-all duration-500 ${
              star <= level 
                ? "text-brand-primary fill-brand-primary drop-shadow-[0_0_3px_rgba(168,85,247,0.8)]" 
                : "text-white/10 fill-transparent"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-8 gap-y-12 p-6 md:p-2 xl:p-0"
    >
      {skillsGrouped.map((group) => (
        <motion.div 
          key={group.category_id} 
          variants={itemVariants}
          className="flex flex-col rounded-[2rem] bg-purple-500/2 p-2"
        >
          <header className="flex flex-col mb-6">
            <Typography 
              variant="caption" 
              as="h3" 
              className="tracking-[0.2em] lowercase first-letter:uppercase" 
              glow={true}
            >
              {group.category_name || "Tecnologías"}
            </Typography>
            <div className="h-[1px] w-full bg-gradient-to-r from-brand-primary/50 via-brand-primary/10 to-transparent mt-1" />
          </header>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 mb-4">
            {group.skills.map((skill: any) => (
              <div key={skill.id} className="group grid grid-rows-[auto_1fr_auto] gap-y-1">
                
                <div className="flex items-center gap-2 min-h-[1.5rem]">
                  <div className="w-1.5 h-[1.5px] bg-brand-primary/30 group-hover:w-3 group-hover:bg-brand-primary transition-all duration-300" />
                  <Typography 
                    variant="body" 
                    className="font-bold group-hover:text-white transition-colors leading-tight"
                  >
                    {skill.name}
                  </Typography>
                </div>

                {/* Niveles */}
                <div className="pl-3.5 flex items-end min-h-[1.2rem]">
                  <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-white/30 group-hover:text-brand-primary/70 transition-colors leading-none">
                    {skill.level_text}
                  </span>
                </div>

                {/* Estrellas */}
                <div className="pl-3.5">
                  {renderStars(skill.level)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}