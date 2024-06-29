import { Page } from '@/components/ui/layout/Page';
import { getMetadata } from '@/lib/next/metadata';

export const metadata = getMetadata('Blog');

export default function BlogPage() {
  return <Page meta={metadata}>Move articles here...</Page>;
}
