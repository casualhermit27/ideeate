'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Sparkles, Search, Heart, Star, Download, Play, Pause, SkipBack, SkipForward, Plus, Bell, Settings, User, Eye, EyeOff, Zap, Home, Folder, BarChart3, Users, CheckCircle, TrendingUp, Share, MoreHorizontal, Code2, Mail, Menu, ChevronDown, X, DollarSign, ArrowRight, Loader, BarChart, Target } from 'lucide-react'
import FloatingNavbar from '@/components/floating-navbar'
import { Button } from '@/components/ui/button'

const categories = [
	'All',
	'Buttons',
	'Navigation',
	'Cards',
	'Inputs',
	'Players',
	'Toggles',
	'Notifications',
	'Pricing',
	'Loading'
]

// Component type definition
type ComponentType = {
	id: number
	title: string
	category: string
	preview: React.ReactNode
	size: string
	code: string
}

// Live Preview Components
const GlassmorphismButton = () => (
	<motion.button 
		whileHover={{ scale: 1.05, y: -2 }}
		whileTap={{ scale: 0.95 }}
		className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium shadow-2xl hover:shadow-white/25 transition-all duration-300"
	>
		<span>Glassmorphism</span>
	</motion.button>
)

const FloatingNav = () => (
	<motion.nav 
		initial={{ y: -20, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		className="px-6 py-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
	>
		<div className="flex items-center space-x-6">
			<span className="text-white font-bold text-sm">Brand</span>
			<div className="flex space-x-4">
				{['Home', 'About', 'Contact'].map((item) => (
					<motion.a 
						key={item}
						href="#" 
						whileHover={{ scale: 1.1 }}
						className="text-gray-300 hover:text-white transition-colors text-sm"
					>
						{item}
					</motion.a>
				))}
			</div>
		</div>
	</motion.nav>
)

const VerticalFloatingNav = () => (
	<motion.div 
		initial={{ x: -20, opacity: 0 }}
		animate={{ x: 0, opacity: 1 }}
		className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl max-w-fit"
	>
		<div className="flex flex-col space-y-2">
			{[Home, User, Settings, Bell, Mail].map((Icon, index) => (
				<motion.button
					key={index}
					whileHover={{ scale: 1.1, x: 4 }}
					whileTap={{ scale: 0.95 }}
					className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
				>
					<Icon className="w-4 h-4" />
				</motion.button>
			))}
		</div>
	</motion.div>
)

const SidebarNav = () => (
	<motion.div 
		initial={{ x: -20, opacity: 0 }}
		animate={{ x: 0, opacity: 1 }}
		className="w-full max-w-xs p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
	>
		<div className="space-y-3">
			<div className="px-3 py-2">
				<h3 className="text-white font-semibold text-sm">Navigation</h3>
			</div>
			{[
				{ icon: Home, label: 'Dashboard' },
				{ icon: BarChart3, label: 'Analytics' },
				{ icon: Users, label: 'Team' },
				{ icon: Folder, label: 'Projects' },
			].map((item, index) => (
				<motion.button
					key={index}
					whileHover={{ scale: 1.02, x: 4 }}
					className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
				>
					<item.icon className="w-4 h-4" />
					<span className="text-sm">{item.label}</span>
				</motion.button>
			))}
		</div>
	</motion.div>
)

const PricingCard = ({ plan, price, features, highlighted = false }: {
	plan: string
	price: string
	features: string[]
	highlighted?: boolean
}) => (
	<motion.div 
		whileHover={{ scale: 1.02, y: -4 }}
		className={`p-6 backdrop-blur-xl border rounded-2xl shadow-2xl transition-all duration-300 ${
			highlighted 
				? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30' 
				: 'bg-white/5 border-white/10'
		}`}
	>
		<div className="text-center mb-6">
			<h3 className="text-xl font-bold text-white mb-2">{plan}</h3>
			<div className="text-3xl font-bold text-white">
				{price}
				<span className="text-sm text-gray-400">/month</span>
			</div>
		</div>
		<ul className="space-y-3 mb-6">
			{features.map((feature, index) => (
				<li key={index} className="flex items-center space-x-2 text-gray-300 text-sm">
					<CheckCircle className="w-4 h-4 text-green-400" />
					<span>{feature}</span>
				</li>
			))}
		</ul>
		<motion.button
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
				highlighted
					? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-purple-500/25'
					: 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
			}`}
		>
			Get Started
		</motion.button>
	</motion.div>
)

const GlassCard = () => (
	<motion.div 
		whileHover={{ scale: 1.02 }}
		className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl"
	>
		<h3 className="text-lg font-bold text-white mb-2">Glass Card</h3>
		<p className="text-gray-300 text-sm mb-4">Beautiful glassmorphism effect</p>
		<motion.button 
			whileHover={{ scale: 1.05 }}
			className="px-4 py-2 bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/30 text-sm"
		>
			Action
		</motion.button>
	</motion.div>
)

const FloatingSearchBar = () => (
	<motion.div 
		whileHover={{ scale: 1.02 }}
		className="relative w-full max-w-md"
	>
  <input 
    type="text" 
			placeholder="Search anything..." 
			className="w-full px-6 py-4 pl-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-all duration-300"
		/>
		<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
	</motion.div>
)

const GlassmorphToggle = () => {
	const [isOn, setIsOn] = useState(false)
	
	return (
		<motion.button
			onClick={() => setIsOn(!isOn)}
			className={`relative w-16 h-8 rounded-full backdrop-blur-xl border border-white/20 transition-all duration-300 ${
				isOn ? 'bg-purple-500/30' : 'bg-white/10'
			}`}
			whileTap={{ scale: 0.95 }}
		>
			<motion.div
				className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
				animate={{ x: isOn ? 32 : 4 }}
				transition={{ type: "spring", stiffness: 500, damping: 30 }}
			/>
		</motion.button>
	)
}

const FloatingNotification = () => (
	<motion.div 
		initial={{ x: 300, opacity: 0 }}
		animate={{ x: 0, opacity: 1 }}
		className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl"
	>
		<div className="flex items-center space-x-3">
			<div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
				<Bell className="w-5 h-5 text-white" />
      </div>
			<div>
				<p className="text-white font-medium text-sm">New Message</p>
				<p className="text-gray-300 text-xs">You have a new notification</p>
      </div>
    </div>
	</motion.div>
)

const GradientButton = () => (
	<motion.button 
		whileHover={{ scale: 1.05, y: -2 }}
		whileTap={{ scale: 0.95 }}
		className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
	>
		Gradient Magic
	</motion.button>
)

const FloatingProfile = () => (
	<motion.div 
		whileHover={{ scale: 1.02 }}
		className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl"
	>
		<div className="flex items-center space-x-3">
			<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
				<User className="w-6 h-6 text-white" />
  </div>
			<div>
				<p className="text-white font-medium">John Doe</p>
				<p className="text-gray-300 text-sm">Designer</p>
    </div>
  </div>
	</motion.div>
)

const AnimatedCounter = () => {
	const [count, setCount] = useState(0)
	
	return (
		<div className="text-center">
			<motion.div 
				className="text-4xl font-bold text-white mb-4"
				key={count}
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
			>
				{count}
			</motion.div>
			<div className="flex space-x-2">
				<motion.button
					onClick={() => setCount(count - 1)}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className="w-10 h-10 bg-white/20 backdrop-blur-xl border border-white/20 rounded-full text-white flex items-center justify-center"
				>
					-
				</motion.button>
				<motion.button
					onClick={() => setCount(count + 1)}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className="w-10 h-10 bg-white/20 backdrop-blur-xl border border-white/20 rounded-full text-white flex items-center justify-center"
				>
					+
				</motion.button>
    </div>
      </div>
	)
}

const GlowingInput = () => (
	<motion.input 
		whileFocus={{ scale: 1.02 }}
		type="text" 
		placeholder="Glowing input..." 
		className="w-full px-6 py-4 bg-transparent border-2 border-purple-500/50 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:border-purple-400 focus:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"
	/>
)

const FloatingActionButton = () => {
	const [isExpanded, setIsExpanded] = useState(false)
	
	return (
		<div className="relative h-full flex flex-col items-center justify-center">
			<motion.div
				animate={isExpanded ? "expanded" : "collapsed"}
				variants={{
					expanded: { scale: 1, opacity: 1 },
					collapsed: { scale: 0, opacity: 0 }
				}}
				className="space-y-3 mb-4"
			>
				{[Heart, Star, Settings].map((Icon, index) => (
					<motion.button
						key={index}
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: index * 0.1 }}
						className="w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
					>
						<Icon className="w-5 h-5" />
					</motion.button>
				))}
			</motion.div>
			
			<motion.button
				onClick={() => setIsExpanded(!isExpanded)}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				animate={{ rotate: isExpanded ? 45 : 0 }}
				className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-2xl"
			>
				<Plus className="w-6 h-6" />
			</motion.button>
    </div>
	)
}

const PasswordInput = () => {
	const [showPassword, setShowPassword] = useState(false)
	
	return (
		<div className="relative w-full max-w-sm">
			<input 
				type={showPassword ? "text" : "password"}
				placeholder="Enter password..." 
				className="w-full px-6 py-4 pr-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-all duration-300"
			/>
			<motion.button
				onClick={() => setShowPassword(!showPassword)}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
			>
				{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
			</motion.button>
  </div>
	)
}

const AudioPlayer = () => {
	const [isPlaying, setIsPlaying] = useState(false)
	
	return (
		<motion.div 
			className="p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl w-full max-w-xs"
		>
			<div className="flex items-center space-x-3 mb-3">
				<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
					<span className="text-white font-bold">♪</span>
  </div>
				<div className="flex-1">
					<h4 className="text-white font-semibold text-sm">Aesthetic</h4>
					<p className="text-gray-400 text-xs">Lo-Fi Vibes</p>
  </div>
  </div>
			
			<div className="flex items-center justify-center space-x-4">
				<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
					<SkipBack className="w-4 h-4 text-white" />
				</motion.button>
				<motion.button 
					onClick={() => setIsPlaying(!isPlaying)}
					whileHover={{ scale: 1.1 }} 
					whileTap={{ scale: 0.9 }}
					className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
				>
					{isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
				</motion.button>
				<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
					<SkipForward className="w-4 h-4 text-white" />
				</motion.button>
  </div>
		</motion.div>
	)
}

const GlassModal = () => {
	const [isOpen, setIsOpen] = useState(false)
	
	return (
		<div className="relative">
			<motion.button
				onClick={() => setIsOpen(true)}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className="px-6 py-3 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white"
			>
				Open Modal
			</motion.button>
			
			{isOpen && (
				<motion.div 
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
					onClick={() => setIsOpen(false)}
				>
					<motion.div 
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl max-w-sm w-full mx-4"
						onClick={(e) => e.stopPropagation()}
					>
						<h3 className="text-white font-bold mb-2">Glass Modal</h3>
						<p className="text-gray-300 text-sm mb-4">Beautiful modal with glassmorphism</p>
						<motion.button
							onClick={() => setIsOpen(false)}
							whileHover={{ scale: 1.05 }}
							className="px-4 py-2 bg-white/20 text-white rounded-xl"
						>
							Close
						</motion.button>
					</motion.div>
				</motion.div>
			)}
  </div>
	)
}

const LoadingSpinner = () => (
	<div className="flex flex-col items-center space-y-4">
		<motion.div
			animate={{ rotate: 360 }}
			transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
			className="w-12 h-12 border-4 border-white/20 border-t-purple-500 rounded-full"
		/>
		<p className="text-white text-sm">Loading...</p>
  </div>
)

const PulseLoader = () => (
	<div className="flex space-x-2">
		{[0, 1, 2].map((i) => (
			<motion.div
				key={i}
				animate={{
					scale: [1, 1.2, 1],
					opacity: [0.7, 1, 0.7]
				}}
				transition={{
					duration: 1,
					repeat: Infinity,
					delay: i * 0.2
				}}
				className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
			/>
		))}
	</div>
)

const ProgressBar = () => {
	const progress = 65
	
	return (
		<div className="w-full">
			<div className="flex justify-between text-white text-sm mb-2">
				<span>Progress</span>
				<span>{progress}%</span>
			</div>
			<div className="w-full bg-white/10 rounded-full h-2 backdrop-blur-xl">
				<motion.div
					className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
					initial={{ width: 0 }}
					animate={{ width: `${progress}%` }}
					transition={{ duration: 1.5, ease: "easeOut" }}
				/>
    </div>
  </div>
	)
}

const StatsCard = () => (
	<motion.div 
		whileHover={{ scale: 1.02 }}
		className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
	>
		<div className="flex items-center justify-between mb-3">
			<div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
				<TrendingUp className="w-5 h-5 text-white" />
			</div>
			<span className="text-green-400 text-sm font-medium">+12%</span>
		</div>
		<h3 className="text-white font-semibold text-lg">$24,500</h3>
		<p className="text-gray-400 text-sm">Total Revenue</p>
	</motion.div>
)

const NeumorphismButton = () => (
	<motion.button
		whileHover={{ scale: 1.05 }}
		whileTap={{ scale: 0.95 }}
		className="px-8 py-4 bg-gray-200 text-gray-800 rounded-2xl shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] hover:shadow-[inset_12px_12px_20px_#bebebe,inset_-12px_-12px_20px_#ffffff] transition-all duration-300 font-medium"
	>
		Neumorphism
	</motion.button>
)

const FloatingActionBar = () => (
	<motion.div 
		initial={{ y: 20, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		className="flex items-center space-x-3 px-4 py-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
	>
		{[Heart, Share, Download, MoreHorizontal].map((Icon, index) => (
			<motion.button
				key={index}
				whileHover={{ scale: 1.1, y: -2 }}
				whileTap={{ scale: 0.9 }}
				className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-colors"
			>
				<Icon className="w-4 h-4" />
			</motion.button>
		))}
	</motion.div>
)

const FeatureCard = () => (
	<motion.div 
		whileHover={{ scale: 1.02, y: -4 }}
		className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl group max-w-xs mx-auto"
	>
		<div className="mb-3">
			<div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3">
				<Zap className="w-5 h-5 text-white" />
			</div>
			<h3 className="text-base font-bold text-white mb-1">Fast Performance</h3>
			<p className="text-gray-400 text-xs">Lightning fast loading</p>
		</div>
		<motion.div 
			className="w-full h-1 bg-white/10 rounded-full overflow-hidden"
		>
			<motion.div 
				className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
				initial={{ width: 0 }}
				animate={{ width: '85%' }}
				transition={{ duration: 1.5, delay: 0.5 }}
			/>
		</motion.div>
	</motion.div>
)

const TestimonialCard = () => (
	<motion.div 
		whileHover={{ scale: 1.02 }}
		className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-w-xs mx-auto"
	>
		<div className="flex items-center space-x-1 mb-3">
			{[...Array(5)].map((_, i) => (
				<Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
			))}
		</div>
		<p className="text-gray-300 text-xs mb-3 line-clamp-2">&quot;Amazing components with beautiful animations!&quot;</p>
		<div className="flex items-center space-x-2">
			<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
				<User className="w-4 h-4 text-white" />
			</div>
			<div>
				<p className="text-white text-xs font-medium">Sarah Chen</p>
				<p className="text-gray-400 text-[10px]">Frontend Developer</p>
			</div>
		</div>
	</motion.div>
)

const NotificationBell = () => {
	const [hasNotification, setHasNotification] = useState(true)
	
	return (
		<motion.button
			onClick={() => setHasNotification(!hasNotification)}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			className="relative w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
		>
			<Bell className="w-5 h-5" />
			{hasNotification && (
				<motion.div 
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
				>
					<span className="text-white text-xs font-bold">3</span>
				</motion.div>
			)}
		</motion.button>
	)
}

const SearchSuggestions = () => (
	<motion.div 
		initial={{ y: -10, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		className="w-full max-w-xs bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
	>
		<div className="p-3">
			<h4 className="text-white font-medium text-xs mb-2">Recent Searches</h4>
			<div className="space-y-1">
				{['React Components', 'Glassmorphism UI', 'Animation Library'].map((item, index) => (
					<motion.button
						key={index}
						whileHover={{ scale: 1.02, x: 4 }}
						className="w-full flex items-center space-x-2 p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all text-left"
					>
						<Search className="w-3 h-3" />
						<span className="text-xs">{item}</span>
					</motion.button>
				))}
			</div>
		</div>
	</motion.div>
)

const PricingToggle = () => {
	const [isYearly, setIsYearly] = useState(false)
	
	return (
		<motion.div 
			className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
		>
			<span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-white' : 'text-gray-400'}`}>
				Monthly
			</span>
			<motion.button
				onClick={() => setIsYearly(!isYearly)}
				className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
					isYearly ? 'bg-purple-500' : 'bg-white/20'
				}`}
				whileTap={{ scale: 0.95 }}
			>
				<motion.div
					className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
					animate={{ x: isYearly ? 28 : 4 }}
					transition={{ type: "spring", stiffness: 500, damping: 30 }}
				/>
			</motion.button>
			<span className={`text-sm font-medium transition-colors ${isYearly ? 'text-white' : 'text-gray-400'}`}>
				Yearly
			</span>
			{isYearly && (
				<motion.span 
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					className="px-2 py-1 bg-green-500 text-white text-xs rounded-full font-bold"
				>
					20% OFF
				</motion.span>
			)}
		</motion.div>
	)
}

const componentData: ComponentType[] = [
	{ id: 1, title: 'Prism', category: 'Buttons', preview: <GlassmorphismButton />, size: 'normal', code: `<motion.button 
	whileHover={{ scale: 1.05, y: -2 }}
	whileTap={{ scale: 0.95 }}
	className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium shadow-2xl hover:shadow-white/25 transition-all duration-300"
