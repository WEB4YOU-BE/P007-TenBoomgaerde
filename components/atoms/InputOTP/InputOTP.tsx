"use client";

import { OTPInput } from "input-otp";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const InputOTP = ({
    className,
    containerClassName,
    ...props
}: ComponentPropsWithoutRef<typeof OTPInput> & {
    containerClassName?: string;
}) => (
    <OTPInput
        className={cn("disabled:cursor-not-allowed", className)}
        containerClassName={cn(
            "flex items-center gap-2 has-disabled:opacity-50",
            containerClassName
        )}
        data-slot="input-otp"
        {...props}
    />
);

export default InputOTP;
