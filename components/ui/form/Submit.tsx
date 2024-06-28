'use client';

import { Button, type ButtonProps } from '@nextui-org/button';
import { useFormStatus } from 'react-dom';

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
