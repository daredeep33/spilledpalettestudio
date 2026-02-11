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
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#E8E4DF] group cursor-pointer">
        {/* In-Situ Image - Default View */}
        <motion.div
          animate={{ 
            opacity: isHovered ? 0 : 1,
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <Image
            src={artwork.insituUrl}
            alt={`${artwork.title} in room setting`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
        </motion.div>

        {/* Artwork Image - Hover View */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
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
          className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C]/80 via-transparent to-transparent"
        />

        {/* Content - Always Visible */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="absolute inset-x-4 bottom-4"
        >
          <h3 className="text-[#FDFBF7] font-serif text-lg mb-1 drop-shadow-lg">{artwork.title}</h3>
          <p className="text-[#FDFBF7]/80 text-sm mb-2 capitalize drop-shadow">{artwork.category}</p>
          <p className="text-[#D4A574] font-medium">${artwork.price}</p>
        </motion.div>

        {/* Hover Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 right-4 bg-[#FDFBF7]/90 backdrop-blur-sm px-3 py-1.5 rounded-full"
        >
          <span className="text-[#2C2C2C] text-xs font-medium">Hover to see artwork</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredArtworks = useMemo(() => {
    if (activeCategory === 'all') return artworks
    return artworks.filter((a) => a.category === activeCategory)
  }, [activeCategory])

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl sm:text-5xl text-[#2C2C2C] mb-4">
            The <span className="italic">Collection</span>
          </h2>
          <p className="text-[#2C2C2C]/60 text-lg max-w-xl mx-auto">
            {artworks.length} original artworks, each with its own story
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
                  ? 'bg-[#2C2C2C] text-[#FDFBF7]'
                  : 'bg-[#E8E4DF] text-[#2C2C2C] hover:bg-[#D4A574] hover:text-white'
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
          <p className="text-[#2C2C2C]/50 text-sm">
            Showing {filteredArtworks.length} of {artworks.length} artworks
          </p>
        </div>
      </div>
    </section>
  )
}
