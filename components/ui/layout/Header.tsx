import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/navbar';

import { GithubIcon, Logo } from '@/components/icons';
import { ExtLink } from '@/components/ui/link/ExtLink';
import { NavLink } from '@/components/ui/link/NavLink';
import { ThemeSwitch } from '@/components/ui/ThemeSwitch';
import { siteConfig } from '@/config/site';
import { AuthButton } from '@/features/auth/components/AuthButton';

export const Header = () => (
  <NextUINavbar maxWidth="full" position="sticky">
    <NavbarContent className="basis-1/5 md:basis-full" justify="start">
      <NavbarBrand as="li" className="max-w-fit gap-3">
        <NavLink className="flex items-center justify-start gap-1" href="/">
          <Logo />
          <p className="font-bold text-inherit">Blog</p>
        </NavLink>
      </NavbarBrand>
      <ul className="ml-2 hidden justify-start gap-4 md:flex">
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href}>
            <NavLink href={item.href}>{item.label}</NavLink>
          </NavbarItem>
        ))}
      </ul>
    </NavbarContent>

    <NavbarContent className="basis-1/5 sm:flex sm:basis-full" justify="end">
      <NavbarItem className="hidden gap-2 md:flex">
        <ThemeSwitch />
        <ExtLink isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </ExtLink>
      </NavbarItem>
      <NavbarItem className="hidden md:flex">
        <AuthButton />
      </NavbarItem>
    </NavbarContent>

    <NavbarContent className="basis-1 pl-4 md:hidden" justify="end">
      <ThemeSwitch />
      <ExtLink isExternal aria-label="Github" href={siteConfig.links.github}>
        <GithubIcon className="text-default-500" />
      </ExtLink>
      <NavbarMenuToggle />
    </NavbarContent>

    <NavbarMenu>
      <div className="mx-4 mt-2 flex h-full flex-col gap-2 pb-10">
        {siteConfig.navItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <NavLink href="#">{item.label}</NavLink>
          </NavbarMenuItem>
        ))}
        <div className="flex-1" />
        <NavbarItem className="text-xl">
          <AuthButton />
        </NavbarItem>
      </div>
    </NavbarMenu>
  </NextUINavbar>
);
