# FartChamp - Claude AI Coding Guide

> This file provides Claude Code / Claude in IDE with context about the FartChamp project.
> Place this file in your project root or `.claude/` directory.

## Project Overview

**FartChamp** (💨🏆) is a fart sound competition platform where users can:
- Upload or record fart sounds via browser microphone
- Compete in 1v1 "Battle Arena" matchups
- Vote, like, and comment on sounds
- Climb the leaderboard to become champion

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + Vite |
| **Styling** | Vanilla CSS with custom design tokens |
| **Routing** | React Router v7 |
| **Audio** | Web Audio API + HTML5 Audio |
| **Icons** | react-icons (Feather icons) |
| **Animations** | CSS animations + Framer Motion |
| **Data** | localStorage (mock) — designed for Firebase migration |
| **Build** | Vite |

## Project Structure

```
src/
├── components/         # Reusable React components
│   ├── layout/         # Navbar, Footer, Layout wrapper
│   ├── sound/          # SoundCard, SoundPlayer, SoundRecorder, SoundUploader
│   ├── battle/         # BattleArena (1v1 matchup system)
│   ├── social/         # LikeButton, CommentSection
│   └── leaderboard/    # Leaderboard, ChampionBadge
├── pages/              # Route-level page components
│   ├── HomePage.jsx    # Landing page with hero, featured sounds
│   ├── BattlePage.jsx  # 1v1 battle arena
│   ├── UploadPage.jsx  # Upload/record sounds
│   └── LeaderboardPage.jsx # Rankings and podium
├── services/           # Data/business logic
│   └── dataService.js  # localStorage CRUD (Firebase-ready interface)
├── utils/              # Pure utility functions
│   ├── constants.js    # App-wide constants, categories, ranks
│   ├── formatters.js   # Number, date, rank formatting
│   └── audio.js        # Audio recording, validation, waveform
├── styles/             # CSS organized by concern
│   ├── index.css       # Design tokens, reset, global utilities
│   ├── animations.css  # Keyframe animations (fart clouds, waveforms)
│   ├── components.css  # Component-specific styles
│   └── pages.css       # Page-level layout styles
├── App.jsx             # Root component
├── main.jsx            # Entry point
└── router.jsx          # Route configuration
```

## Code Conventions

### Component Pattern
- **Functional components only** with hooks
- **One component per file**, named export default
- **Props destructuring** in function signature
- **useCallback** for event handlers passed to children
- **useMemo** for expensive computations

### CSS Naming (BEM-like)
```
.component-name              → Block
.component-name__element     → Element
.component-name--modifier    → Modifier
```

### Design Tokens
All colors, spacing, typography defined in CSS custom properties in `src/styles/index.css`.
Use `var(--token-name)` instead of hardcoded values.

Key tokens:
- `--color-toxic-green: #39ff14` — Primary accent
- `--color-gas-yellow: #ffd700` — Secondary accent
- `--color-purple-haze: #9b59b6` — Tertiary accent
- `--color-bg-primary: #050508` — Background
- `--color-bg-card: rgba(20, 20, 35, 0.7)` — Card backgrounds

### Data Layer
The `dataService.js` uses localStorage but exposes a clean async-ready API:
- `getAllSounds()`, `createSound()`, `getSoundById()`
- `toggleLike()`, `voteBattle()`, `addComment()`
- `getLeaderboard(filter)` — 'all-time' | 'weekly' | 'monthly'

To migrate to Firebase, replace the internal implementations while keeping the same function signatures.

## Adding New Features

### Add a new page:
1. Create `src/pages/NewPage.jsx`
2. Add route in `src/router.jsx`
3. Add nav link in `src/components/layout/Navbar.jsx`
4. Add page styles in `src/styles/pages.css`

### Add a new component:
1. Create in appropriate `src/components/[category]/`
2. Add component styles in `src/styles/components.css`
3. Follow BEM naming convention

### Add new sound category:
1. Add to `CATEGORIES` array in `src/utils/constants.js`

## Testing

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Important Notes
- The app uses Thai language (ภาษาไทย) for UI text
- Mock data is automatically seeded on first load via `seedMockData()`
- Audio playback works in demo mode even without actual audio files
- All animations are CSS-based for performance
