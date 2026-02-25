'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { type Artwork } from '@/data/artworks'

interface CheckoutModalProps {
  artwork: Artwork
  isOpen: boolean
  onClose: () => void
  selectedSize: string
  selectedFrame?: string
}

interface FormData {
  name: string
  email: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postalCode: string
  country: string
}

const COUNTRIES = [
  { code: 'OM', name: 'Oman' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'QA', name: 'Qatar' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'IN', name: 'India' },
  { code: 'OTHER', name: 'Other' },
]

export default function CheckoutModal({ 
  artwork, 
  isOpen, 
  onClose,
  selectedSize,
  selectedFrame 
}: CheckoutModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'OM',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artwork,
          recipient: {
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phone,
            address: {
              line1: formData.addressLine1,
              line2: formData.addressLine2,
              postalOrZipCode: formData.postalCode,
              countryCode: formData.country,
              townOrCity: formData.city,
              stateOrCounty: formData.state,
            },
          },
          selectedSize,
          selectedFrame,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order')
      }

      setOrderId(data.orderId)
      setIsSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-serif text-gray-900">
              {isSuccess ? 'Order Confirmed!' : 'Checkout'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {isSuccess ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Thank you for your order!
                </h3>
                {orderId && (
                  <p className="text-sm text-gray-500 mb-4">
                    Order ID: <span className="font-mono">{orderId}</span>
                  </p>
                )}
                <p className="text-gray-600 mb-6">
                  Your order has been received and will be processed shortly. 
                  You'll receive a confirmation email with tracking details.
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#D4A574] text-white px-8 py-3 rounded-full hover:bg-[#2C2C2C] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                {/* Order Summary */}
                <div className="bg-[#FDFBF7] p-4 rounded-xl mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Order Summary</h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{artwork.title}</span>
                    <span className="font-medium">${artwork.price}</span>
                  </div>
                  {selectedSize && (
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-600">Size</span>
                      <span className="text-gray-900">{selectedSize}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${artwork.price}</span>
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent outline-none transition-all"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent outline-none transition-all"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Shipping Address</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="addressLine1"
                      required
                      placeholder="Address Line 1 *"
                      value={formData.addressLine1}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent outline-none transition-all"
                    />
                    <input
                      type="text"
                      name="addressLine2"
                      placeholder="Address Line 2"
                      value={formData.addressLine2}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent outline-none transition-all"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="city"
                        required
                        placeholder="City *"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent outline-none transition-all"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State/Province"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="postalCode"
                        required
                        placeholder="Postal Code *"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent outline-none transition-all"
                      />
                      <select
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent outline-none transition-all"
                      >
                        {COUNTRIES.map(country => (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#D4A574] text-white py-4 rounded-full font-medium hover:bg-[#2C2C2C] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay $${artwork.price}`
                  )}
                </button>

                <p className="text-center text-xs text-gray-400 mt-4">
                  Secure checkout powered by Prodigi
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
