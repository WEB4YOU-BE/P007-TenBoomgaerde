import useFormField from "@/hooks/use-form-field";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import React, { type ComponentPropsWithoutRef } from "react";

const FormMessage = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"p">) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : props.children;

    if (!body) return null;

    return (
        <p
            className={cn("text-destructive text-sm font-medium", className)}
            data-slot="form-message"
            id={formMessageId}
            {...props}
        >
            {body}
        </p>
    );
};

export default FormMessage;
