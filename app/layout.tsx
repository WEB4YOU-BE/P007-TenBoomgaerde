import type { NextPage } from "next";

import React from "react";

import type NextLayout from "@/types/next/layout";

import { inter } from "@/components/fonts";
import Hosts from "@/components/Hosts";
import Providers from "@/components/Providers";
import Tools from "@/components/Tools";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

import "./globals.css";

const RootLayout: NextPage<NextLayout> = async ({ children }: NextLayout) => (
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

export default RootLayout;
