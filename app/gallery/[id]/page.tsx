import React from 'react';
import Link from 'next/link';
import { artworks } from '@/data/artworks';
import ArtworkDetail from '@/components/gallery/ArtworkDetail';

export function generateStaticParams() {
  return artworks.map((artwork) => ({
    id: artwork.id,
  }));
}

export const dynamicParams = true;

export default function ArtworkPage({ params }: { params: { id: string } }) {
  const artwork = artworks.find((a) => a.id === params.id);

  if (!artwork) {
    return (
      <main className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-[#2C2C2C] mb-4">Artwork Not Found</h1>
          <Link href="/#gallery" className="text-[#D4A574] hover:underline">
            ← Back to Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
        <Link href="/#gallery" className="text-sm text-[#D4A574] hover:underline mb-8 inline-block">
          ← Back to Collection
        </Link>
        
        <ArtworkDetail artwork={artwork} />
      </div>
    </main>
  );
}
