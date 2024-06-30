"use client"
import {JSX, useEffect, useState} from "react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/atoms/Collapsible";
import {Menu} from "lucide-react";
import {usePathname} from "next/navigation";

export default function ResponsiveSidebar({children, title}: { children: JSX.Element, title: JSX.Element }) {
    const pathName = usePathname()
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setOpen(false)
    }, [pathName, setOpen]);

    return <Collapsible open={open} onOpenChange={setOpen}>
        <div className={"flex flex-row justify-between"}>
            {title}
            <CollapsibleTrigger className={"lg:hidden"}><Menu/></CollapsibleTrigger>
        </div>
        <CollapsibleContent>
            {children}
        </CollapsibleContent>
    </Collapsible>
}