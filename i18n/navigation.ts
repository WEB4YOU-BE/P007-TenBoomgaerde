import { createNavigation } from "next-intl/navigation";

import routing from "@/i18n/routing";

const {
    getPathname,
    Link,
    permanentRedirect,
    redirect,
    usePathname,
    useRouter,
} = createNavigation(routing);

export {
    getPathname,
    Link,
    permanentRedirect,
    redirect,
    usePathname,
    useRouter,
};
