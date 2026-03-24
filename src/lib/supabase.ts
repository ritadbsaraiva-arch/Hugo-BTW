/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only initialize if credentials exist to avoid "supabaseUrl is required" error
const client = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export const isSupabaseConfigured = () => Boolean(client);

/**
 * Export a proxy that throws a descriptive error only when accessed.
 * This prevents the entire app from crashing on startup if variables are missing.
 */
export const supabase = new Proxy({} as any, {
  get(_, prop) {
    if (!client) {
      const msg = 'Supabase credentials missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.';
      console.error(msg);
      throw new Error(msg);
    }
    return (client as any)[prop];
  }
});
