import FloatingNavbar from '@/components/floating-navbar'

export default function Home() {
	return (
		<div className="min-h-screen bg-background">
			{/* Floating Navbar */}
			<FloatingNavbar />
			
			{/* Main Content */}
			<main className="flex flex-col items-center justify-center min-h-screen pt-32 px-6">
				<div className="text-center space-y-8 max-w-4xl">
					{/* Hero Section */}
					<div className="space-y-4">
						<h1 className="text-6xl md:text-8xl font-bold text-foreground tracking-tight">
							Welcome to{' '}
							<span className="bg-gradient-to-r from-foreground via-muted-foreground to-muted-foreground bg-clip-text text-transparent">
								ideeate
							</span>
						</h1>
						<p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							Design, build, and create amazing experiences with our modern development platform
						</p>
					</div>

					{/* Feature Cards */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
						<div className="p-6 bg-card border border-border rounded-2xl hover:bg-accent/10 transition-all duration-300">
							<h3 className="text-xl font-semibold text-foreground mb-2">Prompts</h3>
							<p className="text-muted-foreground">AI-powered prompts to accelerate your workflow</p>
						</div>
						<div className="p-6 bg-card border border-border rounded-2xl hover:bg-accent/10 transition-all duration-300">
							<h3 className="text-xl font-semibold text-foreground mb-2">Landings</h3>
							<p className="text-muted-foreground">Beautiful landing page templates and designs</p>
						</div>
						<div className="p-6 bg-card border border-border rounded-2xl hover:bg-accent/10 transition-all duration-300">
							<h3 className="text-xl font-semibold text-foreground mb-2">Components</h3>
							<p className="text-muted-foreground">Reusable UI components for rapid development</p>
						</div>
					</div>
				</div>
			</main>

			{/* Background Pattern */}
			<div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)] pointer-events-none" />
			<div className="fixed inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(255,255,255,0.05)_60deg,transparent_120deg)] pointer-events-none" />
		</div>
	)
}
