'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { artworks, categories, type Artwork } from '../data/artworks'
import metadata from '../data/artwork-metadata.json'

interface GalleryProps {
  onInquire?: (artwork: Artwork) => void;
  limit?: number;
  showAllLink?: boolean;
}

function ArtworkCard({ artwork, onInquire, isMobile, priority = false }: { artwork: Artwork; onInquire?: (artwork: Artwork) => void; isMobile?: boolean; priority?: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isTapped, setIsTapped] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const artMeta = (metadata as any)[artwork.id]
  const displayTitle = artMeta?.displayTitle || artwork.title

  // On mobile, show artwork by default; tap to toggle 'in room' view
  const showArtwork = isMobile ? !isTapped : isHovered

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
    <Link href={`/gallery/${artwork.id}`} className="focus-visible:outline-none focus-[&>div]:ring-2 focus-[&>div]:ring-[#D4A574] focus-[&>div]:rounded-xl">
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ scale: 1.02, y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative mb-6 break-inside-avoid group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => isMobile && setIsTapped(!isTapped)}
      >
        <div
          className={`relative w-full rounded-xl overflow-hidden bg-[#E8E4DF] select-none transition-all duration-500 hover:shadow-[0_20px_40px_rgba(212,165,116,0.15)] ${!isLoaded ? 'animate-pulse' : 'shadow-xl'}`}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
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
              opacity: showArtwork ? 0 : 1
            }}
            transition={{ duration: 0.4 }}
            className="relative w-full"
          >
            <Image
              src={artwork.insituUrl}
              alt={`${displayTitle} in room setting`}
              width={400}
              height={300}
              className={`w-full h-auto object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              onLoad={() => setIsLoaded(true)}
              unoptimized
            />
          </motion.div>

          {/* Artwork Image - Hover/Tap View */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: showArtwork ? 1 : 0
            }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 top-0 left-0 w-full"
          >
            <Image
              src={artwork.thumb}
              alt={displayTitle}
              width={400}
              height={300}
              className={`w-full h-auto object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
          </motion.div>

          {/* Content - Dual shadow system for all backgrounds */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="absolute inset-x-4 bottom-4"
            style={{
              filter: 'contrast(3)',
            }}
          >
            <h3
              className="text-white font-serif text-lg mb-1"
              style={{
                textShadow: `
                  0 0 30px rgba(255,255,255,0.9),
                  0 0 60px rgba(255,255,255,0.6),
                  2px 2px 4px rgba(0,0,0,0.8),
                  4px 4px 8px rgba(0,0,0,0.6),
                  6px 6px 12px rgba(0,0,0,0.4)
                `
              }}
            >{displayTitle}</h3>
            <p
              className="text-white/90 text-sm capitalize"
              style={{
                textShadow: `
                  0 0 20px rgba(255,255,255,0.8),
                  0 0 40px rgba(255,255,255,0.5),
                  1px 1px 2px rgba(0,0,0,0.8),
                `
              }}
            >{artwork.category}</p>
            {isMobile && (
              <p className="text-white/90 text-xs mt-2 italic tracking-wide font-medium"
                style={{ textShadow: `1px 1px 2px rgba(0,0,0,0.8)` }}>
                ⤢ Tap to view {isTapped ? 'artwork' : 'in room'}
              </p>
            )}
          </motion.div>

          {/* Removed hover hint - tapping is innate behavior */}
        </div>
      </motion.div>
    </Link >
  )
}

export default function Gallery({ onInquire, limit, showAllLink }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Listen for mood filter events
  useMemo(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('filterCategory', (e: any) => {
        setActiveCategory(e.detail);
      });
    }
  }, []);

  // Use natural order so Artist's Picks are dispersed naturally throughout the gallery
  const sortedArtworks = useMemo(() => {
    return artworks
  }, [])

  const filteredArtworks = useMemo(() => {
    let result = activeCategory === 'all' ? sortedArtworks : sortedArtworks.filter((a) => a.category === activeCategory)
    // Apply limit if provided
    if (limit && limit > 0) {
      result = result.slice(0, limit)
    }
    return result
  }, [activeCategory, sortedArtworks, limit])

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
          <p className="text-[#555555] text-lg max-w-xl mx-auto">
            {artworks.length} original artworks, each with its own story
          </p>
          {artistPicksCount > 0 && (
            <p className="text-[#D4A574] text-sm mt-2">
              ★ {artistPicksCount} Artist's Pick{artistPicksCount > 1 ? 's' : ''} featured
            </p>
          )}
        </motion.div>

        {/* Horizontal scrolling filter strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex overflow-x-auto gap-2 mb-12 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center scrollbar-hide"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#D4A574] focus-visible:outline-none ${activeCategory === cat.id
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
            {filteredArtworks.map((artwork, idx) => (
              <ArtworkCard key={artwork.id} artwork={artwork} onInquire={onInquire} isMobile={isMobile} priority={idx < 6} />
            ))}
          </AnimatePresence>
        </div>

        {/* View All Link */}
        {showAllLink && limit && artworks.length > limit && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/gallery"
              className="inline-block bg-[#2C2C2C] text-[#FDFBF7] px-8 py-3 rounded-full text-sm font-medium hover:bg-[#D4A574] transition-colors duration-300"
            >
              View All {artworks.length} Artworks →
            </Link>
          </motion.div>
        )}

        <div className="text-center mt-12">
          <p className="text-[#666666] text-sm">
            Showing {filteredArtworks.length} of {artworks.length} artworks
          </p>
          <p className="text-[#777777] text-xs mt-2">
            Click any piece to see its story
          </p>
        </div>
      </div>
    </section>
  )
}
