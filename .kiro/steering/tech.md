# Technology Stack

## Core Technologies
- **React 18** - UI framework with hooks and modern patterns
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework

## UI Framework
- **shadcn/ui** - High-quality React components built on Radix UI
  - Style: "new-york" variant
  - Base color: neutral
  - CSS variables enabled for theming
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Icon library

## Key Libraries
- **React Hook Form** + **Zod** - Form handling and validation
- **next-themes** - Theme management (dark/light mode)
- **date-fns** - Date manipulation utilities
- **class-variance-authority** - Component variant management
- **tailwind-merge** + **clsx** - Conditional CSS class handling

## Development Tools
- **ESLint** - Code linting with React-specific rules
- **PostCSS** + **Autoprefixer** - CSS processing
- **TypeScript ESLint** - TypeScript-specific linting

## Common Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production (TypeScript check + Vite build)
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Path Aliases
- `@/*` maps to `./src/*` for clean imports
- Components: `@/components`
- UI Components: `@/components/ui`
- Utilities: `@/lib`
- Hooks: `@/hooks`

## Build Configuration
- **Vite** with React plugin
- TypeScript compilation before build
- Path resolution with `@` alias
- Lucide React excluded from optimization for better performance