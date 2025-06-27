import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import React from "react";

import type NextLayout from "@/types/next/layout";

import { inter } from "@/components/fonts";
import Hosts from "@/components/Hosts";
import Providers from "@/components/Providers";
import SSRProviders from "@/components/SSRProviders";
import Tools from "@/components/Tools";
import routing from "@/i18n/routing";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

const generateStaticParams = () =>
    routing.locales.map((locale) => ({ locale }));

interface LayoutProps extends NextLayout {
    params: Promise<{ locale: string }>;
}
const Layout = async ({ children, params }: LayoutProps) => {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) return notFound();

    return (
        <html lang={locale}>
            <body className={cn(inter.variable)}>
                <SSRProviders>
                    <Providers>
                        {children}
                        <Hosts />
                        <Tools />
                    </Providers>
                </SSRProviders>
            </body>
        </html>
    );
};

export default Layout;
export { generateStaticParams };
