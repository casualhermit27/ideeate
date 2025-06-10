'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

export function OrbitalRingMenu() {
  const [isActive, setIsActive] = useState(false)
  const [selectedOrbit, setSelectedOrbit] = useState<number | null>(null)
  const controls = useAnimation()

  const orbitItems = [
    { id: 1, label: 'Home', icon: '🏠', radius: 100, speed: 0.02, color: 'bg-blue-500' },
    { id: 2, label: 'About', icon: '👤', radius: 100, speed: 0.025, color: 'bg-purple-500' },
    { id: 3, label: 'Work', icon: '💼', radius: 100, speed: 0.03, color: 'bg-green-500' },
    { id: 4, label: 'Blog', icon: '📝', radius: 130, speed: 0.015, color: 'bg-orange-500' },
    { id: 5, label: 'Contact', icon: '📧', radius: 130, speed: 0.02, color: 'bg-red-500' },
    { id: 6, label: 'Gallery', icon: '🖼️', radius: 160, speed: 0.01, color: 'bg-pink-500' },
  ]

  useEffect(() => {
    if (isActive) {
      controls.start('active')
    } else {
      controls.start('inactive')
    }
  }, [isActive, controls])

  return (
    <div className="p-8">
      <div className="relative w-96 h-96 mx-auto">
        {/* Central Gravitational Body */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          onClick={() => setIsActive(!isActive)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="relative w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-2xl"
            animate={{
              boxShadow: isActive 
                ? '0 0 40px rgba(251, 191, 36, 0.8), 0 0 80px rgba(251, 191, 36, 0.4)'
                : '0 0 20px rgba(251, 191, 36, 0.4)'
            }}
            transition={{ duration: 0.5 }}
          >
            {/* Central Core */}
            <div className="absolute inset-2 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full" />
            
            {/* Gravitational Waves */}
            {isActive && (
              <>
                {[1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    className="absolute border border-yellow-400/30 rounded-full"
                    style={{
                      width: ring * 40,
                      height: ring * 40,
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 0.2, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: ring * 0.3
                    }}
                  />
                ))}
              </>
            )}
            
            <div className="absolute inset-0 flex items-center justify-center text-white text-xl">
              ⚡
            </div>
          </motion.div>
        </motion.div>

        {/* Orbital Items */}
        {orbitItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={isActive ? {
              rotate: 360,
              transition: {
                duration: 100 / (item.speed * 100),
                repeat: Infinity,
                ease: 'linear'
              }
            } : {}}
          >
            <motion.div
              className="cursor-pointer"
              style={{
                transform: `translate(-50%, -50%) translateX(${item.radius}px)`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={controls}
              variants={{
                inactive: { scale: 0, opacity: 0 },
                active: { 
                  scale: 1, 
                  opacity: 1,
                  transition: { delay: index * 0.1 }
                }
              }}
              onClick={() => setSelectedOrbit(item.id)}
              onMouseEnter={() => setSelectedOrbit(item.id)}
              onMouseLeave={() => setSelectedOrbit(null)}
              whileHover={{ scale: 1.2 }}
            >
              {/* Orbital Trail */}
              {isActive && (
                <motion.div
                  className="absolute w-2 h-2 bg-white/20 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                />
              )}

              {/* Planet/Item */}
              <motion.div
                className={`relative w-12 h-12 ${item.color} rounded-full shadow-lg`}
                animate={{
                  scale: selectedOrbit === item.id ? 1.3 : 1,
                  boxShadow: selectedOrbit === item.id 
                    ? '0 0 20px rgba(255, 255, 255, 0.8)'
                    : '0 0 10px rgba(0, 0, 0, 0.3)'
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Surface Details */}
                <div className="absolute inset-1 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-lg">
                  {item.icon}
                </div>

                {/* Atmospheric Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${item.color.replace('bg-', 'rgba(')} 0%, transparent 70%)`
                  }}
                  animate={{
                    scale: selectedOrbit === item.id ? 2 : 1.5,
                    opacity: selectedOrbit === item.id ? 0.6 : 0.3
                  }}
                />
              </motion.div>

              {/* Label */}
              {selectedOrbit === item.id && (
                <motion.div
                  className="absolute top-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm">
                    {item.label}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ))}

        {/* Orbital Rings */}
        {isActive && [100, 130, 160].map((radius, index) => (
          <motion.div
            key={radius}
            className="absolute border border-white/10 rounded-full pointer-events-none"
            style={{
              width: radius * 2,
              height: radius * 2,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          />
        ))}

        {/* Gravitational Field Visualization */}
        {isActive && Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-yellow-400/20"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: Math.cos((i * 12) * Math.PI / 180) * (50 + Math.random() * 100),
              y: Math.sin((i * 12) * Math.PI / 180) * (50 + Math.random() * 100),
              opacity: [0, 1, 0],
              scale: [0, 2, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="text-center mt-6 text-gray-400 text-sm">
        Click the central star to activate orbital mechanics
      </div>
    </div>
  )
} 