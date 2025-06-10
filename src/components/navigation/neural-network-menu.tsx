'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Neuron {
  id: number
  label: string
  icon: string
  x: number
  y: number
  layer: number
  isActive: boolean
  connections: number[]
}

export function NeuralNetworkMenu() {
  const [isActive, setIsActive] = useState(false)
  const [selectedNeuron, setSelectedNeuron] = useState<number | null>(null)
  const [synapticFiring, setSynapticFiring] = useState<{from: number, to: number}[]>([])

  const neurons: Neuron[] = [
    // Input Layer
    { id: 1, label: 'Home', icon: '🏠', x: 20, y: 50, layer: 1, isActive: false, connections: [4, 5, 6] },
    { id: 2, label: 'About', icon: '👤', x: 20, y: 30, layer: 1, isActive: false, connections: [4, 5] },
    { id: 3, label: 'Contact', icon: '📧', x: 20, y: 70, layer: 1, isActive: false, connections: [5, 6] },
    
    // Hidden Layer
    { id: 4, label: 'Skills', icon: '⚡', x: 50, y: 35, layer: 2, isActive: false, connections: [7, 8] },
    { id: 5, label: 'Projects', icon: '💼', x: 50, y: 50, layer: 2, isActive: false, connections: [7, 8, 9] },
    { id: 6, label: 'Experience', icon: '🏆', x: 50, y: 65, layer: 2, isActive: false, connections: [8, 9] },
    
    // Output Layer
    { id: 7, label: 'Portfolio', icon: '🎨', x: 80, y: 40, layer: 3, isActive: false, connections: [] },
    { id: 8, label: 'Resume', icon: '📄', x: 80, y: 50, layer: 3, isActive: false, connections: [] },
    { id: 9, label: 'Blog', icon: '📝', x: 80, y: 60, layer: 3, isActive: false, connections: [] },
  ]

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      // Random synaptic firing
      const activeNeurons = neurons.filter(n => Math.random() > 0.7)
      const firings: {from: number, to: number}[] = []
      
      activeNeurons.forEach(neuron => {
        neuron.connections.forEach(connectionId => {
          if (Math.random() > 0.5) {
            firings.push({ from: neuron.id, to: connectionId })
          }
        })
      })
      
      setSynapticFiring(firings)
      
      setTimeout(() => setSynapticFiring([]), 500)
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive])

  const getNeuronPosition = (neuronId: number) => {
    const neuron = neurons.find(n => n.id === neuronId)
    return neuron ? { x: neuron.x, y: neuron.y } : { x: 0, y: 0 }
  }

  const getLayerColor = (layer: number) => {
    switch (layer) {
      case 1: return 'from-blue-500 to-cyan-400'
      case 2: return 'from-purple-500 to-pink-400'
      case 3: return 'from-green-500 to-emerald-400'
      default: return 'from-gray-500 to-gray-400'
    }
  }

  return (
    <div className="p-8">
      <div className="text-center mb-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            isActive 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          {isActive ? 'Deactivate Network' : 'Activate Network'}
        </button>
      </div>

      <div className="relative w-96 h-80 mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl overflow-hidden border border-white/10">
        {/* Neural Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {neurons.map(neuron => 
            neuron.connections.map(connectionId => {
              const fromPos = { x: neuron.x, y: neuron.y }
              const toPos = getNeuronPosition(connectionId)
              const isFiring = synapticFiring.some(s => s.from === neuron.id && s.to === connectionId)
              const isConnectedToSelected = selectedNeuron === neuron.id || selectedNeuron === connectionId
              
              return (
                <motion.line
                  key={`${neuron.id}-${connectionId}`}
                  x1={`${fromPos.x}%`}
                  y1={`${fromPos.y}%`}
                  x2={`${toPos.x}%`}
                  y2={`${toPos.y}%`}
                  stroke={isFiring ? '#60a5fa' : isConnectedToSelected ? '#a855f7' : 'rgba(255,255,255,0.1)'}
                  strokeWidth={isFiring ? '3' : isConnectedToSelected ? '2' : '1'}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: isActive ? 1 : 0,
                    opacity: isActive ? (isFiring ? 1 : isConnectedToSelected ? 0.8 : 0.3) : 0,
                    stroke: isFiring ? '#60a5fa' : isConnectedToSelected ? '#a855f7' : 'rgba(255,255,255,0.1)'
                  }}
                  transition={{ duration: 0.8, delay: Math.random() * 0.5 }}
                />
              )
            })
          )}
          
          {/* Synaptic Firing Animation */}
          {synapticFiring.map((firing, index) => {
            const fromPos = getNeuronPosition(firing.from)
            const toPos = getNeuronPosition(firing.to)
            
            return (
              <motion.circle
                key={`firing-${index}`}
                r="3"
                fill="#60a5fa"
                initial={{ 
                  cx: `${fromPos.x}%`, 
                  cy: `${fromPos.y}%`,
                  opacity: 1
                }}
                animate={{ 
                  cx: `${toPos.x}%`, 
                  cy: `${toPos.y}%`,
                  opacity: 0
                }}
                transition={{ duration: 0.5 }}
              />
            )
          })}
        </svg>

        {/* Neurons */}
        {neurons.map((neuron, index) => {
          const isSelected = selectedNeuron === neuron.id
          const isConnected = selectedNeuron ? neurons.find(n => n.id === selectedNeuron)?.connections.includes(neuron.id) : false
          const isFiring = synapticFiring.some(s => s.from === neuron.id || s.to === neuron.id)
          
          return (
            <motion.div
              key={neuron.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${neuron.x}%`,
                top: `${neuron.y}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isActive ? 1 : 0,
                opacity: isActive ? 1 : 0
              }}
              transition={{ 
                delay: neuron.layer * 0.2 + index * 0.1,
                duration: 0.5,
                type: 'spring'
              }}
              onClick={() => setSelectedNeuron(isSelected ? null : neuron.id)}
              onMouseEnter={() => setSelectedNeuron(neuron.id)}
              onMouseLeave={() => setSelectedNeuron(null)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Neuron Activation Ring */}
              {(isSelected || isConnected || isFiring) && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  style={{
                    borderColor: isFiring ? '#60a5fa' : isSelected ? '#a855f7' : '#10b981'
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 0.3, 0.8]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity
                  }}
                />
              )}

              {/* Neuron Body */}
              <motion.div
                className={`
                  relative w-10 h-10 rounded-full 
                  bg-gradient-to-br ${getLayerColor(neuron.layer)}
                  shadow-lg border border-white/20
                `}
                animate={{
                  scale: isSelected ? 1.2 : isConnected ? 1.1 : 1,
                  boxShadow: isFiring 
                    ? '0 0 20px rgba(96, 165, 250, 0.8)'
                    : isSelected 
                      ? '0 0 15px rgba(168, 85, 247, 0.6)'
                      : '0 0 10px rgba(255, 255, 255, 0.1)'
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Neural Activity */}
                <motion.div
                  className="absolute inset-1 rounded-full bg-gradient-to-br from-white/30 to-transparent"
                  animate={{
                    opacity: isFiring ? [0.3, 1, 0.3] : isSelected ? 0.6 : 0.3
                  }}
                  transition={{
                    duration: isFiring ? 0.2 : 1,
                    repeat: isFiring ? 3 : 0
                  }}
                />

                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-sm">
                  {neuron.icon}
                </div>

                {/* Electrical Activity */}
                {isFiring && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(96, 165, 250, 0.6) 0%, transparent 70%)'
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.8, 0.3, 0.8]
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: 3
                    }}
                  />
                )}
              </motion.div>

              {/* Label */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    className="absolute top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1 text-white text-sm">
                      <div className="flex items-center space-x-2">
                        <span>{neuron.icon}</span>
                        <span>{neuron.label}</span>
                        <span className="text-xs text-gray-400">Layer {neuron.layer}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}

        {/* Layer Labels */}
        {isActive && (
          <>
            <div className="absolute left-4 top-4 text-blue-400 text-xs">Input Layer</div>
            <div className="absolute left-1/2 top-4 transform -translate-x-1/2 text-purple-400 text-xs">Hidden Layer</div>
            <div className="absolute right-4 top-4 text-green-400 text-xs">Output Layer</div>
          </>
        )}

        {/* Background Neural Particles */}
        {isActive && Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="text-center mt-6 text-gray-400 text-sm">
        Hover over neurons to see network connections and synaptic firing
      </div>
    </div>
  )
} 