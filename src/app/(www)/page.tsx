import Image from "next/image";

export default function Index() {
    return <main className={"w-full min-h-[100svh]"}>
        <figure className={"container mx-auto pt-5 flex flex-row justify-center"}>
            <Image className={"w-1/2"} src={"/images/tenboomgaerde.jpg"} alt={""} width={395} height={255}/>
        </figure>
    </main>;
}
