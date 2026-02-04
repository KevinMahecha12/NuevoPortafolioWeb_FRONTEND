import { supabase } from '../lib/supabase';
import { Category } from '../types/categories';

export const getCategories = async (): Promise<Category[]> => {
  try {
    const { data, error } = await supabase.from('skill_categories').select('id,name');

    if (error) throw new Error(`Error en Supabase: ${error.message}`);

    return (data as Category[]) || [];
  } catch (error) {
    console.error("Error en service:", error instanceof Error ? error.message : "Error desconocido");
    return [];
  }
};