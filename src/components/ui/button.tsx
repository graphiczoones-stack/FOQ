"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// Define variants using a simple object or class strings since we aren't using cva yet
// (Adding cva would be good, but we can do without for now to keep it simple or stick to manual cn)

export interface ButtonProps extends HTMLMotionProps<"button"> {
    asChild?: boolean;
    variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", asChild = false, children, ...props }, ref) => {
        // Base styles
        const baseStyles = "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

        // Variant styles
        const variants = {
            primary: "bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:scale-105 active:scale-95",
            secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:scale-105 active:scale-95",
            outline: "border border-input bg-background/50 backdrop-blur-sm shadow-sm hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95",
            ghost: "hover:bg-accent hover:text-accent-foreground active:scale-95",
            link: "text-primary underline-offset-4 hover:underline",
        };

        // Size styles
        const sizes = {
            default: "h-11 px-6 py-2", // Taller premium buttons
            sm: "h-9 rounded-full px-4 text-xs",
            lg: "h-14 rounded-full px-10 text-lg",
            icon: "h-9 w-9",
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Comp = (asChild ? Slot : motion.button) as any;

        return (
            <Comp
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...(!asChild ? {
                    whileTap: { scale: 0.95 },
                    whileHover: { scale: 1.02 }
                } : {})}
                {...props}
            >
                {children}
            </Comp>
        );
    }
);
Button.displayName = "Button";

export { Button };
