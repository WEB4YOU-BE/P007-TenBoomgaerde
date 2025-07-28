import Link from "next/link";
import React from "react";

import { CardContent, CardFooter, CardHeader } from "@/components/atoms/Card";
import Card from "@/components/atoms/Card/Card";
import createClient from "@/utils/supabase/server";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

const page = async () => {
    const supabase = createClient();
    const queryProducts = supabase
        .from("products")
        .select()
        .eq("categorie_id", "0ad8b0e1-deeb-4ebe-b4ea-d93e265e0513");
    const queryMaterials = supabase
        .from("products")
        .select()
        .eq("categorie_id", "839926c4-97a7-48c4-a115-45548580c148");
    const queryRooms = supabase.from("rooms").select();

    const [products, materials, rooms] = await Promise.all([
        queryProducts,
        queryMaterials,
        queryRooms,
    ]);

    if (!products.data) return undefined;
    if (!materials.data) return undefined;
    if (!rooms.data) return undefined;

    return (
        <main className={"min-h-[calc(100svh-72px)]"}>
            <div className={"container max-w-screen-lg mx-auto px-4"}>
                <h1 className={"text-3xl font-bold"}>Prijzen</h1>
                <section className={"mt-4"}>
                    <h2 className={"text-2xl font-bold mb-4"}>
                        Huurprijs zaal
                    </h2>
                    <div className={"flex flex-row gap-4"}>
                        {rooms.data.map((room, index) => (
                            <Card
                                className={"max-w-sm md:w-1/3 w-full"}
                                key={index}
                            >
                                <CardHeader
                                    className={"text-xl text-center font-bold"}
                                >
                                    {room.name}
                                </CardHeader>
                                <CardContent className={"text-center"}>
                                    <p>&euro; {room.day_price}</p>
                                    <p className={"font-light"}>
                                        per tijdsblok
                                    </p>
                                </CardContent>
                                <CardFooter className={"justify-center"}>
                                    <Link
                                        className={cn(buttonVariants(), "mx-2")}
                                        href={"/reserveren/"}
                                    >
                                        Reserveer nu
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    <h3 className={"text-xl font-bold mt-6"}>
                        Extra informatie
                    </h3>
                    <span>
                        Vanaf januari 2024 werken met een All-in prijs formule
                    </span>
                    <ul className={"list-disc pl-5 space-y-1"}>
                        <li>Huur zaal</li>
                        <li>Water</li>
                        <li>Elektriciteit</li>
                        <li>Verwarming</li>
                        <li>Wifi</li>
                        <li>Zaaluitrusting</li>
                    </ul>
                </section>
                <section className={"mt-8"}>
                    <h2 className={"text-2xl font-bold"}>
                        Huurprijs aanwezig materiaal
                    </h2>
                    <ul className={"list-disc pl-5 space-y-1"}>
                        {materials.data.map((material, index) => (
                            <li key={material.id ?? index}>
                                {material.name}: &euro; {material.price}
                            </li>
                        ))}
                    </ul>
                </section>
                <section className={"mt-6"}>
                    <h2 className={"text-2xl font-bold"}>Prijslijst drank</h2>
                    <p>
                        De vermelde prijs is de prijs die wordt aangerekend per
                        gebruikte consumptie tijdens een feest of activiteit.
                    </p>
                    <ul className={"list-disc pl-5 space-y-1"}>
                        {products.data.map((product, index) => (
                            <li key={product.id ?? index}>
                                {product.name}: &euro; {product.price}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    );
};

export default page;
