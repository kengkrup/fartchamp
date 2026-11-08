# Contributing to FartChamp

## Getting started

1. Fork the repository.
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

5. Start the dev server:

   ```bash
   npm run dev
   ```

## Code conventions

### CSS

- Use CSS custom properties from `src/styles/index.css`.
- Follow BEM naming: `.block__element--modifier`.
- Add component styles to `src/styles/components.css`.
- Add page styles to `src/styles/pages.css`.

### React

- Functional components only.
- One component per file.
- `useCallback` for event handlers.
- `useMemo` for derived data.
- Default export for all components.

### Language

- UI text: English.
- Code and comments: English.
- Variable names: English, camelCase.

### Icons

- Use `react-icons/fi` (Feather).

## Pull request process

1. Confirm `npm run build` passes.
2. Check the layout on a mobile viewport.
3. Update the AI guide files if the architecture changes.
4. Fill out the PR template.
5. Request review.

## AI coding guides

If your changes affect project structure or conventions, update:

- `docs/claude.md`
- `docs/gemini.md`
- `docs/codex.md`
- `docs/ARCHITECTURE.md`
