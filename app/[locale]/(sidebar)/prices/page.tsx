import React from "react";

import Breadcrumb, {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/atoms/Breadcrumb";
import {
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/atoms/Card";
import Card from "@/components/atoms/Card/Card";
import { Separator } from "@/components/atoms/separator";
import { SidebarTrigger } from "@/components/atoms/Sidebar";
import createClient from "@/utils/supabase/server";

const page = async () => {
    const supabase = createClient();
    const queryProducts = supabase
        .from("products")
        .select("id, name, price")
        .eq("category", "0ad8b0e1-deeb-4ebe-b4ea-d93e265e0513");
    const queryMaterials = supabase
        .from("products")
        .select("id, name, price")
        .eq("category", "839926c4-97a7-48c4-a115-45548580c148");
    const queryRooms = supabase.from("halls").select("id, name, price_per_day");

    const [products, materials, rooms] = await Promise.all([
        queryProducts,
        queryMaterials,
        queryRooms,
    ]);

    if (!products.data) return null;
    if (!materials.data) return null;
    if (!rooms.data) return null;

    return (
        <div className="flex flex-col">
            <div className="sticky top-0 z-50 flex w-full items-center border-b p-2 gap-4 rounded-t-2xl bg-background">
                <SidebarTrigger />
                <Separator orientation="vertical" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">
                                Ten Boomgaerde
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Prijzen</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <main className={"min-h-[calc(100svh-72px)] py-4"}>
                <div className={"container max-w-screen-lg mx-auto px-4"}>
                    <h1 className={"text-3xl font-bold"}>Prijzen</h1>
                    <section className={"mt-4"}>
                        <h2 className={"text-2xl font-bold mb-4"}>
                            Huurprijs zaal
                        </h2>
                        <div className={"flex flex-row gap-2"}>
                            {rooms.data.map((room, index) => (
                                <Card className="grow" key={index}>
                                    <CardHeader>
                                        <CardTitle>{room.name}</CardTitle>
                                        <CardDescription>
                                            &euro; {room.price_per_day} per
                                            tijdsblok
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                        <h3 className={"text-xl font-bold mt-6"}>
                            Extra informatie
                        </h3>
                        <span>
                            Vanaf januari 2024 werken met een All-in prijs
                            formule
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
                        <h2 className={"text-2xl font-bold"}>
                            Prijslijst drank
                        </h2>
                        <p>
                            De vermelde prijs is de prijs die wordt aangerekend
                            per gebruikte consumptie tijdens een feest of
                            activiteit.
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
        </div>
    );
};

export default page;
