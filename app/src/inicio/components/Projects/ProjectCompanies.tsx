"use client";

import Tooltip from "@/app/src/components/ui/Tooltip";
import { Company } from "@/app/src/types/projects";
import Image from "next/image";

interface ProjectCompaniesProps {
  companies: Company[];
}

export default function ProjectCompanies({ companies }: ProjectCompaniesProps) {
  if (!companies || companies.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {companies.map((company) => (
        <Tooltip
          key={company.id}
          content={
            <span className="text-sm font-medium text-white">
              {company.name}
            </span>
          }
        >
          <div
            className="
              group relative flex items-center justify-center
              w-11 h-11 rounded-xl
              bg-white/5 border border-white/10
              backdrop-blur-md
              transition-all duration-300
              hover:scale-105 hover:border-white/20
            "
          >
            <Image
              src={company.logo_url}
              alt={company.name}
              width={28}
              height={28}
              className="
                object-contain
                opacity-80
                transition-opacity duration-300
                group-hover:opacity-100
              "
            />
          </div>
        </Tooltip>
      ))}
    </div>
  );
}
