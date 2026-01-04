"use client";

import { MinusIcon } from "@phosphor-icons/react/ssr";
import React, { type ComponentPropsWithoutRef } from "react";

const InputOTPSeparator = ({ ...props }: ComponentPropsWithoutRef<"div">) => (
    <div data-slot="input-otp-separator" role="separator" {...props}>
        <MinusIcon />
    </div>
);

export default InputOTPSeparator;
