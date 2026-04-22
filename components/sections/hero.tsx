"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { TextReveal } from "@/components/text-reveal"
import { MorphingText } from "@/components/morphing-text"
import { MagneticButton } from "@/components/magnetic-button"
import { ParallaxSection } from "@/components/parallax-section"
import { FadeIn } from "@/components/staggered-fade"
import { ArrowDown, Sparkles } from "lucide-react"

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%23111' width='1920' height='1080'/%3E%3C/svg%3E"
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            type="video/mp4"
          />
        </video>
        {/* Video overlay for text readability */}
        <div className="absolute inset-0 bg-background/85 backdrop-blur-[2px]" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-accent/20 blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-muted/40 blur-[100px]"
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 max-w-5xl text-center"
      >
        <FadeIn delay={0.2}>
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground">Available for freelance work</span>
          </motion.div>
        </FadeIn>

        <TextReveal className="mb-4 justify-center text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          Creative Developer
        </TextReveal>

        <ParallaxSection speed={0.2}>
          <div className="mb-8 flex items-center justify-center gap-3 text-2xl font-medium text-muted-foreground sm:text-3xl md:text-4xl">
            <span>I craft</span>
            <MorphingText
              texts={["experiences", "interfaces", "products", "solutions"]}
              className="text-foreground"
            />
          </div>
        </ParallaxSection>

        <FadeIn delay={0.6} className="mb-12">
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-balance">
            Transforming complex ideas into elegant, user-centric digital experiences. 
            Specializing in interactive web applications with obsessive attention to detail.
          </p>
        </FadeIn>

        <FadeIn delay={0.8}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton
              className="bg-foreground text-background hover:bg-foreground/90"
              cursorText="Let's talk"
            >
              Get in Touch
            </MagneticButton>
            <MagneticButton
              className="border border-border bg-transparent text-foreground hover:bg-accent/10"
              cursorText="View work"
            >
              View Projects
            </MagneticButton>
          </div>
        </FadeIn>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
