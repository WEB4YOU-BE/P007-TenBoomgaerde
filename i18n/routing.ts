import { defineRouting } from "next-intl/routing";

const routing = defineRouting({
    defaultLocale: "nl-BE",
    localeCookie: false,
    locales: ["nl-BE"],
});

export default routing;
