'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check } from 'lucide-react'
import FloatingNavbar from '@/components/floating-navbar'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const categories = [
	'All',
	'SaaS',
	'E-commerce',
	'Portfolio',
	'Agency',
	'Startup',
	'Healthcare',
	'Finance',
	'Education'
]

const landingData = [
	{ 
		id: 1, 
		title: 'SaaS Dashboard', 
		category: 'SaaS', 
		height: 'h-96',
		platform: 'Lovable',
		image: '/api/placeholder/400/800', // Placeholder for now
		prompt: 'Create a modern SaaS dashboard landing page with clean design, feature highlights, pricing tiers, and compelling CTAs. Focus on conversion optimization and user trust signals.',
		rating: 4.9,
		views: '2.5k'
	},
	{ 
		id: 2, 
		title: 'E-commerce Store', 
		category: 'E-commerce', 
		height: 'h-112',
		platform: 'Webflow',
		image: '/api/placeholder/400/900',
		prompt: 'Design a high-converting e-commerce landing page with product showcase, customer reviews, secure checkout indicators, and mobile-optimized layout.',
		rating: 4.8,
		views: '3.2k'
	},
	{ 
		id: 3, 
		title: 'Creative Portfolio', 
		category: 'Portfolio', 
		height: 'h-88',
		platform: 'Framer',
		image: '/api/placeholder/400/700',
		prompt: 'Build a stunning creative portfolio with smooth animations, project galleries, about section, and contact form. Emphasize visual storytelling and personal branding.',
		rating: 4.9,
		views: '1.8k'
	},
	{ 
		id: 4, 
		title: 'Digital Agency', 
		category: 'Agency', 
		height: 'h-104',
		platform: 'Lovable',
		image: '/api/placeholder/400/850',
		prompt: 'Create a professional digital agency website with service offerings, team showcase, client testimonials, and case studies. Focus on building credibility and expertise.',
		rating: 4.7,
		views: '2.1k'
	},
	{ 
		id: 5, 
		title: 'Tech Startup', 
		category: 'Startup', 
		height: 'h-100',
		platform: 'V0',
		image: '/api/placeholder/400/800',
		prompt: 'Design a compelling startup landing page with problem-solution fit, product demo, founding team, investor logos, and early access signup form.',
		rating: 4.8,
		views: '2.9k'
	},
	{ 
		id: 6, 
		title: 'Medical Practice', 
		category: 'Healthcare', 
		height: 'h-92',
		platform: 'Webflow',
		image: '/api/placeholder/400/750',
		prompt: 'Build a trustworthy medical practice website with doctor profiles, services, appointment booking, patient testimonials, and insurance information.',
		rating: 4.6,
		views: '1.5k'
	},
	{ 
		id: 7, 
		title: 'Banking App', 
		category: 'Finance', 
		height: 'h-108',
		platform: 'Lovable',
		image: '/api/placeholder/400/870',
		prompt: 'Create a secure banking app landing page with security features, account benefits, mobile app download, regulatory compliance, and customer support.',
		rating: 4.9,
		views: '3.5k'
	},
	{ 
		id: 8, 
		title: 'Online Course', 
		category: 'Education', 
		height: 'h-96',
		platform: 'Framer',
		image: '/api/placeholder/400/800',
		prompt: 'Design an engaging online course platform with curriculum overview, instructor bios, student success stories, pricing options, and free trial offer.',
		rating: 4.7,
		views: '2.3k'
	},
	{ 
		id: 9, 
		title: 'SaaS Analytics', 
		category: 'SaaS', 
		height: 'h-104',
		platform: 'V0',
		image: '/api/placeholder/400/850',
		prompt: 'Build a data-driven SaaS analytics platform page with dashboard previews, integration options, real-time metrics, and ROI calculator.',
		rating: 4.8,
		views: '2.7k'
	},
	{ 
		id: 10, 
		title: 'Fashion Store', 
		category: 'E-commerce', 
		height: 'h-100',
		platform: 'Webflow',
		image: '/api/placeholder/400/800',
		prompt: 'Create a trendy fashion e-commerce site with seasonal collections, size guides, style lookbooks, customer photos, and social proof.',
		rating: 4.6,
		views: '1.9k'
	},
	{ 
		id: 11, 
		title: 'Designer Portfolio', 
		category: 'Portfolio', 
		height: 'h-112',
		platform: 'Framer',
		image: '/api/placeholder/400/900',
		prompt: 'Design a sophisticated designer portfolio with case studies, design process, client work, awards, and contact information. Focus on visual impact.',
		rating: 4.9,
		views: '2.8k'
	},
	{ 
		id: 12, 
		title: 'Marketing Agency', 
		category: 'Agency', 
		height: 'h-92',
		platform: 'Lovable',
		image: '/api/placeholder/400/750',
		prompt: 'Build a results-driven marketing agency site with service packages, campaign results, client logos, team expertise, and consultation booking.',
		rating: 4.7,
		views: '2.4k'
	},
	{ 
		id: 13, 
		title: 'Fintech Startup', 
		category: 'Startup', 
		height: 'h-108',
		platform: 'V0',
		image: '/api/placeholder/400/870',
		prompt: 'Create a modern fintech startup page with app features, security measures, regulatory compliance, user testimonials, and beta signup.',
		rating: 4.8,
		views: '3.1k'
	},
	{ 
		id: 14, 
		title: 'Dental Clinic', 
		category: 'Healthcare', 
		height: 'h-96',
		platform: 'Webflow',
		image: '/api/placeholder/400/800',
		prompt: 'Design a welcoming dental clinic website with services, dentist profiles, before/after photos, appointment scheduling, and insurance accepted.',
		rating: 4.5,
		views: '1.7k'
	},
	{ 
		id: 15, 
		title: 'Investment Platform', 
		category: 'Finance', 
		height: 'h-104',
		platform: 'Lovable',
		image: '/api/placeholder/400/850',
		prompt: 'Build a professional investment platform with portfolio tools, market analysis, risk assessment, educational resources, and account opening.',
		rating: 4.9,
		views: '3.3k'
	},
	{ 
		id: 16, 
		title: 'Learning Platform', 
		category: 'Education', 
		height: 'h-100',
		platform: 'Framer',
		image: '/api/placeholder/400/800',
		prompt: 'Create an interactive learning platform with course catalog, progress tracking, certificates, community features, and subscription plans.',
		rating: 4.7,
		views: '2.6k'
	},
]

