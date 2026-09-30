import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: 'monthly' | 'yearly' }[] = [
    { path: '/', priority: 1, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.9, changeFrequency: 'yearly' },
    { path: '/programs', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/projects', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/gallery', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/donate', priority: 0.9, changeFrequency: 'yearly' },
    { path: '/volunteer', priority: 0.8, changeFrequency: 'yearly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
  ];
  return routes.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
