'use client';

import { useFormStatus } from 'react-dom';

type Props = ComponentProps<'button'> & {
  pendingText?: string;
};

export function Submit({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <button {...props} type="submit" aria-disabled={pending} disabled={pending}>
      {isPending ? pendingText : children}
    </button>
  );
}
