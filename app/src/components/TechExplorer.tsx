"use client";

import { useState, useEffect, useMemo } from "react";
import TechBubbles from "./TechBubbles";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useDraggableScroll } from "../hooks/useDraggableScroll";

interface Category {
  id: number | string;
  name: string;
}

interface Props {
  categories: Category[];
  skillsGrouped: any[];
}

export default function TechExplorer({ categories, skillsGrouped }: Props) {
  const [selectedTab, setSelectedTab] = useState(categories[0]?.id || 1);
  const { scrollRef, isDragging, dragMoved, showArrows, handlers, scrollTo } = useDraggableScroll();

  // Precarga de imagenes
  useEffect(() => {
    const allIcons = skillsGrouped.flatMap(g => g.skills?.map((s: any) => s.icon_url)).filter(Boolean);
    allIcons.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, [skillsGrouped]);

  const techData = useMemo(() => {
    const activeGroup = skillsGrouped.find(g => g.category_id === selectedTab);
    return (activeGroup?.skills || []).map((s: any) => ({
      id: s.id,
      name: s.name,
      icon_url: s.icon_url,
      level: s.level,
      level_text: s.level_text
    }));
  }, [selectedTab, skillsGrouped]);

  // Manejador para centrar el botón al hacer click
  const handleTabClick = (id: number | string, e: React.MouseEvent) => {
    if (dragMoved) return;
    setSelectedTab(id);
    (e.currentTarget as HTMLElement).scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  };

  return (
    <div className="w-full select-none">
      <nav 
        className={`relative group/nav py-2 transition-colors ${isDragging ? "cursor-grabbing" : "cursor-grab"} touch-pan-x`}
        {...handlers}
      >
        {/* Flechas: Ocultas en móvil para evitar interrupciones táctiles */}
        <div className="hidden md:block">
          <ArrowButton 
            direction="left" 
            show={showArrows.left} 
            onClick={() => scrollTo("left")} 
          />
          <ArrowButton 
            direction="right" 
            show={showArrows.right} 
            onClick={() => scrollTo("right")} 
          />
        </div>

        <div
          ref={scrollRef}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className={`
            flex gap-4 overflow-x-auto scroll-smooth border-b border-white/10 
            [&::-webkit-scrollbar]:hidden
            snap-x snap-mandatory overscroll-x-contain touch-pan-x
          `}
        >
          {categories.map((cat) => (
            <TabButton
              key={cat.id}
              label={cat.name}
              isActive={selectedTab === cat.id}
              onClick={(e) => handleTabClick(cat.id, e)}
            />
          ))}
        </div>
      </nav>

      {/* Visualización de las burbujas */}
      <main className="min-h-[400px]">
        <TechBubbles key={selectedTab} techs={techData} />
      </main>
    </div>
  );
}

function ArrowButton({ direction, show, onClick }: { direction: "left" | "right", show: boolean, onClick: () => void }) {
  const isLeft = direction === "left";
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`
        absolute ${isLeft ? "left-0" : "right-0"} top-0 z-30 h-full w-14 
        flex items-center ${isLeft ? "justify-start pl-2" : "justify-end pr-2"}
        bg-gradient-to-${isLeft ? "r" : "l"} from-black via-black/40 to-transparent 
        text-white/40 hover:text-white transition-all duration-300
        ${show ? "opacity-0 group-hover/nav:opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      {isLeft ? <LuChevronLeft size={32} /> : <LuChevronRight size={32} />}
    </button>
  );
}

function TabButton({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-4 font-bold transition-all duration-300 whitespace-nowrap cursor-inherit
        border-b-2 snap-center flex-shrink-0
        ${isActive
          ? "text-purple-400 border-purple-500 bg-purple-500/5"
          : "text-white/30 hover:text-white border-transparent"
        }
      `}
    >
      {label}
    </button>
  );
}