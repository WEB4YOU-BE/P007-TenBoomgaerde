import Reservation from "@/components/ui/klant/Reservation";

export default function Index() {
    const reservations = [
        {resnumber: '15', name: 'Tiebe Deweerdt', date: new Date('2023-08-12'), room: 'Grote zaal', tel: '+32 123 45 67 89', code: '1234', state: 'success'},
        {resnumber: '34', name: 'Tiebe Deweerdt', date: new Date('2023-05-04'), room: 'Grote zaal', tel: '+32 123 45 67 89', code: '1234', state: 'success'},
        {resnumber: '65', name: 'Jens Penneman', date: new Date('2023-09-07'), room: 'Grote & kleine zaal', tel: '+32 987 65 43 21', code: '', state: 'denied'},
        {resnumber: '78', name: 'Jens Penneman', date: new Date('2023-06-29'), room: 'Grote & kleine zaal', tel: '+32 987 65 43 21', code: '1234', state: 'success'},
        {resnumber: '89', name: 'Guy Beeuseart', date: new Date('2023-12-26'), room: 'Kleine zaal', tel: '+32 147 85 23 69', code: '', state: 'hold'}
    ]


    return <main className={"w-full min-h-[100svh]"}>
        <div className={"p-4 block sm:flex items-center justify-between"}>
            <div className={"w-full mb-1"}>
                <div className={"mb-4"}>
                    <h1 className={"text-2xl font-semibold text-gray-900 sm:text-3xl"}>Mijn boekingen</h1>
                </div>
                <h2 className={"mb-4 text-xl font-semibold text-gray-900 sm:text-2xl border-b pb-2 pt-4 sticky top-0 bg-white"}>Komende
                    boekingen</h2>
                {reservations.filter(reservation => ((reservation.date) >= new Date())).map(
                    (reservation, index) => <Reservation key={index} {...reservation} />
                )}
                <h2 className={"mb-4 text-xl font-semibold text-gray-900 sm:text-2xl border-b pb-2 pt-4 sticky top-0 bg-white"}>Verleden
                    boekingen</h2>
                {reservations.filter(reservation => ((reservation.date) <= new Date())).map(
                    (reservation, index) => <Reservation key={index} {...reservation} />
                )}
            </div>
        </div>
    </main>;
}
