import { googleLogin, login, signup } from '@/app/login/actions';
import { Form } from '@/components/form/Form';
import { Input } from '@/components/form/Input';
import { Submit } from '@/components/form/Submit';
import { HomeButton } from '@/components/layout/HomeButton';

export default function Login() {
  return (
    <div className="container flex flex-col w-full px-8 sm:max-w-md justify-center gap-4">
      <HomeButton />
      <h1 className="text-4xl">Login</h1>
      <Form className="flex flex-col gap-2">
        <Input name="email" placeholder="you@example.com" required />
        <Input type="password" name="password" placeholder="••••••••" required />
        <Submit
          formAction={login}
          className="bg-success text-success-foreground rounded-md px-4 py-2 mb-2 hover:bg-success/90"
          pendingText="Signing In..."
        >
          Sign In
        </Submit>
        <Submit
          formAction={signup}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing Up..."
        >
          Sign Up
        </Submit>
        <Submit
          formAction={googleLogin}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing Up..."
        >
          Google
        </Submit>
      </Form>
    </div>
  );
}
