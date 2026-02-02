import HomeClient from "./src/inicio/page";
import { getCategories } from "./src/services/categoriesService";
import { getProfileData } from "./src/services/profileService";
import { getSkills } from "./src/services/SkillsService";
import { Category } from "./src/types/categories";
import { Profile } from "./src/types/profile";
import { SkillsGrouped } from "./src/types/techs";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let categoriesData: { data: Category[] } = { data: [] };
  let techData: { data: SkillsGrouped[] } = { data: [] };
  let profile: Profile | null = null;

  try {
    const [resCat, resSkills, resProfile] = await Promise.all([
      getCategories(),
      getSkills(),
      getProfileData()
    ]);

    categoriesData = resCat || { data: [] };
    techData = resSkills || { data: [] };

    if (resProfile?.data?.length > 0) {
      profile = resProfile.data[0];
    }
  } catch (error) {
    console.error("Error cargando datos:", error);
  }

  return (
    <HomeClient
      categories={categoriesData.data ?? []}
      skillsGrouped={techData.data ?? []}
      profile={profile}
    />
  );
}