# FartChamp - Gemini AI Coding Guide

> Provides Gemini and Antigravity IDE with context about the FartChamp project.

## Quick context

FartChamp is a web application for short sound clip competitions. Users upload sounds, battle 1v1, vote, comment, and compete for champion status.

**Stack**: React 19 + Vite + Vanilla CSS + localStorage (prepared for Firebase)
**Language**: English UI
**Theme**: Dark mode with neon green (#39ff14) accents

## Architecture

```
┌─────────────────────────────────────────────────┐
│  Pages (HomePage, BattlePage, UploadPage, ...)   │
├─────────────────────────────────────────────────┤
│  Components                                      │
│  ├── layout/    Navbar, Footer, Layout           │
│  ├── sound/     Card, Player, Recorder, Upload   │
│  ├── battle/    BattleArena (1v1 system)         │
│  ├── social/    LikeButton, CommentSection       │
│  └── leaderboard/ Leaderboard                    │
├─────────────────────────────────────────────────┤
│  Services (dataService.js)                       │
│  └── localStorage CRUD behind a service boundary │
├─────────────────────────────────────────────────┤
│  Utils (constants, formatters, audio)            │
├─────────────────────────────────────────────────┤
│  Styles (index.css, animations.css,              │
│          components.css, pages.css)              │
└─────────────────────────────────────────────────┘
```

## Key design decisions

1. **localStorage over Firebase**: faster development. `dataService.js` is the single data boundary, so migration replaces one module.
2. **CSS custom properties**: all design tokens in `:root`. No CSS-in-JS or Tailwind. BEM naming.
3. **Mock data seeding**: `seedMockData()` creates sample sounds, comments, and battles on first load.
4. **Demo audio mode**: `SoundPlayer` simulates playback when no audio file is attached.
5. **Language**: all UI text, variable names, and comments are in English.

## File reference

### Core files

- `src/router.jsx` - route definitions
- `src/services/dataService.js` - data operations
- `src/utils/constants.js` - categories, ranks, config
- `src/styles/index.css` - design tokens

### Key components

- `src/components/sound/SoundPlayer.jsx` - audio player with waveform and cloud effects
- `src/components/battle/BattleArena.jsx` - 1v1 matchup with voting
- `src/components/leaderboard/Leaderboard.jsx` - filtered ranking display

## Coding rules

1. Use CSS custom properties from `index.css` for all colors and spacing.
2. Follow BEM naming for CSS classes.
3. Keep UI text in English.
4. Use `useCallback` for handlers and `useMemo` for derived data.
5. Default-export all components.
6. Use `react-icons/fi` (Feather) for iconography.
7. Avoid inline styles except for dynamic values.

## Data schema

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

## Available categories

`classic`, `thunder`, `silent-deadly`, `musical`, `machine-gun`, `squeaker`, `wet`, `epic`

## Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```
