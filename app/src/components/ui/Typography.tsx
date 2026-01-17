"use client";
import { motion, HTMLMotionProps } from "framer-motion";

interface TypographyProps extends HTMLMotionProps<"h1" | "h2" | "h3" | "p" | "span"> {
  variant: "display" | "title" | "title_mid" | "subtitle" | "body" | "caption" | "label";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  glow?: boolean; 
}

const variants = {
  display: "text-3xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40",
  title: "text-4xl md:text-6xl font-black text-white leading-[1.1]",
  title_mid:  "text-2xl md:text-3xl font-black text-white leading-[1.1]",
  subtitle: "text-white/40 text-base md:text-lg font-light leading-relaxed italic",
  body: "text-white/60 text-sm md:text-base font-light",
  caption: "text-purple-500 font-mono tracking-[0.5em] text-sm md:text-md uppercase",
  label: "text-white/30 text-xs font-bold uppercase tracking-widest",
};

/**
 * Typography Component
 * * Un componente polimórfico y animado que centraliza el sistema de diseño visual 
 * para todos los textos de la aplicación.
 * @param {string} variant - Define el estilo visual preestablecido (display, title, subtitle, etc.)
 * @param {string} as - Define la etiqueta HTML real (h1, h2, p, span) para SEO y accesibilidad. Por defecto es "p".
 * @param {boolean} glow - Activa un efecto de resplandor neón.
 * @param {ReactNode} children - El contenido de texto o elementos a renderizar.
 * @param {string} className - Clases adicionales de Tailwind para ajustes de posición.
 * @param {HTMLMotionProps} props - Soporta todas las propiedades de Framer Motion.
 */
export default function Typography({ variant, as = "p", glow = false, children, className = "", ...props }: TypographyProps) {
  const Component = motion[as] as any;

  const glowStyles = glow ? "drop-shadow-[0_0_8px_rgba(168,85,247,0.7)] brightness-110" : "";

  return (
    <Component 
      className={`${variants[variant]} ${glowStyles} ${className}`} 
      {...props}
    >
      {children}
    </Component>
  );
}