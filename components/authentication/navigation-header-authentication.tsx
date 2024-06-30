import LogoutButton from "@/components/authentication/LogoutButton";
import NavigationHeaderLink from "@/components/navigation/navigation-header-link";
import LoginButton from "@/components/authentication/LoginButton";
import AdminComponentProtection from "@/components/authentication/admin-component-protection";
import LoginComponentProtection from "@/components/authentication/login-component-protection";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export default async function NavigationHeaderAuthentication() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? <NavigationIsLogedIn /> : <NavigationIsLogedOut />;
}

async function NavigationIsLogedIn() {
  return (
    <div className={"flex flex-col-reverse gap-2 lg:flex-row-reverse"}>
      <LogoutButton />
      <AdminComponentProtection>
        <NavigationHeaderLink href={"/dashboard"}>
          Dashboard
        </NavigationHeaderLink>
      </AdminComponentProtection>
      <LoginComponentProtection>
        <NavigationHeaderLink href={"/klant"}>
          Jouw overzicht
        </NavigationHeaderLink>
      </LoginComponentProtection>
    </div>
  );
}

async function NavigationIsLogedOut() {
  return <LoginButton />;
}
