import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Spilled Palette Studio',
  description: 'Meet Aswathi Bindhu Jawahar, digital artist.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-alabaster">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="font-serif text-4xl sm:text-5xl text-charcoal mb-8">
          About the Artist
        </h1>
        
        <div className="prose prose-lg text-charcoal/80">
          <p className="text-xl leading-relaxed mb-6">
            Aswathi Bindhu Jawahar is a digital artist whose work explores the 
            intersection of color, emotion, and space. Each piece is crafted to 
            breathe life into the environments they inhabit.
          </p>
          
          <p className="mb-6">
            With over 100 original digital paintings spanning landscapes, 
            patterns, and expressive portraits, Aswathi&apos;s work has found homes 
            in nurseries, living rooms, and creative spaces around the world.
          </p>
          
          <blockquote className="border-l-4 border-terracotta pl-6 italic text-charcoal/70 my-8">
            &ldquo;Art should not just be seen—it should be felt. Every painting 
            I create carries a piece of joy, serenity, or wonder that I hope 
            resonates with its new home.&rdquo;
          </blockquote>
          
          <p>
            The name &ldquo;Spilled Palette Studio&rdquo; reflects the spontaneous, 
            colorful nature of the creative process—where moments of inspiration 
            flow freely onto the digital canvas.
          </p>
        </div>
        
        <div className="mt-12 pt-8 border-t border-whisper">
          <h2 className="font-serif text-2xl text-charcoal mb-4">Get in Touch</h2>
          <p className="text-charcoal/70 mb-4">
            Interested in a piece or commissioning custom work?
          </p>
          <a 
            href="mailto:hello@spilledpalettestudio.com"
            className="text-terracotta hover:underline"
          >
            hello@spilledpalettestudio.com
          </a>
        </div>
      </div>
    </main>
  )
}
