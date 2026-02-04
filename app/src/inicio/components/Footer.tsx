"use client";
import Typography from "../../components/ui/Typography";

interface FooterProps {
  profile: {
    full_name: string;
    email_public: string;
    location?: string; 
  } | null;
}

export default function Footer({ profile }: FooterProps) {

  const name = profile?.full_name || "Kevin Giovanni Mahecha Cabuto";
  const email = profile?.email_public || "contacto@tuemail.com";
  const location = profile?.location || "Ubicado en el Futuro";

  return (
    <footer className="relative w-full py-16 mt-20 border-t border-white/5 bg-black overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
        
        <div className="flex flex-col items-center md:items-start gap-3">
          <Typography variant="label" className="text-[11px] tracking-[0.4em] uppercase text-white font-bold">
            {name}
          </Typography>
          <Typography variant="body" className="text-xs text-white/50 font-light italic max-w-[250px] text-center md:text-left leading-relaxed">
            Desarrollador Web FullStack
          </Typography>
        </div>

        <div className="flex flex-col items-center gap-2 group">
          <Typography variant="label" className="text-[9px] tracking-[0.2em] uppercase text-white/30 group-hover:text-purple-400 transition-colors">
            Contacto
          </Typography>
          <a 
            href={`mailto:${email}`} 
            className="text-sm text-white/80 hover:text-white transition-all duration-300 border-b border-white/10 hover:border-purple-500 pb-1 font-light tracking-wider"
          >
            {email}
          </a>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            <Typography variant="caption" className="!text-[10px] uppercase tracking-tighter text-white/90">
              © 2026 Todos los derechos reservados
            </Typography>
          </div>
          <Typography variant="label" className="text-[9px] text-white/20 uppercase tracking-[0.2em]">
            {location} • 2026
          </Typography>
        </div>
      </div>

      <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
    </footer>
  );
}