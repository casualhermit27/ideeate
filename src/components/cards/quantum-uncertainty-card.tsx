'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface QuantumState {
  id: string
  title: string
  content: string
  color: string
  probability: number
  icon: string
}

export function QuantumUncertaintyCard() {
  const [isObserved, setIsObserved] = useState(false)
  const [collapsedState, setCollapsedState] = useState<QuantumState | null>(null)
  const [waveIntensity, setWaveIntensity] = useState(1)
  const cardRef = useRef<HTMLDivElement>(null)

  const quantumStates: QuantumState[] = [
    {
      id: 'particle',
      title: 'Particle State',
      content: 'Discrete, localized, measurable',
      color: 'from-blue-600 to-cyan-400',
      probability: 0.25,
      icon: '⚛️'
    },
    {
      id: 'wave',
      title: 'Wave State',
      content: 'Continuous, distributed, flowing',
      color: 'from-green-600 to-emerald-400',
      probability: 0.35,
      icon: '🌊'
    },
    {
      id: 'energy',
      title: 'Energy State',
      content: 'Pure potential, infinite possibilities',
      color: 'from-purple-600 to-pink-400',
      probability: 0.25,
      icon: '⚡'
    },
    {
      id: 'void',
      title: 'Void State',
      content: 'Quantum vacuum, zero-point field',
      color: 'from-gray-800 to-black',
      probability: 0.15,
      icon: '🕳️'
    }
  ]

  const observe = () => {
    if (isObserved) return
    
    setIsObserved(true)
    
    // Quantum measurement - collapse to one state based on probabilities
    const random = Math.random()
    let cumulativeProbability = 0
    
    for (const state of quantumStates) {
      cumulativeProbability += state.probability
      if (random <= cumulativeProbability) {
        setCollapsedState(state)
        break
      }
    }
  }

  const reset = () => {
    setIsObserved(false)
    setCollapsedState(null)
    setWaveIntensity(1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveIntensity(Math.random() * 2 + 0.5)
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-8">
      <div className="text-center mb-6">
        <button
          onClick={observe}
          disabled={isObserved}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 mr-4"
        >
          Observe
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Reset
        </button>
      </div>

      <div
        ref={cardRef}
        className="relative w-80 h-96 mx-auto cursor-pointer"
        onClick={observe}
      >
        <AnimatePresence mode="wait">
          {!isObserved ? (
            // Superposition State - Multiple overlapping cards
            <motion.div
              key="superposition"
              className="relative w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {quantumStates.map((state, index) => (
                <motion.div
                  key={state.id}
                  className={`
                    absolute inset-0 rounded-2xl bg-gradient-to-br ${state.color}
                    backdrop-blur-sm border border-white/20 p-6
                  `}
                  style={{
                    zIndex: index,
                    opacity: state.probability * waveIntensity
                  }}
                  animate={{
                    x: Math.sin(Date.now() * 0.001 + index) * 20,
                    y: Math.cos(Date.now() * 0.001 + index) * 20,
                    rotate: Math.sin(Date.now() * 0.002 + index) * 10,
                    scale: 0.9 + Math.sin(Date.now() * 0.003 + index) * 0.1
                  }}
                  transition={{
                    duration: 0.1,
                    ease: 'linear'
                  }}
                >
                  {/* Probability Wave Pattern */}
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-full h-px bg-white/30"
                        style={{
                          top: `${20 + i * 20}%`,
                        }}
                        animate={{
                          opacity: [0.3, 0.8, 0.3],
                          scaleX: [0.5, 1.5, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10 text-white">
                    <div className="text-4xl mb-4">{state.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{state.title}</h3>
                    <p className="text-sm opacity-80">{state.content}</p>
                    <div className="mt-4">
                      <div className="text-xs opacity-60">Probability</div>
                      <div className="text-xl font-bold">
                        {(state.probability * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Uncertainty Principle Indicator */}
              <motion.div
                className="absolute top-4 right-4 bg-black/50 rounded-lg p-2"
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity
                }}
              >
                <div className="text-white text-xs">
                  <div>ΔE × Δt ≥ ℏ/2</div>
                  <div className="text-gray-300">Superposition</div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            // Collapsed State - Single definite state
            <motion.div
              key="collapsed"
              className={`
                w-full h-full rounded-2xl bg-gradient-to-br ${collapsedState?.color}
                backdrop-blur-sm border border-white/20 p-6 text-white
              `}
              initial={{ 
                scale: 0,
                rotate: 180,
                opacity: 0
              }}
              animate={{ 
                scale: 1,
                rotate: 0,
                opacity: 1
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20
              }}
            >
              {/* Measurement Effect */}
              <motion.div
                className="absolute inset-0 bg-white rounded-2xl"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />

              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{collapsedState?.icon}</div>
                  <h2 className="text-2xl font-bold mb-2">{collapsedState?.title}</h2>
                  <p className="text-lg opacity-90">{collapsedState?.content}</p>
                </div>

                <div className="text-center">
                  <div className="bg-white/20 rounded-lg p-4 mb-4">
                    <div className="text-xs opacity-60 mb-1">Collapsed Probability</div>
                    <div className="text-3xl font-bold">100%</div>
                  </div>

                  <div className="text-sm opacity-80">
                    Wave function collapsed upon observation
                  </div>
                </div>

                {/* Quantum Collapse Animation */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      animate={{
                        x: Math.cos((i * 360) / 12 * Math.PI / 180) * 100,
                        y: Math.sin((i * 360) / 12 * Math.PI / 180) * 100,
                        opacity: [1, 0]
                      }}
                      transition={{
                        duration: 1,
                        ease: 'easeOut'
                      }}
                    />
                  ))}
                </motion.div>
              </div>

              {/* Measurement Indicator */}
              <div className="absolute top-4 right-4 bg-black/50 rounded-lg p-2">
                <div className="text-white text-xs">
                  <div>📏 Measured</div>
                  <div className="text-green-300">Definite State</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quantum Field Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-6 text-gray-400 text-sm">
        Click to observe and collapse the wave function
      </div>
    </div>
  )
} 