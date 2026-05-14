import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function VcoServiceCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[18px] border border-border bg-card",
        className,
      )}
    >
      {/* Subtle lime glow from bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "radial-gradient(60% 80% at 50% 100%, color-mix(in oklab, var(--primary) 12%, transparent), transparent)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

export function VcoProgressStep({
  label,
  state,
}: {
  label: string
  state: "done" | "now" | "pending"
}) {
  return (
    <div className={cn("flex items-center gap-3 text-[12.5px]", state === "pending" && "opacity-40")}>
      <span
        className={cn(
          "inline-block size-3.5 flex-shrink-0 rounded-full border",
          state === "done" && "border-primary bg-primary",
          state === "now" && "border-primary bg-primary shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_22%,transparent)]",
          state === "pending" && "border-border",
        )}
      />
      <span className={cn(state !== "pending" ? "text-foreground" : "text-muted-foreground")}>
        {label}
      </span>
    </div>
  )
}

export function VcoInfoTile({
  label,
  value,
  caption,
  accent,
  className,
}: {
  label: string
  value: string
  caption?: string
  accent?: boolean
  className?: string
}) {
  return (
    <div className={cn("rounded-[12px] border border-border bg-card p-4", className)}>
      <p
        className="text-[10px] uppercase tracking-[0.08em]"
        style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
      >
        {label}
      </p>
      <p
        className="mt-2 text-[22px] leading-none tracking-[-0.02em]"
        style={{
          fontFamily: "'Instrument Serif', serif",
          color: accent ? "var(--primary)" : "var(--foreground)",
        }}
      >
        {value}
      </p>
      {caption && <p className="mt-1.5 text-[12px] text-muted-foreground">{caption}</p>}
    </div>
  )
}

export function VcoVehicleCard({
  make,
  model,
  plate,
  color,
  className,
}: {
  make: string
  model: string
  plate: string
  color: string
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-4 rounded-[12px] border border-border bg-card p-4", className)}>
      {/* Vehicle placeholder */}
      <div
        className="h-10 w-14 flex-shrink-0 rounded-[6px] border border-border"
        style={{
          background: "repeating-linear-gradient(135deg, var(--muted) 0 6px, var(--card) 6px 12px)",
        }}
      />
      <div className="min-w-0">
        <p className="truncate text-[13px] font-medium text-foreground">{make} {model}</p>
        <p
          className="mt-0.5 truncate text-[10.5px]"
          style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
        >
          {plate} · {color.toUpperCase()}
        </p>
      </div>
    </div>
  )
}

export function VcoListRow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-[10px] border border-border bg-background px-4 py-3.5 transition hover:bg-card",
        className,
      )}
    >
      {children}
    </div>
  )
}

// Legacy aliases
export const CustomerSection = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => <div className={cn("rounded-[18px] border border-border bg-card overflow-hidden", className)}>{children}</div>

export const CustomerHeroCard = ({
  eyebrow,
  title,
  body,
  meta,
}: {
  eyebrow: string
  title: string
  body: string
  meta?: ReactNode
}) => (
  <VcoServiceCard>
    <div className="p-6">
      <p
        className="text-[10.5px] uppercase tracking-[0.08em]"
        style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
      >
        {eyebrow}
      </p>
      <h3
        className="mt-3 text-[26px] leading-[1] tracking-[-0.02em] text-foreground"
        style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
      >
        {title}
      </h3>
      <p className="mt-3 text-[14px] leading-[1.5] text-muted-foreground">{body}</p>
      {meta && <div className="mt-5">{meta}</div>}
    </div>
  </VcoServiceCard>
)

export const CustomerInfoTile = VcoInfoTile
export const CustomerListItem = VcoListRow
export const CustomerSoftPanel = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => <div className={cn("rounded-[14px] bg-muted p-4", className)}>{children}</div>

