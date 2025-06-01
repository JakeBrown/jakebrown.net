# Jake Brown's Personal Website

This is Jake Brown's personal website, built with React Router 7 in framework mode and deployed to Cloudflare Workers.

## Architecture

- **Framework**: React Router 7 (framework mode)
- **Deployment**: Cloudflare Workers
- **Content**: MDX blog posts with frontmatter
- **Styling**: CSS with custom properties and grunge effects

## Development

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run typecheck # Type check with TypeScript
```

## Deployment

The site deploys to Cloudflare Workers using wrangler:

```bash
npx wrangler deploy
```

## Project Structure

- `app/` - React Router application code
  - `routes/` - File-based routing
  - `lib/` - Server-side utilities (content loading)
  - `global.css` - Global styles
  - `root.tsx` - App shell and layout
- `src/content/blog/` - MDX blog posts
- `public/static/` - Static assets
- `build/` - Build output

## Key Features

- Server-side rendering with Cloudflare Workers
- Blog content loaded from MDX files with frontmatter
- Tag-based filtering
- Responsive navigation with grunge styling effects
- Optimized fonts and assets loading

## TypeScript

Full TypeScript support with proper VS Code integration. Type checking passes cleanly with `npm run typecheck`.

## Content System

Blog posts are written in MDX format in `src/content/blog/` with frontmatter:

```mdx
---
title: "Post Title"
date: "2024-01-01"
tags: ["tag1", "tag2"]
status: "published"
---

Post content here...

---

Additional content after page break...
```

The `---` separator creates a preview break for the homepage listing.