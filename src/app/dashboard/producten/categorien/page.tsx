import {Dialog, DialogTrigger} from "@/components/ui/Dialog";
import CategorieDialog from "@/components/ui/dashboard/CategorieDialog";
import Link from "next/link";

export default function Index() {

    const categories = [
        {id: 1, name: "Drank"},
        {id: 2, name: "Materiaal"},
    ]

    return <main className={"w-full min-h-[100svh]"}>
        <div className={"p-4 block sm:flex items-center justify-between"}>
            <div className={"w-full mb-1"}>
                <div className={"mb-4"}>
                    <h1 className={"text-xl font-semibold text-gray-900 sm:text-2xl"}>Categorieën</h1>
                </div>
                <div className={"items-center justify-between block sm:flex"}>
                    <div className={"flex items-center mb-4 sm:mb-0"}>
                        <form className={"sm:pr-3 w-full"} action={"#"} method={"GET"}>
                            <label className={"sr-only"}>Search</label>
                            <div className={"relative w-full mt-1 sm:w-64 xl:w-96"}>
                                <input type={"text"} name={"search"} placeholder={"Search"}
                                       className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"}/>
                            </div>
                        </form>
                    </div>
                    <div className={"flex items-center ml-auto space-x-2 sm:space-x-3"}>
                        <button
                            className={"inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center rounded-lg bg-green-200 hover:bg-green-300 focus:ring-4 focus:ring-green-300 sm:w-auto"}>
                            <svg className={"w-5 h-5 mr-2 -ml-1"} fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path
                                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"></path>
                            </svg>
                            Bijwerken
                        </button>
                        <Dialog>
                            <DialogTrigger
                                className={"inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center rounded-lg bg-green-200 hover:bg-green-300 sm:w-auto"}>
                                <svg className={"w-5 h-5 mr-2 -ml-1"} fill={"currentColor"} viewBox={"0 0 20 20"}
                                     xmlns={"http://www.w3.org/2000/svg"}>
                                    <path
                                        d={"M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"}
                                    ></path>
                                </svg>
                                Toevoegen
                            </DialogTrigger>
                            <CategorieDialog/>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
        <div className={"flex flex-col"}>
            <div className={"overflow-x-auto"}>
                <div className={"inline-block min-w-full align-middle"}>
                    <div className={"overflow-hidden shadow"}>
                        <table className={"min-w-full divide-y divide-gray-200 table-fixed"}>
                            <thead className={"bg-gray-100"}>
                            <tr>
                                {
                                    [
                                        'Naam',
                                        'Acties'
                                    ].map((th, index) => (
                                        <th key={index} scope={"col"}
                                            className={"p-4 text-xs font-medium text-left text-gray-500 uppercase"}>
                                            {th}
                                        </th>
                                    ))
                                }
                            </tr>
                            </thead>
                            <tbody className={"divide-y divide-gray-200"}>
                            {categories.map((categories) => (
                                <tr className={"hover:bg-gray-100"} key={categories.id}>
                                    <td className={"p-4 text-base font-medium text-gray-900 whitespace-nowrap"}>
                                        <data value={"naam"}>{categories.name}</data>
                                    </td>
                                    <td className={"p-4 space-x-2 whitespace-nowrap"}>
                                        <Link
                                            className={"inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg bg-green-200 hover:bg-green-300 focus:ring-4 focus:ring-green-300"}
                                            href={`/dashboard/producten/categorien/${categories.id}`}
                                        >
                                            <svg
                                                className={"w-4 h-4"}
                                                fill={"currentColor"}
                                                viewBox={"0 0 20 20"}
                                                xmlns={"http://www.w3.org/2000/svg"}
                                            >
                                                <svg>
                                                    <path
                                                        d={"M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"}/>
                                                    <path
                                                        fillRule={"evenodd"}
                                                        d={"M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"}
                                                        clipRule={"evenodd"}
                                                    />
                                                </svg>
                                            </svg>
                                            <span className={"sm:ml-2 hidden sm:block"}>Bewerk</span>
                                        </Link>
                                        <button
                                            className={"inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300"}
                                        >
                                            <svg
                                                className={"w-4 h-4"}
                                                fill={"currentColor"}
                                                viewBox={"0 0 20 20"}
                                                xmlns={"http://www.w3.org/2000/svg"}
                                            >
                                                <path
                                                    fillRule={"evenodd"}
                                                    d={"M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"}
                                                    clipRule={"evenodd"}
                                                />
                                            </svg>
                                            <span className={"sm:ml-2 hidden sm:block"}>Verwijder</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </main>;
}