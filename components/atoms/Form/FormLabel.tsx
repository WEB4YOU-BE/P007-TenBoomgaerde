import type { Root } from "@radix-ui/react-label";

import React, { type ComponentPropsWithoutRef } from "react";

import Label from "@/components/atoms/Label";
import useFormField from "@/hooks/use-form-field";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

const FormLabel = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Root>) => {
    const { error, formItemId } = useFormField();

    return (
        <Label
            className={cn("data-[error=true]:text-destructive", className)}
            data-error={!!error}
            data-slot="form-label"
            htmlFor={formItemId}
            {...props}
        />
    );
};

export default FormLabel;
