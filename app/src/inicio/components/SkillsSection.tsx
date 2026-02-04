"use client";
import { motion, AnimatePresence, useTransform, useSpring, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import Typography from "../../components/ui/Typography";
import CustomSwitch from "../../components/ui/CustomSwitch";
import TechExplorer from "../../components/TechExplorer";
import MinimalistTechView from "../../components/MinimalistTechView";

export default function SkillsSection({ categories, skillsGrouped, profile, opacity }: any) {
  const [isMinimalist, setIsMinimalist] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const targetRef = useRef(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 1024;
  const dynamicXDist = Math.min(windowWidth * 0.4, 600);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "center start"] 
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  const xProfileValue = useTransform(
    scrollYProgress, 
    [0, 0.3], 
    [isMobile ? 0 : -dynamicXDist, 0]
  );
  
  const xTechValue = useTransform(
    scrollYProgress, 
    [0, 0.3], 
    [isMobile ? 0 : dynamicXDist, 0]
  );

  const xProfile = useSpring(xProfileValue, springConfig);
  const xTech = useSpring(xTechValue, springConfig);

  const yMobile = useTransform(scrollYProgress, [0, 0.2], [40, 0]);
  const opacityMobile = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section ref={targetRef} className="relative z-10 min-h-screen bg-black px-4 md:px-10 py-32 overflow-hidden">
      <motion.div style={{ opacity }} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16 items-start lg:items-stretch">
          
          <motion.div 
            style={{ 
              x: xProfile, 
              y: isMobile ? yMobile : 0, 
              opacity: isMobile ? opacityMobile : 1 
            }}
            className="w-full h-fit lg:sticky lg:top-32"
          >
            <ProfileCard profile={profile} xProgress={xProfile} />
          </motion.div>

          {/* TECH STACK */}
          <motion.div 
            style={{ x: xTech }} 
            className="flex flex-col h-full mt-10 lg:mt-0"
          >
            <header className="mb-8 lg:text-left text-center">
              <Typography variant="caption" as="h3" className="mb-2 tracking-[0.2em] text-purple-500 font-bold uppercase" glow>
                Especialidades
              </Typography>
              <Typography variant="title">
                Stack <br className="hidden lg:block"/> Tecnológico.
              </Typography>
            </header>
            
            <motion.div layout className="relative flex-grow bg-white/[0.02] border border-white/10 p-5 md:p-10 rounded-[2.5rem] md:rounded-[3rem] backdrop-blur-3xl shadow-2xl flex flex-col overflow-hidden min-h-[550px] lg:min-h-[700px]">
              <div className="absolute top-6 md:top-8 right-6 md:right-10 z-50">
                <CustomSwitch 
                  label="Vista minimalista" 
                  checked={isMinimalist} 
                  onChange={setIsMinimalist} 
                />
              </div>

              <div className="h-12 w-full" />

              <div className="flex-grow">
                <AnimatePresence mode="wait">
                  {!isMinimalist ? (
                    <motion.div key="interactive" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>
                      <TechExplorer categories={categories} skillsGrouped={skillsGrouped} />
                    </motion.div>
                  ) : (
                    <motion.div key="minimalist" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}>
                      <MinimalistTechView skillsGrouped={skillsGrouped} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}