"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ProjectGalleryProps {
  images: string[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { scrollXProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.offsetWidth * 0.8;
    
    const newIndex = Math.round(scrollLeft / (itemWidth + 24)); 
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < images.length) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const itemWidth = container.offsetWidth * 0.8;
    const gap = 24;

    container.scrollTo({
      left: index * (itemWidth + gap),
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  return (
    <div className="group/gallery relative w-full space-y-6">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar touch-pan-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((url, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: activeIndex === i ? 1 : 0.3, 
              scale: activeIndex === i ? 1 : 0.95,
              transition: { duration: 0.4 }
            }}
            onClick={() => setSelectedImage(url)}
            className="relative min-w-[85%] md:min-w-[80%] h-[350px] md:h-[550px] rounded-[2.5rem] overflow-hidden snap-center border border-white/10 bg-white/5 cursor-pointer flex-shrink-0"
          >
            <Image
              src={url}
              alt={`Gallery view ${i}`}
              fill
              className="object-contain p-4 md:p-8 select-none"
              sizes="(max-width: 768px) 90vw, 70vw"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between px-4">
        <div className="flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                activeIndex === i ? "w-8 bg-purple-500" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>

        <div className="hidden md:block flex-1 mx-10 h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-purple-500 w-full origin-left"
            style={{ scaleX }}
          />
        </div>

        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
          <span className="text-white font-bold">{activeIndex + 1}</span> / {images.length}
        </div>
      </div>

      <div className="hidden md:block opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button 
          onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-purple-500/20 transition-all pointer-events-auto active:scale-95"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button 
          onClick={() => scrollToIndex(Math.min(images.length - 1, activeIndex + 1))}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-purple-500/20 transition-all pointer-events-auto active:scale-95"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full max-w-7xl"
            >
              <Image
                src={selectedImage}
                alt="Enlarged view"
                fill
                className="object-contain"
                quality={100}
                priority
              />
            </motion.div>
            <button className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}