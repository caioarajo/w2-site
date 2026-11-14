/**
 * Ambiente do site.
 * - Na Vercel, VERCEL_ENV vem preenchido: "production" (branch main) ou "preview" (homolog e outras).
 * - Fora da Vercel, defina SITE_ENV=production ou SITE_ENV=homolog.
 * Lido no build: cada deploy da Vercel faz o próprio build, então cada ambiente recebe o valor certo.
 */
const raw = process.env.SITE_ENV ?? process.env.VERCEL_ENV ?? 'development';

export const siteEnv: 'production' | 'homolog' | 'development' =
  raw === 'production' ? 'production' : raw === 'preview' || raw === 'homolog' ? 'homolog' : 'development';

export const isProduction = siteEnv === 'production';
export const isHomolog = siteEnv === 'homolog';

/**
 * Só libera o Google quando é produção E o domínio oficial foi configurado (NEXT_PUBLIC_SITE_URL).
 * Assim o endereço provisório *.vercel.app nunca é indexado.
 */
export const isIndexable = isProduction && Boolean(process.env.NEXT_PUBLIC_SITE_URL);

/**
 * Endereço público do site, usado em canonical, sitemap e Open Graph.
 * Ordem: domínio oficial → domínio de produção da Vercel → endereço fixo da branch → deploy atual → local.
 * (VERCEL_URL muda a cada deploy, por isso é só o último recurso.)
 */
function vercelUrl(host?: string) {
  return host ? `https://${host}` : undefined;
}

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (isProduction ? vercelUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) : undefined) ??
  vercelUrl(process.env.VERCEL_BRANCH_URL) ??
  vercelUrl(process.env.VERCEL_URL) ??
  'http://localhost:3000';
