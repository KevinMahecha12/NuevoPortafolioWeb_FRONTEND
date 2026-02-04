import { callPgFunction } from '../lib/supabase';
import { levelToText } from './helpers';
import { SkillsGrouped, RawSkillsGrouped, RawSkill } from '../types/techs';

export const getSkills = async (): Promise<SkillsGrouped[]> => {
  try {
    const groupedSkills = await callPgFunction<RawSkillsGrouped[]>('get_skills_grouped');

    if (!Array.isArray(groupedSkills)) return [];

    return groupedSkills.map((group: RawSkillsGrouped) => ({
      ...group,
      skills: (group.skills || []).map((skill: RawSkill) => ({
        ...skill,
        level_text: levelToText(skill.level), 
      })),
    }));

  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Error en SkillsService:", msg);
    return [];
  }
};