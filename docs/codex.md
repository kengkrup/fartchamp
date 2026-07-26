# FartChamp - Codex / OpenAI Coding Guide

> AGENTS.md-style instructions for OpenAI Codex, ChatGPT, Cursor, and Windsurf.

## Identity

You are working on **FartChamp**, a fart sound competition platform. The app is built with React 19 + Vite + Vanilla CSS. Data is stored in localStorage (designed for Firebase migration).

## Rules

- The UI language is **Thai (ภาษาไทย)**. All user-facing text must be in Thai.
- Code comments and variable names are in **English**.
- Use **CSS custom properties** from `src/styles/index.css`. Never hardcode colors or spacing.
- Follow **BEM naming** for CSS: `.block__element--modifier`
- Use **functional React components** with hooks only.
- Use **react-icons/fi** (Feather Icons) for all icons.
- Data operations go through `src/services/dataService.js`.
- Audio features use `src/utils/audio.js` utilities.

## Project Map

```
src/
├── components/
│   ├── layout/        # Navbar, Footer, Layout (shared shell)
│   ├── sound/         # SoundCard, SoundPlayer, SoundRecorder, SoundUploader
│   ├── battle/        # BattleArena (1v1 voting system)
│   ├── social/        # LikeButton, CommentSection
│   └── leaderboard/   # Leaderboard ranking with filters
├── pages/
│   ├── HomePage.jsx          # Hero + featured sounds + latest sounds
│   ├── BattlePage.jsx        # Battle arena wrapper
│   ├── UploadPage.jsx        # Upload/record interface
│   └── LeaderboardPage.jsx   # Podium + full leaderboard
├── services/
│   └── dataService.js        # localStorage CRUD (Firebase-ready API)
├── utils/
│   ├── constants.js          # Categories, ranks, config
│   ├── formatters.js         # Number/date/rank formatting
│   └── audio.js              # Audio recording/validation
├── styles/
│   ├── index.css             # Design tokens + reset + utilities
│   ├── animations.css        # Keyframe animations
│   ├── components.css        # Component styles
│   └── pages.css             # Page-level styles
├── App.jsx                   # Root component
├── main.jsx                  # Entry point
└── router.jsx                # Routes
```

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--color-toxic-green` | `#39ff14` | Primary accent, buttons, links |
| `--color-gas-yellow` | `#ffd700` | Champion/gold elements |
| `--color-purple-haze` | `#9b59b6` | Secondary accent |
| `--color-bg-primary` | `#050508` | Page background |
| `--color-bg-card` | `rgba(20,20,35,0.7)` | Card backgrounds |
| `--font-display` | Outfit | Headings |
| `--font-body` | Noto Sans Thai, Outfit | Body text |

## Key Patterns

### Adding a new feature
1. Component → `src/components/[category]/NewComponent.jsx`
2. Style → Add to `src/styles/components.css`
3. If it's a page → `src/pages/`, add route in `router.jsx`, add nav link in `Navbar.jsx`
4. Data → Add functions to `dataService.js`

### Data Service API
```js
// Sounds
getAllSounds()          → Sound[]
createSound(data)      → Sound
getSoundById(id)       → Sound | null

// Social
toggleLike(soundId)    → boolean (liked state)
addComment(soundId, text) → Comment
getComments(soundId)   → Comment[]

// Battles
createRandomBattle()   → Battle | null
voteBattle(battleId, soundId) → boolean

// Leaderboard
getLeaderboard(filter) → Sound[] (with score)
// filter: 'all-time' | 'weekly' | 'monthly'
```

## Do NOT

- Don't use Tailwind CSS
- Don't use CSS-in-JS (styled-components, emotion)
- Don't create class components
- Don't hardcode colors — use CSS variables
- Don't modify the data service API signatures (they're designed for Firebase migration)
