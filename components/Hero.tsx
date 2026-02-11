'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Artist Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <p className="text-[#D4A574] text-sm uppercase tracking-[0.2em] mb-4">
              Original Artwork
            </p>
            
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[#2C2C2C] leading-[1.1] mb-6">
              Aswathi
              <br />
              <span className="italic text-[#D4A574]">Bindhu</span>
              <br />
              Jawahar
            </h1>

            <p className="text-[#2C2C2C]/60 text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
              Handcrafted digital paintings that transform your space into a sanctuary of color, calm, and creative energy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#gallery"
                className="inline-flex items-center justify-center bg-[#2C2C2C] text-[#FDFBF7] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#D4A574] transition-all duration-300"
              >
                View Collection
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center border-2 border-[#2C2C2C] text-[#2C2C2C] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#2C2C2C] hover:text-[#FDFBF7] transition-all duration-300"
              >
                Meet the Artist
              </a>
            </div>
          </motion.div>

          {/* Right: Featured Artwork */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#E8E4DF] order-1 lg:order-2"
          >
            <Image
              src="/images/hero-generated.jpg"
              alt="Abstract botanical artwork - Spilled Palette Studio"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C]/30 via-transparent to-transparent" />
            
            {/* Artwork Label */}
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white text-sm font-medium">Willow Tree Landscape</p>
              <p className="text-white/70 text-xs">The Sanctuary Series</p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex justify-center mt-16"
        >
          <a href="#gallery" className="flex flex-col items-center text-[#2C2C2C]/50 hover:text-[#D4A574] transition-colors">
            <span className="text-xs uppercase tracking-wider mb-2">Explore</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
