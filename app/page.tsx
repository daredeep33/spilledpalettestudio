import Image from 'next/image'
import Hero from '../components/Hero'
import Navigation from '../components/Navigation'
import WhyOriginal from '../components/WhyOriginal'
import AboutArtist from '../components/AboutArtist'
import Gallery from '../components/Gallery'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <Navigation />
      <Hero />
      <Gallery limit={6} showAllLink={true} />
      <WhyOriginal />
      <AboutArtist />
      <Contact />
      <Footer />
    </main>
  )
}

function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-[#FDFBF7] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="font-serif text-2xl mb-2">Spilled Palette Studio</h3>
            <p className="text-[#B0B0B0] text-sm mb-4">Original artwork by Aswathi Bindhu Jawahar</p>
            <p className="text-[#999999] text-sm max-w-md">
              Handcrafted digital paintings that transform your space into a sanctuary of color, calm, and creative energy.
            </p>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="pt-8 border-t border-[#FDFBF7]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex space-x-6">
            <a href="https://www.instagram.com/thespilledpalettestudio" target="_blank" rel="noopener noreferrer" className="text-[#B0B0B0] hover:text-[#E8C9A0] text-sm">Instagram</a>
            <a href="mailto:hello@spilledpalettestudio.com" className="text-[#B0B0B0] hover:text-[#E8C9A0] text-sm">Email</a>
          </div>
          <p className="text-[#808080] text-sm">© 2026 Spilled Palette Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
