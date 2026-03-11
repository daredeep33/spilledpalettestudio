'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/gallery', label: 'Collection' },
    { href: '/about', label: 'About' },
    { href: '/#contact', label: 'Inquire' },
  ]

  return (
    <>
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-xl border-b border-[#E8E4DF]/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
        {/* Noise Texture Layer */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-noise mix-blend-overlay rounded-b-xl" />
        
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-12 sm:h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-[#D4A574] focus-visible:outline-none rounded-lg p-1 -ml-1"
            >
              <Image
                src="/logo.png"
                alt="Spilled Palette Studio"
                width={32}
                height={32}
                className="rounded-full sm:w-10 sm:h-10"
              />
              <span className="font-serif text-base sm:text-xl text-[#2C2C2C] hidden xs:block">
                Spilled Palette
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => {
                const isActive = link.href === '/' 
                  ? pathname === '/' 
                  : (link.href.startsWith('/#') ? false : pathname.startsWith(link.href))
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium focus-visible:ring-2 focus-visible:ring-[#D4A574] focus-visible:outline-none rounded-md px-2 py-1 -mx-2 transition-colors ${
                      isActive 
                        ? 'text-[#D4A574]' 
                        : 'text-[#2C2C2C]/70 hover:text-[#D4A574]'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 focus-visible:ring-2 focus-visible:ring-[#D4A574] focus-visible:outline-none rounded-md"
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 bg-[#2C2C2C] transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-[#2C2C2C] transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-[#2C2C2C] transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, height: 'auto', filter: 'blur(0px)' }}
              exit={{ opacity: 0, height: 0, filter: 'blur(10px)' }}
              className="md:hidden bg-[#FDFBF7]/95 backdrop-blur-3xl border-t border-[#E8E4DF] relative"
            >
              {/* Noise Texture Layer Mobile Menu */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-noise mix-blend-overlay" />
              <div className="px-4 py-4 space-y-3 relative z-10">
                {navLinks.map((link) => {
                  const isActive = link.href === '/' 
                    ? pathname === '/' 
                    : (link.href.startsWith('/#') ? false : pathname.startsWith(link.href))
                    
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-2 text-lg font-medium focus-visible:ring-2 focus-visible:ring-[#D4A574] focus-visible:outline-none rounded-md px-2 -mx-2 ${
                        isActive ? 'text-[#D4A574]' : 'text-[#2C2C2C]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-12 sm:h-16" />
    </>
  )
}
