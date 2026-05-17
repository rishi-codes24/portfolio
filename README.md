# Portfolio — Alex Chen

Minimal futuristic personal portfolio built with React, Tailwind CSS, and Framer Motion.

## Stack

- **React 18** — UI framework
- **Vite** — Build tool
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Animations
- **Syne + DM Sans** — Typography

## File Structure

```
portfolio/
├── index.html              # Entry HTML + SEO meta
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json             # SPA routing + cache headers
├── package.json
└── src/
    ├── main.jsx            # React root
    ├── index.css           # Tailwind directives + global styles
    └── App.jsx             # Full portfolio (all sections)
```

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

## Vercel Deployment

### Option A — CLI (fastest)
```bash
npm i -g vercel
vercel
# Follow prompts: link project, set framework to "Vite"
vercel --prod
```

### Option B — GitHub Integration
1. Push repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Framework preset: **Vite** (auto-detected)
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy**

## Customization

Edit the data constants at the top of `src/App.jsx`:
- `PROJECTS` — your projects
- `EXPERIENCE` — work history
- `SKILLS` — tech stack groups

Replace `alex.dev`, `alex@chen.dev`, and "Alex Chen" with your own info.
