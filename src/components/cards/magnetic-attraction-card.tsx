'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'

export function MagneticAttractionCard() {
  const [isAttracted, setIsAttracted] = useState(false)
  const [isSnapped, setIsSnapped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { stiffness: 200, damping: 20 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)
  const scale = useSpring(1, springConfig)
  const rotate = useSpring(0, springConfig)

  const magneticForce = useTransform([mouseX, mouseY], ([mx, my]: number[]) => {
    if (!isAttracted) return { x: 0, y: 0 }
    const distance = Math.sqrt(mx * mx + my * my)
    const maxDistance = 200
    const force = Math.max(0, 1 - distance / maxDistance)
    return {
      x: mx * force * 0.3,
      y: my * force * 0.3
    }
  })

  useEffect(() => {
    return magneticForce.onChange(({ x: fx, y: fy }) => {
      x.set(fx)
      y.set(fy)
      
      // Add rotation based on magnetic field direction
      const angle = Math.atan2(fy, fx) * (180 / Math.PI) * 0.1
      rotate.set(angle)
    })
  }, [magneticForce, x, y, rotate])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !cardRef.current) return
    
    const containerRect = containerRef.current.getBoundingClientRect()
    const cardRect = cardRef.current.getBoundingClientRect()
    
    const containerCenterX = containerRect.left + containerRect.width / 2
    const containerCenterY = containerRect.top + containerRect.height / 2
    const cardCenterX = cardRect.left + cardRect.width / 2
    const cardCenterY = cardRect.top + cardRect.height / 2
    
    const deltaX = e.clientX - cardCenterX
    const deltaY = e.clientY - cardCenterY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    
    mouseX.set(deltaX)
    mouseY.set(deltaY)
    
    // Magnetic attraction threshold
    if (distance < 150) {
      setIsAttracted(true)
      scale.set(1.1)
      
      // Snap effect when very close
      if (distance < 50) {
        setIsSnapped(true)
        scale.set(1.2)
        x.set(deltaX * 0.8)
        y.set(deltaY * 0.8)
      } else {
        setIsSnapped(false)
      }
    } else {
      setIsAttracted(false)
      setIsSnapped(false)
      scale.set(1)
      x.set(0)
      y.set(0)
      rotate.set(0)
    }
  }

  const handleMouseLeave = () => {
    setIsAttracted(false)
    setIsSnapped(false)
    scale.set(1)
    x.set(0)
    y.set(0)
    rotate.set(0)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-96 p-8 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Magnetic Field Visualization */}
      {isAttracted && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (i / 20) * 360
            return (
              <motion.div
                key={i}
                className="absolute w-px h-20 bg-blue-400/30"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'bottom center'
                }}
                animate={{
                  rotate: angle,
                  opacity: isAttracted ? 0.6 : 0,
                  scaleY: isSnapped ? 1.5 : 1
                }}
                transition={{ duration: 0.3 }}
              />
            )
          })}
        </div>
      )}

      {/* Attraction Indicators */}
      {isAttracted && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: Math.cos((i * 45) * Math.PI / 180) * (isSnapped ? 100 : 80),
                y: Math.sin((i * 45) * Math.PI / 180) * (isSnapped ? 100 : 80),
                scale: [1, 0.5, 1],
                opacity: [0.8, 0.3, 0.8]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Main Card */}
      <motion.div
        ref={cardRef}
        className={`
          relative w-80 h-64 mx-auto cursor-pointer transform-gpu
          bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900
          backdrop-blur-sm border border-white/20 rounded-2xl
          shadow-2xl
          ${isAttracted ? 'shadow-blue-500/30' : ''}
          ${isSnapped ? 'shadow-blue-500/50' : ''}
        `}
        style={{
          x,
          y,
          scale,
          rotate
        }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Magnetic Field Lines on Card */}
        {isAttracted && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-blue-400/40"
                style={{
                  left: `${10 + i * 7}%`,
                  top: '0%',
                  width: '1px',
                  height: '100%'
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scaleY: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        )}

        {/* Card Content */}
        <div className="relative z-10 p-6 h-full flex flex-col justify-center text-white">
          <div className="text-center">
            {/* Magnetic Icon */}
            <motion.div
              className="text-6xl mb-4"
              animate={{
                rotate: isAttracted ? 360 : 0,
                scale: isSnapped ? 1.3 : 1
              }}
              transition={{ duration: 0.5 }}
            >
              🧲
            </motion.div>

            <h2 className="text-2xl font-bold mb-2">Magnetic Card</h2>
            <p className="text-gray-300 text-sm mb-4">
              This card is attracted to your cursor with realistic magnetic physics
            </p>

            {/* Status Indicators */}
            <div className="space-y-2">
              <div className={`
                px-3 py-1 rounded-full text-xs font-medium transition-all duration-300
                ${isSnapped 
                  ? 'bg-red-500/20 text-red-300' 
                  : isAttracted 
                    ? 'bg-blue-500/20 text-blue-300' 
                    : 'bg-gray-500/20 text-gray-300'
                }
              `}>
                {isSnapped ? 'SNAPPED' : isAttracted ? 'ATTRACTED' : 'NEUTRAL'}
              </div>
              
              <div className="text-xs text-gray-400">
                Distance: {isAttracted ? (isSnapped ? 'Very Close' : 'Near') : 'Far'}
              </div>
            </div>
          </div>
        </div>

        {/* Electromagnetic Aura */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, 
              ${isSnapped 
                ? 'rgba(239, 68, 68, 0.3)' 
                : isAttracted 
                  ? 'rgba(59, 130, 246, 0.2)' 
                  : 'transparent'
              } 0%, 
              transparent 70%
            )`
          }}
          animate={{
            scale: isAttracted ? [1, 1.1, 1] : 1,
            opacity: isAttracted ? 1 : 0
          }}
          transition={{
            duration: 2,
            repeat: isAttracted ? Infinity : 0
          }}
        />

        {/* Magnetic Force Arrows */}
        {isAttracted && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 4 }).map((_, i) => {
              const positions = [
                { top: '10%', left: '50%', rotate: '0deg' },
                { top: '50%', right: '10%', rotate: '90deg' },
                { bottom: '10%', left: '50%', rotate: '180deg' },
                { top: '50%', left: '10%', rotate: '270deg' }
              ]
              return (
                <motion.div
                  key={i}
                  className="absolute text-blue-400 text-xl"
                  style={positions[i]}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                >
                  ⬆️
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-gray-400 text-sm">
        Move your cursor near the card to activate magnetic attraction
      </div>
    </div>
  )
} 