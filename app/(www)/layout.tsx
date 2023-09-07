import Navigation from "@/components/ui/www/Navigation";
import Footer from "@/components/ui/www/Footer";

export default function PublicNavigationLayout({children}: { children: React.ReactNode }) {
    return <>
        <Navigation/>
        {children}
        <Footer/>
    </>;
}