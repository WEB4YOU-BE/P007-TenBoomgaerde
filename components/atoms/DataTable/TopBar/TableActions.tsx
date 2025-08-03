import { CaretUpDownIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { Table } from "@tanstack/react-table";
import React, {
    CustomComponentPropsWithRef,
    useCallback,
    useMemo,
} from "react";

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

interface TableActionsProps<TData>
    extends CustomComponentPropsWithRef<typeof Button> {
    table: Table<TData>;
}

const TableActions = <TData,>({
    className,
    table,
    ...props
}: TableActionsProps<TData>) => {
    // Getting the list of actions from the table options
    const actions = table.getAllRowActions();

    // Selecting and deselecting all rows
    const isEnabledRowSelection = useMemo(
        () => table.options.enableRowSelection ?? true,
        [table.options.enableRowSelection]
    );

    const isSomeRowsSelected = table.getIsSomeRowsSelected();
    const isAllRowsSelected = table.getIsAllRowsSelected();
    const isNoRowsSelected = useMemo(
        () => !isSomeRowsSelected && !isAllRowsSelected,
        [isSomeRowsSelected, isAllRowsSelected]
    );

    const canSelectAllRows = useMemo(
        () => !isAllRowsSelected,
        [isAllRowsSelected]
    );
    const canDeselectAllRows = useMemo(
        () => isSomeRowsSelected || isAllRowsSelected,
        [isSomeRowsSelected, isAllRowsSelected]
    );

    const handleToggleSelectAllRows = useCallback(
        () => table.toggleAllRowsSelected(),
        [table]
    );
    const handleDeselectAllRows = useCallback(
        () => table.toggleAllRowsSelected(false),
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
                    title="Acties"
                    variant="outline"
                    {...props}
                >
                    <span>Acties</span>
                    <CaretUpDownIcon className="ml-2 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
                <Command>
                    <CommandInput className="h-9" placeholder="Zoek actie..." />
                    <CommandList>
                        <CommandEmpty>Geen actie gevonden.</CommandEmpty>
                        {actions.length > 0 && (
                            <CommandGroup heading="Acties">
                                {actions.map((action) => (
                                    <CommandItem
                                        disabled={action.disabled?.(table)}
                                        key={action.id}
                                        onSelect={() => action.fn(table)}
                                    >
                                        {action.buttonLabel}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                        {isEnabledRowSelection && (
                            <CommandGroup heading="Rijen">
                                <CommandItem
                                    disabled={!canSelectAllRows}
                                    onSelect={handleToggleSelectAllRows}
                                >
                                    Selecteer alle rijen
                                    <CommandShortcut>
                                        {isAllRowsSelected && <CheckIcon />}
                                    </CommandShortcut>
                                </CommandItem>
                                <CommandItem
                                    disabled={!canDeselectAllRows}
                                    onSelect={handleDeselectAllRows}
                                >
                                    Deselecteer alle rijen
                                    <CommandShortcut>
                                        {isNoRowsSelected && <CheckIcon />}
                                    </CommandShortcut>
                                </CommandItem>
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default TableActions;
