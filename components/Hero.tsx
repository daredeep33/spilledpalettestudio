'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Featured Image with Breathing Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-whisper"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0"
            >
              <Image
                src="/images/hero-featured.jpg"
                alt="Featured artwork"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            
            {/* Texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent" />
          </motion.div>

          {/* Right: Content */}
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-terracotta text-sm uppercase tracking-[0.25em] mb-6"
            >
              Spilled Palette Studio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl text-charcoal leading-[1.1] mb-8"
            >
              Art for the
              <br />
              <span className="italic">Rhythm</span> of
              <br />
              Your Life
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-charcoal/60 text-lg leading-relaxed mb-10 max-w-md mx-auto lg:mx-0"
            >
              Handcrafted digital paintings that transform your space into a sanctuary of color and calm.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#gallery"
                className="inline-flex items-center justify-center bg-charcoal text-alabaster px-8 py-4 rounded-full text-sm font-medium hover:bg-terracotta transition-all duration-300 hover:scale-105"
              >
                Shop New Arrivals
              </a>
              <a
                href="#moods"
                className="inline-flex items-center justify-center border-2 border-charcoal text-charcoal px-8 py-4 rounded-full text-sm font-medium hover:bg-charcoal hover:text-alabaster transition-all duration-300"
              >
                Explore by Mood
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
