'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Code2, Sparkles } from 'lucide-react'
import FloatingNavbar from '@/components/floating-navbar'
import { Button } from '@/components/ui/button'

const categories = [
	'All',
	'Buttons',
	'Forms', 
	'Navigation',
	'Cards',
	'Modals',
	'Tables',
	'Charts',
	'Inputs',
	'Layout'
]

const componentData = [
	{ 
		id: 1, 
		title: 'Gradient Button', 
		category: 'Buttons', 
		height: 'h-32',
		framework: 'React',
		code: `<button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
  Click me
</button>`,
		description: 'Beautiful gradient button with hover effects and smooth transitions.',
		complexity: 'Easy',
		tags: ['gradient', 'hover', 'animation']
	},
	{ 
		id: 2, 
		title: 'Loading Spinner', 
		category: 'Components', 
		height: 'h-28',
		framework: 'CSS',
		code: `<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>`,
		description: 'Simple animated loading spinner using CSS.',
		complexity: 'Easy',
		tags: ['loading', 'animation', 'css']
	},
	{ 
		id: 3, 
		title: 'Search Input', 
		category: 'Inputs', 
		height: 'h-36',
		framework: 'React',
		code: `<div className="relative">
  <input 
    type="text" 
    placeholder="Search..." 
    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  />
  <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
</div>`,
		description: 'Search input with icon and focus states.',
		complexity: 'Easy',
		tags: ['search', 'input', 'icon']
	},
	{ 
		id: 4, 
		title: 'Card Component', 
		category: 'Cards', 
		height: 'h-40',
		framework: 'React',
		code: `<div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
  <h3 className="text-lg font-semibold mb-2">Card Title</h3>
  <p className="text-gray-600 mb-4">Card description goes here...</p>
  <button className="text-blue-500 hover:text-blue-600">Learn more →</button>
</div>`,
		description: 'Clean card component with hover effects.',
		complexity: 'Easy',
		tags: ['card', 'hover', 'layout']
	},
	{ 
		id: 5, 
		title: 'Navigation Bar', 
		category: 'Navigation', 
		height: 'h-44',
		framework: 'React',
		code: `<nav className="bg-white shadow-lg">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex justify-between h-16">
      <div className="flex items-center">
        <span className="text-xl font-bold">Logo</span>
      </div>
      <div className="flex items-center space-x-4">
        <a href="#" className="text-gray-700 hover:text-blue-500">Home</a>
        <a href="#" className="text-gray-700 hover:text-blue-500">About</a>
        <a href="#" className="text-gray-700 hover:text-blue-500">Contact</a>
      </div>
    </div>
  </div>
</nav>`,
		description: 'Responsive navigation bar with logo and menu items.',
		complexity: 'Medium',
		tags: ['navigation', 'responsive', 'menu']
	},
	{ 
		id: 6, 
		title: 'Modal Dialog', 
		category: 'Modals', 
		height: 'h-48',
		framework: 'React',
		code: `<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
    <h2 className="text-xl font-bold mb-4">Modal Title</h2>
    <p className="text-gray-600 mb-6">Modal content goes here...</p>
    <div className="flex justify-end space-x-2">
      <button className="px-4 py-2 text-gray-500 hover:text-gray-700">Cancel</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Confirm</button>
    </div>
  </div>
</div>`,
		description: 'Modal dialog with backdrop and action buttons.',
		complexity: 'Medium',
		tags: ['modal', 'dialog', 'overlay']
	},
	{ 
		id: 7, 
		title: 'Progress Bar', 
		category: 'Components', 
		height: 'h-32',
		framework: 'CSS',
		code: `<div className="w-full bg-gray-200 rounded-full h-4">
  <div className="bg-blue-500 h-4 rounded-full transition-all duration-300" style={{width: '75%'}}></div>
</div>`,
		description: 'Animated progress bar with smooth transitions.',
		complexity: 'Easy',
		tags: ['progress', 'animation', 'indicator']
	},
	{ 
		id: 8, 
		title: 'Toggle Switch', 
		category: 'Inputs', 
		height: 'h-28',
		framework: 'React',
		code: `<button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 data-[checked]:bg-blue-500">
  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform data-[checked]:translate-x-6" />
</button>`,
		description: 'iOS-style toggle switch component.',
		complexity: 'Medium',
		tags: ['toggle', 'switch', 'input']
	},
	{ 
		id: 9, 
		title: 'Breadcrumb', 
		category: 'Navigation', 
		height: 'h-24',
		framework: 'React',
		code: `<nav className="flex" aria-label="Breadcrumb">
  <ol className="flex items-center space-x-2">
    <li><a href="#" className="text-blue-500 hover:text-blue-600">Home</a></li>
    <li><span className="text-gray-400">/</span></li>
    <li><a href="#" className="text-blue-500 hover:text-blue-600">Category</a></li>
    <li><span className="text-gray-400">/</span></li>
    <li><span className="text-gray-500">Current Page</span></li>
  </ol>
</nav>`,
		description: 'Breadcrumb navigation with separators.',
		complexity: 'Easy',
		tags: ['breadcrumb', 'navigation', 'path']
	},
	{ 
		id: 10, 
		title: 'Data Table', 
		category: 'Tables', 
		height: 'h-52',
		framework: 'React',
		code: `<div className="overflow-x-auto">
  <table className="min-w-full bg-white border border-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Doe</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">john@example.com</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
      </tr>
    </tbody>
  </table>
</div>`,
		description: 'Responsive data table with styled headers.',
		complexity: 'Medium',
		tags: ['table', 'data', 'responsive']
	},
	{ 
		id: 11, 
		title: 'Alert Banner', 
		category: 'Components', 
		height: 'h-36',
		framework: 'React',
		code: `<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
  <div className="flex">
    <div className="flex-shrink-0">
      <InfoIcon className="h-5 w-5 text-blue-400" />
    </div>
    <div className="ml-3">
      <h3 className="text-sm font-medium text-blue-800">Information</h3>
      <div className="mt-2 text-sm text-blue-700">
        <p>This is an informational alert message.</p>
      </div>
    </div>
  </div>
</div>`,
		description: 'Alert banner with icon and colored background.',
		complexity: 'Easy',
		tags: ['alert', 'banner', 'notification']
	},
	{ 
		id: 12, 
		title: 'Tooltip', 
		category: 'Components', 
		height: 'h-32',
		framework: 'CSS',
		code: `<div className="relative group">
  <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
    Hover me
  </button>
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
    Tooltip text
  </div>
</div>`,
		description: 'CSS-only tooltip with hover effect.',
		complexity: 'Medium',
		tags: ['tooltip', 'hover', 'css']
	},
	{ 
		id: 13, 
		title: 'Badge', 
		category: 'Components', 
		height: 'h-24',
		framework: 'React',
		code: `<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
  New
</span>`,
		description: 'Simple badge component with colored background.',
		complexity: 'Easy',
		tags: ['badge', 'label', 'tag']
	},
	{ 
		id: 14, 
		title: 'Dropdown Menu', 
		category: 'Navigation', 
		height: 'h-40',
		framework: 'React',
		code: `<div className="relative group">
  <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm">
    Options ▼
  </button>
  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 group-hover:block hidden">
    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</a>
  </div>
</div>`,
		description: 'Dropdown menu with hover trigger.',
		complexity: 'Medium',
		tags: ['dropdown', 'menu', 'hover']
	},
	{ 
		id: 15, 
		title: 'Skeleton Loader', 
		category: 'Components', 
		height: 'h-36',
		framework: 'CSS',
		code: `<div className="animate-pulse">
  <div className="bg-gray-300 h-4 rounded w-3/4 mb-2"></div>
  <div className="bg-gray-300 h-4 rounded w-1/2 mb-2"></div>
  <div className="bg-gray-300 h-20 rounded mb-2"></div>
  <div className="bg-gray-300 h-4 rounded w-5/6"></div>
</div>`,
		description: 'Skeleton loading placeholder with animation.',
		complexity: 'Easy',
		tags: ['skeleton', 'loading', 'placeholder']
	},
	{ 
		id: 16, 
		title: 'Tabs', 
		category: 'Navigation', 
		height: 'h-44',
		framework: 'React',
		code: `<div>
  <nav className="flex space-x-8 border-b border-gray-200">
    <button className="py-2 px-1 border-b-2 border-blue-500 text-blue-600 font-medium text-sm">
      Tab 1
    </button>
    <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm">
      Tab 2
    </button>
    <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm">
      Tab 3
    </button>
  </nav>
  <div className="mt-4">
    <p>Tab content goes here...</p>
  </div>
</div>`,
		description: 'Tab navigation with active state indicator.',
		complexity: 'Medium',
		tags: ['tabs', 'navigation', 'state']
	},
	{ 
		id: 17, 
		title: 'Avatar', 
		category: 'Components', 
		height: 'h-28',
		framework: 'React',
		code: `<div className="flex items-center space-x-3">
  <img className="h-10 w-10 rounded-full" src="/avatar.jpg" alt="Avatar" />
  <div>
    <p className="text-sm font-medium text-gray-900">John Doe</p>
    <p className="text-sm text-gray-500">john@example.com</p>
  </div>
</div>`,
		description: 'User avatar with name and email.',
		complexity: 'Easy',
		tags: ['avatar', 'user', 'profile']
	},
	{ 
		id: 18, 
		title: 'Pagination', 
		category: 'Navigation', 
		height: 'h-32',
		framework: 'React',
		code: `<nav className="flex items-center justify-between">
  <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
    Previous
  </button>
  <div className="flex space-x-1">
    <button className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-300 rounded-md">1</button>
    <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">2</button>
    <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">3</button>
  </div>
  <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
    Next
  </button>
</nav>`,
		description: 'Pagination component with previous/next buttons.',
		complexity: 'Medium',
		tags: ['pagination', 'navigation', 'pages']
	},
	{ 
		id: 19, 
		title: 'Star Rating', 
		category: 'Inputs', 
		height: 'h-28',
		framework: 'React',
		code: `<div className="flex items-center space-x-1">
  {[1, 2, 3, 4, 5].map((star) => (
    <button key={star} className="text-yellow-400 hover:text-yellow-500">
      <StarIcon className="h-5 w-5" />
    </button>
  ))}
  <span className="ml-2 text-sm text-gray-600">(4.5)</span>
</div>`,
		description: 'Interactive star rating component.',
		complexity: 'Medium',
		tags: ['rating', 'stars', 'interactive']
	},
	{ 
		id: 20, 
		title: 'File Upload', 
		category: 'Inputs', 
		height: 'h-40',
		framework: 'React',
		code: `<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
  <div className="space-y-2">
    <UploadIcon className="mx-auto h-8 w-8 text-gray-400" />
    <div className="text-sm text-gray-600">
      <span className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">Click to upload</span>
      <span> or drag and drop</span>
    </div>
    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
  </div>
  <input type="file" className="hidden" />
</div>`,
		description: 'Drag and drop file upload area.',
		complexity: 'Medium',
		tags: ['upload', 'file', 'drag-drop']
	}
]

