import { cn } from "@/lib/utils"
import React from "react"
import { motion } from "framer-motion"

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
  animate?: boolean
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  }
  return (
    <div className={cn("relative p-[3px] group", containerClassName)}>
      {/* Glowing border effect */}
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,hsl(var(--primary)/0.9),transparent),radial-gradient(circle_farthest-side_at_100%_0,hsl(var(--primary)/0.7),transparent),radial-gradient(circle_farthest-side_at_100%_100%,hsl(var(--primary)/0.8),transparent),radial-gradient(circle_farthest-side_at_0_0,hsl(var(--primary)),transparent)]"
        )}
      />

      {/* Border gradient */}
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1]",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,hsl(var(--primary)/0.9),transparent),radial-gradient(circle_farthest-side_at_100%_0,hsl(var(--primary)/0.7),transparent),radial-gradient(circle_farthest-side_at_100%_100%,hsl(var(--primary)/0.8),transparent),radial-gradient(circle_farthest-side_at_0_0,hsl(var(--primary)),transparent)]"
        )}
      />

      {/* Content container with solid background */}
      <div
        className={cn(
          "relative z-10 rounded-[22px] bg-background/80 backdrop-blur-sm",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}