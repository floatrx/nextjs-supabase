import { APP_NAME } from '@/config/const';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: APP_NAME,
  description: 'Supabase, Next.js, HeroUI and Tailwind CSS Blog',
  navItems: [
    {
      label: 'Tags',
      href: '/tags',
      auth: true,
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
  ],
  links: {
    github: 'https://github.com/floatrx',
    docs: 'https://heroui.org',
  },
};
