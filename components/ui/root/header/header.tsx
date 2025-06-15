import createClient from "@/utils/supabase/server";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { ClassValue } from "clsx";
import { forwardRef, HTMLAttributes } from "react";
import React from "react";

import { adminItems, guestItems, mainItems, userItems } from "./CONSTANTS";
import DesktopHeader from "./desktop-header";
import MobileHeader from "./mobile-header";

const sharedClassNames: ClassValue = "sticky top-0 z-50";
type HeaderProps = HTMLAttributes<HTMLDivElement>;
const Header = forwardRef<HTMLDivElement, HeaderProps>(
    async ({ className, ...props }, ref) => {
        const supabase = createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        const { data: is_admin } = await supabase.rpc("is_admin", {
            user_id: user?.id || "",
        });

        const authItems: NavigationItem[] = !user
            ? guestItems
            : is_admin
              ? adminItems
              : userItems;

        return (
            <>
                <DesktopHeader
                    authItems={authItems}
                    className={cn("max-lg:hidden", sharedClassNames, className)}
                    mainItems={mainItems}
                    ref={ref}
                    {...props}
                />
                <MobileHeader
                    className={cn("lg:hidden", sharedClassNames, className)}
                    items={[...mainItems, ...authItems]}
                    ref={ref}
                    {...props}
                />
            </>
        );
    }
);
Header.displayName = "Main site header";

export default Header;
