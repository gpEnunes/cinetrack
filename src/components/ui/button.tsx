import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import React from "react"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            variant: {
                default: "bg-rose-600 hover:bg-rose-500 text-white",
                secondary: "bg-white/10 hover:bg-white/20 text-white",
                outline:
                    "border border-white/20 hover:border-white/40 text-white",
                ghost: "hover:bg-white/10 text-white/70 hover:text-white",
            },
            size: {
                sm: "h-8 px-3 text-xs",
                default: "h-10 px-4",
                lg: "h-12 px-6 text-base",
                icon: "size-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

function Button({
    className,
    variant = "default",
    size = "default",
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants>) {
    return (
        <button
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    )
}

export { Button, buttonVariants }
