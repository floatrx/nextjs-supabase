'use client';

import { useEffect } from 'react';

import { Page } from '@/components/ui/layout/Page';
import { Button } from '@/lib/heroui';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Page title="Error">
      <Button onPress={reset}>Try again</Button>
    </Page>
  );
}
