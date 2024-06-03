import { DEFAULT_URL } from '@/const';
import { GeistSans } from 'geist/font/sans';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/header';
// Styles
import './globals.css';

export const metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
};

const RootLayout: FC = ({ children }) => {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <Header />
          <div className="flex-1 w-full">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
