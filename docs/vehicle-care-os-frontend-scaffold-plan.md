# Vehicle Care OS (VCO) Frontend Scaffold Plan

## Stack Decision

Frontend stack:
- Next.js App Router
- Tailwind CSS
- shadcn/ui
- Motion
- 21st.dev
- Magic UI

## Why This Stack Fits

### Tailwind CSS
Use for:
- full styling system
- fast iteration
- design-token-driven visual consistency

### shadcn/ui
Use for:
- accessible primitives
- form controls
- sheets, dialogs, tables, tabs, badges, cards, buttons
- internal product interfaces that need speed and consistency

### Motion
Use for:
- page transitions
- section reveals
- state transitions
- premium interaction details without overanimating

### 21st.dev
Use for:
- pattern sourcing and implementation acceleration
- finding stronger section ideas or compositional patterns when needed

### Magic UI
Use for:
- hero polish
- ambient background effects
- premium marketing details
- selective enhancements, not the base design system

## Recommended App Structure

```text
app/
  (marketing)/
    page.tsx
    layout.tsx
  (customer)/
    home/page.tsx
    book/page.tsx
    vehicles/page.tsx
    vehicles/[id]/page.tsx
    membership/page.tsx
    history/page.tsx
    history/[id]/page.tsx
    account/page.tsx
  (operator)/
    dashboard/page.tsx
    bookings/page.tsx
    bookings/[id]/page.tsx
    customers/page.tsx
    customers/[id]/page.tsx
    vehicles/page.tsx
    vehicles/[id]/page.tsx
    services/page.tsx
    memberships/page.tsx
    team/page.tsx
    payments/page.tsx
    reports/page.tsx
    settings/page.tsx
  (technician)/
    jobs/page.tsx
    jobs/[id]/page.tsx
    completed/page.tsx
    profile/page.tsx
components/
  marketing/
  customer/
  operator/
  technician/
  shared/
  ui/
lib/
  utils/
  constants/
  data/
  auth/
  animations/
styles/
```

## Design System Foundation

Create these first:

### 1. Theme Tokens
Define Tailwind tokens or CSS variables for:
- background
- foreground
- card
- border
- muted text
- primary accent blue
- destructive
- success

### 2. Typography Scale
Define a deliberate scale for:
- display
- hero heading
- section heading
- body
- label
- data metric

### 3. Radius / Border / Surface Rules
Set:
- border radius philosophy
- border color usage
- panel elevation rules
- dark and light surface usage

## Component Priorities

Build these shared components first:
- app shell
- top nav
- side nav
- section header
- KPI card
- booking status badge
- vehicle summary card
- customer summary card
- booking timeline
- filter bar
- empty state
- mobile sticky action bar

## shadcn/ui Usage Plan

Prefer `shadcn/ui` for:
- `Button`
- `Badge`
- `Card`
- `Input`
- `Textarea`
- `Label`
- `Form`
- `Select`
- `Tabs`
- `Dialog`
- `Sheet`
- `Table`
- `DropdownMenu`
- `Avatar`
- `Separator`
- `Skeleton`

Customize aggressively enough that it does not look stock.

## Motion Usage Plan

Use Motion for:
- hero text and CTA reveal
- section entrance on scroll
- panel transitions
- booking status transitions
- mobile sheet transitions
- subtle hover or tap response on premium customer cards

Do not use Motion for:
- constant decorative movement
- unnecessary list-item animations in dense operator views

## Magic UI Usage Plan

Use Magic UI only where it adds clear value:
- hero background or decorative system grid
- CTA section accent treatment
- premium section separators or subtle spotlight effects

Do not build core product UI out of Magic UI components.

## 21st.dev Usage Plan

Use 21st.dev to find:
- premium hero section patterns
- refined dashboard section composition
- high-quality Tailwind modules that can be adapted into the VCO system

Do not copy patterns blindly.
Refit them to the VCO brand system.

## First Build Sequence

### Step 1
Scaffold app shell and theme foundation.

### Step 2
Build marketing homepage with:
- hero
- proof strip
- platform value
- operator section
- customer section
- memberships section
- technician section
- CTA section

### Step 3
Build customer booking flow.

### Step 4
Build operator dashboard.

### Step 5
Build operator booking detail.

### Step 6
Build technician job detail.

## Suggested Initial Packages

Core:
- `next`
- `react`
- `react-dom`
- `tailwindcss`
- `class-variance-authority`
- `clsx`
- `tailwind-merge`
- `lucide-react`
- `motion`

UI:
- `shadcn/ui` components as generated into the project

Optional depending on setup:
- `next-themes`
- `react-hook-form`
- `zod`

## Initial Implementation Targets

The first coded deliverables should be:
- marketing homepage
- customer booking flow shell
- operator dashboard shell
- operator booking detail shell
- technician job detail shell

These should use realistic placeholder data and reusable components from day one.

## Recommendation

Treat `shadcn/ui` as the system backbone.
Treat `Motion` and `Magic UI` as polish layers.
Treat `21st.dev` as a pattern source, not a design system.

That will keep the product cohesive instead of looking assembled from unrelated libraries.
