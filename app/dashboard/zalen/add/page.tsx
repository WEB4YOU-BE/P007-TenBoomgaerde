import AddRoomForm from "@/components/business/rooms/add-room-form";

export default async function page() {
    return <main className={"mx-auto md:max-w-screen-sm p-2 flex flex-col gap-2"}>
        <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow whitespace-nowrap truncate"}>Voeg een zaal toe</h1>
        <AddRoomForm/>
    </main>
}