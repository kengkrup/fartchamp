# Contributing to FartChamp 💨

ขอบคุณที่สนใจ contribute ให้กับ FartChamp! 🎉

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/fartchamp.git
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. Start dev server:
   ```bash
   npm run dev
   ```

## 📏 Code Conventions

### CSS
- Use CSS custom properties from `src/styles/index.css`
- Follow BEM naming: `.block__element--modifier`
- Add component styles to `src/styles/components.css`
- Add page styles to `src/styles/pages.css`

### React
- Functional components only
- One component per file
- Use `useCallback` for event handlers
- Use `useMemo` for expensive computations
- Export default for all components

### Language
- **UI text**: Thai (ภาษาไทย)
- **Code & comments**: English
- **Variable names**: English, camelCase

### Icons
- Use `react-icons/fi` (Feather Icons)

## 📦 Pull Request Process

1. Ensure `npm run build` passes
2. Test on mobile viewport
3. Update AI guide files if you change architecture
4. Fill out the PR template
5. Request review

## 🤖 AI Coding Guides

If your changes affect project structure or conventions, please update:
- `docs/claude.md`
- `docs/gemini.md`
- `docs/codex.md`
- `docs/ARCHITECTURE.md`

## 💨 Have Fun!

This is a fun project. Don't take it too seriously. Happy coding! 🏆
