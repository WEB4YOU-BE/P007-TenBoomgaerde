import FormFieldContext from "@/components/atoms/Form/FormFieldContext";
import FormItemContext from "@/components/atoms/Form/FormItemContext";
import { useContext } from "react";
import { useFormContext, useFormState } from "react-hook-form";

const useFormField = () => {
    const fieldContext = useContext(FormFieldContext);
    const itemContext = useContext(FormItemContext);
    const { getFieldState } = useFormContext();
    const formState = useFormState({ name: fieldContext.name });
    const fieldState = getFieldState(fieldContext.name, formState);

    if (!fieldContext)
        throw new Error("useFormField should be used within <FormField>");

    const { id } = itemContext;

    return {
        formDescriptionId: `${id}-form-item-description`,
        formItemId: `${id}-form-item`,
        formMessageId: `${id}-form-item-message`,
        id,
        name: fieldContext.name,
        ...fieldState,
    };
};

export default useFormField;
