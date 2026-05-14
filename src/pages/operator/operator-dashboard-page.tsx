import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon, Search01Icon } from "@hugeicons/core-free-icons"

import { StatusBadge } from "@/components/shared/status-badge"
import { VcoKpiCard, VcoPanel } from "@/components/operator/operator-surfaces"
import { bookings, getBookingDisplay, teamMembers } from "@/data/mock"

// ── Static dashboard data ──────────────────────────────────────────────
const kpis = [
  { label: "Revenue today",   value: "$8,420", delta: "↑ 12% vs last Tue", up: true  },
  { label: "Bay utilization", value: "87%",    delta: "↑ 4 pts",            up: true  },
  { label: "New members",     value: "17",     delta: "↑ 3 vs avg",         up: true  },
  { label: "Avg ticket",      value: "$61",    delta: "— stable",           up: false },
]

const calendarEvents = [
  { label: "Signature wash · Bay 03", who: "M. Okafor · LR Sport",  top: 6,   height: 34, alt: false },
  { label: "Full detail · Bay 01",    who: "D. Vega · BMW M3",      top: 48,  height: 40, alt: true  },
  { label: "Ceramic coat · Bay 04",   who: "A. Choi · Tesla Y",     top: 96,  height: 54, alt: false },
  { label: "Mobile — 22 Park Ln",     who: "T. Reyes · Porsche 911",top: 158, height: 30, alt: true  },
  { label: "Express · Bay 02",        who: "J. Singh · Audi Q5",    top: 196, height: 24, alt: false },
]

const barData = [
  { day: "W", h: 42  },
  { day: "T", h: 58  },
  { day: "F", h: 51  },
  { day: "S", h: 72  },
  { day: "S", h: 88, hi: true },
  { day: "M", h: 64  },
  { day: "T", h: 76  },
]

