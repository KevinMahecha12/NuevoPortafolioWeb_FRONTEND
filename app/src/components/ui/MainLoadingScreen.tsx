"use client";
import { motion, Variants } from "framer-motion";

export default function MainLoadingScreen() {
  const dotVariants: Variants = {
    animate: (i: number) => ({
      opacity: [0.2, 1, 0.2],
      transition: {
        duration: 1.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.2,
      },
    }),
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black gap-8">
      <div className="relative">
        {/* Capa de Glow */}
        <div className="absolute inset-0 rounded-full bg-purple-600/20 blur-2xl animate-pulse" />
        
        {/* Spinner Principal */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-purple-500 animate-spin shadow-[0_0_20px_rgba(168,85,247,0.4)]" />
          <div className="absolute inset-3 rounded-full border-b-2 border-r-2 border-blue-500/30 animate-spin-reverse" />
          <div className="absolute inset-0 m-auto w-1 h-1 bg-white rounded-full shadow-[0_0_15px_2px_white]" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="text-white/90 font-light tracking-[0.4em] uppercase text-[10px]">
            Cargando
          </span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                custom={i}
                variants={dotVariants}
                animate="animate"
                className="w-1 h-1 bg-purple-500 rounded-full"
              />
            ))}
          </div>
        </div>
        
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>
    </div>
  );
}