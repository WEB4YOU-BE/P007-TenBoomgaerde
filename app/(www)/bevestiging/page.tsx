import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";

export default function Index() {
    return <div className={" container max-w-screen-xl mx-auto p-2 px-4"}>
        <main className={"w-full min-h-[calc(100svh-72px)]"}>
            <div className={"lg:w-1/2 mx-auto mt-8"}>
                <h1 className={"text-3xl font-bold text-center mt-4"}>Bedankt voor uw reservatie</h1>
                <div className={"grid grid-cols-2 my-12 text-center"}>
                    <span className={"font-bold"}>Reservatienummer:</span>
                    <span>reservatieId</span>
                </div>
                <p className={"text-light text-center text-gray-600"}>U zal een mail ontvangen met een overzicht van uw
                    reservatie. Wij bevestigen zo spoedig mogelijk uw reservatie.</p>
                <div className={"flex flex-row justify-between mt-28 text-center"}>
                    <Link href={"/"} className={cn(buttonVariants(), "w-1/3")}>Terug naar startpagina</Link>
                    <Link href={"/klant"} className={cn(buttonVariants({variant: "green"}), "w-1/3")}>Mijn
                        dashboard</Link>
                </div>
            </div>
        </main>
    </div>
        ;
}