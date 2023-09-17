import Footer from "@/components/ui/www/Footer";
import NavigationHeader from "@/components/navigation/navigation-header";
import NavigationHeaderLink from "@/components/navigation/navigation-header-link";
import NavigationHeaderAuthentication from "@/components/authentication/navigation-header-authentication";

export const dynamic = 'force-dynamic'

export default async function PublicNavigationLayout({children}: { children: React.ReactNode }) {
    return <>
        <NavigationHeader authNode={<NavigationHeaderAuthentication/>}>
            <NavigationHeaderLink href={"/"}>Startpagina</NavigationHeaderLink>
            <NavigationHeaderLink href={"/reserveren"}>Reserveer</NavigationHeaderLink>
            <NavigationHeaderLink href={"/prijzen"}>Prijzen</NavigationHeaderLink>
        </NavigationHeader>
        {children}
        <Footer/>
    </>;
}