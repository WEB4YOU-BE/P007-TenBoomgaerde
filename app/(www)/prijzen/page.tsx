import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {DbResult} from "@/lib/database.types";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/Card";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";

export default async function page() {
    const supabase = createServerComponentClient({cookies})
    const queryProducts = supabase.from("products").select().eq("categorie_id", "0ad8b0e1-deeb-4ebe-b4ea-d93e265e0513")
    const products: DbResult<typeof queryProducts> = await queryProducts
    const queryMaterials = supabase.from("products").select().eq("categorie_id", "839926c4-97a7-48c4-a115-45548580c148")
    const materials: DbResult<typeof queryMaterials> = await queryMaterials
    const queryRooms = supabase.from("rooms").select()
    const rooms: DbResult<typeof queryRooms> = await queryRooms

    if (!products.data) return undefined
    if (!materials.data) return undefined
    if (!rooms.data) return undefined

    return <main className={"w-full min-h-[calc(100svh-72px)]"}>
        <div className={"container mx-auto"}>
            <h1 className={"text-3xl font-bold"}>Prijzen</h1>
            <section className={"mt-4"}>
                <h2 className={"text-2xl font-bold mb-4"}>Huurprijs zaal</h2>
                <div className={"flex flex-row gap-4"}>
                    {
                        rooms.data.map((room) =>
                            <Card className={"max-w-sm md:w-1/3 w-full"}>
                                <CardHeader className={"text-xl text-center font-bold"}>{room.name}</CardHeader>
                                <CardContent className={"text-center"}>
                                    <p>&euro; {room.day_price}</p>
                                    <p className={"font-light"}>per dag</p>
                                </CardContent>
                                <CardFooter className={"justify-center"}>
                                    <Link href={"/reserveren"}
                                          className={cn(buttonVariants({variant: "green"}), "mx-2")}>Reserveer nu</Link>
                                </CardFooter>
                            </Card>
                        )
                    }
                </div>
                <h3 className={"text-xl font-bold mt-4"}>Extra informatie</h3>
                <ul role={"list"} className={"list-disc pl-5 space-y-1"}>
                    <li>Het gebruik van de keuken is gratis</li>
                    <li>Forfait elektriciteit en water per activiteit &euro; 5.00</li>
                    <li>Verwarming per eenheid &euro; 1.25</li>
                </ul>
            </section>
            <section className={"mt-4"}>
                <h2 className={"text-2xl font-bold"}>Huurprijs aanwezig materiaal</h2>
                <ul role={"list"} className={"list-disc pl-5 space-y-1"}>
                    {
                        materials.data.map((material) =>
                            <li>{material.name}: &euro; {material.price}</li>
                        )
                    }
                </ul>
            </section>
            <section className={"mt-4"}>
                <h2 className={"text-2xl font-bold"}>Prijslijst drank</h2>
                <p>De vermelde prijs is de prijs die wordt aangerekend per gebruikte consumptie tijdens een feest of
                    activiteit.</p>
                <ul role={"list"} className={"list-disc pl-5 space-y-1"}>
                    {
                        products.data.map((product) =>
                            <li>{product.name}: &euro; {product.price}</li>
                        )
                    }
                </ul>
            </section>
        </div>
    </main>;
}