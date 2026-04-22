"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { TextReveal } from "@/components/text-reveal"
import { FadeIn } from "@/components/staggered-fade"
import { AnimatedCard } from "@/components/animated-card"
import { ArrowUpRight, Github, ExternalLink } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce experience with seamless animations and real-time inventory management.",
    tags: ["Next.js", "Stripe", "Prisma"],
    color: "from-blue-500/20 to-cyan-500/20",
    image: "/project-1.jpg",
  },
  {
    id: 2,
    title: "AI Dashboard",
    description: "Analytics platform powered by machine learning with intuitive data visualizations.",
    tags: ["React", "Python", "TensorFlow"],
    color: "from-purple-500/20 to-pink-500/20",
    image: "/project-2.jpg",
  },
  {
    id: 3,
    title: "Social Network",
    description: "Real-time social platform with live messaging, stories, and community features.",
    tags: ["Next.js", "Socket.io", "Redis"],
    color: "from-orange-500/20 to-red-500/20",
    image: "/project-3.jpg",
  },
  {
    id: 4,
    title: "Creative Portfolio",
    description: "Award-winning portfolio website with cutting-edge animations and interactions.",
    tags: ["React", "Three.js", "GSAP"],
    color: "from-green-500/20 to-teal-500/20",
    image: "/project-4.jpg",
  },
]

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <section ref={ref} className="relative py-32">
      <div className="container mx-auto px-4">
        <div className="mb-20 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <FadeIn>
              <span className="mb-4 inline-block text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Selected Work
              </span>
            </FadeIn>
            <TextReveal className="text-4xl font-bold md:text-5xl lg:text-6xl">
              Featured Projects
            </TextReveal>
          </div>
          <FadeIn delay={0.3}>
            <motion.a
              href="#"
              className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              whileHover={{ x: 5 }}
            >
              View all projects
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </motion.a>
          </FadeIn>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rotate = useTransform(scrollYProgress, [0, 1], [5, -5])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <AnimatedCard
        className="group h-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${project.color}`}
            style={{ y, rotate }}
          />
          <motion.div
            className="absolute inset-0 bg-muted"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Action buttons */}
          <motion.div
            className="absolute right-4 top-4 flex gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="rounded-full bg-background/80 p-2 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="h-4 w-4" />
            </motion.button>
            <motion.button
              className="rounded-full bg-background/80 p-2 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="h-4 w-4" />
            </motion.button>
          </motion.div>

          {/* Project number */}
          <motion.span
            className="absolute bottom-4 left-4 text-7xl font-bold text-foreground/10"
            animate={{ 
              x: isHovered ? 10 : 0,
              opacity: isHovered ? 0.2 : 0.1,
            }}
            transition={{ duration: 0.3 }}
          >
            0{index + 1}
          </motion.span>
        </div>

        {/* Content */}
        <div className="p-6">
          <motion.h3
            className="mb-2 text-2xl font-bold"
            animate={{ x: isHovered ? 10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>
          <p className="mb-4 text-muted-foreground">{project.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </AnimatedCard>
    </motion.div>
  )
}
