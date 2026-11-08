# FartChamp

A web application where users upload short audio clips, compete in head-to-head battles, vote on entries, and climb a leaderboard.

## Features

- Upload an audio file or record from the browser microphone.
- Compete in 1v1 battles and vote for the better sound.
- Like and comment on submissions.
- Track rankings across all-time, weekly, and monthly periods.
- Progress through a rank system based on score.
- Dark interface built on CSS design tokens.

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19 + Vite |
| Styling | Vanilla CSS with design tokens |
| Routing | React Router v7 |
| Audio | Web Audio API, HTML5 Audio |
| Data | localStorage behind a service layer, prepared for Firebase |
| Icons | react-icons |
| Build | Vite |

## Getting started

```bash
git clone https://github.com/kengkrup/fartchamp.git
cd fartchamp
npm install
npm run dev
```

The dev server runs at http://localhost:5173.

## Deployment

The app targets Vercel. `vercel.json` rewrites all paths to `index.html` so client-side routes resolve on refresh.

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

## Project structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer, Layout
│   ├── sound/           # Sound card, player, recorder, uploader
│   ├── battle/          # Battle arena
│   ├── social/          # Like button, comments
│   └── leaderboard/     # Ranking components
├── pages/               # Route-level pages
├── services/            # Data layer
├── utils/               # Utility functions
└── styles/              # CSS design system
```

## How it works

1. Upload or record a sound.
2. Add a title and select a category.
3. Open the battle arena.
4. Vote and comment on entries.
5. Climb the leaderboard.

## Scoring

```
Score = (likes × 2) + (wins × 5) + plays
```

## Ranks

| Score | Rank |
| ---: | --- |
| 0+ | Beginner Blaster |
| 10+ | Gas Cadet |
| 50+ | Wind Warrior |
| 100+ | Thunder Cheeks |
| 250+ | Gas Giant |
| 500+ | Fart Lord |
| 1000+ | The Supreme Cheek Clapper |

## AI coding guides

Project context is available for coding assistants:

| Tool | Guide |
| --- | --- |
| Claude Code | `docs/claude.md` |
| Gemini / Antigravity | `docs/gemini.md` |
| OpenAI Codex | `docs/codex.md` |
| Architecture | `docs/ARCHITECTURE.md` |

## Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md).

## License

MIT
