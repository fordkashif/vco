import { PanelLeft, User, Wrench } from "lucide-react"
import { Link, NavLink, Outlet } from "react-router-dom"

import { BrandMark } from "@/components/shared/brand-mark"
import { cn } from "@/lib/utils"

const navItems = [
  { to: "/customer", label: "Customer", icon: User },
  { to: "/operator", label: "Operator", icon: PanelLeft },
  { to: "/technician", label: "Technician", icon: Wrench },
]

export function AppShell() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "color-mix(in oklab, var(--background) 70%, transparent)",
          backdropFilter: "blur(14px) saturate(140%)",
          WebkitBackdropFilter: "blur(14px) saturate(140%)",
          borderColor: "color-mix(in oklab, var(--border) 50%, transparent)",
        }}
      >
        <div className="mx-auto flex max-w-[var(--maxw)] items-center justify-between px-[var(--pad)] h-16">
          <BrandMark />
          <nav className="hidden items-center gap-1 rounded-full border border-border bg-card p-1 md:flex">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )
                }
              >
                <Icon className="size-3.5" />
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden rounded-full border border-border bg-card px-4 py-2 text-[13px] text-muted-foreground transition hover:text-foreground md:block"
            >
              Marketing
            </Link>
            <span className="rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground">
              Pilot build
            </span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-[var(--maxw)] gap-6 px-[var(--pad)] py-6 lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside className="hidden rounded-[var(--radius)] border border-border bg-card p-4 lg:block" style={{ alignSelf: "start" }}>
          <p
            className="text-[10px] font-medium tracking-[0.08em] uppercase"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3, oklch(0.58 0.010 80))" }}
          >
            Product surfaces
          </p>
          <div className="mt-4 space-y-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )
                }
              >
                <Icon className="size-4" />
                {label}
              </NavLink>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

