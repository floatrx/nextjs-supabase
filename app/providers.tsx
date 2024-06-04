'use client';

import { ThemeProvider } from 'next-themes';

export const Providers: FC = ({ children }) => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    {children}
  </ThemeProvider>
);
