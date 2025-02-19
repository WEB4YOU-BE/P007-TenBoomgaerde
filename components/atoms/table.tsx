import { cn } from "@/utils/tailwindcss/mergeClassNames";
import React, {
    type DetailedHTMLProps,
    type HTMLAttributes,
    type TableHTMLAttributes,
    type TdHTMLAttributes,
    type ThHTMLAttributes,
} from "react";

const Table = ({
    children,
    className,
    ...props
}: DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
>) => (
    <div className="relative w-full overflow-auto">
        <table
            className={cn("w-full caption-bottom text-sm", className)}
            {...props}
        >
            {children}
        </table>
    </div>
);

const TableHeader = ({
    children,
    className,
    ...props
}: DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
>) => (
    <thead className={cn("[&_tr]:border-b", className)} {...props}>
        {children}
    </thead>
);

const TableBody = ({
    children,
    className,
    ...props
}: DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
>) => (
    <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props}>
        {children}
    </tbody>
);

const TableFooter = ({
    children,
    className,
    ...props
}: DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
>) => (
    <tfoot
        className={cn(
            "border-t bg-muted/50 font-medium last:[&>tr]:border-b-0",
            className
        )}
        {...props}
    >
        {children}
    </tfoot>
);

const TableRow = ({
    children,
    className,
    ...props
}: DetailedHTMLProps<
    HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
>) => (
    <tr
        className={cn(
            "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
            className
        )}
        {...props}
    >
        {children}
    </tr>
);

const TableHead = ({
    children,
    className,
    ...props
}: DetailedHTMLProps<
    ThHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
>) => (
    <th
        className={cn(
            "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
            className
        )}
        {...props}
    >
        {children}
    </th>
);

const TableCell = ({
    children,
    className,
    ...props
}: DetailedHTMLProps<
    TdHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
>) => (
    <td
        className={cn(
            "p-4 align-middle [&:has([role=checkbox])]:pr-0",
            className
        )}
        {...props}
    >
        {children}
    </td>
);

const TableCaption = ({
    children,
    className,
    ...props
}: DetailedHTMLProps<
    HTMLAttributes<HTMLTableCaptionElement>,
    HTMLTableCaptionElement
>) => (
    <caption
        className={cn("mt-4 text-sm text-muted-foreground", className)}
        {...props}
    >
        {children}
    </caption>
);

export {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
};
