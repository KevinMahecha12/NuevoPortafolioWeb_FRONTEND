"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LineConfig {
  left: string;
  top?: number;
  bottom?: number;
  height: string;
  color: string;
  delay: number;
}

export default function GlowLines() {
  const [randomLines, setRandomLines] = useState<LineConfig[]>([]);

  useEffect(() => {
    const colors = ["bg-purple-500", "bg-blue-500", "bg-purple-600", "bg-blue-400"];
    
    const generated = Array.from({ length: 8 }).map((_, i) => {
      const isTop = Math.random() > 0.5;
      return {
        left: `${Math.floor(Math.random() * 100)}%`,
        top: isTop ? 0 : undefined,
        bottom: !isTop ? 0 : undefined,
        height: `${Math.floor(Math.random() * 25) + 10}vh`,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 4, 
      };
    });

    setRandomLines(generated);
  }, []);

  if (randomLines.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {randomLines.map((line, i) => (
        <div
          key={i}
          style={{ 
            left: line.left, 
            top: line.top, 
            bottom: line.bottom,
            height: line.height 
          }}
          className="absolute w-[1px]"
        >
          <div className={`w-full h-full ${line.color} opacity-20`} />
          
          <motion.div
            initial={{ top: "0%", opacity: 0 }}
            animate={{ 
              top: ["0%", "100%"], 
              opacity: [0, 0.8, 0] 
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: line.delay,
              ease: "easeInOut",
            }}
            className="absolute left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-purple-400 to-transparent shadow-[0_0_10px_rgba(168,85,247,0.4)]"
          />
        </div>
      ))}
    </div>
  );
}