import { ReactNode } from "react";

import Image from "next/image";

export default function Layout({ children }: { children: ReactNode }) {
    return <>
        <div className="container relative h-[100vh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Image src={"/images/Logo Ten Boomgaerde.PNG"} alt={"Logo"} width={40} height={40}
                        className={"aspect-square mr-2 h-8 w-8 rounded-full"} />
                    VZW Ten Boomgaerde Lichtervelde
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg text-balance">
                            &ldquo;Deze website maakt het ons vele malen makkelijker om een reservering te ontvangen, verwerken en accepteren.&rdquo;
                        </p>
                        <footer className="text-sm">Guy Beeusaert</footer>
                    </blockquote>
                </div>
            </div>
            <div className="py-4 lg:p-8">
                {children}
            </div>
        </div>
    </>
}