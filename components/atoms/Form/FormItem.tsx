import FormItemContext from "@/components/atoms/Form/FormItemContext";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import React, { type ComponentPropsWithoutRef, useId } from "react";

const FormItem = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => {
    const id = useId();

    return (
        <FormItemContext.Provider value={{ id }}>
            <div
                className={cn("grid gap-2", className)}
                data-slot="form-item"
                {...props}
            />
        </FormItemContext.Provider>
    );
};

export default FormItem;
