import useFormField from "@/hooks/use-form-field";
import { Slot } from "@radix-ui/react-slot";
import React, { type ComponentPropsWithoutRef } from "react";

const FormControl = ({ ...props }: ComponentPropsWithoutRef<typeof Slot>) => {
    const { error, formDescriptionId, formItemId, formMessageId } =
        useFormField();

    return (
        <Slot
            aria-describedby={
                !error
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            data-slot="form-control"
            id={formItemId}
            {...props}
        />
    );
};

export default FormControl;
