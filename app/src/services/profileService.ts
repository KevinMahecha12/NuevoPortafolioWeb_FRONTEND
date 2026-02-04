import { supabase } from '../lib/supabase';
import { Profile } from '../types/profile';

export const getProfileData = async (): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase.from('profile').select('*').single();

    if (error) throw new Error(`Error en Supabase: ${error.message}`);

    return data as Profile; 
  } catch (error) {
    console.error("Error al obtener perfil:", error instanceof Error ? error.message : "Error desconocido");
    return null; 
  }
};