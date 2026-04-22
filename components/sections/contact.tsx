"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useRef, useState } from "react"
import { TextReveal, CharacterReveal } from "@/components/text-reveal"
import { FadeIn } from "@/components/staggered-fade"
import { MagneticButton } from "@/components/magnetic-button"
import { Mail, MapPin, Phone, Send, Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section className="relative py-32">
      <div className="container mx-auto px-4">
        <div className="mb-20 text-center">
          <FadeIn>
            <span className="mb-4 inline-block text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Get in Touch
            </span>
          </FadeIn>
          <TextReveal className="justify-center text-4xl font-bold md:text-5xl lg:text-6xl">
            Let&apos;s Work Together
          </TextReveal>
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Contact Info */}
          <div>
            <FadeIn>
              <p className="mb-12 text-lg text-muted-foreground">
                Have a project in mind? I&apos;d love to hear about it. Send me a message and 
                let&apos;s create something amazing together.
              </p>
            </FadeIn>

            <div className="mb-12 space-y-6">
              <ContactItem
                icon={Mail}
                label="Email"
                value="hello@example.com"
                href="mailto:hello@example.com"
                delay={0.1}
              />
              <ContactItem
                icon={Phone}
                label="Phone"
                value="+1 (555) 123-4567"
                href="tel:+15551234567"
                delay={0.2}
              />
              <ContactItem
                icon={MapPin}
                label="Location"
                value="San Francisco, CA"
                delay={0.3}
              />
            </div>

            {/* Social Links */}
            <FadeIn delay={0.4}>
              <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-accent/10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    data-cursor-hover
                    data-cursor-text={social.label}
                  >
                    <social.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  </motion.a>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Contact Form */}
          <FadeIn delay={0.2}>
            <motion.form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-card p-8 md:p-10"
              whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="mb-6">
                <AnimatedInput
                  label="Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="mb-6">
                <AnimatedInput
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="mb-8">
                <AnimatedTextarea
                  label="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <MagneticButton
                className="w-full bg-foreground text-background"
                cursorText="Send"
                onClick={() => {}}
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <motion.div
                      className="h-5 w-5 rounded-full border-2 border-background border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </span>
              </MagneticButton>
            </motion.form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
  delay,
}: {
  icon: typeof Mail
  label: string
  value: string
  href?: string
  delay: number
}) {
  const content = (
    <motion.div
      className="group flex items-center gap-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      data-cursor-hover
    >
      <motion.div
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <Icon className="h-5 w-5" />
      </motion.div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium group-hover:text-accent-foreground transition-colors">
          {value}
        </p>
      </div>
      {href && (
        <ArrowUpRight className="ml-auto h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </motion.div>
  )

  if (href) {
    return <a href={href}>{content}</a>
  }
  return content
}

function AnimatedInput({
  label,
  type,
  value,
  onChange,
  required,
}: {
  label: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative">
      <motion.label
        className="absolute left-4 text-muted-foreground pointer-events-none"
        animate={{
          top: isFocused || value ? 8 : "50%",
          fontSize: isFocused || value ? "12px" : "16px",
          y: isFocused || value ? 0 : "-50%",
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className="w-full rounded-xl border border-border bg-background px-4 pb-3 pt-7 outline-none transition-colors focus:border-foreground"
      />
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-foreground"
        initial={{ width: 0 }}
        animate={{ width: isFocused ? "100%" : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}

function AnimatedTextarea({
  label,
  value,
  onChange,
  required,
}: {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
}) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative">
      <motion.label
        className="absolute left-4 text-muted-foreground pointer-events-none"
        animate={{
          top: isFocused || value ? 8 : 24,
          fontSize: isFocused || value ? "12px" : "16px",
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      <textarea
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        rows={4}
        className="w-full resize-none rounded-xl border border-border bg-background px-4 pb-3 pt-7 outline-none transition-colors focus:border-foreground"
      />
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-foreground"
        initial={{ width: 0 }}
        animate={{ width: isFocused ? "100%" : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}
