import Gallery from '../../components/Gallery'

export const metadata = {
  title: 'Full Gallery | Spilled Palette Studio',
  description: 'Browse our complete collection of original artworks by Aswathi Bindhu Jawahar',
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <Gallery />
    </main>
  )
}
