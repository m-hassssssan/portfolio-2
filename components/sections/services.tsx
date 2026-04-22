"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { TextReveal } from "@/components/text-reveal"
import { FadeIn } from "@/components/staggered-fade"
import { Code2, Palette, Zap, Layers, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Building performant, scalable web applications with modern technologies and best practices.",
    features: ["Custom Web Apps", "API Development", "Database Design", "Performance Optimization"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating beautiful, intuitive interfaces that users love and that drive engagement.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    icon: Zap,
    title: "Motion Design",
    description: "Bringing interfaces to life with purposeful animations that enhance user experience.",
    features: ["Micro-interactions", "Page Transitions", "Loading States", "Scroll Animations"],
  },
  {
    icon: Layers,
    title: "Full-Stack Solutions",
    description: "End-to-end development from concept to deployment with ongoing support.",
    features: ["Architecture", "DevOps", "Cloud Services", "Maintenance"],
  },
]

export function ServicesSection() {
  return (
    <section className="relative py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-20 text-center">
          <FadeIn>
            <span className="mb-4 inline-block text-sm uppercase tracking-[0.3em] text-muted-foreground">
              What I Do
            </span>
          </FadeIn>
          <TextReveal className="justify-center text-4xl font-bold md:text-5xl lg:text-6xl">
            Services & Expertise
          </TextReveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const spotlightX = useSpring(mouseX, { stiffness: 500, damping: 50 })
  const spotlightY = useSpring(mouseY, { stiffness: 500, damping: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const Icon = service.icon

  return (
    <motion.div
      ref={cardRef}
      className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor-hover
      data-cursor-text="Explore"
    >
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${spotlightX}px ${spotlightY}px, hsl(var(--accent) / 0.15), transparent 40%)`,
        }}
      />

      {/* Border glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(200px circle at ${spotlightX}px ${spotlightY}px, hsl(var(--accent) / 0.4), transparent 40%)`,
          mask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="mb-6 inline-flex rounded-2xl bg-accent/10 p-4"
          animate={{ 
            rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="h-8 w-8 text-accent-foreground" />
        </motion.div>

        {/* Title */}
        <motion.h3
          className="mb-4 text-2xl font-bold"
          animate={{ x: isHovered ? 10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {service.title}
        </motion.h3>

        {/* Description */}
        <p className="mb-6 text-muted-foreground">{service.description}</p>

        {/* Features */}
        <ul className="mb-6 space-y-2">
          {service.features.map((feature, i) => (
            <motion.li
              key={feature}
              className="flex items-center gap-2 text-sm text-muted-foreground"
              initial={{ opacity: 0.7 }}
              animate={{ 
                opacity: isHovered ? 1 : 0.7,
                x: isHovered ? 10 : 0,
              }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-accent"
                animate={{ scale: isHovered ? 1.5 : 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              />
              {feature}
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <motion.button
          className="flex items-center gap-2 text-sm font-medium text-foreground"
          whileHover={{ x: 5 }}
        >
          Learn more
          <motion.span
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        </motion.button>
      </div>

      {/* Background number */}
      <motion.span
        className="absolute -bottom-8 -right-4 text-[200px] font-bold leading-none text-foreground/[0.02]"
        animate={{ 
          opacity: isHovered ? 0.05 : 0.02,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        0{index + 1}
      </motion.span>
    </motion.div>
  )
}
