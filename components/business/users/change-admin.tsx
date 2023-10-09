"use client"
import {Switch} from "@/components/ui/Switch";
import React from "react";
import {UpdateAdmin} from "@/components/business/reservations/update-admin";

interface AdminUserProps {
    id: string;
    isAdmin: boolean;
}

export default function ChangeAdmin({id, isAdmin}: AdminUserProps) {

    const handleChange = () => {
        const checked = !isAdmin
        UpdateAdmin({id, checked})
    }

    return <Switch defaultChecked={isAdmin} onClick={handleChange}/>
}