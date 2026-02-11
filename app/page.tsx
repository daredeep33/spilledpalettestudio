import Hero from '../components/Hero'
import AboutArtist from '../components/AboutArtist'
import Gallery from '../components/Gallery'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <Navigation />
      <Hero />
      <Gallery />
      <AboutArtist />
      <Contact />
      <Footer />
    </main>
  )
}

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-sm border-b border-[#E8E4DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#" className="font-serif text-xl text-[#2C2C2C]">
            Spilled Palette Studio
          </a>
          <div className="hidden md:flex space-x-8">
            <a href="#gallery" className="text-[#2C2C2C]/70 hover:text-[#D4A574] transition-colors text-sm">
              Gallery
            </a>
            <a href="#about" className="text-[#2C2C2C]/70 hover:text-[#D4A574] transition-colors text-sm">
              About
            </a>
            <a href="#contact" className="text-[#2C2C2C]/70 hover:text-[#D4A574] transition-colors text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-[#FDFBF7] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="font-serif text-2xl mb-2">Spilled Palette Studio</h3>
            <p className="text-[#FDFBF7]/60 text-sm">Original artwork by Aswathi Bindhu Jawahar</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://www.instagram.com/thespilledpalettestudio" target="_blank" rel="noopener noreferrer" className="text-[#FDFBF7]/60 hover:text-[#D4A574] transition-colors text-sm">Instagram</a>
            <a href="#" className="text-[#FDFBF7]/60 hover:text-[#D4A574] transition-colors text-sm">Pinterest</a>
            <a href="#contact" className="text-[#FDFBF7]/60 hover:text-[#D4A574] transition-colors text-sm">Contact</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[#FDFBF7]/10 text-center">
          <p className="text-[#FDFBF7]/40 text-sm">© 2026 Spilled Palette Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
