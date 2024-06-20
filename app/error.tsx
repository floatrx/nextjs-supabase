'use client';

import { Button } from '@nextui-org/button';
import { useEffect } from 'react';

import { Heading } from '@/components/ui/layout/headings/Heading';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <Heading>Something went wrong!</Heading>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
