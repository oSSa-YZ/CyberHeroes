# CyberHeroes

A modern, TypeScript/Next.js project focused on cybersecurity learning and empowerment. The goal is to provide interactive content, practical tools, and a solid foundation for expanding cybersecurity modules over time.

## What it provides
- **Interactive UI**: Modern, component-driven interface for lessons, labs, and activities.
- **Modular content**: JSON- and TS-driven content that’s easy to extend.
- **Learning focus**: Space for phishing awareness, cyber‐defense, and other training modules.
- **Open collaboration**: Designed for contributions and iterative improvement.

## Tech stack
- Next.js 15, React 19, TypeScript 5
- Tailwind CSS (utility styling) and PostCSS
- Radix UI, framer-motion, zod, react-hook-form, and other UI/data helpers

## Project structure
- `app/` — Next.js App Router pages and layouts
- `components/` — Reusable UI components
- `styles/` — Global styles (Tailwind, CSS)
- `data/` — JSON and content data (e.g., phishing, cyberheroes)
- `lib/` — Utilities and helpers
- `public/` — Static assets
- `types/` — Shared TypeScript types
- Root configs: `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`, `tsconfig.json`

## Getting started
```bash
git clone https://github.com/oSSa-YZ/CyberHeroes.git
cd CyberHeroes
npm install
npm run dev
# visit http://localhost:3000
```

### Scripts
- `npm run dev` — Start local dev server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Lint the codebase

## Deployment
You can deploy via any Next.js-compatible platform (e.g., Vercel, Netlify) or a Node server:
```bash
npm run build
npm run start
```

## Contributing
Contributions are welcome! Please fork, create a branch, and open a pull request with clear scope and description.

## License
Add an appropriate license file (e.g., MIT) at the repository root.

## Links
- Repository: https://github.com/oSSa-YZ/CyberHeroes
