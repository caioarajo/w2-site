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
