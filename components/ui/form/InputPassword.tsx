'use client';

import { forwardRef, useState } from 'react';

import { Input, type InputProps } from '@heroui/input';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@heroui/shared-icons';

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
            <EyeSlashFilledIcon className="text-default-400 pointer-events-none text-2xl" />
          ) : (
            <EyeFilledIcon className="text-default-400 pointer-events-none text-2xl" />
          )}
        </button>
      }
      placeholder="••••••••"
      type={isVisible ? 'text' : 'password'}
    />
  );
});

InputPassword.displayName = 'InputPassword';
