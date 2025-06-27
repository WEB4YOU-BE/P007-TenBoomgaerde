import { hasLocale } from "next-intl";

import routing from "@/i18n/routing";

const messages = {
    "nl-BE": () => import("./nl-BE.json").then((module) => module.default),
};

const getMessages = async (locale: string) =>
    hasLocale(routing.locales, locale)
        ? await messages[locale]()
        : await messages[routing.defaultLocale]();

export default getMessages;
export { messages };
