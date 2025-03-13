import { FormItemContextValue } from "@/types/components/forms/FormItemContextValue";
import { createContext } from "react";

const FormItemContext = createContext<FormItemContextValue>(
    {} as FormItemContextValue
);

export default FormItemContext;
