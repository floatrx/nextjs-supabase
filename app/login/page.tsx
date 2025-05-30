/**
 * TODO: REWRITE THIS MODULE USING:
 *  1. `useFormState` and `useForm` hooks
 *   Add toast messages and form submission handling
 *   instead of redirecting with message...
 *  2. Split the form into separate component
 */

import { redirect } from 'next/navigation';

import { getUser } from '@/features/auth/actions/getUser';
import { AuthController } from '@/features/auth/components/AuthController';
import { getMetadata } from '@/lib/next/metadata';

export const metadata = getMetadata('Login');

export default async function LoginPage(props: PageProps<EmptyObj, { message?: string }>) {
  const searchParams = await props.searchParams;
  const [user] = await getUser();

  // Redirect to home if user is already logged in
  if (user) return redirect('/');

  // Show login form for unauthorized users
  return <AuthController message={searchParams.message} />;
}
