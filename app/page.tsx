import Hero from '../components/Hero'
import LivingGallery from '../components/LivingGallery'

export default function Home() {
  return (
    <main className="min-h-screen bg-alabaster">
      <Hero />
      <LivingGallery />
      
      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-charcoal text-alabaster">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl mb-4">
            Join the <span className="italic">Studio</span>
          </h2>
          <p className="text-alabaster/70 mb-8">
            Be the first to know about new collections, exclusive prints, and behind-the-scenes studio life.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-full bg-alabaster/10 border border-alabaster/20 text-alabaster placeholder:text-alabaster/50 focus:outline-none focus:border-terracotta"
            />
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-terracotta text-white font-medium hover:bg-terracotta/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-charcoal border-t border-alabaster/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl text-alabaster mb-2">
                Spilled Palette Studio
              </h3>
              <p className="text-alabaster/50 text-sm">
                Digital paintings by Aswathi Bindhu Jawahar
              </p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-alabaster/50 hover:text-terracotta transition-colors">Instagram</a>
              <a href="#" className="text-alabaster/50 hover:text-terracotta transition-colors">Pinterest</a>
              <a href="#" className="text-alabaster/50 hover:text-terracotta transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-alabaster/10 text-center">
            <p className="text-alabaster/30 text-sm">
              © 2026 Spilled Palette Studio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
