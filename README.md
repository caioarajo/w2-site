# Site W2 Comunicação e Consultoria

Site institucional da W2, feito na mesma stack do lpcerimonial.com.br: **Next.js 16 (App Router) + React 19 + TypeScript**, com CSS próprio e hospedagem pronta para a **Vercel**.

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção (gera as páginas estáticas)
npm start        # serve o build
```

Copie `.env.example` para `.env.local` e preencha o que for usar (e-mail do formulário, Google Analytics).

## Estrutura

```
app/
  layout.tsx            fontes (next/font), SEO, Open Graph, JSON-LD, header/footer
  page.tsx              home
  actions.ts            Server Action do formulário (envio via Resend)
  trabalhos/[slug]/     página de cada case (gerada estaticamente)
  privacidade/          política de privacidade (LGPD — revisar com jurídico)
  sitemap.ts, robots.ts, icon.svg, not-found.tsx
  globals.css           design system completo
components/             Header, HubsScroller, CasesCarousel, Manifesto, MethodSteps,
                        ContactForm, CookieConsent, Cursor, Counter, Reveal, LogoMark...
lib/content.ts          TODO o conteúdo do site (serviços, cases, planos, contatos)
_arquivo/               versões anteriores (protótipo HTML e tema WordPress)
```

**Para editar textos, serviços, cases, planos, WhatsApp e e-mail:** altere `lib/content.ts`.

## Stack e decisões

| Item | Escolha |
|---|---|
| Framework | Next.js 16.3.8 (App Router, Turbopack, Server Components) |
| UI | React 19 + TypeScript |
| Estilo | CSS puro com variáveis (sem Tailwind, como a referência) |
| Fontes | `next/font` (Unbounded + Manrope), auto-hospedadas e sem layout shift |
| Animações | Nativas: IntersectionObserver, `requestAnimationFrame` e CSS. **Zero bibliotecas de animação.** |
| Formulário | Server Action com validação, honeypot anti-spam e aceite LGPD. Envia e-mail pela API do Resend. |
| Analytics | Google Analytics 4, carregado **só após o consentimento** de cookies |
| SEO | Metadata API, Open Graph, sitemap.xml, robots.txt, Schema.org `ProfessionalService` |
| Hospedagem | Vercel: importar o repositório e publicar |

## Publicação (homologação e produção)

O passo a passo completo de GitHub, Vercel e Supabase está em **[DEPLOY.md](DEPLOY.md)**.

- Branch `homolog` → site de homologação: selo laranja, bloqueado para o Google, sem Analytics.
- Branch `main` → site de produção.
- Contatos do formulário → tabela `leads` no Supabase (SQL em `supabase/migrations/`) e, se configurado, e-mail pelo Resend.

## Próximos passos sugeridos

- Trocar cases, clientes e números de exemplo pelos reais, com fotos e vídeos via `next/image`.
- Criar a imagem de Open Graph (`app/opengraph-image.png`, 1200×630).
- Se a equipe for publicar cases e artigos sozinha, conectar um CMS headless (**Sanity** ou **Payload CMS**) no lugar de `lib/content.ts`.
- Adicionar o blog "Insights" (`app/insights`) para SEO.
