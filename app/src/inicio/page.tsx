"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import HeroSection from "./components/HomeSection";
import SkillsSection from "./components/SkillsSection";
import { Category } from "../types/categories";
import { SkillsGrouped } from "../types/techs";
import { Profile } from "../types/profile";

interface HomeClientProps {
  categories: Category[];
  skillsGrouped: SkillsGrouped[];
  profile: Profile;
}

export default function HomeClient({ categories = [], skillsGrouped = [], profile }: HomeClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animaciones del Hero (desvanecimiento al bajar)
  const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

  // Opacidad general de la sección de Skills para que aparezca suavemente
  const opacitySkills = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);

  return (
    <main ref={containerRef} className="bg-black text-white overflow-x-hidden">
      <HeroSection opacity={opacityHero} scale={scaleHero} />
      
      <SkillsSection 
        categories={categories} 
        skillsGrouped={skillsGrouped} 
        profile={profile}
        opacity={opacitySkills}
      />
    </main>
  );
}