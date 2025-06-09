# ideeate - Modern Development Platform

A beautiful, modern web application built with Next.js, Tailwind CSS, and Framer Motion, featuring a sleek dark theme and floating navigation.

## 🚀 Features

- **Floating Navigation Bar**: Beautiful glassmorphism navbar with smooth animations
- **Dark Theme**: Complete black, white, and grey color scheme inspired by Shadcn UI
- **Framer Motion Animations**: Smooth, professional animations throughout the interface
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Theme Switching**: Built-in light/dark mode toggle
- **Modern UI Components**: Using Shadcn UI components for consistency

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.3 with App Router
- **Styling**: Tailwind CSS with custom dark theme
- **Animations**: Framer Motion for smooth interactions
- **UI Components**: Shadcn UI with Radix primitives
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Font**: Geist Sans & Geist Mono

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Design Features

### Floating Navbar
- **Left Side**: "ideeate" brand logo
- **Right Side**: Navigation items (Prompts, Landings, Components, Theme)
- **Glassmorphism Effect**: Semi-transparent background with backdrop blur
- **Hover Animations**: Smooth scale and color transitions
- **Staggered Animations**: Sequential item animations on load

### Color Scheme
- **Primary Background**: Black gradient (`from-black via-gray-900 to-black`)
- **Navbar**: Black with 80% opacity and white borders
- **Text**: White primary, gray-300 secondary
- **Accents**: White with various opacity levels
- **Hover States**: White with 10% opacity

### Animations
- **Page Load**: Navbar slides down from top with fade-in
- **Hover Effects**: Scale transformations and color transitions
- **Theme Toggle**: Smooth icon and text changes
- **Background**: Subtle radial and conic gradients

## 🔧 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and theme variables
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Home page with hero section
├── components/
│   ├── ui/                  # Shadcn UI components
│   ├── floating-navbar.tsx  # Main navigation component
│   └── theme-provider.tsx   # Theme context provider
└── lib/
    └── utils.ts             # Utility functions
```

## 🎯 Navigation Items

- **Prompts**: AI-powered prompts to accelerate workflow
- **Landings**: Beautiful landing page templates and designs  
- **Components**: Reusable UI components for rapid development
- **Theme**: Light/Dark mode toggle with smooth transitions

## 🚀 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Responsive typography (text-6xl to text-8xl)
- Adaptive spacing and padding
- Touch-friendly interactive elements

## 🎨 Customization

The theme can be customized by modifying the CSS variables in `globals.css`:
- Color scheme variables for light/dark modes
- Border radius values
- Animation durations
- Backdrop blur effects

## 📄 License

This project is open source and available under the MIT License.
