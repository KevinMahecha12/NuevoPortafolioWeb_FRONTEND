import HomeClient from "./src/inicio/page";
import { getCategories } from "./src/services/categoriesService";
import { getProfileData } from "./src/services/profileService";
import { getSkills } from "./src/services/SkillsService";
import { Category } from "./src/types/categories";
import { Profile } from "./src/types/profile";
import { SkillsGrouped } from "./src/types/techs";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let categories: Category[] = [];
  let techData: SkillsGrouped[] = [];
  let profile: Profile | null = null;

  try {
    const [resCat, resSkills, resProfile] = await Promise.all([
      getCategories(),
      getSkills(),
      getProfileData()
    ]);

    categories = resCat || [];
    techData = resSkills?.data || [];

    if (resProfile && resProfile.length > 0) {
      profile = resProfile[0];
    }
  } catch (error) {
    console.error("Error cargando datos:", error);
  }

  return (
    <HomeClient
      categories={categories}
      skillsGrouped={techData}
      profile={profile}
    />
  );
}