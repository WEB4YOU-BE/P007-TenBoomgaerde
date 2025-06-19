import { cva, type VariantProps } from "class-variance-authority";

type AlertVariantProps = VariantProps<AlertVariants>;
type AlertVariants = typeof alertVariants;
const alertVariants = cva(
    "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
    {
        defaultVariants: { variant: "default" },
        variants: {
            variant: {
                default: "bg-background text-foreground",
                destructive:
                    "border-destructive/50 text-destructive dark:text-destructive-foreground/80 dark:border-destructive [&>svg]:text-current dark:bg-destructive/50",
            },
        },
    }
);

export type { AlertVariantProps, AlertVariants };
export default alertVariants;
