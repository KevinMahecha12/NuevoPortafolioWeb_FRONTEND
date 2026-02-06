"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  overflow?: boolean; 
}

export default function GlassCard({
  children,
  className = "",
  hoverEffect = true,
  overflow = false, 
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={
        hoverEffect
          ? { y: -4, borderColor: "rgba(168,85,247,0.25)" }
          : {}
      }
      className={`
        relative 
        ${overflow ? 'overflow-hidden' : 'overflow-visible'} 
        rounded-[2.5rem]
        border border-white/10
        backdrop-blur-2xl
        bg-[linear-gradient(180deg,
          rgba(255,255,255,0.05),
          rgba(255,255,255,0.02)
        )]
        transition-all duration-500
        ${className}
      `}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_20%_10%,rgba(168,85,247,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_100%,rgba(0,0,0,0.4),transparent_60%)]" />
      <div className="relative h-full">
        {children}
      </div>
    </motion.div>
  );
}