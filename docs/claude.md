# FartChamp - Claude AI Coding Guide

> Provides Claude Code and IDE assistants with context about the FartChamp project.

## Project overview

FartChamp is a web application for short sound clip competitions. Users upload or record audio, compete in 1v1 battles, vote, comment, and climb a leaderboard.

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19 + Vite |
| Styling | Vanilla CSS with design tokens |
| Routing | React Router v7 |
| Audio | Web Audio API, HTML5 Audio |
| Icons | react-icons (Feather) |
| Data | localStorage behind `dataService.js`, prepared for Firebase |
| Build | Vite |

## Project structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer, Layout wrapper
│   ├── sound/           # SoundCard, SoundPlayer, SoundRecorder, SoundUploader
│   ├── battle/          # BattleArena (1v1 matchup system)
│   ├── social/          # LikeButton, CommentSection
│   └── leaderboard/     # Leaderboard
├── pages/               # Route-level page components
│   ├── HomePage.jsx     # Hero, featured and latest sounds
│   ├── BattlePage.jsx   # 1v1 battle arena
│   ├── UploadPage.jsx   # Upload and record interface
│   └── LeaderboardPage.jsx # Podium and full rankings
├── services/
│   └── dataService.js   # localStorage CRUD behind a service boundary
├── utils/
│   ├── constants.js     # Categories, ranks, config values
│   ├── formatters.js    # Number, date, rank formatting
│   └── audio.js         # Recording, validation, waveform
├── styles/
│   ├── index.css        # Design tokens, reset, utilities
│   ├── animations.css   # Keyframe animations
│   ├── components.css   # Component styles
│   └── pages.css        # Page-level styles
├── App.jsx              # Root component
├── main.jsx             # Entry point
└── router.jsx           # Route configuration
```

## Code conventions

### Components

- Functional components with hooks only.
- One component per file, default export.
- Destructure props in the function signature.
- `useCallback` for handlers passed to children.
- `useMemo` for derived data.

### CSS

BEM-like naming:

```
.component-name              # Block
.component-name__element     # Element
.component-name--modifier    # Modifier
```

All colors, spacing, and typography come from CSS custom properties in `src/styles/index.css`. Use `var(--token-name)` rather than hardcoded values.

Key tokens:

- `--color-toxic-green: #39ff14` - primary accent
- `--color-gas-yellow: #ffd700` - secondary accent
- `--color-purple-haze: #9b59b6` - tertiary accent
- `--color-bg-primary: #050508` - background
- `--color-bg-card: rgba(20, 20, 35, 0.7)` - card backgrounds

### Data layer

`dataService.js` is synchronous and stores data in localStorage. It is the single boundary for data access and exposes:

- `getAllSounds()`, `createSound()`, `getSoundById()`
- `toggleLike()`, `voteBattle()`, `addComment()`
- `getLeaderboard(filter)` - `all-time`, `weekly`, or `monthly`

Firebase migration replaces the internals of this module. Firestore calls are asynchronous, so callers must be updated to await them; the current signatures are synchronous.

## Adding features

### New page

1. Create `src/pages/NewPage.jsx`.
2. Add the route in `src/router.jsx`.
3. Add a navigation link in `src/components/layout/Navbar.jsx`.
4. Add page styles in `src/styles/pages.css`.

### New component

1. Create it under the relevant `src/components/` subfolder.
2. Add styles in `src/styles/components.css`.
3. Follow the BEM naming convention.

### New sound category

1. Add an entry to `CATEGORIES` in `src/utils/constants.js`.

## Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

## Notes

- UI text is in English.
- `seedMockData()` populates sample data on first load.
- `SoundPlayer` simulates playback when a sound has no audio file.
- Animations are CSS-based.
