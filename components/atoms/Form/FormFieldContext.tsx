import { createContext } from "react";

import type { FormFieldContextValue } from "@/types/components/forms/FormFieldContextValues";

const FormFieldContext = createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
);

export default FormFieldContext;
