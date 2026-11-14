'use server';

import { getSupabase } from '@/lib/supabase';
import { siteEnv } from '@/lib/env';

export type ContactState = { ok: boolean; message: string; errors?: Record<string, string> };

type Lead = {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  interesse: string;
  mensagem: string;
};

const OK_MESSAGE = 'Recebemos sua mensagem! Retornamos em até 1 dia útil.';
const clean = (v: FormDataEntryValue | null, max = 500) => String(v ?? '').trim().slice(0, max);

/** Grava o lead na tabela `leads` do Supabase. Retorna null se o Supabase não estiver configurado. */
async function saveToSupabase(lead: Lead): Promise<boolean | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { error } = await supabase.from('leads').insert({
    ...lead,
    empresa: lead.empresa || null,
    telefone: lead.telefone || null,
    mensagem: lead.mensagem || null,
    ambiente: siteEnv,
  });
  if (error) console.error('[contato] Supabase:', error.message);
  return !error;
}

/** Envia o lead por e-mail via Resend. Retorna null se o Resend não estiver configurado. */
async function sendEmail(lead: Lead): Promise<boolean | null> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  const prefix = siteEnv === 'production' ? '' : '[HOMOLOGAÇÃO] ';
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? 'Site W2 <onboarding@resend.dev>',
        to: [process.env.CONTACT_TO ?? 'contato@w2comunicacao.com.br'],
        reply_to: lead.email,
        subject: `${prefix}[Site W2] Novo contato: ${lead.nome}`,
        text: Object.entries(lead).map(([k, v]) => `${k}: ${v}`).join('\n'),
      }),
    });
    if (!res.ok) console.error('[contato] Resend:', res.status);
    return res.ok;
  } catch (err) {
    console.error('[contato] Resend:', err);
    return false;
  }
}

/** Server Action do formulário de contato. */
export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot anti-spam
  if (clean(form.get('site'))) return { ok: true, message: OK_MESSAGE };

  const lead: Lead = {
    nome: clean(form.get('nome'), 120),
    empresa: clean(form.get('empresa'), 120),
    email: clean(form.get('email'), 160),
    telefone: clean(form.get('telefone'), 40),
    interesse: clean(form.get('interesse'), 80),
    mensagem: clean(form.get('mensagem'), 3000),
  };

  const errors: Record<string, string> = {};
  if (!lead.nome) errors.nome = 'Informe seu nome.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) errors.email = 'Informe um e-mail válido.';
  if (!form.get('lgpd')) errors.lgpd = 'É preciso aceitar a política de privacidade.';
  if (Object.keys(errors).length) return { ok: false, message: 'Confira os campos destacados.', errors };

  const results = await Promise.all([saveToSupabase(lead), sendEmail(lead)]);
  const configured = results.filter((r) => r !== null);

  if (configured.length === 0) {
    // Nada configurado (ex.: rodando localmente): só registra no log.
    console.info('[contato] Supabase e Resend não configurados. Lead recebido:', lead);
    return { ok: true, message: OK_MESSAGE };
  }

  // Basta um canal funcionar para o contato não se perder.
  if (configured.some(Boolean)) return { ok: true, message: OK_MESSAGE };

  return { ok: false, message: 'Não foi possível enviar agora. Fale com a gente pelo WhatsApp.' };
}
