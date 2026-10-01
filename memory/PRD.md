# Inaluna Destination DMC Website - PRD

## Original Problem Statement
Create a corporate website for Inaluna Destination, a DMC (Destination Management Company) in Colombia.
Inspired by https://www.dmcnetwork.com/, with strict brand guidelines:
- Colors: #F5F2ED (background), #1A2B3C (text/buttons), #D4C2A1 (accents)
- Typography: Cormorant Garamond exclusively
- Multilingual (ES/EN)

## Architecture
- Backend: FastAPI + MongoDB (contact form storage + Resend email integration)
- Frontend: React + Framer Motion + Lucide Icons
- Deployment: Container with supervisor + ingress routing

## Core Sections Implemented
1. **Hero**: Fullscreen slideshow (4 colorful Colombia images) + "DMC in Colombia" tagline
2. **Who We Are**: Elegant centered text with italic emphasis
3. **Colombia**: 5 destination cards (Bogotá, Cartagena, Medellín, Coffee Region, Cali) with click-to-modal showing 2 curated highlights each
4. **Sustainability Map**: Minimalist SVG map of Colombia → PDF link
5. **Curated Highlights**: 4 video cards (Wellness, Cultural, Nature, Tailor-Made)
6. **MICE Form**: 10-step corporate form with radio buttons + Contact info
7. **Footer**: Logo + RNT 284284 + Phone + Instagram/LinkedIn (no Facebook)

## Features
- Multilingual (ES/EN) with full coverage
- Floating thin navigation bar
- Smooth scroll animations
- Click-to-modal city highlights
- Sustainability PDF link
- Video loops in highlights
- Resend email integration (requires real API key)
- Contact form saves to MongoDB

## Test Credentials
- Email recipient: info@inalunadmc.com (set in backend/.env)
- Resend API Key: requires real key in RESEND_API_KEY env var

## Backlog (P1)
- Add real Resend API key (currently placeholder)
- Verify domain on Resend for production sending
- Optimize video sizes for faster loading
- Add Google Analytics
- Add SEO meta tags

## Recent Updates (Feb 2026)
- **Map v4 — San Andrés y Providencia + Aspect-Precise**: New map image `inaluna-colombia-map-v2.jpg` (875x1216) with San Andrés y Providencia inset at top-left. MapCard uses `object-contain` so the full map is centered and visible without deformation inside the navy frame. MapExpandedModal uses `aspect-[875/1216]` so hover coordinates align precisely with each region. Hover zones repositioned: Caribe (top, shifted right), Pacífico (bottom-left under inset), Andina x3 (Medellín, Coffee, Bogotá). Solid navy strip at bottom covers baked-in tagline so bilingual overlay (`map_footer_tagline`) is the only visible one.
- **Map Expanded Modal**: X / backdrop click / Esc close. Hover opens `CityPreviewModal` → VER MÁS opens curated `CityModal`.

## Completed: Feb 2026
