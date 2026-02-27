'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { artworks, type Artwork } from '@/data/artworks';
import metadata from '@/data/artwork-metadata.json';

interface ArtworkDetailProps {
  artwork: Artwork;
}

export default function ArtworkDetail({ artwork }: ArtworkDetailProps) {
  const artMeta = (metadata as any)[artwork.id];
  const [viewMode, setViewMode] = useState<'artwork' | 'room'>('artwork');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const currentIndex = artworks.findIndex(a => a.id === artwork.id);
  const prevArtwork = currentIndex > 0 ? artworks[currentIndex - 1] : null;
  const nextArtwork = currentIndex < artworks.length - 1 ? artworks[currentIndex + 1] : null;

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };

    if (isLightboxOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Visuals - With Toggle */}
        <div className="space-y-4">
          {/* Toggle Buttons */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex bg-[#E8E4DF] rounded-full p-1">
              <button
                onClick={() => setViewMode('artwork')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  viewMode === 'artwork' 
                    ? 'bg-[#2C2C2C] text-[#FDFBF7] shadow-lg' 
                    : 'text-[#2C2C2C]/60 hover:text-[#2C2C2C]'
                }`}
              >
                Artwork
              </button>
              <button
                onClick={() => setViewMode('room')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  viewMode === 'room' 
                    ? 'bg-[#2C2C2C] text-[#FDFBF7] shadow-lg' 
                    : 'text-[#2C2C2C]/60 hover:text-[#2C2C2C]'
                }`}
              >
                In Room
              </button>
            </div>
          </div>

          {/* Main Image - Clickable, No Right Click */}
          <div 
            className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#E8E4DF] shadow-2xl cursor-zoom-in"
            onClick={() => setIsLightboxOpen(true)}
            onContextMenu={handleContextMenu}
          >
            <Image 
              src={viewMode === 'artwork' ? artwork.full : artwork.insituFull} 
              alt={viewMode === 'artwork' ? artwork.title : 'In room setting'} 
              fill 
              className="object-cover transition-all duration-500" 
              priority 
              unoptimized 
              draggable={false}
            />
            {/* Expand icon - subtle */}
            <div className="absolute top-4 right-4 bg-[#2C2C2C]/40 backdrop-blur-sm p-2 rounded-full">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between pt-4">
            {prevArtwork ? (
              <Link 
                href={`/gallery/${prevArtwork.id}`}
                className="flex items-center gap-2 text-[#2C2C2C]/60 hover:text-[#D4A574] transition-colors"
              >
                <span>←</span>
                <span className="text-sm">Previous</span>
              </Link>
            ) : <div />}
            {nextArtwork ? (
              <Link 
                href={`/gallery/${nextArtwork.id}`}
                className="flex items-center gap-2 text-[#2C2C2C]/60 hover:text-[#D4A574] transition-colors"
              >
                <span className="text-sm">Next</span>
                <span>→</span>
              </Link>
            ) : <div />}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <h1 className="font-serif text-4xl lg:text-5xl text-[#2C2C2C] mb-4 leading-tight">
            {artMeta?.displayTitle || artwork.title}
          </h1>
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <p className="text-[#D4A574] uppercase tracking-widest text-xs font-medium">{artwork.category}</p>
            {artMeta?.mood && (
              <>
                <span className="text-[#E8E4DF]">•</span>
                <p className="text-[#2C2C2C]/50 text-sm italic">{artMeta.mood}</p>
              </>
            )}
          </div>
          
          <div className="mb-8">
            <p className="text-lg text-[#2C2C2C]/70 leading-relaxed font-serif">
              {artMeta?.description || 'Discover the story behind this piece.'}
            </p>
          </div>

          {/* Polished Color Palette - Figma Design */}
          {artMeta?.palette && (
            <div className="mb-10">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/40 mb-6 font-medium">Color Palette</h3>
              
              {/* Sort by luminance (brightness) */}
              {(() => {
                const getLuminance = (hex: string) => {
                  const rgb = hex.replace('#', '').match(/.{2}/g)?.map(x => parseInt(x, 16)) || [0, 0, 0];
                  // W3C Relative Luminance formula - human eye is more sensitive to green
                  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
                };
                
                const sortedPalette = [...artMeta.palette].sort((a, b) => {
                  return getLuminance(b) - getLuminance(a); // brightest first
                });
                
                return (
                  <div className="flex flex-wrap gap-3">
                    {sortedPalette.map((color: string, index: number) => (
                      <div 
                        key={color} 
                        className="group relative flex flex-col items-center"
                        style={{ 
                          marginLeft: index > 0 ? '-20px' : '0',
                          zIndex: sortedPalette.length - index
                        }}
                      >
                        <motion.div 
                          whileHover={{ scale: 1.15, zIndex: 10 }}
                          className="w-16 h-16 rounded-full border-3 border-white shadow-lg transition-all"
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                        <span className="mt-3 text-[10px] uppercase tracking-wider text-[#2C2C2C]/60 font-medium">
                          {color}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}

          <div className="bg-[#E8E4DF]/30 p-6 rounded-2xl mb-8 border border-[#E8E4DF]">
            <h3 className="font-serif text-lg mb-4 text-[#2C2C2C]">Collector's Quality</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#2C2C2C]/70">
              <li className="flex items-center gap-2">
                <span className="text-[#D4A574]">✓</span> Museum-grade Archival Canvas
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4A574]">✓</span> Fade-resistant Giclée Print
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4A574]">✓</span> Handcrafted Digital Details
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4A574]">✓</span> Ready for Framing
              </li>
            </ul>
          </div>

          <button className="w-full bg-[#D4A574] text-white py-4 rounded-full text-base font-medium hover:bg-[#2C2C2C] transition-all shadow-lg active:scale-[0.98]">
            Buy Physical Print (16×20″) — ${artwork.price}
          </button>
          <p className="text-center mt-3 text-xs text-[#2C2C2C]/40 uppercase tracking-widest">
            Ships Worldwide • Museum-Quality Printing
          </p>
        </div>
      </div>

      {/* Lightbox Modal - Figma Make Design */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-8"
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black" 
              style={{ opacity: 0.95 }} 
              onClick={() => setIsLightboxOpen(false)}
            />

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 z-10 text-white/80 hover:text-white transition-colors"
              aria-label="Close lightbox"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <X size={36} strokeWidth={1.5} />
              </motion.div>
            </motion.button>

            {/* Content container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative z-10 flex flex-col items-center max-w-7xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative flex items-center justify-center w-full flex-1">
                <Image 
                  src={viewMode === 'artwork' ? artwork.full : artwork.insituFull} 
                  alt={viewMode === 'artwork' ? artwork.title : 'In room setting'} 
                  width={1200}
                  height={1600}
                  className="max-w-full max-h-[80vh] object-contain"
                  unoptimized 
                  priority
                  onClick={() => setIsLightboxOpen(false)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
