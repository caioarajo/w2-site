# Publicação: GitHub + Vercel + Supabase

Como o projeto está organizado:

| Peça | Função |
|---|---|
| **GitHub** | Guarda o código. Branch `homolog` = homologação, branch `main` = produção. |
| **Vercel** | Hospeda o site. Cada push na `homolog` atualiza a homologação; cada push na `main` atualiza a produção. |
| **Supabase** | Banco de dados. Guarda os contatos do formulário na tabela `leads`. Um projeto para cada ambiente. |

Fluxo do dia a dia: **altera → push na `homolog` → cliente aprova no link de homologação → merge na `main` → produção.**

---

## 1. GitHub (uma vez só)

O repositório local já está criado, com o primeiro commit e as branches `main` e `homolog`.

1. Crie um repositório **privado e vazio** em https://github.com/new, com o nome `w2-site`. Não marque README nem .gitignore.
2. No terminal, dentro de `C:\PROJETOS\SITE W2`, troque `SEU-USUARIO` e rode:

```bash
git remote add origin https://github.com/SEU-USUARIO/w2-site.git
git push -u origin main
git push -u origin homolog
```

Na primeira vez, o Windows abre uma janela de login do GitHub.

## 2. Supabase (uma vez só)

1. Em https://supabase.com/dashboard, crie **dois projetos**: `w2-homolog` e `w2-producao`. Use a região South America (São Paulo).
2. Em **cada** projeto, abra **SQL Editor → New query**, cole o conteúdo de
   [`supabase/migrations/20261114000000_create_leads.sql`](supabase/migrations/20261114000000_create_leads.sql) e clique em **Run**.
3. Em cada projeto, anote em **Project Settings → API**:
   - **Project URL**, que vai para `SUPABASE_URL`
   - **service_role / secret key**, que vai para `SUPABASE_SERVICE_ROLE_KEY`. Essa chave é secreta: não compartilhe nem coloque no código.

Os contatos aparecem em **Table Editor → leads**. A coluna `status` serve de funil: novo, em contato, proposta, fechado.

## 3. Vercel (uma vez só)

1. Entre em https://vercel.com com a conta do GitHub, clique em **Add New → Project**, importe o `w2-site` e clique em **Deploy**. O Next.js é detectado sozinho.
2. Em **Settings → Environment Variables**, cadastre:

| Variável | Production (`main`) | Preview (`homolog`) |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://w2comunicacao.com.br` | `https://homolog.w2comunicacao.com.br` |
| `SUPABASE_URL` | URL do `w2-producao` | URL do `w2-homolog` |
| `SUPABASE_SERVICE_ROLE_KEY` | chave do `w2-producao` | chave do `w2-homolog` |
| `RESEND_API_KEY` (opcional) | sua chave | sua chave |
| `NEXT_PUBLIC_GA_ID` (opcional) | `G-XXXXXXX` | deixe vazio |

3. Em **Settings → Domains**, adicione:
   - `w2comunicacao.com.br`, ligado à **Production**
   - `homolog.w2comunicacao.com.br`, ligado à branch **`homolog`** (opção *Git Branch*)

   A Vercel mostra os registros DNS a criar no seu provedor de domínio.
4. Em **Settings → Deployment Protection**, ative **Vercel Authentication** ou **Password Protection** para os deploys de Preview. Assim só a equipe e o cliente abrem a homologação.
5. Depois de cadastrar as variáveis, vá em **Deployments** e use **Redeploy** no último deploy de cada branch, para que elas passem a valer.

## O que muda sozinho entre os ambientes

| | Homologação | Produção |
|---|---|---|
| Selo laranja "Homologação" no topo | aparece | não aparece |
| Google (robots.txt e meta robots) | bloqueado | liberado, com sitemap |
| Google Analytics | desligado | ligado após o consentimento de cookies |
| Assunto do e-mail de contato | começa com `[HOMOLOGAÇÃO]` | normal |
| Coluna `ambiente` no Supabase | `homolog` | `production` |

## Publicar uma alteração

```bash
git checkout homolog
# ...edite os arquivos...
git add .
git commit -m "Descreva a alteração"
git push                      # atualiza a homologação

# depois da aprovação:
git checkout main
git merge homolog
git push                      # atualiza a produção
git checkout homolog
```
