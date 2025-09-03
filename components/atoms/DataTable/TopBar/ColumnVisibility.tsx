import { CaretUpDownIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { Table } from "@tanstack/react-table";
import { CustomComponentPropsWithRef, useMemo } from "react";
import React from "react";

import Button from "@/components/atoms/Button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut,
} from "@/components/atoms/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/atoms/popover";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

interface ColumnVisibilityProps<TData>
    extends CustomComponentPropsWithRef<typeof Button> {
    table: Table<TData>;
}

const ColumnVisibility = <TData,>({
    className,
    table,
    ...props
}: ColumnVisibilityProps<TData>) => {
    const allHideableColumns = useMemo(
        () => table.getAllFlatColumns().filter((col) => col.getCanHide()),
        [table]
    );

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className={cn(
                        "min-w-[200px] max-md:grow justify-between",
                        className
                    )}
                    role="combobox"
                    title="Kolom zichtbaarheid"
                    variant="outline"
                    {...props}
                >
                    <span>Kolommen</span>
                    <CaretUpDownIcon className="ml-2 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
                <Command>
                    <CommandInput className="h-9" placeholder="Zoek kolom..." />
                    <CommandList>
                        <CommandEmpty>Geen kolom gevonden.</CommandEmpty>
                        <CommandGroup>
                            {allHideableColumns.map((column) => (
                                <CommandItem
                                    key={column.id}
                                    onSelect={() => {
                                        column.toggleVisibility();
                                    }}
                                >
                                    {column.columnDef.header?.toString()}
                                    {column.getIsVisible() && (
                                        <CommandShortcut>
                                            <CheckIcon />
                                        </CommandShortcut>
                                    )}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default ColumnVisibility;