>
	<span>Glassmorphism</span>
</motion.button>` },
	{ id: 2, title: 'Orbit', category: 'Navigation', preview: <FloatingNav />, size: 'wide', code: `<motion.nav 
	initial={{ y: -20, opacity: 0 }}
	animate={{ y: 0, opacity: 1 }}
	className="px-6 py-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
>
	<div className="flex items-center space-x-6">
		<span className="text-white font-bold text-sm">Brand</span>
		<div className="flex space-x-4">
			{['Home', 'About', 'Contact'].map((item) => (
				<motion.a 
					key={item}
					href="#" 
					whileHover={{ scale: 1.1 }}
					className="text-gray-300 hover:text-white transition-colors text-sm"
				>
					{item}
				</motion.a>
			))}
		</div>
	</div>
</motion.nav>` },
	{ id: 3, title: 'Crystal', category: 'Cards', preview: <GlassCard />, size: 'tall', code: `<motion.div 
	whileHover={{ scale: 1.02 }}
	className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl"
>
	<h3 className="text-lg font-bold text-white mb-2">Glass Card</h3>
	<p className="text-gray-300 text-sm mb-4">Beautiful glassmorphism effect</p>
	<motion.button 
		whileHover={{ scale: 1.05 }}
		className="px-4 py-2 bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/30 text-sm"
	>
		Action
	</motion.button>
