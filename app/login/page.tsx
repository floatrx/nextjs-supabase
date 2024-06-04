import { Input } from '@nextui-org/input';

import { githubLogin, googleLogin, login, signup } from '@/app/login/actions';
import { Form } from '@/components/form/Form';
import { Submit } from '@/components/form/Submit';
import { GitHubIcon } from '@/components/icons/GithubIcon';
import { GoogleIcon } from '@/components/icons/GoogleIcon';

export default function LoginPage({ searchParams }: { searchParams: { message: string } }) {
  return (
    <div className="container flex w-full flex-col justify-center gap-4 px-8 sm:max-w-md">
      <h1 className="text-4xl">Login</h1>
      <Form className="flex flex-col gap-2">
        <Input name="email" placeholder="you@example.com" />
        <Input name="password" placeholder="••••••••" type="password" />
        <Submit
          className="mb-2 rounded-md bg-success px-4 py-2 text-success-foreground hover:bg-success/90"
          formAction={login}
          pendingText="Signing In..."
        >
          Sign In
        </Submit>
        <Submit
          className="mb-2 rounded-md border border-foreground/20 px-4 py-2 text-foreground"
          formAction={signup}
          pendingText="Signing Up..."
        >
          Sign Up
        </Submit>
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t" />
          <span className="mx-4 flex-shrink text-gray-400">Or</span>
          <div className="flex-grow border-t" />
        </div>
        <Submit className="stack mb-2 justify-center rounded-md border px-4 py-2" formAction={googleLogin} pendingText="Signing in...">
          <GoogleIcon /> Google
        </Submit>
        <Submit className="stack mb-2 justify-center rounded-md border px-4 py-2" formAction={githubLogin} pendingText="Signing in...">
          <GitHubIcon /> GitHub
        </Submit>
      </Form>

      {searchParams?.message && <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">{searchParams.message}</p>}
    </div>
  );
}
