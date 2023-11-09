import ChangeRoomForm from "@/components/business/rooms/change-room-form";

export default async function page({params}: { params: { roomId: string } }) {
    return <main className={"mx-auto md:max-w-screen-sm p-2 flex flex-col gap-2"}>
        <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow whitespace-nowrap truncate"}>Zaal
            wijzigen</h1>
        <ChangeRoomForm id={params.roomId}/>
    </main>;
}