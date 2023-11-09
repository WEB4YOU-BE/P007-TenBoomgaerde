import '@/styles/globals.css'
import {inter} from "@/styles/fonts";
import {Toaster} from "@/components/ui/Toaster";

export const metadata = {
    title: 'Ten Boomgaerde',
    description: 'Ten Boomgaerde is het beweging.net Dienstencentrum van Lichtervelde. Deze zaal bevat een grote- en kleine zaal. Deze kunnen voor allerhande zaken zoals een clubfeest, geboortereceptie, verjaardagsfeest, vergaderingen en communiefeest worden gereserveerd.',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return <html lang="nl-BE">
    <body className={inter.className + " overscroll-none"}>
    {children}
    <Toaster/>
    </body>
    </html>
}
