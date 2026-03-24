# Fruit Royale — Luxury Exotic Fruits E-Commerce

A full-featured, responsive luxury fruit shopping web application built with **Next.js 16** and **React 19**.

🌐 **Live Site**: https://devlondon47-spec.github.io/lawyer/

## Features

- 🏠 **Homepage** — Hero section, featured products, testimonials, CTA banner
- 🛒 **Shop** — Product grid with category filters, search, and sorting
- 📦 **Product Detail** — Full product page with nutrition facts & related products
- 🛍️ **Cart Drawer** — Slide-in cart with qty controls & order summary
- ✅ **Checkout** — Delivery form + payment method selection
- 📋 **Orders** — Order history dashboard with stats
- 👤 **User Dashboard** — Profile, orders, wishlist tabs
- 🔐 **Auth** — Login & Register pages
- ℹ️ **About** — Brand story, team, timeline
- 📞 **Contact** — Contact form + FAQ accordion

## Tech Stack

- **Framework**: Next.js 16 (Static Export)
- **UI**: Vanilla CSS (Glassmorphism, Gold/Black theme, Playfair Display + Inter)
- **State**: React Context + `useReducer` + `localStorage`
- **Deployment**: GitHub Pages via GitHub Actions

## Run Locally

\`\`\`bash
npm install
npm run dev
# Open http://localhost:3000
\`\`\`

## Build & Export

\`\`\`bash
npm run build
# Output in ./out/
\`\`\`

## Deploying to GitHub Pages

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically deploys on every push to `main`.

> **Setup**: Go to your repo Settings → Pages → Source: **GitHub Actions**

## Design System

- **Colors**: Black (`#0a0a0a`), Gold (`#d4af37`), White (`#fafafa`)
- **Typography**: Playfair Display (headings) + Inter (body)
- **Style**: Glassmorphism cards, marble gradients, smooth micro-animations
