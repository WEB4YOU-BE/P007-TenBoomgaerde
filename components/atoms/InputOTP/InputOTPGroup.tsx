"use client";

import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const InputOTPGroup = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"div">) => (
    <div
        className={cn("flex items-center", className)}
        data-slot="input-otp-group"
        {...props}
    />
);

export default InputOTPGroup;
