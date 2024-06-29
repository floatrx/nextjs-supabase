import { Providers } from '@/components/providers/Providers';
import { Footer } from '@/components/ui/layout/Footer';
import { Header } from '@/components/ui/layout/Header';
import { fontSans } from '@/config/fonts';
import { getMetadata } from '@/lib/next/metadata';

// Styles
import '@/styles/globals.css';

export const metadata = getMetadata('Home');

const RootLayout: FC = ({ children }) => (
  <html suppressHydrationWarning lang="en">
    <body className={fontSans.variable}>
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
