import { siteConfig } from '@/config/site';

export const Footer = () => (
  <footer className="border-t-foreground/10 flex w-full justify-center border-t p-8 text-center text-xs">
    <div className="container">&copy; 2024, {siteConfig.description}</div>
  </footer>
);
