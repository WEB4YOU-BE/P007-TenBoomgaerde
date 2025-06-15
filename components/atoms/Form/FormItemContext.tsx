import { createContext } from "react";

import { FormItemContextValue } from "@/types/components/forms/FormItemContextValue";

const FormItemContext = createContext<FormItemContextValue>(
    {} as FormItemContextValue
);

export default FormItemContext;
