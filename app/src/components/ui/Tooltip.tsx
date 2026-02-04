"use client";
import { useState, ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
}

interface PositionConfig {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  x?: string;
  y?: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  originX?: number;
  originY?: number;
}

export default function Tooltip({ 
  children, 
  content, 
  className = "w-64", 
  position = "top" 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const positions: Record<string, PositionConfig> = {
    top: { bottom: "100%", left: "50%", x: "-50%", mb: "mb-3", originY: 1 },
    bottom: { top: "100%", left: "50%", x: "-50%", mt: "mt-3", originY: 0 },
    left: { right: "100%", top: "50%", y: "-50%", mr: "mr-3", originX: 1 },
    right: { left: "100%", top: "50%", y: "-50%", ml: "ml-3", originX: 0 },
  };

  const pos = positions[position];

  if (isMobile) return <>{children}</>;

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="cursor-help">
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: position === "top" ? 10 : -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: position === "top" ? 10 : -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ 
              position: "absolute",
              bottom: pos.bottom,
              top: pos.top,
              left: pos.left,
              right: pos.right,
              translateX: pos.x,
              translateY: pos.y,
              zIndex: 9999,
              transformOrigin: `${pos.originX ?? 0.5} ${pos.originY ?? 0.5}`
            }}
            className={`
              ${pos.mt || ""} ${pos.mb || ""} ${pos.ml || ""} ${pos.mr || ""}
              p-4 bg-[#0a0a0a]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl
              pointer-events-none hidden md:block ${className}
            `}
          >
            <div className="relative z-10">
              {content}
            </div>
            
            <div className={`
              absolute w-2 h-2 bg-[#0a0a0a] border-white/10 rotate-45
              ${position === "top" ? "-bottom-1 left-1/2 -translate-x-1/2 border-r border-b" : ""}
              ${position === "bottom" ? "-top-1 left-1/2 -translate-x-1/2 border-l border-t" : ""}
              ${position === "left" ? "-right-1 top-1/2 -translate-y-1/2 border-r border-t" : ""}
              ${position === "right" ? "-left-1 top-1/2 -translate-y-1/2 border-l border-b" : ""}
            `} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}