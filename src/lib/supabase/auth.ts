import { supabase } from './client';
import type { AuthError } from '@supabase/supabase-js';

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        persistSession: true
      }
    });

    if (error) {
      console.error('Error signing in:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Auth error:', error);
    throw error;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut({
    scope: 'local'  // Solo cierra la sesión en este dispositivo
  });
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session?.user ?? null;
}

export async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session !== null;
}