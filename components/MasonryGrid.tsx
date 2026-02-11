'use client'

import { useState, useMemo } from 'react'
import PaintingCard from './PaintingCard'

interface Painting {
  id: string
  title: string
  originalSrc: string
  insituSrc: string
  mood: 'sanctuary' | 'play' | 'joy' | 'create'
  aspectRatio: string
}

const moods = [
  { id: 'all', label: 'All Work', emoji: '✨' },
  { id: 'sanctuary', label: 'Sanctuary', emoji: '🌿' },
  { id: 'play', label: 'Play', emoji: '🎈' },
  { id: 'joy', label: 'Joy', emoji: '😊' },
  { id: 'create', label: 'Create', emoji: '✨' },
]

// Sample data - will be replaced with actual paintings
const samplePaintings: Painting[] = [
  {
    id: '1',
    title: 'Morning Light',
    originalSrc: '/paintings/sample1.jpg',
    insituSrc: '/insitu/sample1.jpg',
    mood: 'sanctuary',
    aspectRatio: '3/4',
  },
  {
    id: '2',
    title: 'Happy Clouds',
    originalSrc: '/paintings/sample2.jpg',
    insituSrc: '/insitu/sample2.jpg',
    mood: 'joy',
    aspectRatio: '1/1',
  },
  {
    id: '3',
    title: 'Forest Dreams',
    originalSrc: '/paintings/sample3.jpg',
    insituSrc: '/insitu/sample3.jpg',
    mood: 'sanctuary',
    aspectRatio: '4/3',
  },
]

export default function MasonryGrid() {
  const [activeMood, setActiveMood] = useState('all')

  const filteredPaintings = useMemo(() => {
    if (activeMood === 'all') return samplePaintings
    return samplePaintings.filter((p) => p.mood === activeMood)
  }, [activeMood])

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      {/* Mood Filter */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setActiveMood(mood.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeMood === mood.id
                  ? 'bg-charcoal text-alabaster'
                  : 'bg-whisper text-charcoal hover:bg-terracotta hover:text-white'
              }`}
            >
              <span className="mr-2">{mood.emoji}</span>
              {mood.label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filteredPaintings.map((painting) => (
            <PaintingCard key={painting.id} {...painting} />
          ))}
        </div>
      </div>
    </section>
  )
}
