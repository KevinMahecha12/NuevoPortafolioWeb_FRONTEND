"use client";
import { motion } from "framer-motion";
import Typography from "../../components/ui/Typography";


interface FilterEmptyStateProps {
  onReset: () => void;
}

export default function FilterEmptyState({ onReset }: FilterEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="col-span-full py-24 flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-fuchsia-500/10 blur-[80px] rounded-full -z-10 animate-pulse" />

      <div className="relative mb-10">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 flex items-center justify-center backdrop-blur-md shadow-2xl"
        >
          <svg 
            width="44" 
            height="44" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            className="text-purple-400/80"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
            <path d="M11 8v5M8 11h6" strokeLinecap="round" className="opacity-30" />
          </svg>
        </motion.div>

        <div className="absolute -top-4 -right-2 w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7] animate-ping" />
        <div className="absolute bottom-2 -left-6 w-1 h-1 bg-white/20 rounded-full" />
      </div>

      <div className="text-center space-y-3 z-10">
        <Typography variant="title_mid" className="text-white/90 tracking-tight">
          Sin resultados <span className="text-purple-500/50">.</span>
        </Typography>
        <Typography variant="body" className="text-white/40 italic max-w-sm mx-auto leading-relaxed">
          No hay proyectos en esta categoría por ahora. <br />
          Prueba explorando otras áreas de mi trabajo.
        </Typography>
      </div>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="mt-12 px-8 py-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/[0.02] transition-all duration-500 group"
      >
        <Typography variant="label" className="!text-[10px] uppercase tracking-[0.3em] text-white/50 group-hover:text-purple-300 transition-colors">
          Restablecer Filtros
        </Typography>
      </motion.button>
    </motion.div>
  );
}