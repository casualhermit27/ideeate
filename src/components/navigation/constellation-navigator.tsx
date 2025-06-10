'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Star {
  id: string
  name: string
  x: number
  y: number
  brightness: number
  constellation: string
  icon: string
}

export function ConstellationNavigator() {
  const [selectedStar, setSelectedStar] = useState<string | null>(null)
  const [hoveredStar, setHoveredStar] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const stars: Star[] = [
    { id: 'home', name: 'Home', x: 50, y: 30, brightness: 1, constellation: 'navigation', icon: '🏠' },
    { id: 'about', name: 'About', x: 25, y: 50, brightness: 0.8, constellation: 'navigation', icon: '👤' },
    { id: 'projects', name: 'Projects', x: 75, y: 45, brightness: 0.9, constellation: 'navigation', icon: '💼' },
    { id: 'skills', name: 'Skills', x: 40, y: 70, brightness: 0.7, constellation: 'navigation', icon: '⚡' },
    { id: 'contact', name: 'Contact', x: 65, y: 75, brightness: 0.85, constellation: 'navigation', icon: '📧' },
    { id: 'blog', name: 'Blog', x: 15, y: 25, brightness: 0.6, constellation: 'secondary', icon: '📝' },
    { id: 'gallery', name: 'Gallery', x: 85, y: 20, brightness: 0.75, constellation: 'secondary', icon: '🖼️' },
    { id: 'services', name: 'Services', x: 30, y: 85, brightness: 0.65, constellation: 'secondary', icon: '🛠️' }
  ]

  const getConnections = (starId: string) => {
    const star = stars.find(s => s.id === starId)
    if (!star) return []
    
    return stars.filter(s => 
      s.constellation === star.constellation && 
      s.id !== starId
    )
  }

  const getStarDistance = (star1: Star, star2: Star) => {
    return Math.sqrt(Math.pow(star1.x - star2.x, 2) + Math.pow(star1.y - star2.y, 2))
  }

  return (
    <div className="p-8">
      <div
        ref={containerRef}
        className="relative w-96 h-96 mx-auto bg-gradient-to-br from-indigo-900 via-purple-900 to-black rounded-2xl overflow-hidden border border-white/10"
      >
        {/* Background Stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={`bg-star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}

        {/* Constellation Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {stars.map(star => 
            getConnections(star.id).map(connectedStar => {
              const distance = getStarDistance(star, connectedStar)
              if (distance > 40) return null // Don't connect distant stars
              
              const isActive = hoveredStar === star.id || hoveredStar === connectedStar.id || selectedStar === star.id || selectedStar === connectedStar.id
              
              return (
                <motion.line
                  key={`${star.id}-${connectedStar.id}`}
                  x1={`${star.x}%`}
                  y1={`${star.y}%`}
                  x2={`${connectedStar.x}%`}
                  y2={`${connectedStar.y}%`}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: isActive ? 1 : 0.3,
                    opacity: isActive ? 0.8 : 0.3,
                    stroke: isActive ? 'rgba(59, 130, 246, 0.8)' : 'rgba(255,255,255,0.3)'
                  }}
                  transition={{ duration: 0.5 }}
                />
              )
            })
          )}
          
          {/* Energy Pulses */}
          {hoveredStar && (
            <motion.circle
              cx={`${stars.find(s => s.id === hoveredStar)?.x}%`}
              cy={`${stars.find(s => s.id === hoveredStar)?.y}%`}
              r="0"
              fill="none"
              stroke="rgba(59, 130, 246, 0.6)"
              strokeWidth="2"
              animate={{
                r: [0, 50, 100],
                opacity: [1, 0.5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
          )}
        </svg>

        {/* Interactive Stars */}
        {stars.map((star, index) => {
          const isHovered = hoveredStar === star.id
          const isSelected = selectedStar === star.id
          const isConnected = hoveredStar ? getConnections(hoveredStar).some(s => s.id === star.id) : false
          
          return (
            <motion.div
              key={star.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
              }}
              onClick={() => setSelectedStar(star.id)}
              onMouseEnter={() => setHoveredStar(star.id)}
              onMouseLeave={() => setHoveredStar(null)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1
              }}
              transition={{ 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 200
              }}
            >
              {/* Star Glow */}
              <motion.div
                className={`
                  absolute inset-0 rounded-full blur-sm
                  ${star.constellation === 'navigation' ? 'bg-blue-400' : 'bg-purple-400'}
                `}
                animate={{
                  scale: isHovered || isSelected ? 3 : isConnected ? 2 : 1.5,
                  opacity: (isHovered || isSelected ? 0.8 : isConnected ? 0.4 : 0.2) * star.brightness
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Star Core */}
              <motion.div
                className={`
                  relative z-10 w-4 h-4 rounded-full cursor-pointer
                  ${star.constellation === 'navigation' 
                    ? 'bg-gradient-to-br from-blue-300 to-blue-600' 
                    : 'bg-gradient-to-br from-purple-300 to-purple-600'
                  }
                  shadow-lg border border-white/30
                `}
                animate={{
                  scale: isHovered || isSelected ? 1.5 : isConnected ? 1.2 : 1,
                  boxShadow: isHovered || isSelected 
                    ? '0 0 20px rgba(59, 130, 246, 0.8)' 
                    : '0 0 10px rgba(255, 255, 255, 0.3)'
                }}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
              />

              {/* Star Label */}
              <AnimatePresence>
                {(isHovered || isSelected) && (
                  <motion.div
                    className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1 text-white text-sm">
                      <div className="flex items-center space-x-2">
                        <span>{star.icon}</span>
                        <span>{star.name}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Star Particles */}
              {isHovered && (
                <div className="absolute inset-0">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      animate={{
                        x: Math.cos((i * 60) * Math.PI / 180) * 20,
                        y: Math.sin((i * 60) * Math.PI / 180) * 20,
                        opacity: [1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.1
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )
        })}

        {/* Constellation Info */}
        <div className="absolute bottom-4 left-4 text-white/80">
          <div className="text-xs mb-2">Constellations</div>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-xs">Navigation</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-xs">Secondary</span>
            </div>
          </div>
        </div>

        {/* Selected Star Info */}
        {selectedStar && (
          <motion.div
            className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-sm">
              {stars.find(s => s.id === selectedStar)?.icon} {stars.find(s => s.id === selectedStar)?.name}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Brightness: {((stars.find(s => s.id === selectedStar)?.brightness || 0) * 100).toFixed(0)}%
            </div>
          </motion.div>
        )}
      </div>

      <div className="text-center mt-6 text-gray-400 text-sm">
        Hover over stars to see constellation connections
      </div>
    </div>
  )
} 