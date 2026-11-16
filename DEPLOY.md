# Publicação: GitHub + Vercel + Supabase

Como o projeto está organizado:

| Peça | Função |
|---|---|
| **GitHub** | Guarda o código. A branch `main` é o site no ar. |
| **Vercel** | Hospeda o site. Cada push na `main` publica a nova versão em cerca de 1 minuto. |
| **Supabase** | Banco de dados. Guarda os contatos do formulário na tabela `leads`. |

- Repositório: https://github.com/caioarajo/w2-site
- Site: https://w2-site-eight.vercel.app

Fluxo do dia a dia: **altera → confere em `npm run dev` (http://localhost:3000) → commit → push na `main` → no ar.**

> Antes do push, rode `npm run build` para garantir que não há erro. Se o build falhar na Vercel,
> o site continua na versão anterior e nada quebra para os visitantes.

---

## 1. Publicar uma alteração

```bash
cd "C:\PROJETOS\SITE W2"
npm run build                 # confere se está tudo certo
git add .
git commit -m "Descreva a alteração"
git push                      # publica na produção
```

Para desfazer uma publicação: na Vercel, em **Deployments**, abra um deploy anterior e use **Promote to Production**.

## 2. Supabase (uma vez só)

1. Em https://supabase.com/dashboard, crie um projeto `w2-site`. Use a região South America (São Paulo).
2. Abra **SQL Editor → New query**, cole o conteúdo de
   [`supabase/migrations/20261114000000_create_leads.sql`](supabase/migrations/20261114000000_create_leads.sql) e clique em **Run**.
3. Anote em **Project Settings → API**:
   - **Project URL**, que vai para `SUPABASE_URL`
   - **service_role / secret key**, que vai para `SUPABASE_SERVICE_ROLE_KEY`. Essa chave é secreta: não compartilhe nem coloque no código.

Os contatos aparecem em **Table Editor → leads**. A coluna `status` serve de funil: novo, em contato, proposta, fechado.

## 3. Variáveis na Vercel (uma vez só)

Em **Settings → Environment Variables**, ambiente **Production**:

| Variável | Valor |
|---|---|
| `SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | chave secreta do Supabase |
| `NEXT_PUBLIC_SITE_URL` | `https://w2comunicacao.com.br`. Só depois de ligar o domínio; é o que libera o Google. |
| `RESEND_API_KEY` (opcional) | chave do Resend, para receber cada contato por e-mail |
| `NEXT_PUBLIC_GA_ID` (opcional) | `G-XXXXXXX` do Google Analytics |

Depois de cadastrar, vá em **Deployments** e use **Redeploy** no último deploy para que as variáveis passem a valer.

## 4. Domínio oficial

Em **Settings → Domains**, adicione `w2comunicacao.com.br` e `www.w2comunicacao.com.br`. A Vercel mostra os registros DNS a criar no provedor do domínio.

Depois cadastre `NEXT_PUBLIC_SITE_URL` (passo 3) e faça um **Redeploy**.

## Google: quando o site aparece nas buscas

| Situação | Google |
|---|---|
| Endereço provisório `w2-site-eight.vercel.app` | bloqueado (`noindex`), para não competir com o domínio oficial |
| Produção com `NEXT_PUBLIC_SITE_URL` cadastrada | liberado, com sitemap |
| Qualquer outra branch enviada ao GitHub (deploy de teste da Vercel) | bloqueado e com o selo laranja "Homologação" |
