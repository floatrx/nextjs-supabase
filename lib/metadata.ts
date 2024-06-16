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
    default: title,
    template: `%s • ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
  ...overrides,
});
