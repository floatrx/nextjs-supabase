/**
 * ✨Next.js specific utilities
 */

import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

/**
 * Generate metadata for the page
 * NOTE: Should be used in server side rendering only!
 * @param title
 * @param overrides
 * @example
 *  const title = 'Activities And Places';
 *  export const metadata = getMetadata(title);
 *
 *  export default function ActivitiesAndPlacesPage() {
 *    return (
 *      <PageLayout title={title}>
 *        <SearchActivities />
 *      </PageLayout>
 *    );
 *  }
 */
export const getMetadata = (title: string, overrides?: Omit<Metadata, 'title'>): Metadata => ({
  title: {
    template: `%s • ${siteConfig.name}`,
    default: title,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
  ...overrides,
});

/**
 * Get title from metadata or fallback to the provided title
 * @param meta - Next.js metadata
 * @param fallback - Fallback title (default: 'Untitled page')
 */
export const getTitleFromNextMetadata = ({ title }: Metadata = {}, fallback: string = 'Untitled page'): string => {
  if (typeof title === 'string') {
    return title;
  }

  if (title && typeof title === 'object' && 'default' in title) {
    return title.default;
  }

  return fallback;
};
