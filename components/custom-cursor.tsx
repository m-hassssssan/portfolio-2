"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorText, setCursorText] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const trailX = useMotionValue(-100)
  const trailY = useMotionValue(-100)
  const trailSpringConfig = { damping: 35, stiffness: 200 }
  const trailXSpring = useSpring(trailX, trailSpringConfig)
  const trailYSpring = useSpring(trailY, trailSpringConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      trailX.set(e.clientX)
      trailY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("[data-cursor-hover]")) {
        setIsHovering(true)
        const text = target.closest("[data-cursor-hover]")?.getAttribute("data-cursor-text")
        if (text) setCursorText(text)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("[data-cursor-hover]")) {
        setIsHovering(false)
        setCursorText("")
      }
    }

    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseover", handleMouseOver)
    window.addEventListener("mouseout", handleMouseOut)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mouseout", handleMouseOut)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [cursorX, cursorY, trailX, trailY])

  return (
    <>
      {/* Trail cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-accent/30"
          animate={{
            width: isHovering ? 80 : 40,
            height: isHovering ? 80 : 40,
            opacity: isVisible ? 0.4 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-foreground flex items-center justify-center overflow-hidden"
          animate={{
            width: isHovering ? 100 : isClicking ? 8 : 12,
            height: isHovering ? 100 : isClicking ? 8 : 12,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 400 }}
        >
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-background text-xs font-medium whitespace-nowrap"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Particle trail */}
      <ParticleTrail cursorX={cursorX} cursorY={cursorY} isVisible={isVisible} />
    </>
  )
}

function ParticleTrail({ cursorX, cursorY, isVisible }: { cursorX: ReturnType<typeof useMotionValue<number>>, cursorY: ReturnType<typeof useMotionValue<number>>, isVisible: boolean }) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([])
  const particleId = useRef(0)

  useEffect(() => {
    let lastTime = 0
    const interval = 50

    const unsubscribeX = cursorX.on("change", (x) => {
      const now = Date.now()
      if (now - lastTime > interval && isVisible) {
        lastTime = now
        const y = cursorY.get()
        const id = particleId.current++
        setParticles((prev) => [...prev.slice(-10), { id, x, y }])
        
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== id))
        }, 600)
      }
    })

    return () => unsubscribeX()
  }, [cursorX, cursorY, isVisible])

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="pointer-events-none fixed z-[9997] h-2 w-2 rounded-full bg-accent hidden md:block"
          initial={{ 
            x: particle.x - 4, 
            y: particle.y - 4, 
            opacity: 0.8, 
            scale: 1 
          }}
          animate={{ 
            opacity: 0, 
            scale: 0,
            y: particle.y + 20,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </>
  )
}
