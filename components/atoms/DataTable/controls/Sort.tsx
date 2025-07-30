import {
    ArrowsDownUpIcon,
    CaretUpDownIcon,
    SortAscendingIcon,
    SortDescendingIcon,
} from "@phosphor-icons/react/dist/ssr";
import { type Table as TTable } from "@tanstack/react-table";
import React, { useCallback, useState } from "react";

import Button from "@/components/atoms/Button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/atoms/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/atoms/popover";

function SortDropdown<TData>({ table }: { table: TTable<TData> }) {
    const [open, setOpen] = useState<boolean>(false);

    const sortableColumns = table
        .getAllColumns()
        .filter((col) => col.getCanSort());
    const sorted = table.getState().sorting?.[0];
    const currentId = sorted?.id;
    const currentDesc = sorted?.desc;

    const handleSelect = useCallback(
        (colId?: string) => {
            if (!colId) table.setSorting([]);
            else
                table.setSorting([
                    {
                        desc: colId === currentId ? !currentDesc : false,
                        id: colId,
                    },
                ]);
            setOpen(false);
        },
        [currentId, currentDesc, table]
    );
    const handleToggleDirection = useCallback(() => {
        table.setSorting([{ desc: !currentDesc, id: currentId }]);
    }, [currentId, currentDesc, table]);

    return (
        <div className="flex items-center gap-2">
            <Popover onOpenChange={setOpen} open={open}>
                <PopoverTrigger asChild>
                    <Button
                        aria-expanded={open}
                        className="min-w-[200px] max-md:grow justify-between"
                        role="combobox"
                        title="Sorteer kolom"
                        variant="outline"
                    >
                        <span className="text-sm">
                            {currentId
                                ? (sortableColumns
                                      .find((col) => col.id === currentId)
                                      ?.columnDef.header?.toString() ??
                                  currentId)
                                : "Sorteer op"}
                        </span>
                        {currentId ? (
                            currentDesc ? (
                                <SortDescendingIcon className="ml-2 opacity-80" />
                            ) : (
                                <SortAscendingIcon className="ml-2 opacity-80" />
                            )
                        ) : (
                            <CaretUpDownIcon className="ml-2 opacity-50" />
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
                    <Command>
                        <CommandInput
                            className="h-9"
                            placeholder="Zoek kolom..."
                        />
                        <CommandList>
                            <CommandEmpty>Geen kolom gevonden.</CommandEmpty>
                            <CommandGroup>
                                {sortableColumns.map((column) => {
                                    const isActive = currentId === column.id;
                                    const isDesc = isActive
                                        ? currentDesc
                                        : false;
                                    return (
                                        <CommandItem
                                            key={column.id}
                                            onSelect={() =>
                                                handleSelect(column.id)
                                            }
                                            value={column.id}
                                        >
                                            {column.columnDef.header?.toString() ??
                                                column.id}
                                            {isActive ? (
                                                isDesc ? (
                                                    <SortDescendingIcon className="ml-auto opacity-100" />
                                                ) : (
                                                    <SortAscendingIcon className="ml-auto opacity-100" />
                                                )
                                            ) : null}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <Button
                className="h-9"
                disabled={!currentId}
                onClick={handleToggleDirection}
                title="Wissel sorteervolgorde"
                variant="outline"
            >
                <ArrowsDownUpIcon className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default SortDropdown;
