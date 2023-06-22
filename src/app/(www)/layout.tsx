import Navigation from "@/components/ui/www/Navigation";
import Link from "next/link";

export default function PublicNavigationLayout({children}: { children: React.ReactNode }) {
    return <>
        <Navigation/>
        {children}
        <footer className={"flex flex-col md:flex-row bg-gray-200 rounded-lg shadow m-4 container"}>
            <span className={"p-4 text-sm text-gray-500 text-center"}>&copy; Made by{" "}
                <Link href={"https://web-4-you.be/"}>WEB4YOU</Link></span>
            <div
                className={"p-4 flex flex-row gap-4 text-sm font-medium text-gray-500 justify-between md:ml-auto"}>
                <Link className={"hover:underline"}
                      href={"https://www.google.com/maps/place/Zaal+Ten+Boomgaerde/@51.0280964,3.1406539,15z/data=!4m6!3m5!1s0x47c34bdf2550654d:0xa6fb68fa7774a37e!8m2!3d51.0280964!4d3.1406539!16s%2Fg%2F1t_hy456?entry=ttu"}
                      target={"_blank"}>Boomgaerdstraat 4a, 8810 Lichtervelde</Link>
                <Link className={"hover:underline"}
                      href={"mailto:info@vzwtenboomgaerdelichtervelde.be"}>Contact</Link>
            </div>
        </footer>
    </>;
}