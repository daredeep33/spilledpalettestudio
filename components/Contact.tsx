'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Instagram, Mail, Send } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    artworkInquiry: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  
  useEffect(() => {
    // Check for artwork inquiry from URL params
    const artworkFromUrl = searchParams.get('piece')
    if (artworkFromUrl) {
      setFormData(prev => ({
        ...prev,
        artworkInquiry: 'Print Purchase',
        message: `I'm interested in "${artworkFromUrl}". `
      }))
    }
    
    // Also check session storage
    const artwork = sessionStorage.getItem('inquiryArtwork')
    if (artwork) {
      setFormData(prev => ({
        ...prev,
        artworkInquiry: artwork,
        message: `I'm interested in "${artwork}". `
      }))
      sessionStorage.removeItem('inquiryArtwork')
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
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
        setFormData({ name: '', email: '', artworkInquiry: '', message: '' })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FDFBF7' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 
            className="mb-3"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '3rem',
              fontWeight: 300,
              letterSpacing: '0.02em',
              color: '#2C2C2C'
            }}
          >
            Get in Touch
          </h2>
          <div className="w-16 h-px mx-auto" style={{ backgroundColor: '#D4A574' }}></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 
                className="mb-6"
                style={{ 
                  fontFamily: "'Lora', serif",
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  color: '#2C2C2C'
                }}
              >
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <a 
                  href="mailto:hello@spilledpalettestudio.com"
                  className="flex items-center gap-3 group transition-all"
                  style={{ color: '#5C5C5C' }}
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{ backgroundColor: '#F5EFE7' }}
                  >
                    <Mail className="w-5 h-5 group-hover:opacity-70 transition-opacity" style={{ color: '#D4A574' }} />
                  </div>
                  <span 
                    className="group-hover:opacity-70 transition-opacity leading-none"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    hello@spilledpalettestudio.com
                  </span>
                </a>

                <a 
                  href="https://instagram.com/thespilledpalettestudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group transition-all"
                  style={{ color: '#5C5C5C' }}
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{ backgroundColor: '#F5EFE7' }}
                  >
                    <Instagram className="w-5 h-5 group-hover:opacity-70 transition-opacity" style={{ color: '#D4A574' }} />
                  </div>
                  <span 
                    className="group-hover:opacity-70 transition-opacity leading-none"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    @thespilledpalettestudio
                  </span>
                </a>
              </div>
            </div>

            <div className="pt-8">
              <p 
                className="leading-relaxed"
                style={{ 
                  fontFamily: "'Lora', serif",
                  color: '#5C5C5C',
                  fontSize: '0.95rem'
                }}
              >
                Whether you&apos;re interested in a specific artwork or want to discuss a custom piece, I&apos;d love to hear from you. Each piece in my collection is created with care and designed to bring warmth to your space.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 px-6 rounded-2xl"
                style={{ backgroundColor: '#F5EFE7' }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4A574' }}>
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: '#2C2C2C' }} className="mb-2">
                  Thank You!
                </h3>
                <p style={{ fontFamily: "'Lora', serif", color: '#5C5C5C' }}>
                  I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm underline"
                  style={{ color: '#D4A574' }}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border transition-all outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CCCCCC',
                      fontFamily: "'Lora', serif",
                      color: '#2C2C2C'
                    }}
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border transition-all outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CCCCCC',
                      fontFamily: "'Lora', serif",
                      color: '#2C2C2C'
                    }}
                  />
                </div>

                <div>
                  <select
                    name="artworkInquiry"
                    value={formData.artworkInquiry}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border transition-all outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CCCCCC',
                      fontFamily: "'Lora', serif",
                      color: '#2C2C2C'
                    }}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Print Purchase">Print Purchase</option>
                    <option value="Collaboration">Collaboration</option>
                  </select>
                </div>

                <div>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border transition-all outline-none focus:ring-2 resize-none"
                    style={{ 
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CCCCCC',
                      fontFamily: "'Lora', serif",
                      color: '#2C2C2C'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-6 rounded-full font-medium transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ 
                    backgroundColor: '#2C2C2C',
                    color: '#FFFFFF',
                    fontFamily: "'Lora', serif"
                  }}
                >
                  {submitting ? 'Sending...' : 'Submit'}
                </button>
                
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
