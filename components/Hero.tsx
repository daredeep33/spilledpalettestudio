'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { artworks } from '@/data/artworks'

export default function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, -150])
  const y2 = useTransform(scrollY, [0, 1000], [0, 150])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Artwork Background Mosaic */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.06] flex gap-4 md:gap-8 justify-center items-center -rotate-[4deg] scale-[1.15]">
          {[0, 1, 2, 3].map((colIndex) => (
            <motion.div 
              key={colIndex} 
              style={{ y: colIndex % 2 === 0 ? y1 : y2 }}
              className={`flex flex-col gap-4 md:gap-8 ${colIndex % 2 === 0 ? '-mt-20' : 'mt-20'}`}
            >
              {artworks.slice(colIndex * 3, (colIndex + 1) * 3).map((artwork, idx) => (
                <motion.div 
                  key={artwork.id} 
                  whileHover={{ scale: 1.05, rotateZ: colIndex % 2 === 0 ? 2 : -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative w-40 h-56 sm:w-64 sm:h-80 rounded-xl overflow-hidden shadow-2xl shrink-0 bg-[#E8E4DF] cursor-crosshair"
                >
                  <Image
                    src={artwork.full}
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized
                    priority={colIndex < 2 && idx < 2}
                  />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
        {/* Gradient overlays to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/80 to-[#FDFBF7]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7] via-transparent to-transparent h-32" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7] via-transparent to-[#FDFBF7]" />
      </div>

      {/* Decorative paint splatters */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#D4A574]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#E8E4DF] rounded-full blur-3xl opacity-50" />
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
          className="font-serif text-6xl sm:text-7xl lg:text-8xl text-[#2C2C2C] leading-[1.05] mb-4"
        >
          Aswathi
          <br />
          Bindhu
          <br />
          Jawahar
        </motion.h1>

        {/* Secondary SEO Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-serif text-2xl sm:text-3xl text-[#D4A574] mb-6 italic"
        >
          Contemporary Botanical Artwork
        </motion.h2>

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
            className="inline-flex items-center justify-center border border-[#2C2C2C] text-[#2C2C2C] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#2C2C2C] hover:text-[#FDFBF7] transition-all duration-300"
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
