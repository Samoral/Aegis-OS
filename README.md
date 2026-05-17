# AEGIS OS - Emergency Response System

![AEGIS OS](https://img.shields.io/badge/AEGIS-OS-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)

Advanced Emergency Global Intelligence System - A production-ready emergency response coordination platform built with Next.js 14, TypeScript, and modern web technologies.

## ✨ Features

- 🚨 **Real-time Emergency Dashboard** - Monitor active emergencies and response teams
- 🎨 **Glassmorphism UI** - Modern, futuristic design with glassmorphism effects
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- ⚡ **High Performance** - Built with Next.js 14 App Router for optimal speed
- 🎭 **Smooth Animations** - Framer Motion powered animations
- 🎯 **Type-Safe** - Full TypeScript support for robust development
- 🌐 **Production Ready** - Optimized for Vercel deployment

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Utilities:** clsx for class management

## 📦 Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd aegis-os
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
aegis-os/
├── app/                      # Next.js 14 App Router
│   ├── layout.tsx           # Root layout with sidebar, navbar, footer
│   ├── page.tsx             # Dashboard homepage
│   └── globals.css          # Global styles with glassmorphism utilities
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx       # Animated button component
│   │   ├── Card.tsx         # Glass card component
│   │   ├── Badge.tsx        # Status badge component
│   │   └── StatusIndicator.tsx  # Animated status indicator
│   └── layout/              # Layout components
│       ├── Sidebar.tsx      # Responsive sidebar navigation
│       ├── Navbar.tsx       # Top navigation bar
│       └── Footer.tsx       # Footer with links
├── lib/
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.js          # Next.js configuration
```

## 🎨 Design System

### Colors
- **Primary:** Blue tones for main actions
- **Danger:** Red for critical emergencies
- **Warning:** Orange for warnings
- **Success:** Green for positive states

### Components
- **Glass Effects:** Three variants (default, strong, subtle)
- **Buttons:** Multiple variants with hover animations
- **Cards:** Interactive cards with hover effects
- **Badges:** Status indicators with color coding
- **Status Indicators:** Animated pulse indicators

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
```

### Tailwind Customization
Modify `tailwind.config.ts` to customize:
- Color schemes
- Animations
- Breakpoints
- Custom utilities

## 📱 Responsive Design

- **Mobile:** < 768px - Collapsible sidebar, stacked layout
- **Tablet:** 768px - 1024px - Optimized grid layouts
- **Desktop:** > 1024px - Full sidebar, multi-column layouts

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Manual Build
```bash
npm run build
npm start
```

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier recommended for formatting

## 🎯 Key Features Implementation

### Glassmorphism
Custom CSS utilities in `globals.css`:
- `.glass` - Default glass effect
- `.glass-strong` - Enhanced glass effect
- `.glass-subtle` - Subtle glass effect

### Animations
Framer Motion variants for:
- Page transitions
- Component entrance animations
- Hover effects
- Interactive elements

### Responsive Navigation
- Desktop: Persistent sidebar
- Mobile: Collapsible sidebar with overlay
- Smooth transitions between states

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please open an issue in the repository.

---

Built with ❤️ for emergency responders worldwide.