import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { ThemeButton } from "@/components/ui/theme-button"
import { motion, AnimatePresence } from "framer-motion"

const SCROLL_THRESHOLD = 300 // Adjust this value to change when the buttons disappear

export default function ScrollDisappearingButtons() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > SCROLL_THRESHOLD) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-80 left-0 w-full z-30 flex justify-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.05 }}
        >
          <ThemeButton>Tornar-se Sócio</ThemeButton>
          <Link to="/matches">
            <ThemeButton>Comprar Bilhetes</ThemeButton>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}