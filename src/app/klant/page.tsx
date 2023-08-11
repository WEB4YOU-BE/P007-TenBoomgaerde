import Reservation from "@/components/ui/klant/Reservation";

export default function Index() {
    return <main className={"w-full min-h-[100svh]"}>
        <div className={"p-4 block sm:flex items-center justify-between"}>
            <div className={"w-full mb-1"}>
                <div className={"mb-4"}>
                    <h1 className={"text-xl font-semibold text-gray-900 sm:text-2xl"}>Mijn boekingen</h1>
                </div>
                <Reservation/>
            </div>
        </div>
    </main>;
}
