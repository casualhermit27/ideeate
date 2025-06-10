'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Code2, Sparkles, Calendar, ChevronLeft, ChevronRight, Menu, X, Search, Heart, Star, ShoppingCart, Download, Play, Pause, Volume2, SkipBack, SkipForward, Plus } from 'lucide-react'
import FloatingNavbar from '@/components/floating-navbar'
import { Button } from '@/components/ui/button'

const categories = [
	'All',
	'Buttons',
	'Navigation', 
	'Cards',
	'Forms',
	'Calendars',
	'Scrollbars',
	'Animations',
	'Glassmorphism',
	'Audio Players',
	'E-commerce'
]

// Live Preview Components
const GlassmorphismButton = () => (
	<motion.button 
		whileHover={{ scale: 1.05, y: -2 }}
		whileTap={{ scale: 0.95 }}
		className="relative overflow-hidden px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium shadow-2xl hover:shadow-white/25 transition-all duration-300"
	>
		<div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
		<span className="relative z-10">Glassmorphism</span>
	</motion.button>
)

const NeonGlowButton = () => (
	<motion.button 
		whileHover={{ scale: 1.05 }}
		whileTap={{ scale: 0.95 }}
		className="relative px-8 py-4 bg-black border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg overflow-hidden group hover:text-black transition-colors duration-300"
	>
		<span className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
		<span className="relative z-10">NEON GLOW</span>
		<div className="absolute inset-0 rounded-lg shadow-[0_0_20px_#00ffff,0_0_40px_#00ffff,0_0_60px_#00ffff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
	</motion.button>
)

