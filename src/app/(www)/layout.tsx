import Link from "next/link";
import Image from "next/image";

export default function PublicNavigationLayout({children}: { children: React.ReactNode }) {
    return <>
        <div className={"sm:sticky sm:top-0 sm:z-50 container max-w-screen-md mx-auto p-2"}>
            <div className={"bg-gray-200 rounded flex flex-col gap-2 p-2"}>
                <div className={"flex flex-row gap-2"}>
                    <Image className={"aspect-square w-[40px] h-[40px] rounded"} src={"/images/logo-bewegingnet - square.png"} alt={"Logo"} width={77} height={77}/>
                    <nav className={"flex flex-row flex-grow overflow-x-auto gap-2"}> {/* invisible sm:visible */}
                        <Link className={"bg-gray-200 hover:bg-gray-100 rounded p-2"} href={"/"}>Startpagina</Link>
                        <Link className={"bg-gray-200 hover:bg-gray-100 rounded p-2"} href={"/reserveren"}>Reserveer</Link>
                        <Link className={"bg-gray-200 hover:bg-gray-100 rounded p-2"} href={"/prijzen"}>Prijzen</Link>
                    </nav>
                    <Link className={"bg-green-800 hover:bg-green-700 text-white rounded flex-shrink-0 p-2"} href={"/sign-in"}>Log in</Link>
                </div>
                {/*
                <nav className={"flex flex-row flex-grow flex-wrap sm:hidden gap-2"}>
                    <Link className={"bg-gray-200 hover:bg-gray-100 rounded p-2"} href={"/"}>Startpagina</Link>
                    <Link className={"bg-gray-200 hover:bg-gray-100 rounded p-2"} href={"/reserveren"}>Reserveer</Link>
                    <Link className={"bg-gray-200 hover:bg-gray-100 rounded p-2"} href={"/prijzen"}>Prijzen</Link>
                </nav>
                */}
            </div>
        </div>
        {children}
    </>;
}