</motion.div>` },
	{ id: 4, title: 'Echo', category: 'Inputs', preview: <FloatingSearchBar />, size: 'wide', code: `<motion.div 
	whileHover={{ scale: 1.02 }}
	className="relative w-full max-w-md"
>
	<input 
		type="text" 
		placeholder="Search anything..." 
		className="w-full px-6 py-4 pl-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-all duration-300"
	/>
	<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
</motion.div>` },
	{ id: 5, title: 'Ember', category: 'Toggles', preview: <GlassmorphToggle />, size: 'normal', code: `const [isOn, setIsOn] = useState(false)

<motion.button
	onClick={() => setIsOn(!isOn)}
	className={\`relative w-16 h-8 rounded-full backdrop-blur-xl border border-white/20 transition-all duration-300 \${isOn ? 'bg-purple-500/30' : 'bg-white/10'}\`}
	whileTap={{ scale: 0.95 }}
>
	<motion.div
		className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
		animate={{ x: isOn ? 32 : 4 }}
		transition={{ type: "spring", stiffness: 500, damping: 30 }}
	/>
</motion.button>` },
	{ id: 6, title: 'Flare', category: 'Notifications', preview: <FloatingNotification />, size: 'wide', code: `<motion.div 
	initial={{ scale: 0, opacity: 0 }}
	animate={{ scale: 1, opacity: 1 }}
	className="px-6 py-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
>
	<div className="flex items-center space-x-3">
		<Bell className="w-5 h-5 text-blue-400" />
		<div>
			<p className="text-white text-sm font-medium">New notification</p>
			<p className="text-gray-400 text-xs">Just now</p>
		</div>
	</div>
</motion.div>` },
	{ id: 7, title: 'Pulse', category: 'Buttons', preview: <GradientButton />, size: 'normal', code: `<motion.button
	whileHover={{ scale: 1.05 }}
	whileTap={{ scale: 0.95 }}
	className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-2xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
>
	Gradient
</motion.button>` },
	{ id: 8, title: 'Lens', category: 'Cards', preview: <FloatingProfile />, size: 'normal', code: `<motion.div 
	whileHover={{ scale: 1.02 }}
	className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
>
	<div className="flex items-center space-x-3">
		<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
			<User className="w-6 h-6 text-white" />
		</div>
		<div>
			<p className="text-white font-medium text-sm">Alex Chen</p>
			<p className="text-gray-400 text-xs">Designer</p>
		</div>
	</div>
</motion.div>` },
	{ id: 9, title: 'Quantum', category: 'Buttons', preview: <AnimatedCounter />, size: 'normal', code: `const [count, setCount] = useState(0)

<motion.div className="flex items-center space-x-4">
	<motion.button
		onClick={() => setCount(count - 1)}
		whileHover={{ scale: 1.1 }}
		whileTap={{ scale: 0.9 }}
		className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-colors"
	>
		-
	</motion.button>
	
	<motion.span 
		key={count}
		initial={{ scale: 0.8, opacity: 0 }}
		animate={{ scale: 1, opacity: 1 }}
		className="text-2xl font-bold text-white min-w-[3rem] text-center"
	>
		{count}
	</motion.span>
	
	<motion.button
		onClick={() => setCount(count + 1)}
		whileHover={{ scale: 1.1 }}
		whileTap={{ scale: 0.9 }}
		className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-colors"
	>
		+
	</motion.button>
</motion.div>` },
	{ id: 10, title: 'Flow', category: 'Inputs', preview: <GlowingInput />, size: 'wide', code: `<motion.input
	whileFocus={{ scale: 1.02 }}
	type="text"
	placeholder="Enter your text..."
	className="w-full px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:shadow-lg focus:shadow-purple-500/25 transition-all duration-300"
/>` },
	{ id: 11, title: 'Drift', category: 'Buttons', preview: <FloatingActionButton />, size: 'tall', code: `const [isExpanded, setIsExpanded] = useState(false)

<motion.div className="relative">
	<motion.button
		onClick={() => setIsExpanded(!isExpanded)}
		whileHover={{ scale: 1.1 }}
		whileTap={{ scale: 0.9 }}
		className="w-14 h-14 bg-purple-500 hover:bg-purple-600 rounded-full shadow-lg flex items-center justify-center text-white transition-colors"
	>
		<Plus className={\`w-6 h-6 transition-transform duration-300 \${isExpanded ? 'rotate-45' : ''}\`} />
	</motion.button>
	
	{isExpanded && (
		<motion.div 
			initial={{ opacity: 0, scale: 0.8, y: 10 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			className="absolute bottom-16 left-0 flex flex-col space-y-2"
		>
			{[Bell, Settings, User].map((Icon, index) => (
				<motion.button
					key={index}
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: index * 0.1 }}
					whileHover={{ scale: 1.1 }}
					className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white transition-colors"
				>
					<Icon className="w-5 h-5" />
				</motion.button>
			))}
		</motion.div>
	)}
</motion.div>` },
	{ id: 12, title: 'Vault', category: 'Inputs', preview: <PasswordInput />, size: 'wide', code: `const [showPassword, setShowPassword] = useState(false)

<motion.div 
	whileHover={{ scale: 1.02 }}
	className="relative w-full max-w-md"
>
	<input 
		type={showPassword ? "text" : "password"}
		placeholder="Enter password..." 
		className="w-full px-6 py-4 pr-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-all duration-300"
	/>
	<motion.button 
		onClick={() => setShowPassword(!showPassword)}
		whileHover={{ scale: 1.1 }}
		whileTap={{ scale: 0.9 }}
		className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
	>
		{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
	</motion.button>
</motion.div>` },
	{ id: 13, title: 'Resonance', category: 'Players', preview: <AudioPlayer />, size: 'normal', code: `const [isPlaying, setIsPlaying] = useState(false)

<motion.div 
	whileHover={{ scale: 1.02 }}
	className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-full max-w-sm"
>
	<div className="flex items-center space-x-4 mb-4">
		<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
			<span className="text-white font-bold text-sm">♪</span>
		</div>
		<div className="flex-1">
			<h3 className="text-white font-medium text-sm">Aesthetic</h3>
			<p className="text-gray-400 text-xs">Lo-Fi Vibes</p>
		</div>
	</div>
	
	<div className="flex items-center justify-center space-x-4">
		<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
			<SkipBack className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
		</motion.button>
		<motion.button
			onClick={() => setIsPlaying(!isPlaying)}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
		>
			{isPlaying ? 
				<Pause className="w-5 h-5 text-white" /> : 
				<Play className="w-5 h-5 text-white ml-0.5" />
			}
		</motion.button>
		<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
			<SkipForward className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
		</motion.button>
	</div>
</motion.div>` },
	{ id: 14, title: 'Portal', category: 'Cards', preview: <GlassModal />, size: 'normal', code: `const [isOpen, setIsOpen] = useState(false)

<>
	<motion.button
		onClick={() => setIsOpen(true)}
		whileHover={{ scale: 1.05 }}
		whileTap={{ scale: 0.95 }}
		className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
	>
		Open Modal
	</motion.button>

	{isOpen && (
		<motion.div 
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
			onClick={() => setIsOpen(false)}
		>
			<motion.div 
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md w-full mx-4"
				onClick={(e) => e.stopPropagation()}
			>
				<h3 className="text-xl font-bold text-white mb-4">Glass Modal</h3>
				<p className="text-gray-300 mb-6">This is a beautiful glassmorphism modal with backdrop blur effects.</p>
				<button 
					onClick={() => setIsOpen(false)}
					className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
				>
					Close
  </button>
			</motion.div>
		</motion.div>
	)}
</>` },
	{ id: 15, title: 'Nebula', category: 'Navigation', preview: <VerticalFloatingNav />, size: 'normal', code: `<motion.div 
	initial={{ x: -20, opacity: 0 }}
	animate={{ x: 0, opacity: 1 }}
	className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl max-w-fit"
>
	<div className="flex flex-col space-y-2">
		{[Home, User, Settings, Bell, Mail].map((Icon, index) => (
			<motion.button
				key={index}
				whileHover={{ scale: 1.1, x: 4 }}
				whileTap={{ scale: 0.95 }}
				className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
			>
				<Icon className="w-4 h-4" />
			</motion.button>
		))}
	</div>
</motion.div>` },
	{ id: 16, title: 'Matrix', category: 'Navigation', preview: <SidebarNav />, size: 'wide', code: `<motion.div 
	initial={{ x: -20, opacity: 0 }}
	animate={{ x: 0, opacity: 1 }}
	className="w-full max-w-xs p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
>
	<div className="space-y-3">
		<div className="px-3 py-2">
			<h3 className="text-white font-semibold text-sm">Navigation</h3>
		</div>
		{[
			{ icon: Home, label: 'Dashboard' },
			{ icon: BarChart3, label: 'Analytics' },
			{ icon: Users, label: 'Team' },
			{ icon: Folder, label: 'Projects' },
		].map((item, index) => (
			<motion.button
				key={index}
				whileHover={{ scale: 1.02, x: 4 }}
				className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
			>
				<item.icon className="w-4 h-4" />
				<span className="text-sm">{item.label}</span>
			</motion.button>
		))}
	</div>
</motion.div>` },
	{ id: 17, title: 'Helix', category: 'Loading', preview: <LoadingSpinner />, size: 'normal', code: `<motion.div 
	className="flex items-center justify-center"
>
	<motion.div
		animate={{ rotate: 360 }}
		transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
		className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full"
	/>
	<span className="text-white text-sm ml-3">Loading...</span>
</motion.div>` },
	{ id: 18, title: 'Neutron', category: 'Loading', preview: <PulseLoader />, size: 'normal', code: `<div className="flex items-center justify-center space-x-2">
	{[0, 1, 2].map((index) => (
		<motion.div
			key={index}
			animate={{
				scale: [1, 1.2, 1],
				opacity: [0.3, 1, 0.3]
			}}
			transition={{
				duration: 1.5,
				repeat: Infinity,
				delay: index * 0.2
			}}
			className="w-3 h-3 bg-purple-500 rounded-full"
		/>
	))}
</div>` },
	{ id: 19, title: 'Wave', category: 'Loading', preview: <ProgressBar />, size: 'wide', code: `const progress = 65

<div className="w-full">
	<div className="flex justify-between text-white text-sm mb-2">
		<span>Progress</span>
		<span>{progress}%</span>
	</div>
	<div className="w-full bg-white/10 rounded-full h-2 backdrop-blur-xl">
		<motion.div
			className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
			initial={{ width: 0 }}
			animate={{ width: \`\${progress}%\` }}
			transition={{ duration: 1.5, ease: "easeOut" }}
		/>
	</div>
</div>` },
	{ id: 20, title: 'Spectrum', category: 'Cards', preview: <StatsCard />, size: 'normal', code: `<motion.div 
	whileHover={{ scale: 1.02 }}
	className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
>
	<div className="flex items-center justify-between mb-3">
		<div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
			<TrendingUp className="w-5 h-5 text-white" />
		</div>
		<span className="text-green-400 text-sm font-medium">+12%</span>
	</div>
	<h3 className="text-white font-semibold text-lg">$24,500</h3>
	<p className="text-gray-400 text-sm">Total Revenue</p>
</motion.div>` },
	{ id: 21, title: 'Forge', category: 'Buttons', preview: <NeumorphismButton />, size: 'normal', code: `<motion.button
	whileHover={{ scale: 1.05 }}
	whileTap={{ scale: 0.95 }}
	className="px-8 py-4 bg-gray-200 text-gray-800 rounded-2xl shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] hover:shadow-[inset_12px_12px_20px_#bebebe,inset_-12px_-12px_20px_#ffffff] transition-all duration-300 font-medium"
>
	Neumorphism
</motion.button>` },
	{ id: 22, title: 'Cosmos', category: 'Pricing', preview: (
		<div className="grid grid-cols-3 gap-4 w-full">
			<PricingCard 
				plan="Starter" 
				price="$9" 
				features={["5 Projects", "10GB Storage", "Email Support"]}
			/>
			<PricingCard 
				plan="Pro" 
				price="$29" 
				features={["50 Projects", "100GB Storage", "Priority Support", "Advanced Analytics"]}
				highlighted={true}
			/>
			<PricingCard 
				plan="Enterprise" 
				price="$99" 
				features={["Unlimited Projects", "1TB Storage", "24/7 Support", "Custom Integrations"]}
			/>
		</div>
	), size: 'pricing', code: `<div className="grid grid-cols-3 gap-4 w-full">
	<PricingCard 
		plan="Starter" 
		price="$9" 
		features={["5 Projects", "10GB Storage", "Email Support"]}
	/>
	<PricingCard 
		plan="Pro" 
		price="$29" 
		features={["50 Projects", "100GB Storage", "Priority Support", "Advanced Analytics"]}
		highlighted={true}
	/>
	<PricingCard 
		plan="Enterprise" 
		price="$99" 
		features={["Unlimited Projects", "1TB Storage", "24/7 Support", "Custom Integrations"]}
	/>
</div>` },
	{ id: 23, title: 'Aurora', category: 'Buttons', preview: <FloatingActionBar />, size: 'normal', code: `<motion.div 
	initial={{ y: 20, opacity: 0 }}
	animate={{ y: 0, opacity: 1 }}
	className="flex items-center space-x-3 px-4 py-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
>
	{[Heart, Share, Download, MoreHorizontal].map((Icon, index) => (
		<motion.button
			key={index}
			whileHover={{ scale: 1.1, y: -2 }}
			whileTap={{ scale: 0.9 }}
			className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-colors"
		>
			<Icon className="w-4 h-4" />
		</motion.button>
	))}
</motion.div>` },
	{ id: 24, title: 'Bloom', category: 'Cards', preview: <FeatureCard />, size: 'normal', code: `<motion.div 
	whileHover={{ scale: 1.02, y: -4 }}
	className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl group max-w-xs mx-auto"
>
	<div className="mb-3">
		<div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3">
			<Zap className="w-5 h-5 text-white" />
		</div>
		<h3 className="text-base font-bold text-white mb-1">Fast Performance</h3>
		<p className="text-gray-400 text-xs">Lightning fast loading</p>
	</div>
	<motion.div 
		className="w-full h-1 bg-white/10 rounded-full overflow-hidden"
	>
		<motion.div 
			className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
			initial={{ width: 0 }}
			animate={{ width: '85%' }}
			transition={{ duration: 1.5, delay: 0.5 }}
		/>
	</motion.div>
</motion.div>` },
	{ id: 25, title: 'Wisp', category: 'Cards', preview: <TestimonialCard />, size: 'normal', code: `<motion.div 
	whileHover={{ scale: 1.02 }}
	className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-w-xs mx-auto"
>
	<div className="flex items-center space-x-1 mb-3">
		{[...Array(5)].map((_, i) => (
			<Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
		))}
	</div>
	<p className="text-gray-300 text-xs mb-3 line-clamp-2">&quot;Amazing components with beautiful animations!&quot;</p>
	<div className="flex items-center space-x-2">
		<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
			<User className="w-4 h-4 text-white" />
		</div>
		<div>
			<p className="text-white text-xs font-medium">Sarah Chen</p>
			<p className="text-gray-400 text-[10px]">Frontend Developer</p>
		</div>
	</div>
</motion.div>` },
	{ id: 26, title: 'Beacon', category: 'Buttons', preview: <NotificationBell />, size: 'normal', code: `const [hasNotification, setHasNotification] = useState(true)

<motion.button
	onClick={() => setHasNotification(!hasNotification)}
	whileHover={{ scale: 1.1 }}
	whileTap={{ scale: 0.9 }}
	className="relative w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
>
	<Bell className="w-5 h-5" />
	{hasNotification && (
		<motion.div 
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
		>
			<span className="text-white text-xs font-bold">3</span>
		</motion.div>
	)}
</motion.button>` },
	{ id: 27, title: 'Ripple', category: 'Inputs', preview: <SearchSuggestions />, size: 'wide', code: `<motion.div 
	initial={{ y: -10, opacity: 0 }}
	animate={{ y: 0, opacity: 1 }}
	className="w-full max-w-sm bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
>
	<div className="p-4">
		<h4 className="text-white font-medium text-sm mb-3">Recent Searches</h4>
		<div className="space-y-2">
			{['React Components', 'Glassmorphism UI', 'Animation Library'].map((item, index) => (
				<motion.button
					key={index}
					whileHover={{ scale: 1.02, x: 4 }}
					className="w-full flex items-center space-x-2 p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all text-left"
				>
					<Search className="w-4 h-4" />
					<span className="text-sm">{item}</span>
				</motion.button>
			))}
		</div>
	</div>
</motion.div>` },
	{ id: 28, title: 'Flux', category: 'Pricing', preview: <PricingToggle />, size: 'normal', code: `const [isYearly, setIsYearly] = useState(false)

<motion.div 
	className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
>
	<span className={\`text-sm font-medium transition-colors \${!isYearly ? 'text-white' : 'text-gray-400'}\`}>
		Monthly
	</span>
	<motion.button
		onClick={() => setIsYearly(!isYearly)}
		className={\`relative w-14 h-7 rounded-full transition-all duration-300 \${isYearly ? 'bg-purple-500' : 'bg-white/20'}\`}
		whileTap={{ scale: 0.95 }}
	>
		<motion.div
			className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
			animate={{ x: isYearly ? 28 : 4 }}
			transition={{ type: "spring", stiffness: 500, damping: 30 }}
		/>
	</motion.button>
	<span className={\`text-sm font-medium transition-colors \${isYearly ? 'text-white' : 'text-gray-400'}\`}>
		Yearly
	</span>
	{isYearly && (
		<motion.span 
			initial={{ scale: 0, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			className="px-2 py-1 bg-green-500 text-white text-xs rounded-full font-bold"
		>
			20% OFF
		</motion.span>
	)}
</motion.div>` }
]

