"use client";
import Typography from "../../components/ui/Typography";
import Tooltip from "../../components/ui/Tooltip";
import { ProjectCategory } from "../../types/projects";

interface ProjectFiltersProps {
  categories: ProjectCategory[];
  activeId: number | "all";
  onSelect: (id: number | "all") => void;
  totalProjects: number;
}

export default function ProjectFilters({ categories, activeId, onSelect, totalProjects }: ProjectFiltersProps) {
  return (
    <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
      <div className="
        flex gap-3 
        flex-nowrap overflow-x-auto scrollbar-hide 
        snap-x snap-mandatory
        py-4 px-4
        /* En PC quitamos el overflow para que el tooltip pueda 'salir' del contenedor */
        md:flex-wrap md:overflow-visible md:px-0 md:py-0
        /* Subimos el z-index para estar por encima de los gradientes */
        relative z-30
      ">
        <button
          onClick={() => onSelect("all")}
          className={`flex-shrink-0 cursor-pointer snap-center px-6 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${
            activeId === "all"
              ? "bg-white border-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              : "border-white/10 text-white/40 hover:border-purple-500/50 hover:text-purple-300"
          }`}
        >
          Todos ({totalProjects})
        </button>

        {categories.map((cat) => (
          <div key={cat.id} className="flex-shrink-0 snap-center">
            <Tooltip
              position="top"
              content={
                <div className="max-w-[200px] p-1">
                  <Typography variant="label" className="text-purple-400 block mb-1">{cat.name}</Typography>
                  <Typography variant="body" className="text-[10px] text-white/60 italic leading-tight">
                    {cat.description}
                  </Typography>
                </div>
              }
            >
              <button
                onClick={() => onSelect(cat.id)}
                className={`group cursor-pointer flex items-center gap-2 px-5 py-2 rounded-full border transition-all duration-500 ${
                  activeId === cat.id
                    ? "bg-purple-500/20 border-purple-500 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    : "border-white/5 text-white/40 hover:border-purple-500/40 hover:text-purple-300"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 bg-purple-500 ${
                    activeId === cat.id 
                      ? "animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" 
                      : "opacity-40 group-hover:opacity-100"
                  }`}
                />
                <Typography variant="label" className="!text-[10px] uppercase tracking-tighter transition-colors">
                  {cat.name}
                </Typography>
              </button>
            </Tooltip>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent md:hidden z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent md:hidden z-20" />
    </div>
  );
}