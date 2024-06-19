'use client';

import { NextUIProvider } from '@nextui-org/system';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { Toaster } from 'sonner';

interface IProps extends ThemeProviderProps {
  defaultTheme: 'light' | 'dark' | 'system' | undefined; // compatible with Toaster theme prop
}

/**
 * [TypedRoutes with navigator workaround!]
 * Next.config.mjs -> `experimental.typedRoutes` is enabled;
 * That's why typescript should ignore next route internal
 * types RouteImpl<RouteType>in order to use `push` method
 * from `useRouter` hook! Disable experimental.typedRoutes
 * in config if you want to avoid this workaround.
 * @see https://nextui.org/docs/guide/routing#add-the-userouter
 */
type CompatibleNavigator = (href: string) => void;

/**
 * Providers composition
 *  1. NextUIProvider
 *  2. NextThemesProvider
 *  3. Toaster
 */
export function Providers({ children, ...props }: IProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push as CompatibleNavigator}>
      <NextThemesProvider {...props}>
        {children}
        <Toaster position="top-center" theme={props.defaultTheme} />
      </NextThemesProvider>
    </NextUIProvider>
  );
}
