'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Code, Eye, Check } from 'lucide-react'
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

interface ComponentItem {
	id: string
	title: string
	prompt: string
	category: 'cards' | 'navigation'
	component: React.ComponentType
	description: string
	codeSnippet: string
}

export default function ComponentsShowcase() {
	const [activeView, setActiveView] = useState<'preview' | 'code'>('preview')
	const [selectedComponent, setSelectedComponent] = useState<string>('holographic-trading-card')
	const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})

	const components: ComponentItem[] = [
		{
			id: 'holographic-trading-card',
			title: 'Holographic Trading Cards',
			prompt: 'Create collectible cards with holographic foil effects, 3D tilt interactions, and rarity-based particle emissions',
			category: 'cards',
			component: HolographicTradingCard,
			description: 'Interactive trading cards with realistic holographic effects, 3D mouse tracking, and dynamic particle systems based on rarity levels.',
			codeSnippet: `<HolographicTradingCard 
	rarity="legendary"
	character={{
		name: "Quantum Phoenix",
		power: 9500,
		image: "🔥",
		description: "A mystical creature that exists between dimensions"
	}}
/>`
		},
		{
			id: 'morphing-profile-card',
			title: 'Morphing Profile Cards',
			prompt: 'Design cards that transform shape and layout based on user role, with liquid transitions',
			category: 'cards',
			component: MorphingProfileCard,
			description: 'Profile cards that dynamically morph their shape, layout, and content based on the user\'s role with smooth liquid transitions.',
			codeSnippet: `<MorphingProfileCard 
	profile={{
		name: "Alex Rivera",
		role: "developer",
		avatar: "👨‍💻",
		skills: ["React", "TypeScript", "Node.js"],
		experience: "5 years",
		location: "San Francisco"
	}}
/>`
		},
		{
			id: 'quantum-uncertainty-card',
			title: 'Quantum Uncertainty Cards',
			prompt: 'Build cards that exist in multiple states simultaneously until observed, with probability wave animations',
			category: 'cards',
			component: QuantumUncertaintyCard,
			description: 'Cards inspired by quantum mechanics that exist in superposition until observed, featuring probability wave animations and measurement collapse effects.',
			codeSnippet: `<QuantumUncertaintyCard />

// Features:
// - Superposition state with multiple overlapping possibilities
// - Wave function collapse on observation
// - Probability-based state selection
// - Quantum field particle effects`
		},
		{
			id: 'crystalline-info-card',
			title: 'Crystalline Info Cards',
			prompt: 'Create cards with faceted crystal surfaces that refract light and reveal information through different angles',
			category: 'cards',
			component: CrystallineInfoCard,
			description: 'Crystal-inspired cards with faceted surfaces that refract light and reveal different information layers through various viewing angles.',
			codeSnippet: `<CrystallineInfoCard />

// Features:
// - Multiple crystal facets with different information
// - Light refraction effects
// - 3D perspective transformations
// - Interactive facet selection`
		},
		{
			id: 'magnetic-attraction-card',
			title: 'Magnetic Attraction Cards',
			prompt: 'Design cards that are magnetically attracted to cursor, with realistic physics and snap behaviors',
			category: 'cards',
			component: MagneticAttractionCard,
			description: 'Cards with realistic magnetic field physics that respond to cursor proximity with attraction forces and snap behaviors.',
			codeSnippet: `<MagneticAttractionCard />

// Features:
// - Magnetic field visualization
// - Realistic physics simulation
// - Distance-based attraction strength
// - Snap behavior when very close
// - Electromagnetic visual effects`
		},
		{
			id: 'constellation-navigator',
			title: 'Constellation Navigator',
			prompt: 'Create a menu where items are stars in constellations, connected by animated light paths',
			category: 'navigation',
			component: ConstellationNavigator,
			description: 'Navigation menu styled as an interactive star constellation with animated light paths connecting related items.',
			codeSnippet: `<ConstellationNavigator />

// Features:
// - Interactive star map navigation
// - Dynamic constellation connections
// - Animated light paths
// - Star brightness and grouping
// - Hover effects with energy pulses`
		},
		{
			id: 'liquid-blob-menu',
			title: 'Liquid Blob Menu',
			prompt: 'Design a navigation that morphs like liquid blobs, with items emerging from fluid surfaces',
			category: 'navigation',
			component: LiquidBlobMenu,
			description: 'Fluid navigation system that morphs and flows like liquid with menu items emerging from blob surfaces.',
			codeSnippet: `<LiquidBlobMenu />

// Features:
// - Liquid blob morphing animations
// - Fluid surface effects
// - Expandable central blob
// - Ripple and wave animations
// - Smooth liquid connections`
		},
		{
			id: 'orbital-ring-menu',
			title: 'Orbital Ring Menu',
			prompt: 'Build a menu with items orbiting around a central point with gravitational physics',
			category: 'navigation',
			component: OrbitalRingMenu,
			description: 'Menu system with items orbiting around a central gravitational body, featuring realistic orbital mechanics.',
			codeSnippet: `<OrbitalRingMenu />

// Features:
// - Gravitational physics simulation
// - Multiple orbital rings
// - Planetary menu items
// - Orbital speed variations
// - Gravitational wave effects`
		},
		{
			id: 'crystalline-facet-menu',
			title: 'Crystalline Facet Menu',
			prompt: 'Create a menu that grows like crystal formations with geometric faceted surfaces',
			category: 'navigation',
			component: CrystallineFacetMenu,
			description: 'Navigation that grows organically like crystal formations with geometric faceted surfaces and refraction effects.',
			codeSnippet: `<CrystallineFacetMenu />

// Features:
// - Crystal growth animations
// - Geometric faceted surfaces
// - Light refraction effects
// - Organic growth patterns
// - Interactive crystal selection`
		},
		{
			id: 'neural-network-menu',
			title: 'Neural Network Menu',
			prompt: 'Design navigation as a neural network with synaptic firing animations',
			category: 'navigation',
			component: NeuralNetworkMenu,
			description: 'Neural network-inspired navigation with interconnected nodes and real-time synaptic firing animations.',
			codeSnippet: `<NeuralNetworkMenu />

// Features:
// - Multi-layer neural network structure
// - Synaptic firing animations
// - Electrical activity visualization
// - Network propagation effects
// - Interactive neuron selection`
		}
	]

	const selectedComp = components.find(c => c.id === selectedComponent)
	const SelectedComponent = selectedComp?.component

	const copyToClipboard = async (text: string, type: 'prompt' | 'code', componentId: string) => {
		try {
			await navigator.clipboard.writeText(text)
			setCopiedStates(prev => ({ ...prev, [`${componentId}-${type}`]: true }))
			setTimeout(() => {
				setCopiedStates(prev => ({ ...prev, [`${componentId}-${type}`]: false }))
			}, 2000)
		} catch (err) {
			console.error('Failed to copy text: ', err)
		}
	}

	const cardComponents = components.filter(c => c.category === 'cards')
	const navigationComponents = components.filter(c => c.category === 'navigation')

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
			<div className="container mx-auto px-6 py-12">
				{/* Header */}
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
						Advanced UI Components
					</h1>
					<p className="text-gray-300 text-xl max-w-3xl mx-auto">
						A collection of cutting-edge UI components with modern animations, physics simulations, and interactive effects.
					</p>
				</motion.div>

				<div className="grid lg:grid-cols-12 gap-8">
					{/* Component List Sidebar */}
					<div className="lg:col-span-4">
						<div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sticky top-6">
							<h2 className="text-2xl font-bold text-white mb-6">Components</h2>
							
							{/* Cards Section */}
							<div className="mb-8">
								<h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
									<span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
									Interactive Cards ({cardComponents.length})
								</h3>
								<div className="space-y-2">
									{cardComponents.map((component) => (
										<button
											key={component.id}
											onClick={() => setSelectedComponent(component.id)}
											className={`
												w-full text-left p-3 rounded-lg transition-all duration-200
												${selectedComponent === component.id
													? 'bg-blue-500/20 border border-blue-400/50 text-white'
													: 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white'
												}
											`}
										>
											<div className="font-medium text-sm">{component.title}</div>
											<div className="text-xs opacity-70 mt-1">{component.description.slice(0, 60)}...</div>
										</button>
									))}
								</div>
							</div>

							{/* Navigation Section */}
							<div>
								<h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
									<span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
									Navigation Menus ({navigationComponents.length})
								</h3>
								<div className="space-y-2">
									{navigationComponents.map((component) => (
										<button
											key={component.id}
											onClick={() => setSelectedComponent(component.id)}
											className={`
												w-full text-left p-3 rounded-lg transition-all duration-200
												${selectedComponent === component.id
													? 'bg-purple-500/20 border border-purple-400/50 text-white'
													: 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white'
												}
											`}
										>
											<div className="font-medium text-sm">{component.title}</div>
											<div className="text-xs opacity-70 mt-1">{component.description.slice(0, 60)}...</div>
										</button>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Main Content Area */}
					<div className="lg:col-span-8">
						{selectedComp && (
							<motion.div
								key={selectedComponent}
								className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4 }}
							>
								{/* Component Header */}
								<div className="p-6 border-b border-white/10">
									<div className="flex items-center justify-between mb-4">
										<h2 className="text-2xl font-bold text-white">{selectedComp.title}</h2>
										<div className="flex items-center space-x-2">
											<button
												onClick={() => setActiveView('preview')}
												className={`
													px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200
													${activeView === 'preview'
														? 'bg-blue-500 text-white'
														: 'bg-white/10 text-gray-300 hover:bg-white/20'
													}
												`}
											>
												<Eye size={16} />
												<span>Preview</span>
											</button>
											<button
												onClick={() => setActiveView('code')}
												className={`
													px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200
													${activeView === 'code'
														? 'bg-purple-500 text-white'
														: 'bg-white/10 text-gray-300 hover:bg-white/20'
													}
												`}
											>
												<Code size={16} />
												<span>Code</span>
											</button>
										</div>
									</div>
									
									<p className="text-gray-300 mb-4">{selectedComp.description}</p>
									
									{/* Copyable Prompt */}
									<div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg p-4 border border-indigo-500/20">
										<div className="flex items-start justify-between">
											<div className="flex-1">
												<div className="text-sm text-indigo-300 font-medium mb-1">AI Prompt</div>
												<div className="text-white italic">"{selectedComp.prompt}"</div>
											</div>
											<button
												onClick={() => copyToClipboard(selectedComp.prompt, 'prompt', selectedComp.id)}
												className="ml-4 p-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 transition-all duration-200"
											>
												{copiedStates[`${selectedComp.id}-prompt`] ? (
													<Check size={16} className="text-green-400" />
												) : (
													<Copy size={16} className="text-indigo-300" />
												)}
											</button>
										</div>
									</div>
								</div>

								{/* Content Area */}
								<div className="p-6">
									{activeView === 'preview' ? (
										<div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-8 min-h-[500px] flex items-center justify-center">
											{SelectedComponent && <SelectedComponent />}
										</div>
									) : (
										<div className="space-y-4">
											{/* Code Block */}
											<div className="bg-gray-900/80 rounded-lg overflow-hidden">
												<div className="flex items-center justify-between px-4 py-2 bg-gray-800/60 border-b border-gray-700">
													<span className="text-sm text-gray-300 font-medium">Component Usage</span>
													<button
														onClick={() => copyToClipboard(selectedComp.codeSnippet, 'code', selectedComp.id)}
														className="p-1 rounded hover:bg-gray-700/50 transition-all duration-200"
													>
														{copiedStates[`${selectedComp.id}-code`] ? (
															<Check size={16} className="text-green-400" />
														) : (
															<Copy size={16} className="text-gray-400" />
														)}
													</button>
												</div>
												<pre className="p-4 text-sm text-gray-300 overflow-x-auto">
													<code>{selectedComp.codeSnippet}</code>
												</pre>
											</div>

											{/* Installation Instructions */}
											<div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
												<h4 className="text-blue-300 font-medium mb-2">Installation & Dependencies</h4>
												<div className="text-sm text-gray-300 space-y-1">
													<div>• framer-motion (animations)</div>
													<div>• @lucide-react (icons)</div>
													<div>• tailwindcss (styling)</div>
													<div>• react & typescript</div>
												</div>
											</div>
										</div>
									)}
								</div>
							</motion.div>
						)}
					</div>
				</div>

				{/* Footer Stats */}
				<motion.div
					className="mt-16 text-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8, duration: 0.6 }}
				>
					<div className="inline-flex items-center space-x-8 bg-black/30 backdrop-blur-sm rounded-full px-8 py-4 border border-white/10">
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-400">{cardComponents.length}</div>
							<div className="text-sm text-gray-400">Interactive Cards</div>
						</div>
						<div className="w-px h-8 bg-white/20"></div>
						<div className="text-center">
							<div className="text-2xl font-bold text-purple-400">{navigationComponents.length}</div>
							<div className="text-sm text-gray-400">Navigation Menus</div>
						</div>
						<div className="w-px h-8 bg-white/20"></div>
						<div className="text-center">
							<div className="text-2xl font-bold text-green-400">{components.length}</div>
							<div className="text-sm text-gray-400">Total Components</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	)
} 