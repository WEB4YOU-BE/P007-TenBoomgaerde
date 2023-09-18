import Calender from "@/components/ui/www/Calender";

export default async function Index() {
    return <main className={"w-full min-h-[calc(100svh-72px)]"}>
        <div className={" container max-w-screen-xl mx-auto p-2 px-4"}>
            <h1>Reserveren</h1>
            <Calender/>
        </div>
    </main>;
}
