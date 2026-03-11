import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { artworks } from '@/data/artworks';
import ArtworkDetail from '@/components/gallery/ArtworkDetail';
import GalleryBackButton from '@/components/gallery/GalleryBackButton';

import artworkMetadataRaw from '@/data/artwork-metadata.json';

// Type assertion for the imported JSON
type ArtworkMetadata = {
  [key: string]: {
    displayTitle: string;
    description: string;
    palette: string[];
    mood: string;
  };
};

const artworkMetadata = artworkMetadataRaw as ArtworkMetadata;

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const artwork = artworks.find((a) => a.id === params.id);
  const metadata = artworkMetadata[params.id];

  if (!artwork) {
    return { title: 'Artwork Not Found | Spilled Palette Studio' };
  }

  const title = `${artwork.title} | Spilled Palette Studio`;
  const description = metadata?.description || `Discover ${artwork.title}, a beautiful ${artwork.category.toLowerCase()} artwork by Aswathi Bindhu Jawahar.`;
  const keywords = [
    artwork.title,
    'digital art',
    'Aswathi Bindhu Jawahar',
    artwork.category,
    ...(metadata?.palette || [])
  ].join(', ');

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://spilledpalettestudio.com/gallery/${artwork.id}`,
      images: [
        {
          url: artwork.full,
          width: 800,
          height: artwork.aspectRatio === 'portrait' ? 1000 : 600,
          alt: artwork.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [artwork.full],
    },
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
