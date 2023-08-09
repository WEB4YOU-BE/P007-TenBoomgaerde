import "@/styles/globals.css";
import {Inter} from "next/font/google";
import {cn} from "@/librairy/utils";
import {Toaster} from "@/components/ui/Toaster";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Ten Boomgaerde",
};

export default function RootLayout(
    {
        children,
    }: {
        children: React.ReactNode
        authenticationModal: React.ReactNode
    }) {
    return (
        <html lang="nl-BE">
        <body className={cn("w-[100svw] h-[100svh] subpixel-antialiased transform-gpu", inter.className)}>
        {children}
        <Toaster/>
        </body>
        </html>
    );
}
