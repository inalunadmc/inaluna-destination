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
- **Curated Highlights v2 — Rounded + Real Imagery**: Replaced Bogotá Salt Cathedral and Cartagena Sunset highlight images with user-uploaded assets `/bog-catedral-zipa.webp` (Zipaquirá miner statue at the Salt Cathedral complex) and `/ctg-atardecer.webp` (Cartagena walled city sunset from water). Renamed Cartagena highlight #1 from "Sunset Sailing" to "Sunset from the Ramparts" / "Atardecer en las Murallas" with new text matching the image. Added `rounded-xl overflow-hidden shadow-lg` wrapper around every CityModal curated highlight image for consistent luxury frame.
- **Modal Responsive Fix**: Both modals use `max-h-[85vh] + flex flex-col` + sticky header + scrollable body.

## Completed: Feb 2026
