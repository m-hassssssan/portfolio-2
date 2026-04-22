"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
}

export function Marquee({ 
  children, 
  className, 
  speed = 30, 
  direction = "left",
  pauseOnHover = true 
}: MarqueeProps) {
  return (
    <div className={cn("group flex overflow-hidden", className)}>
      <motion.div
        className={cn(
          "flex shrink-0 gap-8",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        animate={{
          x: direction === "left" ? [0, "-50%"] : ["-50%", 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}

interface InfiniteTextProps {
  text: string
  className?: string
  speed?: number
}

export function InfiniteText({ text, className, speed = 20 }: InfiniteTextProps) {
  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <motion.div
        className="inline-block"
        animate={{ x: [0, "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="mx-8 inline-block">
            {text}
            <span className="mx-8 text-accent">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
