'use client';

import { type InputProps, Input } from '@heroui/input';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@heroui/shared-icons';
import { useState, forwardRef } from 'react';

interface IProps extends InputProps {}

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
            <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
          ) : (
            <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
          )}
        </button>
      }
      placeholder="••••••••"
      type={isVisible ? 'text' : 'password'}
    />
  );
});

InputPassword.displayName = 'InputPassword';
