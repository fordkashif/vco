import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons"

import {
  VcoCheckRow,
  VcoJobHeader,
  VcoPhotoSlot,
} from "@/components/technician/technician-surfaces"
import { VcoPanel } from "@/components/operator/operator-surfaces"
import { StatusBadge } from "@/components/shared/status-badge"
import { useAppStore } from "@/store/customer-store"
import { getCustomerById, getServiceById, getVehicleById } from "@/data/mock"
import type { BookingStatus } from "@/data/mock"

// ── Checklist items for each service type ─────────────────────────────

const BASE_CHECKLIST = [
  "Foam pre-wash",
  "Wheel and tyre detail",
  "Hand wash",
  "Rinse and clay bar",
  "Blow dry and wipe-down",
]

const INTERIOR_STEPS = [
  "Interior vacuum",
  "Leather conditioning",
  "Dashboard and trim wipe",
  "Glass clean — interior",
  "Final scent and delivery",
]

// ── Status action logic ────────────────────────────────────────────────

type Action = { label: string; next: BookingStatus; primary: boolean }

function getActions(status: BookingStatus): Action[] {
  switch (status) {
    case "Confirmed":
    case "Assigned":
      return [
        { label: "Start job", next: "In progress", primary: true },
      ]
    case "In progress":
      return [
        { label: "Mark ready for pickup", next: "Ready", primary: true },
      ]
    case "Ready":
      return [
        { label: "Mark complete", next: "Completed", primary: true },
      ]
    default:
      return []
  }
}

// ── Page ──────────────────────────────────────────────────────────────

