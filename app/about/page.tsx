import type { Metadata } from 'next'
import Image from 'next/image'
import Navigation from '../../components/Navigation'

export const metadata: Metadata = {
  title: 'About | Spilled Palette Studio',
  description: 'The story behind Spilled Palette Studio — where art meets healing.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#2c3e50] mb-12 text-center">
          My Journey
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
                How It Began
              </h2>
              <p className="text-lg leading-relaxed">
                I have loved painting since childhood. I started with pencil drawings — I was never competitive, outstanding, or trying to be the best. I simply found happiness in creating. Later, I began digital painting on my husband's iPad and discovered a whole new world of art through digital tools and online artists. Gradually, I started exploring other mediums like acrylics and oil pastels. Although this journey has lasted several years, it hasn't been continuous. There were short and long breaks along the way. Recently, I chose to step back into this magical world more intentionally. I don't paint to compete — I paint because it relaxes me, heals me, and brings me joy.
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
              I have been inspired by many artists, both online and offline. What fascinates me most is that every artist has a unique signature in their work. Watching them encouraged me to search for my own artistic identity. One of the most beautiful lessons I learned from this journey is that "mistakes" don't truly exist in art. Sometimes, the most mesmerizing creations come from imperfection and asymmetry. That beauty in imperfection continues to inspire my work.
            </p>
          </section>
          
          <section>
            <h2 className="font-serif text-2xl text-[#2c3e50] mb-4">
              My story
            </h2>
            <p className="text-lg leading-relaxed">
              For many years, painting and drawing were hobbies that quietly stayed with me, yet remained unexplored. When social media opened doors for artists around the world, I began following them and slowly taught myself how to nurture my creative side. During this process, I realized something important — creating art made me genuinely happy. The therapeutic and healing nature of painting made me fall in love with this universe of colors and patterns. That's when I decided to take it to the next level and build something of my own. And that is how Spilled Palette Studio was born.
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
            className="text-[#8B2510] hover:underline"
          >
            hello@spilledpalettestudio.com
          </a>
        </div>
      </div>
    </main>
  )
}
