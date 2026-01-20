"use client";

import { motion, useSpring } from "framer-motion";
import { useState } from "react";
import { useBubblePhysics } from "../hooks/useBubblePhysics";

export default function TechBubbleItem(props: any) {
  const { label, iconUrl, level, levelText, glowColor = "rgba(168, 85, 247, 0.4)" } = props;
  
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const showInfo = isHovered || isDragging;

  const { x, y, z, scale, baseSize, mounted, handleDragEnd } = useBubblePhysics({
    ...props,
    showInfo
  });

  const springScale = useSpring(scale, { stiffness: 120, damping: 14 });

  if (!mounted) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd(() => setIsDragging(false))}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ cursor: "grabbing" }}
      style={{
        position: "absolute", x, y, z,
        scale: springScale,
        width: baseSize, height: baseSize,
        zIndex: showInfo ? 1000 : 0,
        transformStyle: "preserve-3d",
        touchAction: "none",
        cursor: "pointer",
        willChange:  "transform"
      }}
      className="flex items-center justify-center pointer-events-auto select-none active:cursor-grabbing"
    >
      <div 
        className="relative w-full h-full rounded-full flex flex-col items-center justify-center transition-all duration-500 overflow-visible"
        style={{
          background: showInfo 
            ? "radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.08))"
            : "radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.02))",
          border: showInfo ? "1.5px solid rgba(255, 255, 255, 0.5)" : "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: showInfo 
            ? `0 0 50px -5px ${glowColor}, inset 0 0 20px rgba(255,255,255,0.1)` 
            : "0 10px 30px -10px rgba(0,0,0,0.5)"
        }}
      >
        <IconLayer iconUrl={iconUrl} label={label} showInfo={showInfo} />
        
        <InfoLayer label={label} level={level} levelText={levelText} showInfo={showInfo} />
        
        <div className="absolute top-[8%] left-[18%] w-[35%] h-[20%] bg-gradient-to-br from-white/40 to-transparent rounded-full blur-[2px] -rotate-[30deg] pointer-events-none" />
      </div>
    </motion.div>
  );
}

function IconLayer({ iconUrl, label, showInfo }: any) {
  return (
    <motion.div 
      animate={{ 
        opacity: showInfo ? 0 : 1, 
        scale: showInfo ? 0.3 : 1,
        y: showInfo ? -15 : 0,
        filter: showInfo ? "blur(8px)" : "blur(0px)"
      }}
      className="absolute w-[80%] h-[80%] flex items-center justify-center pointer-events-none z-10 p-2"
    >
      <img src={iconUrl} alt={label} className="max-w-full max-h-full object-contain drop-shadow-md select-none" />
    </motion.div>
  );
}

function InfoLayer({ label, level, levelText, showInfo }: any) {
  return (
    <div 
      className={`absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none p-3 transition-all duration-300 ${showInfo ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
    >
      <span className="text-white text-[10px] font-black uppercase tracking-widest mb-1 drop-shadow-sm">
        {label}
      </span>
      <div className="flex gap-0.5 mb-1.5">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className="text-[14px]" 
            style={{ 
              color: i < level ? "#facc15" : "rgba(255,255,255,0.15)",
              textShadow: i < level ? "0 0 10px rgba(250, 204, 21, 0.6)" : "none" 
            }}
          >
            ✦
          </span>
        ))}
      </div>
      <span className="text-[8px] text-white font-bold bg-white/20 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-md">
        {levelText}
      </span>
    </div>
  );
}