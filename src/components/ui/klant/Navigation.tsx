"use client"

import * as React from "react"
import {FC} from "react"

import Link from "next/link";
import Image from "next/image";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/Collapsible";

const KlantNavigation: FC = () => {
    const [isOpen, setIsOpen] = React.useState(false)

    return <>
        <Collapsible className={"sm:hidden"} open={isOpen} onOpenChange={setIsOpen}>
            <div className={"bg-green-200 flex flex-row gap-2 p-2 mr-auto"}>
                <CollapsibleTrigger
                    className={"inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg  hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-300"}>
                    <span className={"sr-only"}>Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </CollapsibleTrigger>
                <Link href={"/klant"} className={"flex flex-row gap-2 p-2"} onClick={() => setIsOpen(false)}>
                    <Image className={"w-[40px] h-[40px] rounded-full"}
                           src={"/images/Logo Ten Boomgaerde.PNG"}
                           alt={"Logo"} width={40} height={40}/>
                    <p className={"self-center text-xl font-semibold sm:text-2xl whitespace-nowrap pl-1"}>Ten
                        Boomgaerde</p>
                </Link>
            </div>
            <CollapsibleContent>
                <div className={"sm:hidden flex flex-col flex-grow gap-2 bg-green-200 h-screen"}>
                    <Link href={"/klant"} onClick={() => setIsOpen(false)}
                          className={"bg-green-200 hover:bg-green-300 rounded-lg flex flex-row gap-2 p-2"}>
                        <svg xmlns={"http://www.w3.org/2000/svg"} fill={"none"} viewBox={"0 0 24 24"} strokeWidth={1.5}
                             stroke={"currentColor"} className={"w-6 h-6"}>
                            <path strokeLinecap={"round"} strokeLinejoin={"round"}
                                  d={"M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"}/>
                        </svg>
                        <span>Boekingen</span>
                    </Link>
                    <Collapsible>
                        <CollapsibleTrigger
                            className={"bg-green-200 w-full hover:bg-green-300 rounded-lg flex flex-row gap-2 p-2"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                            </svg>
                            <span>Voornaam familienaam</span>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div
                                className={"my-2 flex flex-col z-80 bg-green-200 border border-green-400 rounded-lg shadow"}>
                                <Link href={""}
                                      className={"flex flex-row gap-2 p-2 font-light hover:bg-green-400"}
                                      onClick={() => setIsOpen(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                    <span>Accountinstellingen</span>
                                </Link>
                                <Link href={"#"} className={"flex flex-row gap-2 p-2 font-light hover:bg-green-400"}
                                      onClick={() => setIsOpen(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                                    </svg>
                                    <span>Uitloggen</span>
                                </Link>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </CollapsibleContent>
        </Collapsible>
        <aside
            className={"fixed bg-green-200 w-80 max-w-screen-sm h-[100svh] flex flex-col gap-4 p-4 top-0 left-0 z-20 transform-gpu -translate-x-80 sm:translate-x-0 transition-width"}>
            <Link href={"/klant"} className={"flex flex-row gap-2 p-2"}>
                <Image className={"w-[40px] h-[40px] rounded-full"} src={"/images/Logo Ten Boomgaerde.PNG"}
                       alt={"Logo"} width={40} height={40}/>
                <p className={"self-center text-xl font-semibold sm:text-2xl whitespace-nowrap pl-1"}>Ten
                    Boomgaerde</p>
            </Link>
            <div className={"flex flex-col flex-grow gap-2"}>
                <Link href={"/klant"}
                      className={"bg-green-200 hover:bg-green-300 rounded-lg flex flex-row gap-2 p-2"}>
                    <svg xmlns={"http://www.w3.org/2000/svg"} fill={"none"} viewBox={"0 0 24 24"} strokeWidth={1.5}
                         stroke={"currentColor"} className={"w-6 h-6"}>
                        <path strokeLinecap={"round"} strokeLinejoin={"round"}
                              d={"M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"}/>
                    </svg>
                    <span>Boekingen</span>
                </Link>
            </div>
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleContent>
                    <div
                        className={"my-2 flex flex-col z-80 bg-green-200 border border-green-400 rounded-lg shadow"}>
                        <Link href={""}
                              className={"flex flex-row gap-2 p-2 font-light hover:bg-green-400"}
                              onClick={() => setIsOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"/>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            <span>Accountinstellingen</span>
                        </Link>
                        <Link href={"#"} className={"flex flex-row gap-2 p-2 font-light hover:bg-green-400"}
                              onClick={() => setIsOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                            </svg>
                            <span>Uitloggen</span>
                        </Link>
                    </div>
                </CollapsibleContent>
                <CollapsibleTrigger
                    className={"bg-green-200 w-full hover:bg-green-300 rounded-lg flex flex-row gap-2 p-2"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                    </svg>
                    <span>Voornaam familienaam</span>
                </CollapsibleTrigger>
            </Collapsible>
        </aside>
    </>;
}

export default KlantNavigation;
