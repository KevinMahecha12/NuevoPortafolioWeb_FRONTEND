"use client";
import { motion, MotionValue } from "framer-motion";
import Image from "next/image";
import { Mail, Sparkles, Quote } from "lucide-react";
import { Profile } from "../../../types/profile";
import Typography from "../../../components/ui/Typography";

interface ProfileCardProps {
  profile: Profile;
  xProgress: MotionValue<number>;
}

export default function ProfileCard({ profile, xProgress }: ProfileCardProps) {
  return (
    <motion.div 
      style={{ x: xProgress }} 
      className="flex justify-center order-2 lg:order-1 sticky top-32 h-fit"
    >
      <div className="relative w-full group max-w-xl 2xl:max-w-2xl">
        <div className="absolute -inset-1 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-80 transition duration-1000" />
        
        <div className="relative flex flex-col bg-zinc-900/40 border border-white/10 rounded-[2.5rem] backdrop-blur-xl overflow-hidden shadow-2xl">
          
          {/* FOTO */}
          <div className="p-8 pb-0 flex justify-center">
            <div className="relative w-full aspect-[4/5] max-w-[180px] rounded-[2rem] overflow-hidden border-4 border-white/5 shadow-inner group-hover:rotate-1 transition-transform duration-500">
              <Image 
                src={profile?.photo_url || "/placeholder-user.jpg"} 
                alt={profile?.full_name}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                sizes="280px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* CONTENIDO DE TEXTO */}
          <div className="p-10 space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <Typography variant="title_mid" className="mb-3">
                {profile?.full_name}
              </Typography>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase">
                <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md text-white/70">
                   {profile?.location}
                </span>

                {profile?.available_for_work && (
                  <span className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-md text-green-400">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Disponible
                  </span>
                )}

                <span className="text-purple-400">Fullstack Dev</span>
              </div>
            </div>

            <div className="relative py-2">
              <Quote className="absolute -top-1 -left-2 w-6 h-6 text-purple-500/20" />
                <Typography variant="subtitle">
                Sobre mí
              </Typography>
              <p className="text-white/60 text-sm leading-relaxed italic font-light pl-4 border-l border-purple-500/30">
                {profile?.bio_long}
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-purple-400">
                <Sparkles size={14} />
               <Typography variant="label">Experiencia</Typography>
              </div>
              <p className="text-white/40 text-[12px] leading-snug">
                {profile?.bio_short}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5">
              <a 
                href={`mailto:${profile?.email_public}`} 
                className="flex items-center justify-between group/link bg-white/5 hover:bg-purple-600/20 border border-white/5 hover:border-purple-500/40 p-3 rounded-xl transition-all"
              >
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-white/20 group-hover/link:text-purple-400 transition-colors" />
                  <span className="font-mono text-xs text-white/40 group-hover/link:text-white transition-colors">
                    {profile?.email_public}
                  </span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover/link:bg-purple-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}