'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MorphingProfileCardProps {
  profile?: {
    name: string
    role: 'developer' | 'designer' | 'manager' | 'freelancer'
    avatar: string
    skills: string[]
    experience: string
    location: string
  }
}

export function MorphingProfileCard({
  profile = {
    name: 'Alex Rivera',
    role: 'developer',
    avatar: '👨‍💻',
    skills: ['React', 'TypeScript', 'Node.js'],
    experience: '5 years',
    location: 'San Francisco'
  }
}: MorphingProfileCardProps) {
  const [currentRole, setCurrentRole] = useState(profile.role)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const roleConfigs = {
    developer: {
      shape: 'rounded-2xl',
      gradient: 'from-green-600 via-blue-600 to-purple-600',
      layout: 'vertical',
      icon: '💻',
      color: 'text-green-400',
      bgPattern: 'bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.3)_0%,transparent_50%)]'
    },
    designer: {
      shape: 'rounded-full',
      gradient: 'from-pink-600 via-purple-600 to-indigo-600',
      layout: 'circular',
      icon: '🎨',
      color: 'text-pink-400',
      bgPattern: 'bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.3)_0%,transparent_50%)]'
    },
    manager: {
      shape: 'rounded-lg',
      gradient: 'from-orange-600 via-red-600 to-yellow-600',
      layout: 'horizontal',
      icon: '📊',
      color: 'text-orange-400',
      bgPattern: 'bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.3)_0%,transparent_50%)]'
    },
    freelancer: {
      shape: 'rounded-3xl',
      gradient: 'from-cyan-600 via-teal-600 to-emerald-600',
      layout: 'asymmetric',
      icon: '✨',
      color: 'text-cyan-400',
      bgPattern: 'bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.3)_0%,transparent_50%)]'
    }
  }

  const config = roleConfigs[currentRole]

  const morphRole = async (newRole: typeof currentRole) => {
    if (newRole === currentRole || isTransitioning) return
    
    setIsTransitioning(true)
    await new Promise(resolve => setTimeout(resolve, 300))
    setCurrentRole(newRole)
    await new Promise(resolve => setTimeout(resolve, 300))
    setIsTransitioning(false)
  }

  const liquidVariants = {
    initial: { 
      scale: 0.8, 
      opacity: 0,
      borderRadius: '50%',
      filter: 'blur(10px)'
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      borderRadius: config.shape.includes('full') ? '50%' : 
                   config.shape.includes('3xl') ? '24px' :
                   config.shape.includes('2xl') ? '16px' : '8px',
      filter: 'blur(0px)'
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      borderRadius: '0%',
      filter: 'blur(10px)'
    }
  }

  const getLayoutStyle = () => {
    switch (config.layout) {
      case 'vertical':
        return 'flex-col items-center'
      case 'horizontal':
        return 'flex-row items-center space-x-4'
      case 'circular':
        return 'flex-col items-center'
      case 'asymmetric':
        return 'flex-col items-start'
      default:
        return 'flex-col items-center'
    }
  }

  return (
    <div className="p-8">
      {/* Role Selector */}
      <div className="flex justify-center space-x-2 mb-6">
        {Object.keys(roleConfigs).map((role) => (
          <button
            key={role}
            onClick={() => morphRole(role as typeof currentRole)}
            className={`
              px-3 py-1 rounded-full text-xs font-medium transition-all duration-300
              ${currentRole === role 
                ? 'bg-white text-black' 
                : 'bg-white/20 text-white hover:bg-white/30'
              }
            `}
          >
            {role}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentRole}
          variants={liquidVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
            duration: 0.6
          }}
          className={`
            relative w-80 h-96 cursor-pointer transform-gpu
            bg-gradient-to-br ${config.gradient}
            ${config.bgPattern}
            backdrop-blur-sm border border-white/20
            overflow-hidden
          `}
        >
          {/* Liquid Background Effect */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                `radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                `radial-gradient(circle at 40% 40%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Content Container */}
          <motion.div
            className={`
              relative z-10 p-6 h-full flex ${getLayoutStyle()}
              ${config.layout === 'horizontal' ? 'justify-start' : 'justify-center'}
            `}
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Avatar Section */}
            <motion.div
              className={`
                flex items-center justify-center text-6xl mb-4
                ${config.layout === 'circular' ? 'w-24 h-24 rounded-full bg-white/20' : ''}
              `}
              layout
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <motion.span
                key={`${currentRole}-avatar`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2 }}
              >
                {profile.avatar}
              </motion.span>
            </motion.div>

            {/* Info Section */}
            <motion.div 
              className={`
                text-center 
                ${config.layout === 'horizontal' ? 'text-left flex-1' : ''}
                ${config.layout === 'asymmetric' ? 'text-left w-full' : ''}
              `}
              layout
            >
              <motion.h3
                className="text-white font-bold text-xl mb-2"
                layout
                key={`${currentRole}-name`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {profile.name}
              </motion.h3>

              <motion.div
                className={`flex items-center gap-2 mb-3 ${
                  config.layout === 'horizontal' || config.layout === 'asymmetric' 
                    ? 'justify-start' : 'justify-center'
                }`}
                layout
              >
                <span className="text-2xl">{config.icon}</span>
                <span className={`font-medium ${config.color} capitalize`}>
                  {currentRole}
                </span>
              </motion.div>

              <motion.div
                className="space-y-2 text-white/80 text-sm"
                layout
                key={`${currentRole}-details`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div>📍 {profile.location}</div>
                <div>⏱️ {profile.experience}</div>
              </motion.div>

              {/* Skills Section */}
              <motion.div
                className="mt-4"
                layout
                key={`${currentRole}-skills`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-white/60 text-xs mb-2">Skills</div>
                <div className={`
                  flex flex-wrap gap-1 
                  ${config.layout === 'horizontal' || config.layout === 'asymmetric' 
                    ? 'justify-start' : 'justify-center'
                  }
                `}>
                  {profile.skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="px-2 py-1 bg-white/20 rounded-full text-xs text-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Morphing Border Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `conic-gradient(from 0deg, transparent, ${config.color.replace('text-', 'rgb(')}, transparent)`
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.5 }}
          />

          {/* Liquid Transition Overlay */}
          {isTransitioning && (
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ clipPath: 'circle(0% at 50% 50%)' }}
              animate={{ clipPath: 'circle(100% at 50% 50%)' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 