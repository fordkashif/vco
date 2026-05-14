# Agency Branding System

_Started 2026-05-13 13:52 UTC_

---

## User

I want a style something like 

https://www.behance.net/gallery/230970791/Fourmeta-Agency
This is the concept

## User

I want a style something like 

https://www.behance.net/gallery/230970791/Fourmeta-Agency
This is the concept

## Assistant

_[tool: update_todos]_

_[tool: web_search]_

I have plenty to work with — a detailed PRD plus a clear aesthetic direction (premium agency-style: bold typography, structured layouts, restrained palette, confident metrics). Skipping the question round and going straight to design so you can react to something real.

**Design system I'm committing to:**
- **Type:** "Instrument Serif" for editorial display moments + "Geist" sans for body + "Geist Mono" for labels/metrics — agency-portfolio feel without Fourmeta's specific look
- **Palette:** near-black warm bg `oklch(0.16 0.008 60)`, bone-white fg, single electric lime accent `oklch(0.88 0.20 125)` (with tweakable alternates: amber, ice-blue, signal-red)
- **Layout:** generous whitespace, asymmetric grids, big numbered sections (01/02/03), marquee strip, mocked product UI panels as the centerpiece (not real screenshots — actual rendered VCO UI inside the page)
- **Original work** — no recreation of Fourmeta's specific elements; just inspired by the genre

Building a long-scroll landing page with mock product UI embedded (customer app, operator dashboard, technician view), with Tweaks for accent color, theme, and density. Let me set up the project.

_[tool: copy_starter_component]_

_[tool: read_file]_

_[tool: write_file]_

_[tool: done]_

_[tool: fork_verifier_agent]_

That warning's a false positive — the page is static HTML with React only powering the Tweaks panel (mounted on `#tweak-root`, not `#root`). Let me kick off the verifier.Delivered **Vehicle Care OS.html** — a single-scroll agency-style landing page inspired by the Behance reference's restrained-but-bold vocabulary (without copying its specific elements).

**What's in it:**
- Hero with editorial serif/italic display headline and a 4-up metric strip
- Infinite marquee
- 6 numbered platform feature rows with hover micro-interaction
- "Three surfaces, one operation" showcase — a real rendered customer phone, operator dashboard (with sidebar, KPIs, calendar, bar chart, technician roster), and technician tablet (checklist + photo grid)
- Membership LTV ledger story
- Big-number 90-day metrics row
- 3-tier pricing
- Footer CTA + sitemap

**Tweaks panel** (toggle from toolbar) lets you swap:
- Accent palette: electric lime / amber / ice-blue / signal-red
- Theme: dark / light
- Display type: Instrument Serif / Geist / mixed

If you want next: variations as artboards on a design canvas, a deeper dive into one of the three product surfaces (e.g. a full clickable operator dashboard), or pivoting the headline/copy direction.

