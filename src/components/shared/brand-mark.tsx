import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"

export function BrandMark({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-[10px] font-semibold tracking-[-0.01em] text-[15px] text-foreground no-underline", className)}>
      <span
        style={{
          width: 26,
          height: 26,
          borderRadius: 7,
          background: "var(--primary)",
          color: "var(--primary-foreground)",
          display: "grid",
          placeItems: "center",
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 600,
          fontSize: 12,
          boxShadow: "0 0 0 1px color-mix(in oklab, var(--primary) 50%, transparent), 0 0 24px -6px var(--primary)",
          flexShrink: 0,
        }}
      >
        ◆
      </span>
      <span>Vehicle Care OS</span>
    </Link>
  )
}

