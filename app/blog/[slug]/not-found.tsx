import Link from 'next/link';

import { Page } from '@/components/ui/layout/Page';
import { Button } from '@/lib/heroui';

export default function NotFound() {
  return (
    <Page title="Post not found">
      <div className="flex flex-col items-center gap-4">
        <p className="text-muted-foreground">The blog post you're looking for doesn't exist or has been deleted.</p>
        <Button as={Link} href="/">
          Back to home
        </Button>
      </div>
    </Page>
  );
}
