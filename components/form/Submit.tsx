'use client';

import { useFormStatus } from 'react-dom';
import { Button, type ButtonProps } from '@nextui-org/button';

interface IProps extends ButtonProps {
  pendingText?: string;
}

export function Submit({ children, pendingText, ...props }: IProps) {
  const { pending, action } = useFormStatus();
  const isPending = pending && action === props.formAction;

  return (
    <Button {...props} aria-disabled={pending} disabled={pending} type="submit">
      {isPending ? pendingText : children}
    </Button>
  );
}
