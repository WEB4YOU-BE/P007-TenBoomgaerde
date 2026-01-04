"use client";

import { OTPInputContext } from "input-otp";
import React, { type ComponentPropsWithoutRef, useContext } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const InputOTPSlot = ({
    className,
    index,
    ...props
}: ComponentPropsWithoutRef<"div"> & { index: number }) => {
    const inputOTPContext = useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

    return (
        <div
            className={cn(
                "border-input ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-4 data-[active=true]:outline-1",
                className
            )}
            data-active={isActive}
            data-slot="input-otp-slot"
            {...props}
        >
            {char}
            {hasFakeCaret && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
                </div>
            )}
        </div>
    );
};

export default InputOTPSlot;
