import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { artworks } from '@/data/artworks';
import ArtworkDetail from '@/components/gallery/ArtworkDetail';
import GalleryBackButton from '@/components/gallery/GalleryBackButton';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const artwork = artworks.find((a) => a.id === params.id);

  if (!artwork) {
    return { title: 'Artwork Not Found | Spilled Palette Studio' };
  }

  return {
    title: `${artwork.title} | Spilled Palette Studio`,
    description: `Discover ${artwork.title}, a beautiful ${artwork.category.toLowerCase()} artwork by Aswathi Bindhu Jawahar.`,
  };
}

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
          <GalleryBackButton />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
        <GalleryBackButton />

        <ArtworkDetail artwork={artwork} />
      </div>
    </main>
  );
}
