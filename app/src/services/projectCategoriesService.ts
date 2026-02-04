import { supabase } from '../lib/supabase';
import { ProjectCategory } from '../types/projects';

export const getProjectCategories = async (): Promise<ProjectCategory[]> => {
  try {
    const { data, error } = await supabase
      .from('project_categories')
      .select('id, name, description')
      .order('id', { ascending: true });

    if (error) {
      throw new Error(`Error en Supabase: ${error.message}`);
    }

    return data as ProjectCategory[];
  } catch (error) {
    console.error(
      "Error al obtener categorías de proyectos:", 
      error instanceof Error ? error.message : "Error desconocido"
    );
    return [];
  }
};