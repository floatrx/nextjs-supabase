export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'SupaBlog',
  description: 'Supabase, Next.js, NextUI and Tailwind CSS Blog',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Notes',
      href: '/notes',
    },
    {
      label: 'Tags',
      href: '/tags',
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
    docs: 'https://nextui.org',
  },
};
