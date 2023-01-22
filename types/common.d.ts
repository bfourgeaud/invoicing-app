import type { Icons } from "@/components/icons"

import type { PropsWithChildren } from "react";

export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T

export interface PageProps<T> { params : T }

export interface DomainRootParams { subdomain: string; }
export interface SlugParams { slug: string; }
export interface IDParams { id: string; }

export type WithChildren<T = {}> = T & PropsWithChildren<{}>;

export type WithClassName<T = {}> = T & {
  className?: string;
};

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
}

export type SideNavItem = NavItem & {
  icon: keyof typeof Icons
}

export type NavConfig = {
  sideNav: Array<SideNavItem>,
  topNav: Array<NavItem>,
  userNav: Array<NavItem>
}

export type SiteConfig = {
  name: string
  links: {
    twitter: string
    github: string
  }
}