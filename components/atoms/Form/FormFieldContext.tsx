import type { FormFieldContextValue } from "@/types/components/forms/FormFieldContextValues";

import { createContext } from "react";

const FormFieldContext = createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
);

export default FormFieldContext;
