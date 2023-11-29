import * as React from "react"

import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import NavigationSidebarAuthentication from "@/components/authentication/navigation-sidebar-authentication";
import {LayoutDashboard, List} from "lucide-react";
import NavigationSidebarLink from "@/components/navigation/navigation-sidebar-link";
import LoginRouteProtection from "@/components/authentication/login-route-protection";
import AdminComponentProtection from "@/components/authentication/admin-component-protection";
import LoginComponentProtection from "@/components/authentication/login-component-protection";

export const dynamic = 'force-dynamic'

export const metadata = {
    title: "Overzicht",
    description: 'Ga naar jouw overzicht met alle reserveren VZW Ten Boomgaerde Lichtervelde.',

    applicationName: "VZW Ten Boomgaerde Lichtervelde",
    keywords: ["Ten Boomgaerde", "Lichtervelde", "VZW"],

    creator: "WEB4YOU",
    publisher: "WEB4YOU",
    authors: [{name: "Jens Penneman", url: "https://jenspenneman.com"}],

    colorScheme: "light dark",
    themeColor: [
        {media: "(prefers-color-scheme: light)", color: "#e7e5e4"},
        {media: "(prefers-color-scheme: dark)", color: "#292524"},
    ],
    formatDetection: {
        url: false,
        email: false,
        telephone: false,
        address: false,
        date: false,
    },

    metadataBase: new URL("https://www.vzwtenboomgaerdelichtervelde.be"),
    referrer: "origin-when-cross-origin",
    alternates: {
        canonical: "/klant",
        languages: {},
    },

    appleWebApp: {
        title: "VZW Ten Boomgaerde Lichtervelde",
        statusBarStyle: "default",
    },

    generator: "Next.js",
};

interface LayoutProps {
    children: React.ReactNode;
}

export default function PublicNavigationLayoutDashboard({children}: LayoutProps) {
    return <LoginRouteProtection>
        <div className={"flex flex-col md:flex-row"}>
            <NavigationSidebar authNode={<NavigationSidebarAuthentication/>}>
                <LoginComponentProtection><NavigationSidebarLink href={"/klant"}><List/><span>Mijn overzicht</span></NavigationSidebarLink></LoginComponentProtection>
                <AdminComponentProtection><NavigationSidebarLink href={"/dashboard"}><LayoutDashboard/><span>Dashboard</span></NavigationSidebarLink></AdminComponentProtection>
            </NavigationSidebar>
            <div className={"w-full"}>
                {children}
            </div>
        </div>
    </LoginRouteProtection>
}