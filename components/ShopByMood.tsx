'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const moods = [
  {
    id: 'sanctuary',
    title: 'Sanctuary',
    subtitle: 'Peaceful Landscapes',
    image: 'https://res.cloudinary.com/dzg9imnjl/image/upload/w_600,q_auto,f_auto/v1770831443/spilledpalette/artwork/sanctuary/willow-tree-landscape.tiff',
    color: 'from-emerald-400/20 to-teal-500/20',
  },
  {
    id: 'dreamers',
    title: 'Dreamers',
    subtitle: 'Nursery Art',
    image: 'https://res.cloudinary.com/dzg9imnjl/image/upload/w_600,q_auto,f_auto/v1770831033/spilledpalette/artwork/dreamers/dandelion-pastel-circles.tiff',
    color: 'from-amber-300/20 to-orange-400/20',
  },
  {
    id: 'dopamine',
    title: 'Joy',
    subtitle: 'Happy & Colorful',
    image: 'https://res.cloudinary.com/dzg9imnjl/image/upload/w_600,q_auto,f_auto/v1770831055/spilledpalette/artwork/dopamine/floral-butterfly-artwork.tiff',
    color: 'from-rose-300/20 to-pink-400/20',
  },
  {
    id: 'modern',
    title: 'Modern',
    subtitle: 'Contemporary Style',
    image: 'https://res.cloudinary.com/dzg9imnjl/image/upload/w_600,q_auto,f_auto/v1770831217/spilledpalette/artwork/modern/abstract-botanical-rainbow.tiff',
    color: 'from-violet-400/20 to-purple-500/20',
  },
]

export default function ShopByMood() {
  return (
    <section id="moods" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl text-charcoal mb-4">
            Shop by <span className="italic">Mood</span>
          </h2>
          <p className="text-charcoal/60 text-lg max-w-xl mx-auto">
            Find art that speaks to your space and state of mind
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {moods.map((mood, index) => (
            <motion.button
              key={mood.id}
              onClick={() => {
                const gallery = document.getElementById('gallery');
                if (gallery) {
                  gallery.scrollIntoView({ behavior: 'smooth' });
                  // We'll need to trigger the category filter in Gallery.tsx
                  window.dispatchEvent(new CustomEvent('filterCategory', { detail: mood.id }));
                }
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group cursor-pointer bg-transparent border-none p-0 outline-none w-full"
            >
              <div className="relative aspect-square mb-4">
                {/* Circle background */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${mood.color} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Image container */}
                <div className="absolute inset-2 rounded-full overflow-hidden bg-whisper">
                  <Image
                    src={mood.image}
                    alt={mood.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Hover ring */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-terracotta transition-colors duration-300" />
              </div>
              
              <div className="text-center">
                <h3 className="font-serif text-2xl text-charcoal group-hover:text-terracotta transition-colors">
                  {mood.title}
                </h3>
                <p className="text-charcoal/50 text-sm mt-1">{mood.subtitle}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
