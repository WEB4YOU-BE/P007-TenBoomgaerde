import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";

const Footer = async () => {
    let creatorURL = "https://www.web-4-you.be/";
    let mapsURL = "https://www.google.com/maps/place/Zaal+Ten+Boomgaerde/@51.0280964,3.1406539,15z/data=!4m6!3m5!1s0x47c34bdf2550654d:0xa6fb68fa7774a37e!8m2!3d51.0280964!4d3.1406539!16s%2Fg%2F1t_hy456?entry=ttu";
    let contactURL = "mailto:info@vzwtenboomgaerdelichtervelde.be";

    return <div className={"sm:sticky sm:top-0 sm:z-50 container max-w-screen-md mx-auto p-2"}>
        <div className={"bg-gray-200 rounded-lg flex flex-row gap-2 p-2"}>
            <span className={"flex-grow"}>&copy; Made by <Link className={cn(buttonVariants({variant: "ghost"}), "px-0")} href={creatorURL} target={"_blank"}>WEB4YOU</Link></span>
            <nav className={"flex flex-row flex-grow-0 overflow-x-auto gap-2"}>
                <Link className={buttonVariants({variant: "ghost"})} href={mapsURL} target={"_blank"}>Boomgaerdstraat 4a, 8810 Lichtervelde</Link>
                <Link className={buttonVariants({variant: "secondary"})} href={contactURL} target={"_blank"}>Contact</Link>
            </nav>
        </div>
    </div>;
};

export default Footer;
