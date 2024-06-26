'use client';

import type { AnyFn } from '@/types';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Spinner } from '@nextui-org/spinner';
import { LogIn, UserPlus, Mail, Lock } from 'lucide-react';
import { useTransition, useRef } from 'react';

import { Logo } from '@/components/icons';
import { GitHubIcon } from '@/components/icons/GithubIcon';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { formVariants } from '@/components/primitives';
import { DividerText } from '@/components/ui/DividerText';
import { Form } from '@/components/ui/form/Form';
import { InputPassword } from '@/components/ui/form/InputPassword';
import { login, signup, googleLogin, githubLogin } from '@/features/auth/actions/auth';

interface IProps {
  message?: string;
}

export const LoginForm: RC<IProps> = ({ message }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isSubmitting, startTransition] = useTransition();

  const icoProps = {
    className: 'opacity-45',
    size: 19,
  };

  const handleLogin = (fn: AnyFn) => () => {
    startTransition(async () => {
      await fn(new FormData(formRef.current!));
    });
  };

  return (
    <div className="container relative flex w-full flex-col justify-center gap-4 px-8 sm:max-w-sm">
      <h1 className="text-center text-4xl">
        <Logo className="m-auto size-20" />
        <span className="sr-only">Login</span>
      </h1>
      {isSubmitting && <Spinner className="absolute inset-0 m-auto" size="lg" title="Logging in..." />}
      <Form ref={formRef} className={formVariants({ isSubmitting })} size="lg" variant="bordered">
        <Input name="email" placeholder="you@example.com" startContent={<Mail {...icoProps} />} />
        <InputPassword name="password" placeholder="••••••••" startContent={<Lock {...icoProps} />} />
        <Button color="primary" variant="ghost" onClick={handleLogin(login)}>
          <LogIn /> Sign In
        </Button>
        <Button onClick={handleLogin(signup)}>
          <UserPlus /> Sign Up
        </Button>
        <DividerText text="or" />
        <Button onClick={handleLogin(googleLogin)}>
          <GoogleIcon /> Google
        </Button>
        <Button onClick={handleLogin(githubLogin)}>
          <GitHubIcon /> GitHub
        </Button>
      </Form>

      {message && <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">{message}</p>}
    </div>
  );
};
