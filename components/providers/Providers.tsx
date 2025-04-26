'use client';

import { HeroUIProvider } from '@heroui/system';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

interface IProps extends ThemeProviderProps {
  defaultTheme: 'light' | 'dark' | 'system' | undefined; // compatible with Toaster theme prop
}

/**
 * Providers composition
 *  1. HeroUIProvider
 *  2. NextThemesProvider
 *  3. Toaster
 *  4. NextTopLoader
 */
export function Providers({ children, ...props }: IProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...props}>
        <NextTopLoader color={'hsl(var(--primary))'} height={3} showSpinner={false} />
        {children}
        <Toaster position="top-center" theme={props.defaultTheme} />
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
