'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Code, Eye } from 'lucide-react'
import { HolographicTradingCard } from '@/components/cards/holographic-trading-card'
import { MorphingProfileCard } from '@/components/cards/morphing-profile-card'
import { QuantumUncertaintyCard } from '@/components/cards/quantum-uncertainty-card'
import { CrystallineInfoCard } from '@/components/cards/crystalline-info-card'
import { MagneticAttractionCard } from '@/components/cards/magnetic-attraction-card'
import { ConstellationNavigator } from '@/components/navigation/constellation-navigator'
import { LiquidBlobMenu } from '@/components/navigation/liquid-blob-menu'
import { OrbitalRingMenu } from '@/components/navigation/orbital-ring-menu'
import { CrystallineFacetMenu } from '@/components/navigation/crystalline-facet-menu'
import { NeuralNetworkMenu } from '@/components/navigation/neural-network-menu'

const components = [
	{
		id: 'holographic-trading-card',
		title: 'Holographic Trading Cards',
		description: 'Create collectible cards with holographic foil effects, 3D tilt interactions, and rarity-based particle emissions',
		category: 'Cards',
		component: HolographicTradingCard,
		prompt: 'Create collectible cards with holographic foil effects, 3D tilt interactions, and rarity-based particle emissions',
	},
	{
		id: 'morphing-profile-card',
		title: 'Morphing Profile Cards',
		description: 'Design cards that transform shape and layout based on user role, with liquid transitions',
		category: 'Cards',
		component: MorphingProfileCard,
		prompt: 'Design cards that transform shape and layout based on user role, with liquid transitions',
	},
	{
		id: 'quantum-uncertainty-card',
		title: 'Quantum Uncertainty Cards',
		description: 'Build cards that exist in multiple states simultaneously until observed, with probability wave animations',
		category: 'Cards',
		component: QuantumUncertaintyCard,
		prompt: 'Build cards that exist in multiple states simultaneously until observed, with probability wave animations',
	},
	{
		id: 'crystalline-info-card',
		title: 'Crystalline Info Cards',
		description: 'Create cards with faceted crystal surfaces that refract light and reveal information through different angles',
		category: 'Cards',
		component: CrystallineInfoCard,
		prompt: 'Create cards with faceted crystal surfaces that refract light and reveal information through different angles',
	},
	{
		id: 'magnetic-attraction-card',
		title: 'Magnetic Attraction Cards',
		description: 'Design cards that are magnetically attracted to cursor, with realistic physics and snap behaviors',
		category: 'Cards',
		component: MagneticAttractionCard,
		prompt: 'Design cards that are magnetically attracted to cursor, with realistic physics and snap behaviors',
	},
	{
		id: 'constellation-navigator',
		title: 'Constellation Navigator',
		description: 'Create a menu where items are stars in constellations, connected by animated light paths',
		category: 'Navigation',
		component: ConstellationNavigator,
		prompt: 'Create a menu where items are stars in constellations, connected by animated light paths',
	},
	{
		id: 'liquid-blob-menu',
		title: 'Liquid Blob Menu',
		description: 'Design a navigation that morphs like liquid blobs, with items emerging from fluid surfaces',
		category: 'Navigation',
		component: LiquidBlobMenu,
		prompt: 'Design a navigation that morphs like liquid blobs, with items emerging from fluid surfaces',
	},
	{
		id: 'orbital-ring-menu',
		title: 'Orbital Ring Menu',
		description: 'Build a menu with items orbiting around a central point with gravitational physics',
		category: 'Navigation',
		component: OrbitalRingMenu,
		prompt: 'Build a menu with items orbiting around a central point with gravitational physics',
	},
	{
		id: 'crystalline-facet-menu',
		title: 'Crystalline Facet Menu',
		description: 'Create a menu that grows like crystal formations with geometric faceted surfaces',
		category: 'Navigation',
		component: CrystallineFacetMenu,
		prompt: 'Create a menu that grows like crystal formations with geometric faceted surfaces',
	},
	{
		id: 'neural-network-menu',
		title: 'Neural Network Menu',
		description: 'Design navigation as a neural network with synaptic firing animations',
		category: 'Navigation',
		component: NeuralNetworkMenu,
		prompt: 'Design navigation as a neural network with synaptic firing animations',
	},
]

