"use client";

import { useRef, useEffect, useState } from "react";
import TechBubbleItem from "./TechBubbleItem";
import { skills } from "../types/techs";

export default function TechBubbles({ techs }: { techs: skills[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          w: containerRef.current.offsetWidth,
          h: containerRef.current.offsetHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] flex items-center justify-center overflow-hidden rounded-xl bg-black/20"
      style={{ perspective: "1200px", transformStyle: "preserve-3d", pointerEvents: "none" }}
    >
      {dimensions.w > 0 && techs.map((tech) => (
        <TechBubbleItem 
          key={tech.id} 
          label={tech.name} 
          level={tech.level}
          levelText={tech.level_text}
          iconUrl={tech.icon_url}
          speed={10} 
          minPulseScale={0.8}
          maxPulseScale={1.3}
          pulseSpeed={2}
          containerW={dimensions.w}
          containerH={dimensions.h}
          maxHoverScale={2} 
        />
      ))}
    </div>
  );
}