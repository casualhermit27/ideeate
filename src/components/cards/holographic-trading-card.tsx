'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface HolographicTradingCardProps {
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
  character?: {
    name: string
    power: number
    image: string
    description: string
  }
}

export function HolographicTradingCard({ 
  rarity = 'epic',
  character = {
    name: 'Quantum Phoenix',
    power: 9500,
    image: '🔥',
    description: 'A mystical creature that exists between dimensions'
  }
}: HolographicTradingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 300,
    damping: 30
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 300,
    damping: 30
  })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)
    
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  const getRarityConfig = () => {
    switch (rarity) {
      case 'common':
        return {
          gradient: 'from-gray-600 via-gray-500 to-gray-600',
          glow: 'shadow-gray-500/20',
          particles: 5,
          color: 'text-gray-300'
        }
      case 'rare':
        return {
          gradient: 'from-blue-600 via-blue-400 to-blue-600',
          glow: 'shadow-blue-500/30',
          particles: 10,
          color: 'text-blue-300'
        }
      case 'epic':
        return {
          gradient: 'from-purple-600 via-pink-500 to-purple-600',
          glow: 'shadow-purple-500/40',
          particles: 15,
          color: 'text-purple-300'
        }
      case 'legendary':
        return {
          gradient: 'from-yellow-500 via-orange-500 to-red-500',
          glow: 'shadow-orange-500/50',
          particles: 25,
          color: 'text-yellow-300'
        }
    }
  }

  const config = getRarityConfig()

  return (
    <div className="perspective-1000 p-8">
      <motion.div
        ref={cardRef}
        className={`
          relative w-64 h-96 cursor-pointer transform-gpu
          ${config.glow} shadow-2xl
        `}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Holographic Background */}
        <motion.div
          className={`
            absolute inset-0 rounded-2xl bg-gradient-to-br ${config.gradient}
            opacity-90 blur-sm
          `}
          animate={{
            background: isHovered 
              ? `linear-gradient(45deg, ${config.gradient.split(' ').join(', ')})`
              : `linear-gradient(135deg, ${config.gradient.split(' ').join(', ')})`
          }}
        />

        {/* Holographic Overlay */}
        <div 
          className={`
            absolute inset-0 rounded-2xl bg-gradient-to-br ${config.gradient}
            opacity-60
          `}
          style={{
            background: `
              radial-gradient(circle at ${mouseX.get() * 50 + 50}% ${mouseY.get() * 50 + 50}%, 
                rgba(255,255,255,0.8) 0%, 
                rgba(255,255,255,0.3) 30%, 
                transparent 70%
              )
            `
          }}
        />

        {/* Card Content */}
        <div className="relative z-10 p-6 h-full flex flex-col bg-black/20 rounded-2xl backdrop-blur-sm border border-white/20">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-white font-bold text-lg">{character.name}</h3>
              <span className={`text-sm font-medium ${config.color} uppercase tracking-wider`}>
                {rarity}
              </span>
            </div>
            <div className="text-right">
              <div className="text-white font-bold text-xl">{character.power}</div>
              <div className="text-gray-300 text-xs">POWER</div>
            </div>
          </div>

          {/* Character Image */}
          <div className="flex-1 flex items-center justify-center text-8xl mb-4">
            <motion.div
              animate={{
                rotate: isHovered ? 360 : 0,
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 2, ease: 'linear', repeat: isHovered ? Infinity : 0 }}
            >
              {character.image}
            </motion.div>
          </div>

          {/* Description */}
          <div className="text-center">
            <p className="text-gray-200 text-sm italic">
              {character.description}
            </p>
          </div>

          {/* Holographic Shine Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `linear-gradient(
                ${mouseX.get() * 45 + 45}deg,
                transparent 30%,
                rgba(255,255,255,0.5) 50%,
                transparent 70%
              )`
            }}
            animate={{
              opacity: isHovered ? 0.8 : 0.3
            }}
          />
        </div>

        {/* Particle Emissions */}
        {Array.from({ length: config.particles }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-white rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeOut'
            }}
          />
        ))}

        {/* 3D Edge Lighting */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        </div>
      </motion.div>
    </div>
  )
} 