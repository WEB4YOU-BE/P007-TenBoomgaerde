import Navigation from "@/components/ui/www/Navigation";

export default function PublicNavigationLayout({children}: { children: React.ReactNode }) {
    return <>
        <Navigation/>
        {children}
    </>;
}