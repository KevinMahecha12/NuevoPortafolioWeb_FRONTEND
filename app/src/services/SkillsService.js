import { callPgFunction } from '../lib/supabase';
import { levelToText } from './helpers';

export const getSkills = async () => {
  try {
    const groupedSkills = await callPgFunction('get_skills_grouped');

    if (!Array.isArray(groupedSkills)) {
      return { success: false, data: [] };
    }

    const enrichedResult = groupedSkills.map(category => ({
      ...category,
      skills: (category.skills || []).map(skill => ({
        ...skill,
        level_text: levelToText(skill.level),
      })),
    }));

    return { 
      success: true, 
      data: enrichedResult 
    };

  } catch (error) {
    console.error("Error en SkillsService:", error.message);
    return { success: false, data: [] };
  }
};