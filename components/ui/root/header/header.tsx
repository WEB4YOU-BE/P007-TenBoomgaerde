"use client";

import { User } from "@supabase/supabase-js";
import { ClassValue } from "clsx";
import { forwardRef, HTMLAttributes } from "react";
import React from "react";

import createClient from "@/utils/supabase/client";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

import { adminItems, guestItems, mainItems, userItems } from "./CONSTANTS";
import DesktopHeader from "./desktop-header";
import MobileHeader from "./mobile-header";

const sharedClassNames: ClassValue = "sticky top-0 z-50";
type HeaderProps = HTMLAttributes<HTMLDivElement>;
const Header = forwardRef<HTMLDivElement, HeaderProps>(
    ({ className, ...props }, ref) => {
        const [user, setUser] = React.useState<null | User>(null);
        const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
        const supabase = React.useMemo(() => createClient(), []);

        React.useEffect(() => {
            const fetchUser = async () => {
                const {
                    data: { user },
                } = await supabase.auth.getUser();
                setUser(user);

                if (user) {
                    const { data: is_admin } = await supabase.rpc("is_admin", {
                        user_id: user.id,
                    });
                    setIsAdmin(!!is_admin);
                } else {
                    setIsAdmin(false);
                }
            };
            void fetchUser();
        }, [supabase]);

        const authItems: NavigationItem[] = !user
            ? guestItems
            : isAdmin
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
