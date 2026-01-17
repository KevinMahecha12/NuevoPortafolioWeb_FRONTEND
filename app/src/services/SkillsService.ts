import { SkillsResponse } from "../types/techs";

export async function getSkills() {
  const url = process.env.NEXT_PUBLIC_API_URL_GET_SKILLS;
  console.log("Llamando a:", process.env.NEXT_PUBLIC_API_URL_GET_SKILLS);
  if (!url) throw new Error("API URL not defined");

  const res = await fetch(url, { 
    cache: 'no-store' 
  });

  if (!res.ok) throw new Error("Failed to fetch skills");

  const result: SkillsResponse = await res.json();
  return result; 
}