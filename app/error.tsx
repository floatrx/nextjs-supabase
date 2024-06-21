'use client';

import { Button } from '@nextui-org/button';
import { useEffect } from 'react';

import { Page } from '@/components/ui/layout/Page';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Page title="Error">
      <Button onClick={reset}>Try again</Button>
    </Page>
  );
}
