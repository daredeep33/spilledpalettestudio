'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, filter: 'blur(8px)', y: 15 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        exit={{ opacity: 0, filter: 'blur(8px)', y: -15 }}
        transition={{ ease: "easeOut", duration: 0.4 }}
        className="flex-grow flex flex-col"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}
