import { NavConfig } from "@/types";

export const navigationConfig: NavConfig = {
  sideNav: [
    {
      title: "Invoices",
      href: "/invoices",
      icon: "billing"
    },
    {
      title: "Products",
      href: "/products",
      icon: "products",
      disabled: true
    },
    {
      title: "Clients",
      href: "/clients",
      icon: "company"
    },
    {
      title: "Stats",
      href: "/stats",
      icon: "chart",
      disabled: true
    },
    {
      title: "Calendar",
      href: "/calendar",
      icon: "calendar",
      disabled: true
    },
    {
      title: "Settings",
      href: "/settings",
      icon: "settings",
      disabled: true
    }
  ],
  topNav: [],
  userNav: []
}