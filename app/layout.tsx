import '@/styles/globals.css'
import {inter} from "@/styles/fonts";
import {Toaster} from "@/components/ui/Toaster";

export const metadata = {
    title: {
        template: '%s | VZW Ten Boomgaerde Lichtervelde',
        default: 'VZW Ten Boomgaerde Lichtervelde',
        absolute: 'VZW Ten Boomgaerde Lichtervelde',
    },
    description: 'Ten Boomgaerde is het beweging.net Dienstencentrum van Lichtervelde. Deze zaal bevat een grote- en kleine zaal. Deze kunnen voor allerhande zaken zoals een clubfeest, geboortereceptie, verjaardagsfeest, vergaderingen en communiefeest worden gereserveerd.',

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



export default function RootLayout({children,}: { children: React.ReactNode }) {
    return <html lang="nl-BE">
    <body className={inter.className + " overscroll-none"}>
    {children}
    <Toaster/>
    </body>
    </html>
}
