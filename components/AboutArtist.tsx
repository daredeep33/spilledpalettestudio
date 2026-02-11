'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

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
            
            <h2 className="font-serif text-4xl sm:text-5xl mb-6">
              Aswathi <span className="italic text-[#D4A574]">Bindhu</span> Jawahar
            </h2>

            <div className="space-y-4 text-[#FDFBF7]/80 leading-relaxed">
              <p>
                Welcome to Spilled Palette Studio, where digital art meets timeless elegance. 
                I create handcrafted digital paintings designed to transform your space into 
                a sanctuary of color, calm, and creative energy.
              </p>
              
              <p>
                Each piece in my collection is thoughtfully crafted to bring warmth and 
                personality to your home. From serene botanical studies to vibrant abstract 
                compositions, my work celebrates the beauty of imperfection and the joy of 
                artistic expression.
              </p>

              <p>
                Whether you are an art collector, interior designer, or simply someone 
                who appreciates beauty, I invite you to explore my collection and find 
                the perfect piece for your space.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-6">
              <div className="text-center">
                <p className="text-3xl font-serif text-[#D4A574]">100+</p>
                <p className="text-sm text-[#FDFBF7]/60">Original Artworks</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-serif text-[#D4A574]">9</p>
                <p className="text-sm text-[#FDFBF7]/60">Collections</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-serif text-[#D4A574]">Worldwide</p>
                <p className="text-sm text-[#FDFBF7]/60">Shipping</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
