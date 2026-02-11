'use client';

import type { ButtonProps } from '@/lib/heroui';

import { useFormStatus } from 'react-dom';

import { Button } from '@/lib/heroui';

interface IProps extends ButtonProps {
  pendingText?: string;
}

export function Submit({ children, pendingText, ...props }: IProps) {
  const { pending, action } = useFormStatus();
  const isPending = pending && action === props.formAction;

  return (
    <Button
      aria-disabled={pending}
      disabled={pending}
      isLoading={isPending}
      size="lg"
      type="submit"
      variant="bordered"
      {...props}
    >
      {isPending ? pendingText || children : children}
    </Button>
  );
}
