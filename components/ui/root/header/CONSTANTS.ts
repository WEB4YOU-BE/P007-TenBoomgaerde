export const mainItems: NavigationItem[] = [
    {
        href: "/",
        title: "Startpagina",
    },
    {
        href: "/reservate",
        title: "Reserveer",
    },
];

export const guestItems: NavigationItem[] = [
    {
        href: "/authentication/sign-in",
        isPrimairy: false,
        title: "Sign in",
    },
    {
        href: "/authentication/sign-up",
        isPrimairy: true,
        title: "Sign up",
    },
];
export const userItems: NavigationItem[] = [
    {
        href: "/account",
        isPrimairy: false,
        title: "Account",
    },
    {
        href: "/authentication/sign-out",
        isPrimairy: true,
        title: "Sign out",
    },
];
export const adminItems: NavigationItem[] = [
    {
        href: "/dashboard",
        isPrimairy: false,
        title: "Dashboard",
    },
    ...userItems,
];
