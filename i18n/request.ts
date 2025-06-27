import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import getMessages from "@/i18n/messages";

import routing from "./routing";

const requestConfig = getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    return { locale, messages: await getMessages(locale) };
});

export default requestConfig;
