'use client';

import { type InputProps, Input } from '@nextui-org/input';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons';
import { useState } from 'react';

interface IProps extends InputProps {}

export const InputPassword: FC<IProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      placeholder="••••••••"
      {...props}
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
          ) : (
            <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
          )}
        </button>
      }
      type={isVisible ? 'text' : 'password'}
    />
  );
};
