'use client';

import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from 'sonner';

import { HeroUIProvider } from '@/lib/heroui';

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
    <NuqsAdapter>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider {...props}>
          <NextTopLoader color={'hsl(var(--primary))'} height={3} showSpinner={false} />
          {children}
          <Toaster position="top-center" theme={props.defaultTheme} />
        </NextThemesProvider>
      </HeroUIProvider>
    </NuqsAdapter>
  );
}
