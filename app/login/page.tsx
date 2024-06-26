/**
 * TODO: REWRITE THIS MODULE USING:
 *  1. `useFormState` and `useForm` hooks
 *   Add toast messages and form submission handling
 *   instead of redirecting with message...
 *  2. Split the form into separate component
 */

import { redirect } from 'next/navigation';

import { LoginForm } from '@/features/auth/components/LoginForm';
import { authService } from '@/features/auth/services/auth';
import { getMetadata } from '@/lib/next';

export const metadata = getMetadata('Login');

export default async function LoginPage({ searchParams }: PageProps<EmptyObj, { message?: string }>) {
  const user = await authService.getUser();

  // Redirect to home if user is already logged in
  if (user) return redirect('/');

  // Show login form for unauthorized users
  return <LoginForm message={searchParams.message} />;
}
