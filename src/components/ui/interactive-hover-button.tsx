import React from "react";
import { ArrowRight, LucideIcon } from 'lucide-react';
import { cn } from "@/lib/utils";

export type ButtonVariant = "default" | "primary" | "secondary" | "danger" | "ghost" | "underline";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: LucideIcon;
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  default: "text-primary",
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  underline: "underline-offset-4 hover:underline",
};

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", icon: Icon, className, variant = "default", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-32 cursor-pointer overflow-hidden rounded-full text-center font-semibold",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      <span className="inline-flex items-center justify-center gap-2 translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {Icon && <Icon className="w-4 h-4" />}
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowRight />
      </div>
      {!Icon && variant !== "ghost" && variant !== "underline" && (
        <div className={cn(
          "absolute left-[20%] top-[40%] h-2 w-2 scale-[1] rounded-lg transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8]",
          variant === "default" && "bg-primary",
          variant === "primary" && "bg-primary-foreground",
          variant === "secondary" && "bg-secondary-foreground",
          variant === "danger" && "bg-destructive-foreground",
        )}></div>
      )}
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export default InteractiveHoverButton;