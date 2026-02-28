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
                I have loved drawing since childhood. Starting with simple pencil sketches, I was never trying to be competitive or the best — I simply found happiness in creating. My artistic world completely opened up when I borrowed my husband's iPad and discovered digital painting. I slowly taught myself new techniques by following artists online, and eventually began exploring physical mediums like acrylics and oil pastels alongside my digital work.
              </p>
            </section>
          </div>
        </div>
        
        <div className="space-y-8 text-[#4a4a4a]">
          <section>
            <h2 className="font-serif text-2xl text-[#2c3e50] mb-4">
              What Inspires Me
            </h2>
            <p className="text-lg leading-relaxed">
              I am endlessly fascinated by how every artist develops a unique signature. Watching others encouraged me to search for my own artistic identity. One of the most beautiful lessons I've learned on this journey is that "mistakes" don't truly exist in art. Sometimes, the most mesmerizing creations come from asymmetry and the unexpected. That beauty in imperfection is what continues to inspire my work today.
            </p>
          </section>
          
          <section>
            <h2 className="font-serif text-2xl text-[#2c3e50] mb-4">
              The Studio
            </h2>
            <p className="text-lg leading-relaxed">
              For many years, painting remained a quiet hobby — something I picked up and put down as life got busy. But recently, I chose to step back into this colorful universe more intentionally. I realized that the therapeutic, healing nature of painting is what makes me genuinely happy. I decided to take that joy to the next level and build something of my own. That is how Spilled Palette Studio was born.
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
