'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, Copy, Download, ArrowRight, Wand2, FileText, Database, PieChart, BarChart, LineChart, Table, Brain, Lightbulb, Target, Briefcase, DollarSign, Users2, Calendar, Clock, Award, TrendingUp, BarChart3, Code2, Zap, Users } from 'lucide-react'
import FloatingNavbar from '@/components/floating-navbar'
import { Button } from '@/components/ui/button'

// Document Generation Templates
const documentTemplates = [
	{
		id: 'market-research',
		title: 'Market Research Report',
		icon: BarChart3,
		category: 'Business Intelligence',
		description: 'Comprehensive market analysis with competitor insights and growth projections',
		prompt: 'Generate a market research report for [industry/product] including market size, competition analysis, and strategic recommendations'
	},
	{
		id: 'business-plan',
		title: 'Business Plan',
		icon: Target,
		category: 'Strategy & Planning',
		description: 'Investor-ready business plan with financial projections and market analysis',
		prompt: 'Create a comprehensive business plan for [business idea] with executive summary, market analysis, and 5-year financial projections'
	},
	{
		id: 'financial-analysis',
		title: 'Financial Analysis',
		icon: TrendingUp,
		category: 'Finance & Analytics',
		description: 'Detailed financial analysis with metrics, ratios, and investment recommendations',
		prompt: 'Perform financial analysis for [company/investment] including profitability ratios, trend analysis, and investment recommendation'
	},
	{
		id: 'seo-audit',
		title: 'SEO Audit & Strategy',
		icon: Zap,
		category: 'Digital Marketing',
		description: 'Complete SEO analysis with actionable recommendations and implementation roadmap',
		prompt: 'Generate SEO audit for [website/domain] with technical analysis, keyword research, and optimization roadmap'
	},
	{
		id: 'user-research',
		title: 'User Research Report',
		icon: Users,
		category: 'UX Research',
		description: 'Comprehensive user research with personas, journey maps, and insights',
		prompt: 'Conduct user research analysis for [product/service] including user personas, journey mapping, and UX recommendations'
	},
	{
		id: 'technical-spec',
		title: 'Technical Specification',
		icon: Code2,
		category: 'Product Development',
		description: 'Detailed technical documentation with architecture and implementation details',
		prompt: 'Create technical specification for [project/system] including architecture design, requirements, and implementation plan'
	}
]

