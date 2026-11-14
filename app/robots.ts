import type { MetadataRoute } from 'next';
import { site } from '@/lib/content';
import { isIndexable } from '@/lib/env';

export default function robots(): MetadataRoute.Robots {
  // Homologação, desenvolvimento ou produção sem domínio oficial: bloqueia todos os buscadores.
  if (!isIndexable) return { rules: { userAgent: '*', disallow: '/' } };
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${site.url}/sitemap.xml` };
}
