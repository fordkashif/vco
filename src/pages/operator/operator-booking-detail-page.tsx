import { useParams } from "react-router-dom"

import { VcoPanel, VcoRow } from "@/components/operator/operator-surfaces"
import { StatusBadge } from "@/components/shared/status-badge"
import { bookingTimeline, bookings, getBookingById, getBookingDisplay } from "@/data/mock"

export function OperatorBookingDetailPage() {
  const { bookingId } = useParams()
  const booking = getBookingById(bookingId ?? "") ?? bookings[0]
  const entry = getBookingDisplay(booking)

  return (
    <div className="space-y-4">

      {/* Page header */}
      <div className="flex items-end justify-between">
        <div>
          <p
            className="text-[10.5px] uppercase tracking-[0.1em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
          >
            Bookings · {entry.id}
          </p>
          <h1
            className="mt-1 text-[32px] leading-none tracking-[-0.025em] text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            {entry.serviceName}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-full border border-border px-4 py-2 text-[13px] text-foreground transition hover:bg-card"
          >
            Reschedule
          </button>
          <button
            className="rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition hover:opacity-90"
          >
            Reassign
          </button>
        </div>
      </div>

      {/* Status + amount KPIs */}
      <div className="flex items-center gap-3">
        <StatusBadge status={entry.status} />
        <StatusBadge status={entry.paymentStatus} />
        <span
          className="ml-auto text-[13px] font-medium text-foreground"
        >
          {entry.amount}
        </span>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">

        {/* Left */}
        <div className="space-y-4">

          {/* Timeline */}
          <VcoPanel>
            <div className="border-b border-border px-5 py-3.5">
              <h2
                className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
              >
                Timeline
              </h2>
            </div>
            <div className="grid gap-1 p-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              {bookingTimeline.map((step) => (
                <div
                  key={step.label}
                  className="rounded-[10px] border px-4 py-3 text-[12.5px]"
                  style={{
                    borderColor: step.done ? "color-mix(in oklab, var(--primary) 40%, transparent)" : "var(--border)",
                    background: step.done
                      ? "color-mix(in oklab, var(--primary) 8%, var(--background))"
                      : "var(--background)",
                    color: step.done ? "var(--foreground)" : "var(--muted-foreground)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block size-1.5 rounded-full flex-shrink-0"
                      style={{ background: step.done ? "var(--primary)" : "var(--border)" }}
                    />
                    {step.label}
                  </div>
                </div>
              ))}
            </div>
          </VcoPanel>

          {/* Customer + vehicle */}
          <div className="grid gap-4 md:grid-cols-2">
            <VcoPanel>
              <div className="border-b border-border px-5 py-3.5">
                <h2
                  className="text-[18px] leading-none tracking-[-0.02em] text-foreground"
                  style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
                >
                  Customer
                </h2>
              </div>
              <div className="divide-y divide-border">
                {[
                  { label: "Name", value: entry.customerName },
                  { label: "Email", value: entry.customerEmail },
                  { label: "Phone", value: entry.customerPhone },
                  { label: "Membership", value: entry.membership },
                ].map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-3 px-5 py-2.5">
                    <span
                      className="flex-shrink-0 text-[10.5px] uppercase tracking-[0.06em]"
                      style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                    >
                      {row.label}
                    </span>
                    <span className="text-right text-[12.5px] text-foreground">{row.value}</span>
                  </div>
                ))}
              </div>
            </VcoPanel>

            <VcoPanel>
              <div className="border-b border-border px-5 py-3.5">
                <h2
                  className="text-[18px] leading-none tracking-[-0.02em] text-foreground"
                  style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
                >
                  Vehicle & timing
                </h2>
              </div>
              <div className="divide-y divide-border">
                {[
                  { label: "Vehicle", value: entry.vehicleName },
                  { label: "Plate", value: entry.plate },
                  { label: "Color", value: entry.color },
                  { label: "Time", value: `${entry.dateLabel} · ${entry.time}` },
                  { label: "Location", value: entry.location },
                ].map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-3 px-5 py-2.5">
                    <span
                      className="flex-shrink-0 text-[10.5px] uppercase tracking-[0.06em]"
                      style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                    >
                      {row.label}
                    </span>
                    <span className="text-right text-[12.5px] text-foreground">{row.value}</span>
                  </div>
                ))}
              </div>
            </VcoPanel>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-4">

          {/* Assignment */}
          <VcoPanel>
            <div className="border-b border-border px-5 py-3.5">
              <h2
                className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
              >
                Assignment
              </h2>
            </div>
            <div className="p-4 space-y-2">
              <VcoRow>
                <p
                  className="text-[10px] uppercase tracking-[0.08em]"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                >
                  Technician
                </p>
                <p className="mt-1.5 text-[13px] font-medium text-foreground">{entry.technician}</p>
              </VcoRow>
              <VcoRow>
                <p
                  className="text-[10px] uppercase tracking-[0.08em]"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                >
                  Payment
                </p>
                <div className="mt-1.5 flex items-center justify-between">
                  <StatusBadge status={entry.paymentStatus} />
                  <span
                    className="text-[13px] font-medium"
                    style={{ color: "var(--primary)" }}
                  >
                    {entry.amount}
                  </span>
                </div>
              </VcoRow>
            </div>
          </VcoPanel>

          {/* Package + notes */}
          <VcoPanel>
            <div className="border-b border-border px-5 py-3.5">
              <h2
                className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
              >
                Service
              </h2>
            </div>
            <div className="p-4 space-y-3">
              <VcoRow>
                <p className="text-[13px] font-medium text-foreground">{entry.serviceName}</p>
                <p
                  className="mt-1 text-[10.5px]"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                >
                  {entry.serviceDuration} · {entry.servicePrice}
                </p>
                {entry.addons.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {entry.addons.map((addon) => (
                      <span
                        key={addon}
                        className="rounded-full border border-border px-2.5 py-0.5 text-[10.5px] text-muted-foreground"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {addon}
                      </span>
                    ))}
                  </div>
                )}
              </VcoRow>

              {entry.notes && (
                <div className="rounded-[10px] border border-border bg-muted px-3.5 py-3">
                  <p
                    className="mb-1.5 text-[10px] uppercase tracking-[0.08em]"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                  >
                    Notes
                  </p>
                  <p className="text-[12px] leading-relaxed text-muted-foreground">{entry.notes}</p>
                </div>
              )}
            </div>
          </VcoPanel>

          {/* Actions */}
          <div className="space-y-2">
            <button
              className="w-full rounded-full border border-border py-2.5 text-[13px] text-muted-foreground transition hover:bg-card"
            >
              Cancel booking
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

