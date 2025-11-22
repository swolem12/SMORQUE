# SMORQUE AI Coding Agent Instructions

## Project Overview
SMORQUE is a USAF Torque Dashboard - an AI sortie analytics production tool. It's a React 19 + TypeScript + Vite SPA that displays real-time sortie analytics, mission planning, aircraft fleet management, maintenance tracking, and **aircraft scheduling** with data visualizations.

**Deployed at:** https://swolem12.github.io/SMORQUE/

## Architecture & Data Flow

### Component Hierarchy
- **Layout System**: `Layout` wraps all pages, composed of `Header` (top nav with alerts, logo: "~~TORQUE~~ SMORQUE") + `Sidebar` (left nav) + `main-content` (page outlet)
- **Page Components**: `Dashboard`, `Missions`, `Schedule` (with `Checkerboard` + `ImportTool` + optimization/statistics/approval panels), and **fully populated pages** (`Sorties`, `Aircraft`, `Maintenance`, `Crew`, `Analytics`, `Reports`) in `src/components/dashboard/PlaceholderPages.tsx`
- **Shared Components**: `Card` (generic container), `StatCard` (metrics with trends/icons), `SortieChart`/`ReadinessChart` (Recharts wrappers)
- **Data Source**: All data comes from `src/data/mockData.ts` - centralized mock data exports (no backend/API calls). Includes 5 sorties, 5 aircraft, 2 missions, 10 crew members, schedule events. Schedule data managed via `src/services/scheduleService.ts` (in-memory service, can be replaced with API)
- **Routing**: React Router v7 with `basename="/SMORQUE"` for GitHub Pages deployment

### Type System
All domain types live in `src/types/index.ts`: `Sortie`, `Aircraft`, `Mission`, `CrewMember` (with `qualifications[]` and `availability`), `Alert`, `AnalyticsData`, `ChartDataPoint`, **`ScheduleEvent`, `ImportedReport`, `OptimizationSettings`**. Status fields use string literal unions (`SortieStatus`, `AircraftStatus`, `MissionStatus`).

## Development Workflows

### Commands
- **Dev**: `npm run dev` (starts Vite dev server)
- **Build**: `npm run build` (TypeScript check + Vite build to `dist/`)
- **Lint**: `npm run lint` (ESLint with TypeScript + React hooks)
- **Preview**: `npm run preview` (test production build locally)
- **Test**: `npm test` (runs vitest unit tests) or `npm run test:watch` (watch mode)

### Deployment
Auto-deploys to GitHub Pages on push to `main` via `.github/workflows/deploy.yml`. First-time setup requires enabling "GitHub Actions" as Pages source in repo Settings → Pages. Vite config sets `base: '/SMORQUE/'` for proper asset paths.

## Code Conventions

### Component Patterns
1. **Named exports**: Use `export const ComponentName = () => {...}` (not default exports except `App.tsx`)
2. **Props interfaces**: Define inline above component: `interface ComponentProps { ... }`
3. **CSS modules**: Each component has co-located `.css` file with same name (e.g., `Dashboard.tsx` + `Dashboard.css`)
4. **Lucide icons**: Import specific icons from `lucide-react` (e.g., `import { Plane, Activity } from 'lucide-react'`)

### Styling System
- **Dark theme**: Background `#0a0e1a`, uses CSS custom properties in `:root`
- **Color semantics**: Status colors via functions like `getStatusColor()` / `getAircraftStatusColor()` mapping status strings to `'success' | 'info' | 'warning' | 'error'`
- **Layout**: Flexbox-based with `.layout` (flex column), `.layout-body` (flex row), `.main-content` (flex 1)
- **Responsive grids**: `.metrics-grid`, `.charts-grid`, `.tables-grid` use CSS Grid for card layouts

### Data Handling
- **Mock data first**: Import from `src/data/mockData.ts` (exports `sorties`, `aircraft`, `missions`, `alerts`, `analyticsData`, `scheduleEvents`, chart data arrays)
- **Schedule service**: Use `scheduleService` from `src/services/scheduleService.ts` for CRUD operations on schedule events
- **Date handling**: Mock data uses `new Date()` constructors - render with `.toLocaleString()` or `.toLocaleDateString()`
- **State management**: Local component state with `useState` (schedule uses service layer for persistence abstraction)

## Integration Points

### Router Configuration
`<Router basename="/SMORQUE">` in `App.tsx` is critical for GitHub Pages. Routes:
- `/` → Dashboard
- `/schedule` → Schedule (weekly/monthly checkerboard)
- `/schedule/import` → Import Tool
- `/missions` → Missions
- `/sorties`, `/aircraft`, `/maintenance`, `/crew`, `/analytics`, `/reports` → Placeholder pages

### Chart Library (Recharts)
- Wraps Recharts in custom components (`SortieChart`, `ReadinessChart`)
- Data format: `Array<{ date: string, value: number, ... }>`
- Responsive container: Use `<ResponsiveContainer width="100%" height={300}>`

### Icon System (Lucide React)
Icons take `size` prop (default 20-24px). Pass to `StatCard` via `icon` prop. Common icons: `Plane`, `Activity`, `Wrench`, `AlertCircle`, `CheckCircle`, `TrendingUp`, `TrendingDown`, `CalendarCheck`.

### Schedule Features
- **Weekly checkerboard**: Drag-drop events between days, inline editing of title/start/end times
- **Import Tool**: Parse CSV/XLSX files (using `papaparse` and `xlsx` libraries) into `ScheduleEvent`s. Supports report types: mmPairs, PRA, G081, GTIMS, PEX, TMS
- **Navigation**: Week prev/next/today controls, weekly/monthly view toggle
- **Service layer**: `scheduleService` provides `getEvents()`, `addEvent()`, `updateEvent()`, `deleteEvent()`, `getEventsInRange()`

## Key Files to Reference

- **Type definitions**: `src/types/index.ts` - start here for domain model
- **Mock data**: `src/data/mockData.ts` - all data structures and examples
- **Schedule service**: `src/services/scheduleService.ts` - in-memory persistence (can be replaced with API)
- **Main layout**: `src/components/layout/Layout.tsx` - page structure
- **Dashboard example**: `src/components/dashboard/Dashboard.tsx` - complex page with metrics, charts, tables
- **Schedule example**: `src/components/schedule/Schedule.tsx` - checkerboard UI with week navigation
- **Missions example**: `src/components/missions/Missions.tsx` - card-based layout
- **Reusable components**: `src/components/common/Card.tsx`, `StatCard.tsx` - extend these patterns

## Common Tasks

### Adding a new page
1. Create component in `src/components/<section>/<PageName>.tsx` with co-located CSS
2. Add route in `App.tsx` `<Routes>` block
3. Import mock data from `mockData.ts` or add new exports there
4. Use `Card` components for layout consistency
5. Add nav item to `Sidebar.tsx` with icon

### Adding new data types
1. Define type/interface in `src/types/index.ts`
2. Add mock data to `src/data/mockData.ts` with realistic USAF naming (tail numbers, mission codes)
3. Import in consuming component

### Styling components
- Use class names like `.component-name`, `.component-name-element`
- Color variables: `--color-primary`, `--color-success`, `--color-warning`, `--color-error`, `--color-info`
- Spacing: consistent `1rem`, `1.5rem`, `2rem` for margins/padding
- Cards: use existing `.card` styles or extend via `className` prop

### Testing
- Unit tests in `src/test/` using Vitest + Testing Library
- Run `npm test` or `npm run test:watch`
- Test services, components, and key user interactions
- Setup in `src/test/setup.ts` with `@testing-library/jest-dom`
