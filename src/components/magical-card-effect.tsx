"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"

type MagicalCardEffectProps = {
  children: React.ReactNode
  className?: string
}

export default function MagicalCardEffect({ children, className = "" }: MagicalCardEffectProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()

    // Calculate mouse position relative to card center (in percentage, -50 to 50)
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2

    // Set rotation values (limit to smaller angles for subtle effect)
    setRotateY(x * 7.5) // Max 7.5 degrees
    setRotateX(-y * 7.5) // Max 7.5 degrees

    // Track mouse position for highlight effect
    setMouseX(e.clientX - rect.left)
    setMouseY(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    // Reset on mouse leave
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {/* Highlight effect */}
      <div
        className="absolute pointer-events-none inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%)`,
        }}
      />

      {/* Border glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        animate={{
          boxShadow: [
            "0 0 0 1px rgba(147, 51, 234, 0.1), 0 0 0 3px rgba(147, 51, 234, 0.1)",
            "0 0 0 1px rgba(147, 51, 234, 0.2), 0 0 0 4px rgba(147, 51, 234, 0.1)",
            "0 0 0 1px rgba(147, 51, 234, 0.1), 0 0 0 3px rgba(147, 51, 234, 0.1)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {children}
    </motion.div>
  )
}
