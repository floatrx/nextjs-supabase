import type { ButtonProps } from '@nextui-org/button';

import { forwardRef, Children, isValidElement, cloneElement } from 'react';

import { cn } from '@/lib/utils/cn';

interface IProps extends ComponentProps<'form'>, Pick<ButtonProps, 'size' | 'variant'> {}

/**
 * Animated form component
 * NOTE: This component has a forwardRef, for reset() method
 * @param props - supports all <form> props
 */
export const Form: FC<IProps> = forwardRef(function FormWrapper(
  { className, children, size, variant, ...props },
  forwardedRef,
) {
  return (
    <form ref={forwardedRef} className={cn('w-full', className)} {...props}>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // @ts-ignore -> add custom props to children, but keep original props if conflict
          return cloneElement(child, { size, variant, ...child.props });
        }

        return child;
      })}
    </form>
  );
});