export default function ComponentsPage() {
	const [selectedCategory, setSelectedCategory] = useState('All')
	const [copiedId, setCopiedId] = useState<number | null>(null)

	const filteredComponents = selectedCategory === 'All' 
		? componentData 
		: componentData.filter(component => component.category === selectedCategory)

	const copyToClipboard = async (content: string, id: number) => {
		try {
			await navigator.clipboard.writeText(content)
			setCopiedId(id)
			setTimeout(() => setCopiedId(null), 2000)
		} catch (err) {
			console.error('Failed to copy text: ', err)
		}
	}

	const getFrameworkColor = (framework: string) => {
		switch (framework) {
			case 'React': return 'bg-blue-500/20 text-blue-400'
			case 'Vue': return 'bg-green-500/20 text-green-400'
			case 'Angular': return 'bg-red-500/20 text-red-400'
			case 'CSS': return 'bg-purple-500/20 text-purple-400'
			default: return 'bg-gray-500/20 text-gray-400'
		}
	}

	const getComplexityColor = (complexity: string) => {
		switch (complexity) {
			case 'Easy': return 'text-green-500'
			case 'Medium': return 'text-yellow-500'
			case 'Hard': return 'text-red-500'
			default: return 'text-gray-500'
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
							Ready-to-use UI components with clean code and modern design patterns
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
						className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
					>
						{filteredComponents.map((component, index) => (
							<motion.div
								key={component.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.05 * index }}
								className="break-inside-avoid mb-4"
							>
								<div className="group bg-card border border-border rounded-xl overflow-hidden hover:border-border/60 transition-all duration-300">
									{/* Component Preview */}
									<div className={`
										${component.height} bg-muted/30 p-4 flex flex-col justify-between
										group-hover:bg-muted/40 transition-colors duration-300
									`}>
										<div className="flex-1 overflow-hidden">
											<div className="flex items-center gap-2 mb-2">
												<Code2 className="w-4 h-4 text-muted-foreground" />
												<span className="text-xs text-muted-foreground">{component.framework}</span>
											</div>
											<p className="text-xs text-muted-foreground leading-relaxed">
												{component.description}
											</p>
										</div>
										<div className="flex flex-wrap gap-1 mt-2">
											{component.tags.slice(0, 2).map((tag) => (
												<span key={tag} className="text-xs bg-background/50 px-2 py-1 rounded-full text-muted-foreground">
													{tag}
												</span>
											))}
										</div>
									</div>
									
									{/* Bottom Content */}
									<div className="p-4 bg-card">
										<div className="flex items-center justify-between mb-3">
											<h3 className="text-sm font-medium text-foreground">{component.title}</h3>
											<span className={`text-xs font-medium ${getComplexityColor(component.complexity)}`}>
												{component.complexity}
											</span>
										</div>
										
										<div className="flex items-center justify-between">
											<span className={`px-2 py-1 rounded-full text-xs font-medium ${getFrameworkColor(component.framework)}`}>
												{component.framework}
											</span>
											
											{/* Copy Button */}
											<button
												onClick={() => copyToClipboard(component.code, component.id)}
												className="p-2 bg-muted hover:bg-accent rounded-lg transition-all duration-200 flex items-center space-x-1"
											>
												{copiedId === component.id ? (
													<Check className="w-3 h-3 text-green-500" />
												) : (
													<Copy className="w-3 h-3 text-muted-foreground" />
												)}
											</button>
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
							<Sparkles className="w-4 h-4 mr-2" />
							Load More Components
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