export default function ComponentsPage() {
	const [selectedCategory, setSelectedCategory] = useState('All')
	const [copiedId, setCopiedId] = useState<number | null>(null)
	const [codeModalOpen, setCodeModalOpen] = useState(false)
	const [selectedComponent, setSelectedComponent] = useState<ComponentType | null>(null)

	const filteredComponents = selectedCategory === 'All' 
		? componentData 
		: componentData.filter(component => component.category === selectedCategory)

	const copyToClipboard = async (componentTitle: string, id: number) => {
		try {
			await navigator.clipboard.writeText(componentTitle)
			setCopiedId(id)
			setTimeout(() => setCopiedId(null), 2000)
		} catch (err) {
			console.error('Failed to copy: ', err)
		}
	}

	const copyCodeToClipboard = async (code: string) => {
		try {
			await navigator.clipboard.writeText(code)
		} catch (err) {
			console.error('Failed to copy code: ', err)
		}
	}

	const openCodeModal = (component: ComponentType) => {
		setSelectedComponent(component)
		setCodeModalOpen(true)
	}

	const getComponentSize = (size: string) => {
		switch (size) {
			case 'wide':
				return 'md:col-span-2 h-64'
			case 'tall':
				return 'md:row-span-2 h-96'
			case 'large':
				return 'md:col-span-2 md:row-span-2 h-96'
			case 'pricing':
				return 'md:col-span-4 lg:col-span-4 xl:col-span-4 h-[28rem]'
			default:
				return 'h-64'
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
							Beautiful aesthetic components with glassmorphism and modern animations
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

					{/* Components Grid - Masonry Layout with Auto Fill */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-min"
					>
						{filteredComponents.map((component, index) => (
							<motion.div
								key={component.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.05 * index }}
								className={`group bg-card border border-border rounded-xl overflow-hidden hover:border-border/60 transition-all duration-300 ${getComponentSize(component.size)}`}
							>
								{/* Component Preview Area */}
								<div className="h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 group-hover:from-gray-800 group-hover:via-gray-900 group-hover:to-gray-800 transition-all duration-300 relative flex flex-col">
									{/* Action Buttons - Top Right */}
									<div className="absolute top-4 right-4 flex space-x-2 z-10">
										<motion.button
											onClick={() => openCodeModal(component)}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											className="p-2 bg-black/40 hover:bg-black/60 rounded-lg transition-all duration-200 backdrop-blur-sm"
											title="View Code"
										>
											<Code2 className="w-4 h-4 text-white/60 hover:text-white" />
										</motion.button>
										<motion.button
											onClick={() => copyToClipboard(component.title, component.id)}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											className="p-2 bg-black/40 hover:bg-black/60 rounded-lg transition-all duration-200 backdrop-blur-sm"
											title="Copy Name"
											>
												{copiedId === component.id ? (
												<Check className="w-4 h-4 text-green-400" />
												) : (
												<Copy className="w-4 h-4 text-white/60 hover:text-white" />
												)}
										</motion.button>
									</div>

									{/* Component Preview - Center */}
									<div className="flex-1 flex items-center justify-center p-4 pb-2 overflow-hidden">
										<div className="max-w-full max-h-full flex items-center justify-center">
											{component.preview}
										</div>
									</div>
									
									{/* Component Name - Bottom - Always Visible */}
									<div className="mt-auto p-3 bg-black/40 backdrop-blur-md border-t border-white/20">
										<h3 className="text-sm font-bold text-white text-center truncate">{component.title}</h3>
									</div>
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

			{/* Code Modal */}
			{codeModalOpen && selectedComponent && (
				<motion.div 
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
					onClick={() => setCodeModalOpen(false)}
				>
					<motion.div 
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Modal Header */}
						<div className="flex items-center justify-between mb-4">
							<div>
								<h3 className="text-xl font-bold text-white">{selectedComponent.title}</h3>
								<p className="text-gray-400 text-sm">{selectedComponent.category} Component</p>
							</div>
							<div className="flex space-x-2">
								<motion.button
									onClick={() => copyCodeToClipboard(selectedComponent.code)}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors text-sm flex items-center space-x-2"
								>
									<Copy className="w-4 h-4" />
									<span>Copy</span>
								</motion.button>
								<motion.button
									onClick={() => setCodeModalOpen(false)}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
								>
									Close
								</motion.button>
							</div>
						</div>

						{/* Code Display */}
						<div className="flex-1 overflow-hidden">
							<pre className="bg-black/50 border border-white/10 rounded-xl p-4 overflow-auto h-full text-sm">
								<code className="text-gray-300 whitespace-pre-wrap font-mono">
									{selectedComponent.code}
								</code>
							</pre>
						</div>
					</motion.div>
				</motion.div>
			)}

			{/* Background Pattern */}
			<div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--muted)/0.1)_0%,transparent_50%)] pointer-events-none" />
			<div className="fixed inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,hsl(var(--muted)/0.05)_60deg,transparent_120deg)] pointer-events-none" />
		</div>
	)
} 