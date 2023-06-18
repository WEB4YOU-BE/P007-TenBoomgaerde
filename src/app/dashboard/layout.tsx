import Link from "next/link";
import Image from "next/image";

export default function PublicNavigationLayoutDashboard({children}: { children: React.ReactNode }) {


    return <>
        <nav className={"fixed top-0 z-50 w-full ml-64 bg-white border-b border-gray-200"}>
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
                        <Link href={"/dashboard"} className={"flex ml-2 sm:hidden"}>
                            <Image className={"aspect-square w-[40px] h-[40px] rounded-full"}
                                   src={"/images/logo-bewegingnet - square.png"} alt={"Logo"} width={77} height={77}/>
                            <p className={"self-center text-xl font-semibold sm:text-2xl whitespace-nowrap pl-1"}>Ten
                                Boomgaerde</p>
                        </Link>
                    </div>
                    <div className={"flex items-center"}>
                        <div className={"flex items-center ml-3"}>
                            <div>
                                <button type={"button"}
                                        className={"flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"}
                                        aria-expanded={"false"}>
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
        </nav>
        <aside
            className={"fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full bg-green-200 border-r border-gray-200 sm:translate-x-0"}
            aria-label={"Sidebar"}>
            <Link href={"/dashboard"} className={" flex ml-2 md:mr-24 pt-3"}>
                <Image className={"aspect-square w-[40px] h-[40px] rounded-full"}
                       src={"/images/logo-bewegingnet - square.png"} alt={"Logo"} width={77} height={77}/>
                <p className={"self-center text-xl font-semibold sm:text-2xl whitespace-nowrap pl-1"}>Ten
                    Boomgaerde</p>
            </Link>
            <div className={"h-full px-3 pb-4 overflow-y-auto bg-green-200 pt-10"}>
                <ul className={"space-y-2 font-medium"}>
                    <li>
                        <Link href={"#"}
                              className={"flex items-center p-2 text-gray-900 rounded-lg hover:bg-green-300"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                            </svg>
                            <p className={"ml-3"}>Dashboard</p>
                        </Link>
                    </li>
                    <li>
                        <Link href={"#"}
                              className={"flex items-center p-2 text-gray-900 rounded-lg hover:bg-green-300"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"/>
                            </svg>
                            <p className={"ml-3"}>Inbox</p>
                            <p className={"inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium bg-green-400 rounded-full"}>3</p>
                        </Link>
                    </li>
                    <li>
                        <Link href={"#"}
                              className={"flex items-center p-2 text-gray-900 rounded-lg hover:bg-green-300"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
                            </svg>
                            <p className={"ml-3"}>Agenda</p>
                        </Link>
                    </li>
                    <li>
                        <Link href={"#"}
                              className={"flex items-center p-2 text-gray-900 rounded-lg hover:bg-green-300"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <p className={"ml-3"}>Prijzen</p>
                        </Link>
                    </li>
                    <li>
                        <Link href={"#"}
                              className={"flex items-center p-2 text-gray-900 rounded-lg hover:bg-green-300"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"/>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"/>
                            </svg>
                            <p className={"ml-3"}>Analyses</p>
                        </Link>
                    </li>
                    <li>
                        <Link href={"#"}
                              className={"flex items-center p-2 text-gray-900 rounded-lg hover:bg-green-300"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                            </svg>
                            <p className={"ml-3"}>Users</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
        {children}
    </>;
}