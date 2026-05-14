import { Link, useNavigate, useParams } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Location01Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons"

import {
  VcoInfoTile,
  VcoListRow,
} from "@/components/customer/customer-surfaces"
import { StatusBadge } from "@/components/shared/status-badge"
import {
  BOOKING_TIMELINE,
  PRIMARY_CUSTOMER_ID,
  colorToHex,
  getActiveBooking,
  getCompletedBookings,
  getUpcomingBooking,
  useCustomerStore,
} from "@/store/customer-store"
import { customers, getCustomerById, getServiceById } from "@/data/mock"
import type { BookingRecord, VehicleRecord } from "@/data/mock"

// ── Helpers ────────────────────────────────────────────────────────────

function MonoLabel({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <p
      className="text-[10px] uppercase tracking-[0.12em]"
      style={{
        fontFamily: "'Outfit', sans-serif",
        color: accent ? "var(--primary)" : "var(--fg-3)",
      }}
    >
      {children}
    </p>
  )
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55
}

function EmptyIllustration({
  kind,
}: {
  kind: "garage" | "vehicles" | "history"
}) {
  if (kind === "history") {
    return (
      <svg
        viewBox="0 0 320 180"
        className="h-auto w-[220px]"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="56" y="52" width="128" height="90" rx="12" opacity="0.35" />
          <rect x="86" y="36" width="128" height="90" rx="12" opacity="0.6" />
          <rect x="116" y="20" width="128" height="90" rx="12" />
          <path d="M138 48h84M138 64h84M138 80h54" opacity="0.75" />
          <circle cx="132" cy="49" r="3" fill="currentColor" />
          <circle cx="132" cy="65" r="3" fill="currentColor" />
          <circle cx="132" cy="81" r="3" fill="currentColor" />
        </g>
      </svg>
    )
  }

  if (kind === "vehicles") {
    return (
      <svg
        viewBox="0 0 320 180"
        className="h-auto w-[220px]"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="38" y="26" width="244" height="128" rx="18" opacity="0.35" />
          <path d="M72 122h176" opacity="0.45" />
          <path d="M95 108l15-38c2-6 8-10 14-10h70c6 0 12 4 14 10l15 38" />
          <rect x="88" y="108" width="144" height="20" rx="10" />
          <circle cx="120" cy="128" r="8" />
          <circle cx="200" cy="128" r="8" />
          <path d="M124 74h24M156 74h40" opacity="0.7" />
        </g>
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 320 180"
      className="h-auto w-[220px]"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="24" y="22" width="272" height="136" rx="18" opacity="0.35" />
        <path d="M58 130h204" opacity="0.45" />
        <path d="M102 112l13-34c2-5 7-8 12-8h66c5 0 10 3 12 8l13 34" />
        <rect x="95" y="112" width="130" height="18" rx="9" />
        <circle cx="123" cy="130" r="7" />
        <circle cx="197" cy="130" r="7" />
        <path d="M130 82h20M156 82h34" opacity="0.7" />
      </g>
    </svg>
  )
}

// ── Vehicle hero card — used on home + vehicles page ──────────────────

function VehicleHeroCard({
  vehicle,
  to,
  compact = false,
}: {
  vehicle: VehicleRecord
  to: string
  compact?: boolean
}) {
  const hex = colorToHex(vehicle.color)
  const light = isLightColor(hex)
  const textColor = light ? "rgba(0,0,0,0.85)" : "#ffffff"
  const subColor = light ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.5)"

  return (
    <Link to={to} className="block">
      <div
        className="relative overflow-hidden transition active:scale-[0.99]"
        style={{
          borderRadius: 20,
          minHeight: compact ? 120 : 164,
          background: `linear-gradient(140deg, ${hex} 0%, color-mix(in oklab, ${hex} 55%, var(--card)) 55%, var(--card) 100%)`,
          border: "1px solid color-mix(in oklab, var(--border) 50%, transparent)",
        }}
      >
        {/* Plate badge */}
        <div className="absolute top-4 right-4">
          {vehicle.plate ? (
            <span
              className="rounded-[6px] px-2.5 py-1 text-[10px] tracking-[0.12em] uppercase"
              style={{
                fontFamily: "'Outfit', sans-serif",
                background: "rgba(0,0,0,0.35)",
                color: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(8px)",
              }}
            >
              {vehicle.plate}
            </span>
          ) : null}
        </div>

        {/* Status pill */}
        <div className="absolute top-4 left-4">
          <span
            className="rounded-full px-2.5 py-1 text-[9px] tracking-[0.1em] uppercase"
            style={{
              fontFamily: "'Outfit', sans-serif",
              background: "rgba(0,0,0,0.3)",
              color: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(8px)",
            }}
          >
            {vehicle.status}
          </span>
        </div>

        {/* Name */}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
          <p
            className="text-[11px] uppercase tracking-[0.08em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: subColor }}
          >
            {vehicle.year}
          </p>
          <p
            className="mt-0.5 leading-none tracking-[-0.02em]"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: compact ? 22 : 26,
              fontWeight: 400,
              color: textColor,
              textShadow: "0 1px 12px rgba(0,0,0,0.4)",
            }}
          >
            {vehicle.make} <em>{vehicle.model}</em>
          </p>
        </div>

        {/* Arrow */}
        <div className="absolute bottom-5 right-5">
          <div
            className="flex size-8 items-center justify-center rounded-full"
            style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)" }}
          >
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={14}
              primaryColor="rgba(255,255,255,0.8)"
              strokeWidth={1.8}
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Home page states ───────────────────────────────────────────────────

