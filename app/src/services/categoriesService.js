import supabase from '../lib/supabase';

export const getCategories = async () => {
  try {
    const { data, error } = await supabase.from('skill_categories').select('id,name');

    if (error) {
      throw new Error(`Error en Supabase: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error("Error en service:", error.message);
    throw error;
  }
};