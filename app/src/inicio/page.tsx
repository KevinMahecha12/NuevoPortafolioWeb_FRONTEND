"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform } from "framer-motion";
import MainLoadingScreen from "../components/ui/MainLoadingScreen";
import ProjectsSection from "./components/Projects/ProjectsSection";
import Footer from "./components/Footer";
import HeroSection from "./components/Home/HomeSection";
import SkillsSection from "./components/Profile/SkillsSection";

export default function HomeClient({
  categories = [],
  skillsGrouped = [],
  profile = null,
  projects = [],
  projectCategories = []
}: any) {
  const [isNavigating, setIsNavigating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'auto';
    }
    
    setHasMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
  const opacitySkills = useTransform(scrollYProgress,[0.05, 0.2, 0.85, 0.95],[0, 1, 1, 0]);

  const opacityProjects = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);

  if (!profile || categories.length === 0) {
    return <MainLoadingScreen />;
  }

  return (
    <>
      {isNavigating && <MainLoadingScreen />}
      
      <main 
        ref={containerRef} 
        className="bg-black text-white overflow-x-hidden min-h-screen"
        style={{ opacity: hasMounted ? 1 : 0 }}
      >
        <HeroSection 
          opacity={isMobile ? 1 : opacityHero} 
          scale={isMobile ? 1 : scaleHero} 
          fullName={profile.full_name} 
        />

        <SkillsSection
          categories={categories}
          skillsGrouped={skillsGrouped}
          profile={profile}
          opacity={isMobile ? 1 : opacitySkills}
        />

        <ProjectsSection 
          projects={projects} 
          projectCategories={projectCategories}
          opacity={isMobile ? 1 : opacityProjects} 
          onNavigate={() => setIsNavigating(true)}
        />

        <Footer profile={profile} />
      </main>
    </>
  );
}