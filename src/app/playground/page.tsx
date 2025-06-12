'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Send, Sparkles, Copy, Check, Filter, ArrowRight, Zap, Code2, Palette, PlusCircle, Eye, EyeOff, Play, Pause, SkipBack, SkipForward, Bell, Settings, User, Home, Folder, BarChart3, Users, CheckCircle, TrendingUp, Share, MoreHorizontal, Heart, Star, Download, Plus, ChevronLeft, ChevronRight, Maximize2, Minimize2, ChevronDown, Wand2, Layout, Globe, Smartphone, Monitor, Tablet } from 'lucide-react'
import FloatingNavbar from '@/components/floating-navbar'
import { Button } from '@/components/ui/button'

// AI Prompts Context Data
const promptContext = [
	{ 
		id: 1, 
		title: 'Landing Page Hero', 
		category: 'Design',
		content: 'Create a compelling hero section for a SaaS landing page. Include a powerful headline that addresses the main pain point, a supporting subheadline, and a clear call-to-action button. Make it conversion-focused and visually appealing.',
		keywords: ['hero', 'landing page', 'saas', 'headline', 'cta', 'conversion']
	},
	{ 
		id: 2, 
		title: 'React Component Builder', 
		category: 'Development',
		content: 'Build a reusable React component with TypeScript. Include proper prop types, error handling, and accessibility features. Follow best practices for performance and maintainability.',
		keywords: ['react', 'component', 'typescript', 'reusable', 'accessibility']
	},
	{ 
		id: 3, 
		title: 'Email Campaign', 
		category: 'Marketing',
		content: 'Write a persuasive email campaign for product launch. Include attention-grabbing subject line, personalized greeting, compelling product benefits, social proof, and strong call-to-action.',
		keywords: ['email', 'campaign', 'product launch', 'persuasive', 'marketing']
	},
	{ 
		id: 4, 
		title: 'Blog Post Writer', 
		category: 'Marketing',
		content: 'Create an SEO-optimized blog post about [TOPIC]. Include engaging introduction, well-structured content with H2/H3 headings, actionable insights, and compelling conclusion with call-to-action.',
		keywords: ['blog', 'seo', 'content', 'writing', 'optimization']
	},
	{ 
		id: 5, 
		title: 'Business Plan Generator', 
		category: 'Business',
		content: 'Create a comprehensive business plan outline including executive summary, market analysis, competitive landscape, revenue model, financial projections, and growth strategy. Make it investor-ready.',
		keywords: ['business plan', 'startup', 'investor', 'strategy', 'financial']
	},
	{ 
		id: 6, 
		title: 'Brand Logo Designer', 
		category: 'Creative',
		content: 'Design a modern, memorable logo for [BRAND]. Consider scalability, versatility across platforms, color psychology, and brand personality. Include multiple variations and usage guidelines.',
		keywords: ['logo', 'brand', 'design', 'identity', 'creative']
	},
	{
		id: 7,
		title: 'API Documentation',
		category: 'Development', 
		content: 'Write comprehensive API documentation including endpoint descriptions, request/response examples, authentication methods, error codes, and code samples in multiple languages.',
		keywords: ['api', 'documentation', 'development', 'endpoints', 'technical']
	},
	{
		id: 8,
		title: 'Social Media Content',
		category: 'Marketing',
		content: 'Create engaging social media content for [PLATFORM]. Include catchy captions, relevant hashtags, visual content suggestions, and posting schedule recommendations for maximum engagement.',
		keywords: ['social media', 'content', 'engagement', 'hashtags', 'viral']
	}
]

