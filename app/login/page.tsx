import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Form } from '@/components/form/Form';
import { Input } from '@/components/form/Input';
import { Submit } from '@/components/form/Submit';
import { HomeButton } from '@/components/layout/HomeButton';
import { createClient } from '@/lib/supabase/server';

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect('/protected');
  };

  const signUp = async (formData: FormData) => {
    'use server';

    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: { from: 'signup' },
      },
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect('/login?message=Check email to continue sign in process');
  };

  return (
    <div className="container flex flex-col w-full px-8 sm:max-w-md justify-center gap-4">
      <HomeButton />
      <h1 className="text-4xl">Login</h1>
      <Form className="flex flex-col gap-2">
        <Input name="email" placeholder="you@example.com" required />
        <Input type="password" name="password" placeholder="••••••••" required />
        <Submit
          formAction={signIn}
          className="bg-success text-success-foreground rounded-md px-4 py-2 mb-2 hover:bg-success/90"
          pendingText="Signing In..."
        >
          Sign In
        </Submit>
        <Submit
          formAction={signUp}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing Up..."
        >
          Sign Up
        </Submit>
        {searchParams?.message && <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">{searchParams.message}</p>}
      </Form>
    </div>
  );
}