export default function ComponentsShowcase() {
	const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
	const [showCode, setShowCode] = useState<{ [key: string]: boolean }>({})
	const [filter, setFilter] = useState<'All' | 'Cards' | 'Navigation'>('All')

	const filteredComponents = components.filter(
		comp => filter === 'All' || comp.category === filter
	)

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text)
	}

	const toggleCode = (componentId: string) => {
		setShowCode(prev => ({
			...prev,
			[componentId]: !prev[componentId]
		}))
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
			{/* Hero Section */}
			<div className="relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20" />
				<div className="relative px-6 py-24">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center"
					>
						<h1 className="text-6xl font-bold text-white mb-6">
							Advanced Components
						</h1>
						<p className="text-xl text-gray-300 max-w-3xl mx-auto">
							Cutting-edge UI components with stunning animations, physics simulations, and interactive effects.
							Each component comes with code preview and copyable prompts.
						</p>
					</motion.div>
				</div>
			</div>

			{/* Filter Tabs */}
			<div className="px-6 py-8">
				<div className="flex justify-center space-x-4">
					{['All', 'Cards', 'Navigation'].map((category) => (
						<button
							key={category}
							onClick={() => setFilter(category as any)}
							className={`px-6 py-3 rounded-full transition-all duration-300 ${
								filter === category
									? 'bg-white text-black'
									: 'bg-white/10 text-white hover:bg-white/20'
							}`}
						>
							{category}
						</button>
					))}
				</div>
			</div>

			{/* Components Grid */}
			<div className="px-6 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
					{filteredComponents.map((comp, index) => {
						const Component = comp.component
						
						return (
							<motion.div
								key={comp.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
							>
								{/* Header */}
								<div className="flex items-center justify-between mb-4">
									<div>
										<h3 className="text-xl font-bold text-white">{comp.title}</h3>
										<span className="text-sm text-gray-400">{comp.category}</span>
									</div>
									<div className="flex space-x-2">
										<button
											onClick={() => toggleCode(comp.id)}
											className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
											title="Toggle Code"
										>
											<Code className="w-4 h-4 text-white" />
										</button>
										<button
											onClick={() => copyToClipboard(comp.prompt)}
											className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
											title="Copy Prompt"
										>
											<Copy className="w-4 h-4 text-white" />
										</button>
									</div>
								</div>

								{/* Description */}
								<p className="text-gray-300 text-sm mb-6">{comp.description}</p>

								{/* Component Preview */}
								<div className="bg-black/20 rounded-xl p-6 mb-4 min-h-[300px] flex items-center justify-center">
									<Component />
								</div>

								{/* Code Preview */}
								{showCode[comp.id] && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: 'auto' }}
										exit={{ opacity: 0, height: 0 }}
										className="bg-black/40 rounded-lg p-4 overflow-hidden"
									>
										<div className="flex items-center justify-between mb-2">
											<span className="text-sm text-gray-400">Component Code</span>
											<button
												onClick={() => copyToClipboard(`// ${comp.prompt}\n// Implementation coming soon...`)}
												className="text-xs text-blue-400 hover:text-blue-300"
											>
												Copy Code
											</button>
										</div>
										<pre className="text-xs text-green-400 overflow-x-auto">
											<code>{`// ${comp.prompt}\n// Implementation: Advanced ${comp.title}\n// Features: Framer Motion, 3D CSS, Physics Simulation`}</code>
										</pre>
									</motion.div>
								)}

								{/* Prompt */}
								<div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-3">
									<div className="flex items-center justify-between">
										<span className="text-xs text-gray-400">AI Prompt</span>
										<button
											onClick={() => copyToClipboard(comp.prompt)}
											className="text-xs text-blue-400 hover:text-blue-300"
										>
											Copy Prompt
										</button>
									</div>
									<p className="text-sm text-white mt-1 italic">"{comp.prompt}"</p>
								</div>
							</motion.div>
						)
					})}
				</div>
			</div>
		</div>
	)
} 