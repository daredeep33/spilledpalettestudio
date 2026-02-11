'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { artworks, categories, type Artwork } from '../data/artworks'

function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative aspect-[3/4] mb-4 break-inside-avoid"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-whisper group cursor-pointer">
        {/* Artwork Image - Use Cloudinary thumb for performance */}
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src={artwork.thumb}
            alt={artwork.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
        </motion.div>

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent"
        />

        {/* Content on Hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="absolute inset-x-4 bottom-4"
        >
          <h3 className="text-alabaster font-serif text-lg mb-2">{artwork.title}</h3>
          <p className="text-alabaster/70 text-sm mb-3 capitalize">{artwork.category}</p>
          <button className="w-full bg-alabaster text-charcoal py-2.5 rounded-full text-sm font-medium hover:bg-terracotta hover:text-white transition-colors">
            View Artwork
          </button>
        </motion.div>

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0 : 1 }}
          className="absolute top-3 left-3"
        >
          <span className="bg-alabaster/90 text-charcoal px-2.5 py-1 rounded-full text-xs font-medium capitalize">
            {artwork.category}
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function LivingGallery() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredArtworks = useMemo(() => {
    if (activeCategory === 'all') return artworks
    return artworks.filter((a) => a.category === activeCategory)
  }, [activeCategory])

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl sm:text-5xl text-charcoal mb-4">
            The <span className="italic">Living</span> Gallery
          </h2>
          <p className="text-charcoal/60 text-lg max-w-xl mx-auto">
            139 artworks, each with its own story
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-charcoal text-alabaster'
                  : 'bg-whisper text-charcoal hover:bg-terracotta hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </AnimatePresence>
        </div>

        {/* Stats */}
        <div className="text-center mt-12">
          <p className="text-charcoal/50 text-sm">
            Showing {filteredArtworks.length} of {artworks.length} artworks
          </p>
        </div>
      </div>
    </section>
  )
}
