# FartChamp - Gemini AI Coding Guide

> This file provides Gemini / Antigravity IDE with context about the FartChamp project.
> Compatible with Gemini, Antigravity, and Google AI tools.

## Quick Context

**FartChamp** is a humorous web app for fart sound competitions. Users upload sounds, battle 1v1, vote, comment, and compete for champion status.

**Stack**: React 19 + Vite + Vanilla CSS + localStorage (Firebase-ready)
**Language**: Thai (ภาษาไทย) UI
**Theme**: Dark mode with toxic green neon (#39ff14) accents

## Architecture

```
┌─────────────────────────────────────────────────┐
│  Pages (HomePage, BattlePage, UploadPage, etc.) │
├─────────────────────────────────────────────────┤
│  Components                                      │
│  ├── layout/    → Navbar, Footer, Layout         │
│  ├── sound/     → Card, Player, Recorder, Upload │
│  ├── battle/    → BattleArena (1v1 system)       │
│  ├── social/    → LikeButton, CommentSection     │
│  └── leaderboard/ → Leaderboard, ChampionBadge  │
├─────────────────────────────────────────────────┤
│  Services (dataService.js)                       │
│  └── localStorage CRUD with Firebase-ready API   │
├─────────────────────────────────────────────────┤
│  Utils (constants, formatters, audio)            │
├─────────────────────────────────────────────────┤
│  Styles (index.css, animations.css,              │
│          components.css, pages.css)               │
└─────────────────────────────────────────────────┘
```

## Key Design Decisions

1. **localStorage over Firebase**: For instant dev experience. `dataService.js` has a clean API that maps 1:1 to Firestore operations. Migration is a drop-in replacement.

2. **CSS Custom Properties**: All design tokens in `:root`. No CSS-in-JS or Tailwind. BEM naming.

3. **Mock Data Seeding**: `seedMockData()` auto-creates 12 sample sounds with Thai descriptions, comments, and battles on first load.

4. **Demo Audio Mode**: `SoundPlayer` works without actual audio files — simulates playback with timer and animations.

5. **Thai Language**: All UI text is in Thai. Variable names and code comments in English.

## File Reference

### Core Files
- `src/router.jsx` — All routes defined here
- `src/services/dataService.js` — All data operations (sounds, battles, votes, comments)
- `src/utils/constants.js` — Categories, ranks, config values
- `src/styles/index.css` — Design system tokens

### Key Components
- `src/components/sound/SoundPlayer.jsx` — Audio player with waveform + fart cloud effects
- `src/components/battle/BattleArena.jsx` — 1v1 matchup with voting
- `src/components/leaderboard/Leaderboard.jsx` — Filtered ranking display

## Coding Rules

When modifying this project:

1. **Use CSS custom properties** from `index.css` for all colors/spacing
2. **Follow BEM naming** for CSS classes
3. **Keep Thai text** for user-facing strings
4. **Use `useCallback`** for handlers, `useMemo` for derived data
5. **Export default** for all components
6. **Use react-icons/fi** (Feather icons) for iconography
7. **No inline styles** except for dynamic values (calculated positions, etc.)

## Data Schema

```javascript
// Sound
{
  id, title, description, category,
  audioUrl, audioDuration,
  userId, userName,
  likes, plays, wins, losses,
  createdAt
}

// Battle  
{
  id, sound1Id, sound2Id,
  sound1Votes, sound2Votes,
  winnerId, status, createdAt, endsAt
}

// Comment
{
  id, soundId, text,
  userId, userName, likes,
  createdAt
}
```

## Available Categories
`classic`, `thunder`, `silent-deadly`, `musical`, `machine-gun`, `squeaker`, `wet`, `epic`

## Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```
