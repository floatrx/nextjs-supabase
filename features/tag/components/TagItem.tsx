'use client';

import type { TTag } from '@/types/tag';
import type { ReactNode } from 'react';

import { tv, VariantProps } from 'tailwind-variants';

import { cn } from '@/lib/utils/cn';
import { upperFirst } from '@/lib/utils/upperFirst';

type Variants = VariantProps<typeof variants>;

export interface TagItemProps extends Variants {
  tag: TTag;
  actions?: ReactNode;
  className?: string;
}

const variants = tv({
  base: 'inline-flex items-center py-[2px]',
  variants: {
    size: {
      sm: 'text-sm gap-1 px-1 rounded-md',
      md: 'text-md px-2 gap-1 rounded-lg',
      lg: 'text-lg px-3 gap-2 rounded-lg',
    },
    variant: {
      flat: 'shadow-sm',
      light: '',
      plain: 'px-0',
    },
    bordered: {
      true: 'border border-b',
    },
    interactive: {
      true: 'cursor-pointer hover:bg-foreground-100',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'flat',
  },
});

export const TagItem: RC<TagItemProps> = ({ tag, actions, className, ...variantProps }) => (
  <div className={cn(variants(variantProps), className)}>
    <span className="flex items-center">
      <em className="mr-1 text-[.85em] not-italic opacity-45">#</em>
      {upperFirst(tag.name)}
    </span>
    {actions}
  </div>
);