export default function LandingsPage() {
	const [selectedCategory, setSelectedCategory] = useState('All')
	const [selectedLanding, setSelectedLanding] = useState<typeof landingData[0] | null>(null)
	const [copiedId, setCopiedId] = useState<number | null>(null)

	const filteredLandings = selectedCategory === 'All' 
		? landingData 
		: landingData.filter(landing => landing.category === selectedCategory)

	const copyToClipboard = async (content: string, id: number) => {
		try {
			await navigator.clipboard.writeText(content)
			setCopiedId(id)
			setTimeout(() => setCopiedId(null), 2000)
		} catch (err) {
			console.error('Failed to copy text: ', err)
		}
	}

	const getPlatformColor = (platform: string) => {
		switch (platform) {
			case 'Lovable': return 'bg-purple-500/20 text-purple-400'
			case 'Webflow': return 'bg-blue-500/20 text-blue-400'
			case 'Framer': return 'bg-pink-500/20 text-pink-400'
			case 'V0': return 'bg-green-500/20 text-green-400'
			default: return 'bg-gray-500/20 text-gray-400'
		}
	}

	return (
		<div className="min-h-screen bg-background">
			<FloatingNavbar />
			
			<main className="pt-36 pb-16">
				<div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-12">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
							Landing Pages
						</h1>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Beautiful, conversion-optimized landing page designs for every industry and use case
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

					{/* Bigger Masonry Grid */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
					>
						{filteredLandings.map((landing, index) => (
							<motion.div
								key={landing.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 * index }}
								className="break-inside-avoid mb-8"
							>
								<div 
									className="group bg-card border border-border rounded-3xl overflow-hidden hover:bg-accent/10 hover:border-border/60 transition-all duration-300 cursor-pointer"
									onClick={() => setSelectedLanding(landing)}
								>
									{/* Landing Page Image */}
									<div className={`${landing.height} relative overflow-hidden bg-muted`}>
										<Image
											src={landing.image}
											alt={landing.title}
											fill
											className="object-cover group-hover:scale-105 transition-transform duration-300"
										/>
									</div>
									
									{/* Content */}
									<div className="p-6">
										<div className="space-y-4">
											{/* Header */}
											<div className="flex items-center justify-between">
												<h3 className="text-lg font-semibold text-foreground">
													{landing.title}
												</h3>
												<span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
													{landing.category}
												</span>
											</div>

											{/* Platform Tag */}
											<div className="flex items-center justify-between">
												<span className={`text-xs px-3 py-1 rounded-full font-medium ${getPlatformColor(landing.platform)}`}>
													{landing.platform}
												</span>
												<div className="flex items-center space-x-3 text-muted-foreground">
													<span className="text-sm">⭐ {landing.rating}</span>
													<span className="text-sm">•</span>
													<span className="text-sm">{landing.views} views</span>
												</div>
											</div>

											{/* Prompt Preview */}
											<div className="space-y-2">
												<h4 className="text-sm font-medium text-foreground">Prompt:</h4>
												<p className="text-sm text-muted-foreground overflow-hidden" style={{
													display: '-webkit-box',
													WebkitLineClamp: 2,
													WebkitBoxOrient: 'vertical'
												}}>
													{landing.prompt}
												</p>
											</div>
										</div>
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
						className="text-center mt-16"
					>
						<Button
							variant="ghost"
							className="bg-muted text-foreground hover:bg-accent rounded-xl px-8 py-3"
						>
							Load More Landing Pages
						</Button>
					</motion.div>
				</div>
			</main>

			{/* Modal for Full Image View */}
			<AnimatePresence>
				{selectedLanding && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
						onClick={() => setSelectedLanding(null)}
					>
											<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0 }}
						className="bg-card border border-border rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden"
						onClick={(e) => e.stopPropagation()}
					>
							{/* Header */}
							<div className="flex items-center justify-between p-6 border-b border-border">
								<div className="flex items-center space-x-4">
									<h2 className="text-xl font-semibold text-foreground">{selectedLanding.title}</h2>
									<span className={`text-xs px-3 py-1 rounded-full font-medium ${getPlatformColor(selectedLanding.platform)}`}>
										{selectedLanding.platform}
									</span>
								</div>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setSelectedLanding(null)}
									className="text-muted-foreground hover:text-foreground"
								>
									<X className="w-5 h-5" />
								</Button>
							</div>

							{/* Content */}
							<div className="flex flex-col xl:flex-row">
								{/* Full Image */}
								<div className="xl:w-2/3 relative h-96 xl:h-[700px] bg-muted">
									<Image
										src={selectedLanding.image}
										alt={selectedLanding.title}
										fill
										className="object-cover"
									/>
								</div>

								{/* Details */}
								<div className="xl:w-1/3 p-6 space-y-6 overflow-y-auto max-h-[700px]">
									{/* Stats */}
									<div className="flex items-center space-x-6 text-sm text-muted-foreground">
										<span>⭐ {selectedLanding.rating}</span>
										<span>{selectedLanding.views} views</span>
										<span className="px-2 py-1 bg-muted rounded text-xs">{selectedLanding.category}</span>
									</div>

									{/* Prompt Section */}
									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<h3 className="text-lg font-semibold text-foreground">
												{selectedLanding.platform} Prompt
											</h3>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => copyToClipboard(selectedLanding.prompt, selectedLanding.id)}
												className="text-muted-foreground hover:text-foreground"
											>
												{copiedId === selectedLanding.id ? (
													<Check className="w-4 h-4 text-green-500" />
												) : (
													<Copy className="w-4 h-4" />
												)}
											</Button>
										</div>
										
										<div className="bg-muted p-4 rounded-lg">
											<p className="text-sm text-foreground leading-relaxed">
												{selectedLanding.prompt}
											</p>
										</div>
									</div>

									{/* Platform Info */}
									<div className="space-y-3">
										<h4 className="font-medium text-foreground">About {selectedLanding.platform}</h4>
										<div className="text-sm text-muted-foreground space-y-2">
											{selectedLanding.platform === 'Lovable' && (
												<p>Lovable is an AI-powered web development platform that builds full-stack applications from prompts.</p>
											)}
											{selectedLanding.platform === 'Webflow' && (
												<p>Webflow is a visual web development platform for designing, building, and launching responsive websites.</p>
											)}
											{selectedLanding.platform === 'Framer' && (
												<p>Framer is a powerful design tool for creating interactive prototypes and production-ready websites.</p>
											)}
											{selectedLanding.platform === 'V0' && (
												<p>V0 is Vercel&apos;s generative user interface system powered by AI for rapid UI development.</p>
											)}
										</div>
									</div>

									{/* Action Buttons */}
									<div className="flex space-x-3 pt-4">
										<Button className="flex-1">
											Use This Design
										</Button>
										<Button variant="outline" className="flex-1">
											View Live Demo
										</Button>
									</div>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Background Pattern */}
			<div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--muted)/0.1)_0%,transparent_50%)] pointer-events-none" />
			<div className="fixed inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,hsl(var(--muted)/0.05)_60deg,transparent_120deg)] pointer-events-none" />
		</div>
	)
} 