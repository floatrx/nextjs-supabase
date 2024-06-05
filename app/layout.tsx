import clsx from 'clsx';
import { Metadata, Viewport } from 'next';
import NextTopLoader from 'nextjs-toploader';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Providers } from '@/app/providers';
import { fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';

// Styles
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

const RootLayout: FC = ({ children }) => (
  <html suppressHydrationWarning lang="en">
    <body className={clsx('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
      <NextTopLoader />
      <Providers attribute="class" defaultTheme="dark">
        <div className="relative flex h-screen flex-col">
          <Header />
          <main className="container mx-auto max-w-7xl flex-grow px-6 pt-16">{children}</main>
          <Footer />
        </div>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
