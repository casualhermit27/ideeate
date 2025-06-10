'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export function CrystallineInfoCard() {
  const [activeFacet, setActiveFacet] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15])
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15])

  const facets = [
    {
      id: 0,
      title: 'Technical Skills',
      icon: '⚙️',
      data: ['React', 'TypeScript', 'Node.js', 'Python'],
      color: 'from-blue-500 to-cyan-400'
    },
    {
      id: 1,
      title: 'Experience',
      icon: '🏆',
      data: ['5+ Years', 'Lead Developer', '50+ Projects', 'Team Management'],
      color: 'from-purple-500 to-pink-400'
    },
    {
      id: 2,
      title: 'Education',
      icon: '🎓',
      data: ['CS Degree', 'Certifications', 'Continuous Learning', 'Workshops'],
      color: 'from-green-500 to-emerald-400'
    },
    {
      id: 3,
      title: 'Interests',
      icon: '✨',
      data: ['AI/ML', 'Web3', 'Photography', 'Music'],
      color: 'from-orange-500 to-red-400'
    }
  ]

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  return (
    <div className="p-8">
      <motion.div
        ref={cardRef}
        className="relative w-80 h-96 mx-auto perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(0)
          mouseY.set(0)
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Crystal Base */}
        <div className="relative w-full h-full">
          {/* Main Crystal Body */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl"
            style={{
              clipPath: 'polygon(10% 0%, 90% 0%, 100% 25%, 95% 75%, 5% 75%, 0% 25%)'
            }}
          />

          {/* Faceted Surfaces */}
          {facets.map((facet, index) => {
            const angle = (index * 90) - 45
            const isActive = activeFacet === index
            
            return (
              <motion.div
                key={facet.id}
                className={`
                  absolute inset-0 cursor-pointer transform-gpu
                  bg-gradient-to-br ${facet.color}
                  backdrop-blur-sm border border-white/20
                `}
                style={{
                  clipPath: `polygon(
                    ${20 + index * 15}% ${10 + index * 5}%, 
                    ${80 - index * 15}% ${10 + index * 5}%, 
                    ${90 - index * 10}% ${40 + index * 10}%, 
                    ${85 - index * 15}% ${80 - index * 5}%, 
                    ${15 + index * 15}% ${80 - index * 5}%, 
                    ${10 + index * 10}% ${40 + index * 10}%
                  )`,
                  transform: `rotateY(${angle}deg) translateZ(${isActive ? 20 : 0}px)`,
                  opacity: isActive ? 0.9 : 0.3
                }}
                onClick={() => setActiveFacet(index)}
                whileHover={{ scale: 1.02 }}
                animate={{
                  opacity: isActive ? 0.9 : 0.3 + Math.sin(Date.now() * 0.001 + index) * 0.1
                }}
              >
                {/* Refraction Lines */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-white/20"
                      style={{
                        left: `${20 + i * 10}%`,
                        top: '0%',
                        width: '1px',
                        height: '100%',
                        transformOrigin: 'top'
                      }}
                      animate={{
                        rotate: Math.sin(Date.now() * 0.002 + i) * 15,
                        opacity: [0.2, 0.6, 0.2]
                      }}
                      transition={{
                        duration: 2 + i * 0.2,
                        repeat: Infinity
                      }}
                    />
                  ))}
                </div>

                {/* Facet Content */}
                {isActive && (
                  <motion.div
                    className="relative z-10 p-6 h-full flex flex-col justify-center text-white"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-4">{facet.icon}</div>
                      <h3 className="text-xl font-bold mb-4">{facet.title}</h3>
                      <div className="space-y-2">
                        {facet.data.map((item, i) => (
                          <motion.div
                            key={item}
                            className="bg-white/20 rounded-lg p-2 text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                          >
                            {item}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}

          {/* Light Refraction Effects */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(
                ${mouseX.get() * 0.5 + 45}deg,
                transparent 30%,
                rgba(255,255,255,0.3) 50%,
                transparent 70%
              )`
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          />

          {/* Crystal Edges */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="absolute left-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent transform rotate-12" />
            <div className="absolute right-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent transform -rotate-12" />
          </div>

          {/* Floating Particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            />
          ))}
        </div>

        {/* Facet Selector */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {facets.map((facet, index) => (
            <button
              key={facet.id}
              onClick={() => setActiveFacet(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${activeFacet === index 
                  ? 'bg-white scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
                }
              `}
            />
          ))}
        </div>
      </motion.div>

      <div className="text-center mt-20 text-gray-400 text-sm">
        Click facets to reveal different information layers
      </div>
    </div>
  )
} 