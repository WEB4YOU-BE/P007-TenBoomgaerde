import Link from "next/link";
import Image from "next/image";
import {getAuthSession} from "@/librairy/authentication";
import {buttonVariants} from "@/components/ui/Button";
import SignInButton from "@/components/ui/authenticatie/SignInButton";
import SignOutButton from "@/components/ui/authenticatie/SignOutButton";

const Navigation = async () => {

    const session = await getAuthSession();

    return <div className={"sm:sticky sm:top-0 sm:z-50 container max-w-screen-md mx-auto p-2"}>
        <div className={"bg-gray-200 rounded-lg flex flex-col gap-2 p-2"}>
            <div className={"flex flex-row gap-2"}>
                <Image className={"aspect-square w-[40px] h-[40px] rounded-lg"} src={"/images/Logo Ten Boomgaerde.PNG"}
                       alt={"Logo"} width={77} height={77}/>
                <nav className={"flex flex-row flex-grow overflow-x-auto invisible sm:visible gap-2"}>
                    <Link className={buttonVariants({variant: "ghost"})} href={"/"}>Startpagina</Link>
                    <Link className={buttonVariants({variant: "ghost"})} href={"/reserveren"}>Reserveer</Link>
                    <Link className={buttonVariants({variant: "ghost"})} href={"/producten"}>Prijzen</Link>
                </nav>
                {!session && <SignInButton/>}
                {session && <SignOutButton/>}
            </div>
            <nav className={"flex flex-row flex-grow flex-wrap sm:hidden gap-2"}>
                <Link className={buttonVariants({variant: "ghost"})} href={"/"}>Startpagina</Link>
                <Link className={buttonVariants({variant: "ghost"})} href={"/reserveren"}>Reserveer</Link>
                <Link className={buttonVariants({variant: "ghost"})} href={"/producten"}>Prijzen</Link>
            </nav>
        </div>
    </div>;
};

export default Navigation;