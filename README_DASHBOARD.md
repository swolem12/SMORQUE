# TORQUE Dashboard

**SMORQUE** - An AI sortie analytic production tool

This is a recreation of the USAF Torque dashboard UI, developed by Kessel Run for sortie analytics and mission planning.

## Features

### Core Components
- **Mission Dashboard** - Real-time sortie analytics and operational status
- **Mission Planning** - Operational mission management and coordination
- **Sortie Management** - Detailed sortie scheduling and tracking
- **Aircraft Fleet** - Aircraft inventory and status monitoring
- **Maintenance Operations** - Scheduled and unscheduled maintenance tracking
- **Crew Management** - Personnel assignments and qualifications
- **Analytics** - In-depth performance metrics and trends
- **Reports** - Generate and view operational reports

### Key Capabilities
- Real-time status monitoring
- Interactive data visualizations (sortie trends, readiness charts)
- Modular, reusable component architecture
- Responsive design for various screen sizes
- Alert and notification system
- Status boards with color-coded indicators
- Mission planning workspace
- Resource allocation tracking

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Icons**: Lucide React
- **Styling**: CSS Modules

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Development

The application will be available at `http://localhost:5173` when running the dev server.

## Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Header, Sidebar, Layout)
│   ├── dashboard/       # Dashboard and placeholder pages
│   ├── missions/        # Mission planning components
│   ├── charts/          # Chart components
│   └── common/          # Reusable common components (Card, StatCard)
├── data/
│   └── mockData.ts      # Placeholder data for development
├── types/
│   └── index.ts         # TypeScript type definitions
└── utils/               # Utility functions
```

## Key Features Implemented

### Dashboard
- Key metrics cards (Sortie Rate, Mission Readiness, Aircraft Availability, Maintenance Backlog)
- Sortie trends chart (7-day view)
- Aircraft readiness chart (7-day view)
- Active sorties table
- Aircraft status table
- System alerts panel

### Mission Planning
- Mission cards with status and priority badges
- Mission objectives and details
- Crew and aircraft assignments
- Location tracking
- Mission actions (View, Edit)

### Navigation
- Persistent sidebar with active state
- Sticky header with status indicator
- Alert notifications badge
- User profile access

### Styling
- Dark theme optimized for operational environments
- Military-inspired color scheme
- Glass-morphism effects
- Smooth transitions and hover states
- Responsive grid layouts

## Data Model

The application uses placeholder data that simulates:
- Sorties (mission flights)
- Aircraft (fleet inventory)
- Missions (operational objectives)
- Crew members (personnel)
- Alerts (system notifications)
- Analytics (performance metrics)

## Future Enhancements

- Backend integration for real-time data
- User authentication and authorization
- Advanced mission planning with drag-and-drop
- Interactive mission maps
- Advanced filtering and search
- Export capabilities for reports
- WebSocket support for live updates
- Mobile responsive optimizations

## Credits

Inspired by the USAF Torque platform developed by Kessel Run for the United States Air Force.

## License

This is a demonstration project for educational purposes.
