"use client"
import {Switch} from "@/components/atoms/Switch";
import React from "react";
import {UpdateFacturatie} from "@/components/business/reservations/update-facturatie";

interface AdminUserProps {
    id: string;
    isGefactureerd: boolean;
}

export default function ChangeFacturatie({id, isGefactureerd}: AdminUserProps) {

    const handleChange = () => {
        const checked = !isGefactureerd
        UpdateFacturatie({id, checked})
    }

    return <Switch defaultChecked={isGefactureerd} onClick={handleChange}/>
}