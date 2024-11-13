'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Spinner } from '@nextui-org/spinner';
import { LogIn, UserPlus, Mail, Lock } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Logo } from '@/components/icons';
import { formVariants } from '@/components/primitives';
import { Form } from '@/components/ui/form/Form';
import { InputPassword } from '@/components/ui/form/InputPassword';
import { EmailLoginSchema } from '@/features/auth/actions/validators/emailLoginSchema';
import { AuthTabs, type AuthTabKey } from '@/features/auth/components/AuthTabs';
import { upperFirst } from '@/lib/utils/upperFirst';
import { humanizeError } from '@/lib/zod/humanizeError';

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
    <div className="container relative flex w-full flex-col justify-center gap-4 px-8 sm:max-w-sm">
      <h1 className="text-center text-4xl">
        <Logo className="m-auto size-20" />
        <span className="sr-only">Login</span>
      </h1>

      {isSubmitting && <Spinner className="absolute inset-0 m-auto" size="lg" title="Logging in..." />}

      <AuthTabs active={activeTab} onTabChange={setActiveTab} />

      <Form ref={formRef} className={formVariants({})} size="lg" variant="bordered" onSubmit={handleSubmit}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input {...field} name="email" placeholder="you@example.com" startContent={<Mail {...icoProps} />} />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => <InputPassword {...field} startContent={<Lock {...icoProps} />} />}
        />

        <Button color="primary" type="submit" variant="ghost">
          {activeTab === 'login' ? <LogIn /> : <UserPlus />}
          {upperFirst(activeTab)}
        </Button>

        {children}
      </Form>

      {message && <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">{message}</p>}
    </div>
  );
};
