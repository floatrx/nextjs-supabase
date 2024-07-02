'use client';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Spinner } from '@nextui-org/spinner';
import { LogIn, UserPlus, Mail, Lock } from 'lucide-react';
import { useTransition, useRef } from 'react';
import { toast } from 'sonner';

import { Logo } from '@/components/icons';
import { GitHubIcon } from '@/components/icons/GithubIcon';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { formVariants } from '@/components/primitives';
import { DividerText } from '@/components/ui/DividerText';
import { Form } from '@/components/ui/form/Form';
import { InputPassword } from '@/components/ui/form/InputPassword';
import { login, signup, type AuthActionFn } from '@/features/auth/actions/baseAuth';
import { githubLogin, googleLogin } from '@/features/auth/actions/baseOAuth';

interface IProps {
  message?: string;
}

export const AuthLoginForm: RC<IProps> = ({ message }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isSubmitting, startTransition] = useTransition();

  const icoProps = {
    className: 'opacity-45',
    size: 19,
  };

  // With transition wrapper allows tracking the transition pending state
  const withTransition = (fn: AuthActionFn) => () => {
    startTransition(async () => {
      try {
        const [, err] = (await fn(new FormData(formRef.current!))) ?? []; // next.js redirects from sa -> returns undefined, so we use empty array as fallback

        if (err) {
          throw new Error(err.message); // coz: fn is safe async function
        }
        toast.success('Login successful');
      } catch (e) {
        toast.error(e.message);
      }
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
        <Button color="primary" variant="ghost" onClick={withTransition(login)}>
          <LogIn /> Sign In
        </Button>
        <Button onClick={withTransition(signup)}>
          <UserPlus /> Sign Up
        </Button>
        <DividerText text="or" />
        <Button onClick={withTransition(googleLogin)}>
          <GoogleIcon /> Google
        </Button>
        <Button onClick={withTransition(githubLogin)}>
          <GitHubIcon /> GitHub
        </Button>
      </Form>

      {message && <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">{message}</p>}
    </div>
  );
};
