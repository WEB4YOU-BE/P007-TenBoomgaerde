export const mainItems: NavigationItem[] = [
    {
        href: "/",
        title: "Startpagina",
    },
    {
        href: "/reservate",
        title: "Reserveren",
    },
];

export const guestItems: NavigationItem[] = [
    {
        href: "/authentication/sign-in",
        isPrimairy: false,
        title: "Inloggen",
    },
    {
        href: "/authentication/sign-up",
        isPrimairy: true,
        title: "Registreren",
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
        title: "Uitloggen",
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
