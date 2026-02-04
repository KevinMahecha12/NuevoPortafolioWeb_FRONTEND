import { supabase } from '../lib/supabase';
import { ProjectDetails } from "../types/projects";

export const getProjects = async (): Promise<ProjectDetails[]> => {
  try {
    const { data, error } = await supabase
      .from('project_details_view')
      .select('*')
      .order('order', { ascending: true });

    if (error) {
      throw new Error(`Error en Supabase: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    return [];
  }
};