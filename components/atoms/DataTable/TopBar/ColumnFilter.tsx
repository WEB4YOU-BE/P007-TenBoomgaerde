import {
    ArrowsClockwiseIcon,
    CaretUpDownIcon,
    FunnelIcon,
    TrashIcon,
    XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Table } from "@tanstack/react-table";
import React, {
    CustomComponentPropsWithRef,
    useCallback,
    useMemo,
    useState,
} from "react";

import Button from "@/components/atoms/Button";
import Command, {
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/atoms/Command";
import Input from "@/components/atoms/Input";
import Popover, {
    PopoverContent,
    PopoverTrigger,
} from "@/components/atoms/Popover";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

interface ColumnFilterProps<TData> extends CustomComponentPropsWithRef<
    typeof Button
> {
    table: Table<TData>;
}

const ColumnFilter = <TData,>({
    className,
    table,
    ...props
}: ColumnFilterProps<TData>) => {
    const [selectedColumnId, setSelectedColumnId] = useState<string | null>(
        null
    );
    const [filterInputValue, setFilterInputValue] = useState<string>("");

    const currentFilters = table.getState().columnFilters;
    const filterableColumns = useMemo(
        () => table.getAllColumns().filter((col) => col.getCanFilter()),
        [table]
    );
    const unfilteredColumns = useMemo(
        () =>
            filterableColumns.filter(
                (col) => !currentFilters.some((filter) => filter.id === col.id)
            ),
        [currentFilters, filterableColumns]
    );

    const handleSelectColumn = useCallback((columnId: string) => {
        setSelectedColumnId(columnId);
        setFilterInputValue("");
    }, []);

    const handleApplyFilter = useCallback(() => {
        if (!selectedColumnId) return;
        const column = table.getColumn(selectedColumnId);
        if (!column) return;

        column.setFilterValue(filterInputValue || undefined);
        setSelectedColumnId(null);
        setFilterInputValue("");
    }, [selectedColumnId, filterInputValue, table]);

    const handleRemoveFilter = useCallback(
        (columnId: string) => {
            const column = table.getColumn(columnId);
            if (!column) return;
            column.setFilterValue(undefined);
        },
        [table]
    );

    const handleUpdateFilter = useCallback(
        (columnId: string, value: string) => {
            const column = table.getColumn(columnId);
            if (!column) return;
            column.setFilterValue(value || undefined);
        },
        [table]
    );

    const handleResetFilters = useCallback(() => {
        table.resetColumnFilters();
    }, [table]);

    const handleClearFilters = useCallback(() => {
        table.setColumnFilters([]);
    }, [table]);

    const activeFilterCount = currentFilters.length;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className={cn(
                        "min-w-50 max-md:grow justify-between",
                        className
                    )}
                    role="combobox"
                    title="Filter kolommen"
                    variant="outline"
                    {...props}
                >
                    <span>
                        Filteren
                        {activeFilterCount > 0 &&
                            ` (${activeFilterCount.toString()})`}
                    </span>
                    <CaretUpDownIcon className="ml-2 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
                <Command>
                    <CommandInput className="h-9" placeholder="Zoek kolom..." />
                    <CommandList>
                        <CommandEmpty>Geen kolom gevonden.</CommandEmpty>

                        {/* Current filters */}
                        {currentFilters.length > 0 && (
                            <CommandGroup heading="Actieve filters">
                                {currentFilters.map((filter) => {
                                    const column = table.getColumn(filter.id);
                                    if (!column) return null;
                                    return (
                                        <div
                                            className="flex items-center gap-2 px-2 py-1.5"
                                            key={filter.id}
                                        >
                                            <span className="text-sm min-w-20 truncate">
                                                {column.columnDef.header?.toString()}
                                            </span>
                                            <Input
                                                className="h-7 flex-1"
                                                onChange={(e) => {
                                                    handleUpdateFilter(
                                                        filter.id,
                                                        e.target.value
                                                    );
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                                onKeyDown={(e) => {
                                                    e.stopPropagation();
                                                }}
                                                placeholder="Filter..."
                                                value={
                                                    (filter.value as string) ||
                                                    ""
                                                }
                                            />
                                            <Button
                                                className="size-7"
                                                onClick={() => {
                                                    handleRemoveFilter(
                                                        filter.id
                                                    );
                                                }}
                                                size="icon"
                                                variant="ghost"
                                            >
                                                <XIcon className="opacity-50" />
                                            </Button>
                                        </div>
                                    );
                                })}
                            </CommandGroup>
                        )}

                        {/* Add new filter - column selection or input */}
                        {selectedColumnId ? (
                            <CommandGroup heading="Nieuwe filter">
                                <div className="flex items-center gap-2 px-2 py-1.5">
                                    <span className="text-sm min-w-20 truncate">
                                        {table
                                            .getColumn(selectedColumnId)
                                            ?.columnDef.header?.toString()}
                                    </span>
                                    <Input
                                        autoFocus
                                        className="h-7 flex-1"
                                        onChange={(e) => {
                                            setFilterInputValue(e.target.value);
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                        onKeyDown={(e) => {
                                            e.stopPropagation();
                                            if (e.key === "Enter") {
                                                handleApplyFilter();
                                            } else if (e.key === "Escape") {
                                                setSelectedColumnId(null);
                                                setFilterInputValue("");
                                            }
                                        }}
                                        placeholder="Filter waarde..."
                                        value={filterInputValue}
                                    />
                                    <Button
                                        className="h-7"
                                        onClick={handleApplyFilter}
                                        size="sm"
                                        variant="default"
                                    >
                                        <FunnelIcon />
                                    </Button>
                                    <Button
                                        className="size-7"
                                        onClick={() => {
                                            setSelectedColumnId(null);
                                            setFilterInputValue("");
                                        }}
                                        size="icon"
                                        variant="ghost"
                                    >
                                        <XIcon className="opacity-50" />
                                    </Button>
                                </div>
                            </CommandGroup>
                        ) : (
                            unfilteredColumns.length > 0 && (
                                <CommandGroup heading="Voeg filter toe">
                                    {unfilteredColumns.map((column) => (
                                        <CommandItem
                                            key={column.id}
                                            onSelect={() => {
                                                handleSelectColumn(column.id);
                                            }}
                                        >
                                            {column.columnDef.header?.toString()}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )
                        )}

                        <CommandSeparator />
                        <CommandGroup heading="Acties">
                            <CommandItem onSelect={handleResetFilters}>
                                Reset filters
                                <CommandShortcut>
                                    <ArrowsClockwiseIcon />
                                </CommandShortcut>
                            </CommandItem>
                            <CommandItem onSelect={handleClearFilters}>
                                Wis filters
                                <CommandShortcut>
                                    <TrashIcon />
                                </CommandShortcut>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default ColumnFilter;
