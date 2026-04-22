"use client"

import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { FloatingElements, GridBackground, NoiseTexture } from "@/components/floating-elements"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { ProjectsSection } from "@/components/sections/projects"
import { ServicesSection } from "@/components/sections/services"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <GridBackground />
      <FloatingElements />
      <NoiseTexture />
      
      <Navigation />
      
      <main className="relative">
        <HeroSection />
        
        <section id="about">
          <AboutSection />
        </section>
        
        <section id="work">
          <ProjectsSection />
        </section>
        
        <section id="services">
          <ServicesSection />
        </section>
        
        <TestimonialsSection />
        
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      
      <Footer />
    </SmoothScrollProvider>
  )
}
