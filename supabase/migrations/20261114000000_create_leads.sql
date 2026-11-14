-- Tabela de contatos (leads) vindos do formulário do site.
-- Rode este SQL no Supabase: painel do projeto → SQL Editor → New query → colar → Run.
-- Rode nos DOIS projetos (homologação e produção).

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  nome        text not null check (char_length(nome) between 1 and 120),
  empresa     text check (char_length(empresa) <= 120),
  email       text not null check (char_length(email) between 3 and 160),
  telefone    text check (char_length(telefone) <= 40),
  interesse   text check (char_length(interesse) <= 80),
  mensagem    text check (char_length(mensagem) <= 3000),
  ambiente    text not null default 'production'
              check (ambiente in ('production', 'homolog', 'development')),
  status      text not null default 'novo'
              check (status in ('novo', 'em_contato', 'proposta', 'fechado', 'descartado'))
);

comment on table public.leads is 'Contatos recebidos pelo formulário do site W2.';
comment on column public.leads.status is 'Funil comercial: novo → em_contato → proposta → fechado/descartado.';

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

-- Segurança: RLS ligado e NENHUMA policy.
-- Visitantes (chaves anon/publishable) não conseguem ler nem gravar.
-- Só o servidor do site, com a chave secreta (service role), grava os contatos.
alter table public.leads enable row level security;
