import { Page } from '@/components/ui/layout/Page';
import { getMetadata } from '@/lib/next';

export const metadata = getMetadata('Blog');

export default function BlogPage() {
  return <Page meta={metadata}>Move articles here...</Page>;
}
