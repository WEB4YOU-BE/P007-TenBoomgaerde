import Reservation from "@/components/ui/klant/Reservation";

export default function Index() {
    const reservations = [
        {resnumber: '15', name: 'Tiebe Deweerdt', date: '12-08-2023 van 13:00 tot 21:00', room: 'Grote zaal', tel: '+32 123 45 67 89', code: '1234', state: 'success'},
        {resnumber: '65', name: 'Jens Penneman', date: '07-09-2023 van 17:00 tot 24:00', room: 'Grote & kleine zaal', tel: '+32 987 65 43 21', code: '', state: 'denied'},
        {resnumber: '89', name: 'Guy Beeuseart', date: '26-12-2023 van 09:00 tot 12:00', room: 'Kleine zaal', tel: '+32 147 85 23 69', code: '', state: 'hold'}
    ]
    return <main className={"w-full min-h-[100svh]"}>
        <div className={"p-4 block sm:flex items-center justify-between"}>
            <div className={"w-full mb-1"}>
                <div className={"mb-4"}>
                    <h1 className={"text-xl font-semibold text-gray-900 sm:text-2xl"}>Mijn boekingen</h1>
                </div>
                {reservations.map(
                    (reservation, index) => <Reservation key={index}{...reservation}/>
                )}
            </div>
        </div>
    </main>;
}
