# Vehicle Care OS (VCO) Wireframe Prompts

## Stack Constraint

Design and implementation should assume this UI stack:
- Tailwind CSS
- shadcn/ui
- Motion
- 21st.dev
- Magic UI

Use these prompts to generate low-fidelity wireframes, structured mockups, or first-pass UI concepts that can later be implemented with the chosen stack.

## Global Direction

Visual rules:
- premium, minimal, high-trust
- black, off-white, white, and controlled electric blue palette
- strong typography and clean spacing
- customer screens should feel calm and premium
- operator screens should feel dense, structured, and operational
- technician screens should feel mobile-first and task-first

Component assumptions:
- use `shadcn/ui` for core inputs, dialogs, sheets, tables, tabs, badges, buttons, cards, forms
- use `Motion` for page transitions, section reveals, and meaningful state changes
- use `Magic UI` selectively for premium marketing moments, background effects, and polished attention cues
- use `21st.dev` as a source for high-quality Tailwind and component patterns when a stronger visual treatment is needed

## Prompt 1: Homepage Hero

Design a premium landing page hero for `Vehicle Care OS`, a software platform for car wash and detailing businesses.

Requirements:
- headline: `The Operating System For Modern Vehicle Care`
- subheadline explaining bookings, memberships, technicians, payments, and customer experience
- primary CTA and secondary CTA
- visual should suggest operational control, recurring revenue, and service transparency
- aesthetic should feel premium, minimal, high-contrast, and tech-forward
- avoid generic SaaS gradient backgrounds and avoid cliché car wash imagery
- use a strong typographic layout, restrained blue accents, dark surfaces, and system-like composition
- implementation should be feasible with Tailwind CSS, shadcn/ui, Motion, Magic UI, and optionally 21st.dev patterns

Suggested components:
- hero headline block
- CTA button pair
- proof strip
- product mockup or structured dashboard-plus-mobile composition
- subtle animated background treatment using Motion or Magic UI

## Prompt 2: Customer Booking Flow

Design a mobile-first booking flow for `Vehicle Care OS`.

Requirements:
- steps: select vehicle, select service package, choose add-ons, choose location or mobile service, choose time slot, review, pay, confirmation
- interface should feel premium and easy to use, with strong clarity around price and selected options
- include progress stepper and summary panel
- use minimal clutter and emphasize confidence, speed, and trust
- avoid generic e-commerce styling
- implementation should map cleanly to shadcn/ui forms, cards, sheets, tabs, buttons, and dialogs

Suggested components:
- stepper
- vehicle selector cards
- service package cards
- add-on toggles
- time slot grid
- sticky booking summary
- payment confirmation state

## Prompt 3: Operator Dashboard

Design a dashboard for an operator managing a vehicle care business.

Requirements:
- show bookings today, revenue today, active memberships, completed jobs, and jobs needing attention
- layout should feel dense, controlled, and premium rather than template-like
- include filters for location and date
- emphasize large numeric moments, booking state visibility, and quick access into operations
- avoid overusing card grids; use cards only where they structure meaning
- use dark and light balance intentionally with restrained blue accents
- implementation should align to Tailwind CSS and shadcn/ui table, card, select, badge, and tabs patterns

Suggested components:
- KPI row
- daily queue panel
- status breakdown
- alerts panel
- quick action strip
- compact charts only if visually justified

## Prompt 4: Operator Booking Detail

Design an operator booking detail screen for `Vehicle Care OS`.

Requirements:
- include booking status, status timeline, customer summary, vehicle summary, service package, add-ons, payment state, technician assignment, notes, and actions for reschedule, cancel, reassign, and update status
- layout should feel like a true operating screen: clean, powerful, and information-dense
- key state and actions must be visible at the top without feeling cluttered
- implementation should use shadcn/ui badges, sheets, dialogs, form controls, and timeline-like custom UI built with Tailwind

Suggested components:
- sticky action panel
- summary cards
- status chips
- timeline block
- technician assignment module
- notes panel

## Prompt 5: Technician Job Detail

Design a mobile-first technician job detail screen for `Vehicle Care OS`.

Requirements:
- show vehicle info, selected package, add-ons, checklist, notes input, photo upload, and large status actions
- UI must minimize cognitive load and support quick use on a phone during active work
- use clear hierarchy, large tap targets, and persistent bottom action controls if needed
- style should still feel premium and aligned with the overall product
- implementation should use shadcn/ui inputs, textarea, buttons, and custom status controls with Tailwind and Motion transitions

Suggested components:
- vehicle header
- service summary
- checklist list
- note composer
- image upload block
- sticky action bar

## Prompt 6: Membership Overview

Design a customer membership screen for `Vehicle Care OS`.

Requirements:
- show either current plan or prompt to subscribe
- display plan name, billing status, renewal date, benefits, and upgrade path
- style should feel premium and high-trust, not like a noisy pricing page
- use blue accent selectively to signal active plan status
- implementation should map to shadcn/ui cards, tabs, badges, and buttons

## Prompt 7: Customer Appointment Detail

Design a customer-facing appointment detail screen for `Vehicle Care OS`.

Requirements:
- show booking summary, vehicle summary, service package, add-ons, payment state, service timeline, notes, and before/after photos if available
- interface should emphasize transparency and trust
- completed-service state should feel rewarding but restrained
- implementation should be feasible with shadcn/ui and Motion

## Recommended Use

For each prompt, request these deliverables from a design model or designer:
- low-fidelity wireframe
- polished UI concept
- mobile and desktop variants where relevant
- component list mapped to shadcn/ui
- animation notes mapped to Motion
