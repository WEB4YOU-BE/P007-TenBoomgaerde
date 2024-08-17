import { cn } from "@/utils/tailwindcss/MergeCN";
import { forwardRef, HTMLAttributes } from "react";
import DesktopHeader from "./desktop-header";
import MobileHeader from "./mobile-header";
import { ClassValue } from "clsx";
import { adminItems, guestItems, mainItems, userItems } from "./CONSTANTS";
import { createClient } from "@/utils/supabase/server";

const sharedClassNames: ClassValue = "sticky top-0 z-50";
interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}
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
          ref={ref}
          className={cn("max-lg:hidden", sharedClassNames, className)}
          mainItems={mainItems}
          authItems={authItems}
          {...props}
        />
        <MobileHeader
          ref={ref}
          className={cn("lg:hidden", sharedClassNames, className)}
          items={[...mainItems, ...authItems]}
          {...props}
        />
      </>
    );
  },
);
Header.displayName = "Main site header";

export default Header;
