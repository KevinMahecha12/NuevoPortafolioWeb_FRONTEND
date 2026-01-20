"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import TechBubbleItem from "./TechBubbleItem";
import { skills } from "../types/techs";

export default function TechBubbles({ techs }: { techs: skills[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  
  const [activeBubbleId, setActiveBubbleId] = useState<string | number | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        w: containerRef.current.offsetWidth,
        h: containerRef.current.offsetHeight,
      });
    }
  }, []);

  const bubbleList = useMemo(() => {
    if (dimensions.w === 0) return null;
    return techs.map((tech) => (
      <TechBubbleItem 
        key={tech.id} 
        id={tech.id} 
        activeBubbleId={activeBubbleId} 
        setActiveBubbleId={setActiveBubbleId} 
        label={tech.name} 
        level={tech.level}
        levelText={tech.level_text}
        iconUrl={tech.icon_url}
        speed={10}
        containerW={dimensions.w}
        containerH={dimensions.h}
        maxHoverScale={1.8} 
      />
    ));
  }, [techs, dimensions, activeBubbleId]); 

  return (
    <div 
      ref={containerRef}
      onClick={() => setActiveBubbleId(null)}
      className="relative w-full h-[450px] flex items-center justify-center overflow-hidden rounded-xl bg-black/10"
      style={{ perspective: "1000px", transformStyle: "preserve-3d", WebkitOverflowScrolling: "touch" }}
    >
      {bubbleList}
    </div>
  );
}