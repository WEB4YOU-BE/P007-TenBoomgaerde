"use client"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/atoms/Popover";
import {Button} from "@/components/atoms/button";
import {Command, CommandEmpty, CommandGroup, CommandItem} from "@/components/atoms/Command"
import {ChevronDown, Check} from "lucide-react";
import React from "react";
import { cn } from "@/utils/tailwindcss/MergeCN";
import {UpdateStatus} from "@/components/business/reservations/update-reservation-status";

interface SelectStatusProps {
    id: string;
    status: string | null;
}

const statussen = [
    {
        value: "geweigerd",
        label: "geweigerd",
    },
    {
        value: "in afwachting",
        label: "in afwachting",
    },
    {
        value: "goedgekeurd",
        label: "goedgekeurd",
    },
]

export default function SelectStatus({id, status}: SelectStatusProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(status)

    const handleChange = async (nieuweStatus: string) => {
        await UpdateStatus({id, nieuweStatus})
    }

    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
                variant={value === "goedgekeurd" ? "green" : value === "geweigerd" ? "destructive" : "orange"}
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
            >
                {value
                    ? statussen.find((framework) => framework.value === value)?.label
                    : status}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
            <Command>
                <CommandEmpty>Geen status aangegeven.</CommandEmpty>
                <CommandGroup>
                    {statussen.map((framework) => (
                        <CommandItem
                            key={framework.value}
                            onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                                handleChange(currentValue)
                            }}
                        >
                            <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    value === framework.value ? "opacity-100" : "opacity-0"
                                )}
                            />
                            {framework.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </Command>
        </PopoverContent>
    </Popover>
}