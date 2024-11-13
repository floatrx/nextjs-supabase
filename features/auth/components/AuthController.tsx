'use client';

import { Button } from '@nextui-org/button';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { GitHubIcon } from '@/components/icons/GithubIcon';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { DividerText } from '@/components/ui/DividerText';
import { login, signup } from '@/features/auth/actions/baseAuth';
import { googleLogin, githubLogin } from '@/features/auth/actions/baseOAuth';
import { AuthLoginForm, type IAuthLoginFormProps } from '@/features/auth/components/AuthLoginForm';

interface IProps extends IAuthLoginFormProps {}

type LoginHandler = IAuthLoginFormProps['onSubmit'];
type AuthActionFn = typeof googleLogin | typeof githubLogin;

export const AuthController: FC<IProps> = (props) => {
  const [, startTransition] = useTransition();

  // With transition wrapper allows tracking the transition pending state
  const withTransition = (fn: AuthActionFn) => () => {
    startTransition(async () => {
      try {
        await fn(); // next.js redirects from sa -> returns undefined, so we use empty array as fallback

        toast.success('Processing...');
      } catch (e) {
        toast.error(e.message);
      }
    });
  };

  const handleLogin: LoginHandler = async (action, credentials) => {
    try {
      const [, err] = await { login, signup }[action](credentials);

      if (err) {
        throw new Error(err.message); // coz: fn is safe async function
      }
      toast.success('Login successful');
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <AuthLoginForm {...props} onSubmit={handleLogin}>
      {/* OAUTH */}
      <DividerText text="or" />

      <Button onClick={withTransition(googleLogin)}>
        <GoogleIcon /> Google
      </Button>

      <Button onClick={withTransition(githubLogin)}>
        <GitHubIcon /> GitHub
      </Button>
    </AuthLoginForm>
  );
};
