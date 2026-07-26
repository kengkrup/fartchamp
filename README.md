# FartChamp 💨🏆

> แพลตฟอร์มแข่งขันเสียงตดที่ยิ่งใหญ่ที่สุดในจักรวาล!

[![Deploy](https://img.shields.io/badge/deploy-ready-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()
[![Vibe Coded](https://img.shields.io/badge/vibe-coded%20💨-purple)]()

## 🌟 Features

- 🎙️ **อัปโหลด / อัดเสียง** — อัปโหลดไฟล์เสียงหรืออัดจากไมค์โฟนในเว็บ
- ⚔️ **Battle Arena** — แข่ง 1v1 แล้วโหวตให้เสียงที่ชอบ
- 💨 **ไลค์ & คอมเมนต์** — กดถูกใจและแสดงความคิดเห็นได้
- 🏆 **Leaderboard** — อันดับ all-time, weekly, monthly
- 👑 **Champion System** — ระบบแชมป์พร้อม rank ตั้งแต่ "Beginner Blaster" ถึง "The Supreme Cheek Clapper"
- 🎨 **Dark Mode UI** — ธีมสวยงามพร้อม neon accents และ glassmorphism

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/your-username/fartchamp.git
cd fartchamp

# Install dependencies
npm install

# Start dev server
npm run dev
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:5173` 🎉

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite |
| Styling | Vanilla CSS + Custom Design Tokens |
| Routing | React Router v7 |
| Audio | Web Audio API |
| Data | localStorage (Firebase-ready) |
| Icons | react-icons |
| Animations | CSS + Framer Motion |

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/          # Navbar, Footer, Layout
│   ├── sound/           # Sound card, player, recorder, uploader
│   ├── battle/          # Battle arena system
│   ├── social/          # Like button, comments
│   └── leaderboard/     # Ranking components
├── pages/               # Route-level pages
├── services/            # Data layer (localStorage / Firebase)
├── utils/               # Utility functions
└── styles/              # CSS design system
```

## 🤖 AI Coding Guides (Vibe Coding Ready!)

โปรเจกต์นี้ออกแบบมาเพื่อ Vibe Coding! มีไฟล์ guide สำหรับ AI ทุกตัว:

| AI Tool | Guide File |
|---------|-----------|
| Claude Code | [`docs/claude.md`](docs/claude.md) |
| Gemini / Antigravity | [`docs/gemini.md`](docs/gemini.md) |
| OpenAI Codex / ChatGPT | [`docs/codex.md`](docs/codex.md) |
| Architecture Overview | [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) |

## 🎮 How It Works

1. **อัปโหลดเสียงตด** — อัดจากไมค์หรืออัปโหลดไฟล์เสียง
2. **ตั้งชื่อ & เลือกประเภท** — เช่น Thunder ⚡, Silent but Deadly 🤫, Musical 🎵
3. **เข้า Battle Arena** — เสียงตดจะถูกจับคู่แข่ง 1v1
4. **โหวต & คอมเมนต์** — ผู้ใช้ทุกคนโหวตและแสดงความคิดเห็นได้
5. **ขึ้น Leaderboard** — สะสมคะแนนจากไลค์ ชนะ Battle และจำนวนครั้งที่ถูกฟัง

## 📊 Scoring System

```
Score = (Likes × 2) + (Wins × 5) + Plays
```

## 🏅 Rank System

| Score | Rank |
|-------|------|
| 0+ | 💨 Beginner Blaster |
| 10+ | 🌀 Gas Cadet |
| 50+ | 🌪️ Wind Warrior |
| 100+ | ⚡ Thunder Cheeks |
| 250+ | 🪐 Gas Giant |
| 500+ | 👑 Fart Lord |
| 1000+ | 🏆 The Supreme Cheek Clapper |

## 🤝 Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License — ใช้ได้เลย ปล่อยได้เลย 💨
