'use client';

import { useEffect } from 'react';

import { Page } from '@/components/ui/layout/Page';
import { Button } from '@/lib/heroui';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Page title="Error loading post">
      <div className="flex flex-col items-center gap-4">
        <p className="text-muted-foreground">{error.message || 'Failed to load blog post'}</p>
        <Button onPress={reset}>Try again</Button>
      </div>
    </Page>
  );
}
