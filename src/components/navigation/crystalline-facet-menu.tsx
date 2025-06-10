'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function CrystallineFacetMenu() {
  const [isGrown, setIsGrown] = useState(false)
  const [activeFacet, setActiveFacet] = useState<number | null>(null)

  const crystalFacets = [
    { id: 1, label: 'Home', icon: '🏠', angle: 0, distance: 80, color: 'from-blue-500 to-cyan-400' },
    { id: 2, label: 'About', icon: '👤', angle: 60, distance: 90, color: 'from-purple-500 to-pink-400' },
    { id: 3, label: 'Work', icon: '💼', angle: 120, distance: 85, color: 'from-green-500 to-emerald-400' },
    { id: 4, label: 'Blog', icon: '📝', angle: 180, distance: 95, color: 'from-orange-500 to-red-400' },
    { id: 5, label: 'Contact', icon: '📧', angle: 240, distance: 88, color: 'from-pink-500 to-rose-400' },
    { id: 6, label: 'Gallery', icon: '🖼️', angle: 300, distance: 92, color: 'from-indigo-500 to-purple-400' },
  ]

  return (
    <div className="p-8">
      <div className="relative w-96 h-96 mx-auto">
        {/* Central Crystal Core */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          onClick={() => setIsGrown(!isGrown)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="relative w-16 h-16 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300"
            style={{
              clipPath: 'polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%)'
            }}
            animate={{
              rotate: isGrown ? 360 : 0,
              scale: isGrown ? 1.2 : 1
            }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          >
            {/* Crystal Facets */}
            <div className="absolute inset-1 bg-gradient-to-br from-white/80 to-transparent"
                 style={{ clipPath: 'polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%)' }} />
            
            {/* Core Light */}
            <motion.div
              className="absolute inset-0 bg-white/60"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)'
              }}
              animate={{
                opacity: isGrown ? [0.6, 1, 0.6] : 0.4
              }}
              transition={{ duration: 2, repeat: isGrown ? Infinity : 0 }}
            />
            
            <div className="absolute inset-0 flex items-center justify-center text-gray-700 text-xl">
              💎
            </div>
          </motion.div>
        </motion.div>

        {/* Growing Crystal Facets */}
        <AnimatePresence>
          {isGrown && crystalFacets.map((facet, index) => {
            const x = Math.cos(facet.angle * Math.PI / 180) * facet.distance
            const y = Math.sin(facet.angle * Math.PI / 180) * facet.distance
            
            return (
              <motion.div
                key={facet.id}
                className="absolute top-1/2 left-1/2 cursor-pointer"
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
                }}
                initial={{ 
                  scale: 0,
                  opacity: 0,
                  rotateZ: Math.random() * 360
                }}
                animate={{ 
                  scale: 1,
                  opacity: 1,
                  rotateZ: facet.angle
                }}
                exit={{ 
                  scale: 0,
                  opacity: 0
                }}
                transition={{ 
                  delay: index * 0.15,
                  duration: 0.8,
                  type: 'spring',
                  stiffness: 200
                }}
                onClick={() => setActiveFacet(facet.id)}
                onMouseEnter={() => setActiveFacet(facet.id)}
                onMouseLeave={() => setActiveFacet(null)}
                whileHover={{ scale: 1.1 }}
              >
                {/* Crystal Connection Line */}
                <motion.div
                  className="absolute w-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  style={{
                    height: facet.distance - 32,
                    left: '50%',
                    bottom: '50%',
                    transformOrigin: 'bottom',
                    transform: `translateX(-50%) rotate(${-facet.angle}deg)`
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                />

                {/* Crystal Facet */}
                <motion.div
                  className={`relative w-12 h-12 bg-gradient-to-br ${facet.color}`}
                  style={{
                    clipPath: activeFacet === facet.id 
                      ? 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                      : 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                  }}
                  animate={{
                    scale: activeFacet === facet.id ? 1.3 : 1,
                    filter: activeFacet === facet.id 
                      ? 'brightness(1.3) saturate(1.2)'
                      : 'brightness(1) saturate(1)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Crystal Surface */}
                  <div 
                    className="absolute inset-1 bg-gradient-to-br from-white/50 to-transparent"
                    style={{
                      clipPath: activeFacet === facet.id 
                        ? 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                        : 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                    }}
                  />

                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold">
                    {facet.icon}
                  </div>
                </motion.div>

                {/* Crystal Label */}
                <AnimatePresence>
                  {activeFacet === facet.id && (
                    <motion.div
                      className="absolute top-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                      initial={{ opacity: 0, y: -10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1 text-white text-sm">
                        <div className="flex items-center space-x-2">
                          <span>{facet.icon}</span>
                          <span>{facet.label}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="text-center mt-6 text-gray-400 text-sm">
        Click the diamond core to grow crystal facets
      </div>
    </div>
  )
} 