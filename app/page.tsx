import HomeClient from "./src/inicio/page";
import { getCategories } from "./src/services/categoriesService";
import { getProfileData } from "./src/services/profileService";
import { getSkills } from "./src/services/SkillsService";
import { getProjects } from "./src/services/projectsService";
import { getProjectCategories } from "./src/services/projectCategoriesService";

export const dynamic = 'force-dynamic';

export default async function Home() {

  const [categories, techData, profile, projects, projectCategories] = await Promise.all([
    getCategories(),
    getSkills(),
    getProfileData(),
    getProjects(),
    getProjectCategories() 
  ]);
  

  return (
    <HomeClient
      categories={categories}       
      skillsGrouped={techData}      
      profile={profile}             
      projects={projects} 
      projectCategories={projectCategories}          
    />
  );
}