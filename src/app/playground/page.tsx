'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Send, Sparkles, Copy, Check, Filter, ArrowRight, Zap } from 'lucide-react'
import FloatingNavbar from '@/components/floating-navbar'
import { Button } from '@/components/ui/button'

const promptData = [
	{ 
		id: 1, 
		title: 'Landing Page Hero', 
		category: 'Design',
		content: 'Create a compelling hero section for a SaaS landing page. Include a powerful headline that addresses the main pain point, a supporting subheadline, and a clear call-to-action button. Make it conversion-focused and visually appealing.',
		emoji: '🎯'
	},
	{ 
		id: 2, 
		title: 'React Component', 
		category: 'Development',
		content: 'Build a reusable React component with TypeScript. Include proper prop types, error handling, and accessibility features. Follow best practices for performance and maintainability.',
		emoji: '⚛️'
	},
	{ 
		id: 3, 
		title: 'Email Campaign', 
		category: 'Marketing',
		content: 'Write a persuasive email campaign for product launch. Include attention-grabbing subject line, personalized greeting, compelling product benefits, social proof, and strong call-to-action.',
		emoji: '📧'
	},
	{ 
		id: 4, 
		title: 'Blog Post Writer', 
		category: 'Marketing',
		content: 'Create an SEO-optimized blog post about [TOPIC]. Include engaging introduction, well-structured content with H2/H3 headings, actionable insights, and compelling conclusion with call-to-action.',
		emoji: '✍️'
	},
	{ 
		id: 5, 
		title: 'Business Plan', 
		category: 'Business',
		content: 'Create a comprehensive business plan outline including executive summary, market analysis, competitive landscape, revenue model, financial projections, and growth strategy. Make it investor-ready.',
		emoji: '📊'
	},
	{ 
		id: 6, 
		title: 'Logo Design', 
		category: 'Creative',
		content: 'Design a modern, memorable logo for [BRAND]. Consider scalability, versatility across platforms, color psychology, and brand personality. Include multiple variations and usage guidelines.',
		emoji: '🎨'
	},
	{ 
		id: 7, 
		title: 'API Documentation', 
		category: 'Development',
		content: 'Write comprehensive API documentation including endpoint descriptions, request/response examples, authentication methods, error codes, and code samples in multiple languages.',
		emoji: '📚'
	},
	{ 
		id: 8, 
		title: 'Social Media Content', 
		category: 'Marketing',
		content: 'Create engaging social media content for [PLATFORM]. Include catchy captions, relevant hashtags, visual content suggestions, and posting schedule recommendations for maximum engagement.',
		emoji: '📱'
	}
]

const categories = ['All', 'Design', 'Development', 'Marketing', 'Business', 'Creative']

