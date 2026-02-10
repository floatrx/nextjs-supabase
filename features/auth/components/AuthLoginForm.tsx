'use client';

import { Lock, LogIn, Mail, UserPlus } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Logo } from '@/components/icons';
import { formVariants } from '@/components/primitives';
import { Form } from '@/components/ui/form/Form';
import { InputPassword } from '@/components/ui/form/InputPassword';
import { EmailLoginSchema } from '@/features/auth/actions/validators/emailLoginSchema';
import { type AuthTabKey, AuthTabs } from '@/features/auth/components/AuthTabs';
import { upperFirst } from '@/lib/utils/upperFirst';
import { humanizeError } from '@/lib/zod/humanizeError';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Spinner } from '@heroui/spinner';
import { zodResolver } from '@hookform/resolvers/zod';

export interface IAuthLoginFormProps {
  message?: string;
  onSubmit?: (action: AuthTabKey, credentials: z.infer<typeof EmailLoginSchema>) => Promise<void>;
  children?: React.ReactNode;
}

export const AuthLoginForm: RC<IAuthLoginFormProps> = ({ message, onSubmit, children }) => {
  const [activeTab, setActiveTab] = useState<AuthTabKey>('login');

  const { control, ...form } = useForm({
    resolver: zodResolver(EmailLoginSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const icoProps = {
    className: 'opacity-45',
    size: 19,
  };

  const [isSubmitting, startTransition] = useTransition();

  const handleSubmit = form.handleSubmit(
    async (credentials) => {
      startTransition(async () => {
        await onSubmit?.(activeTab, credentials);
      });
    },
    (errors) => {
      toast.error(humanizeError(errors));
    },
  );

  return (
    <div className="relative container flex w-full flex-col justify-center gap-4 px-8 sm:max-w-sm">
      <h1 className="text-center text-4xl">
        <Logo className="m-auto size-20" />
        <span className="sr-only">Login</span>
      </h1>

      {isSubmitting && <Spinner className="absolute inset-0 z-50 m-auto" size="lg" title="Logging in..." />}

      <AuthTabs active={activeTab} onTabChange={setActiveTab} />

      <Form ref={formRef} className={formVariants({})} size="lg" variant="bordered" onSubmit={handleSubmit}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              data-testid="email-input"
              name="email"
              placeholder="you@example.com"
              startContent={<Mail {...icoProps} />}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <InputPassword {...field} data-testid="password-input" startContent={<Lock {...icoProps} />} />
          )}
        />

        <Button color="primary" data-testid="auth-submit-button" type="submit" variant="ghost">
          {activeTab === 'login' ? <LogIn /> : <UserPlus />}
          {upperFirst(activeTab)}
        </Button>

        {children}
      </Form>

      {message && <p className="bg-foreground/10 text-foreground mt-4 p-4 text-center">{message}</p>}
    </div>
  );
};