const FloatingNavigation = () => (
	<motion.nav 
		initial={{ y: -20, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		className="relative px-6 py-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
	>
		<div className="flex items-center space-x-8">
			<span className="text-white font-bold text-sm">Brand</span>
			<div className="flex space-x-4">
				{['Home', 'About', 'Contact'].map((item) => (
					<motion.a 
						key={item}
						href="#" 
						whileHover={{ scale: 1.1, color: '#ffffff' }}
						className="text-gray-300 hover:text-white transition-colors text-sm"
					>
						{item}
					</motion.a>
				))}
			</div>
		</div>
	</motion.nav>
)

const CrystallineCard = () => (
	<motion.div 
		whileHover={{ scale: 1.02, rotateY: 2 }}
		className="relative overflow-hidden p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl group"
	>
		<div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
		<div className="relative z-10">
			<h3 className="text-lg font-bold text-white mb-2">Crystalline</h3>
			<p className="text-gray-300 text-sm mb-4">Glass-like effect with gradients.</p>
			<motion.button 
				whileHover={{ scale: 1.05 }}
				className="px-4 py-2 bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/30 text-sm"
			>
				Explore →
			</motion.button>
		</div>
	</motion.div>
)

const CustomScrollbar = () => (
	<div className="relative">
		<div className="h-32 overflow-y-auto pr-4 custom-scrollbar bg-gray-900/50 rounded-lg p-3">
			<div className="space-y-3">
				{Array.from({ length: 8 }, (_, i) => (
					<div key={i} className="p-2 bg-white/10 rounded text-white text-sm">
						Scrollable content item {i + 1}
					</div>
				))}
			</div>
		</div>
		<style jsx>{`
			.custom-scrollbar::-webkit-scrollbar {
				width: 6px;
			}
			.custom-scrollbar::-webkit-scrollbar-track {
				background: rgba(255,255,255,0.1);
				border-radius: 10px;
			}
			.custom-scrollbar::-webkit-scrollbar-thumb {
				background: linear-gradient(45deg, #667eea, #764ba2);
				border-radius: 10px;
			}
			.custom-scrollbar::-webkit-scrollbar-thumb:hover {
				background: linear-gradient(45deg, #764ba2, #667eea);
			}
		`}</style>
	</div>
)

const ModernCalendar = () => {
	const [currentDate] = useState(new Date())
	
	return (
		<motion.div 
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl"
		>
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-bold text-white">
					{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
				</h2>
				<div className="flex space-x-1">
					<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
						<ChevronLeft className="w-4 h-4 text-white" />
					</motion.button>
					<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
						<ChevronRight className="w-4 h-4 text-white" />
					</motion.button>
				</div>
			</div>
			<div className="grid grid-cols-7 gap-1">
				{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
					<div key={day} className="text-center text-xs text-gray-400 pb-2">{day}</div>
				))}
				{Array.from({ length: 28 }, (_, i) => (
					<motion.button
						key={i}
						whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
						className="w-6 h-6 rounded-full text-white hover:bg-white/20 transition-colors text-xs flex items-center justify-center"
					>
						{i + 1}
					</motion.button>
				))}
			</div>
		</motion.div>
	)
}

const MorphingMenuButton = () => {
	const [isOpen, setIsOpen] = useState(false)
	
	return (
		<motion.button
			onClick={() => setIsOpen(!isOpen)}
			className="relative w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl flex items-center justify-center group"
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
		>
			<div className="relative w-6 h-6">
				<motion.span
					animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
					className="absolute block w-6 h-0.5 bg-white rounded-full origin-center transition-all duration-300"
				/>
				<motion.span
					animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
					className="absolute block w-6 h-0.5 bg-white rounded-full top-2 transition-all duration-300"
				/>
				<motion.span
					animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
					className="absolute block w-6 h-0.5 bg-white rounded-full origin-center transition-all duration-300 top-4"
				/>
			</div>
		</motion.button>
	)
}

const GradientProgressRing = () => {
	const [progress] = useState(75)
	
	return (
		<div className="relative w-24 h-24">
			<svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
				<circle
					cx="50" cy="50" r="35"
					fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6"
				/>
				<motion.circle
					cx="50" cy="50" r="35"
					fill="none" strokeWidth="6"
					strokeLinecap="round"
					strokeDasharray="220"
					strokeDashoffset={220 - (220 * progress) / 100}
					stroke="url(#gradient)"
					initial={{ strokeDashoffset: 220 }}
					animate={{ strokeDashoffset: 220 - (220 * progress) / 100 }}
					transition={{ duration: 2, ease: "easeInOut" }}
				/>
				<defs>
					<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#667eea" />
						<stop offset="100%" stopColor="#764ba2" />
					</linearGradient>
				</defs>
			</svg>
			<div className="absolute inset-0 flex items-center justify-center">
				<span className="text-lg font-bold text-white">{progress}%</span>
			</div>
		</div>
	)
}

const AudioPlayerWidget = () => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [progress] = useState(45)
	
	return (
		<motion.div 
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			className="relative overflow-hidden p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl"
		>
			<div className="flex items-center space-x-3">
				<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
					<span className="text-white font-bold text-lg">♪</span>
				</div>
				<div className="flex-1">
					<h4 className="text-white font-semibold text-sm">Aesthetic Vibes</h4>
					<p className="text-gray-400 text-xs">Lo-Fi Hip Hop</p>
				</div>
			</div>
			
			<div className="mt-3 space-y-2">
				<div className="flex items-center space-x-2">
					<span className="text-xs text-gray-400">1:23</span>
					<div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
						<motion.div 
							className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
							style={{ width: `${progress}%` }}
							initial={{ width: 0 }}
							animate={{ width: `${progress}%` }}
						/>
					</div>
					<span className="text-xs text-gray-400">3:45</span>
				</div>
				
				<div className="flex items-center justify-center space-x-3">
					<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
						<SkipBack className="w-4 h-4 text-white" />
					</motion.button>
					<motion.button 
						onClick={() => setIsPlaying(!isPlaying)}
						whileHover={{ scale: 1.1 }} 
						whileTap={{ scale: 0.9 }}
						className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
					>
						{isPlaying ? <Pause className="w-3 h-3 text-white" /> : <Play className="w-3 h-3 text-white ml-0.5" />}
					</motion.button>
					<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
						<SkipForward className="w-4 h-4 text-white" />
					</motion.button>
				</div>
			</div>
		</motion.div>
	)
}

