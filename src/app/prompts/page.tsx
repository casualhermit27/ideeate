'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import FloatingNavbar from '@/components/floating-navbar'
import { Button } from '@/components/ui/button'

const categories = [
	'All',
	'Design',
	'Development',
	'Marketing',
	'Business',
	'Creative',
	'Pitch Decks',
	'PRDs',
	'Roadmaps',
	'Strategy',
	'Research'
]

const promptData = [
	{ 
		id: 1, 
		title: 'Landing Page Hero', 
		category: 'Design', 
		height: 'h-64',
		content: 'Create a compelling hero section for a SaaS landing page. Include a powerful headline that addresses the main pain point, a supporting subheadline, and a clear call-to-action button. Make it conversion-focused and visually appealing.'
	},
	{ 
		id: 2, 
		title: 'React Component', 
		category: 'Development', 
		height: 'h-48',
		content: 'Build a reusable React component with TypeScript. Include proper prop types, error handling, and accessibility features. Follow best practices for performance and maintainability.'
	},
	{ 
		id: 3, 
		title: 'Email Campaign', 
		category: 'Marketing', 
		height: 'h-72',
		content: 'Write a persuasive email campaign for product launch. Include attention-grabbing subject line, personalized greeting, compelling product benefits, social proof, and strong call-to-action. Keep it concise yet engaging.'
	},
	{ 
		id: 4, 
		title: 'Blog Post Writer', 
		category: 'Marketing', 
		height: 'h-56',
		content: 'Create an SEO-optimized blog post about [TOPIC]. Include engaging introduction, well-structured content with H2/H3 headings, actionable insights, and compelling conclusion with call-to-action.'
	},
	{ 
		id: 5, 
		title: 'Neural Network', 
		category: 'Development', 
		height: 'h-80',
		content: 'Design a neural network architecture for image classification. Explain the layer structure, activation functions, optimization algorithm, and training process. Include considerations for overfitting prevention.'
	},
	{ 
		id: 6, 
		title: 'Business Plan', 
		category: 'Business', 
		height: 'h-60',
		content: 'Create a comprehensive business plan outline including executive summary, market analysis, competitive landscape, revenue model, financial projections, and growth strategy. Make it investor-ready.'
	},
	{ 
		id: 7, 
		title: 'Logo Design', 
		category: 'Creative', 
		height: 'h-44',
		content: 'Design a modern, memorable logo for [BRAND]. Consider scalability, versatility across platforms, color psychology, and brand personality. Include multiple variations and usage guidelines.'
	},
	{ 
		id: 8, 
		title: 'API Documentation', 
		category: 'Development', 
		height: 'h-68',
		content: 'Write comprehensive API documentation including endpoint descriptions, request/response examples, authentication methods, error codes, and code samples in multiple languages. Make it developer-friendly.'
	},
	{ 
		id: 9, 
		title: 'Social Media', 
		category: 'Marketing', 
		height: 'h-52',
		content: 'Create engaging social media content for [PLATFORM]. Include catchy captions, relevant hashtags, visual content suggestions, and posting schedule recommendations for maximum engagement.'
	},
	{ 
		id: 10, 
		title: 'Product Description', 
		category: 'Marketing', 
		height: 'h-76',
		content: 'Write compelling product descriptions that convert. Highlight key features, benefits, and unique value propositions. Use persuasive language, address customer pain points, and include relevant keywords for SEO.'
	},
	{ 
		id: 11, 
		title: 'Data Analysis', 
		category: 'Research', 
		height: 'h-64',
		content: 'Perform comprehensive data analysis on [DATASET]. Include data cleaning, exploratory analysis, statistical insights, visualizations, and actionable recommendations based on findings.'
	},
	{ 
		id: 12, 
		title: 'Brand Identity', 
		category: 'Creative', 
		height: 'h-72',
		content: 'Develop a complete brand identity including logo, color palette, typography, brand voice, messaging guidelines, and visual style guide. Ensure consistency across all touchpoints.'
	},
	{ 
		id: 13, 
		title: 'Mobile App UI', 
		category: 'Design', 
		height: 'h-60',
		content: 'Design intuitive mobile app UI/UX with focus on user experience. Include wireframes, user flows, interactive prototypes, and design system. Follow platform-specific guidelines.'
	},
	{ 
		id: 14, 
		title: 'Sales Pitch', 
		category: 'Business', 
		height: 'h-48',
		content: 'Create a powerful sales pitch deck. Include problem statement, solution overview, market opportunity, competitive advantages, business model, and compelling ask. Make it investor-ready.'
	},
	{ 
		id: 15, 
		title: 'Video Script', 
		category: 'Creative', 
		height: 'h-56',
		content: 'Write an engaging video script for [PURPOSE]. Include hook, storytelling elements, key messages, call-to-action, and scene descriptions. Keep viewers engaged throughout.'
	},
	{ 
		id: 16, 
		title: 'Investor Pitch Deck', 
		category: 'Pitch Decks', 
		height: 'h-80',
		content: 'Create a compelling 10-slide investor pitch deck. Include problem statement, solution, market size, business model, traction, competition, team, financials, funding ask, and use of funds. Make it investor-ready with clear storytelling.'
	},
	{ 
		id: 17, 
		title: 'Sales Pitch Deck', 
		category: 'Pitch Decks', 
		height: 'h-72',
		content: 'Design a persuasive sales pitch deck for [PRODUCT/SERVICE]. Include company overview, problem identification, solution benefits, case studies, pricing, next steps, and compelling visuals.'
	},
	{ 
		id: 18, 
		title: 'Product Requirements Document', 
		category: 'PRDs', 
		height: 'h-84',
		content: 'Write a comprehensive PRD for [PRODUCT FEATURE]. Include executive summary, problem statement, user stories, functional requirements, technical requirements, success metrics, timeline, and dependencies.'
	},
	{ 
		id: 19, 
		title: 'Feature Specification', 
		category: 'PRDs', 
		height: 'h-68',
		content: 'Create detailed feature specifications including user personas, use cases, acceptance criteria, edge cases, UI/UX requirements, API specifications, and testing scenarios. Ensure technical clarity.'
	},
	{ 
		id: 20, 
		title: 'Product Roadmap', 
		category: 'Roadmaps', 
		height: 'h-76',
		content: 'Develop a strategic product roadmap for Q1-Q4. Include feature prioritization, release timeline, resource allocation, dependencies, milestones, and success metrics. Align with business objectives.'
	},
	{ 
		id: 21, 
		title: 'Technology Roadmap', 
		category: 'Roadmaps', 
		height: 'h-72',
		content: 'Create a technology roadmap outlining infrastructure evolution, tech stack upgrades, security improvements, scalability plans, and technical debt reduction over 12-18 months.'
	},
	{ 
		id: 22, 
		title: 'Go-to-Market Strategy', 
		category: 'Strategy', 
		height: 'h-80',
		content: 'Develop a comprehensive GTM strategy including target market analysis, positioning, pricing strategy, distribution channels, marketing tactics, sales approach, and launch timeline.'
	},
	{ 
		id: 23, 
		title: 'Competitive Analysis', 
		category: 'Strategy', 
		height: 'h-64',
		content: 'Conduct thorough competitive analysis covering direct/indirect competitors, feature comparison, pricing analysis, market positioning, strengths/weaknesses, and strategic recommendations.'
	},
	{ 
		id: 24, 
		title: 'User Research Plan', 
		category: 'Research', 
		height: 'h-68',
		content: 'Design a user research plan including research objectives, methodology selection, participant recruitment, interview guides, data collection methods, and analysis framework.'
	},
	{ 
		id: 25, 
		title: 'Market Research Report', 
		category: 'Research', 
		height: 'h-76',
		content: 'Create a comprehensive market research report with industry analysis, market size estimation, trend identification, customer insights, competitive landscape, and actionable recommendations.'
	},
	{ 
		id: 26, 
		title: 'OKR Framework', 
		category: 'Strategy', 
		height: 'h-60',
		content: 'Establish OKRs (Objectives and Key Results) framework for [TEAM/COMPANY]. Include SMART objectives, measurable key results, tracking methodology, and quarterly review process.'
	},
	{ 
		id: 27, 
		title: 'Partnership Proposal', 
		category: 'Business', 
		height: 'h-72',
		content: 'Draft a strategic partnership proposal including partnership rationale, mutual benefits, collaboration framework, resource requirements, success metrics, and legal considerations.'
	},
	{ 
		id: 28, 
		title: 'Customer Journey Map', 
		category: 'Research', 
		height: 'h-68',
		content: 'Map the complete customer journey from awareness to advocacy. Include touchpoints, pain points, emotions, opportunities, and actionable insights for each stage.'
	},
]

