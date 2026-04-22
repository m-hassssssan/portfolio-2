"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  )

  const backdropBlur = useTransform(scrollY, [0, 100], [0, 12])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-8"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <motion.nav
          className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-transparent px-6 py-3 transition-colors"
          style={{
            backgroundColor: isScrolled ? "hsl(var(--background) / 0.8)" : "transparent",
            backdropFilter: isScrolled ? "blur(12px)" : "none",
            borderColor: isScrolled ? "hsl(var(--border))" : "transparent",
          }}
        >
          {/* Logo */}
          <motion.a
            href="#"
            className="text-xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-hover
          >
            Portfolio<span className="text-accent">.</span>
          </motion.a>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <NavLink href={item.href}>{item.label}</NavLink>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
          <motion.a
            href="#contact"
            className="hidden rounded-full bg-foreground px-6 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90 md:block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-hover
            data-cursor-text="Let's talk"
          >
            Let&apos;s Talk
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </motion.nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background md:hidden"
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="flex h-full flex-col items-center justify-center">
              <ul className="space-y-8 text-center">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <a
                      href={item.href}
                      className="text-4xl font-bold transition-colors hover:text-muted-foreground"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      data-cursor-hover
    >
      {children}
      <motion.span
        className="absolute -bottom-1 left-0 h-0.5 w-0 bg-foreground transition-all group-hover:w-full"
        layoutId="navUnderline"
      />
    </motion.a>
  )
}
