import type { ReactNode } from "react";

import { NextIntlClientProvider } from "next-intl";
import React from "react";

interface SSRProvidersProps {
    children: ReactNode;
}
const SSRProviders = ({ children }: SSRProvidersProps) => (
    <NextIntlClientProvider>{children}</NextIntlClientProvider>
);

export default SSRProviders;
