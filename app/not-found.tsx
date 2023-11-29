import Image from "next/image";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
    title: "Deze pagina bestaat niet",
    description: 'Deze pagina maakt geen deel uit van de website voor VZW Ten Boomgaerde Lichtervelde.',

    applicationName: "VZW Ten Boomgaerde Lichtervelde",
    keywords: ["Ten Boomgaerde", "Lichtervelde", "VZW"],

    creator: "WEB4YOU",
    publisher: "WEB4YOU",
    authors: [{name: "Jens Penneman", url: "https://jenspenneman.com"}],

    formatDetection: {
        url: false,
        email: false,
        telephone: false,
        address: false,
        date: false,
    },

    metadataBase: new URL("https://www.vzwtenboomgaerdelichtervelde.be"),
    referrer: "origin-when-cross-origin",
    alternates: {
        canonical: "/",
        languages: {},
    },

    appleWebApp: {
        title: "VZW Ten Boomgaerde Lichtervelde",
        statusBarStyle: "default",
    },

    generator: "Next.js",
};

export default function NotFound() {
    return <main className={"flex flex-col m-28"}>
        <Image src={"/images/Logo Ten Boomgaerde.PNG"} alt={"logo"} width={1000} height={1000}
               className={"mx-auto w-72 h-72"}/>
        <span className={"text-8xl mx-auto font-bold"}>Oops!</span>
        <p className={"text-xl mx-auto pt-8"}>Het lijkt er op dat we deze pagina niet kunnen vinden...</p>
        <Link href={"/"}
              className={cn(buttonVariants({variant: "green"}), "mx-auto mt-12 font-bold")}>Startpagina</Link>
    </main>
}