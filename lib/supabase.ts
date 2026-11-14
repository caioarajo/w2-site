import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Cliente Supabase do servidor, com a chave secreta (service role).
 * NUNCA importar em componente 'use client': o import 'server-only' faz o build falhar se isso acontecer.
 */
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  client ??= createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
