'use client'

import { motion } from 'framer-motion'

export default function WhyOriginal() {
  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Soul & Character",
      description: "Each original artwork carries the artist's energy and intention — something no print can replicate."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Investment Value",
      description: "Original art appreciates over time. Limited pieces from emerging artists can become valuable collectibles."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Unique Conversation",
      description: "Original art sparks conversation and becomes a focal point that defines your space."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: "Support Artists",
      description: "Buying original directly supports creative work and helps artists continue their craft."
    }
  ]

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-[#D4A574] text-sm uppercase tracking-[0.2em] mb-4">
            Why Original Art?
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2C2C2C] mb-4 sm:mb-6">
            Own a <span className="italic text-[#D4A574]">Masterpiece</span>
          </h2>
          <p className="text-[#2C2C2C]/60 text-base sm:text-lg max-w-2xl mx-auto hidden sm:block">
            In a world of mass-produced decor, original art brings authenticity and meaning to your space.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-10 h-10 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4 rounded-full bg-[#D4A574]/10 flex items-center justify-center text-[#D4A574]">
                {benefit.icon}
              </div>
              <h3 className="font-serif text-base sm:text-xl text-[#2C2C2C] mb-1">
                {benefit.title}
              </h3>
              <p className="text-[#2C2C2C]/60 text-xs sm:text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA removed - Gallery already has "View All" button */}
      </div>
    </section>
  )
}
