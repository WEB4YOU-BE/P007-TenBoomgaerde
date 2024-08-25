export const mainItems: NavigationItem[] = [
  {
    title: "Startpagina",
    href: "/",
  },
  {
    title: "Reserveer",
    href: "/reservate",
  },
];

export const guestItems: NavigationItem[] = [
  {
    title: "Sign in",
    href: "/authentication/sign-in",
    isPrimairy: false,
  },
  {
    title: "Sign up",
    href: "/authentication/sign-up",
    isPrimairy: true,
  },
];
export const userItems: NavigationItem[] = [
  {
    title: "Account",
    href: "/account",
    isPrimairy: false,
  },
  {
    title: "Sign out",
    href: "/authentication/sign-out",
    isPrimairy: true,
  },
];
export const adminItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    isPrimairy: false,
  },
  ...userItems,
];
