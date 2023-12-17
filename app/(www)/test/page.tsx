import LoginRouteProtection from "@/components/authentication/login-route-protection";
import Test from "@/components/test";

export default async function page() {
    return <LoginRouteProtection>
        <div>
            <Test/>
        </div>
    </LoginRouteProtection>
}