// ── Component ──────────────────────────────────────────────────────────
export function OperatorDashboardPage() {
  const bookingFeed = bookings.map(getBookingDisplay)

  return (
    <div className="space-y-4">

      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="flex items-end justify-between">
        <div>
          <p
            className="text-[10.5px] uppercase tracking-[0.1em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
          >
            Chelsea Flagship · Dispatch
          </p>
          <h1
            className="mt-1 text-[32px] leading-none tracking-[-0.025em] text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            Dispatch — <em>Today</em>
          </h1>
        </div>
        <div className="flex items-center gap-2.5">
          {/* Search */}
          <div
            className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-[12px] text-muted-foreground md:flex"
          >
            <HugeiconsIcon icon={Search01Icon} size={14} primaryColor="var(--fg-3)" strokeWidth={1.6} />
            <span>Vehicle, member, plate…</span>
            <kbd
              className="rounded-[4px] border border-border px-1.5 py-0.5 text-[10px]"
              style={{ fontFamily: "'Outfit', sans-serif", background: "var(--background)" }}
            >
              ⌘K
            </kbd>
          </div>
          {/* New booking */}
          <button
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition hover:opacity-90"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={14} strokeWidth={1.8} />
            New booking
          </button>
        </div>
      </div>

      {/* ── KPI row ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {kpis.map((k) => (
          <VcoKpiCard key={k.label} label={k.label} value={k.value} delta={k.delta} up={k.up} />
        ))}
      </div>

      {/* ── Middle: calendar + booking queue ────────────────────── */}
      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">

        {/* Calendar */}
        <VcoPanel>
          <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
            <h2
              className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
            >
              Calendar
            </h2>
            <span
              className="text-[10.5px] uppercase tracking-[0.06em]"
              style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
            >
              Today · Live
            </span>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-[52px_1fr] gap-3">
              {/* Time labels */}
              <div
                className="flex flex-col gap-[28px] pt-[16px] text-[10.5px]"
                style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
              >
                {["09:00", "10:00", "11:00", "12:00", "13:00"].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              {/* Events grid */}
              <div
                className="relative border-l border-border"
                style={{ minHeight: 240 }}
              >
                {/* Grid lines */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-[16px] bottom-[16px]"
                  style={{
                    backgroundImage: "linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
                    backgroundSize: "100% 40px",
                    opacity: 0.5,
                  }}
                />
                {/* Events */}
                {calendarEvents.map((ev) => (
                  <div
                    key={ev.label}
                    className="absolute left-2 right-2 flex items-center justify-between rounded-[8px] px-2.5 py-1.5 text-[11px]"
                    style={{
                      top: ev.top,
                      height: ev.height,
                      background: ev.alt
                        ? "var(--muted)"
                        : "color-mix(in oklab, var(--primary) 16%, var(--background))",
                      border: ev.alt
                        ? "1px solid var(--border)"
                        : "1px solid color-mix(in oklab, var(--primary) 35%, transparent)",
                      color: ev.alt ? "var(--muted-foreground)" : "var(--foreground)",
                    }}
                  >
                    <span className="truncate">{ev.label}</span>
                    <span
                      className="ml-2 hidden flex-shrink-0 sm:block"
                      style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "var(--fg-3)" }}
                    >
                      {ev.who}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </VcoPanel>

        {/* Right column: live queue */}
        <VcoPanel>
          <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
            <h2
              className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
            >
              Queue
            </h2>
            <span
              className="text-[10.5px] uppercase tracking-[0.06em]"
              style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
            >
              {bookingFeed.length} jobs
            </span>
          </div>
          <div className="space-y-1 p-3">
            {bookingFeed.map((b) => (
              <div
                key={b.id}
                className="flex items-start justify-between gap-3 rounded-[10px] border border-border bg-background px-3.5 py-3 transition hover:bg-card"
              >
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-foreground">{b.serviceName}</p>
                  <p
                    className="mt-0.5 truncate text-[10.5px]"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                  >
                    {b.time} · {b.technician}
                  </p>
                </div>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
        </VcoPanel>
      </div>

      {/* ── Bottom: bar chart + technician roster ───────────────── */}
      <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">

        {/* Revenue bar chart */}
        <VcoPanel>
          <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
            <h2
              className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
            >
              Revenue
            </h2>
            <span
              className="text-[10.5px] uppercase tracking-[0.06em]"
              style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
            >
              Last 7 days
            </span>
          </div>
          <div className="p-5">
            <div className="flex items-end gap-2" style={{ height: 120 }}>
              {barData.map((b, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-[4px_4px_0_0] transition-all"
                    style={{
                      height: `${b.h}%`,
                      background: b.hi ? "var(--primary)" : "var(--muted)",
                    }}
                  />
                </div>
              ))}
            </div>
            <div
              className="mt-2 flex gap-2 text-center text-[10px]"
              style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
            >
              {barData.map((b, i) => (
                <div key={i} className="flex-1" style={{ color: b.hi ? "var(--primary)" : undefined }}>
                  {b.day}
                </div>
              ))}
            </div>
          </div>
        </VcoPanel>

        {/* Technician roster */}
        <VcoPanel>
          <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
            <h2
              className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
            >
              Technicians
            </h2>
            <span
              className="text-[10.5px] uppercase tracking-[0.06em]"
              style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
            >
              On shift
            </span>
          </div>
          <div className="space-y-1 p-3">
            {teamMembers.map((t) => (
              <div
                key={t.id}
                className="grid items-center gap-2.5 rounded-[10px] border border-border bg-background px-3.5 py-3"
                style={{ gridTemplateColumns: "28px 1fr auto" }}
              >
                {/* Avatar */}
                <div
                  className="grid size-7 place-items-center rounded-full text-[11px] font-semibold text-primary-foreground"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    background: "linear-gradient(135deg, var(--primary), color-mix(in oklab, var(--primary) 40%, var(--muted)))",
                  }}
                >
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                {/* Name + bay */}
                <div>
                  <p className="text-[12.5px] text-foreground">{t.name}</p>
                  <p
                    className="text-[10.5px]"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                  >
                    {t.jobs} jobs · {t.avg}
                  </p>
                </div>
                {/* Status */}
                <StatusBadge status={t.status} />
              </div>
            ))}
          </div>
        </VcoPanel>
      </div>
    </div>
  )
}

