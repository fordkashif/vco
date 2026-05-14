import { NavLink, Outlet } from "react-router-dom"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  BookOpen01Icon,
  Calendar01Icon,
  Car01Icon,
  CheckmarkSquare01Icon,
  Clock01Icon,
  CrownIcon,
  Home01Icon,
  DashboardSquare01Icon,
  Settings01Icon,
  StarIcon,
  TrendingUpDownIcon,
  UserGroupIcon,
  WarehouseIcon,
  Wrench01Icon,
} from "@hugeicons/core-free-icons"

import { BrandMark } from "@/components/shared/brand-mark"

// ─── Shared floating pill tab bar ─────────────────────────────────────────
function PillNav({
  tabs,
  maxWidth = 430,
}: {
  tabs: readonly { to: string; label: string; icon: IconSvgElement }[]
  maxWidth?: number
}) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div
        className="mx-auto w-full pointer-events-auto"
        style={{ maxWidth, paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))", padding: "0 1.25rem" }}
      >
        <div style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}>
          <div
            className="flex items-center justify-around px-2 py-2.5"
            style={{
              borderRadius: 999,
              background: "color-mix(in oklab, var(--card) 94%, transparent)",
              backdropFilter: "blur(32px) saturate(180%)",
              WebkitBackdropFilter: "blur(32px) saturate(180%)",
              border: "1px solid color-mix(in oklab, var(--border) 80%, transparent)",
              boxShadow: "0 8px 32px -4px rgba(0,0,0,0.55), 0 2px 8px -2px rgba(0,0,0,0.35)",
            }}
          >
            {tabs.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className="flex flex-col items-center gap-[3px] px-3 py-1 transition-opacity"
              >
                {({ isActive }) => (
                  <>
                    <HugeiconsIcon
                      icon={icon}
                      size={22}
                      primaryColor={isActive ? "var(--primary)" : "var(--fg-3)"}
                      strokeWidth={isActive ? 2.2 : 1.6}
                    />
                    <span
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 9,
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        color: isActive ? "var(--primary)" : "var(--fg-3)",
                      }}
                    >
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

// ═══════════════════════════════════════════════════════════════
// CUSTOMER SHELL — Option C: Lounge
// Mobile-first · Outfit · Warm dark · Floating pill nav
// ═══════════════════════════════════════════════════════════════

const customerTabs = [
  { to: "/customer/home",       label: "Home",    icon: Home01Icon      },
  { to: "/customer/book",       label: "Book",    icon: BookOpen01Icon  },
  { to: "/customer/vehicles",   label: "Cars",    icon: Car01Icon       },
  { to: "/customer/membership", label: "Plan",    icon: CrownIcon       },
  { to: "/customer/history",    label: "History", icon: Clock01Icon     },
] as const

export function CustomerLayout() {
  return (
    <div
      className="vco-customer flex min-h-dvh flex-col"
      style={{ background: "var(--background)" }}
    >
      {/* Minimal top bar */}
      <header className="sticky top-0 z-40 mx-auto w-full" style={{ maxWidth: 430 }}>
        <div
          className="flex items-center justify-between px-5 py-3.5"
          style={{
            background: "color-mix(in oklab, var(--background) 85%, transparent)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--primary)",
            }}
          >
            VCO
          </span>
          <NavLink to="/customer/account">
            {({ isActive }) => (
              <span
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  border: `1.5px solid ${isActive ? "var(--primary)" : "var(--border)"}`,
                  background: isActive ? "var(--primary)" : "var(--card)",
                  color: isActive ? "var(--primary-foreground)" : "var(--foreground)",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  transition: "all 0.15s",
                }}
              >
                JL
              </span>
            )}
          </NavLink>
        </div>
      </header>

      {/* Content — phone width, bottom padding for floating pill */}
      <main
        className="mx-auto w-full flex-1 px-5 pt-2"
        style={{ maxWidth: 430, paddingBottom: "7rem" }}
      >
        <Outlet />
      </main>

      <PillNav tabs={customerTabs} maxWidth={430} />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// OPERATOR SHELL — Option B: Dispatch
// Desktop sidebar · Outfit · Cool near-black · Dense
// ═══════════════════════════════════════════════════════════════

type SidebarItem = {
  to: string
  label: string
  icon: IconSvgElement
  badge?: string
}

const sidebarSections: { heading: string; items: SidebarItem[] }[] = [
  {
    heading: "Today",
    items: [
      { to: "/operator/dashboard",   label: "Dispatch",    icon: DashboardSquare01Icon, badge: "28"   },
      { to: "/operator/bookings",    label: "Calendar",    icon: BookOpen01Icon,        badge: "142"  },
      { to: "/operator/customers",   label: "Members",     icon: UserGroupIcon,         badge: "3.1k" },
    ],
  },
  {
    heading: "Operate",
    items: [
      { to: "/operator/vehicles",    label: "Vehicles",    icon: Car01Icon      },
      { to: "/operator/team",        label: "Technicians", icon: Wrench01Icon   },
      { to: "/operator/services",    label: "Inventory",   icon: WarehouseIcon  },
    ],
  },
  {
    heading: "Grow",
    items: [
      { to: "/operator/memberships", label: "Memberships", icon: StarIcon          },
      { to: "/operator/payments",    label: "Loyalty",     icon: CrownIcon         },
      { to: "/operator/reports",     label: "Reports",     icon: TrendingUpDownIcon },
    ],
  },
]

function OperatorSidebar() {
  return (
    <aside
      className="vco-operator flex h-screen w-[200px] flex-shrink-0 flex-col"
      style={{
        background: "color-mix(in oklab, var(--background) 60%, var(--card))",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Logo */}
      <div
        className="flex-shrink-0 px-4 py-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <BrandMark />
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {sidebarSections.map((section) => (
          <div key={section.heading}>
            <p
              className="mb-1 px-2"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--fg-3)",
              }}
            >
              {section.heading}
            </p>
            <div className="space-y-px">
              {section.items.map(({ to, label, icon, badge }) => (
                <NavLink
                  key={to}
                  to={to}
                  className="flex items-center justify-between px-2.5 py-[7px] transition-colors"
                  style={({ isActive }) => ({
                    borderRadius: 6,
                    background: isActive
                      ? "var(--primary)"
                      : "transparent",
                    color: isActive ? "var(--primary-foreground)" : "var(--muted-foreground)",
                  })}
                >
                  {({ isActive }) => (
                    <>
                      <span className="flex items-center gap-2" style={{ fontSize: 12.5 }}>
                        <HugeiconsIcon
                          icon={icon}
                          size={13}
                          strokeWidth={isActive ? 2.2 : 1.7}
                          style={{ flexShrink: 0 }}
                        />
                        {label}
                      </span>
                      {badge && (
                        <span
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: 9.5,
                            borderRadius: 4,
                            padding: "1px 5px",
                            background: isActive
                              ? "color-mix(in oklab, var(--primary-foreground) 18%, transparent)"
                              : "var(--muted)",
                            color: isActive ? "var(--primary-foreground)" : "var(--fg-3)",
                          }}
                        >
                          {badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div
        className="flex-shrink-0 px-2 py-3"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <NavLink
          to="/operator/settings"
          className="flex items-center gap-2 px-2.5 py-[7px] transition-colors"
          style={({ isActive }) => ({
            borderRadius: 6,
            fontSize: 12.5,
            background: isActive ? "var(--primary)" : "transparent",
            color: isActive ? "var(--primary-foreground)" : "var(--muted-foreground)",
          })}
        >
          {({ isActive }) => (
            <>
              <HugeiconsIcon icon={Settings01Icon} size={13} strokeWidth={isActive ? 2.2 : 1.7} />
              Settings
            </>
          )}
        </NavLink>
      </div>
    </aside>
  )
}

export function OperatorLayout() {
  return (
    <div
      className="vco-operator flex h-screen overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <OperatorSidebar />
      <main className="flex-1 overflow-y-auto p-7">
        <div className="mx-auto max-w-[1100px]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// TECHNICIAN SHELL — Option C: Lounge (tablet/mobile)
// Outfit · Warm dark · Floating pill nav · max 768px
// ═══════════════════════════════════════════════════════════════

const techTabs = [
  { to: "/technician/today",          label: "Today",   icon: Calendar01Icon         },
  { to: "/technician/jobs/active",    label: "Active",  icon: Wrench01Icon           },
  { to: "/technician/jobs/completed", label: "Done",    icon: CheckmarkSquare01Icon  },
  { to: "/technician/profile",        label: "Profile", icon: UserGroupIcon          },
] as const

export function TechnicianLayout() {
  return (
    <div
      className="vco-technician flex min-h-dvh flex-col"
      style={{ background: "var(--background)" }}
    >
      <header
        className="sticky top-0 z-40 w-full"
        style={{
          background: "color-mix(in oklab, var(--background) 88%, transparent)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid color-mix(in oklab, var(--border) 55%, transparent)",
        }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3.5">
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--primary)",
            }}
          >
            VCO
          </span>
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 11,
              color: "var(--fg-3)",
            }}
          >
            Technician
          </span>
        </div>
      </header>

      <main
        className="mx-auto w-full max-w-3xl flex-1 px-5 py-5"
        style={{ paddingBottom: "7rem" }}
      >
        <Outlet />
      </main>

      <PillNav tabs={techTabs} maxWidth={768} />
    </div>
  )
}




