import { Link } from "react-router-dom"

import { VcoCheckRow, VcoJobHeader } from "@/components/technician/technician-surfaces"
import { VcoPanel } from "@/components/operator/operator-surfaces"
import { StatusBadge } from "@/components/shared/status-badge"
import { getServiceById, getVehicleById, teamMembers } from "@/data/mock"
import { getTechnicianBookings, useAppStore } from "@/store/customer-store"

// ── Technician Today ───────────────────────────────────────────────────
export function TechnicianTodayPage() {
  const { allBookings } = useAppStore()

  const myJobs = getTechnicianBookings(allBookings).map((b) => ({
    ...b,
    vehicleName: getVehicleById(b.vehicleId)?.name ?? b.vehicleId,
    plate: getVehicleById(b.vehicleId)?.plate ?? "",
    serviceName: getServiceById(b.serviceId)?.name ?? b.serviceId,
  }))

  const active    = myJobs.filter((b) => b.status === "In progress")
  const queued    = myJobs.filter((b) => b.status === "Assigned" || b.status === "Confirmed")
  const completed = myJobs.filter((b) => b.status === "Completed")

  const doneCount = completed.length
  const totalCount = myJobs.length

  return (
    <div className="space-y-5">

      {/* Header */}
      <div>
        <p
          className="text-[11px]"
          style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
        >
          Rafael M. · Today
        </p>
        <h1
          className="mt-1 text-[34px] leading-[1.05] tracking-[-0.02em] text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Your <em>day</em>
        </h1>
      </div>

      {/* Progress bar */}
      <div className="rounded-[14px] border border-border bg-card px-5 py-4">
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-[11px] uppercase tracking-[0.08em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
          >
            Progress
          </span>
          <span
            className="text-[11px]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--primary)" }}
          >
            {doneCount} / {totalCount} jobs
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full" style={{ background: "var(--muted)" }}>
          <div
            className="h-1.5 rounded-full transition-all"
            style={{
              width: totalCount > 0 ? `${(doneCount / totalCount) * 100}%` : "0%",
              background: "var(--primary)",
            }}
          />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            { label: "Active",    value: active.length,    accent: true  },
            { label: "Queued",    value: queued.length,    accent: false },
            { label: "Done",      value: completed.length, accent: false },
          ].map((tile) => (
            <div key={tile.label} className="rounded-[10px] border border-border bg-background py-2">
              <p
                className="text-[18px] leading-none"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  color: tile.accent ? "var(--primary)" : "var(--foreground)",
                }}
              >
                {tile.value}
              </p>
              <p
                className="mt-1 text-[9.5px] uppercase tracking-[0.07em]"
                style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
              >
                {tile.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Active now */}
      {active.length > 0 && (
        <div>
          <p
            className="mb-2 text-[10px] uppercase tracking-[0.1em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--primary)" }}
          >
            Active now
          </p>
          {active.map((job) => (
            <Link key={job.id} to={`/technician/jobs/${job.id}`}>
              <div
                className="rounded-[14px] border px-4 py-3.5 transition"
                style={{
                  borderColor: "color-mix(in oklab, var(--primary) 40%, transparent)",
                  background: "color-mix(in oklab, var(--primary) 6%, var(--card))",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-foreground">{job.serviceName}</p>
                    <p
                      className="mt-0.5 text-[10.5px]"
                      style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                    >
                      {job.vehicleName} · {job.plate}
                    </p>
                    <p
                      className="mt-0.5 text-[10.5px]"
                      style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                    >
                      {job.time} · {job.location}
                    </p>
                  </div>
                  <StatusBadge status={job.status} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Up next */}
      {queued.length > 0 && (
        <div>
          <p
            className="mb-2 text-[10px] uppercase tracking-[0.1em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
          >
            Up next
          </p>
          <div className="space-y-1.5">
            {queued.map((job) => (
              <Link key={job.id} to={`/technician/jobs/${job.id}`}>
                <div className="rounded-[14px] border border-border bg-card px-4 py-3.5 transition hover:bg-muted">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[14px] font-medium text-foreground">{job.serviceName}</p>
                      <p
                        className="mt-0.5 text-[10.5px]"
                        style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                      >
                        {job.vehicleName} · {job.plate}
                      </p>
                      <p
                        className="mt-0.5 text-[10.5px]"
                        style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                      >
                        {job.time} · {job.location}
                      </p>
                    </div>
                    <StatusBadge status={job.status} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Completed today */}
      {completed.length > 0 && (
        <div>
          <p
            className="mb-2 text-[10px] uppercase tracking-[0.1em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
          >
            Completed today
          </p>
          <div className="space-y-1.5">
            {completed.map((job) => (
              <div key={job.id} className="rounded-[14px] border border-border bg-card px-4 py-3.5 opacity-60">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-foreground line-through decoration-[var(--fg-3)]">
                      {job.serviceName}
                    </p>
                    <p
                      className="mt-0.5 text-[10.5px]"
                      style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                    >
                      {job.vehicleName} · {job.time}
                    </p>
                  </div>
                  <StatusBadge status={job.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {myJobs.length === 0 && (
        <div className="rounded-[14px] border border-border bg-card px-5 py-10 text-center">
          <p
            className="text-[11px] uppercase tracking-[0.08em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
          >
            No jobs assigned today
          </p>
        </div>
      )}
    </div>
  )
}

// ── Completed Jobs ─────────────────────────────────────────────────────
export function TechnicianCompletedJobsPage() {
  const { allBookings } = useAppStore()
  const completedJobs = getTechnicianBookings(allBookings)
    .filter((b) => b.status === "Completed")
    .map((b) => ({
      ...b,
      vehicleName: getVehicleById(b.vehicleId)?.name ?? b.vehicleId,
      plate: getVehicleById(b.vehicleId)?.plate ?? "",
      serviceName: getServiceById(b.serviceId)?.name ?? b.serviceId,
    }))

  return (
    <div className="space-y-4">
      <div>
        <p
          className="text-[10.5px] uppercase tracking-[0.1em]"
          style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
        >
          Technician · Completed
        </p>
        <h1
          className="mt-1 text-[32px] leading-none tracking-[-0.025em] text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Completed <em>Today</em>
        </h1>
      </div>

      <VcoPanel>
        <div className="border-b border-border px-5 py-3.5">
          <div className="flex items-center justify-between">
            <h2
              className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
            >
              Jobs
            </h2>
            <span
              className="text-[10.5px] uppercase tracking-[0.06em]"
              style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
            >
              {completedJobs.length} completed
            </span>
          </div>
        </div>
        <div className="space-y-1 p-3">
          {completedJobs.map((entry) => (
            <div
              key={entry.id}
              className="flex items-start justify-between gap-3 rounded-[10px] border border-border bg-background px-3.5 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-foreground">{entry.serviceName}</p>
                <p
                  className="mt-0.5 text-[10.5px]"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                >
                  {entry.vehicleName} · {entry.time}
                </p>
              </div>
              <StatusBadge status={entry.status} />
            </div>
          ))}
          {completedJobs.length === 0 && (
            <div className="px-3.5 py-6 text-center">
              <p
                className="text-[11px] uppercase tracking-[0.06em]"
                style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
              >
                No completed jobs today
              </p>
            </div>
          )}
        </div>
      </VcoPanel>

      {/* Summary tiles */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Completed", value: String(completedJobs.length) },
          { label: "Avg time", value: teamMembers[0]?.avg ?? "—" },
          { label: "Shift", value: "On shift" },
        ].map((tile) => (
          <div key={tile.label} className="rounded-[14px] border border-border bg-card p-4">
            <p
              className="text-[10px] uppercase tracking-[0.08em]"
              style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
            >
              {tile.label}
            </p>
            <p
              className="mt-2 text-[22px] leading-none tracking-[-0.02em] text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {tile.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Technician Profile ─────────────────────────────────────────────────
export function TechnicianProfilePage() {
  const profile = teamMembers[0]

  return (
    <div className="space-y-4">
      <div>
        <p
          className="text-[10.5px] uppercase tracking-[0.1em]"
          style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
        >
          Technician · Profile
        </p>
        <h1
          className="mt-1 text-[32px] leading-none tracking-[-0.025em] text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          {profile.name}
        </h1>
      </div>

      {/* Focus profile card */}
      <div
        className="relative overflow-hidden rounded-[14px] border border-border"
        style={{
          background: "var(--card)",
          boxShadow: "0 0 0 1px color-mix(in oklab, var(--primary) 20%, transparent)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
          style={{
            background: "radial-gradient(60% 80% at 50% 100%, color-mix(in oklab, var(--primary) 14%, transparent), transparent)",
          }}
        />
        <div className="relative">
          <VcoJobHeader
            jobLabel={`Tech · ${profile.id}`}
            techName={profile.name}
            avatar={profile.name.split(" ").map((n) => n[0]).join("")}
          />
          <div className="p-5">
            <div className="flex items-center gap-2.5">
              <StatusBadge status={profile.status} />
              <span
                className="text-[11px]"
                style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
              >
                {profile.jobs} jobs assigned
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance tiles */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-[14px] border border-border bg-card p-4">
          <p
            className="text-[10px] uppercase tracking-[0.08em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
          >
            Avg time
          </p>
          <p
            className="mt-2 text-[22px] leading-none tracking-[-0.02em] text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {profile.avg}
          </p>
        </div>
        <div className="rounded-[14px] border border-border bg-card p-4">
          <p
            className="text-[10px] uppercase tracking-[0.08em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
          >
            Jobs today
          </p>
          <p
            className="mt-2 text-[22px] leading-none tracking-[-0.02em] text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {profile.jobs}
          </p>
        </div>
        <div className="rounded-[14px] border border-border bg-card p-4">
          <p
            className="text-[10px] uppercase tracking-[0.08em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
          >
            Status
          </p>
          <p
            className="mt-2 text-[14px] leading-none tracking-[-0.01em]"
            style={{ fontFamily: "'Instrument Serif', serif", color: "var(--primary)" }}
          >
            {profile.status}
          </p>
        </div>
      </div>

      {/* Checklist sample */}
      <VcoPanel>
        <div className="border-b border-border px-5 py-3.5">
          <h2
            className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            Standard checklist
          </h2>
        </div>
        <div className="px-5 py-2">
          {[
            "Foam pre-wash",
            "Wheel and tire detail",
            "Two-bucket hand wash",
            "Interior vacuum",
            "Final gloss and delivery",
          ].map((item, idx) => (
            <VcoCheckRow key={item} label={item} done={idx < 2} />
          ))}
        </div>
      </VcoPanel>
    </div>
  )
}

