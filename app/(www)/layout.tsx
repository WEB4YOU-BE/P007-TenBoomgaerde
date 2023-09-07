import Footer from "@/components/ui/www/Footer";
import NavigationHeader from "@/components/navigation/navigation-header";
import NavigationHeaderLink from "@/components/navigation/navigation-header-link";
import NavigationHeaderAuthentication from "@/components/authentication/navigation-header-authentication";

export default function PublicNavigationLayout({children}: { children: React.ReactNode }) {
    return <>
        <NavigationHeader authNode={<NavigationHeaderAuthentication/>}>
            <NavigationHeaderLink href={"/"}>Startpagina</NavigationHeaderLink>
            <NavigationHeaderLink href={"/reserveren"}>Reserveer</NavigationHeaderLink>
            <NavigationHeaderLink href={"/producten"}>Prijzen</NavigationHeaderLink>
        </NavigationHeader>
        {children}
        <Footer/>
    </>;
}