import type { MetadataRoute } from 'next';
import { site } from '@/lib/content';
import { isProduction } from '@/lib/env';

export default function robots(): MetadataRoute.Robots {
  // Homologação e desenvolvimento: bloqueia todos os buscadores.
  if (!isProduction) return { rules: { userAgent: '*', disallow: '/' } };
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${site.url}/sitemap.xml` };
}
