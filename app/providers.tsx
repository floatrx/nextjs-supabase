'use client';

import { NextUIProvider } from '@nextui-org/system';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { Toaster } from 'sonner';

export function Providers({ children, ...props }: ThemeProviderProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...props}>
        {children}
        <Toaster
          position="top-center"
          // @ts-ignore
          theme={props.defaultTheme}
        />
      </NextThemesProvider>
    </NextUIProvider>
  );
}
