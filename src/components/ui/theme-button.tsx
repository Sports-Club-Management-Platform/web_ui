import React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ThemeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function ThemeButton({
  children,
  className,
  ...props
}: ThemeButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "group relative inline-flex h-11 cursor-pointer items-center justify-center rounded-xl border-0 bg-[#121213] px-8 py-2 font-medium text-white transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",

        // before styles (glow effect)
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:bg-gradient-to-r before:from-primary/80 before:via-primary before:to-primary/80 before:[filter:blur(calc(0.8*1rem))]",

        // light mode colors
        "bg-[#121213]",

        // dark mode colors
        "dark:bg-[#121213]",

        // special mode colors
        "special:bg-[#121213] special:before:from-primary/60 special:before:via-primary special:before:to-primary/60",

        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}