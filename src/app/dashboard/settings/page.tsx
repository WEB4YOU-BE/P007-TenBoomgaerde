export default function Index() {
    return <main className={"w-full min-h-[100svh]"}>
        <div className={"grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4"}>
            <div className={"mb-4 col-span-full xl:mb-2"}>
                <h1 className={"text-xl font-semibold text-gray-900"}>Gebruikersinstellingen/toevoegen/wijzigen</h1>
            </div>
            <div className={"col-span-2"}>
                <div className={"p-4 mb-4 border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2"}>
                    <h2 className={"mb-4 text-xl font-semibold"}>Algemene informatie</h2>
                    <form action={"#"}>
                        <div className={"grid grid-cols-6 gap-6"}>
                            <div className={"col-span-6 sm:col-span-3"}>
                                <label htmlFor={"name"}
                                       className={"block mb-2 text-sm font-medium text-gray-900"}>Naam</label>
                                <input type={"text"} name={"name"} id={"name"}
                                       className={"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"}
                                       placeholder={"Voornaam naam"} required/>
                            </div>
                            <div className={"col-span-6 sm:col-span-3"}>
                                <label htmlFor={"email"}
                                       className={"block mb-2 text-sm font-medium text-gray-900"}>Email</label>
                                <input type={"text"} name={"email"} id={"email"}
                                       className={"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"}
                                       placeholder={"naam@vzwtenboomgaerdelichtervelde.be"} required/>
                            </div>
                            <div className={"col-span-6 sm:col-span-3"}>
                                <label htmlFor={"adres"}
                                       className={"block mb-2 text-sm font-medium text-gray-900"}>Adres</label>
                                <input type={"text"} name={"adres"} id={"adres"}
                                       className={"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"}
                                       placeholder={"Straatnaam nr"} required/>
                            </div>
                            <div className={"col-span-6 sm:col-span-3"}>
                                <label htmlFor={"postcode"}
                                       className={"block mb-2 text-sm font-medium text-gray-900"}>Postcode</label>
                                <input type={"text"} name={"postcode"} id={"postcode"}
                                       className={"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"}
                                       placeholder={"8810"} required/>
                            </div>
                            <div className={"col-span-6 sm:col-span-3"}>
                                <label htmlFor={"gemeente"}
                                       className={"block mb-2 text-sm font-medium text-gray-900"}>Gemeente</label>
                                <input type={"text"} name={"gemeente"} id={"gemeente"}
                                       className={"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"}
                                       placeholder={"Gemeente"} required/>
                            </div>
                            <div className={"col-span-6 sm:col-span-3"}>
                                <label htmlFor={"tel"}
                                       className={"block mb-2 text-sm font-medium text-gray-900"}>GSM-nummer</label>
                                <input type={"text"} name={"telnr"} id={"telnr"}
                                       className={"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"}
                                       placeholder={"0412 34 45 67"} required/>
                            </div>
                            <div className={"col-span-6 sm:col-span-3"}>
                                <label htmlFor={"role"}
                                       className={"block mb-2 text-sm font-medium text-gray-900"}>Rol,
                                    beheerder?</label>
                                <input type={"checkbox"} name={"role"} id={"role"}
                                       className={""}
                                       placeholder={"0412 34 45 67"} required/>
                            </div>
                            <div className={"col-span-6 sm:col-span-full"}>
                                <button
                                    className={"bg-green-200 hover:bg-green-300 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"}
                                    type={"submit"}>
                                    Opslaan
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>;
}