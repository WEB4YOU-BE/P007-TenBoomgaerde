import "./globals.css";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Ten Boomgaerde",
    colorScheme: "light dark",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="nl-BE">
        <body className={inter.className}>{children}</body>
        </html>
    );
}
