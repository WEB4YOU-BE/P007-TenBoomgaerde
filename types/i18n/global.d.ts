import { messages } from "@/i18n/messages";
import routing from "@/i18n/routing";

declare module "next-intl" {
    interface AppConfig {
        Locale: (typeof routing.locales)[number];
        Messages: Awaited<ReturnType<(typeof messages)["nl-BE"]>>;
    }
}
