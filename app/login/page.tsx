/**
 * TODO: REWRITE THIS MODULE USING:
 *  1. `useFormState` and `useForm` hooks
 *   Add toast messages and form submission handling
 *   instead of redirecting with message...
 *  2. Split the form into separate component
 */
import { Input } from '@nextui-org/input';

import { Logo } from '@/components/icons';
import { GitHubIcon } from '@/components/icons/GithubIcon';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { Form } from '@/components/ui/form/Form';
import { Submit } from '@/components/ui/form/Submit';
import { getMetadata } from '@/lib/next';
import { githubLogin, googleLogin, login, signup } from '@/server/actions/auth';

export const metadata = getMetadata('Login');

export default function LoginPage({ searchParams }: PageProps<EmptyObj, { message?: string }>) {
  return (
    <div className="container flex w-full flex-col justify-center gap-4 px-8 sm:max-w-sm">
      <h1 className="text-center text-4xl">
        <Logo className="m-auto size-20" />
        <span className="sr-only">Login</span>
      </h1>
      <Form className="flex flex-col gap-2">
        <Input name="email" placeholder="you@example.com" size="lg" />
        <Input name="password" placeholder="••••••••" size="lg" type="password" />
        <Submit formAction={login} variant="bordered">
          Sign In
        </Submit>
        <Submit formAction={signup}>Sign Up</Submit>
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t" />
          <span className="mx-4 flex-shrink text-gray-400">Or</span>
          <div className="flex-grow border-t" />
        </div>
        <Submit formAction={googleLogin}>
          <GoogleIcon /> Google
        </Submit>
        <Submit formAction={githubLogin}>
          <GitHubIcon /> GitHub
        </Submit>
      </Form>

      {searchParams?.message && <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">{searchParams.message}</p>}
    </div>
  );
}
