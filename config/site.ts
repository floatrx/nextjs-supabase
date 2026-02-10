import { APP_NAME } from '@/config/const';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: APP_NAME,
  description: 'Supabase, Next.js, HeroUI and Tailwind CSS Blog',
  navItems: [
    {
      label: 'Notes',
      href: '/notes',
      auth: true,
    },
    {
      label: 'Tags',
      href: '/tags',
      auth: true,
    },
    {
      label: 'Blog',
      href: '/blog',
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
