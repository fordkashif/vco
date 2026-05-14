import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function SurfaceHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow: string
  title: string
  description?: string
  actions?: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        <p
          className="text-[10.5px] uppercase tracking-[0.1em]"
          style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
        >
          {eyebrow}
        </p>
        <h1
          className="mt-2 text-[clamp(28px,4vw,44px)] leading-[0.95] tracking-[-0.025em] text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-[15px] leading-[1.55] text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
    </div>
  )
}

