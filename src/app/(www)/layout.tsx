import Link from "next/link";
import Image from "next/image";

export default function PublicNavigationLayout({children}: { children: React.ReactNode }) {
    return <>
        <div className={"container max-w-screen-md mx-auto p-2"}>
            <nav className={"bg-gray-200 rounded flex flex-row gap-2 p-2"}>
                <Image className={"aspect-square w-[40px] h-[40px] rounded"} src={"/images/logo-bewegingnet - square.png"} alt={"Logo"} width={77} height={77}/>
                <div className={"flex flex-row flex-grow overflow-x-auto gap-2"}>
                    <Link className={"bg-gray-200 hover:bg-gray-100 rounded p-2"} href={"/"}>Startpagina</Link>
                    <Link className={"bg-gray-200 hover:bg-gray-100 rounded p-2"} href={"/reserveer"}>Reserveer</Link>
                    <Link className={"bg-gray-200 hover:bg-gray-100 rounded p-2"} href={"/prijzen"}>Prijzen</Link>
                </div>
                <Link className={"bg-gray-200 hover:bg-gray-100 rounded flex-shrink-0 p-2"} href={"/sign-in"}>Log in</Link>
            </nav>
        </div>
        {children}
    </>;
}