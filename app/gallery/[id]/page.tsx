import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { artworks } from '@/data/artworks';
import metadata from '@/data/artwork-metadata.json';

export default function ArtworkPage({ params }: { params: { id: string } }) {
  const artwork = artworks.find((a) => a.id === params.id);
  const artMeta = (metadata as any)[params.id];

  if (!artwork) return <div>Artwork not found</div>;

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <Link href="/#gallery" className="text-sm text-[#D4A574] hover:underline mb-8 inline-block">
          ← Back to Collection
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Visuals */}
          <div className="space-y-6">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#E8E4DF] shadow-2xl">
              <Image src={artwork.full} alt={artwork.title} fill className="object-cover" priority unoptimized />
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#E8E4DF] shadow-xl">
              <Image src={artwork.insituFull} alt="In situ view" fill className="object-cover" unoptimized />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <h1 className="font-serif text-5xl lg:text-6xl text-[#2C2C2C] mb-4">
              {artMeta?.displayTitle || artwork.title}
            </h1>
            <div className="flex items-center gap-4 mb-8">
              <p className="text-[#D4A574] uppercase tracking-widest text-sm">{artwork.category}</p>
              {artMeta?.mood && (
                <>
                  <span className="text-[#E8E4DF]">•</span>
                  <p className="text-[#2C2C2C]/50 text-sm italic">{artMeta.mood}</p>
                </>
              )}
            </div>
            
            <div className="prose prose-neutral mb-10">
              <p className="text-xl text-[#2C2C2C]/70 italic leading-relaxed font-serif">
                "{artMeta?.description || 'Discover the story behind this piece.'}"
              </p>
            </div>

            {artMeta?.palette && (
              <div className="mb-10">
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/40 mb-4">Color Palette</h3>
                <div className="flex gap-3">
                  {artMeta.palette.map((color: string) => (
                    <div key={color} className="group relative">
                      <div 
                        className="w-10 h-10 rounded-full border border-black/5 shadow-sm transition-transform group-hover:scale-110" 
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-[#E8E4DF]/30 p-8 rounded-2xl mb-10 border border-[#E8E4DF]">
              <h3 className="font-serif text-xl mb-4 text-[#2C2C2C]">Collector's Quality</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#2C2C2C]/70">
                <li className="flex items-center gap-2">
                  <span className="text-[#D4A574]">✔</span> Museum-grade Archival Canvas
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#D4A574]">✔</span> Fade-resistant Giclée Print
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#D4A574]">✔</span> Handcrafted Digital Details
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#D4A574]">✔</span> Ready for Professional Framing
                </li>
              </ul>
            </div>

            <button className="w-full bg-[#2C2C2C] text-[#FDFBF7] py-6 rounded-full text-lg font-medium hover:bg-[#D4A574] transition-all shadow-xl active:scale-[0.98]">
              Order High-Res Print — ${artwork.price}
            </button>
            <p className="text-center mt-4 text-xs text-[#2C2C2C]/40 uppercase tracking-widest">
              Ships Worldwide • Secured by Printify Fulfillment
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
