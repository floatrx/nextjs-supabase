import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

/**
 * Animated form component
 * NOTE: This component has a forwardRef, for reset() method
 * @param props - supports all <form> props
 */
export const Form: FC<ComponentProps<'form'>> = forwardRef(function FormComponent({ className, ...props }, forwardedRef) {
  return <form ref={forwardedRef} className={cn('w-full animate-in', className)} {...props} />;
});
