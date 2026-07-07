import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const guardarDiagnostico = async (respuestas, puntuaciones, analisis) => {
  const { data, error } = await supabase
    .from('diagnosticos')
    .insert([{
      respuestas,
      puntuaciones,
      recomendaciones: analisis,
      estado: 'pendiente_email',
      created_at: new Date().toISOString()
    }])
    .select();

  if (error) throw error;
  return data[0];
};

export const guardarLead = async (email, nombre, idDiagnostico, planRecomendado, ofertaExpira) => {
  const { data, error } = await supabase
    .from('leads')
    .insert([{
      email,
      nombre,
      id_diagnostico: idDiagnostico,
      plan_recomendado: planRecomendado,
      oferta_expira: ofertaExpira,
      created_at: new Date().toISOString()
    }])
    .select();

  if (error) throw error;
  return data[0];
};

export const actualizarEstadoDiagnostico = async (id, estado) => {
  const { error } = await supabase
    .from('diagnosticos')
    .update({ estado })
    .eq('id', id);

  if (error) throw error;
};
