import React, { type ComponentPropsWithoutRef } from "react";

import useFormField from "@/hooks/use-form-field";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

const FormDescription = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"p">) => {
    const { formDescriptionId } = useFormField();

    return (
        <p
            className={cn("text-muted-foreground text-sm", className)}
            data-slot="form-description"
            id={formDescriptionId}
            {...props}
        />
    );
};

export default FormDescription;
