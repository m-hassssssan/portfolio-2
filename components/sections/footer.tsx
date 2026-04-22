"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/staggered-fade"
import { InfiniteText } from "@/components/marquee"
import { ArrowUp } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative border-t border-border bg-muted/30 pt-20">
      {/* Large text marquee */}
      <div className="overflow-hidden py-8">
        <InfiniteText
          text="LET'S CREATE SOMETHING AMAZING"
          className="text-[80px] font-bold opacity-5 md:text-[120px]"
          speed={50}
        />
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo/Name */}
          <FadeIn>
            <motion.div
              className="text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              Portfolio<span className="text-accent">.</span>
            </motion.div>
          </FadeIn>

          {/* Copyright */}
          <FadeIn delay={0.1}>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved. Built with ❤️
            </p>
          </FadeIn>

          {/* Back to top */}
          <FadeIn delay={0.2}>
            <motion.button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              whileHover={{ y: -2 }}
              data-cursor-hover
              data-cursor-text="Top"
            >
              Back to top
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowUp className="h-4 w-4" />
              </motion.div>
            </motion.button>
          </FadeIn>
        </div>
      </div>
    </footer>
  )
}
