"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface MorphingTextProps {
  texts: string[]
  className?: string
  interval?: number
}

export function MorphingText({ texts, className, interval = 3000 }: MorphingTextProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length)
    }, interval)
    return () => clearInterval(timer)
  }, [texts.length, interval])

  return (
    <div className={cn("relative h-[1.2em] overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 40, opacity: 0, rotateX: -45 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -40, opacity: 0, rotateX: 45 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="absolute left-0 top-0"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

interface TypewriterProps {
  text: string
  className?: string
  speed?: number
  delay?: number
}

export function Typewriter({ text, className, speed = 50, delay = 0 }: TypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(timer)
        }
      }, speed)
      return () => clearInterval(timer)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, speed, delay])

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <span className={cn(className)}>
      {displayText}
      <span className={cn("ml-0.5", showCursor ? "opacity-100" : "opacity-0")}>|</span>
    </span>
  )
}

interface CountUpProps {
  end: number
  duration?: number
  className?: string
  suffix?: string
  prefix?: string
}

export function CountUp({ end, duration = 2, className, suffix = "", prefix = "" }: CountUpProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (hasAnimated) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true)
          const startTime = Date.now()
          const endTime = startTime + duration * 1000

          const updateCount = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / (duration * 1000), 1)
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            setCount(Math.floor(easeOutQuart * end))

            if (now < endTime) {
              requestAnimationFrame(updateCount)
            } else {
              setCount(end)
            }
          }
          requestAnimationFrame(updateCount)
        }
      },
      { threshold: 0.5 }
    )

    const element = document.getElementById(`countup-${end}`)
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <span id={`countup-${end}`} className={cn(className)}>
      {prefix}{count}{suffix}
    </span>
  )
}
