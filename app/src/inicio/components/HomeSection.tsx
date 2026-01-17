"use client";
import { motion, MotionValue } from "framer-motion";
import Typography from "../../components/ui/Typography";
import GlowLines from "../../components/GlowLines";
import HeroTypewriter from "../../components/HeroTypewriter";

interface HeroSectionProps {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
}

export default function HeroSection({ opacity, scale }: HeroSectionProps) {
  return (
    <motion.section 
      style={{ opacity, scale }}
      className="h-screen w-full flex flex-col items-center justify-center sticky top-0 z-0 bg-black"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.08),transparent_70%)]" />
      
      <GlowLines />

      <div className="text-center z-10 px-4 relative">
        <Typography 
          variant="caption" 
          as="h2"
          glow
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          Full Stack Developer
        </Typography>
        
        <Typography 
          variant="display" 
          as="h1"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          Kevin Giovanni Mahecha Cabuto
        </Typography>

        <div className="h-16 flex justify-center items-center">
          <Typography variant="subtitle" as="div">
            <HeroTypewriter />
          </Typography>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 12, 0] }} 
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 flex flex-col items-center gap-3 z-10"
      >
        <div className="relative w-[1px] h-16 bg-white/10 overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500 to-transparent shadow-[0_0_8px_rgba(168,85,247,0.8)]"
          />
        </div>
      </motion.div>

    </motion.section>
  );
}