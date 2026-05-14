import { NavLink, Outlet } from "react-router-dom"

import { cn } from "@/lib/utils"

type SectionNavItem = {
  to: string
  label: string
}

export function SectionLayout({
  title,
  description,
  navItems,
}: {
  title: string
  description: string
  navItems: readonly SectionNavItem[]
}) {
  return (
    <div className="space-y-5">
      <div className="rounded-[var(--radius)] border border-border bg-card p-5">
        <p
          className="text-[10px] font-medium uppercase tracking-[0.08em]"
          style={{ fontFamily: "'Outfit', sans-serif", color: "var(--primary)" }}
        >
          {title}
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-wrap gap-1.5 rounded-[var(--radius)] border border-border bg-card p-1.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "rounded-full px-4 py-2 text-[13px] font-medium transition",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  )
}

