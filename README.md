# Keel Ventures — Investment Firm Preset

A bold, people-first homepage for a **fictional** Midwest investment firm that helps owners with succession, growth capital and strategy. Deep spruce and warm paper with a keel-orange slash; Archivo (heavy) + Instrument Serif italic accents. No photography: the team are monogram tiles.

Next.js 16 (static export) · GSAP 3 + ScrollTrigger · Lenis · CSS Modules. No UI libraries.

```bash
npm install
npm run dev
npm run build     # static site in ./out
```

## Sections

| Section | What it does |
|---|---|
| Hero | Heavy two-line headline with a serif italic line, two parallax slashes and a "How can we help?" panel that pre-selects a topic in the contact form. |
| Marquee | Values scrolling in alternating sans and serif. |
| Who we help | Three situation cards ("I'm thinking about stepping back", ...) each linking to a pre-filled enquiry. |
| How we partner | Three approaches with a large counter that changes as you scroll. |
| Statement | Belief statement revealed word by word. |
| Process | Four steps. |
| Values | Four values in large type. |
| Team | Six monogram cards with name, credentials, role and bio. |
| Contact | Topic picker and validated form that opens the visitor's email app. |

## Re-skin

- **Copy & data**: `content/site.json` (name, tagline, navigation, contact, footer) and `content/home.json` (every section, including team members).
- **Logo**: `components/Logo.js` (heavy wordmark with an orange keel, drawn in `currentColor`) and `app/icon.svg`.
- **Team photos**: the tiles show initials. To use photos, render an image inside `.media` in `components/Team.js`; the brand tint layer (`.media::before`) is already there, set to `opacity: 0`.
- **Colour**: tokens at the top of `app/globals.css` (`--navy-*`, `--blue*`, `--red`, `--paper`, `--ink`). The token names are kept from the base design; their values are the Keel palette.
- **Type**: `app/layout.js`.

## Accessibility & motion

`prefers-reduced-motion` stops the parallax, marquee and word reveals. The form validates inline with clear messages, and all controls are keyboard-operable.

## Demo content

Keel Ventures, its team and email (`.example`) are fictional. A real firm must replace them before launch.
