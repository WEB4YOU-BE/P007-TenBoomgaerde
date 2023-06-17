import Link from "next/link";
import Image from "next/image";

export default function PublicNavigationLayoutDashboard({children}: { children: React.ReactNode }) {


    return <>
        <div className={"fixed top-0 z-50 w-full bg-white border-b border-gray-200"}>
            <div className={"px-3 py-3 lg:px-5 lg:pl-3"}>
                <div className={"flex items-center justify-between"}>
                    <div className={"flex items-center justify-start"}>
                        <button type={"button"}
                                className={"inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"}>
                            <span className={"sr-only"}>Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <Link href={"/dashboard"} className={"flex ml-2 md:mr-24"}>
                            <Image className={"aspect-square w-[40px] h-[40px] rounded"}
                                   src={"/images/logo-bewegingnet - square.png"} alt={"Logo"} width={77} height={77}/>
                            <span className={"self-center text-xl font-semibold sm:text-2xl whitespace-nowrap pl-2"}>Ten Boomgaerde</span>
                        </Link>
                    </div>
                    <div className={"flex items-center"}>
                        <div className={"flex items-center ml-3"}>
                            <div>
                                <button type={"button"}
                                        className={"flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"}
                                        aria-expanded={"false"} onClick={props.openUserMenuClick}>
                                    <span className="sr-only">Open user menu</span>
                                    <Image src={"/images/avatar.jpg"} alt={""} className={"w-8 h-8 rounded-full"}
                                           width={77}
                                           height={77}/>
                                </button>
                            </div>
                            <div
                                className={"z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow"}
                                id={"dropdown-user"}>
                                <div className={"px-4 py-3"}>
                                    <p className={"text-sm text-gray-900"}>
                                        Voornaam Naam
                                    </p>
                                    <p className={"text-sm font-medium text-gray-900 truncate"}>
                                        voornaam.naam@vzwtenboomgaerdelichtervelde.be
                                    </p>
                                </div>
                                <ul className={"py-1"}>
                                    <li>
                                        <Link href={"#"}
                                              className={"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300"}>Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link href={"#"}
                                              className={"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300"}>Accountinstellingen</Link>
                                    </li>
                                    <li>
                                        <Link href={"#"}
                                              className={"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300"}>Uitloggen</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {children}
    </>;
}