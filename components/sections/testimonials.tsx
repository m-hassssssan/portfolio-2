"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { TextReveal } from "@/components/text-reveal"
import { FadeIn } from "@/components/staggered-fade"
import { Marquee } from "@/components/marquee"
import { TiltCard } from "@/components/animated-card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    content: "Working with this developer was an absolute game-changer. The attention to detail and creative solutions exceeded our expectations.",
    author: "Sarah Johnson",
    role: "CEO, TechStart",
    avatar: "SJ",
    rating: 5,
  },
  {
    id: 2,
    content: "The animations and interactions brought our product to life. Our user engagement increased by 40% after the redesign.",
    author: "Michael Chen",
    role: "Product Lead, InnovateCo",
    avatar: "MC",
    rating: 5,
  },
  {
    id: 3,
    content: "Incredible technical skills combined with a genuine understanding of user experience. Highly recommend for any web project.",
    author: "Emily Davis",
    role: "Founder, DesignLab",
    avatar: "ED",
    rating: 5,
  },
  {
    id: 4,
    content: "The best developer I've ever worked with. Fast, communicative, and delivers outstanding results every single time.",
    author: "Alex Thompson",
    role: "CTO, ScaleUp Inc",
    avatar: "AT",
    rating: 5,
  },
  {
    id: 5,
    content: "Our conversion rate tripled after implementing the new design. The ROI on this project was phenomenal.",
    author: "Jessica Brown",
    role: "Marketing Director, GrowthHub",
    avatar: "JB",
    rating: 5,
  },
  {
    id: 6,
    content: "Not just a developer, but a true partner who cares about your success. The ongoing support has been invaluable.",
    author: "David Wilson",
    role: "Co-founder, NextGen Apps",
    avatar: "DW",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center">
          <FadeIn>
            <span className="mb-4 inline-block text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Testimonials
            </span>
          </FadeIn>
          <TextReveal className="justify-center text-4xl font-bold md:text-5xl lg:text-6xl">
            What Clients Say
          </TextReveal>
        </div>
      </div>

      {/* First row - scroll left */}
      <Marquee className="mb-6" speed={40} direction="left">
        {testimonials.slice(0, 3).map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </Marquee>

      {/* Second row - scroll right */}
      <Marquee speed={35} direction="right">
        {testimonials.slice(3).map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </Marquee>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <TiltCard className="w-[400px] shrink-0">
      <motion.div
        className="relative rounded-2xl border border-border bg-card p-6 h-full"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        data-cursor-hover
      >
        {/* Quote icon */}
        <Quote className="absolute right-6 top-6 h-8 w-8 text-accent/20" />

        {/* Rating */}
        <div className="mb-4 flex gap-1">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <p className="mb-6 text-muted-foreground leading-relaxed">
          &ldquo;{testimonial.content}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 font-medium text-accent-foreground"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {testimonial.avatar}
          </motion.div>
          <div>
            <p className="font-semibold">{testimonial.author}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  )
}
