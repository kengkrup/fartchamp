# FartChamp Architecture

## System Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Browser (Client)                       │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │  React App  │  │  CSS Styles  │  │  Web Audio   │    │
│  │  (Vite)     │  │  (Tokens)    │  │  API         │    │
│  └──────┬──────┘  └──────────────┘  └──────┬───────┘    │
│         │                                   │            │
│  ┌──────┴──────────────────────────────────┴───────┐    │
│  │              React Router v7                     │    │
│  │  / → HomePage                                    │    │
│  │  /battle → BattlePage                            │    │
│  │  /upload → UploadPage                            │    │
│  │  /leaderboard → LeaderboardPage                  │    │
│  └──────┬───────────────────────────────────────────┘    │
│         │                                                │
│  ┌──────┴───────────────────────────────────────────┐    │
│  │              Data Service Layer                   │    │
│  │  dataService.js                                   │    │
│  │  ├── Sound CRUD                                   │    │
│  │  ├── Battle System                                │    │
│  │  ├── Vote/Like System                             │    │
│  │  ├── Comment System                               │    │
│  │  └── Leaderboard Engine                           │    │
│  └──────┬───────────────────────────────────────────┘    │
│         │                                                │
│  ┌──────┴───────────────────────────────────────────┐    │
│  │              Storage Layer                        │    │
│  │  localStorage (current)                           │    │
│  │  → Firebase Firestore + Storage (production)      │    │
│  └──────────────────────────────────────────────────┘    │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
└── RouterProvider
    └── Layout
        ├── Navbar
        ├── <Page> (via Outlet)
        │   ├── HomePage
        │   │   ├── Hero Section
        │   │   ├── SoundCard[] (Top Weekly)
        │   │   └── SoundCard[] (Latest)
        │   │       ├── SoundPlayer
        │   │       ├── LikeButton
        │   │       └── CommentSection
        │   │
        │   ├── BattlePage
        │   │   └── BattleArena
        │   │       ├── SoundPlayer (×2)
        │   │       └── VoteButton (×2)
        │   │
        │   ├── UploadPage
        │   │   ├── SoundUploader (file drag-drop)
        │   │   └── SoundRecorder (mic recording)
        │   │
        │   └── LeaderboardPage
        │       ├── Podium (top 3)
        │       └── Leaderboard (full list)
        │
        └── Footer
```

## Data Flow

### Sound Upload Flow
```
User → SoundUploader/SoundRecorder
  → validates file (audio.js)
  → creates Sound object
  → dataService.createSound()
  → saves to localStorage
  → redirects to HomePage
```

### Battle Flow
```
BattlePage → BattleArena
  → getActiveBattles() or createRandomBattle()
  → displays two sounds side-by-side
  → user clicks VoteButton
  → voteBattle(battleId, soundId)
  → updates battle votes in localStorage
  → shows percentage results
  → "Next Battle" → increment battleIndex
```

### Leaderboard Scoring
```
Score = (likes × 2) + (wins × 5) + plays

getLeaderboard(filter):
  1. Get all sounds
  2. Filter by time period (weekly/monthly/all-time)
  3. Calculate score for each
  4. Sort by score descending
  5. Return top N
```

## Firebase Migration Path

The `dataService.js` is designed as an abstraction layer. To migrate:

1. Replace `localStorage.getItem/setItem` with Firestore queries
2. Replace `URL.createObjectURL` with Firebase Storage upload URLs
3. Add Firebase Auth for user identity
4. Keep the same function signatures

```diff
- function getAllSounds() {
-   return JSON.parse(localStorage.getItem('fartchamp_sounds')) || [];
- }
+ async function getAllSounds() {
+   const snapshot = await getDocs(collection(db, 'sounds'));
+   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
+ }
```