function EmptyGarageState({ firstName }: { firstName: string }) {
  return (
    <div className="space-y-5">
      <div>
        <MonoLabel>Home</MonoLabel>
        <h1
          className="mt-1 leading-none tracking-[-0.03em]"
          style={{ fontFamily: "'Instrument Serif', serif", fontSize: 38, fontWeight: 400, color: "var(--foreground)" }}
        >
          Welcome, <em>{firstName}</em>
        </h1>
      </div>
      <div className="flex min-h-[58vh] items-center justify-center px-6">
        <div className="flex flex-col items-center justify-center gap-5 text-center">
          <div style={{ color: "color-mix(in oklab, var(--primary) 55%, var(--fg-3))" }}>
            <EmptyIllustration kind="garage" />
          </div>
          <div>
            <p
              className="text-[22px] tracking-[-0.02em]"
              style={{ fontFamily: "'Instrument Serif', serif", color: "var(--foreground)", fontWeight: 400 }}
            >
              Your garage is empty
            </p>
            <p className="mt-1.5 text-[13px]" style={{ color: "var(--muted-foreground)" }}>
              Add a vehicle to start booking premium care
            </p>
          </div>
          <Link to="/customer/vehicles/new">
            <button
              className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-[14px] font-medium transition hover:opacity-90 active:scale-[0.98]"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              Add your first vehicle
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const SERVICE_STEPS_SHORT = ["Foam", "Hand wash", "Wheels", "Dry", "Interior"]

function getStepsDone(status: BookingRecord["status"]): number {
  if (status === "Ready") return SERVICE_STEPS_SHORT.length
  if (status === "In progress") return 3
  if (status === "Assigned") return 1
  return 0
}

function ActiveServiceState({
  booking,
  vehicle,
  service,
  vehicles,
}: {
  booking: BookingRecord
  vehicle: VehicleRecord | undefined
  service: ReturnType<typeof getServiceById>
  vehicles: VehicleRecord[]
}) {
  const stepsDone = getStepsDone(booking.status)
  const isReady = booking.status === "Ready"

  return (
    <div className="space-y-5 pt-2">
      {/* Live badge + heading */}
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1"
          style={{
            background: isReady
              ? "color-mix(in oklab, var(--primary) 15%, transparent)"
              : "color-mix(in oklab, var(--primary) 10%, transparent)",
            border: "1px solid color-mix(in oklab, var(--primary) 40%, transparent)",
          }}
        >
          <span
            className="size-1.5 rounded-full flex-shrink-0"
            style={{
              background: "var(--primary)",
              boxShadow: isReady ? "none" : "0 0 6px var(--primary)",
            }}
          />
          <span
            className="text-[9.5px] uppercase tracking-[0.12em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--primary)" }}
          >
            {isReady ? "Ready for pickup" : "Live · In service"}
          </span>
        </div>

        <h1
          className="leading-[1.02] tracking-[-0.03em]"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 42,
            fontWeight: 400,
            color: "var(--foreground)",
          }}
        >
          {isReady ? (
            <>Your car is <em style={{ color: "var(--primary)" }}>ready</em></>
          ) : (
            <>Your<br /><em>{service?.name ?? "service"}</em><br />is in progress</>
          )}
        </h1>
      </div>

      {/* Live tracking card */}
      <div
        className="overflow-hidden"
        style={{
          borderRadius: 20,
          border: `1px solid ${isReady
            ? "color-mix(in oklab, var(--primary) 50%, transparent)"
            : "color-mix(in oklab, var(--primary) 25%, transparent)"}`,
          background: isReady
            ? "color-mix(in oklab, var(--primary) 12%, var(--card))"
            : "var(--card)",
          boxShadow: isReady
            ? "0 0 48px -12px color-mix(in oklab, var(--primary) 30%, transparent)"
            : "none",
        }}
      >
        {/* Tech + location bar */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: "color-mix(in oklab, var(--border) 50%, transparent)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex size-9 items-center justify-center rounded-full text-[12px] font-semibold flex-shrink-0"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {booking.technician.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="text-[13px] font-medium text-foreground">{booking.technician}</p>
              <p
                className="text-[10px] uppercase tracking-[0.07em]"
                style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
              >
                {booking.location.split(" ")[0]}
              </p>
            </div>
          </div>
          {!isReady && (
            <span
              className="text-[11px]"
              style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
            >
              ETA 14 min
            </span>
          )}
        </div>

        {/* Horizontal progress track */}
        <div className="px-5 py-6">
          <div className="flex items-start">
            {SERVICE_STEPS_SHORT.map((step, i) => {
              const done = i < stepsDone
              const active = i === stepsDone && !isReady
              return (
                <div key={step} className="flex flex-1 flex-col items-center">
                  <div className="flex w-full items-center">
                    {i > 0 && (
                      <div
                        className="flex-1 h-px"
                        style={{ background: i <= stepsDone ? "var(--primary)" : "var(--border)" }}
                      />
                    )}
                    <div
                      className="flex-shrink-0 rounded-full transition-all"
                      style={{
                        width: active ? 14 : 10,
                        height: active ? 14 : 10,
                        background: done || isReady
                          ? "var(--primary)"
                          : active
                          ? "var(--primary)"
                          : "var(--border)",
                        boxShadow: active ? "0 0 10px var(--primary)" : "none",
                      }}
                    />
                    {i < SERVICE_STEPS_SHORT.length - 1 && (
                      <div
                        className="flex-1 h-px"
                        style={{ background: done ? "var(--primary)" : "var(--border)" }}
                      />
                    )}
                  </div>
                  <p
                    className="mt-2 text-center text-[8.5px] leading-tight"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      color: done || active || isReady ? "var(--primary)" : "var(--fg-3)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {step}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Vehicle strip */}
        {vehicle && (
          <div
            className="flex items-center gap-3 border-t px-5 py-3.5"
            style={{ borderColor: "color-mix(in oklab, var(--border) 50%, transparent)" }}
          >
            <div
              className="flex-shrink-0 rounded-[6px]"
              style={{
                width: 28,
                height: 28,
                background: colorToHex(vehicle.color),
                boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
              }}
            />
            <p className="text-[12px] font-medium text-foreground">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </p>
          </div>
        )}
      </div>


      {/* Garage */}
      {vehicles.length > 0 && (
        <div className="space-y-3">
          <MonoLabel>Your garage</MonoLabel>
          {vehicles.map((v) => (
            <VehicleHeroCard key={v.id} vehicle={v} to={`/customer/vehicles/${v.id}`} compact />
          ))}
        </div>
      )}
    </div>
  )
}

function UpcomingState({
  booking,
  vehicle,
  service,
  vehicles,
  firstName,
}: {
  booking: BookingRecord
  vehicle: VehicleRecord | undefined
  service: ReturnType<typeof getServiceById>
  vehicles: VehicleRecord[]
  firstName: string
}) {
  const dateParts = booking.dateLabel.split(" ") // ["Apr", "2,", "2026"]
  const day = dateParts[1]?.replace(",", "") ?? ""
  const month = dateParts[0] ?? ""

  return (
    <div className="space-y-5 pt-2">
      <div>
        <MonoLabel>Good morning, {firstName}</MonoLabel>
        <h1
          className="mt-2 leading-[1.02] tracking-[-0.03em]"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 44,
            fontWeight: 400,
            color: "var(--foreground)",
          }}
        >
          Your next<br />service is<br /><em style={{ color: "var(--primary)" }}>coming up</em>
        </h1>
      </div>

      {/* Appointment card */}
      <div
        className="overflow-hidden"
        style={{
          borderRadius: 20,
          background: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Date hero */}
        <div
          className="flex items-center gap-5 px-5 py-5 border-b border-border"
          style={{ background: "color-mix(in oklab, var(--primary) 6%, var(--card))" }}
        >
          <div className="flex-shrink-0 text-center">
            <p
              className="leading-none"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 56,
                fontWeight: 400,
                color: "var(--primary)",
                lineHeight: 1,
              }}
            >
              {day}
            </p>
            <p
              className="mt-1 text-[10px] uppercase tracking-[0.12em]"
              style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
            >
              {month}
            </p>
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-[10px] uppercase tracking-[0.1em] mb-1"
              style={{ fontFamily: "'Outfit', sans-serif", color: "var(--primary)" }}
            >
              Upcoming
            </p>
            <p
              className="text-[22px] leading-none tracking-[-0.02em]"
              style={{ fontFamily: "'Instrument Serif', serif", color: "var(--foreground)", fontWeight: 400 }}
            >
              {service?.name ?? "Service"}
            </p>
            <p
              className="mt-1 text-[11px]"
              style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
            >
              {booking.time}
            </p>
          </div>
          <StatusBadge status={booking.status} />
        </div>

        {/* Details */}
        <div className="px-5 py-4 space-y-3">
          <div className="flex items-center gap-3">
            <HugeiconsIcon icon={Location01Icon} size={13} primaryColor="var(--fg-3)" strokeWidth={1.6} />
            <span className="text-[13px] text-foreground">{booking.location}</span>
          </div>
          {vehicle && (
            <div className="flex items-center gap-3">
              <div
                className="flex-shrink-0 rounded-[4px]"
                style={{ width: 13, height: 13, background: colorToHex(vehicle.color) }}
              />
              <span className="text-[13px] text-foreground">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </span>
            </div>
          )}
        </div>
      </div>


      {/* Book another */}
      <Link to="/customer/book">
        <div
          className="flex items-center justify-between px-6 py-5 transition hover:opacity-90 active:scale-[0.98]"
          style={{ borderRadius: 20, background: "var(--primary)" }}
        >
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.1em]"
              style={{ color: "var(--primary-foreground)", opacity: 0.6, fontFamily: "'Outfit', sans-serif" }}
            >
              Ready
            </p>
            <p className="mt-0.5 text-[18px] font-medium" style={{ color: "var(--primary-foreground)" }}>
              Book another service
            </p>
          </div>
          <HugeiconsIcon icon={ArrowRight01Icon} size={22} primaryColor="var(--primary-foreground)" strokeWidth={1.8} />
        </div>
      </Link>

      {/* Garage */}
      {vehicles.length > 0 && (
        <div className="space-y-3">
          <MonoLabel>Your garage</MonoLabel>
          {vehicles.map((v) => (
            <VehicleHeroCard key={v.id} vehicle={v} to={`/customer/vehicles/${v.id}`} compact />
          ))}
        </div>
      )}
    </div>
  )
}

