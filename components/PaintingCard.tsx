'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface PaintingCardProps {
  id: string
  title: string
  originalSrc: string
  insituSrc: string
  mood: string
  aspectRatio: string
}

export default function PaintingCard({
  title,
  originalSrc,
  insituSrc,
  mood,
  aspectRatio,
}: PaintingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className="relative w-full cursor-pointer group"
      style={{ aspectRatio }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front: Original Painting */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={originalSrc}
            alt={title}
            className="w-full h-full object-cover rounded-sm"
            loading="lazy"
          />
          {/* Mood Tag */}
          <div className="absolute bottom-3 left-3 bg-alabaster/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-charcoal uppercase tracking-wider">
              {mood}
            </span>
          </div>
        </div>

        {/* Back: In Situ */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <img
            src={insituSrc}
            alt={`${title} in room`}
            className="w-full h-full object-cover rounded-sm"
            loading="lazy"
          />
          {/* CTA on Hover */}
          <div className="absolute inset-0 bg-charcoal/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-terracotta text-white px-4 py-2 rounded-full text-sm font-medium">
              View Details
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
