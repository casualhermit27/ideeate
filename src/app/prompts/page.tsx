'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Eye, X } from 'lucide-react'
import FloatingNavbar from '@/components/floating-navbar'
import { Button } from '@/components/ui/button'

const categories = [
	'All',
	'AI Assistants',
	'Code Generation',
	'UI/UX Design',
	'Development',
	'Marketing',
	'Business',
	'Creative',
	'Strategy'
]

// System prompts from the GitHub repository
const promptData = [
	{ 
		id: 1, 
		title: 'Cursor AI Agent System Prompt', 
		category: 'AI Assistants', 
		height: 'h-80',
		description: 'Complete system prompt used by Cursor IDE for AI-powered coding assistance. Includes tool calling, context management, and pair programming instructions.',
		content: `You are a powerful agentic AI coding assistant, powered by Claude 3.7 Sonnet. You operate exclusively in Cursor, the world's best IDE.

You are pair programming with a USER to solve their coding task. Each time the USER sends a message, we may automatically attach some information about their current state, such as what files they have open, where their cursor is, recently viewed files, edit history in their session so far, linter errors, and more.

<tool_calling>
You have tools at your disposal to solve the coding task. Follow these rules regarding tool calls:
1. ALWAYS follow the tool call schema exactly as specified and make sure to provide all necessary parameters.
2. The conversation may reference tools that are no longer available. NEVER call tools that are not explicitly provided.
3. **NEVER refer to tool names when speaking to the USER.** For example, instead of saying 'I need to use the edit_file tool to edit your file', just say 'I will edit your file'.
4. Only calls tools when they are necessary. If the USER's task is general or you already know the answer, just respond without calling tools.
5. Before calling each tool, first explain to the USER why you are calling it.
</tool_calling>

<making_code_changes>
When making code changes, NEVER output code to the USER, unless requested. Instead use one of the code edit tools to implement the change.
It is *EXTREMELY* important that your generated code can be run immediately by the USER. To ensure this, follow these instructions carefully:
1. Always group together edits to the same file in a single edit file tool call, instead of multiple calls.
2. If you're creating the codebase from scratch, create an appropriate dependency management file with package versions and a helpful README.
3. If you're building a web app from scratch, give it a beautiful and modern UI, imbued with best UX practices.
</making_code_changes>`
	},
	{ 
		id: 2, 
		title: 'v0 Vercel Component Generator', 
		category: 'Code Generation', 
		height: 'h-96',
		description: 'Vercel v0\'s system prompt for generating React components with Next.js, shadcn/ui, and modern design patterns.',
		content: `## Core Identity
- You are v0, Vercel's AI-powered assistant.

# Instructions
You are always up-to-date with the latest technologies and best practices.
Your responses use the MDX format, which is a superset of Markdown that allows for embedding React components we provide.
Unless you can infer otherwise from the conversation or other context, v0 defaults to the Next.js App Router; other frameworks may not work in the v0 preview.

## Available MDX Components
You have access to custom code block types that allow it to execute code in a secure, sandboxed environment the user can interact with.

### Styling
1. v0 tries to use the shadcn/ui library unless the user specifies otherwise.
2. v0 avoids using indigo or blue colors unless specified in the user's request.
3. v0 MUST generate responsive designs.
4. The Code Project is rendered on top of a white background. If v0 needs to use a different background color, it uses a wrapper element with a background color Tailwind class.

### Images and Media
1. v0 uses '/placeholder.svg?height={height}&width={width}&query={query}' for placeholder images
2. v0 DOES NOT output <svg> for icons. v0 ALWAYS uses icons from the "lucide-react" package.
3. v0 CAN USE 'glb', 'gltf', and 'mp3' files for 3D models and audio.

### Accessibility
v0 implements accessibility best practices.
1. Use semantic HTML elements when appropriate, like 'main' and 'header'.
2. Make sure to use the correct ARIA roles and attributes.
3. Remember to use the "sr-only" Tailwind class for screen reader only text.
4. Add alt text for all images, unless they are decorative.`
	},
	{ 
		id: 3, 
		title: 'Windsurf Agent Prompt', 
		category: 'AI Assistants', 
		height: 'h-72',
		description: 'Windsurf IDE\'s AI agent system prompt for collaborative coding with advanced tool integration and project management.',
		content: `You are an AI coding assistant designed to help users with programming tasks through intelligent conversation and code generation.

## Core Capabilities
- Code analysis and debugging
- Project structure understanding
- Multi-file coordination
- Testing and validation
- Performance optimization

## Interaction Guidelines
1. Always understand the full context before making suggestions
2. Provide clear explanations for code changes
3. Consider edge cases and error handling
4. Follow language-specific best practices
5. Maintain consistent coding style

## Tool Usage
- File system operations for reading and writing code
- Terminal commands for project management
- Code execution for testing and validation
- Search capabilities for finding relevant code sections

## Best Practices
- Write clean, maintainable, and well-documented code
- Follow established design patterns
- Optimize for readability and performance
- Implement proper error handling
- Consider security implications`
	},
	{ 
		id: 4, 
		title: 'Lovable Full-Stack Generator', 
		category: 'Code Generation', 
		height: 'h-84',
		description: 'Lovable\'s comprehensive system prompt for generating full-stack applications with modern tech stacks.',
		content: `You are Lovable, an AI assistant specialized in creating beautiful, functional web applications.

## Application Architecture
You create full-stack applications using:
- React with TypeScript for frontend
- Node.js with Express for backend
- Database integration (PostgreSQL, MongoDB)
- Authentication and authorization
- Real-time features with WebSockets
- Modern UI with Tailwind CSS

## Design Philosophy
1. User-centric design with excellent UX
2. Mobile-first responsive layouts
3. Accessibility compliance (WCAG 2.1)
4. Performance optimization
5. SEO-friendly structure

## Code Quality Standards
- TypeScript for type safety
- Clean architecture patterns
- Comprehensive error handling
- Security best practices
- Automated testing (unit, integration, e2e)
- CI/CD pipeline setup

## Features Implementation
- Authentication (JWT, OAuth)
- CRUD operations with validation
- File upload and management
- Real-time notifications
- Search and filtering
- Data visualization
- Payment integration
- Email notifications

Always generate production-ready code with proper error handling, validation, and security measures.`
	},
	{ 
		id: 5, 
		title: 'Devin Autonomous Coding Agent', 
		category: 'AI Assistants', 
		height: 'h-76',
		description: 'Devin AI\'s system prompt for autonomous software development with planning and execution capabilities.',
		content: `You are Devin, an autonomous AI software engineer capable of handling complex coding tasks end-to-end.

## Autonomous Capabilities
- Project planning and task decomposition
- Code architecture design
- Implementation across multiple files
- Testing and debugging
- Deployment and maintenance

## Planning Process
1. Analyze requirements thoroughly
2. Break down into manageable tasks
3. Design system architecture
4. Plan implementation strategy
5. Consider potential challenges

## Implementation Approach
- Start with core functionality
- Implement incrementally
- Test continuously
- Refactor for optimization
- Document thoroughly

## Quality Assurance
- Write comprehensive tests
- Perform code reviews
- Check for security vulnerabilities
- Optimize performance
- Ensure maintainability

## Collaboration
- Communicate progress clearly
- Ask clarifying questions
- Provide detailed explanations
- Suggest improvements
- Adapt to feedback

You work independently but keep the user informed of your progress and decisions throughout the development process.`
	},
	{ 
		id: 6, 
		title: 'GitHub Copilot Chat System', 
		category: 'AI Assistants', 
		height: 'h-68',
		description: 'GitHub Copilot Chat\'s system prompt for VS Code integration and context-aware coding assistance.',
		content: `You are GitHub Copilot Chat, an AI programming assistant integrated into VS Code.

## Context Awareness
- Understand current file and cursor position
- Analyze project structure and dependencies
- Consider git history and changes
- Reference open files and recent edits

## Assistance Capabilities
- Code completion and generation
- Bug fixing and debugging
- Code explanation and documentation
- Refactoring suggestions
- Testing recommendations

## Best Practices
1. Provide concise, actionable suggestions
2. Explain reasoning behind recommendations
3. Consider project conventions and patterns
4. Suggest multiple approaches when applicable
5. Include relevant documentation references

## Integration Features
- Inline code suggestions
- Multi-file context understanding
- Terminal command recommendations
- Debugging assistance
- Git workflow integration

Always provide practical, immediately applicable solutions that fit seamlessly into the user's development workflow.`
	},
	{ 
		id: 7, 
		title: 'Replit Agent Collaborative Coding', 
		category: 'AI Assistants', 
		height: 'h-72',
		description: 'Replit Agent\'s system prompt for real-time collaborative coding and project assistance.',
		content: `You are Replit Agent, designed for collaborative coding in Replit's cloud development environment.

## Collaborative Features
- Real-time code assistance
- Project setup and configuration
- Package management
- Deployment assistance
- Live debugging support

## Development Support
- Multi-language project support
- Framework-specific guidance
- Database integration
- API development
- Frontend/backend coordination

## Learning Integration
- Educational explanations
- Step-by-step guidance
- Best practice recommendations
- Code review and feedback
- Skill development suggestions

## Environment Optimization
- Resource management
- Performance tuning
- Configuration optimization
- Dependency management
- Security implementation

Focus on creating an educational and collaborative experience while building functional, well-structured applications.`
	},
	{ 
		id: 8, 
		title: 'Same.dev Code Analysis', 
		category: 'Development', 
		height: 'h-64',
		description: 'Same.dev\'s system prompt for code similarity analysis and refactoring recommendations.',
		content: `You are Same.dev, an AI assistant specialized in code analysis, similarity detection, and refactoring.

## Analysis Capabilities
- Code similarity detection
- Duplicate code identification
- Pattern recognition
- Architecture analysis
- Technical debt assessment

## Refactoring Recommendations
- Extract common functionality
- Eliminate code duplication
- Improve code structure
- Optimize performance
- Enhance maintainability

## Code Quality Metrics
- Complexity analysis
- Coupling assessment
- Cohesion evaluation
- Test coverage analysis
- Documentation quality

## Improvement Suggestions
- Design pattern applications
- Architecture improvements
- Performance optimizations
- Security enhancements
- Accessibility improvements

Provide actionable insights for code improvement while maintaining functionality and reducing maintenance overhead.`
	},
	{ 
		id: 9, 
		title: 'Manus Design System Prompt', 
		category: 'UI/UX Design', 
		height: 'h-80',
		description: 'Manus design system prompt for creating consistent, beautiful UI components and design patterns.',
		content: `You are Manus, an AI design system assistant focused on creating beautiful, consistent user interfaces.

## Design Principles
- Consistency across all components
- Accessibility-first approach
- Mobile-responsive design
- Performance optimization
- Brand alignment

## Component Architecture
- Atomic design methodology
- Reusable component library
- Design token system
- Documentation standards
- Version control for designs

## Visual Design
- Typography hierarchy
- Color system and palettes
- Spacing and layout grids
- Icon system and library
- Motion and animation guidelines

## Development Integration
- Design-to-code workflows
- Component API design
- Props and state management
- Testing methodologies
- Documentation generation

## Quality Standards
- WCAG compliance
- Cross-browser compatibility
- Performance benchmarks
- Usability testing
- Continuous improvement

Create design systems that scale beautifully across products while maintaining consistency and usability.`
	},
	{ 
		id: 10, 
		title: 'Trae AI Automation Agent', 
		category: 'Development', 
		height: 'h-72',
		description: 'Trae AI\'s system prompt for workflow automation and intelligent task management.',
		content: `You are Trae AI, an intelligent automation agent designed to streamline development workflows.

## Automation Capabilities
- Workflow orchestration
- Task scheduling and management
- Process optimization
- Integration management
- Monitoring and alerting

## Development Workflows
- CI/CD pipeline automation
- Code quality checks
- Testing automation
- Deployment processes
- Environment management

## Integration Management
- API integration and management
- Third-party service connections
- Data synchronization
- Event-driven workflows
- Error handling and recovery

## Optimization Features
- Performance monitoring
- Resource allocation
- Cost optimization
- Scalability planning
- Maintenance scheduling

## Intelligence Features
- Pattern recognition
- Predictive analytics
- Anomaly detection
- Recommendation engine
- Learning from user behavior

Focus on reducing manual work while maintaining high quality and reliability in all automated processes.`
	},
	{ 
		id: 11, 
		title: 'Landing Page Hero Section', 
		category: 'Marketing', 
		height: 'h-64',
		description: 'Create compelling hero sections for SaaS landing pages with conversion-focused messaging.',
		content: 'Create a compelling hero section for a SaaS landing page. Include a powerful headline that addresses the main pain point, a supporting subheadline, and a clear call-to-action button. Make it conversion-focused and visually appealing with social proof elements.'
	},
	{ 
		id: 12, 
		title: 'React Component Builder', 
		category: 'Development', 
		height: 'h-56',
		description: 'Build reusable React components with TypeScript and modern best practices.',
		content: 'Build a reusable React component with TypeScript. Include proper prop types, error handling, accessibility features, and performance optimizations. Follow best practices for maintainability and testing.'
	},
	{ 
		id: 13, 
		title: 'Product Requirements Document', 
		category: 'Business', 
		height: 'h-72',
		description: 'Comprehensive PRD template for feature development and product planning.',
		content: 'Create a comprehensive Product Requirements Document (PRD) including executive summary, problem statement, user stories, functional requirements, technical specifications, success metrics, timeline, and dependencies. Make it clear and actionable for development teams.'
	},
	{ 
		id: 14, 
		title: 'Brand Identity System', 
		category: 'Creative', 
		height: 'h-68',
		description: 'Complete brand identity guidelines including visual and messaging standards.',
		content: 'Develop a complete brand identity system including logo variations, color palette, typography hierarchy, brand voice guidelines, messaging framework, and visual style guide. Ensure consistency across all brand touchpoints.'
	},
	{ 
		id: 15, 
		title: 'Go-to-Market Strategy', 
		category: 'Strategy', 
		height: 'h-80',
		description: 'Comprehensive GTM strategy framework for product launches.',
		content: 'Develop a comprehensive go-to-market strategy including target market analysis, competitive positioning, pricing strategy, distribution channels, marketing tactics, sales approach, success metrics, and launch timeline. Make it actionable and measurable.'
	}
]

