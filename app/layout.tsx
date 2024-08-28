import "./globals.css";

import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { inter } from "@/components/fonts";

import type { NextPage } from "next";
import type NextLayout from "@/types/next/layout";

import Hosts from "@/components/Hosts";
import Providers from "@/components/Providers";
import Tools from "@/components/Tools";

const RootLayout: NextPage<NextLayout> = async ({ children }) => {
    return (
        <html lang="nl-BE">
            <body className={cn(inter.variable)}>
                <Providers>
                    {children}
                    <Hosts />
                    <Tools />
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;