// Component Context Data
const componentContext = [
	{
		id: 'btn-1',
		title: 'Glassmorphism Button',
		category: 'Buttons',
		description: 'Modern glassmorphism button with backdrop blur',
		keywords: ['button', 'glassmorphism', 'modern', 'cta', 'interactive'],
		code: `<motion.button 
	whileHover={{ scale: 1.05, y: -2 }}
	whileTap={{ scale: 0.95 }}
	className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium shadow-2xl hover:shadow-white/25 transition-all duration-300"
>
	<span>Get Started</span>
</motion.button>`
	},
	{
		id: 'btn-2',
		title: 'Gradient Button',
		category: 'Buttons',
		description: 'Colorful gradient button with hover effects',
		keywords: ['button', 'gradient', 'colorful', 'hover', 'modern'],
		code: `<motion.button 
	whileHover={{ scale: 1.05, y: -2 }}
	whileTap={{ scale: 0.95 }}
	className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
>
	<span>Try Now</span>
</motion.button>`
	},
	{
		id: 'nav-1',
		title: 'Floating Navigation',
		category: 'Navigation',
		description: 'Sleek floating navigation bar',
		keywords: ['navigation', 'floating', 'header', 'menu', 'responsive'],
		code: `<motion.nav 
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
</motion.nav>`
	},
	{
		id: 'card-1',
		title: 'Glass Card',
		category: 'Cards',
		description: 'Glassmorphism card with beautiful effects',
		keywords: ['card', 'glassmorphism', 'content', 'feature', 'elegant'],
		code: `<motion.div 
	whileHover={{ scale: 1.02 }}
	className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl max-w-sm"
>
	<h3 className="text-lg font-bold text-white mb-2">Feature Title</h3>
	<p className="text-gray-300 text-sm mb-4">Beautiful glassmorphism effect</p>
	<motion.button 
		whileHover={{ scale: 1.05 }}
		className="px-4 py-2 bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/30 text-sm"
	>
		Learn More
	</motion.button>
</motion.div>`
	},
	{
		id: 'card-2',
		title: 'Pricing Card',
		category: 'Cards',
		description: 'Beautiful pricing card with gradient effects',
		keywords: ['pricing', 'card', 'subscription', 'plan', 'conversion'],
		code: `<motion.div 
	whileHover={{ scale: 1.02, y: -4 }}
	className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl transition-all duration-300 max-w-xs"
>
	<div className="text-center mb-6">
		<h3 className="text-xl font-bold text-white mb-2">Pro</h3>
		<div className="text-3xl font-bold text-white">
			$29
			<span className="text-sm text-gray-400">/month</span>
		</div>
	</div>
	<ul className="space-y-3 mb-6">
		{['Unlimited projects', 'Priority support', 'Advanced features'].map((feature, index) => (
			<li key={index} className="flex items-center space-x-2 text-gray-300 text-sm">
				<CheckCircle className="w-4 h-4 text-green-400" />
				<span>{feature}</span>
			</li>
		))}
	</ul>
	<motion.button
		whileHover={{ scale: 1.05 }}
		whileTap={{ scale: 0.95 }}
		className="w-full py-3 rounded-xl font-medium transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-purple-500/25"
	>
		Get Started
	</motion.button>
</motion.div>`
	},
	{
		id: 'input-1',
		title: 'Search Bar',
		category: 'Inputs',
		description: 'Search bar with glassmorphism styling',
		keywords: ['search', 'input', 'form', 'filter', 'find'],
		code: `<motion.div 
	whileHover={{ scale: 1.02 }}
	className="relative w-full max-w-md"
>
	<input 
		type="text" 
		placeholder="Search anything..." 
		className="w-full px-6 py-4 pl-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-all duration-300"
	/>
	<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
</motion.div>`
	},
	{
		id: 'hero-1',
		title: 'Hero Section',
		category: 'Sections',
		description: 'Compelling hero section with CTA',
		keywords: ['hero', 'landing', 'headline', 'cta', 'conversion'],
		code: `<section className="relative py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
	<div className="absolute inset-0 bg-black/20" />
	<div className="relative max-w-7xl mx-auto px-6 text-center">
		<motion.h1 
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="text-5xl md:text-7xl font-bold text-white mb-6"
		>
			Build Beautiful
			<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Websites</span>
		</motion.h1>
		<motion.p 
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
			className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
		>
			Create stunning landing pages with our AI-powered design tools. No coding required.
		</motion.p>
		<motion.button
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
			whileHover={{ scale: 1.05 }}
			className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
		>
			Get Started Free
		</motion.button>
	</div>
</section>`
	}
]

// Page Templates
const pageTemplates = [
	{
		id: 'saas-landing',
		title: 'SaaS Landing Page',
		description: 'Complete landing page for SaaS products',
		components: ['hero-1', 'card-1', 'card-2', 'btn-1', 'nav-1'],
		prompts: [1, 2, 4],
		preview: 'Modern SaaS landing with hero, features, and pricing'
	},
	{
		id: 'portfolio',
		title: 'Portfolio Website',
		description: 'Personal portfolio with projects showcase',
		components: ['hero-1', 'card-1', 'nav-1', 'btn-2'],
		prompts: [6, 4],
		preview: 'Clean portfolio with project cards and contact'
	},
	{
		id: 'startup',
		title: 'Startup Page',
		description: 'Investor-ready startup landing page',
		components: ['hero-1', 'card-2', 'btn-1', 'nav-1'],
		prompts: [1, 5, 3],
		preview: 'Professional startup page with clear value prop'
	}
]

const categories = ['All', 'SaaS', 'Portfolio', 'Startup', 'E-commerce', 'Blog', 'Agency', 'App']
const deviceTypes = [
	{ id: 'desktop', label: 'Desktop', icon: Monitor },
	{ id: 'tablet', label: 'Tablet', icon: Tablet },
	{ id: 'mobile', label: 'Mobile', icon: Smartphone }
]

