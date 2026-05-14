import { cn } from "@/lib/utils"

export function StatusBadge({ status }: { status: string }) {
  const isLive = status === "In progress" || status === "Active" || status === "On shift"
  const isDone = status === "Completed" || status === "Paid" || status === "Ready"
  const isAssigned = status === "Assigned" || status === "Confirmed"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.06em]",
        isLive && "border-primary bg-primary text-primary-foreground",
        isDone && "border-border bg-card text-primary",
        isAssigned && "border-border bg-card text-muted-foreground",
        !isLive && !isDone && !isAssigned && "border-border bg-muted text-[var(--fg-3)]",
      )}
    >
      {isLive && <span className="inline-block size-1.5 rounded-full bg-current" />}
      {status}
    </span>
  )
}