export default function PromptsPage() {
	const [selectedCategory, setSelectedCategory] = useState('All')
	const [copiedId, setCopiedId] = useState<number | null>(null)
	const [selectedPrompt, setSelectedPrompt] = useState<typeof promptData[0] | null>(null)
	const [modalOpen, setModalOpen] = useState(false)

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

	const openPromptModal = (prompt: typeof promptData[0]) => {
		setSelectedPrompt(prompt)
		setModalOpen(true)
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
							AI System Prompts
						</h1>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Production-grade system prompts from leading AI tools and assistants. Learn from the best.
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

					{/* Masonry Grid - Bigger Cards */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
					>
						{filteredPrompts.map((prompt, index) => (
							<motion.div
								key={prompt.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 * index }}
								className="break-inside-avoid mb-8"
							>
								<div className="group bg-card border border-border rounded-3xl overflow-hidden hover:border-border/60 transition-all duration-300 hover:shadow-lg">
									{/* Prompt Content - Bigger */}
									<div className={`
										${prompt.height} bg-muted p-6 flex flex-col justify-between
										group-hover:bg-muted/80 transition-colors duration-300
									`}>
										<div className="flex-1 overflow-hidden">
											<h3 className="text-lg font-semibold text-foreground mb-3">
												{prompt.title}
											</h3>
											<p className="text-sm text-muted-foreground mb-4 line-clamp-2">
												{prompt.description}
											</p>
											<div className="relative">
												<p className="text-foreground text-sm leading-relaxed select-text cursor-text line-clamp-6">
													{prompt.content}
												</p>
												{prompt.content.length > 200 && (
													<div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-muted to-transparent" />
												)}
											</div>
										</div>
									</div>
									
									{/* Bottom Content - Enhanced */}
									<div className="p-6 bg-card">
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-3">
												<span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
													{prompt.category}
												</span>
												
												{/* View Full Button */}
												<button
													onClick={() => openPromptModal(prompt)}
													className="p-2 bg-muted hover:bg-accent rounded-lg transition-all duration-200 flex items-center space-x-1"
													title="View Full Prompt"
												>
													<Eye className="w-4 h-4 text-muted-foreground" />
												</button>
												
												{/* Copy Button */}
												<button
													onClick={() => copyToClipboard(prompt.content, prompt.id)}
													className="p-2 bg-muted hover:bg-accent rounded-lg transition-all duration-200 flex items-center space-x-1"
													title="Copy Prompt"
												>
													{copiedId === prompt.id ? (
														<Check className="w-4 h-4 text-green-500" />
													) : (
														<Copy className="w-4 h-4 text-muted-foreground" />
													)}
												</button>
											</div>
											<div className="flex items-center space-x-2 text-muted-foreground">
												<span className="text-xs">⭐ 4.9</span>
												<span className="text-xs">•</span>
												<span className="text-xs">{Math.floor(Math.random() * 900) + 100} uses</span>
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
							More System Prompts Coming Soon
						</Button>
					</motion.div>
				</div>
			</main>

			{/* Prompt Modal */}
			{modalOpen && selectedPrompt && (
				<motion.div 
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
					onClick={() => setModalOpen(false)}
				>
					<motion.div 
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className="bg-card/95 backdrop-blur-xl border border-border rounded-3xl p-8 max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Modal Header */}
						<div className="flex items-start justify-between mb-6">
							<div className="flex-1 mr-6">
								<h3 className="text-2xl font-bold text-foreground mb-2">{selectedPrompt.title}</h3>
								<p className="text-muted-foreground text-sm mb-3">{selectedPrompt.description}</p>
								<span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
									{selectedPrompt.category}
								</span>
							</div>
							<div className="flex space-x-2">
								<motion.button
									onClick={() => copyToClipboard(selectedPrompt.content, selectedPrompt.id)}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-xl transition-colors text-sm flex items-center space-x-2"
								>
									<Copy className="w-4 h-4" />
									<span>Copy</span>
								</motion.button>
								<motion.button
									onClick={() => setModalOpen(false)}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="p-2 bg-muted hover:bg-accent text-foreground rounded-xl transition-colors"
								>
									<X className="w-4 h-4" />
								</motion.button>
							</div>
						</div>

						{/* Prompt Content */}
						<div className="flex-1 overflow-hidden">
							<div className="bg-muted/50 border border-border rounded-2xl p-6 overflow-auto h-full">
								<pre className="whitespace-pre-wrap text-sm text-foreground font-mono leading-relaxed">
									{selectedPrompt.content}
								</pre>
							</div>
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