import NavigationHeader from "@/components/navigation/navigation-header";
import NavigationHeaderLink from "@/components/navigation/navigation-header-link";
import NavigationHeaderAuthentication from "@/components/authentication/navigation-header-authentication";
import NavigationFooter from "@/components/navigation/navigation-footer";

export const dynamic = 'force-dynamic'

export const metadata = {
    title: {
        template: '%s | VZW Ten Boomgaerde Lichtervelde',
        default: 'VZW Ten Boomgaerde Lichtervelde',
        absolute: 'VZW Ten Boomgaerde Lichtervelde',
    },

    applicationName: "VZW TBL",
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
        canonical: "/",
        languages: {},
    },

    appleWebApp: {
        title: "VZW Ten Boomgaerde Lichtervelde",
        statusBarStyle: "default",
    },

    generator: "Next.js",
};

export default async function PublicNavigationLayout({children}: { children: React.ReactNode }) {
    return <>
        <NavigationHeader authNode={<NavigationHeaderAuthentication/>}>
            <NavigationHeaderLink href={"/"}>Startpagina</NavigationHeaderLink>
            <NavigationHeaderLink href={"/reserveren"}>Reserveer</NavigationHeaderLink>
            <NavigationHeaderLink href={"/prijzen"}>Prijzen</NavigationHeaderLink>
        </NavigationHeader>
        {children}
        <NavigationFooter/>
    </>;
}