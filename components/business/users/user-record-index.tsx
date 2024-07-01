import {Info} from "lucide-react";
import React from "react";
import Link from "next/link";
import ChangeAdmin from "@/components/business/users/change-admin";
import { cn } from "@/utils/tailwindcss/MergeCN";
import { buttonVariants } from "@/components/atoms/button";

interface UserRecordIndexProps {
    id: string;
    firstname?: string | null;
    lastname?: string | null;
    isAdmin: boolean;
    email: string;
    phone: string | null
    city: string | null
    type: number
}

export default async function UserRecordIndex({
                                                  id,
                                                  firstname,
                                                  lastname,
                                                  isAdmin,
                                                  email,
                                                  phone,
                                                  city,
                                                  type
                                              }: UserRecordIndexProps) {
    const voornaam = firstname ?? ""
    const familienaam = lastname ?? ""
    return <tr
        className={"hover:bg-muted whitespace-nowrap max-sm:[&>*:nth-child(1)]:hidden max-sm:[&>*:nth-child(3)]:hidden max-sm:[&>*:nth-child(4)]:hidden max-sm:[&>*:nth-child(5)]:hidden max-sm:[&>*:nth-child(6)]:hidden"}>
        <UserRecordDatapoint>{voornaam + " " + familienaam}</UserRecordDatapoint>
        <UserRecordDatapoint>{email}</UserRecordDatapoint>
        <UserRecordDatapoint>{phone ?? ""}</UserRecordDatapoint>
        <UserRecordDatapoint>{city ?? ""}</UserRecordDatapoint>
        <UserRecordDatapoint>{type}</UserRecordDatapoint>
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
        <Link href={`/dashboard/users/${id}`}
              className={cn(buttonVariants({variant: "default"}), "flex flex-row gap-2 flex-shrink-0")}><Info
            size={16}/><span className={"max-sm:hidden"}>Info</span></Link>
    </div>
}