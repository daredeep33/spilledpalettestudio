'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface ContactProps {
  artworkTitle?: string;
}

export default function Contact({ artworkTitle }: ContactProps = {}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: artworkTitle ? `I'm interested in "${artworkTitle}". ` : '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    // Formspree integration
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    
    try {
      const response = await fetch('https://formspree.io/f/xnqelnjr', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#D4A574] text-sm uppercase tracking-[0.2em] mb-4">
            Get in Touch
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#2C2C2C] mb-4">
            Let's <span className="italic">Connect</span>
          </h2>
          <p className="text-[#2C2C2C]/60 text-lg max-w-xl mx-auto">
            Interested in a piece? Have questions about commissions? 
            I'd love to hear from you.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm"
        >
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#D4A574]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#D4A574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-[#2C2C2C] mb-2">Message Sent!</h3>
              <p className="text-[#2C2C2C]/60">Thank you for reaching out. I'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="_subject" value="New inquiry from Spilled Palette Studio" />
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#E8E4DF] focus:border-[#D4A574] focus:outline-none transition-colors bg-[#FDFBF7]"
                    placeholder="Jane Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#E8E4DF] focus:border-[#D4A574] focus:outline-none transition-colors bg-[#FDFBF7]"
                    placeholder="jane@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#E8E4DF] focus:border-[#D4A574] focus:outline-none transition-colors bg-[#FDFBF7] resize-none"
                  placeholder="Tell me about the artwork you're interested in..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-4 bg-[#2C2C2C] text-[#FDFBF7] rounded-full font-medium hover:bg-[#D4A574] transition-colors disabled:opacity-50"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-[#2C2C2C]/60 mb-4">Prefer email? Reach out directly:</p>
          <a 
            href="mailto:hello@spilledpalettestudio.com" 
            className="text-[#D4A574] hover:underline text-lg"
          >
            hello@spilledpalettestudio.com
          </a>
          
          <div className="mt-8 flex justify-center gap-6">
            <div className="text-center">
              <p className="text-[#2C2C2C]/50 text-sm">Response Time</p>
              <p className="text-[#2C2C2C] font-medium">Within 24 hours</p>
            </div>
            <div className="text-center">
              <p className="text-[#2C2C2C]/50 text-sm">Worldwide Shipping</p>
              <p className="text-[#2C2C2C] font-medium">3-5 business days</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
