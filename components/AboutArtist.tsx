'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutArtist() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#2C2C2C] text-[#FDFBF7]">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Artist Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#E8E4DF]"
          >
            <Image
              src="/images/aswathi.jpg"
              alt="Aswathi Bindhu Jawahar - Artist"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Right: About Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#D4A574] text-sm uppercase tracking-[0.2em] mb-4">
              About the Artist
            </p>

            <h2 className="font-serif text-4xl sm:text-5xl mb-6 text-[#D4A574]">
              Aswathi Bindhu Jawahar
            </h2>

            <div className="space-y-4 text-[#FDFBF7]/80 leading-relaxed">
              <p>
                Welcome to Spilled Palette Studio, where digital art meets timeless elegance.
                I create handcrafted digital paintings designed to transform your space into
                a sanctuary of color, calm, and creative energy.
              </p>

              {/* Read more link */}
              <Link
                href="/about"
                className="inline-block mt-4 text-[#D4A574] border-b border-[#D4A574] pb-1 text-sm hover:text-[#FDFBF7] hover:border-[#FDFBF7] transition-all"
              >
                Read my full story &rarr;
              </Link>
            </div>

            {/* Stats - stacked vertically on mobile, horizontal on desktop */}
            <div className="mt-10 flex flex-col sm:flex-row gap-6 sm:gap-12">
              <div className="text-center sm:text-left">
                <p className="text-4xl sm:text-5xl font-serif text-[#D4A574]">100+</p>
                <p className="text-sm text-[#FDFBF7]/60">Original Artworks</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-4xl sm:text-5xl font-serif text-[#D4A574]">9</p>
                <p className="text-sm text-[#FDFBF7]/60">Collections</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
