"use client";
import Image from "next/image";
import Tooltip from "@/app/src/components/ui/Tooltip";
import { ProjectDetails } from "@/app/src/types/projects";

interface CompaniesInvolvedProps {
  project: ProjectDetails;
  project_category_id: number;
}

export default function CompaniesInvolved({ project, project_category_id }: CompaniesInvolvedProps) {

  const companyLabel = project_category_id === 1 ? "Colaboración" : "Empresa(s) Involucrada(s)";

  if (!project.companies_involved || project.companies_involved.length === 0) {
    return <div className="h-[72px] mb-4 flex-shrink-0" />;
  }

  return (
    <div className="h-[72px] mb-4 flex-shrink-0">
      <div className="flex flex-col gap-2 py-2">
        <span className="text-[10px] uppercase tracking-wider text-white/30 font-semibold italic">
          {companyLabel}:
        </span>

        <div className="flex flex-wrap gap-2">
          {project.companies_involved.map((company) => (
            <Tooltip
              key={company.id}
              position="top"
              content={
                <div className="flex flex-col items-center gap-2 p-1">
                  <span className="text-[9px] uppercase tracking-widest text-purple-400 font-bold">
                    {companyLabel}
                  </span>
                  <div className="relative w-32 h-12 bg-purple-500/5 rounded-lg border border-purple-500/10 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
                    <div className="relative w-24 h-8">
                      <Image
                        src={company.logo_url}
                        alt={company.name}
                        fill
                        className="object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                      />
                    </div>
                  </div>
                  <span className="text-sm text-white font-semibold">{company.name}</span>
                </div>
              }
            >
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 py-1.5 px-3 rounded-full hover:bg-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group/pill shadow-sm">
                <div className="relative w-4 h-4">
                  <Image
                    src={company.logo_url}
                    alt={company.name}
                    fill
                    className="object-contain opacity-80 group-hover/pill:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-[11px] text-white/70 font-medium whitespace-nowrap group-hover/pill:text-white transition-colors">
                  {company.name}
                </span>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
}