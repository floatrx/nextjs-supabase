'use client';

import type { InputProps } from '@/lib/heroui';

import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';

import { Input } from '@/lib/heroui';

type IProps = InputProps;

export const InputPassword = forwardRef<HTMLInputElement, IProps>((props, forwardedRef) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      {...props}
      ref={forwardedRef}
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeOff className="text-default-400 pointer-events-none size-5" />
          ) : (
            <Eye className="text-default-400 pointer-events-none size-5" />
          )}
        </button>
      }
      placeholder="••••••••"
      type={isVisible ? 'text' : 'password'}
    />
  );
});

InputPassword.displayName = 'InputPassword';
