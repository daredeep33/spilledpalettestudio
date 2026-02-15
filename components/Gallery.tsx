'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { artworks, categories, type Artwork } from '../data/artworks'
import metadata from '../data/artwork-metadata.json'

interface GalleryProps {
  onInquire?: (artwork: Artwork) => void;
}

function ArtworkCard({ artwork, onInquire }: { artwork: Artwork; onInquire?: (artwork: Artwork) => void }) {
  const [isHovered, setIsHovered] = useState(false)
  const artMeta = (metadata as any)[artwork.id]
  const displayTitle = artMeta?.displayTitle || artwork.title

  const handleInquire = () => {
    if (onInquire) {
      onInquire(artwork)
    } else {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
        sessionStorage.setItem('inquiryArtwork', displayTitle)
      }
    }
  }

  return (
    <Link href={`/gallery/${artwork.id}`}>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative mb-6 break-inside-avoid group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="relative w-full rounded-xl overflow-hidden bg-[#E8E4DF]"
        >
          {/* Artist's Pick Badge */}
          {artwork.artistPick && (
            <div className="absolute top-3 left-3 z-20 bg-[#D4A574] text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
              ★ Artist's Pick
            </div>
          )}

          {/* In-Situ Image - Default View */}
          <motion.div
            animate={{ 
              opacity: isHovered ? 0 : 1
            }}
            transition={{ duration: 0.4 }}
            className="relative w-full"
          >
            <Image
              src={artwork.insituUrl}
              alt={`${displayTitle} in room setting`}
              width={400}
              height={300}
              className="w-full h-auto object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
          </motion.div>

          {/* Artwork Image - Hover View */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 top-0 left-0 w-full"
          >
            <Image
              src={artwork.thumb}
              alt={displayTitle}
              width={400}
              height={300}
              className="w-full h-auto object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
          </motion.div>

          {/* Content - No overlay, just text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="absolute inset-x-4 bottom-4"
          >
            <h3 className="text-[#FDFBF7] font-serif text-lg mb-1 drop-shadow-md">{displayTitle}</h3>
            <p className="text-[#FDFBF7]/80 text-sm capitalize drop-shadow-sm">{artwork.category}</p>
          </motion.div>

          {/* Hover Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute top-3 right-3 bg-[#FDFBF7]/90 backdrop-blur-sm px-3 py-1.5 rounded-full"
          >
            <span className="text-[#2C2C2C] text-xs font-medium">Hover to see artwork</span>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  )
}

export default function Gallery({ onInquire }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  // Listen for mood filter events
  useMemo(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('filterCategory', (e: any) => {
        setActiveCategory(e.detail);
      });
    }
  }, []);

  // Sort: Artist's Picks first, then all others
  const sortedArtworks = useMemo(() => {
    const picks = artworks.filter(a => a.artistPick)
    const others = artworks.filter(a => !a.artistPick)
    return [...picks, ...others]
  }, [])

  const filteredArtworks = useMemo(() => {
    if (activeCategory === 'all') return sortedArtworks
    return sortedArtworks.filter((a) => a.category === activeCategory)
  }, [activeCategory, sortedArtworks])

  const artistPicksCount = artworks.filter(a => a.artistPick).length

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto">
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
          {artistPicksCount > 0 && (
            <p className="text-[#D4A574] text-sm mt-2">
              ★ {artistPicksCount} Artist's Pick{artistPicksCount > 1 ? 's' : ''} featured
            </p>
          )}
        </motion.div>

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

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6" style={{ columnFill: 'balance' }}>
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} onInquire={onInquire} />
            ))}
          </AnimatePresence>
        </div>

        <div className="text-center mt-12">
          <p className="text-[#2C2C2C]/50 text-sm">
            Showing {filteredArtworks.length} of {artworks.length} artworks
          </p>
          <p className="text-[#2C2C2C]/40 text-xs mt-2">
            Click any piece to see its story
          </p>
        </div>
      </div>
    </section>
  )
}
