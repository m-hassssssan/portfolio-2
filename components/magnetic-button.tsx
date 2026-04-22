"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  cursorText?: string
  onClick?: () => void
}

export function MagneticButton({ children, className, cursorText, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current!.getBoundingClientRect()
    const x = (clientX - left - width / 2) * 0.35
    const y = (clientY - top - height / 2) * 0.35
    setPosition({ x, y })
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-full px-8 py-4 font-medium transition-colors",
        className
      )}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      data-cursor-hover
      data-cursor-text={cursorText}
    >
      <motion.span
        className="relative z-10 flex items-center gap-2"
        animate={{ x: position.x * 0.1, y: position.y * 0.1 }}
        transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      >
        {children}
      </motion.span>
      <motion.div
        className="absolute inset-0 -z-10 bg-foreground"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}
