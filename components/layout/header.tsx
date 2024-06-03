import Link from 'next/link';
import AuthButton from '@/components/auth/AuthButton';
import Logo from '@/components/layout/Logo';

export const Header = async () => {
  return (
    <header className="w-full py-4">
      <div className="container  items-center gap-4 justify-between flex">
        <Link className="text-lg font-semibold text-foreground" href={'/'}>
          <Logo />
          <span className="sr-only">Supabase</span>
        </Link>
        <AuthButton />
      </div>
    </header>
  );
};
