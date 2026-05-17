# AEGIS OS - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, or pnpm package manager
- Git (optional)

### Installation Steps

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Open Browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure Explained

```
aegis-os/
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx               # Root layout with sidebar, navbar, footer
│   ├── page.tsx                 # Dashboard homepage
│   └── globals.css              # Global styles with glassmorphism
│
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx           # Animated button with variants
│   │   ├── Card.tsx             # Glass card with hover effects
│   │   ├── Badge.tsx            # Status badge component
│   │   ├── StatusIndicator.tsx  # Animated pulse indicator
│   │   └── index.ts             # Barrel export
│   │
│   └── layout/                  # Layout components
│       ├── Sidebar.tsx          # Responsive sidebar navigation
│       ├── Navbar.tsx           # Top navigation bar
│       ├── Footer.tsx           # Footer with links
│       └── index.ts             # Barrel export
│
├── lib/
│   └── utils.ts                 # Utility functions (cn, debounce, etc.)
│
├── types/
│   └── index.ts                 # TypeScript type definitions
│
├── public/                      # Static assets
│   └── vercel.svg              # Vercel logo
│
├── Configuration Files
│   ├── tailwind.config.ts       # Tailwind CSS configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── next.config.js          # Next.js configuration
│   ├── postcss.config.js       # PostCSS configuration
│   └── .eslintrc.json          # ESLint configuration
│
└── Documentation
    ├── README.md               # Main documentation
    └── SETUP.md               # This file
```

## 🎨 Design System

### Color Palette
```typescript
Primary:   #0ea5e9 (Blue)    - Main actions, links
Danger:    #ef4444 (Red)     - Critical emergencies, errors
Warning:   #f59e0b (Orange)  - Warnings, cautions
Success:   #22c55e (Green)   - Success states, confirmations
```

### Glassmorphism Effects
Three variants available:
- **glass**: Default glass effect
- **glass-strong**: Enhanced glass with more blur
- **glass-subtle**: Subtle glass for backgrounds

Usage:
```tsx
<div className="glass rounded-xl p-6">
  Content here
</div>
```

### Component Variants

#### Button
```tsx
<Button variant="primary">Primary</Button>
<Button variant="danger">Danger</Button>
<Button variant="warning">Warning</Button>
<Button variant="success">Success</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
```

#### Card
```tsx
<Card variant="default">Default Card</Card>
<Card variant="strong">Strong Glass</Card>
<Card variant="subtle">Subtle Glass</Card>
<Card interactive hover>Interactive Card</Card>
```

#### Badge
```tsx
<Badge variant="primary">Primary</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="success">Success</Badge>
<Badge withDot>With Indicator</Badge>
```

#### Status Indicator
```tsx
<StatusIndicator status="critical" />
<StatusIndicator status="warning" />
<StatusIndicator status="normal" />
<StatusIndicator status="info" />
```

## 🔧 Configuration

### Environment Variables
Create `.env.local` file:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=ws://localhost:3001

# Map Configuration (if using maps)
NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### Tailwind Customization
Edit `tailwind.config.ts` to customize:
- Colors
- Animations
- Breakpoints
- Custom utilities

### TypeScript Configuration
The project uses strict TypeScript settings. Modify `tsconfig.json` if needed.

## 📱 Responsive Breakpoints

```css
sm:  640px   /* Small devices */
md:  768px   /* Medium devices */
lg:  1024px  /* Large devices */
xl:  1280px  /* Extra large devices */
2xl: 1536px  /* 2X large devices */
```

## 🎭 Animation System

### Framer Motion Variants
Pre-configured animation variants in components:
- **fadeIn**: Fade in animation
- **slideInRight**: Slide from right
- **slideInLeft**: Slide from left
- **slideInUp**: Slide from bottom
- **slideInDown**: Slide from top

### Custom Animations
Add to `tailwind.config.ts`:
```typescript
animation: {
  'custom-name': 'keyframeName duration timing-function',
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 Testing

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

### Build Test
```bash
npm run build
```

## 🔍 Troubleshooting

### Common Issues

**Issue: TypeScript errors after installation**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue: Tailwind styles not applying**
```bash
# Restart dev server
# Check tailwind.config.ts content paths
```

**Issue: Module not found errors**
```bash
# Check tsconfig.json paths configuration
# Ensure all imports use @ alias correctly
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 💬 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review code comments

---

Built with ❤️ for emergency responders worldwide.