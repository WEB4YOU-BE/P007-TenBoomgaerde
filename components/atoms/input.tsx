import { cn } from "@/utils/tailwindcss/mergeClassNames";
import React, { type DetailedHTMLProps, type InputHTMLAttributes } from "react";

type InputProps = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;
const Input = ({ className, type, ...props }: InputProps) => (
    <input
        className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}
        type={type}
        {...props}
    />
);

export { Input };