const ProductCard = () => {
	const [isLiked, setIsLiked] = useState(false)
	
	return (
		<motion.div 
			whileHover={{ y: -4, scale: 1.02 }}
			className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl group"
		>
			<div className="relative h-32 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center">
				<span className="text-3xl">📱</span>
				<motion.button
					onClick={() => setIsLiked(!isLiked)}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
				>
					<Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
				</motion.button>
			</div>
			
			<div className="p-4">
				<h3 className="text-white font-semibold mb-1 text-sm">iPhone 15 Pro</h3>
				<p className="text-gray-400 text-xs mb-3">Latest flagship smartphone</p>
				<div className="flex items-center justify-between">
					<span className="text-lg font-bold text-white">$999</span>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-medium"
					>
						Add to Cart
					</motion.button>
				</div>
			</div>
		</motion.div>
	)
}

const componentData = [
	{ 
		id: 1, 
		title: 'Glassmorphism Button', 
		category: 'Buttons', 
		height: 'h-36',
		framework: 'React',
		preview: <GlassmorphismButton />,
		code: `<motion.button 
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.95 }}
  className="relative overflow-hidden px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium shadow-2xl hover:shadow-white/25 transition-all duration-300"
>
  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
  <span className="relative z-10">Glassmorphism</span>
</motion.button>`,
		description: 'Beautiful glassmorphism button with hover animations and backdrop blur effects.',
		complexity: 'Medium',
		tags: ['glassmorphism', 'animation', 'modern']
	},
	{ 
		id: 2, 
		title: 'Neon Glow Button', 
		category: 'Buttons', 
		height: 'h-36',
		framework: 'React',
		preview: <NeonGlowButton />,
		code: `<motion.button 
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="relative px-8 py-4 bg-black border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg overflow-hidden group hover:text-black transition-colors duration-300"
>
  <span className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
  <span className="relative z-10">NEON GLOW</span>
  <div className="absolute inset-0 rounded-lg shadow-[0_0_20px_#00ffff,0_0_40px_#00ffff,0_0_60px_#00ffff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</motion.button>`,
		description: 'Cyberpunk-inspired neon glow button with electric effects.',
		complexity: 'Medium',
		tags: ['neon', 'cyberpunk', 'glow']
	},
	{ 
		id: 3, 
		title: 'Floating Navigation Bar', 
		category: 'Navigation', 
		height: 'h-40',
		framework: 'React',
		preview: <FloatingNavigation />,
		code: `<motion.nav 
  initial={{ y: -100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
>
  <div className="flex items-center space-x-8">
    <span className="text-white font-bold">Brand</span>
    <div className="flex space-x-6">
      {['Home', 'About', 'Services', 'Contact'].map((item) => (
        <motion.a 
          key={item}
          href="#" 
          whileHover={{ scale: 1.1, color: '#ffffff' }}
          className="text-gray-300 hover:text-white transition-colors"
        >
          {item}
        </motion.a>
      ))}
    </div>
  </div>
</motion.nav>`,
		description: 'Floating navigation with glassmorphism and smooth animations.',
		complexity: 'Medium',
		tags: ['floating', 'navigation', 'glassmorphism']
	},
	{ 
		id: 4, 
		title: 'Crystalline Card', 
		category: 'Cards', 
		height: 'h-48',
		framework: 'React',
		preview: <CrystallineCard />,
		code: `<motion.div 
  whileHover={{ scale: 1.02, rotateY: 2 }}
  className="relative overflow-hidden p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl group"
>
  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  <div className="relative z-10">
    <h3 className="text-lg font-bold text-white mb-2">Crystalline</h3>
    <p className="text-gray-300 text-sm mb-4">Glass-like effect with gradients.</p>
    <motion.button 
      whileHover={{ scale: 1.05 }}
      className="px-4 py-2 bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/30 text-sm"
    >
      Explore →
    </motion.button>
  </div>
</motion.div>`,
		description: 'Crystalline glass card with 3D hover effects and gradient overlays.',
		complexity: 'Advanced',
		tags: ['crystalline', '3d', 'glassmorphism']
	},
	{ 
		id: 5, 
		title: 'Custom Scrollbar', 
		category: 'Scrollbars', 
		height: 'h-40',
		framework: 'CSS',
		preview: <CustomScrollbar />,
		code: `<div className="h-48 overflow-y-auto pr-4 custom-scrollbar">
  <div className="space-y-4">
    {/* Content */}
  </div>
</div>

<style jsx>{\`
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #667eea, #764ba2);
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #764ba2, #667eea);
    transform: scale(1.1);
  }
\`}</style>`,
		description: 'Beautiful custom scrollbar with gradient colors and hover effects.',
		complexity: 'Easy',
		tags: ['scrollbar', 'gradient', 'custom']
	},
	{ 
		id: 6, 
		title: 'Modern Calendar', 
		category: 'Calendars', 
		height: 'h-64',
		framework: 'React',
		preview: <ModernCalendar />,
		code: `const [currentDate, setCurrentDate] = useState(new Date());

<motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl"
>
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-xl font-bold text-white">
      {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
    </h2>
    <div className="flex space-x-2">
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <ChevronLeft className="w-5 h-5 text-white" />
      </motion.button>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <ChevronRight className="w-5 h-5 text-white" />
      </motion.button>
    </div>
  </div>
  <div className="grid grid-cols-7 gap-2">
    {Array.from({ length: 31 }, (_, i) => (
      <motion.button
        key={i}
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
        className="w-10 h-10 rounded-full text-white hover:bg-white/20 transition-colors"
      >
        {i + 1}
      </motion.button>
    ))}
  </div>
</motion.div>`,
		description: 'Glassmorphism calendar with smooth animations and hover effects.',
		complexity: 'Advanced',
		tags: ['calendar', 'glassmorphism', 'interactive']
	},
	{ 
		id: 7, 
		title: 'Morphing Menu Button', 
		category: 'Buttons', 
		height: 'h-32',
		framework: 'React',
		preview: <MorphingMenuButton />,
		code: `const [isOpen, setIsOpen] = useState(false);

<motion.button
  onClick={() => setIsOpen(!isOpen)}
  className="relative w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl flex items-center justify-center group"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <div className="relative w-6 h-6">
    <motion.span
      animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
      className="absolute block w-6 h-0.5 bg-white rounded-full origin-center transition-all duration-300"
    />
    <motion.span
      animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
      className="absolute block w-6 h-0.5 bg-white rounded-full top-2 transition-all duration-300"
    />
    <motion.span
      animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
      className="absolute block w-6 h-0.5 bg-white rounded-full origin-center transition-all duration-300 top-4"
    />
  </div>
</motion.button>`,
		description: 'Morphing hamburger menu with smooth transform animations.',
		complexity: 'Medium',
		tags: ['menu', 'animation', 'transform']
	},
	{ 
		id: 8, 
		title: 'Gradient Progress Ring', 
		category: 'Animations', 
		height: 'h-40',
		framework: 'React',
		preview: <GradientProgressRing />,
		code: `const [progress, setProgress] = useState(75);

<div className="relative w-32 h-32">
  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
    <circle
      cx="50" cy="50" r="40"
      fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8"
    />
    <motion.circle
      cx="50" cy="50" r="40"
      fill="none" strokeWidth="8"
      strokeLinecap="round"
      strokeDasharray="220"
      strokeDashoffset={220 - (220 * progress) / 100}
      stroke="url(#gradient)"
      initial={{ strokeDashoffset: 220 }}
      animate={{ strokeDashoffset: 220 - (220 * progress) / 100 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
    </defs>
  </svg>
  <div className="absolute inset-0 flex items-center justify-center">
    <span className="text-2xl font-bold text-white">{progress}%</span>
  </div>
</div>`,
		description: 'Animated gradient progress ring with smooth transitions.',
		complexity: 'Advanced',
		tags: ['progress', 'animation', 'gradient']
	},
	{ 
		id: 9, 
		title: 'Audio Player Widget', 
		category: 'Audio Players', 
		height: 'h-44',
		framework: 'React',
		preview: <AudioPlayerWidget />,
		code: `const [isPlaying, setIsPlaying] = useState(false);
const [progress, setProgress] = useState(45);

<motion.div 
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  className="relative overflow-hidden p-6 bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl"
>
  <div className="flex items-center space-x-4">
    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
      <span className="text-white font-bold">♪</span>
    </div>
    <div className="flex-1">
      <h4 className="text-white font-semibold">Aesthetic Vibes</h4>
      <p className="text-gray-400 text-sm">Lo-Fi Hip Hop</p>
    </div>
  </div>
  
  <div className="mt-4 space-y-3">
    <div className="flex items-center space-x-2">
      <span className="text-xs text-gray-400">1:23</span>
      <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          style={{ width: \`\${progress}%\` }}
          initial={{ width: 0 }}
          animate={{ width: \`\${progress}%\` }}
        />
      </div>
      <span className="text-xs text-gray-400">3:45</span>
    </div>
    
    <div className="flex items-center justify-center space-x-4">
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <SkipBack className="w-5 h-5 text-white" />
      </motion.button>
      <motion.button 
        onClick={() => setIsPlaying(!isPlaying)}
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
      >
        {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-1" />}
      </motion.button>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <SkipForward className="w-5 h-5 text-white" />
      </motion.button>
    </div>
  </div>
</motion.div>`,
		description: 'Beautiful audio player with glassmorphism and smooth animations.',
		complexity: 'Advanced',
		tags: ['audio', 'player', 'glassmorphism']
	},
	{ 
		id: 10, 
		title: 'Product Card E-commerce', 
		category: 'E-commerce', 
		height: 'h-56',
		framework: 'React',
		preview: <ProductCard />,
		code: `const [isLiked, setIsLiked] = useState(false);

<motion.div 
  whileHover={{ y: -8, scale: 1.02 }}
  className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl group"
>
  <div className="relative h-48 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center">
    <span className="text-4xl">📱</span>
    <motion.button
      onClick={() => setIsLiked(!isLiked)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
    >
      <Heart className={\`w-5 h-5 \${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}\`} />
    </motion.button>
  </div>
  
  <div className="p-6">
    <h3 className="text-white font-semibold mb-1">iPhone 15 Pro</h3>
    <p className="text-gray-400 text-sm mb-3">Latest flagship smartphone</p>
    <div className="flex items-center justify-between">
      <span className="text-2xl font-bold text-white">$999</span>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium"
      >
        Add to Cart
      </motion.button>
    </div>
  </div>
</motion.div>`,
		description: 'Modern e-commerce product card with like button and hover effects.',
		complexity: 'Medium',
		tags: ['ecommerce', 'product', 'interactive']
	}
]