export function TechnicianJobPage() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const { allBookings, updateBookingStatus } = useAppStore()

  // Resolve booking — fall back to first Rafael M. job if no param
  const booking =
    allBookings.find((b) => b.id === bookingId) ??
    allBookings.find((b) => b.technician === "Rafael M.") ??
    allBookings[0]

  const vehicle = getVehicleById(booking.vehicleId)
  const service = getServiceById(booking.serviceId)
  const customer = getCustomerById(booking.customerId)

  // Checklist — local interactive state, pre-fill done items by status
  const checklistItems = [
    ...BASE_CHECKLIST,
    ...(booking.addons.length > 0 ? INTERIOR_STEPS.slice(0, 2) : []),
  ]

  const initialDone = ((): boolean[] => {
    if (booking.status === "Ready" || booking.status === "Completed") {
      return checklistItems.map(() => true)
    }
    if (booking.status === "In progress") {
      return checklistItems.map((_, i) => i < 2)
    }
    return checklistItems.map(() => false)
  })()

  const [checklist, setChecklist] = useState<boolean[]>(initialDone)

  function toggleItem(idx: number) {
    setChecklist((prev) => prev.map((v, i) => (i === idx ? !v : v)))
  }

  const doneCount = checklist.filter(Boolean).length
  const allDone = doneCount === checklist.length
  const actions = getActions(booking.status)
  const isComplete = booking.status === "Completed"

  function handleAction(next: BookingStatus) {
    updateBookingStatus(booking.id, next)
    if (next === "In progress") {
      setChecklist(checklistItems.map((_, i) => i < 2))
    }
    if (next === "Ready" || next === "Completed") {
      setChecklist(checklistItems.map(() => true))
    }
  }

  return (
    <div className="space-y-4">

      {/* Page header */}
      <div className="flex items-start gap-3">
        <button
          onClick={() => navigate("/technician/today")}
          className="mt-1 flex-shrink-0"
          style={{ color: "var(--fg-3)" }}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={20} strokeWidth={1.6} />
        </button>
        <div className="flex-1 min-w-0">
          <p
            className="text-[10.5px] uppercase tracking-[0.1em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
          >
            Technician · {booking.id}
          </p>
          <h1
            className="mt-1 text-[28px] leading-none tracking-[-0.025em] text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            {service?.name ?? "Service"}
          </h1>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      {/* Completed state */}
      {isComplete && (
        <div
          className="flex flex-col items-center gap-3 rounded-[16px] border border-border py-10 text-center"
          style={{ background: "var(--card)" }}
        >
          <HugeiconsIcon
            icon={CheckmarkCircle01Icon}
            size={44}
            strokeWidth={1.3}
            primaryColor="var(--primary)"
          />
          <p
            className="text-[18px] tracking-[-0.01em]"
            style={{ fontFamily: "'Instrument Serif', serif", color: "var(--foreground)" }}
          >
            Job <em>complete</em>
          </p>
          <p
            className="text-[10.5px] uppercase tracking-[0.08em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
          >
            {customer?.name} has been notified
          </p>
        </div>
      )}

      <div className="grid gap-4 xl:grid-cols-[340px_1fr]">

        {/* ── Left: job focus card ───────────────────────────────── */}
        <div
          className="relative overflow-hidden rounded-[14px] border border-border"
          style={{
            background: "var(--card)",
            boxShadow: isComplete
              ? "none"
              : "0 0 0 1px color-mix(in oklab, var(--primary) 20%, transparent)",
          }}
        >
          {!isComplete && (
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
              style={{
                background:
                  "radial-gradient(60% 80% at 50% 100%, color-mix(in oklab, var(--primary) 16%, transparent), transparent)",
              }}
            />
          )}

          <div className="relative">
            <VcoJobHeader
              jobLabel={`${booking.id} · ${booking.time}`}
              techName={booking.technician}
              avatar={booking.technician.split(" ").map((n) => n[0]).join("")}
            />

            <div className="p-5 space-y-4">
              {/* Vehicle */}
              <div className="rounded-[10px] border border-border bg-background px-4 py-3">
                <p
                  className="text-[10px] uppercase tracking-[0.08em]"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                >
                  Vehicle
                </p>
                <p className="mt-1.5 text-[16px] font-medium text-foreground">
                  {vehicle?.name ?? booking.vehicleId}
                </p>
                <p
                  className="mt-0.5 text-[10.5px]"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                >
                  {vehicle?.plate ?? "—"} · {vehicle?.color?.toUpperCase() ?? "—"}
                </p>
              </div>

              {/* Service + add-ons */}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-[10px] border border-border bg-background px-3.5 py-3">
                  <p
                    className="text-[10px] uppercase tracking-[0.08em]"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                  >
                    Package
                  </p>
                  <p className="mt-1 text-[12.5px] font-medium text-foreground">
                    {service?.name ?? "—"}
                  </p>
                  <p
                    className="mt-0.5 text-[10px]"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                  >
                    {service?.duration ?? "—"}
                  </p>
                </div>
                <div className="rounded-[10px] border border-border bg-background px-3.5 py-3">
                  <p
                    className="text-[10px] uppercase tracking-[0.08em]"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                  >
                    Add-ons
                  </p>
                  <p className="mt-1 text-[12.5px] font-medium text-foreground">
                    {booking.addons.length > 0 ? booking.addons.length : "None"}
                  </p>
                </div>
              </div>

              {/* Customer note */}
              {booking.notes && (
                <div className="rounded-[10px] border border-border bg-muted px-3.5 py-3">
                  <p
                    className="mb-1.5 text-[10px] uppercase tracking-[0.08em]"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                  >
                    Customer note
                  </p>
                  <p className="text-[12px] leading-relaxed text-muted-foreground">
                    {booking.notes}
                  </p>
                </div>
              )}

              {/* Location + amount */}
              <div className="flex items-center justify-between">
                <p
                  className="text-[10.5px]"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                >
                  {booking.location}
                </p>
                <p
                  className="text-[12px] font-medium"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "var(--primary)" }}
                >
                  {booking.amount}
                </p>
              </div>

              {/* Checklist progress mini-bar */}
              {!isComplete && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <p
                      className="text-[9.5px] uppercase tracking-[0.08em]"
                      style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                    >
                      Checklist
                    </p>
                    <p
                      className="text-[9.5px]"
                      style={{ fontFamily: "'Outfit', sans-serif", color: allDone ? "var(--primary)" : "var(--fg-3)" }}
                    >
                      {doneCount} / {checklist.length}
                    </p>
                  </div>
                  <div className="h-1 rounded-full" style={{ background: "var(--muted)" }}>
                    <div
                      className="h-1 rounded-full transition-all duration-300"
                      style={{
                        width: `${(doneCount / checklist.length) * 100}%`,
                        background: "var(--primary)",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Action buttons */}
              {!isComplete && actions.length > 0 && (
                <div className="space-y-2 pt-1">
                  {actions.map((action) => (
                    <button
                      key={action.next}
                      onClick={() => handleAction(action.next)}
                      className="w-full rounded-full py-2.5 text-[13px] font-medium transition hover:opacity-90 active:scale-[0.98]"
                      style={{
                        background: action.primary ? "var(--primary)" : "var(--muted)",
                        color: action.primary ? "var(--primary-foreground)" : "var(--foreground)",
                      }}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Right: checklist + add-ons + photos ───────────────── */}
        <div className="space-y-4">

          {/* Interactive checklist */}
          <VcoPanel>
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
              <h2
                className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
              >
                Checklist
              </h2>
              <span
                className="text-[10.5px] uppercase tracking-[0.06em]"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: allDone ? "var(--primary)" : "var(--fg-3)",
                }}
              >
                {doneCount}/{checklist.length} done
              </span>
            </div>
            <div className="px-5 py-2">
              {checklistItems.map((label, idx) => (
                <button
                  key={label}
                  onClick={() => toggleItem(idx)}
                  className="w-full text-left"
                  disabled={isComplete}
                >
                  <VcoCheckRow label={label} done={checklist[idx]} />
                </button>
              ))}
            </div>
          </VcoPanel>

          {/* Add-ons */}
          {booking.addons.length > 0 && (
            <VcoPanel>
              <div className="border-b border-border px-5 py-3.5">
                <h2
                  className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
                  style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
                >
                  Add-ons
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 p-4">
                {booking.addons.map((addon) => (
                  <span
                    key={addon}
                    className="rounded-full border border-border px-3 py-1 text-[11.5px] text-muted-foreground"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {addon}
                  </span>
                ))}
              </div>
            </VcoPanel>
          )}

          {/* Photos */}
          <VcoPanel>
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
              <h2
                className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
              >
                Photos
              </h2>
              <span
                className="text-[10.5px] uppercase tracking-[0.06em]"
                style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
              >
                Before / after
              </span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-4">
                <VcoPhotoSlot label="Before" />
                <VcoPhotoSlot label="Before" />
                <VcoPhotoSlot label="After" />
                <VcoPhotoSlot add />
              </div>
            </div>
          </VcoPanel>
        </div>
      </div>
    </div>
  )
}

