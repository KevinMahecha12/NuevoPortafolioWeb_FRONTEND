import { supabase } from '../lib/supabase';

export const getProfileData = async () => {
  try {
    const { data, error } = await supabase.from('profile').select('*');

    if (error) {
      throw new Error(`Error en Supabase: ${error.message}`);
    }

    return data || []; 

  } catch (error) {
    console.error("Error al obtener perfil:", error.message);
    return []; 
  }
};