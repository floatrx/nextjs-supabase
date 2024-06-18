import clsx from 'clsx';
import NextTopLoader from 'nextjs-toploader';

import { Providers } from '@/app/providers';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { fontSans } from '@/config/fonts';
import { getMetadata } from '@/lib/next';

// Styles
import '@/styles/globals.css';

export const metadata = getMetadata('Home');

const RootLayout: FC = ({ children }) => (
  <html suppressHydrationWarning lang="en">
    <body className={clsx('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
      <NextTopLoader />
      <Providers attribute="class" defaultTheme="dark">
        <div className="relative flex h-screen flex-col">
          <Header />
          <main className="container flex-1 py-5">{children}</main>
          <Footer />
        </div>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
