
import { notFound } from "next/navigation";
import { getProjects } from "../../src/services/projectsService";
import ProjectDetailClient from "../components/ProjectDetailClient";
import { ProjectDetails } from "@/app/src/types/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const projects: ProjectDetails[] = await getProjects();
  
  const project: ProjectDetails | undefined = projects.find(
    (p: ProjectDetails) => p.slug === slug
  );

  if (!project) {
    notFound();
  }
  return <ProjectDetailClient project={project} />;
}