export default function PlaygroundPage() {
	const [selectedPrompt, setSelectedPrompt] = useState<any>(null)
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('All')
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const [copiedId, setCopiedId] = useState<number | null>(null)
	const [customPrompt, setCustomPrompt] = useState('')
	const searchInputRef = useRef<HTMLInputElement>(null)

	const filteredPrompts = promptData.filter(prompt => {
		const matchesCategory = selectedCategory === 'All' || prompt.category === selectedCategory
		const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
							  prompt.content.toLowerCase().includes(searchQuery.toLowerCase())
		return matchesCategory && matchesSearch
	})

	useEffect(() => {
		if (isSearchOpen && searchInputRef.current) {
			searchInputRef.current.focus()
		}
	}, [isSearchOpen])

	const copyToClipboard = async (content: string, id: number) => {
		try {
			await navigator.clipboard.writeText(content)
			setCopiedId(id)
			setTimeout(() => setCopiedId(null), 2000)
		} catch (err) {
			console.error('Failed to copy text: ', err)
		}
	}

	const handleSelectPrompt = (prompt: any) => {
		setSelectedPrompt(prompt)
		setCustomPrompt(prompt.content)
		setIsSearchOpen(false)
	}

	const handleTryPrompt = () => {
		// Here you would integrate with your AI service
		console.log('Trying prompt:', customPrompt)
		// For now, just show a success message
		alert('Prompt sent! (This would integrate with your AI service)')
	}

	return (
		<div className="min-h-screen bg-background overflow-hidden">
			<FloatingNavbar />
			
			<main className="pt-36 pb-16 relative">
				{/* Background Effects */}
				<div className="fixed inset-0 bg-gradient-to-br from-background via-background to-muted/20 pointer-events-none" />
				<div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1)_0%,transparent_50%)] pointer-events-none" />
				<div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.05)_0%,transparent_50%)] pointer-events-none" />

				<div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<div className="flex items-center justify-center mb-4">
							<Sparkles className="w-8 h-8 text-primary mr-3" />
							<h1 className="text-4xl md:text-6xl font-bold text-foreground">
								AI Playground
							</h1>
						</div>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Select a prompt template or create your own to start experimenting with AI
						</p>
					</motion.div>

					{/* Main Playground Area */}
					<div className="grid lg:grid-cols-3 gap-8">
						{/* Prompt Selection Sidebar */}
						<div className="lg:col-span-1">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 sticky top-32"
							>
								{/* Search and Filter */}
								<div className="mb-6">
									<div className="relative mb-4">
										<AnimatePresence>
											{isSearchOpen ? (
												<motion.input
													ref={searchInputRef}
													initial={{ opacity: 0, scale: 0.95 }}
													animate={{ opacity: 1, scale: 1 }}
													exit={{ opacity: 0, scale: 0.95 }}
													transition={{ duration: 0.2 }}
													type="text"
													placeholder="Search prompts..."
													value={searchQuery}
													onChange={(e) => setSearchQuery(e.target.value)}
													onBlur={() => !searchQuery && setIsSearchOpen(false)}
													className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
												/>
											) : (
												<motion.button
													initial={{ opacity: 0, scale: 0.95 }}
													animate={{ opacity: 1, scale: 1 }}
													exit={{ opacity: 0, scale: 0.95 }}
													transition={{ duration: 0.2 }}
													onClick={() => setIsSearchOpen(true)}
													className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl text-left text-muted-foreground hover:bg-accent transition-all"
												>
													Search prompts...
												</motion.button>
											)}
										</AnimatePresence>
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
									</div>

									{/* Category Filter */}
									<div className="flex flex-wrap gap-2">
										{categories.map((category) => (
											<Button
												key={category}
												variant={selectedCategory === category ? "default" : "ghost"}
												size="sm"
												onClick={() => setSelectedCategory(category)}
												className="text-xs rounded-full"
											>
												{category}
											</Button>
										))}
									</div>
								</div>

								{/* Prompt List */}
								<div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
									{filteredPrompts.map((prompt, index) => (
										<motion.div
											key={prompt.id}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.3, delay: index * 0.05 }}
											onClick={() => handleSelectPrompt(prompt)}
											className={`
												p-4 border rounded-xl cursor-pointer transition-all duration-200
												${selectedPrompt?.id === prompt.id 
													? 'border-primary bg-primary/5' 
													: 'border-border hover:border-border/60 hover:bg-accent/50'
												}
											`}
										>
											<div className="flex items-start space-x-3">
												<span className="text-lg">{prompt.emoji}</span>
												<div className="flex-1 min-w-0">
													<h3 className="font-medium text-sm text-foreground truncate">
														{prompt.title}
													</h3>
													<p className="text-xs text-muted-foreground mt-1 line-clamp-2">
														{prompt.content.substring(0, 80)}...
													</p>
													<span className="text-xs text-primary mt-2 inline-block">
														{prompt.category}
													</span>
												</div>
											</div>
										</motion.div>
									))}
								</div>
							</motion.div>
						</div>

						{/* Main Playground */}
						<div className="lg:col-span-2">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.4 }}
								className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden"
							>
								{/* Header */}
								<div className="p-6 border-b border-border bg-muted/30">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-3">
											<Zap className="w-5 h-5 text-primary" />
											<h2 className="font-semibold text-foreground">
												{selectedPrompt ? selectedPrompt.title : 'Custom Prompt'}
											</h2>
											{selectedPrompt && (
												<span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
													{selectedPrompt.category}
												</span>
											)}
										</div>
										{selectedPrompt && (
											<Button
												variant="ghost"
												size="sm"
												onClick={() => copyToClipboard(selectedPrompt.content, selectedPrompt.id)}
												className="text-muted-foreground hover:text-foreground"
											>
												{copiedId === selectedPrompt.id ? (
													<Check className="w-4 h-4 text-green-500" />
												) : (
													<Copy className="w-4 h-4" />
												)}
											</Button>
										)}
									</div>
								</div>

								{/* Prompt Editor */}
								<div className="p-6">
									<textarea
										value={customPrompt}
										onChange={(e) => setCustomPrompt(e.target.value)}
										placeholder="Enter your prompt here or select one from the sidebar..."
										className="w-full h-64 p-4 bg-muted border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
									/>
									
									{/* Action Buttons */}
									<div className="flex items-center justify-between mt-6">
										<div className="flex items-center space-x-3">
											<span className="text-sm text-muted-foreground">
												{customPrompt.length} characters
											</span>
											{customPrompt.length > 1000 && (
												<span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full">
													Long prompt
												</span>
											)}
										</div>
										
										<Button
											onClick={handleTryPrompt}
											disabled={!customPrompt.trim()}
											className="bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-2 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
										>
											<Send className="w-4 h-4 mr-2" />
											Try Prompt
											<ArrowRight className="w-4 h-4 ml-2" />
										</Button>
									</div>
								</div>

								{/* Tips Section */}
								<div className="p-6 bg-muted/20 border-t border-border">
									<h3 className="font-medium text-foreground mb-3 flex items-center">
										<Sparkles className="w-4 h-4 mr-2 text-primary" />
										Pro Tips
									</h3>
									<ul className="text-sm text-muted-foreground space-y-2">
										<li>• Be specific about your requirements for better results</li>
										<li>• Use [BRACKETS] to indicate variables that should be replaced</li>
										<li>• Include context about your target audience or use case</li>
										<li>• Try different prompt variations to see what works best</li>
									</ul>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
} 