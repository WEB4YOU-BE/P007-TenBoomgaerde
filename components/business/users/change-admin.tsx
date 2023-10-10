"use client"
import {Switch} from "@/components/ui/Switch";
import React from "react";
import {UpdateAdmin} from "@/components/business/reservations/update-admin";
import {useToast} from "@/hooks/use-toast";

interface AdminUserProps {
    id: string;
    isAdmin: boolean;
    email: string;
}

export default function ChangeAdmin({id, isAdmin, email}: AdminUserProps) {
    const {toast} = useToast()

    const handleChange = () => {
        const checked = !isAdmin
        console.log(checked)
        UpdateAdmin({id, checked})
        toast({
            title: `${email} is ${checked ? "administator gemaakt" : "geen administrator meer"}`,
        })
    }

    return <Switch defaultChecked={isAdmin} onClick={handleChange}/>
}