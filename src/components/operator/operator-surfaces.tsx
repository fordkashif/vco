import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function VcoPanel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("rounded-[14px] border border-border bg-card", className)}>
      {children}
    </div>
  )
}

export function VcoPanelHeader({
  label,
  title,
  action,
}: {
  label?: string
  title: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="flex items-center justify-between border-b border-border px-5 py-4">
      <div>
        {label && (
          <p
            className="mb-1 text-[10px] uppercase tracking-[0.08em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
          >
            {label}
          </p>
        )}
        <div
          className="text-[22px] leading-none tracking-[-0.02em] text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          {title}
        </div>
      </div>
      {action && (
        <div
          className="text-[10.5px] uppercase tracking-[0.06em]"
          style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
        >
          {action}
        </div>
      )}
    </div>
  )
}

export function VcoKpiCard({
  label,
  value,
  delta,
  up,
}: {
  label: string
  value: string
  delta?: string
  up?: boolean
}) {
  return (
    <div className="rounded-[14px] border border-border bg-card p-4">
      <p
        className="text-[10px] uppercase tracking-[0.08em]"
        style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
      >
        {label}
      </p>
      <p
        className="mt-2 text-[28px] leading-none tracking-[-0.02em] text-foreground"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        {value}
      </p>
      {delta && (
        <p
          className="mt-1.5 text-[11px]"
          style={{ fontFamily: "'Outfit', sans-serif", color: up ? "var(--primary)" : "var(--fg-3)" }}
        >
          {delta}
        </p>
      )}
    </div>
  )
}

export function VcoRow({
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

export function VcoMuted({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("rounded-[10px] bg-muted p-4", className)}>
      {children}
    </div>
  )
}

// Legacy aliases kept for pages that haven't been fully migrated
export const OperatorPanel = VcoPanel
export const OperatorDarkPanel = VcoPanel
export const OperatorMetricTile = ({
  label,
  value,
  delta,
}: {
  label: string
  value: string
  delta?: string
}) => <VcoKpiCard label={label} value={value} delta={delta} up={delta?.startsWith("+")} />
export const OperatorRow = VcoRow
export const OperatorMutedBlock = VcoMuted

