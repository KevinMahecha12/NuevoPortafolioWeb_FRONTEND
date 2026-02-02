"use client";

import MainLoadingScreen from "../components/ui/MainLoadingScreen";
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
  profile: Profile | null;
}

export default function HomeClient({
  categories = [],
  skillsGrouped = [],
  profile = null
}: HomeClientProps) {

  if (!profile || categories.length === 0) {
    return <MainLoadingScreen />;
  }

  const containerRef = useRef<HTMLDivElement>(null);

  const { full_name } = profile;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
  const opacitySkills = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);

  return (
    <main ref={containerRef} className="bg-black text-white overflow-x-hidden">
      <HeroSection opacity={opacityHero} scale={scaleHero} fullName={full_name} />

      <SkillsSection
        categories={categories}
        skillsGrouped={skillsGrouped}
        profile={profile}
        opacity={opacitySkills}
      />
    </main>
  );
}