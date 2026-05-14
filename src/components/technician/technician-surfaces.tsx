import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function VcoCheckRow({
  label,
  done,
}: {
  label: string
  done: boolean
}) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
      <span
        className={cn(
          "inline-grid size-4 flex-shrink-0 place-items-center rounded-[5px] border",
          done
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border",
        )}
        style={{ fontSize: 11, fontWeight: 700 }}
      >
        {done && "✓"}
      </span>
      <span
        className={cn(
          "text-[12.5px]",
          done
            ? "text-muted-foreground line-through decoration-[var(--fg-3)]"
            : "text-foreground",
        )}
      >
        {label}
      </span>
      <span
        className="ml-auto text-[10.5px]"
        style={{
          fontFamily: "'Outfit', sans-serif",
          color: done ? "var(--primary)" : "var(--fg-3)",
        }}
      >
        {done ? "Done" : "Pending"}
      </span>
    </div>
  )
}

export function VcoPhotoSlot({
  label,
  add,
  className,
}: {
  label?: string
  add?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] rounded-[8px] border border-border overflow-hidden",
        add ? "grid place-items-center bg-card" : "",
        className,
      )}
      style={
        !add
          ? {
              background: "repeating-linear-gradient(45deg, var(--muted) 0 8px, var(--card) 8px 16px)",
            }
          : undefined
      }
    >
      {add && <span className="text-[22px] text-muted-foreground">＋</span>}
      {label && !add && (
        <span
          className="absolute bottom-1.5 left-1.5 rounded-[4px] px-1.5 py-0.5 text-[9px] uppercase tracking-[0.06em] text-white"
          style={{
            fontFamily: "'Outfit', sans-serif",
            background: "rgba(0,0,0,0.45)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}

export function VcoJobHeader({
  jobLabel,
  techName,
  avatar,
}: {
  jobLabel: string
  techName: string
  avatar: string
}) {
  return (
    <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
      <div>
        <p
          className="text-[10px] uppercase tracking-[0.08em]"
          style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
        >
          {jobLabel}
        </p>
        <p className="mt-0.5 text-[12.5px] text-foreground">{techName}</p>
      </div>
      <div
        className="grid size-7 place-items-center rounded-full bg-muted text-[10px] text-muted-foreground"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {avatar}
      </div>
    </div>
  )
}

// Legacy aliases
export const TechnicianPanel = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => (
  <div className={cn("rounded-[14px] border border-border bg-card", className)}>{children}</div>
)

export const TechnicianFocusCard = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-[14px] border border-border",
      className,
    )}
    style={{
      background: "var(--card)",
      boxShadow: "0 0 0 1px color-mix(in oklab, var(--primary) 20%, transparent)",
    }}
  >
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
      style={{
        background: "radial-gradient(60% 80% at 50% 100%, color-mix(in oklab, var(--primary) 14%, transparent), transparent)",
      }}
    />
    <div className="relative">{children}</div>
  </div>
)

export const TechnicianTaskRow = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => (
  <div className={cn("rounded-[8px] border border-border bg-background px-4 py-3", className)}>
    {children}
  </div>
)

