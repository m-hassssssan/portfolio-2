"use client"

import { motion, useInView, useAnimation } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  staggerChildren?: number
}

export function TextReveal({ children, className, delay = 0, staggerChildren = 0.03 }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const words = children.split(" ")

  return (
    <motion.div
      ref={ref}
      className={cn("flex flex-wrap", className)}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="mr-[0.25em] overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%", rotateX: -90 },
              visible: {
                y: 0,
                rotateX: 0,
                transition: {
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  )
}

interface CharacterRevealProps {
  children: string
  className?: string
  delay?: number
}

export function CharacterReveal({ children, className, delay = 0 }: CharacterRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const characters = children.split("")

  return (
    <motion.div
      ref={ref}
      className={cn("inline-flex flex-wrap", className)}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.02,
            delayChildren: delay,
          },
        },
      }}
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          className={char === " " ? "w-[0.25em]" : ""}
          variants={{
            hidden: { 
              opacity: 0, 
              y: 50,
              rotate: Math.random() * 40 - 20,
            },
            visible: {
              opacity: 1,
              y: 0,
              rotate: 0,
              transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
              },
            },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  )
}

interface ScrambleTextProps {
  children: string
  className?: string
}

export function ScrambleText({ children, className }: ScrambleTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const controls = useAnimation()
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?"

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      className={cn("inline-flex", className)}
      initial="hidden"
      animate={controls}
    >
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          className={char === " " ? "w-[0.25em]" : ""}
          variants={{
            hidden: { 
              opacity: 0,
            },
            visible: {
              opacity: 1,
              transition: {
                delay: i * 0.05,
              },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <ScrambleChar char={char} delay={i * 0.05} isInView={isInView} chars={chars} />
        </motion.span>
      ))}
    </motion.div>
  )
}

function ScrambleChar({ char, delay, isInView, chars }: { char: string; delay: number; isInView: boolean; chars: string }) {
  const [displayChar, setDisplayChar] = useState(char)
  
  useEffect(() => {
    if (!isInView || char === " ") return
    
    let iterations = 0
    const maxIterations = 10
    const interval = setInterval(() => {
      if (iterations >= maxIterations) {
        setDisplayChar(char)
        clearInterval(interval)
        return
      }
      setDisplayChar(chars[Math.floor(Math.random() * chars.length)])
      iterations++
    }, 50)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setDisplayChar(char)
    }, delay * 1000 + maxIterations * 50)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [char, delay, isInView, chars])

  return <>{displayChar}</>
}