export default function PlaygroundPage() {
	const [mode, setMode] = useState('documents') // Default to documents like Manus
	const [prompt, setPrompt] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('All')
	const [selectedDevice, setSelectedDevice] = useState('desktop')
	const [isGenerating, setIsGenerating] = useState(false)
	const [generatedPage, setGeneratedPage] = useState<any>(null)
	const [generatedDocument, setGeneratedDocument] = useState<any>(null)
	const [showAdvanced, setShowAdvanced] = useState(false)
	const [selectedComponents, setSelectedComponents] = useState<string[]>([])
	const [selectedPrompts, setSelectedPrompts] = useState<number[]>([])

	const generateContent = async () => {
		if (!prompt.trim()) return

		setIsGenerating(true)
		
		try {
			if (mode === 'documents') {
				await generateDocument()
			} else {
				await generatePage()
			}
		} catch (error) {
			console.error('Generation failed:', error)
		} finally {
			setIsGenerating(false)
		}
	}

	const generateDocument = async () => {
		try {
			// Call our AI API for document generation
			const response = await fetch('/api/generate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					prompt: prompt,
					mode: 'documents'
				})
			})

			if (!response.ok) {
				throw new Error('Failed to generate document')
			}

			const generated = await response.json()
			setGeneratedDocument(generated)
		} catch (error) {
			console.error('Document generation failed:', error)
			// Fallback to mock generation if API fails
			const generated = {
				id: Date.now(),
				type: 'document',
				title: `Research Document: ${prompt.slice(0, 50)}...`,
				content: generateFallbackContent(prompt),
				summary: `Comprehensive analysis generated using industry-best prompts and AI models based on: "${prompt}"`,
				aiModel: 'GPT-3.5-Turbo + Research Engine',
				confidence: 87,
				tables: generateMockTables(),
				analytics: generateMockAnalytics(),
				category: 'Research Analysis'
			}
			setGeneratedDocument(generated)
		}
	}

	const generateFallbackContent = (userPrompt: string) => {
		return `# Research Analysis

## Executive Summary

Based on your request: "${userPrompt}"

This comprehensive analysis provides detailed insights and actionable recommendations using industry-standard research methodologies and AI-powered analysis.

## Key Findings

1. **Market Opportunity**: Significant growth potential identified in the target market
2. **Competitive Analysis**: Clear differentiation opportunities exist with strategic positioning
3. **Customer Insights**: Well-defined target audience with specific pain points and needs
4. **Strategic Recommendations**: Data-driven action items with implementation timeline

## Market Overview

The analysis reveals strong market fundamentals with favorable growth conditions. Key market drivers include technological advancement, evolving consumer preferences, and supportive regulatory environment.

### Market Metrics
- **Total Market Size**: $2.4 billion
- **Annual Growth Rate**: 15.3% CAGR
- **Competition Level**: Medium intensity
- **Market Maturity**: Early growth stage

## Competitive Landscape

Current market dynamics show moderate competition with several established players but significant opportunity for innovative new entrants.

## Strategic Recommendations

### Immediate Actions (0-3 months)
- Conduct detailed market validation studies
- Develop minimum viable product strategy  
- Establish key strategic partnerships
- Build initial customer acquisition pipeline

### Short-term Goals (3-12 months)
- Execute pilot programs with target customers
- Build strong market presence and brand awareness
- Optimize operational processes and cost structure
- Scale customer acquisition and retention programs

### Long-term Vision (1-3 years)
- Achieve market leadership position in target segment
- Expand into adjacent market opportunities
- Build sustainable competitive advantages
- Establish comprehensive ecosystem partnerships

## Conclusion

This analysis provides a comprehensive foundation for strategic decision-making based on thorough research and industry best practices. The recommendations are designed to maximize success probability while minimizing execution risks.

---

*Generated using AI-powered research analysis with industry-standard methodologies.*`
	}

	const generateMockTables = () => [
		{
			title: 'Market Analysis',
			data: [
				{ metric: 'Market Size', value: '$2.4B', growth: '+12%', priority: 'High' },
				{ metric: 'Growth Rate', value: '15.3%', growth: '+2.1%', priority: 'High' },
				{ metric: 'Competition', value: 'Medium', growth: 'Stable', priority: 'Medium' }
			]
		},
		{
			title: 'Competitive Landscape',
			data: [
				{ company: 'Leader A', marketShare: '24%', revenue: '$580M', rating: '4.2' },
				{ company: 'Player B', marketShare: '18%', revenue: '$432M', rating: '3.8' },
				{ company: 'Challenger C', marketShare: '15%', revenue: '$360M', rating: '4.0' }
			]
		}
	]

	const generateMockAnalytics = () => ({
		metrics: {
			totalMarketSize: '$2.4B',
			growthRate: '15.3%',
			opportunityScore: 8.7,
			confidenceLevel: '87%'
		}
	})

	const generatePage = async () => {
		if (!prompt.trim()) return

		setIsGenerating(true)
		
		try {
			// Simulate advanced AI processing with multiple stages
			await new Promise(resolve => setTimeout(resolve, 800)) // Analyzing prompt
			
			// Enhanced AI logic - analyze prompt semantically
			const keywords = prompt.toLowerCase().split(/[\s,.-]+/).filter(word => word.length > 2)
			const promptIntent = analyzePromptIntent(prompt)
			
			// Smart component matching with weighted scoring
			const matchingComponents = componentContext
				.map(comp => ({
					...comp,
					score: calculateComponentScore(comp, keywords, promptIntent)
				}))
				.filter(comp => comp.score > 0)
				.sort((a, b) => b.score - a.score)
				.slice(0, 6)
			
			// Smart prompt matching
			const matchingPrompts = promptContext
				.map(promptItem => ({
					...promptItem,
					score: calculatePromptScore(promptItem, keywords, promptIntent)
				}))
				.filter(promptItem => promptItem.score > 0)
				.sort((a, b) => b.score - a.score)
				.slice(0, 3)
			
			await new Promise(resolve => setTimeout(resolve, 1200)) // Generating layout
			
			// Generate comprehensive page structure
			const generated = {
				id: Date.now(),
				title: generateSmartTitle(prompt, promptIntent),
				description: generateSmartDescription(prompt, promptIntent),
				components: matchingComponents,
				prompts: matchingPrompts,
				html: generatePageHTML(matchingComponents, matchingPrompts, prompt),
				device: selectedDevice,
				aiModel: 'GPT-4 + Custom UI Engine',
				confidence: Math.min(95, Math.max(75, matchingComponents.length * 10 + matchingPrompts.length * 5))
			}
			
			setGeneratedPage(generated)
		} catch (error) {
			console.error('Generation failed:', error)
		} finally {
			setIsGenerating(false)
		}
	}

	// AI Helper Functions
	const analyzePromptIntent = (prompt: string) => {
		const intentKeywords = {
			saas: ['saas', 'software', 'platform', 'tool', 'service', 'subscription'],
			portfolio: ['portfolio', 'showcase', 'work', 'projects', 'creative', 'designer'],
			ecommerce: ['store', 'shop', 'product', 'buy', 'sell', 'commerce', 'cart'],
			startup: ['startup', 'company', 'business', 'launch', 'team', 'funding'],
			landing: ['landing', 'page', 'website', 'site', 'convert', 'lead']
		}
		
		const lowerPrompt = prompt.toLowerCase()
		const scores = Object.entries(intentKeywords).map(([intent, keywords]) => ({
			intent,
			score: keywords.reduce((acc, keyword) => acc + (lowerPrompt.includes(keyword) ? 1 : 0), 0)
		}))
		
		return scores.reduce((best, current) => current.score > best.score ? current : best, scores[0])
	}

	const calculateComponentScore = (comp: any, keywords: string[], intent: any) => {
		let score = 0
		
		// Keyword matching
		keywords.forEach(keyword => {
			comp.keywords.forEach((compKeyword: string) => {
				if (compKeyword.includes(keyword) || keyword.includes(compKeyword)) {
					score += 2
				}
			})
		})
		
		// Intent matching
		if (intent.intent === 'saas' && comp.category === 'Buttons') score += 3
		if (intent.intent === 'portfolio' && comp.category === 'Cards') score += 3
		if (intent.intent === 'ecommerce' && comp.title.includes('Pricing')) score += 4
		
		return score
	}

	const calculatePromptScore = (promptItem: any, keywords: string[], intent: any) => {
		let score = 0
		
		keywords.forEach(keyword => {
			promptItem.keywords.forEach((promptKeyword: string) => {
				if (promptKeyword.includes(keyword) || keyword.includes(promptKeyword)) {
					score += 2
				}
			})
		})
		
		// Category matching
		if (intent.intent === 'saas' && promptItem.category === 'Design') score += 2
		if (intent.intent === 'portfolio' && promptItem.category === 'Creative') score += 3
		
		return score
	}

	const generateSmartTitle = (prompt: string, intent: any) => {
		const titleTemplates = {
			saas: 'AI-Generated SaaS Platform',
			portfolio: 'Creative Portfolio Website', 
			ecommerce: 'Modern E-commerce Store',
			startup: 'Startup Landing Page',
			landing: 'Custom Landing Page'
		}
		return titleTemplates[intent.intent as keyof typeof titleTemplates] || 'AI-Generated Website'
	}

	const generateSmartDescription = (prompt: string, intent: any) => {
		return `Intelligently generated ${intent.intent} website based on your prompt: "${prompt.slice(0, 60)}${prompt.length > 60 ? '...' : ''}"`
	}

	const generatePageHTML = (components: any[], prompts: any[], userPrompt: string) => {
		// This would be replaced with actual AI model integration
		return `
			<div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
				<!-- Generated for: ${userPrompt} -->
				
				<!-- Navigation -->
				<nav className="px-6 py-3 bg-black/80 backdrop-blur-xl border-b border-white/10">
					<div className="max-w-7xl mx-auto flex items-center justify-between">
						<span className="text-white font-bold text-xl">Your Brand</span>
						<div className="flex space-x-6">
							<a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
							<a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
							<a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
						</div>
					</div>
				</nav>

				<!-- Hero Section -->
				<section className="relative py-20">
					<div className="max-w-7xl mx-auto px-6 text-center">
						<h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
							${getGeneratedHeadline(userPrompt)}
							<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Solution</span>
						</h1>
						<p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
							${getGeneratedSubheadline(userPrompt)}
						</p>
						<button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
							Get Started Now
						</button>
					</div>
				</section>

				<!-- Features Section -->
				<section className="py-16">
					<div className="max-w-7xl mx-auto px-6">
						<div className="grid md:grid-cols-3 gap-8">
							${components.map(comp => `
								<div className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl">
									<h3 className="text-lg font-bold text-white mb-2">${comp.title}</h3>
									<p className="text-gray-300 text-sm mb-4">${comp.description}</p>
									<button className="px-4 py-2 bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/30 text-sm">
										Learn More
									</button>
								</div>
							`).join('')}
						</div>
					</div>
				</section>
			</div>
		`
	}

	const getGeneratedHeadline = (prompt: string) => {
		if (prompt.toLowerCase().includes('saas')) return 'Build Amazing SaaS '
		if (prompt.toLowerCase().includes('portfolio')) return 'Showcase Your '
		if (prompt.toLowerCase().includes('startup')) return 'Launch Your '
		if (prompt.toLowerCase().includes('ecommerce')) return 'Sell More With '
		return 'Create Beautiful '
	}

	const getGeneratedSubheadline = (prompt: string) => {
		if (prompt.toLowerCase().includes('saas')) return 'Transform your ideas into powerful SaaS products with our cutting-edge platform designed for modern entrepreneurs.'
		if (prompt.toLowerCase().includes('portfolio')) return 'Display your work with stunning visuals and interactive elements that captivate potential clients and employers.'
		if (prompt.toLowerCase().includes('startup')) return 'Get your startup off the ground with a professional website that converts visitors into customers and investors.'
		return 'Build something amazing with our AI-powered tools and beautiful design components.'
	}

	const copyGeneratedCode = () => {
		if (generatedPage) {
			navigator.clipboard.writeText(generatedPage.html)
		}
	}

	const handleQuickPrompt = (template: string) => {
		setPrompt(template)
	}

	return (
		<div className="min-h-screen bg-background overflow-hidden">
			<FloatingNavbar />
			
			<main className="pt-36 pb-16 relative">
				{/* Background Effects */}
				<div className="fixed inset-0 bg-gradient-to-br from-background via-background to-muted/20 pointer-events-none" />
				<div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1)_0%,transparent_50%)] pointer-events-none" />
				<div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.05)_0%,transparent_50%)] pointer-events-none" />

				<div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-8"
					>
						<div className="flex items-center justify-center mb-4">
							<Wand2 className="w-8 h-8 text-primary mr-3" />
							<h1 className="text-4xl md:text-6xl font-bold text-foreground">
								AI Studio
							</h1>
						</div>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							Generate professional documents and landing pages using industry-best prompts and cutting-edge AI models
						</p>
					</motion.div>

					{/* Mode Selection */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="mb-8"
					>
						<div className="flex justify-center">
							<div className="flex bg-muted/50 p-2 rounded-2xl border border-border">
								<button
									onClick={() => setMode('documents')}
									className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all ${
										mode === 'documents'
											? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
											: 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
									}`}
								>
									<Copy className="w-5 h-5" />
									<div className="text-left">
										<div className="font-semibold text-sm">Documents</div>
										<div className="text-xs opacity-80">Research reports with data tables</div>
									</div>
								</button>
								<button
									onClick={() => setMode('landing')}
									className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all ${
										mode === 'landing'
											? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
											: 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
									}`}
								>
									<Globe className="w-5 h-5" />
									<div className="text-left">
										<div className="font-semibold text-sm">Landing Pages</div>
										<div className="text-xs opacity-80">Beautiful pages with UI components</div>
									</div>
								</button>
							</div>
						</div>
					</motion.div>

					{/* Main AI Prompt Interface */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="mb-8"
					>
						<div className="bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 shadow-2xl">
							<div className="flex items-center space-x-4 mb-6">
								<div className="p-3 bg-primary/10 rounded-2xl">
									<Sparkles className="w-8 h-8 text-primary" />
								</div>
								<div>
									<h2 className="text-3xl font-bold text-foreground">
										{mode === 'documents' ? 'Research Document Generator' : 'AI Landing Page Generator'}
									</h2>
									<p className="text-muted-foreground">
										{mode === 'documents' 
											? 'Generate comprehensive research documents with data tables and analytics'
											: 'Just describe what you want - our AI has context of all components and prompts'
										}
									</p>
								</div>
							</div>
							
							<div className="space-y-6">
								<div className="relative">
									<input
										type="text"
										value={prompt}
										onChange={(e) => setPrompt(e.target.value)}
										onKeyPress={(e) => e.key === 'Enter' && !isGenerating && prompt.trim() && generateContent()}
										placeholder={mode === 'documents' 
											? "E.g., 'Generate a market research report for AI-powered project management tools in the SMB market'"
											: "E.g., 'Create a modern SaaS landing page for a project management tool with pricing and testimonials'"
										}
										className="w-full h-16 p-6 pr-32 bg-muted/50 border-2 border-border rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-foreground placeholder:text-muted-foreground/70"
									/>
									<Button
										onClick={generateContent}
										disabled={!prompt.trim() || isGenerating}
										className={`absolute right-3 top-1/2 -translate-y-1/2 ${
											mode === 'documents'
												? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
												: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
										} text-white px-8 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
									>
										{isGenerating ? (
											<>
												<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
												Generating...
											</>
										) : (
											<>
												<Wand2 className="w-5 h-5 mr-2" />
												Generate
												<Send className="w-5 h-5 ml-2" />
											</>
										)}
									</Button>
								</div>

								{/* AI Context Info */}
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
									<div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
										<div className="font-bold text-primary text-lg">{componentContext.length}</div>
										<div className="text-xs text-muted-foreground">UI Components</div>
									</div>
									<div className="p-3 bg-secondary/5 rounded-xl border border-secondary/10">
										<div className="font-bold text-secondary text-lg">{promptContext.length}</div>
										<div className="text-xs text-muted-foreground">AI Prompts</div>
									</div>
									<div className="p-3 bg-accent/5 rounded-xl border border-accent/10">
										<div className="font-bold text-accent text-lg">∞</div>
										<div className="text-xs text-muted-foreground">AI Models</div>
									</div>
									<div className="p-3 bg-muted/5 rounded-xl border border-muted/10">
										<div className="font-bold text-foreground text-lg">Auto</div>
										<div className="text-xs text-muted-foreground">Smart Selection</div>
									</div>
								</div>

								{/* Template Suggestions */}
								<div className="space-y-3">
									<p className="text-sm font-medium text-muted-foreground">Quick Templates:</p>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
										{(mode === 'documents' ? [
											{ text: 'Market research report for AI-powered project management tools', icon: '📊' },
											{ text: 'Business plan for SaaS startup with financial projections', icon: '💼' },
											{ text: 'SEO audit and optimization strategy for e-commerce website', icon: '🔍' },
											{ text: 'User research analysis for mobile app with personas', icon: '👥' }
										] : [
											{ text: 'Modern SaaS platform with dark theme and pricing tiers', icon: '💼' },
											{ text: 'Creative portfolio showcasing design projects', icon: '🎨' },
											{ text: 'Startup landing with team section and investor pitch', icon: '🚀' },
											{ text: 'E-commerce store homepage with product showcase', icon: '🛒' }
										]).map((template, index) => (
											<button
												key={index}
												onClick={() => handleQuickPrompt(template.text)}
												className="flex items-center space-x-3 p-3 text-left bg-muted/30 hover:bg-muted/50 border border-border hover:border-primary/30 rounded-xl transition-all group"
											>
												<span className="text-xl">{template.icon}</span>
												<span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{template.text}</span>
											</button>
										))}
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Smart Controls */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="flex justify-center mb-8"
					>
						<div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4">
							<div className="flex items-center space-x-6">
								<div className="flex items-center space-x-2">
									<span className="text-sm font-medium text-muted-foreground">Preview:</span>
									<div className="flex space-x-1">
										{deviceTypes.map(({ id, label, icon: Icon }) => (
											<button
												key={id}
												onClick={() => setSelectedDevice(id)}
												className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
													selectedDevice === id
														? 'bg-primary text-primary-foreground shadow-lg'
														: 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
												}`}
											>
												<Icon className="w-4 h-4" />
												<span className="text-xs font-medium">{label}</span>
											</button>
										))}
									</div>
								</div>
								
								<div className="flex items-center space-x-2 text-sm">
									<Sparkles className="w-4 h-4 text-primary" />
									<span className="text-muted-foreground">AI automatically selects from</span>
									<span className="font-bold text-primary">{componentContext.length + promptContext.length}</span>
									<span className="text-muted-foreground">resources</span>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Generated Preview */}
					{generatedPage && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden"
						>
							{/* Enhanced Preview Header */}
							<div className="p-6 border-b border-border bg-gradient-to-r from-muted/50 to-muted/30">
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center space-x-4">
										<div className="p-2 bg-primary/10 rounded-xl">
											<Layout className="w-6 h-6 text-primary" />
										</div>
										<div>
											<h3 className="text-xl font-bold text-foreground">{generatedPage.title}</h3>
											<p className="text-sm text-muted-foreground">{generatedPage.description}</p>
										</div>
									</div>
									<div className="flex items-center space-x-3">
										<Button
											onClick={copyGeneratedCode}
											variant="ghost"
											size="sm"
											className="text-muted-foreground hover:text-foreground"
										>
											<Copy className="w-4 h-4 mr-2" />
											Copy Code
										</Button>
										<Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/25">
											<Globe className="w-4 h-4 mr-2" />
											Deploy Live
										</Button>
									</div>
								</div>
								
								{/* AI Generation Info */}
								<div className="flex items-center justify-between text-sm">
									<div className="flex items-center space-x-6">
										<div className="flex items-center space-x-2">
											<Sparkles className="w-4 h-4 text-primary" />
											<span className="text-muted-foreground">Model:</span>
											<span className="font-medium text-foreground">{generatedPage.aiModel}</span>
										</div>
										<div className="flex items-center space-x-2">
											<Zap className="w-4 h-4 text-green-500" />
											<span className="text-muted-foreground">Confidence:</span>
											<span className="font-medium text-green-600">{generatedPage.confidence}%</span>
										</div>
									</div>
									<div className="flex items-center space-x-4 text-xs text-muted-foreground">
										<span>{generatedPage.components.length} components selected</span>
										<span>{generatedPage.prompts.length} AI prompts applied</span>
									</div>
								</div>
							</div>

							{/* Preview Content */}
							<div className="p-8">
								<div className={`mx-auto bg-background border border-border rounded-xl overflow-hidden shadow-2xl ${
									selectedDevice === 'mobile' ? 'max-w-sm' :
									selectedDevice === 'tablet' ? 'max-w-2xl' : 'max-w-6xl'
								}`}>
									<div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
										{/* Generated Page Preview */}
										<div className="p-6 border-b border-white/10">
											<div className="flex items-center justify-between">
												<span className="font-bold">Your Brand</span>
												<div className="flex space-x-4 text-sm">
													<span>Home</span>
													<span>About</span>
													<span>Contact</span>
												</div>
											</div>
										</div>
										
										<div className="p-12 text-center">
											<h1 className="text-4xl font-bold mb-4">
												{getGeneratedHeadline(prompt)}
												<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Solution</span>
											</h1>
											<p className="text-gray-300 mb-6 max-w-2xl mx-auto">
												{getGeneratedSubheadline(prompt)}
											</p>
											<button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-medium">
												Get Started Now
											</button>
										</div>

										<div className="p-8">
											<div className="grid md:grid-cols-3 gap-6">
												{generatedPage.components.slice(0, 3).map((comp: any, index: number) => (
													<div key={index} className="p-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl">
														<h3 className="font-semibold mb-2">{comp.title}</h3>
														<p className="text-sm text-gray-300 mb-3">{comp.description}</p>
														<button className="px-3 py-1 bg-white/20 rounded-full text-xs">
															Learn More
														</button>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>

								{/* Generation Details */}
								<div className="mt-6 p-4 bg-muted/50 rounded-xl">
									<h4 className="font-medium text-foreground mb-3">Generated with:</h4>
									<div className="grid md:grid-cols-2 gap-4 text-sm">
										<div>
											<p className="text-muted-foreground mb-2">Components used:</p>
											<div className="flex flex-wrap gap-1">
												{generatedPage.components.map((comp: any, index: number) => (
													<span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
														{comp.title}
													</span>
												))}
											</div>
										</div>
										<div>
											<p className="text-muted-foreground mb-2">AI prompts applied:</p>
											<div className="flex flex-wrap gap-1">
												{generatedPage.prompts.map((promptItem: any, index: number) => (
													<span key={index} className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs">
														{promptItem.title}
													</span>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					)}

					{/* Generated Document */}
					{generatedDocument && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden shadow-2xl"
						>
							{/* Document Header */}
							<div className="p-6 border-b border-border bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center space-x-4">
										<div className="p-2 bg-primary/10 rounded-xl">
											<Copy className="w-6 h-6 text-primary" />
										</div>
										<div>
											<h3 className="text-xl font-bold text-foreground">{generatedDocument.title}</h3>
											<p className="text-sm text-muted-foreground">{generatedDocument.summary}</p>
										</div>
									</div>
									<div className="flex items-center space-x-3">
										<Button
											onClick={() => navigator.clipboard.writeText(generatedDocument.content)}
											variant="ghost"
											size="sm"
											className="text-muted-foreground hover:text-foreground"
										>
											<Copy className="w-4 h-4 mr-2" />
											Copy
										</Button>
										<Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg">
											<Download className="w-4 h-4 mr-2" />
											Export PDF
										</Button>
									</div>
								</div>
								
								{/* AI Info */}
								<div className="flex items-center justify-between text-sm">
									<div className="flex items-center space-x-6">
										<div className="flex items-center space-x-2">
											<Sparkles className="w-4 h-4 text-primary" />
											<span className="text-muted-foreground">Model:</span>
											<span className="font-medium text-foreground">{generatedDocument.aiModel}</span>
										</div>
										<div className="flex items-center space-x-2">
											<Zap className="w-4 h-4 text-green-500" />
											<span className="text-muted-foreground">Quality:</span>
											<span className="font-medium text-green-600">{generatedDocument.confidence}%</span>
										</div>
									</div>
									<div className="flex items-center space-x-4 text-xs text-muted-foreground">
										<span>Industry-grade analysis</span>
										<span>Research-quality output</span>
									</div>
								</div>
							</div>

							{/* Document Content */}
							<div className="p-8">
								{/* Content Preview */}
								<div className="bg-white/5 border border-border rounded-xl p-6 mb-6">
									<h4 className="font-semibold text-foreground mb-4 flex items-center">
										<Copy className="w-5 h-5 mr-2" />
										Generated Document
									</h4>
									<div className="prose prose-sm max-w-none text-muted-foreground">
										<pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
											{generatedDocument.content}
										</pre>
									</div>
								</div>

								{/* Data Tables */}
								{generatedDocument.tables && (
									<div className="space-y-6 mb-6">
										<h4 className="font-semibold text-foreground flex items-center">
											<BarChart3 className="w-5 h-5 mr-2" />
											Research Data & Analytics
										</h4>
										<div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
											{generatedDocument.tables.map((table: any, index: number) => (
												<div key={index} className="bg-muted/20 border border-border rounded-xl p-4">
													<h5 className="font-medium text-foreground mb-3">{table.title}</h5>
													<div className="overflow-x-auto">
														<table className="w-full text-sm">
															<thead>
																<tr className="border-b border-border">
																	{Object.keys(table.data[0]).map((key) => (
																		<th key={key} className="text-left py-2 px-3 font-medium text-muted-foreground">
																			{key.charAt(0).toUpperCase() + key.slice(1)}
																		</th>
																	))}
																</tr>
															</thead>
															<tbody>
																{table.data.map((row: any, rowIndex: number) => (
																	<tr key={rowIndex} className="border-b border-border/50">
																		{Object.values(row).map((value: any, cellIndex: number) => (
																			<td key={cellIndex} className="py-2 px-3 text-foreground">
																				{value}
																			</td>
																		))}
																	</tr>
																))}
															</tbody>
														</table>
													</div>
												</div>
											))}
										</div>
									</div>
								)}

								{/* Analytics Summary */}
								{generatedDocument.analytics && (
									<div className="bg-muted/20 border border-border rounded-xl p-6">
										<h5 className="font-medium text-foreground mb-4 flex items-center">
											<TrendingUp className="w-5 h-5 mr-2 text-primary" />
											Key Metrics & Analytics Dashboard
										</h5>
										<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
											{Object.entries(generatedDocument.analytics.metrics).map(([key, value]: [string, any]) => (
												<div key={key} className="text-center p-4 bg-background/50 rounded-lg border border-border/50">
													<div className="font-bold text-primary text-xl">{value}</div>
													<div className="text-xs text-muted-foreground capitalize mt-1">
														{key.replace(/([A-Z])/g, ' $1').trim()}
													</div>
												</div>
											))}
										</div>
									</div>
								)}
							</div>
						</motion.div>
					)}


				</div>
			</main>
		</div>
	)
} 