export default function ComponentsPage() {
	const [selectedCategory, setSelectedCategory] = useState('All')
	const [copiedId, setCopiedId] = useState<number | null>(null)
	const [showCode, setShowCode] = useState<number | null>(null)

	const filteredComponents = selectedCategory === 'All' 
		? componentData 
		: componentData.filter(component => component.category === selectedCategory)

	const copyToClipboard = async (content: string, id: number) => {
		try {
			await navigator.clipboard.writeText(content)
			setCopiedId(id)
			setTimeout(() => setCopiedId(null), 2000)
		} catch (err) {
			console.error('Failed to copy text: ', err)
		}
	}

	const getFrameworkColor = (framework: string) => {
		switch (framework) {
			case 'React': return 'bg-blue-500/20 text-blue-400'
			case 'Vue': return 'bg-green-500/20 text-green-400'
			case 'Angular': return 'bg-red-500/20 text-red-400'
			case 'CSS': return 'bg-purple-500/20 text-purple-400'
			default: return 'bg-gray-500/20 text-gray-400'
		}
	}

	const getComplexityColor = (complexity: string) => {
		switch (complexity) {
			case 'Easy': return 'text-green-500'
			case 'Medium': return 'text-yellow-500'
			case 'Advanced': return 'text-red-500'
			default: return 'text-gray-500'
		}
	}

	return (
		<div className="min-h-screen bg-background">
			<FloatingNavbar />
			
			<main className="pt-36 pb-16">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
							Components
						</h1>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Interactive component library with live previews and copy-paste code
						</p>
					</motion.div>

					{/* Category Pills */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="flex flex-wrap justify-center gap-3 mb-12"
					>
						{categories.map((category, index) => (
							<motion.div
								key={category}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: 0.1 * index }}
							>
								<Button
									variant={selectedCategory === category ? "default" : "ghost"}
									onClick={() => setSelectedCategory(category)}
									className={`
										rounded-full px-6 py-2 transition-all duration-300
										${selectedCategory === category 
											? 'bg-foreground text-background hover:bg-foreground/80' 
											: 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
										}
									`}
								>
									{category}
								</Button>
							</motion.div>
						))}
					</motion.div>

					{/* Components Grid */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
					>
						{filteredComponents.map((component, index) => (
							<motion.div
								key={component.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.05 * index }}
								className="group bg-card border border-border rounded-xl overflow-hidden hover:border-border/60 transition-all duration-300"
							>
								{/* Live Preview */}
								<div className={`
									${component.height} bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 flex items-center justify-center
									group-hover:from-gray-800 group-hover:via-gray-900 group-hover:to-gray-800 transition-all duration-300
								`}>
									{component.preview}
								</div>
								
								{/* Component Info */}
								<div className="p-4 bg-card">
									<div className="flex items-center justify-between mb-3">
										<h3 className="text-lg font-semibold text-foreground">{component.title}</h3>
										<span className={`text-xs font-medium ${getComplexityColor(component.complexity)}`}>
											{component.complexity}
										</span>
									</div>
									
									<p className="text-sm text-muted-foreground mb-4 leading-relaxed">
										{component.description}
									</p>
									
									<div className="flex flex-wrap gap-1 mb-4">
										{component.tags.map((tag) => (
											<span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
												{tag}
											</span>
										))}
									</div>
									
									<div className="flex items-center justify-between">
										<span className={`px-3 py-1 rounded-full text-xs font-medium ${getFrameworkColor(component.framework)}`}>
											{component.framework}
										</span>
										
										<div className="flex space-x-2">
											{/* Show Code Button */}
											<motion.button
												onClick={() => setShowCode(showCode === component.id ? null : component.id)}
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												className="p-2 bg-muted hover:bg-accent rounded-lg transition-all duration-200 flex items-center space-x-1"
											>
												<Code2 className="w-4 h-4 text-muted-foreground" />
											</motion.button>
											
											{/* Copy Button */}
											<motion.button
												onClick={() => copyToClipboard(component.code, component.id)}
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												className="p-2 bg-muted hover:bg-accent rounded-lg transition-all duration-200 flex items-center space-x-1"
											>
												{copiedId === component.id ? (
													<Check className="w-4 h-4 text-green-500" />
												) : (
													<Copy className="w-4 h-4 text-muted-foreground" />
												)}
											</motion.button>
										</div>
									</div>
									
									{/* Code Block */}
									{showCode === component.id && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: 'auto' }}
											exit={{ opacity: 0, height: 0 }}
											className="mt-4 p-4 bg-muted/50 rounded-lg border"
										>
											<pre className="text-xs text-muted-foreground overflow-x-auto">
												<code>{component.code}</code>
											</pre>
										</motion.div>
									)}
								</div>
							</motion.div>
						))}
					</motion.div>

					{/* Load More Button */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.8 }}
						className="text-center mt-12"
					>
						<Button
							variant="ghost"
							className="bg-muted text-foreground hover:bg-accent rounded-xl px-8 py-3"
						>
							<Sparkles className="w-4 h-4 mr-2" />
							More Components Coming Soon
						</Button>
					</motion.div>
				</div>
			</main>

			{/* Background Pattern */}
			<div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--muted)/0.1)_0%,transparent_50%)] pointer-events-none" />
			<div className="fixed inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,hsl(var(--muted)/0.05)_60deg,transparent_120deg)] pointer-events-none" />
		</div>
	)
} 