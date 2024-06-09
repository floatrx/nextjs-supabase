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
      label: 'Blog',
      href: '/blog',
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Team',
      href: '/team',
    },
    {
      label: 'Calendar',
      href: '/calendar',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Help & Feedback',
      href: '/help-feedback',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    github: 'https://github.com/floatrx',
    docs: 'https://nextui.org',
  },
};
