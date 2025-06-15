import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { Image } from "@radix-ui/react-avatar";
import React, { type ComponentPropsWithoutRef } from "react";

const AvatarImage = ({
    alt,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Image>) => (
    <Image
        alt={alt}
        className={cn("aspect-square size-full", className)}
        data-slot="avatar-image"
        {...props}
    />
);

export default AvatarImage;
