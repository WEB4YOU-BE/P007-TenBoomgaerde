import {
    ArrowsClockwiseIcon,
    CaretUpDownIcon,
    SortAscendingIcon,
    SortDescendingIcon,
    TrashIcon,
    XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { type ColumnSort, SortingState, Table } from "@tanstack/react-table";
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
    CommandSeparator,
    CommandShortcut,
} from "@/components/atoms/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/atoms/popover";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

interface ColumnSortProps<TData>
    extends CustomComponentPropsWithRef<typeof Button> {
    table: Table<TData>;
}

const ColumnSort = <TData,>({
    className,
    table,
    ...props
}: ColumnSortProps<TData>) => {
    const currentSort = table.getState().sorting;
    const unsortedColumns = useMemo(
        () =>
            table
                .getAllColumns()
                .filter((col) => col.getCanSort())
                .filter(
                    (col) => !currentSort.some((sort) => sort.id === col.id)
                ),
        [currentSort, table]
    );

    const handleColumnSort = useCallback(
        (columnId: ColumnSort["id"]) => {
            const isSorted = currentSort.some((sort) => sort.id === columnId);
            table.setSorting((prev: SortingState) => {
                if (!isSorted)
                    return prev.concat([{ desc: false, id: columnId }]);
                else
                    return prev.map((sort) =>
                        sort.id === columnId
                            ? { ...sort, desc: !sort.desc }
                            : sort
                    );
            });
        },
        [currentSort, table]
    );
    const handleRemoveColumnSort = useCallback(
        (columnId: ColumnSort["id"]) => {
            table.setSorting((prev: SortingState) =>
                prev.filter((sort) => sort.id !== columnId)
            );
        },
        [table]
    );
    const handleResetSort = useCallback(() => {
        table.resetSorting();
    }, [table]);
    const handleClearSort = useCallback(() => {
        table.setSorting([]);
    }, [table]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className={cn(
                        "min-w-[200px] max-md:grow justify-between",
                        className
                    )}
                    role="combobox"
                    title="Sorteer kolom"
                    variant="outline"
                    {...props}
                >
                    <span>Sorteren</span>
                    <CaretUpDownIcon className="ml-2 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
                <Command>
                    <CommandInput className="h-9" placeholder="Zoek kolom..." />
                    <CommandList>
                        <CommandEmpty>Geen kolom gevonden.</CommandEmpty>
                        {currentSort.length > 0 && (
                            <CommandGroup heading="Huidige sortering">
                                {currentSort.map((sort, index) => {
                                    const column = table.getColumn(sort.id);
                                    if (!column) return null;
                                    return (
                                        <CommandItem
                                            key={sort.id}
                                            onSelect={() =>
                                                handleColumnSort(sort.id)
                                            }
                                        >
                                            <span>
                                                {index + 1}.{" "}
                                                {column.columnDef.header?.toString()}
                                            </span>
                                            <CommandShortcut>
                                                <div className="flex items-center">
                                                    {sort.desc ? (
                                                        <SortDescendingIcon />
                                                    ) : (
                                                        <SortAscendingIcon />
                                                    )}
                                                    <Button
                                                        className="size-4"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRemoveColumnSort(
                                                                sort.id
                                                            );
                                                        }}
                                                        size={"icon"}
                                                        variant={"ghost"}
                                                    >
                                                        <XIcon className="opacity-50" />
                                                    </Button>
                                                </div>
                                            </CommandShortcut>
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        )}
                        {unsortedColumns.length > 0 && (
                            <CommandGroup heading="Voeg nieuwe kolom toe">
                                {unsortedColumns.map((column) => (
                                    <CommandItem
                                        key={column.id}
                                        onSelect={() =>
                                            handleColumnSort(column.id)
                                        }
                                    >
                                        {column.columnDef.header?.toString()}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                        <CommandSeparator />
                        <CommandGroup heading="Acties">
                            <CommandItem onSelect={handleResetSort}>
                                Reset sortering
                                <CommandShortcut>
                                    <ArrowsClockwiseIcon />
                                </CommandShortcut>
                            </CommandItem>
                            <CommandItem onSelect={handleClearSort}>
                                Wis sortering
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

export default ColumnSort;
