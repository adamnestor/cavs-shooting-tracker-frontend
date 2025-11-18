# Cavs Shooting Tracker - Frontend

A React-based web application for tracking three-point shooting test results for Cleveland Cavaliers players.

## 1. Live Demo

**[View Live Application](https://cavs-shooting-tracker-frontend.vercel.app)**

## 2. Project Overview

The Cavs Shooting Tracker allows coaches to:
- Track shooting tests in real-time during practice
- Record player performance across standard and zone-based tests
- View historical results with trends, duration, and pace metrics
- Manage player roster

Built as a full-stack application with a focus on simplicity and coach-friendly design.

## 3. Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Icons:** Lucide React
- **HTTP Client:** Fetch API
- **Deployment:** Vercel

## 4. Features

### Phase 1: Core Functionality
- Real-time shot tracking with Made/Miss buttons
- Live statistics display (shots, made, percentage)
- Save test results to database
- View past test results

### Phase 2: Player Management
- Add, edit, and archive players
- Player selection before tests
- Filter results by player
- Jersey number and position tracking

### Phase 3: Performance Metrics
- Duration tracking (test start to finish)
- Pace calculation (shots per minute)
- Trend indicators (↑ up, → stable, ↓ down)
- Comparison to last 3 tests

### Phase 4: Zone Tracking
- Two test modes: Standard (100 shots) and Zone Test (5 zones × 20 shots)
- Court visualization with zone selection
- Zone-specific statistics
- Expandable zone breakdown in results

## 5. Local Setup

### Prerequisites
- Node.js 18+ and npm
- Backend API running [(see backend repo)](https://github.com/adamnestor/cavs-shooting-tracker-backend)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/[your-username]/cavs-shooting-tracker-frontend.git
   cd cavs-shooting-tracker-frontend
```

2. **Install dependencies**
```bash
   npm install
```

3. **Configure environment**
   
   The app connects to the backend API. If running locally, ensure your backend is running on `http://localhost:3000`.
   
   If your backend is at a different URL, update API calls in the component files.

4. **Run development server**
```bash
   npm run dev
```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for production**
```bash
   npm run build
```

## 6. Project Structure
```
src/
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── StatDisplay.tsx
│   │   ├── PlayerRow.tsx
│   │   ├── TestResultRow.tsx
│   │   └── modals/
│   └── pages/           # Page components
│       ├── LandingPage.tsx
│       ├── TestPage.tsx
│       ├── ZoneTestPage.tsx
│       └── ResultsPage.tsx
├── types/               # TypeScript type definitions
│   ├── Player.ts
│   ├── Test.ts
│   └── ZoneStat.ts
├── utils/               # Helper functions
│   └── testCalculations.ts
├── App.tsx              # Root component with routing
└── main.tsx             # Application entry point
```

## 7. Design Decisions

### Color Scheme
- **Wine (#860038):** Primary brand color, headlines, player names
- **Navy (#041e42):** Secondary color, buttons, headers
- **Gold (#fdbb30):** Accent color, active states, borders

### UX Principles
- **Large touch targets:** Optimized for iPad use during practice
- **Minimal data entry:** Quick player selection, simple Made/Miss buttons
- **Clear visual hierarchy:** Important stats prominent, secondary info subtle
- **Instant feedback:** Real-time stat updates, visual state changes

### State Management
- React useState for local component state
- Props drilling for simple data flow
- No external state management needed for app scope

## 8. Related Repositories

- **Backend API:** [cavs-shooting-tracker-backend](https://github.com/adamnestor/cavs-shooting-tracker-backend)

## 9. Author

**Adam Nestor**  
Created for Cleveland Cavaliers Full-Stack Developer Interview
