'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#D4A574]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#E8E4DF] rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <Image
            src="/logo.png"
            alt="Spilled Palette Studio"
            width={150}
            height={150}
            className="mx-auto"
            priority
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#D4A574] text-sm uppercase tracking-[0.3em] mb-6"
        >
          Original Artwork by
        </motion.p>
        
        {/* Artist Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-6xl sm:text-7xl lg:text-8xl text-[#2C2C2C] leading-[1.05] mb-6"
        >
          Aswathi
          <br />
          <span className="italic text-[#D4A574]">Bindhu</span>
          <br />
          Jawahar
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[#2C2C2C]/60 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          Handcrafted digital paintings that transform your space into a sanctuary of color, calm, and creative energy.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
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
        </motion.div>
      </div>

      {/* Decorative paint splatters */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-1/4 left-10 w-32 h-32 bg-[#D4A574] rounded-full blur-2xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.7 }}
        className="absolute bottom-1/4 right-10 w-40 h-40 bg-[#2C2C2C] rounded-full blur-2xl"
      />
    </section>
  )
}
