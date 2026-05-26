import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-4 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-5 [&>svg]:text-foreground [&>svg~*]:pl-8 transition-all duration-300",
  {
    variants: {
      variant: {
        // Standard branding
        default: "bg-ghalia-dark2/20 text-white/80 border-ghalia-gold/10",
        
        // Using your gold for "Warning" states (e.g., Low Cartridge)
        warning: 
          "bg-ghalia-gold/5 border-ghalia-gold/30 text-ghalia-gold-light shadow-[0_0_15px_rgba(184,150,62,0.05)] [&>svg]:text-ghalia-gold",
        
        // Using a deeper, sophisticated red for "Destructive" states
        destructive:
          "bg-[#2a0101]/40 border-destructive/30 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.05)] [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props} />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props} />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props} />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
