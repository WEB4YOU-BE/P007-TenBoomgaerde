import {
    ArrowsClockwiseIcon,
    CaretUpDownIcon,
    FunnelIcon,
    TrashIcon,
    XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Column, Table } from "@tanstack/react-table";
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
import Select, {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/atoms/Select";
import { ColumnFilterType } from "@/types/features/table/columnFilter/ColumnFilterMeta";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

interface ColumnFilterProps<TData> extends CustomComponentPropsWithRef<
    typeof Button
> {
    table: Table<TData>;
}

// Helper to determine the filter type for a column
const getColumnFilterType = <TData,>(
    column: Column<TData>
): ColumnFilterType => {
    // Check if meta specifies a filter type
    const meta = column.columnDef.meta;
    if (meta?.filterType) {
        return meta.filterType;
    }
    // Default to text
    return "text";
};

// Helper to get filter options for select type
const getFilterOptions = <TData,>(
    column: Column<TData>
): { label: string; value: string }[] => {
    const meta = column.columnDef.meta;
    return meta?.filterOptions ?? [];
};

// Helper to get placeholder
const getFilterPlaceholder = <TData,>(column: Column<TData>): string => {
    const meta = column.columnDef.meta;
    if (meta?.filterPlaceholder) {
        return meta.filterPlaceholder;
    }
    const filterType = getColumnFilterType(column);
    switch (filterType) {
        case "boolean":
            return "Kies...";
        case "select":
            return "Selecteer...";
        case "number":
            return "Getal...";
        case "date":
            return "Datum...";
        default:
            return "Filter...";
    }
};

// Boolean options for boolean filter type
const BOOLEAN_OPTIONS = [
    { label: "Ja", value: "true" },
    { label: "Nee", value: "false" },
];

interface FilterInputProps<TData> {
    column: Column<TData>;
    value: string;
    onChange: (value: string) => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    autoFocus?: boolean;
    className?: string;
}

const FilterInput = <TData,>({
    column,
    value,
    onChange,
    onKeyDown,
    autoFocus,
    className,
}: FilterInputProps<TData>) => {
    const filterType = getColumnFilterType(column);
    const placeholder = getFilterPlaceholder(column);

    const handleStopPropagation = (
        e: React.KeyboardEvent | React.MouseEvent
    ) => {
        e.stopPropagation();
    };

    switch (filterType) {
        case "boolean":
            return (
                <Select onValueChange={onChange} value={value}>
                    <SelectTrigger
                        className={cn("h-7 flex-1", className)}
                        onClick={handleStopPropagation}
                    >
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {BOOLEAN_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );

        case "select": {
            const options = getFilterOptions(column);
            return (
                <Select onValueChange={onChange} value={value}>
                    <SelectTrigger
                        className={cn("h-7 flex-1", className)}
                        onClick={handleStopPropagation}
                    >
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );
        }

        case "number":
            return (
                <Input
                    autoFocus={autoFocus}
                    className={cn("h-7 flex-1", className)}
                    onChange={(e) => {
                        onChange(e.target.value);
                    }}
                    onClick={handleStopPropagation}
                    onKeyDown={(e) => {
                        handleStopPropagation(e);
                        onKeyDown?.(e);
                    }}
                    placeholder={placeholder}
                    type="number"
                    value={value}
                />
            );

        case "date":
            return (
                <Input
                    autoFocus={autoFocus}
                    className={cn("h-7 flex-1", className)}
                    onChange={(e) => {
                        onChange(e.target.value);
                    }}
                    onClick={handleStopPropagation}
                    onKeyDown={(e) => {
                        handleStopPropagation(e);
                        onKeyDown?.(e);
                    }}
                    placeholder={placeholder}
                    type="date"
                    value={value}
                />
            );

        case "text":
        default:
            return (
                <Input
                    autoFocus={autoFocus}
                    className={cn("h-7 flex-1", className)}
                    onChange={(e) => {
                        onChange(e.target.value);
                    }}
                    onClick={handleStopPropagation}
                    onKeyDown={(e) => {
                        handleStopPropagation(e);
                        onKeyDown?.(e);
                    }}
                    placeholder={placeholder}
                    type="text"
                    value={value}
                />
            );
    }
};

// Helper to format filter value for display
const formatFilterValue = <TData,>(
    column: Column<TData>,
    value: unknown
): string => {
    const filterType = getColumnFilterType(column);

    if (value === null || value === undefined || value === "") {
        return "";
    }

    const stringValue =
        typeof value === "string" ? value : JSON.stringify(value);

    switch (filterType) {
        case "boolean": {
            const option = BOOLEAN_OPTIONS.find((o) => o.value === stringValue);
            return option?.label ?? stringValue;
        }
        case "select": {
            const options = getFilterOptions(column);
            const option = options.find((o) => o.value === stringValue);
            return option?.label ?? stringValue;
        }
        default:
            return stringValue;
    }
};

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

    const selectedColumn = selectedColumnId
        ? table.getColumn(selectedColumnId)
        : null;

    const handleSelectColumn = useCallback((columnId: string) => {
        setSelectedColumnId(columnId);
        setFilterInputValue("");
    }, []);

    const handleApplyFilter = useCallback(() => {
        if (!selectedColumnId || !selectedColumn) return;

        selectedColumn.setFilterValue(filterInputValue || undefined);
        setSelectedColumnId(null);
        setFilterInputValue("");
    }, [selectedColumnId, selectedColumn, filterInputValue]);

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
                                    const filterType =
                                        getColumnFilterType(column);
                                    const isSelectType =
                                        filterType === "boolean" ||
                                        filterType === "select";
                                    return (
                                        <div
                                            className="flex flex-col gap-1.5 px-2 py-2 border-b last:border-b-0"
                                            key={filter.id}
                                        >
                                            <span className="text-xs font-medium text-muted-foreground">
                                                {column.columnDef.header?.toString()}
                                            </span>
                                            {isSelectType ? (
                                                <span className="h-8 flex items-center text-sm px-3 bg-muted rounded-md">
                                                    {formatFilterValue(
                                                        column,
                                                        filter.value
                                                    )}
                                                </span>
                                            ) : (
                                                <FilterInput
                                                    className="h-8"
                                                    column={column}
                                                    onChange={(value) => {
                                                        handleUpdateFilter(
                                                            filter.id,
                                                            value
                                                        );
                                                    }}
                                                    value={
                                                        typeof filter.value ===
                                                        "string"
                                                            ? filter.value
                                                            : ""
                                                    }
                                                />
                                            )}
                                            <Button
                                                className="h-8 w-full"
                                                onClick={() => {
                                                    handleRemoveFilter(
                                                        filter.id
                                                    );
                                                }}
                                                size="sm"
                                                variant="destructive"
                                            >
                                                <XIcon />
                                                Verwijder
                                            </Button>
                                        </div>
                                    );
                                })}
                            </CommandGroup>
                        )}

                        {/* Add new filter - column selection or input */}
                        {selectedColumn ? (
                            <CommandGroup heading="Nieuwe filter">
                                <div className="flex flex-col gap-2 px-2 py-2">
                                    <span className="text-xs font-medium text-muted-foreground">
                                        {selectedColumn.columnDef.header?.toString()}
                                    </span>
                                    <FilterInput
                                        autoFocus
                                        className="h-8"
                                        column={selectedColumn}
                                        onChange={setFilterInputValue}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleApplyFilter();
                                            } else if (e.key === "Escape") {
                                                setSelectedColumnId(null);
                                                setFilterInputValue("");
                                            }
                                        }}
                                        value={filterInputValue}
                                    />
                                    <div className="flex flex-col gap-2">
                                        <Button
                                            className="h-8 w-full"
                                            onClick={handleApplyFilter}
                                            size="sm"
                                            variant="default"
                                        >
                                            <FunnelIcon />
                                            Toepassen
                                        </Button>
                                        <Button
                                            className="h-8 w-full"
                                            onClick={() => {
                                                setSelectedColumnId(null);
                                                setFilterInputValue("");
                                            }}
                                            size="sm"
                                            variant="outline"
                                        >
                                            <XIcon />
                                            Annuleren
                                        </Button>
                                    </div>
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
