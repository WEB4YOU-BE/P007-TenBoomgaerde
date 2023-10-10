import {buttonVariants} from "@/components/ui/button";
import {Info} from "lucide-react";
import {cn} from "@/lib/utils";
import React from "react";
import Link from "next/link";
import ChangeAdmin from "@/components/business/users/change-admin";

interface UserRecordIndexProps {
    id: string;
    firstname?: string | null;
    lastname?: string | null;
    isAdmin: boolean;
    email: string;
    phone: string | null
    city: string | null
}

export default async function UserRecordIndex({id, firstname, lastname, isAdmin, email, phone, city}: UserRecordIndexProps) {
    const voornaam = firstname ?? ""
    const familienaam = lastname ?? ""
    return <tr className={"hover:bg-muted whitespace-nowrap"}>
        <UserRecordDatapoint>{voornaam + " " + familienaam}</UserRecordDatapoint>
        <UserRecordDatapoint>{email}</UserRecordDatapoint>
        <UserRecordDatapoint>{phone ?? ""}</UserRecordDatapoint>
        <UserRecordDatapoint>{city ?? ""}</UserRecordDatapoint>
        <UserRecordDatapoint><ChangeAdmin id={id} isAdmin={isAdmin} email={email}/></UserRecordDatapoint>
        <UserRecordDatapoint><UserRecordIndexActions id={id}/></UserRecordDatapoint>
    </tr>
}

interface UserRecordDatapointProps {
    children?: React.ReactNode;
}

async function UserRecordDatapoint({children}: UserRecordDatapointProps) {
    return <td
        className={"px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"}>{children}</td>
}

interface UserRecordIndexActionsProps {
    id: string;
}

async function UserRecordIndexActions({id}: UserRecordIndexActionsProps) {
    return <div className={"flex flex-row gap-2 flex-shrink-0"}>
        <Link href={`/dashboard/gebruikers/${id}`}
              className={cn(buttonVariants({variant: "blue"}), "flex flex-row gap-2 flex-shrink-0")}><Info
            size={16}/><span>Info</span></Link>
    </div>
}