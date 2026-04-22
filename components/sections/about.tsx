"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { TextReveal, CharacterReveal } from "@/components/text-reveal"
import { FadeIn, StaggeredFade } from "@/components/staggered-fade"
import { CountUp } from "@/components/morphing-text"
import { InfiniteText } from "@/components/marquee"

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
]

const skills = [
  "React", "Next.js", "TypeScript", "Node.js", 
  "Framer Motion", "Three.js", "Tailwind CSS", "Figma"
]

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section ref={ref} className="relative py-32">
      {/* Marquee background */}
      <div className="absolute top-20 -rotate-3 opacity-5">
        <InfiniteText 
          text="CREATIVE DEVELOPER" 
          className="text-[120px] font-bold" 
          speed={40}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="mb-20">
          <FadeIn>
            <span className="mb-4 inline-block text-sm uppercase tracking-[0.3em] text-muted-foreground">
              About Me
            </span>
          </FadeIn>
          <TextReveal className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            I build digital products that blend creativity with functionality
          </TextReveal>
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Image */}
          <motion.div
            style={{ scale: imageScale, opacity: imageOpacity }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted"
            data-cursor-hover
            data-cursor-text="That's me"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
            <motion.div 
              className="absolute inset-0 bg-[url('/placeholder-portrait.jpg')] bg-cover bg-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            {/* Floating badge */}
            <motion.div
              className="absolute -right-4 top-8 rounded-2xl bg-card p-4 shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-xl">🚀</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-semibold">Open to work</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <FadeIn delay={0.2}>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                With over 8 years of experience in crafting digital experiences, I specialize in 
                building high-performance web applications that delight users and drive results. 
                My approach combines technical excellence with creative problem-solving.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mb-12 text-lg leading-relaxed text-muted-foreground">
                I believe that great design is invisible – it just works. Every pixel, every 
                animation, every interaction is carefully considered to create seamless experiences 
                that feel natural and intuitive.
              </p>
            </FadeIn>

            {/* Skills */}
            <FadeIn delay={0.4}>
              <div className="mb-12">
                <h3 className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      className="rounded-full border border-border bg-card px-4 py-2 text-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: "hsl(var(--accent))",
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <FadeIn key={stat.label} delay={0.5 + i * 0.1}>
                  <div className="text-center">
                    <div className="text-3xl font-bold md:text-4xl">
                      <CountUp 
                        end={stat.value} 
                        suffix={stat.suffix} 
                        duration={2.5}
                      />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
