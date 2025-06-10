'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import FloatingNavbar from '@/components/floating-navbar'
import Image from 'next/image'
import ImageModal from '@/components/image-modal'

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
		height: 'h-80',
		platform: 'Lovable',
		image: '/images/stacktrakr.png',
		prompt: 'Create a modern SaaS dashboard landing page with clean design, feature highlights, pricing tiers, and compelling CTAs. Focus on conversion optimization and user trust signals.',
		repository: 'https://github.com/casualhermit27/saas-dashboard-template',
		rating: 4.9,
		views: '2.5k'
	},
	{ 
		id: 2, 
		title: 'E-commerce Store', 
		category: 'E-commerce', 
		height: 'h-96',
		platform: 'Webflow',
		image: '/images/contractiq.png',
		prompt: 'Design a high-converting e-commerce landing page with product showcase, customer reviews, secure checkout indicators, and mobile-optimized layout.',
		repository: 'https://github.com/casualhermit27/ecommerce-landing-template',
		rating: 4.8,
		views: '3.2k'
	},
	{ 
		id: 3, 
		title: 'Creative Portfolio', 
		category: 'Portfolio', 
		height: 'h-72',
		platform: 'Framer',
		image: '/images/Trendify.png',
		prompt: 'Build a stunning creative portfolio with smooth animations, project galleries, about section, and contact form. Emphasize visual storytelling and personal branding.',
		repository: 'https://github.com/casualhermit27/creative-portfolio-template',
		rating: 4.9,
		views: '1.8k'
	},
	{ 
		id: 4, 
		title: 'Digital Agency', 
		category: 'Agency', 
		height: 'h-88',
		platform: 'Lovable',
		image: '/api/placeholder/400/850',
		prompt: 'Create a professional digital agency website with service offerings, team showcase, client testimonials, and case studies. Focus on building credibility and expertise.',
		repository: 'https://github.com/casualhermit27/digital-agency-template',
		rating: 4.7,
		views: '2.1k'
	},
	{ 
		id: 5, 
		title: 'Tech Startup', 
		category: 'Startup', 
		height: 'h-84',
		platform: 'V0',
		image: '/api/placeholder/400/800',
		prompt: 'Design a compelling startup landing page with problem-solution fit, product demo, founding team, investor logos, and early access signup form.',
		repository: 'https://github.com/casualhermit27/tech-startup-template',
		rating: 4.8,
		views: '2.9k'
	},
	{ 
		id: 6, 
		title: 'Medical Practice', 
		category: 'Healthcare', 
		height: 'h-76',
		platform: 'Webflow',
		image: '/api/placeholder/400/750',
		prompt: 'Build a trustworthy medical practice website with doctor profiles, services, appointment booking, patient testimonials, and insurance information.',
		repository: 'https://github.com/casualhermit27/medical-practice-template',
		rating: 4.6,
		views: '1.5k'
	},
	{ 
		id: 7, 
		title: 'Banking App', 
		category: 'Finance', 
		height: 'h-92',
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
		height: 'h-80',
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
		height: 'h-88',
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
		height: 'h-84',
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
		height: 'h-96',
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
		height: 'h-76',
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
		height: 'h-92',
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
		height: 'h-80',
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
		height: 'h-88',
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
		height: 'h-84',
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

	const filteredLandings = selectedCategory === 'All' 
		? landingData 
		: landingData.filter(landing => landing.category === selectedCategory)

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

					{/* Categories */}
					<div className="flex flex-wrap gap-2 justify-center mb-12">
						{categories.map((category, index) => (
							<motion.button
								key={category}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								onClick={() => setSelectedCategory(category)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
									selectedCategory === category
										? 'bg-primary text-primary-foreground'
										: 'bg-muted hover:bg-muted/80 text-muted-foreground'
								}`}
							>
								{category}
							</motion.button>
						))}
					</div>

					{/* Masonry Grid */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
					>
						{filteredLandings.map((landing, index) => (
							<motion.div
								key={landing.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 * index }}
								className="break-inside-avoid mb-6"
							>
								<div className="group bg-card rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
									onClick={() => setSelectedLanding(landing)}
								>
									{/* Image */}
									<div className="relative w-full">
										<div className="relative aspect-[3/2] overflow-hidden">
											<Image
												src={landing.image}
												alt={landing.title}
												className="object-cover object-top w-full h-full transform group-hover:scale-105 transition-transform duration-300"
												width={800}
												height={600}
												priority={index < 6}
											/>
										</div>
									</div>

									{/* Content */}
									<div className="p-8">
										<div className="flex items-center justify-between mb-4">
											<h3 className="text-lg font-semibold text-foreground">
												{landing.title}
											</h3>
											<span className={`px-3 py-1 rounded-full text-xs font-medium ${getPlatformColor(landing.platform)}`}>
												{landing.platform}
											</span>
										</div>

										<div className="flex items-center justify-between text-sm text-muted-foreground">
											<div className="flex items-center gap-1">
												<span>⭐</span>
												<span>{landing.rating}</span>
											</div>
											<div>{landing.views} views</div>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</main>

			{/* Image Modal */}
			<ImageModal
				isOpen={!!selectedLanding}
				onClose={() => setSelectedLanding(null)}
				landing={selectedLanding}
			/>
		</div>
	)
} 