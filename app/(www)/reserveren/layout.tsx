import SelectCalendar from "@/components/Calendar/select-calendar";

export const dynamic = 'force-dynamic'

export default async function PublicNavigationLayout({children}: { children: React.ReactNode }) {
    return <>
        <div className={" container max-w-screen-xl mx-auto p-2 px-4"}>
            <h1 className={"text-3xl font-bold"}>Reserveren</h1>
            <SelectCalendar/>
            {children}
        </div>
    </>;
}