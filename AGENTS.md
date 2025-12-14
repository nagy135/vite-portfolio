# Agent Guidelines

## Build & Development

- **Dev server**: `npm run dev` (Vite)
- **Build**: `npm run build` (runs `tsc -b && vite build`)
- **Lint**: `npm run lint` (ESLint)
- **No tests**: This project has no test suite

## Code Style

### Imports
- Use path alias `@/` for imports: `import { cn } from "@/lib/utils"`
- Group: external libraries first, then aliased imports
- Use named imports; avoid default imports except for components

### Formatting & Types
- **TypeScript**: Required for all `.tsx`/`.ts` files; strict mode
- **Spacing**: 2 spaces indentation
- **JSX**: Use functional components with TypeScript generics (`React.forwardRef<>()`)
- **CSS**: Tailwind (Tailwind v4 + PostCSS); use `cn()` utility to merge classNames

### Naming & Structure
- **Components**: PascalCase (e.g., `Resume.tsx`, `Button.tsx`)
- **Utilities/Data**: camelCase (e.g., `experienceData.ts`, `utils.ts`)
- **Props Interfaces**: Named `{ComponentName}Props` (e.g., `ButtonProps`)

### React & Components
- Use hooks over class components
- Export components with display name: `Button.displayName = "Button"`
- Use Radix UI for accessible primitives (dropdown, tooltip, separator, slot)
- UI components use CVA (class-variance-authority) for variants

### Error Handling
- No explicit try-catch; rely on React error boundaries and component-level graceful degradation
- Use optional chaining (`?.`) and nullish coalescing (`??`)

## ESLint Rules
- Enforces React Hooks best practices (dependencies, rules of hooks)
- Enforces React Refresh for Fast Refresh compatibility
- No console logs in production code (only for debugging)
