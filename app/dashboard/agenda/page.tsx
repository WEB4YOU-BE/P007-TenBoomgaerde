import WeekCalendar from "@/components/business/reservations/week-calendar";

export default async function Index() {
    return <main className={"flex flex-col gap-2"}>
        <h1 className={"p-4 text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow"}>Agenda</h1>
        <WeekCalendar/>
    </main>
}