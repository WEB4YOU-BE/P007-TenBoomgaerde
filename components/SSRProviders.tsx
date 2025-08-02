import { NextIntlClientProvider } from "next-intl";
import React, { type ReactNode } from "react";

interface SSRProvidersProps {
    children: ReactNode;
}
const SSRProviders = ({ children }: SSRProvidersProps) => (
    <NextIntlClientProvider>{children}</NextIntlClientProvider>
);

export default SSRProviders;
