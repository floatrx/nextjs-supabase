'use client';

import { Button } from '@heroui/button';
import { useEffect } from 'react';

import { Page } from '@/components/ui/layout/Page';

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
