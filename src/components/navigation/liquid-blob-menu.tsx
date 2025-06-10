'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LiquidBlobMenu() {
  const [activeBlob, setActiveBlob] = useState<number | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const menuItems = [
    { id: 1, label: 'Home', icon: '🏠', color: 'from-blue-500 to-cyan-400' },
    { id: 2, label: 'About', icon: '👤', color: 'from-purple-500 to-pink-400' },
    { id: 3, label: 'Work', icon: '💼', color: 'from-green-500 to-emerald-400' },
    { id: 4, label: 'Contact', icon: '📧', color: 'from-orange-500 to-red-400' },
  ]

  return (
    <div className="p-8">
      <div className="relative w-96 h-96 mx-auto">
        {/* Central Blob */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="relative w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full"
            animate={{
              borderRadius: isExpanded ? '30%' : '50%',
              scale: isExpanded ? 1.2 : 1
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {/* Liquid Surface */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full"
              animate={{
                borderRadius: isExpanded ? '25%' : '50%'
              }}
              transition={{ duration: 0.6 }}
            />
            
            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl">
              ✨
            </div>
          </motion.div>
        </motion.div>

        {/* Menu Blobs */}
        <AnimatePresence>
          {isExpanded && menuItems.map((item, index) => {
            const angle = (index * 90) - 45
            const radius = 120
            const x = Math.cos(angle * Math.PI / 180) * radius
            const y = Math.sin(angle * Math.PI / 180) * radius
            
            return (
              <motion.div
                key={item.id}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 0,
                  opacity: 0
                }}
                animate={{ 
                  x, 
                  y, 
                  scale: 1,
                  opacity: 1
                }}
                exit={{ 
                  x: 0, 
                  y: 0, 
                  scale: 0,
                  opacity: 0
                }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 200
                }}
                onMouseEnter={() => setActiveBlob(item.id)}
                onMouseLeave={() => setActiveBlob(null)}
                whileHover={{ scale: 1.1 }}
              >
                {/* Liquid Connection */}
                <motion.div
                  className="absolute w-1 h-24 bg-gradient-to-b from-indigo-500/40 to-transparent"
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: 'bottom',
                    transform: `translateX(-50%) translateY(-100%) rotate(${-angle}deg)`
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                />

                {/* Blob */}
                <motion.div
                  className={`relative w-16 h-16 bg-gradient-to-br ${item.color} shadow-lg`}
                  animate={{
                    borderRadius: activeBlob === item.id ? '20%' : '40%',
                    scale: activeBlob === item.id ? 1.2 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Liquid Surface Effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{
                      borderRadius: activeBlob === item.id ? '15%' : '35%',
                      background: activeBlob === item.id 
                        ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 70%)'
                        : 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2), transparent 70%)'
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center text-white text-xl">
                    {item.icon}
                  </div>

                  {/* Ripple Effect */}
                  {activeBlob === item.id && (
                    <motion.div
                      className="absolute inset-0 border-2 border-white/50"
                      animate={{
                        scale: [1, 1.5],
                        opacity: [0.8, 0],
                        borderRadius: ['20%', '50%']
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity
                      }}
                    />
                  )}
                </motion.div>

                {/* Label */}
                <AnimatePresence>
                  {activeBlob === item.id && (
                    <motion.div
                      className="absolute top-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm">
                        {item.label}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      <div className="text-center mt-6 text-gray-400 text-sm">
        Click the center blob to expand the liquid menu
      </div>
    </div>
  )
} 