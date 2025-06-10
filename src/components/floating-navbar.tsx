'use client'

import { motion } from 'framer-motion'
import { Moon, Sun, Code, FileText, Lightbulb, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
import Link from 'next/link'

export default function FloatingNavbar() {
	const { theme, setTheme } = useTheme()

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	const mainNavItems = [
		{
			name: 'Prompts',
			icon: Lightbulb,
			href: '/prompts'
		},
		{
			name: 'Landings',
			icon: FileText,
			href: '/landings'
		},
		{
			name: 'Components',
			icon: Code,
			href: '/components'
		}
	]

	return (
		<motion.nav
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
			className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
		>
			<motion.div
				className="bg-background/80 backdrop-blur-xl border border-border rounded-2xl px-6 py-3 shadow-2xl"
				whileHover={{ scale: 1.02 }}
				transition={{ duration: 0.2 }}
			>
				<div className="flex items-center justify-between gap-8">
					{/* Logo/Brand */}
					<motion.div
						className="flex items-center"
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.2 }}
					>
						<Link href="/">
							<h1 className="text-xl font-bold text-foreground tracking-tight cursor-pointer">
								ideeate
							</h1>
						</Link>
					</motion.div>

					{/* Navigation Items */}
					<div className="flex items-center gap-2">
						{/* Main Navigation Items */}
						{mainNavItems.map((item, index) => (
							<motion.div
								key={item.name}
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ 
									duration: 0.5, 
									delay: index * 0.1,
									ease: [0.25, 0.46, 0.45, 0.94]
								}}
							>
								<Link href={item.href}>
									<Button
										variant="ghost"
										size="sm"
										className="text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 rounded-xl"
									>
										<item.icon className="w-4 h-4 mr-2" />
										{item.name}
									</Button>
								</Link>
							</motion.div>
						))}

						{/* Vertical Separator */}
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ 
								duration: 0.5, 
								delay: 0.3,
								ease: [0.25, 0.46, 0.45, 0.94]
							}}
							className="h-6 w-px bg-border mx-2"
						/>

						{/* Playground Button - Highlighted */}
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ 
								duration: 0.5, 
								delay: 0.4,
								ease: [0.25, 0.46, 0.45, 0.94]
							}}
						>
							<Link href="/playground">
								<Button
									variant="default"
									size="sm"
									className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 rounded-xl shadow-md"
								>
									<Play className="w-4 h-4 mr-2" />
									Playground
								</Button>
							</Link>
						</motion.div>

						{/* Theme Toggle */}
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ 
								duration: 0.5, 
								delay: 0.5,
								ease: [0.25, 0.46, 0.45, 0.94]
							}}
						>
							<Button
								variant="ghost"
								size="sm"
								onClick={toggleTheme}
								className="text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 rounded-xl p-2"
							>
								{theme === 'dark' ? (
									<Moon className="w-4 h-4" />
								) : (
									<Sun className="w-4 h-4" />
								)}
							</Button>
						</motion.div>
					</div>
				</div>
			</motion.div>

			{/* Subtle glow effect */}
			<div className="absolute inset-0 bg-gradient-to-r from-muted/5 via-muted/10 to-muted/5 rounded-2xl blur-xl -z-10" />
		</motion.nav>
	)
} 