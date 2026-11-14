import type { MetadataRoute } from 'next';
import { cases, site } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/privacidade`, changeFrequency: 'yearly', priority: 0.2 },
    ...cases.map((c) => ({ url: `${site.url}/trabalhos/${c.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