export default function PromptsPage() {
	const [selectedCategory, setSelectedCategory] = useState('All')
	const [copiedId, setCopiedId] = useState<number | null>(null)

	const filteredPrompts = selectedCategory === 'All' 
		? promptData 
		: promptData.filter(prompt => prompt.category === selectedCategory)

	const copyToClipboard = async (content: string, id: number) => {
		try {
			await navigator.clipboard.writeText(content)
			setCopiedId(id)
			setTimeout(() => setCopiedId(null), 2000)
		} catch (err) {
			console.error('Failed to copy text: ', err)
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
							AI Prompts
						</h1>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Discover powerful prompts to accelerate your workflow across design, development, and creative projects
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

					{/* Masonry Grid */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
					>
						{filteredPrompts.map((prompt, index) => (
							<motion.div
								key={prompt.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 * index }}
								className="break-inside-avoid mb-6"
							>
								<div className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-border/60 transition-all duration-300">
									{/* Prompt Content */}
									<div className={`
										${prompt.height} bg-muted p-4 flex flex-col justify-between
										group-hover:bg-muted/80 transition-colors duration-300
									`}>
										<div className="flex-1 overflow-hidden">
											<p className="text-foreground text-sm leading-relaxed select-text cursor-text">
												{prompt.content}
											</p>
										</div>
									</div>
									
									{/* Bottom Content */}
									<div className="p-4 bg-card">
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-3">
												<span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
													{prompt.category}
												</span>
												{/* Copy Button */}
												<button
													onClick={() => copyToClipboard(prompt.content, prompt.id)}
													className="p-2 bg-muted hover:bg-accent rounded-lg transition-all duration-200 flex items-center space-x-1"
												>
													{copiedId === prompt.id ? (
														<Check className="w-4 h-4 text-green-500" />
													) : (
														<Copy className="w-4 h-4 text-muted-foreground" />
													)}
												</button>
											</div>
											<div className="flex items-center space-x-2 text-muted-foreground">
												<span className="text-xs">⭐ 4.8</span>
												<span className="text-xs">•</span>
												<span className="text-xs">1.2k uses</span>
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
						className="text-center mt-12"
					>
						<Button
							variant="ghost"
							className="bg-muted text-foreground hover:bg-accent rounded-xl px-8 py-3"
						>
							Load More Prompts
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