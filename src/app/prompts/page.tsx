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
	'Strategy',
	'Testing',
	'Documentation',
	'Security'
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
		title: 'Claude 3.5 Sonnet System Prompt', 
		category: 'AI Assistants', 
		height: 'h-88',
		description: 'Anthropic\'s Claude 3.5 Sonnet system prompt for helpful, harmless, and honest AI assistance.',
		content: `Claude is made by Anthropic. The current date is November 2024.

Claude's knowledge cutoff is April 2024. It cannot browse the internet.

Claude should give thorough responses to more complex and open-ended questions or instructions, but be concise with simpler questions where brevity is appropriate.

Claude aims to be helpful, harmless, and honest. Claude should be honest about its capabilities and limitations, and transparent about how its responses are generated.

Claude should follow these guidelines for conversations:
- Be helpful by providing accurate, relevant, and useful information
- Be harmless by avoiding content that could cause harm
- Be honest about what you know and don't know
- Show your reasoning process when appropriate
- Ask clarifying questions when needed
- Admit uncertainty rather than guessing
- Provide balanced perspectives on controversial topics
- Respect human autonomy and avoid being manipulative

For coding tasks:
- Write clean, readable, and well-documented code
- Follow language-specific best practices
- Include error handling where appropriate
- Explain complex logic or algorithms
- Suggest testing approaches
- Consider security implications

Claude should engage thoughtfully with creative tasks while maintaining helpfulness and honesty.`
	},
	{ 
		id: 12, 
		title: 'OpenAI ChatGPT System Message', 
		category: 'AI Assistants', 
		height: 'h-72',
		description: 'OpenAI\'s ChatGPT system message for conversational AI assistance across various domains.',
		content: `You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.

## Core Capabilities
- Provide helpful, accurate, and informative responses
- Assist with a wide range of tasks and questions
- Maintain conversational context and flow
- Offer creative and analytical thinking

## Response Guidelines
- Be concise yet comprehensive
- Use clear and accessible language
- Provide examples when helpful
- Ask clarifying questions when needed
- Acknowledge limitations and uncertainties

## Tool Integration
- Execute Python code in Jupyter environment
- Browse and search web content
- Generate images with DALL-E
- Access real-time information
- Process and analyze data

## Interaction Style
- Professional yet friendly tone
- Adaptive to user preferences
- Balanced and objective perspectives
- Respectful of all viewpoints
- Educational and informative approach

Focus on being helpful, informative, and creative while following OpenAI's usage policies.`
	},
	{ 
		id: 13, 
		title: 'Cline VS Code Extension', 
		category: 'AI Assistants', 
		height: 'h-76',
		description: 'Cline\'s system prompt for autonomous development tasks with tool integration in VS Code.',
		content: `You are Cline, an AI assistant that can help users accomplish a wide variety of tasks. You are integrated with VS Code and have access to a comprehensive set of tools that allow you to create and edit files, run terminal commands, and interact with the user's development environment.

## Available Tools
- **File Operations**: Create, read, edit, and delete files and directories
- **Terminal Commands**: Execute shell commands and scripts
- **Code Analysis**: Analyze code structure and dependencies
- **Search Operations**: Search through codebases and files

## Key Capabilities
- Full-stack development assistance
- Debugging and troubleshooting
- Code refactoring and optimization
- Project setup and configuration
- Testing and deployment automation

## Working Style
- Always ask clarifying questions when requirements are unclear
- Break down complex tasks into manageable steps
- Provide detailed explanations for code changes
- Test changes before considering them complete
- Follow best practices for the specific technology stack

## Code Quality Standards
- Write clean, maintainable, and well-documented code
- Follow language-specific conventions and best practices
- Implement proper error handling and logging
- Consider security implications in all implementations
- Optimize for performance and scalability

Always strive to understand the full context of the user's project and goals before making changes.`
	},
	{ 
		id: 14, 
		title: 'Bolt.new AI Web Development', 
		category: 'Code Generation', 
		height: 'h-84',
		description: 'Bolt.new\'s system prompt for full-stack web application development with modern frameworks.',
		content: `You are Bolt, a cutting-edge AI web development assistant specialized in creating modern web applications.

## Core Technologies
- **Frontend**: React, Vue, Svelte, Next.js, Nuxt, Astro
- **Styling**: Tailwind CSS, CSS Modules, Styled Components
- **Backend**: Node.js, Express, Fastify, tRPC
- **Database**: PostgreSQL, MongoDB, SQLite, Prisma
- **Deployment**: Vercel, Netlify, Railway, Fly.io

## Development Approach
1. **Modern Stack**: Always use the latest stable versions
2. **Type Safety**: Prefer TypeScript for all projects
3. **Performance**: Optimize for Core Web Vitals
4. **Accessibility**: Implement WCAG 2.1 AA standards
5. **SEO**: Built-in SEO optimization

## Code Generation Standards
- Clean, readable, and maintainable code
- Comprehensive error handling
- Responsive design by default
- Security best practices
- Testing setup included

## Project Structure
- Follow framework-specific conventions
- Implement proper folder organization
- Include configuration files
- Set up development tooling
- Provide deployment instructions

## Features Implementation
- Authentication and authorization
- Database integration
- API development
- Real-time features
- File upload handling
- Payment processing
- Email services

Generate production-ready applications with modern development practices and comprehensive documentation.`
	},
	{ 
		id: 15, 
		title: 'RooCode AI Developer', 
		category: 'Development', 
		height: 'h-68',
		description: 'RooCode\'s system prompt for intelligent code generation and development assistance.',
		content: `You are RooCode, an AI-powered development assistant focused on writing high-quality, production-ready code.

## Development Philosophy
- Code quality over quantity
- Security-first approach
- Performance optimization
- Maintainable architecture
- Comprehensive testing

## Supported Languages & Frameworks
- **Web**: JavaScript, TypeScript, React, Vue, Angular
- **Backend**: Node.js, Python, Java, Go, Rust
- **Mobile**: React Native, Flutter, Swift, Kotlin
- **Database**: SQL, NoSQL, GraphQL
- **Cloud**: AWS, GCP, Azure, Docker, Kubernetes

## Code Standards
- Follow language-specific best practices
- Implement proper error handling
- Write comprehensive comments
- Include unit tests
- Consider edge cases

## Architecture Patterns
- Microservices architecture
- Clean architecture principles
- Design patterns implementation
- SOLID principles
- DRY and KISS methodologies

## Development Workflow
1. Analyze requirements thoroughly
2. Design system architecture
3. Implement core functionality
4. Add comprehensive tests
5. Optimize performance
6. Document thoroughly

Always prioritize code quality, security, and maintainability in every implementation.`
	},
	{ 
		id: 16, 
		title: 'Pytest Testing Framework', 
		category: 'Testing', 
		height: 'h-76',
		description: 'Comprehensive pytest prompt for Python testing with fixtures, parametrization, and best practices.',
		content: `Write comprehensive pytest tests with the following guidelines:

## Test Structure
- Use clear, descriptive test names following the pattern test_<action>_<expected_result>
- Organize tests in logical groups using classes when appropriate
- Follow AAA pattern: Arrange, Act, Assert

## Fixtures and Setup
- Create reusable fixtures for common test data
- Use appropriate fixture scopes (function, class, module, session)
- Implement teardown logic for cleanup
- Use dependency injection for test isolation

## Test Coverage
- Aim for high test coverage (>90%)
- Test happy path and edge cases
- Include negative test cases
- Test error handling and exceptions

## Parametrization
- Use @pytest.mark.parametrize for multiple test cases
- Test different input combinations
- Include boundary value testing

## Mocking and Patching
- Mock external dependencies
- Use unittest.mock or pytest-mock
- Patch at appropriate levels
- Verify mock interactions

## Performance Testing
- Include performance benchmarks
- Test scalability scenarios
- Monitor resource usage
- Set appropriate timeouts

Generate production-ready test suites that ensure code reliability and maintainability.`
	},
	{ 
		id: 17, 
		title: 'Jest JavaScript Testing', 
		category: 'Testing', 
		height: 'h-72',
		description: 'Jest testing framework prompt for JavaScript/TypeScript with React Testing Library integration.',
		content: `Create comprehensive Jest tests following modern JavaScript testing best practices:

## Test Organization
- Use describe blocks for logical grouping
- Write clear, descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)
- Use beforeEach/afterEach for setup and cleanup

## React Component Testing
- Use React Testing Library for user-centric tests
- Test component behavior, not implementation
- Use queries that resemble user interaction
- Test accessibility features

## Mock Strategies
- Mock external modules and APIs
- Use jest.mock() for module mocking
- Create manual mocks in __mocks__ directory
- Mock timers and async operations

## Assertion Patterns
- Use specific matchers for better error messages
- Test for exact values when needed
- Use snapshot testing judiciously
- Verify side effects and state changes

## Async Testing
- Use async/await for promise handling
- Test loading states and error scenarios
- Mock API responses appropriately
- Handle race conditions

## Coverage Requirements
- Maintain high test coverage
- Focus on critical business logic
- Test error boundaries and edge cases
- Include integration tests

Write tests that are maintainable, reliable, and provide confidence in code changes.`
	},
	{ 
		id: 18, 
		title: 'API Documentation Generator', 
		category: 'Documentation', 
		height: 'h-80',
		description: 'Generate comprehensive API documentation with examples, schemas, and interactive features.',
		content: `Create comprehensive API documentation with the following structure:

## Overview
- API purpose and key features
- Base URL and versioning strategy
- Authentication methods
- Rate limiting information
- Error handling patterns

## Authentication
- Detailed auth flow descriptions
- API key management
- Token expiration and refresh
- Security best practices

## Endpoints Documentation
For each endpoint include:
- HTTP method and URL
- Description and use cases
- Request parameters (path, query, body)
- Request/response schemas
- Example requests and responses
- Error codes and descriptions

## Data Models
- Complete schema definitions
- Field descriptions and constraints
- Relationships between models
- Example data structures

## Code Examples
- Multiple programming languages
- SDK usage examples
- cURL commands
- Postman collection links

## Interactive Features
- Try-it-out functionality
- Schema validation
- Response examples
- Sandbox environment

## Additional Resources
- Changelog and versioning
- Migration guides
- FAQ section
- Support contact information

Generate documentation that is clear, comprehensive, and developer-friendly.`
	},
	{ 
		id: 19, 
		title: 'Technical Writing Assistant', 
		category: 'Documentation', 
		height: 'h-72',
		description: 'Professional technical writing prompt for clear, concise, and user-focused documentation.',
		content: `Write clear, concise technical documentation following these principles:

## Writing Style
- Use active voice and present tense
- Write for your specific audience
- Use simple, direct language
- Avoid jargon and unnecessary complexity
- Break up long sentences and paragraphs

## Document Structure
- Start with clear objectives
- Use logical information hierarchy
- Include table of contents for longer docs
- Add cross-references and links
- Provide summary and next steps

## Code Documentation
- Include working code examples
- Add inline comments for complex logic
- Provide complete, runnable examples
- Show expected outputs
- Include error handling examples

## User Experience
- Anticipate user questions
- Provide troubleshooting sections
- Include screenshots and diagrams
- Add search functionality
- Enable feedback mechanisms

## Content Types
- Getting started guides
- API reference documentation
- Tutorials and how-tos
- Architecture overviews
- Troubleshooting guides

## Quality Assurance
- Review for accuracy and completeness
- Test all instructions and code
- Check for consistency in style
- Validate links and references
- Regular content updates

Create documentation that empowers users to succeed with your product or service.`
	},
	{ 
		id: 20, 
		title: 'Security Audit Prompt', 
		category: 'Security', 
		height: 'h-88',
		description: 'Comprehensive security audit prompt for identifying vulnerabilities and implementing security best practices.',
		content: `Perform a comprehensive security audit covering these critical areas:

## Authentication & Authorization
- Review authentication mechanisms
- Check for proper session management
- Verify authorization controls
- Test for privilege escalation
- Audit password policies

## Input Validation
- Test for SQL injection vulnerabilities
- Check for XSS (Cross-Site Scripting)
- Verify CSRF protection
- Test file upload security
- Review API input validation

## Data Protection
- Audit data encryption (at rest and in transit)
- Check for sensitive data exposure
- Verify PII handling compliance
- Review backup security
- Test data deletion procedures

## Infrastructure Security
- Review server configurations
- Check for outdated dependencies
- Audit network security settings
- Verify SSL/TLS implementation
- Test for security headers

## Code Security
- Static code analysis
- Dependency vulnerability scanning
- Secret management review
- Error handling assessment
- Logging and monitoring audit

## Compliance Checks
- GDPR compliance verification
- SOC 2 requirements review
- Industry-specific standards
- Privacy policy alignment
- Data retention policies

## Reporting
- Risk severity classification
- Detailed vulnerability descriptions
- Remediation recommendations
- Implementation timeline
- Follow-up procedures

Provide actionable security recommendations with clear implementation guidance.`
	},
	{ 
		id: 21, 
		title: 'OWASP Security Guidelines', 
		category: 'Security', 
		height: 'h-84',
		description: 'OWASP Top 10 security vulnerabilities prevention and mitigation strategies for web applications.',
		content: `Implement security measures based on OWASP Top 10 vulnerabilities:

## Injection Attacks Prevention
- Use parameterized queries/prepared statements
- Implement input validation and sanitization
- Apply least privilege principles
- Use ORM frameworks properly
- Regular security testing

## Broken Authentication
- Implement multi-factor authentication
- Use secure session management
- Apply strong password policies
- Protect against brute force attacks
- Secure password recovery processes

## Sensitive Data Exposure
- Encrypt data at rest and in transit
- Use proper key management
- Implement secure communication protocols
- Remove unnecessary sensitive data
- Apply data masking techniques

## XML External Entities (XXE)
- Disable XML external entity processing
- Use secure XML parsers
- Implement input validation
- Use JSON instead of XML when possible
- Keep XML processors updated

## Broken Access Control
- Implement proper authorization checks
- Use role-based access control (RBAC)
- Apply principle of least privilege
- Test access controls thoroughly
- Monitor for access violations

## Security Misconfiguration
- Secure default configurations
- Regular security updates
- Remove unnecessary features
- Implement security headers
- Automated security scanning

## Cross-Site Scripting (XSS)
- Input validation and output encoding
- Content Security Policy (CSP)
- Use safe APIs and frameworks
- Regular security testing
- User education

## Insecure Deserialization
- Avoid native deserialization
- Implement integrity checks
- Use restricted environments
- Monitor deserialization activities
- Input validation

## Using Components with Known Vulnerabilities
- Maintain inventory of components
- Regular vulnerability scanning
- Automated dependency updates
- Security-focused development lifecycle
- Vendor security monitoring

## Insufficient Logging & Monitoring
- Comprehensive audit logging
- Real-time monitoring systems
- Incident response procedures
- Log integrity protection
- Regular log analysis

Implement these security measures as part of a comprehensive security strategy.`
	},
	{ 
		id: 22, 
		title: 'Landing Page Hero Section', 
		category: 'Marketing', 
		height: 'h-64',
		description: 'Create compelling hero sections for SaaS landing pages with conversion-focused messaging.',
		content: 'Create a compelling hero section for a SaaS landing page. Include a powerful headline that addresses the main pain point, a supporting subheadline, and a clear call-to-action button. Make it conversion-focused and visually appealing with social proof elements.'
	},
	{ 
		id: 23, 
		title: 'Email Marketing Campaign', 
		category: 'Marketing', 
		height: 'h-72',
		description: 'Design high-converting email campaigns with personalization and segmentation strategies.',
		content: `Create a high-converting email marketing campaign with these elements:

## Campaign Strategy
- Define clear campaign objectives
- Identify target audience segments
- Create compelling value propositions
- Plan multi-touch sequences
- Set measurable success metrics

## Subject Line Optimization
- A/B test different variations
- Use personalization tokens
- Create urgency and curiosity
- Keep under 50 characters
- Avoid spam trigger words

## Email Content Structure
- Compelling preheader text
- Clear and engaging headline
- Concise body copy with benefits
- Strong call-to-action buttons
- Social proof and testimonials

## Personalization & Segmentation
- Dynamic content based on user data
- Behavioral triggers and workflows
- Geographic and demographic targeting
- Purchase history segmentation
- Engagement level customization

## Design Best Practices
- Mobile-responsive templates
- Clear visual hierarchy
- Brand consistency
- Accessibility considerations
- Fast loading images

## Performance Optimization
- Deliverability best practices
- List hygiene and management
- Testing and optimization
- Analytics and reporting
- Continuous improvement

Generate email campaigns that drive engagement and conversions.`
	},
	{ 
		id: 24, 
		title: 'React Component Builder', 
		category: 'Development', 
		height: 'h-56',
		description: 'Build reusable React components with TypeScript and modern best practices.',
		content: 'Build a reusable React component with TypeScript. Include proper prop types, error handling, accessibility features, and performance optimizations. Follow best practices for maintainability and testing.'
	},
	{ 
		id: 25, 
		title: 'Microservices Architecture', 
		category: 'Development', 
		height: 'h-92',
		description: 'Design scalable microservices architecture with proper service boundaries and communication patterns.',
		content: `Design a microservices architecture following these principles:

## Service Design Principles
- Single Responsibility Principle
- Business capability alignment
- Proper service boundaries
- Data ownership per service
- Independent deployment capability

## Communication Patterns
- Synchronous vs asynchronous communication
- Event-driven architectures
- API gateway implementation
- Service mesh considerations
- Circuit breaker patterns

## Data Management
- Database per service pattern
- Event sourcing and CQRS
- Distributed transaction handling
- Data consistency strategies
- Polyglot persistence

## Infrastructure Requirements
- Container orchestration (Kubernetes)
- Service discovery mechanisms
- Load balancing strategies
- Health checks and monitoring
- Distributed tracing

## Operational Concerns
- Centralized logging
- Distributed monitoring
- Deployment automation
- Configuration management
- Security implementations

## Scalability & Resilience
- Horizontal scaling strategies
- Fault tolerance mechanisms
- Performance optimization
- Resource management
- Disaster recovery planning

## Development Practices
- Domain-driven design
- API versioning strategies
- Testing approaches
- Documentation standards
- Team organization

Design architectures that are scalable, maintainable, and resilient.`
	},
	{ 
		id: 26, 
		title: 'Product Requirements Document', 
		category: 'Business', 
		height: 'h-72',
		description: 'Comprehensive PRD template for feature development and product planning.',
		content: 'Create a comprehensive Product Requirements Document (PRD) including executive summary, problem statement, user stories, functional requirements, technical specifications, success metrics, timeline, and dependencies. Make it clear and actionable for development teams.'
	},
	{ 
		id: 27, 
		title: 'Business Model Canvas', 
		category: 'Business', 
		height: 'h-80',
		description: 'Strategic business model design using the Business Model Canvas framework.',
		content: `Create a comprehensive Business Model Canvas covering:

## Key Partners
- Strategic partnerships and alliances
- Supplier relationships
- Distribution channels
- Technology partners
- Investment partners

## Key Activities
- Core business operations
- Production and manufacturing
- Problem-solving activities
- Platform/network management
- Research and development

## Key Resources
- Physical assets and infrastructure
- Intellectual property
- Human resources and talent
- Financial resources
- Digital assets and data

## Value Propositions
- Customer pain point solutions
- Unique selling propositions
- Product/service benefits
- Competitive advantages
- Innovation elements

## Customer Relationships
- Customer acquisition strategies
- Retention and loyalty programs
- Support and service models
- Community building
- Co-creation opportunities

## Channels
- Sales and distribution channels
- Marketing and communication
- Customer touchpoints
- Partner channels
- Digital platforms

## Customer Segments
- Target market definition
- Customer personas
- Market segmentation
- Niche markets
- Multi-sided platforms

## Cost Structure
- Fixed and variable costs
- Economy of scale opportunities
- Cost optimization strategies
- Value-driven vs cost-driven
- Key metrics and KPIs

## Revenue Streams
- Revenue models and pricing
- Recurring vs one-time revenue
- Multiple revenue sources
- Market pricing strategies
- Financial projections

Design sustainable and scalable business models.`
	},
	{ 
		id: 28, 
		title: 'Brand Identity System', 
		category: 'Creative', 
		height: 'h-68',
		description: 'Complete brand identity guidelines including visual and messaging standards.',
		content: 'Develop a complete brand identity system including logo variations, color palette, typography hierarchy, brand voice guidelines, messaging framework, and visual style guide. Ensure consistency across all brand touchpoints.'
	},
	{ 
		id: 29, 
		title: 'Video Content Strategy', 
		category: 'Creative', 
		height: 'h-76',
		description: 'Comprehensive video content strategy for social media and marketing campaigns.',
		content: `Develop a comprehensive video content strategy:

## Content Planning
- Define content pillars and themes
- Create content calendar and schedule
- Plan video series and campaigns
- Identify trending topics and opportunities
- Develop evergreen content assets

## Production Guidelines
- Video format specifications
- Branding and visual consistency
- Audio quality requirements
- Lighting and composition rules
- Equipment and software recommendations

## Platform Optimization
- Platform-specific requirements
- Optimal video lengths and formats
- Thumbnail design strategies
- Caption and subtitle best practices
- Hashtag and SEO optimization

## Storytelling Framework
- Hook, story, and call-to-action structure
- Character development and personas
- Emotional connection strategies
- Visual storytelling techniques
- Narrative arc development

## Distribution Strategy
- Multi-platform publishing
- Cross-promotion tactics
- Influencer collaborations
- Paid promotion strategies
- Community engagement

## Performance Metrics
- View and engagement analytics
- Conversion tracking
- Audience retention analysis
- A/B testing strategies
- ROI measurement

## Content Types
- Educational and tutorial content
- Behind-the-scenes footage
- Product demonstrations
- Customer testimonials
- Entertainment and lifestyle content

Create engaging video content that builds brand awareness and drives results.`
	},
	{ 
		id: 30, 
		title: 'Go-to-Market Strategy', 
		category: 'Strategy', 
		height: 'h-80',
		description: 'Comprehensive GTM strategy framework for product launches.',
		content: 'Develop a comprehensive go-to-market strategy including target market analysis, competitive positioning, pricing strategy, distribution channels, marketing tactics, sales approach, success metrics, and launch timeline. Make it actionable and measurable.'
	},
	{ 
		id: 31, 
		title: 'Digital Transformation Roadmap', 
		category: 'Strategy', 
		height: 'h-88',
		description: 'Strategic roadmap for organizational digital transformation with technology and process optimization.',
		content: `Create a comprehensive digital transformation roadmap:

## Current State Assessment
- Technology infrastructure audit
- Process efficiency analysis
- Skills gap identification
- Cultural readiness evaluation
- Competitive landscape review

## Vision & Objectives
- Define digital transformation goals
- Establish success metrics and KPIs
- Align with business strategy
- Stakeholder engagement plan
- Change management approach

## Technology Strategy
- Cloud migration planning
- Legacy system modernization
- Data strategy and analytics
- Automation opportunities
- Cybersecurity enhancements

## Process Optimization
- Workflow digitization
- Customer experience improvements
- Operational efficiency gains
- Quality management systems
- Performance monitoring

## Organization & Culture
- Digital skills development
- Leadership engagement
- Change management programs
- Communication strategies
- Innovation culture building

## Implementation Phases
- Quick wins identification
- Phased rollout planning
- Resource allocation
- Risk mitigation strategies
- Timeline and milestones

## Governance & Measurement
- Program management office
- Progress tracking mechanisms
- Regular review processes
- Adaptation strategies
- Continuous improvement

## Investment & ROI
- Budget planning and allocation
- Cost-benefit analysis
- Funding strategies
- ROI measurement
- Value realization tracking

Design transformation initiatives that drive sustainable competitive advantage.`
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