import Image from 'next/image'
import Hero from '../components/Hero'
import WhyOriginal from '../components/WhyOriginal'
import AboutArtist from '../components/AboutArtist'
import Gallery from '../components/Gallery'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <main className="bg-[#FDFBF7]">
      <Hero />
      <Gallery limit={6} showAllLink={true} />
      <WhyOriginal />
      <AboutArtist />
      <Contact />
    </main>
  )
}
