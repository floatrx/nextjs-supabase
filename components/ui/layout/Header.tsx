import { NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Navbar as NextUINavbar } from '@nextui-org/navbar';

import { AuthButton } from '@/components/features/auth/AuthButton';
import { ExtLink } from '@/components/ui/link/ExtLink';
import { GithubIcon, Logo } from '@/components/icons';
import { ThemeSwitch } from '@/components/ui/ThemeSwitch';
import { siteConfig } from '@/config/site';
import { NavLink } from '@/components/ui/link/NavLink';

export const Header = () => (
  <NextUINavbar maxWidth="full" position="sticky">
    <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
      <NavbarBrand as="li" className="max-w-fit gap-3">
        <NavLink className="flex items-center justify-start gap-1" href="/">
          <Logo />
        </NavLink>
      </NavbarBrand>
      <ul className="ml-2 flex justify-start gap-4">
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href}>
            <NavLink href={item.href}>{item.label}</NavLink>
          </NavbarItem>
        ))}
      </ul>
    </NavbarContent>

    <NavbarContent className="hidden basis-1/5 sm:flex sm:basis-full" justify="end">
      <NavbarItem className="hidden gap-2 sm:flex">
        <ExtLink isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </ExtLink>
        <ThemeSwitch />
      </NavbarItem>
      <NavbarItem className="hidden md:flex">
        <AuthButton />
      </NavbarItem>
    </NavbarContent>

    <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
      <ExtLink isExternal aria-label="Github" href={siteConfig.links.github}>
        <GithubIcon className="text-default-500" />
      </ExtLink>
      <ThemeSwitch />
      <NavbarMenuToggle />
    </NavbarContent>
  </NextUINavbar>
);