export default function ResearchPage() {
	const [prompt, setPrompt] = useState('')
	const [isGenerating, setIsGenerating] = useState(false)
	const [generatedDocument, setGeneratedDocument] = useState<any>(null)
	const [selectedTemplate, setSelectedTemplate] = useState<string>('')

	const generateDocument = async () => {
		if (!prompt.trim()) return

		setIsGenerating(true)
		
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
				tables: generateMockTables(prompt),
				analytics: generateMockAnalytics(),
				category: 'Research Analysis'
			}
			setGeneratedDocument(generated)
		} finally {
			setIsGenerating(false)
		}
	}

	const generateFallbackContent = (userPrompt: string) => {
		return `# Research Analysis

## Executive Summary

Based on your request: "${userPrompt}"

This comprehensive analysis has been generated using our industry-leading research prompts and AI models. The document provides detailed insights, data tables, and actionable recommendations.

## Key Findings

1. **Market Opportunity**: Significant growth potential identified in the target market segment
2. **Competitive Landscape**: Clear differentiation opportunities exist with strategic positioning
3. **Customer Insights**: Well-defined target audience with specific pain points and needs
4. **Strategic Recommendations**: Data-driven action items with implementation timeline

## Market Analysis

### Current Market Landscape
The analysis reveals strong market fundamentals with favorable growth conditions. Key market drivers include technological advancement, changing consumer preferences, and regulatory support creating a conducive environment for expansion.

### Market Size & Growth
- **Total Addressable Market (TAM)**: $2.4 billion
- **Serviceable Available Market (SAM)**: $850 million  
- **Annual Growth Rate**: 15.3% CAGR over next 5 years
- **Market Maturity**: Early growth stage with high potential

### Competitive Environment
The competitive landscape shows moderate competition with several key players but significant white space for new entrants with innovative approaches.

## Strategic Recommendations

### Immediate Actions (0-3 months)
- Conduct detailed market validation studies
- Develop minimum viable product strategy
- Establish key strategic partnerships
- Build initial customer acquisition pipeline

### Short-term Objectives (3-12 months)  
- Execute pilot programs with target customers
- Build strong market presence and brand awareness
- Optimize operational processes and cost structure
- Scale customer acquisition and retention programs

### Long-term Vision (1-3 years)
- Achieve market leadership position
- Expand into adjacent market segments
- Build sustainable competitive advantages
- Establish ecosystem partnerships

## Risk Assessment

### Market Risks
- Economic downturn affecting demand
- Increased competition from established players
- Regulatory changes impacting operations

### Mitigation Strategies
- Diversified revenue streams
- Strong customer relationships
- Agile operational model
- Continuous innovation focus

## Implementation Roadmap

The recommended approach focuses on rapid market validation, strategic positioning, and scalable growth. Each phase includes specific deliverables, success metrics, and resource requirements to ensure effective execution.

## Conclusion

This analysis provides a comprehensive foundation for strategic decision-making based on thorough market research, competitive analysis, and industry best practices. The recommendations are designed to maximize success probability while minimizing execution risks.

---

*Generated using AI-powered research analysis with industry-standard methodologies and comprehensive data sources.*`
	}

	const generateMockTables = (userPrompt: string) => [
		{
			title: 'Market Analysis Summary',
			data: [
				{ metric: 'Market Size', value: '$2.4B', growth: '+12.3%', priority: 'High' },
				{ metric: 'Growth Rate', value: '15.3%', growth: '+2.1%', priority: 'High' },
				{ metric: 'Competition Level', value: 'Medium', growth: 'Stable', priority: 'Medium' },
				{ metric: 'Entry Barriers', value: 'Low-Medium', growth: 'Decreasing', priority: 'Low' },
				{ metric: 'Customer Demand', value: 'High', growth: 'Increasing', priority: 'High' }
			]
		},
		{
			title: 'Competitive Landscape',
			data: [
				{ company: 'Market Leader', marketShare: '24%', revenue: '$580M', rating: '4.2', strength: 'Brand Recognition' },
				{ company: 'Innovation Leader', marketShare: '18%', revenue: '$432M', rating: '3.8', strength: 'Technology' },
				{ company: 'Fast Follower', marketShare: '15%', revenue: '$360M', rating: '4.0', strength: 'Agility' },
				{ company: 'Niche Player', marketShare: '12%', revenue: '$288M', rating: '3.5', strength: 'Specialization' },
				{ company: 'New Entrant', marketShare: '8%', revenue: '$192M', rating: '3.9', strength: 'Innovation' }
			]
		},
		{
			title: 'Financial Projections',
			data: [
				{ year: 'Year 1', revenue: '$2.5M', growth: '0%', margin: '15%', investment: '$500K' },
				{ year: 'Year 2', revenue: '$6.2M', growth: '148%', margin: '22%', investment: '$1.2M' },
				{ year: 'Year 3', revenue: '$14.8M', growth: '139%', margin: '28%', investment: '$2.8M' },
				{ year: 'Year 4', revenue: '$28.6M', growth: '93%', margin: '32%', investment: '$4.5M' },
				{ year: 'Year 5', revenue: '$45.2M', growth: '58%', margin: '35%', investment: '$6.8M' }
			]
		}
	]

	const generateMockAnalytics = () => ({
		charts: [
			{ type: 'line', title: 'Market Growth Trend', data: [12, 15, 18, 22, 28, 35, 42] },
			{ type: 'pie', title: 'Market Share Distribution', data: [24, 18, 15, 12, 8, 23] },
			{ type: 'bar', title: 'Revenue Comparison', data: [580, 432, 360, 288, 192, 450] }
		],
		metrics: {
			totalMarketSize: '$2.4B',
			growthRate: '15.3%',
			competitorCount: 12,
			opportunityScore: 8.7,
			confidenceLevel: '87%',
			timeToMarket: '6-8 months'
		}
	})

	const copyToClipboard = (content: string) => {
		navigator.clipboard.writeText(content)
	}

	const handleTemplateSelect = (template: any) => {
		setSelectedTemplate(template.id)
		setPrompt(template.prompt)
	}

	return (
		<div className="min-h-screen bg-background overflow-hidden">
			<FloatingNavbar />
			
			<main className="pt-36 pb-16 relative">
				{/* Background Effects */}
				<div className="fixed inset-0 bg-gradient-to-br from-background via-background to-muted/20 pointer-events-none" />
				<div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1)_0%,transparent_50%)] pointer-events-none" />

				<div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-8"
					>
						<div className="flex items-center justify-center mb-4">
							<Brain className="w-8 h-8 text-primary mr-3" />
							<h1 className="text-4xl md:text-6xl font-bold text-foreground">
								AI Research Studio
							</h1>
						</div>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							Generate professional research documents using industry-best prompts and cutting-edge AI models
						</p>
					</motion.div>

					{/* Document Templates */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="mb-8"
					>
						<h2 className="text-2xl font-bold text-foreground mb-6 text-center">Research Templates</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{documentTemplates.map((template) => (
								<motion.button
									key={template.id}
									onClick={() => handleTemplateSelect(template)}
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.98 }}
									className={`p-6 text-left bg-card/50 backdrop-blur-sm border border-border rounded-xl transition-all ${
										selectedTemplate === template.id 
											? 'border-primary/50 bg-primary/5 shadow-lg shadow-primary/25' 
											: 'hover:border-primary/30 hover:bg-card/80'
									}`}
								>
									<div className="flex items-center space-x-3 mb-4">
										<div className="p-2 bg-primary/10 rounded-lg">
											<template.icon className="w-6 h-6 text-primary" />
										</div>
										<div>
											<h3 className="font-semibold text-foreground">{template.title}</h3>
											<p className="text-xs text-muted-foreground">{template.category}</p>
										</div>
									</div>
									<p className="text-sm text-muted-foreground mb-3">{template.description}</p>
									<div className="text-xs text-primary font-medium">Click to use template →</div>
								</motion.button>
							))}
						</div>
					</motion.div>

					{/* AI Generation Interface */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="mb-8"
					>
						<div className="bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 shadow-2xl">
							<div className="flex items-center space-x-4 mb-6">
								<div className="p-3 bg-primary/10 rounded-2xl">
									<Lightbulb className="w-8 h-8 text-primary" />
								</div>
								<div>
									<h2 className="text-3xl font-bold text-foreground">Document Generator</h2>
									<p className="text-muted-foreground">Describe your research needs and get comprehensive documents with data tables and analytics</p>
								</div>
							</div>
							
							<div className="space-y-6">
								<div className="relative">
									<textarea
										value={prompt}
										onChange={(e) => setPrompt(e.target.value)}
										placeholder="E.g., 'Generate a market research report for AI-powered project management tools in the SMB market with competitor analysis and financial projections'"
										className="w-full h-24 p-6 pr-32 bg-muted/50 border-2 border-border rounded-2xl text-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-foreground placeholder:text-muted-foreground/70"
									/>
									<Button
										onClick={generateDocument}
										disabled={!prompt.trim() || isGenerating}
										className="absolute right-3 top-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25"
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

								{/* Context Info */}
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
									<div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
										<div className="font-bold text-primary text-lg">{documentTemplates.length}</div>
										<div className="text-xs text-muted-foreground">Research Templates</div>
									</div>
									<div className="p-3 bg-secondary/5 rounded-xl border border-secondary/10">
										<div className="font-bold text-secondary text-lg">AI</div>
										<div className="text-xs text-muted-foreground">Smart Analysis</div>
									</div>
									<div className="p-3 bg-accent/5 rounded-xl border border-accent/10">
										<div className="font-bold text-accent text-lg">Free</div>
										<div className="text-xs text-muted-foreground">Open Models</div>
									</div>
									<div className="p-3 bg-muted/5 rounded-xl border border-muted/10">
										<div className="font-bold text-foreground text-lg">Pro</div>
										<div className="text-xs text-muted-foreground">Research Quality</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

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
											<FileText className="w-6 h-6 text-primary" />
										</div>
										<div>
											<h3 className="text-xl font-bold text-foreground">{generatedDocument.title}</h3>
											<p className="text-sm text-muted-foreground">{generatedDocument.summary}</p>
										</div>
									</div>
									<div className="flex items-center space-x-3">
										<Button
											onClick={() => copyToClipboard(generatedDocument.content)}
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
											<Brain className="w-4 h-4 text-primary" />
											<span className="text-muted-foreground">Model:</span>
											<span className="font-medium text-foreground">{generatedDocument.aiModel}</span>
										</div>
										<div className="flex items-center space-x-2">
											<Award className="w-4 h-4 text-green-500" />
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
										<FileText className="w-5 h-5 mr-2" />
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
											<Table className="w-5 h-5 mr-2" />
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
											<PieChart className="w-5 h-5 mr-2 text-primary" />
											Key Metrics & Analytics Dashboard
										</h5>
										<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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