function DefaultState({
  vehicles,
  firstName,
  bookings,
}: {
  vehicles: VehicleRecord[]
  firstName: string
  bookings: BookingRecord[]
}) {
  const completed = getCompletedBookings(bookings)
  const lastService = completed[0]
  const lastServiceName = lastService
    ? (getServiceById(lastService.serviceId)?.name ?? null)
    : null
  const hasUpcoming = bookings.some((b) => b.status === "Confirmed" || b.status === "Assigned")
  const hasActive = bookings.some((b) => b.status === "In progress" || b.status === "Ready")

  return (
    <div className="space-y-5 pt-2">
      {/* Greeting */}
      <div>
        <MonoLabel>Good morning, {firstName}</MonoLabel>
        <h1
          className="mt-2 leading-[1.0] tracking-[-0.03em]"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 46,
            fontWeight: 400,
            color: "var(--foreground)",
          }}
        >
          What would<br />you <em style={{ color: "var(--primary)" }}>like<br />today?</em>
        </h1>
      </div>

      {/* Book CTA — premium card */}
      <Link to="/customer/book">
        <div
          className="relative overflow-hidden transition hover:opacity-95 active:scale-[0.99]"
          style={{ borderRadius: 20, background: "var(--primary)", minHeight: 100 }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.12) 0%, transparent 60%)",
            }}
          />
          <div className="relative flex items-center justify-between px-6 py-6">
            <div>
              {lastServiceName && (
                <p
                  className="text-[10px] uppercase tracking-[0.1em] mb-1"
                  style={{ color: "var(--primary-foreground)", opacity: 0.55, fontFamily: "'Outfit', sans-serif" }}
                >
                  Last: {lastServiceName}
                </p>
              )}
              <p
                className="text-[22px] font-medium leading-tight"
                style={{ color: "var(--primary-foreground)", fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
              >
                Book a <em>service</em>
              </p>
            </div>
            <div
              className="flex size-11 items-center justify-center rounded-full flex-shrink-0"
              style={{ background: "rgba(0,0,0,0.2)" }}
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={20} primaryColor="var(--primary-foreground)" strokeWidth={1.8} />
            </div>
          </div>
        </div>
      </Link>

      <div className="grid grid-cols-3 gap-2.5">
        <div className="rounded-[14px] border border-border bg-card px-3.5 py-3">
          <MonoLabel>Active</MonoLabel>
          <p className="mt-1 text-[12px]" style={{ color: hasActive ? "var(--foreground)" : "var(--fg-3)" }}>
            {hasActive ? "In service" : "None"}
          </p>
        </div>
        <div className="rounded-[14px] border border-border bg-card px-3.5 py-3">
          <MonoLabel>Upcoming</MonoLabel>
          <p className="mt-1 text-[12px]" style={{ color: hasUpcoming ? "var(--foreground)" : "var(--fg-3)" }}>
            {hasUpcoming ? "Scheduled" : "None"}
          </p>
        </div>
        <div className="rounded-[14px] border border-border bg-card px-3.5 py-3">
          <MonoLabel>History</MonoLabel>
          <p className="mt-1 text-[12px]" style={{ color: completed.length > 0 ? "var(--foreground)" : "var(--fg-3)" }}>
            {completed.length > 0 ? `${completed.length} jobs` : "No jobs"}
          </p>
        </div>
      </div>


      {/* Garage */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <MonoLabel>Your garage</MonoLabel>
          <Link
            to="/customer/vehicles/new"
            className="text-[10px] uppercase tracking-[0.08em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--primary)" }}
          >
            + Add
          </Link>
        </div>
        {vehicles.map((v) => {
          const lastForV = bookings
            .filter((b) => b.vehicleId === v.id && (b.status === "Completed" || b.status === "Paid"))
            .at(0)
          const lastSvcName = lastForV ? getServiceById(lastForV.serviceId)?.name : null

          return (
            <div key={v.id}>
              <VehicleHeroCard vehicle={v} to={`/customer/vehicles/${v.id}`} />
              {lastSvcName && (
                <p
                  className="mt-1.5 px-1 text-[10px]"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                >
                  Last: {lastSvcName}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Customer Home ──────────────────────────────────────────────────────
export function CustomerHomePage() {
  const { vehicles, bookings } = useCustomerStore()
  const customer = getCustomerById(PRIMARY_CUSTOMER_ID)
  const firstName = customer?.name.split(" ")[0] ?? "there"

  const activeBooking = getActiveBooking(bookings)
  const upcomingBooking = getUpcomingBooking(bookings)

  if (vehicles.length === 0) {
    return <EmptyGarageState firstName={firstName} />
  }

  if (activeBooking) {
    const vehicle = vehicles.find((v) => v.id === activeBooking.vehicleId)
    const service = getServiceById(activeBooking.serviceId)
    return (
      <ActiveServiceState
        booking={activeBooking}
        vehicle={vehicle}
        service={service}
        vehicles={vehicles}
      />
    )
  }

  if (upcomingBooking) {
    const vehicle = vehicles.find((v) => v.id === upcomingBooking.vehicleId)
    const service = getServiceById(upcomingBooking.serviceId)
    return (
      <UpcomingState
        booking={upcomingBooking}
        vehicle={vehicle}
        service={service}
        vehicles={vehicles}
        firstName={firstName}
      />
    )
  }

  return <DefaultState vehicles={vehicles} firstName={firstName} bookings={bookings} />
}

// ── Customer Vehicles ──────────────────────────────────────────────────
export function CustomerVehiclesPage() {
  const { vehicles } = useCustomerStore()

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <MonoLabel>Garage</MonoLabel>
          <h1
            className="mt-1 leading-none tracking-[-0.03em]"
            style={{ fontFamily: "'Instrument Serif', serif", fontSize: 38, fontWeight: 400, color: "var(--foreground)" }}
          >
            My <em>vehicles</em>
          </h1>
        </div>
        <Link to="/customer/vehicles/new">
          <button
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-medium transition hover:opacity-90 active:scale-[0.98]"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            <HugeiconsIcon icon={PlusSignIcon} size={13} strokeWidth={1.8} />
            Add
          </button>
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <div className="flex min-h-[58vh] items-center justify-center px-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div style={{ color: "color-mix(in oklab, var(--primary) 50%, var(--fg-3))" }}>
              <EmptyIllustration kind="vehicles" />
            </div>
            <div>
              <p
                className="text-[22px] tracking-[-0.02em]"
                style={{ fontFamily: "'Instrument Serif', serif", color: "var(--foreground)", fontWeight: 400 }}
              >
                No vehicles yet
              </p>
              <p className="mt-1.5 text-[13px]" style={{ color: "var(--muted-foreground)" }}>
                Add your first vehicle to view your garage.
              </p>
            </div>
            <Link to="/customer/vehicles/new">
              <button
                className="inline-flex items-center rounded-full px-5 py-2.5 text-[13px] font-medium transition hover:opacity-90"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                Add your first vehicle
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {vehicles.map((v) => (
            <VehicleHeroCard key={v.id} vehicle={v} to={`/customer/vehicles/${v.id}`} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Customer Vehicle Detail ────────────────────────────────────────────
export function CustomerVehicleDetailPage() {
  const { vehicleId } = useParams()
  const navigate = useNavigate()
  const { vehicles, bookings } = useCustomerStore()

  const vehicle = vehicles.find((v) => v.id === vehicleId) ?? vehicles[0]
  const vehicleBookings = vehicle
    ? bookings.filter((b) => b.vehicleId === vehicle.id)
    : []

  if (!vehicle) {
    return (
      <div className="py-10 text-center">
        <p className="text-muted-foreground">Vehicle not found</p>
      </div>
    )
  }

  const hex = colorToHex(vehicle.color)
  const lastService = vehicleBookings
    .filter((b) => b.status === "Completed" || b.status === "Paid")
    .at(0)
  const lastServiceName = lastService ? getServiceById(lastService.serviceId)?.name : null

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <button onClick={() => navigate(-1)} className="mt-1 flex-shrink-0" style={{ color: "var(--fg-3)" }}>
          <HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={1.6} style={{ transform: "rotate(180deg)" }} />
        </button>
        <div>
          <MonoLabel>{vehicle.plate || "Vehicle"}</MonoLabel>
          <h1
            className="mt-1 leading-none tracking-[-0.03em]"
            style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, fontWeight: 400, color: "var(--foreground)" }}
          >
            {vehicle.year} {vehicle.make} <em>{vehicle.model}</em>
          </h1>
        </div>
      </div>

      {/* Full vehicle hero */}
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: 20,
          minHeight: 200,
          background: `linear-gradient(140deg, ${hex} 0%, color-mix(in oklab, ${hex} 40%, var(--card)) 60%, var(--card) 100%)`,
          border: "1px solid color-mix(in oklab, var(--border) 50%, transparent)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(ellipse at 60% 80%, rgba(255,255,255,0.06) 0%, transparent 60%)",
          }}
        />
        {vehicle.plate && (
          <div className="absolute top-4 right-4">
            <span
              className="rounded-[6px] px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase"
              style={{
                fontFamily: "'Outfit', sans-serif",
                background: "rgba(0,0,0,0.4)",
                color: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(8px)",
              }}
            >
              {vehicle.plate}
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-6">
          <p
            className="text-[10px] uppercase tracking-[0.1em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.45)" }}
          >
            {vehicle.status} · {vehicle.color}
          </p>
          <p
            className="mt-1 leading-none tracking-[-0.02em]"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 32,
              fontWeight: 400,
              color: isLightColor(hex) ? "rgba(0,0,0,0.85)" : "white",
              textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}
          >
            {vehicle.make} <em>{vehicle.model}</em>
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <VcoInfoTile
          label="Services"
          value={String(vehicleBookings.length)}
          caption="on record"
        />
        <VcoInfoTile
          label="Last service"
          value={lastServiceName?.split(" ")[0] ?? "—"}
          caption={lastServiceName ?? "No services yet"}
          accent={!!lastServiceName}
        />
      </div>

      {vehicle.preference ? (
        <div className="rounded-[14px] border border-border bg-card px-5 py-4">
          <p
            className="mb-2 text-[10px] uppercase tracking-[0.08em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
          >
            Care preferences
          </p>
          <p className="text-[13px] leading-relaxed text-foreground">{vehicle.preference}</p>
        </div>
      ) : null}

      {/* Service history */}
      <div className="rounded-[14px] border border-border bg-card">
        <div className="border-b border-border px-5 py-3.5">
          <h2
            className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            Service history
          </h2>
        </div>
        {vehicleBookings.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p
              className="text-[11px] uppercase tracking-[0.06em]"
              style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
            >
              No services yet
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-3">
            {vehicleBookings.map((b) => {
              const svc = getServiceById(b.serviceId)
              return (
                <Link key={b.id} to={`/customer/history/${b.id}`}>
                  <VcoListRow>
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-medium text-foreground">{svc?.name ?? "Service"}</p>
                        <p className="mt-0.5 text-[10.5px]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
                          {b.dateLabel} · {b.technician}
                        </p>
                      </div>
                      <StatusBadge status={b.status} />
                    </div>
                  </VcoListRow>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      <Link to="/customer/book">
        <button
          className="w-full rounded-full py-3.5 text-[14px] font-medium transition hover:opacity-90 active:scale-[0.98]"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          Book this vehicle
        </button>
      </Link>
    </div>
  )
}

// ── Customer Membership ────────────────────────────────────────────────
export function CustomerMembershipPage() {
  const customer = getCustomerById(PRIMARY_CUSTOMER_ID)
  const hasplan = !!customer?.membership && customer.membership !== "None"

  return (
    <div className="space-y-5">
      <div>
        <MonoLabel>Membership</MonoLabel>
        <h1
          className="mt-1 leading-none tracking-[-0.03em]"
          style={{ fontFamily: "'Instrument Serif', serif", fontSize: 38, fontWeight: 400, color: "var(--foreground)" }}
        >
          Your <em>plan</em>
        </h1>
      </div>

      {hasplan ? (
        <>
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: 20,
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(ellipse at 100% 0%, color-mix(in oklab, var(--primary) 12%, transparent) 0%, transparent 55%)",
              }}
            />
            <div className="relative px-6 py-6">
              <p
                className="text-[10px] uppercase tracking-[0.12em]"
                style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
              >
                Active plan
              </p>
              <h2
                className="mt-2 leading-none tracking-[-0.03em]"
                style={{ fontFamily: "'Instrument Serif', serif", fontSize: 38, fontWeight: 400, color: "var(--primary)" }}
              >
                VCO {customer?.membership}
              </h2>
              <p
                className="mt-2 text-[13px]"
                style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
              >
                $149 / month · Auto-renews Apr 18
              </p>
              <div className="mt-5 space-y-2.5">
                {[
                  "Unlimited exterior wash",
                  "Monthly interior refresh",
                  "Gloss inspection",
                  "Priority scheduling",
                ].map((perk) => (
                  <div key={perk} className="flex items-center gap-3 text-[13px] text-foreground">
                    <span className="size-1.5 flex-shrink-0 rounded-full" style={{ background: "var(--primary)" }} />
                    {perk}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <VcoInfoTile label="Renewal" value="Apr 18" caption="2026" accent />
            <VcoInfoTile label="Status" value="Active" caption="Auto-renews" />
          </div>

          <div className="rounded-[16px] border border-border bg-card px-5 py-4">
            <p className="mb-3 text-[10px] uppercase tracking-[0.08em]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
              Upgrade
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] font-medium text-foreground">VCO Elite</p>
                <p className="mt-0.5 text-[10.5px]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
                  $229 / month · Ceramic + concierge
                </p>
              </div>
              <button
                className="rounded-full border border-border px-3.5 py-1.5 text-[11px] text-foreground transition hover:bg-muted"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Upgrade
              </button>
            </div>
          </div>

          <button className="w-full rounded-full border border-border py-2.5 text-[13px] text-muted-foreground transition hover:bg-card">
            Manage plan
          </button>
        </>
      ) : (
        <div className="space-y-3">
          {[
            { name: "Signature", price: "$79", perks: ["4 exterior washes / mo", "10% off add-ons", "Priority booking"] },
            { name: "Premium", price: "$149", perks: ["Unlimited exterior wash", "Monthly interior refresh", "Priority scheduling"], highlight: true },
            { name: "Elite", price: "$229", perks: ["Everything in Premium", "Monthly ceramic top-off", "Dedicated technician"] },
          ].map((plan) => (
            <div
              key={plan.name}
              className="relative overflow-hidden rounded-[16px] border px-5 py-5"
              style={{
                borderColor: plan.highlight ? "var(--primary)" : "var(--border)",
                background: plan.highlight ? "color-mix(in oklab, var(--primary) 6%, var(--card))" : "var(--card)",
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[16px] font-medium text-foreground">VCO {plan.name}</p>
                  <p
                    className="mt-0.5 text-[22px] leading-none tracking-[-0.02em]"
                    style={{ fontFamily: "'Instrument Serif', serif", color: plan.highlight ? "var(--primary)" : "var(--foreground)", fontWeight: 400 }}
                  >
                    {plan.price}<span className="text-[13px] opacity-60"> / mo</span>
                  </p>
                </div>
                {plan.highlight && (
                  <span
                    className="rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.08em] font-medium"
                    style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "'Outfit', sans-serif" }}
                  >
                    Popular
                  </span>
                )}
              </div>
              <div className="mt-3 space-y-1.5">
                {plan.perks.map((p) => (
                  <div key={p} className="flex items-center gap-2 text-[12px] text-muted-foreground">
                    <span className="size-1 flex-shrink-0 rounded-full" style={{ background: "var(--primary)" }} />
                    {p}
                  </div>
                ))}
              </div>
              <button
                className="mt-4 w-full rounded-full py-2.5 text-[13px] font-medium transition hover:opacity-90"
                style={{
                  background: plan.highlight ? "var(--primary)" : "var(--muted)",
                  color: plan.highlight ? "var(--primary-foreground)" : "var(--foreground)",
                }}
              >
                Join {plan.name}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Customer History ───────────────────────────────────────────────────
export function CustomerHistoryPage() {
  const { vehicles, bookings } = useCustomerStore()
  const allBookings = [...bookings].reverse()

  return (
    <div className="space-y-5">
      <div>
        <MonoLabel>Customer</MonoLabel>
        <h1
          className="mt-1 leading-none tracking-[-0.03em]"
          style={{ fontFamily: "'Instrument Serif', serif", fontSize: 38, fontWeight: 400, color: "var(--foreground)" }}
        >
          Service <em>history</em>
        </h1>
      </div>

      {allBookings.length === 0 ? (
        <div className="flex min-h-[65vh] items-center justify-center px-6">
          <div className="flex flex-col items-center text-center">
            <div style={{ color: "color-mix(in oklab, var(--primary) 50%, var(--fg-3))" }}>
              <EmptyIllustration kind="history" />
            </div>
            <div>
              <p
                className="text-[22px] tracking-[-0.02em]"
                style={{ fontFamily: "'Instrument Serif', serif", color: "var(--foreground)", fontWeight: 400 }}
              >
                No services yet
              </p>
              <p className="mt-1.5 text-[13px]" style={{ color: "var(--muted-foreground)" }}>
                Your completed services will appear here.
              </p>
            </div>
            <Link to="/customer/book">
              <button
                className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium transition hover:opacity-90"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                Book your first service
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-[16px] border border-border bg-card">
          <div className="space-y-1 p-3">
            {allBookings.map((b) => {
              const svc = getServiceById(b.serviceId)
              const vehicle = vehicles.find((v) => v.id === b.vehicleId)
              return (
                <Link key={b.id} to={`/customer/history/${b.id}`}>
                  <VcoListRow>
                    <div className="flex items-center gap-3">
                      {vehicle && (
                        <span
                          className="flex-shrink-0 rounded-[4px]"
                          style={{ width: 28, height: 28, background: colorToHex(vehicle.color), boxShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium text-foreground">{svc?.name ?? "Service"}</p>
                        <p className="mt-0.5 text-[10.5px]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
                          {b.dateLabel} · {vehicle ? `${vehicle.make} ${vehicle.model}` : "Vehicle"}
                        </p>
                      </div>
                      <StatusBadge status={b.status} />
                    </div>
                  </VcoListRow>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Customer History Detail ────────────────────────────────────────────
export function CustomerHistoryDetailPage() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const { bookings, vehicles } = useCustomerStore()

  const booking = bookings.find((b) => b.id === bookingId) ?? bookings[0]
  const vehicle = booking ? vehicles.find((v) => v.id === booking.vehicleId) : undefined
  const service = booking ? getServiceById(booking.serviceId) : undefined

  if (!booking) {
    return <div className="py-10 text-center"><p className="text-muted-foreground">Booking not found</p></div>
  }

  const timelineDoneCount =
    BOOKING_TIMELINE.indexOf(booking.status as typeof BOOKING_TIMELINE[number]) + 1

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <button onClick={() => navigate(-1)} className="mt-1 flex-shrink-0" style={{ color: "var(--fg-3)" }}>
          <HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={1.6} style={{ transform: "rotate(180deg)" }} />
        </button>
        <div>
          <MonoLabel>{booking.id}</MonoLabel>
          <h1
            className="mt-1 leading-none tracking-[-0.025em]"
            style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, fontWeight: 400, color: "var(--foreground)" }}
          >
            {service?.name ?? "Service"}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <StatusBadge status={booking.status} />
        <StatusBadge status={booking.paymentStatus} />
      </div>

      {vehicle && (
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 16,
            minHeight: 100,
            background: `linear-gradient(135deg, ${colorToHex(vehicle.color)} 0%, color-mix(in oklab, ${colorToHex(vehicle.color)} 25%, var(--card)) 55%, var(--card) 100%)`,
            border: "1px solid color-mix(in oklab, var(--border) 50%, transparent)",
          }}
        >
          <div className="flex items-center gap-3 px-5 py-4">
            <div
              className="flex-shrink-0 rounded-[8px]"
              style={{ width: 40, height: 40, background: colorToHex(vehicle.color), boxShadow: "0 2px 10px rgba(0,0,0,0.4)" }}
            />
            <div>
              <p
                className="text-[16px] font-medium"
                style={{ color: isLightColor(colorToHex(vehicle.color)) ? "rgba(0,0,0,0.85)" : "white", fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
              >
                {vehicle.year} {vehicle.make} <em>{vehicle.model}</em>
              </p>
              <p
                className="text-[10px] uppercase tracking-[0.07em]"
                style={{ fontFamily: "'Outfit', sans-serif", color: isLightColor(colorToHex(vehicle.color)) ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.45)" }}
              >
                {vehicle.plate || "No plate"} · {vehicle.color}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <VcoInfoTile label="Date" value={booking.dateLabel.split(",")[0]} caption={booking.dateLabel} />
        <VcoInfoTile label="Amount" value={booking.amount} caption={booking.paymentStatus} accent />
        <VcoInfoTile label="Time" value={booking.time} caption={booking.location.split(" ")[0]} />
        <VcoInfoTile label="By" value={booking.technician.split(" ")[0]} caption={booking.technician} />
      </div>

      {/* Timeline */}
      <div className="rounded-[14px] border border-border bg-card px-5 py-5">
        <p className="mb-5 text-[10px] uppercase tracking-[0.08em]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
          Timeline
        </p>
        <div className="flex items-start">
          {BOOKING_TIMELINE.map((step, i) => {
            const done = i < timelineDoneCount
            return (
              <div key={step} className="flex flex-1 flex-col items-center">
                <div className="flex w-full items-center">
                  {i > 0 && (
                    <div className="flex-1 h-px" style={{ background: i < timelineDoneCount ? "var(--primary)" : "var(--border)" }} />
                  )}
                  <div
                    className="flex-shrink-0 rounded-full"
                    style={{
                      width: 9, height: 9,
                      background: done ? "var(--primary)" : "var(--border)",
                      boxShadow: done ? "0 0 6px var(--primary)" : "none",
                    }}
                  />
                  {i < BOOKING_TIMELINE.length - 1 && (
                    <div className="flex-1 h-px" style={{ background: i < timelineDoneCount - 1 ? "var(--primary)" : "var(--border)" }} />
                  )}
                </div>
                <p
                  className="mt-2 text-center text-[8px] leading-tight uppercase tracking-[0.05em] whitespace-nowrap"
                  style={{ fontFamily: "'Outfit', sans-serif", color: done ? "var(--primary)" : "var(--fg-3)" }}
                >
                  {step}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {booking.addons.length > 0 && (
        <div className="rounded-[14px] border border-border bg-card px-5 py-4">
          <p className="mb-3 text-[10px] uppercase tracking-[0.08em]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
            Add-ons
          </p>
          <div className="flex flex-wrap gap-2">
            {booking.addons.map((addon) => (
              <span key={addon} className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {addon}
              </span>
            ))}
          </div>
        </div>
      )}

      {booking.notes && (
        <div className="rounded-[14px] border border-border bg-card px-5 py-4">
          <p className="mb-2 text-[10px] uppercase tracking-[0.08em]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
            Notes
          </p>
          <p className="text-[13px] leading-relaxed text-foreground">{booking.notes}</p>
        </div>
      )}

      <Link to="/customer/book">
        <button
          className="w-full rounded-full py-3.5 text-[13px] font-medium transition hover:opacity-90 active:scale-[0.98]"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          Book similar service
        </button>
      </Link>
    </div>
  )
}

// ── Customer Account ───────────────────────────────────────────────────
export function CustomerAccountPage() {
  const { resetToSeed, clearCustomerData } = useCustomerStore()
  const customer = customers[0]

  return (
    <div className="space-y-5">
      <div>
        <MonoLabel>Account</MonoLabel>
        <h1
          className="mt-1 leading-none tracking-[-0.03em]"
          style={{ fontFamily: "'Instrument Serif', serif", fontSize: 38, fontWeight: 400, color: "var(--foreground)" }}
        >
          Settings
        </h1>
      </div>

      <div className="rounded-[16px] border border-border bg-card px-5 py-5">
        <div
          className="mb-4 size-12 grid place-items-center rounded-full text-[14px] font-semibold text-primary-foreground"
          style={{
            fontFamily: "'Outfit', sans-serif",
            background: "linear-gradient(135deg, var(--primary), color-mix(in oklab, var(--primary) 40%, var(--muted)))",
          }}
        >
          {customer.name.split(" ").map((n: string) => n[0]).join("")}
        </div>
        <p className="text-[16px] font-medium text-foreground">{customer.name}</p>
        <p className="mt-0.5 text-[11px]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
          {customer.email}
        </p>
        <p className="text-[11px]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
          {customer.phone}
        </p>
      </div>

      <div className="rounded-[16px] border border-border bg-card">
        <div className="border-b border-border px-5 py-3.5">
          <h2 className="text-[18px] leading-none tracking-[-0.02em]" style={{ fontFamily: "'Instrument Serif', serif", color: "var(--foreground)", fontWeight: 400 }}>
            Preferences
          </h2>
        </div>
        <div className="space-y-1 p-3">
          {[
            { label: "Booking confirmations", value: "SMS + Email" },
            { label: "Live status updates", value: "Enabled" },
            { label: "Membership reminders", value: "Enabled" },
          ].map((pref) => (
            <div
              key={pref.label}
              className="flex items-center justify-between rounded-[10px] border border-border bg-background px-3.5 py-3"
            >
              <p className="text-[13px] text-foreground">{pref.label}</p>
              <p className="text-[10.5px]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--primary)" }}>
                {pref.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[16px] border border-border bg-card px-5 py-4">
        <p className="mb-1 text-[10px] uppercase tracking-[0.08em]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
          Demo controls
        </p>
        <p className="mb-3 text-[12px] text-muted-foreground">
          Switch between demo seed and empty customer state.
        </p>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={clearCustomerData}
            className="rounded-full border border-border px-4 py-2 text-[12px] text-muted-foreground transition hover:bg-muted"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Clear customer data
          </button>
          <button
            onClick={resetToSeed}
            className="rounded-full px-4 py-2 text-[12px] transition hover:opacity-90"
            style={{ fontFamily: "'Outfit', sans-serif", background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            Load demo seed
          </button>
        </div>
      </div>
    </div>
  )
}

