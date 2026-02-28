import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About | Spilled Palette Studio',
  description: 'The story behind Spilled Palette Studio — where art meets healing.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#2c3e50] mb-12 text-center">
          Our Story
        </h1>
        
        <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="relative w-64 h-64 mx-auto md:mx-0 overflow-hidden rounded-full">
              <Image
                src="/images/aswathi.jpg"
                alt="Aswathi Bindhu Jawahar"
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
          </div>
          
          <div className="flex-1 space-y-8 text-[#4a4a4a]">
            <section>
              <h2 className="font-serif text-2xl text-[#2c3e50] mb-4">
                When did you start painting?
              </h2>
              <p className="text-lg leading-relaxed">
                I've loved painting since childhood. It started with pencil drawings — not to be competitive or outstanding, just found happiness in creating. Later, I discovered digital painting on my husband's iPad and a whole new world of art through online artists. I gradually explored acrylics and oil pastels.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                There were breaks along the way — short and long. Recently, I chose to return more intentionally. I don't paint to compete. I paint because it relaxes me, heals me, and brings me joy.
              </p>
            </section>
          </div>
        </div>
        
        <div className="space-y-8 text-[#4a4a4a]">
          <section>
            <h2 className="font-serif text-2xl text-[#2c3e50] mb-4">
              What inspires me?
            </h2>
            <p className="text-lg leading-relaxed">
              Every artist has a unique signature in their work. Watching others encouraged me to search for my own. One of the most beautiful lessons I've learned: "mistakes" don't truly exist in art. Sometimes the most mesmerizing creations come from imperfection and asymmetry. That beauty in imperfection continues to inspire me.
            </p>
          </section>
          
          <section>
            <h2 className="font-serif text-2xl text-[#2c3e50] mb-4">
              My story
            </h2>
            <p className="text-lg leading-relaxed">
              For years, painting and drawing were quiet hobbies — always there, yet unexplored. When social media connected artists worldwide, I began following them and slowly taught myself to nurture my creative side.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              I realized something important: creating art makes me genuinely happy. The therapeutic nature of painting made me fall in love with this universe of colors and patterns.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              That's when I decided to take it to the next level and build something of my own. That's how Spilled Palette Studio was born — sharing that healing joy with others through my work.
            </p>
          </section>
        </div>
        
        <div className="mt-16 pt-8 border-t border-[#e8e4dc]">
          <h2 className="font-serif text-2xl text-[#2c3e50] mb-4">Get in Touch</h2>
          <p className="text-[#4a4a4a] mb-4">
            Interested in a piece or commissioning custom work?
          </p>
          <a 
            href="mailto:hello@spilledpalettestudio.com"
            className="text-[#c0392b] hover:underline"
          >
            hello@spilledpalettestudio.com
          </a>
        </div>
      </div>
    </main>
  )
}
