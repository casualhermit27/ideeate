'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Code2, Sparkles, Calendar, ChevronLeft, ChevronRight, Menu, X, Search, Heart, Star, ShoppingCart, Download, Play, Pause, Volume2, SkipBack, SkipForward, Plus, Bell, Settings, User, Mail, Phone, MapPin, Globe, Lock, Eye, EyeOff, Zap } from 'lucide-react'
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
	'Notifications'
]

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

const componentData = [
	{ id: 1, title: 'Glassmorphism Button', category: 'Buttons', preview: <GlassmorphismButton />, size: 'normal' },
	{ id: 3, title: 'Floating Navigation', category: 'Navigation', preview: <FloatingNav />, size: 'wide' },
	{ id: 4, title: 'Glass Card', category: 'Cards', preview: <GlassCard />, size: 'tall' },
	{ id: 5, title: 'Floating Search', category: 'Inputs', preview: <FloatingSearchBar />, size: 'wide' },
	{ id: 6, title: 'Glass Toggle', category: 'Toggles', preview: <GlassmorphToggle />, size: 'normal' },
	{ id: 7, title: 'Floating Notification', category: 'Notifications', preview: <FloatingNotification />, size: 'wide' },
	{ id: 8, title: 'Gradient Button', category: 'Buttons', preview: <GradientButton />, size: 'normal' },
	{ id: 9, title: 'Floating Profile', category: 'Cards', preview: <FloatingProfile />, size: 'normal' },
	{ id: 10, title: 'Animated Counter', category: 'Buttons', preview: <AnimatedCounter />, size: 'normal' },
	{ id: 11, title: 'Glowing Input', category: 'Inputs', preview: <GlowingInput />, size: 'wide' },
	{ id: 12, title: 'Floating Action Button', category: 'Buttons', preview: <FloatingActionButton />, size: 'tall' },
	{ id: 13, title: 'Password Input', category: 'Inputs', preview: <PasswordInput />, size: 'wide' },
	{ id: 14, title: 'Audio Player', category: 'Players', preview: <AudioPlayer />, size: 'normal' },
	{ id: 15, title: 'Glass Modal', category: 'Cards', preview: <GlassModal />, size: 'normal' }
]

export default function ComponentsPage() {
	const [selectedCategory, setSelectedCategory] = useState('All')
	const [copiedId, setCopiedId] = useState<number | null>(null)

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

	const getComponentSize = (size: string) => {
		switch (size) {
			case 'wide':
				return 'md:col-span-2 h-64'
			case 'tall':
				return 'md:row-span-2 h-96'
			case 'large':
				return 'md:col-span-2 md:row-span-2 h-96'
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

					{/* Components Grid - Consistent Spacing */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
									{/* Copy Button - Top Right */}
									<motion.button
										onClick={() => copyToClipboard(component.title, component.id)}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-lg transition-all duration-200 backdrop-blur-sm z-10"
									>
										{copiedId === component.id ? (
											<Check className="w-4 h-4 text-green-400" />
										) : (
											<Copy className="w-4 h-4 text-white/60 hover:text-white" />
										)}
									</motion.button>

									{/* Component Preview - Center */}
									<div className="flex-1 flex items-center justify-center p-6">
										{component.preview}
									</div>
									
									{/* Component Name - Bottom */}
									<div className="p-4 bg-black/20 backdrop-blur-sm border-t border-white/10">
										<h3 className="text-sm font-semibold text-white text-center">{component.title}</h3>
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

			{/* Background Pattern */}
			<div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--muted)/0.1)_0%,transparent_50%)] pointer-events-none" />
			<div className="fixed inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,hsl(var(--muted)/0.05)_60deg,transparent_120deg)] pointer-events-none" />
		</div>
	)
} 