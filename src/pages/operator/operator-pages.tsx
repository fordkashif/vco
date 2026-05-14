import { Link, useParams } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon } from "@hugeicons/core-free-icons"

import {
  VcoKpiCard,
  VcoPanel,
  VcoRow,
} from "@/components/operator/operator-surfaces"
import { StatusBadge } from "@/components/shared/status-badge"
import {
  bookings,
  customers,
  getBookingDisplay,
  getBookingsByCustomerId,
  getBookingsByVehicleId,
  getCustomerById,
  getVehicleById,
  getVehiclesByCustomerId,
  payments,
  serviceCatalog,
  teamMembers,
  vehicles,
} from "@/data/mock"

// ── Shared page header ─────────────────────────────────────────────────
function PageHeader({
  context,
  title,
  action,
}: {
  context: string
  title: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <p
          className="text-[10.5px] uppercase tracking-[0.1em]"
          style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
        >
          {context}
        </p>
        <h1
          className="mt-1 text-[32px] leading-none tracking-[-0.025em] text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          {title}
        </h1>
      </div>
      {action}
    </div>
  )
}

function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition hover:opacity-90"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// ── Operator Bookings ──────────────────────────────────────────────────
export function OperatorBookingsPage() {
  const bookingFeed = bookings.map(getBookingDisplay)

  return (
    <div className="space-y-4">
      <PageHeader
        context="Operator · Bookings"
        title={<>Today's <em>Queue</em></>}
        action={
          <PrimaryButton>
            <HugeiconsIcon icon={PlusSignIcon} size={14} strokeWidth={1.8} />
            New booking
          </PrimaryButton>
        }
      />

      <VcoPanel>
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <h2
            className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            All bookings
          </h2>
          <span
            className="text-[10.5px] uppercase tracking-[0.06em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
          >
            {bookingFeed.length} jobs
          </span>
        </div>
        <div className="space-y-1 p-3">
          {bookingFeed.map((booking) => (
            <Link key={booking.id} to={`/operator/bookings/${booking.id}`}>
              <VcoRow>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-foreground">{booking.serviceName}</p>
                    <p
                      className="mt-0.5 text-[10.5px]"
                      style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                    >
                      {booking.customerName} · {booking.time} · {booking.location}
                    </p>
                  </div>
                  <StatusBadge status={booking.status} />
                </div>
              </VcoRow>
            </Link>
          ))}
        </div>
      </VcoPanel>
    </div>
  )
}

// ── Operator Customers ─────────────────────────────────────────────────
export function OperatorCustomersPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        context="Operator · Customers"
        title={<>Customer <em>CRM</em></>}
        action={
          <PrimaryButton>
            <HugeiconsIcon icon={PlusSignIcon} size={14} strokeWidth={1.8} />
            Add customer
          </PrimaryButton>
        }
      />

      <VcoPanel>
        <div className="border-b border-border px-5 py-3.5">
          <h2
            className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            All customers
          </h2>
        </div>
        <div className="space-y-1 p-3">
          {customers.map((customer) => (
            <Link key={customer.id} to={`/operator/customers/${customer.id}`}>
              <VcoRow>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-foreground">{customer.name}</p>
                    <p
                      className="mt-0.5 text-[10.5px]"
                      style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                    >
                      {customer.vehicleIds.length} vehicles · {customer.membership} member
                    </p>
                  </div>
                  <span
                    className="flex-shrink-0 text-[12px] font-medium text-foreground"
                  >
                    {customer.spend}
                  </span>
                </div>
              </VcoRow>
            </Link>
          ))}
        </div>
      </VcoPanel>
    </div>
  )
}

// ── Operator Customer Detail ───────────────────────────────────────────
export function OperatorCustomerDetailPage() {
  const { customerId } = useParams()
  const customer = getCustomerById(customerId ?? "") ?? customers[0]
  const customerVehicles = getVehiclesByCustomerId(customer.id)
  const history = getBookingsByCustomerId(customer.id).map(getBookingDisplay)

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <p
            className="text-[10.5px] uppercase tracking-[0.1em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
          >
            Customers · {customer.id}
          </p>
          <h1
            className="mt-1 text-[32px] leading-none tracking-[-0.025em] text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            {customer.name}
          </h1>
        </div>
        <PrimaryButton>Create booking</PrimaryButton>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <VcoKpiCard label="Membership" value={customer.membership} />
        <VcoKpiCard label="Spend" value={customer.spend} />
        <VcoKpiCard label="Vehicles" value={String(customer.vehicleIds.length)} />
        <VcoKpiCard label="Bookings" value={String(history.length)} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <VcoPanel>
          <div className="border-b border-border px-5 py-3.5">
            <h2
              className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
            >
              Vehicles
            </h2>
          </div>
          <div className="space-y-1 p-3">
            {customerVehicles.map((vehicle) => (
              <Link key={vehicle.id} to={`/operator/vehicles/${vehicle.id}`}>
                <VcoRow>
                  <p className="text-[13px] font-medium text-foreground">{vehicle.name}</p>
                  <p
                    className="mt-0.5 text-[10.5px]"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                  >
                    {vehicle.plate} · {vehicle.color}
                  </p>
                </VcoRow>
              </Link>
            ))}
          </div>
        </VcoPanel>

        <VcoPanel>
          <div className="border-b border-border px-5 py-3.5">
            <h2
              className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
            >
              History
            </h2>
          </div>
          <div className="space-y-1 p-3">
            {history.map((b) => (
              <Link key={b.id} to={`/operator/bookings/${b.id}`}>
                <VcoRow>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-medium text-foreground">{b.serviceName}</p>
                      <p
                        className="mt-0.5 text-[10.5px]"
                        style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                      >
                        {b.dateLabel}
                      </p>
                    </div>
                    <StatusBadge status={b.status} />
                  </div>
                </VcoRow>
              </Link>
            ))}
          </div>
        </VcoPanel>
      </div>

      {/* Contact */}
      <VcoPanel>
        <div className="grid gap-0 divide-y divide-border">
          {[
            { label: "Email", value: customer.email },
            { label: "Phone", value: customer.phone },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between px-5 py-3">
              <span
                className="text-[10.5px] uppercase tracking-[0.06em]"
                style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
              >
                {row.label}
              </span>
              <span className="text-[13px] text-foreground">{row.value}</span>
            </div>
          ))}
        </div>
      </VcoPanel>
    </div>
  )
}

// ── Operator Vehicles ──────────────────────────────────────────────────
export function OperatorVehiclesPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        context="Operator · Vehicles"
        title={<>Vehicle <em>Records</em></>}
      />

      <VcoPanel>
        <div className="border-b border-border px-5 py-3.5">
          <h2
            className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            All vehicles
          </h2>
        </div>
        <div className="space-y-1 p-3">
          {vehicles.map((vehicle) => (
            <Link key={vehicle.id} to={`/operator/vehicles/${vehicle.id}`}>
              <VcoRow>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-foreground">{vehicle.name}</p>
                    <p
                      className="mt-0.5 text-[10.5px]"
                      style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                    >
                      {vehicle.plate} · {vehicle.color}
                    </p>
                  </div>
                  <span
                    className="flex-shrink-0 text-[10.5px] uppercase tracking-[0.06em]"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                  >
                    {vehicle.status}
                  </span>
                </div>
              </VcoRow>
            </Link>
          ))}
        </div>
      </VcoPanel>
    </div>
  )
}

// ── Operator Vehicle Detail ────────────────────────────────────────────
export function OperatorVehicleDetailPage() {
  const { vehicleId } = useParams()
  const vehicle = getVehicleById(vehicleId ?? "") ?? vehicles[0]
  const owner = getCustomerById(vehicle.customerId)
  const relatedBookings = getBookingsByVehicleId(vehicle.id).map(getBookingDisplay)

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <p
            className="text-[10.5px] uppercase tracking-[0.1em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
          >
            Vehicles · {vehicle.plate}
          </p>
          <h1
            className="mt-1 text-[32px] leading-none tracking-[-0.025em] text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            {vehicle.name}
          </h1>
        </div>
        <PrimaryButton>Book service</PrimaryButton>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <VcoKpiCard label="Year" value={String(vehicle.year)} />
        <VcoKpiCard label="Color" value={vehicle.color.split(" ")[0]} />
        <VcoKpiCard label="Plate" value={vehicle.plate} />
        <VcoKpiCard label="Bookings" value={String(relatedBookings.length)} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <VcoPanel>
          <div className="border-b border-border px-5 py-3.5">
            <h2
              className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
            >
              Vehicle info
            </h2>
          </div>
          <div className="divide-y divide-border">
            {[
              { label: "Owner", value: owner?.name ?? "Unknown" },
              { label: "Preference", value: vehicle.preference },
              { label: "Status", value: vehicle.status },
            ].map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-3 px-5 py-3">
                <span
                  className="flex-shrink-0 text-[10.5px] uppercase tracking-[0.06em]"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                >
                  {row.label}
                </span>
                <span className="text-right text-[13px] text-foreground">{row.value}</span>
              </div>
            ))}
          </div>
        </VcoPanel>

        <VcoPanel>
          <div className="border-b border-border px-5 py-3.5">
            <h2
              className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
            >
              Service history
            </h2>
          </div>
          <div className="space-y-1 p-3">
            {relatedBookings.map((b) => (
              <Link key={b.id} to={`/operator/bookings/${b.id}`}>
                <VcoRow>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-medium text-foreground">{b.serviceName}</p>
                      <p
                        className="mt-0.5 text-[10.5px]"
                        style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                      >
                        {b.dateLabel} · {b.technician}
                      </p>
                    </div>
                    <StatusBadge status={b.status} />
                  </div>
                </VcoRow>
              </Link>
            ))}
          </div>
        </VcoPanel>
      </div>
    </div>
  )
}

// ── Operator Services ──────────────────────────────────────────────────
export function OperatorServicesPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        context="Operator · Services"
        title={<>Service <em>Catalog</em></>}
        action={
          <PrimaryButton>
            <HugeiconsIcon icon={PlusSignIcon} size={14} strokeWidth={1.8} />
            New package
          </PrimaryButton>
        }
      />

      <VcoPanel>
        <div className="border-b border-border px-5 py-3.5">
          <h2
            className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            Packages
          </h2>
        </div>
        <div className="space-y-1 p-3">
          {serviceCatalog.map((service) => (
            <VcoRow key={service.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-foreground">{service.name}</p>
                  <p
                    className="mt-0.5 text-[10.5px]"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                  >
                    {service.duration} · {service.description}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-[13px] font-medium text-foreground">{service.price}</p>
                  <p
                    className="mt-0.5 text-[10px] uppercase"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "var(--primary)" }}
                  >
                    {service.state}
                  </p>
                </div>
              </div>
            </VcoRow>
          ))}
        </div>
      </VcoPanel>
    </div>
  )
}

// ── Operator Memberships ───────────────────────────────────────────────
export function OperatorMembershipsPage() {
  const plans = [
    { name: "VCO Premium", price: "$149 / month", active: "1,221 active", pct: 59 },
    { name: "VCO Signature", price: "$89 / month", active: "840 active", pct: 41 },
  ]

  return (
    <div className="space-y-4">
      <PageHeader
        context="Operator · Memberships"
        title={<>Recurring <em>Plans</em></>}
        action={
          <PrimaryButton>
            <HugeiconsIcon icon={PlusSignIcon} size={14} strokeWidth={1.8} />
            New plan
          </PrimaryButton>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <VcoKpiCard label="Total members" value="2,061" delta="↑ 8% this month" up />
        <VcoKpiCard label="MRR" value="$198k" delta="↑ 11% vs last month" up />
        <VcoKpiCard label="Churn" value="1.4%" delta="↓ 0.3 pts" up />
        <VcoKpiCard label="Renewal rate" value="94%" delta="— stable" />
      </div>

      <VcoPanel>
        <div className="border-b border-border px-5 py-3.5">
          <h2
            className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            Active plans
          </h2>
        </div>
        <div className="space-y-1 p-3">
          {plans.map((plan) => (
            <VcoRow key={plan.name}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-foreground">{plan.name}</p>
                  <p
                    className="mt-0.5 text-[10.5px]"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                  >
                    {plan.price} · {plan.active}
                  </p>
                  {/* mini bar */}
                  <div className="mt-2 h-1 w-full rounded-full" style={{ background: "var(--muted)" }}>
                    <div
                      className="h-1 rounded-full"
                      style={{ width: `${plan.pct}%`, background: "var(--primary)" }}
                    />
                  </div>
                </div>
                <span
                  className="flex-shrink-0 text-[13px] font-medium"
                  style={{ color: "var(--primary)" }}
                >
                  {plan.pct}%
                </span>
              </div>
            </VcoRow>
          ))}
        </div>
      </VcoPanel>
    </div>
  )
}

// ── Operator Team ──────────────────────────────────────────────────────
export function OperatorTeamPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        context="Operator · Team"
        title={<>Team & <em>Technicians</em></>}
        action={
          <PrimaryButton>
            <HugeiconsIcon icon={PlusSignIcon} size={14} strokeWidth={1.8} />
            Add member
          </PrimaryButton>
        }
      />

      <div className="grid grid-cols-3 gap-3">
        <VcoKpiCard label="On shift" value={String(teamMembers.filter((t) => t.status === "On shift").length)} />
        <VcoKpiCard label="Active jobs" value={String(teamMembers.reduce((s, t) => s + t.jobs, 0))} />
        <VcoKpiCard label="Avg time" value="50 min" />
      </div>

      <VcoPanel>
        <div className="border-b border-border px-5 py-3.5">
          <h2
            className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            Roster
          </h2>
        </div>
        <div className="space-y-1 p-3">
          {teamMembers.map((member) => (
            <VcoRow key={member.id}>
              <div
                className="grid items-center gap-2.5"
                style={{ gridTemplateColumns: "28px 1fr auto" }}
              >
                <div
                  className="grid size-7 place-items-center rounded-full text-[11px] font-semibold text-primary-foreground"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    background: "linear-gradient(135deg, var(--primary), color-mix(in oklab, var(--primary) 40%, var(--muted)))",
                  }}
                >
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-[12.5px] text-foreground">{member.name}</p>
                  <p
                    className="text-[10.5px]"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                  >
                    {member.jobs} jobs · {member.avg} avg
                  </p>
                </div>
                <StatusBadge status={member.status} />
              </div>
            </VcoRow>
          ))}
        </div>
      </VcoPanel>
    </div>
  )
}

// ── Operator Payments ──────────────────────────────────────────────────
export function OperatorPaymentsPage() {
  const total = payments.reduce((sum, p) => sum + Number(p.amount.replace(/[$,]/g, "")), 0)

  return (
    <div className="space-y-4">
      <PageHeader
        context="Operator · Payments"
        title={<>Payment <em>Ledger</em></>}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <VcoKpiCard label="Total collected" value={`$${total}`} />
        <VcoKpiCard label="Transactions" value={String(payments.length)} />
        <VcoKpiCard
          label="Pending"
          value={String(payments.filter((p) => p.state === "Pending payment").length)}
        />
        <VcoKpiCard label="Paid" value={String(payments.filter((p) => p.state === "Paid").length)} />
      </div>

      <VcoPanel>
        <div className="border-b border-border px-5 py-3.5">
          <h2
            className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            Transactions
          </h2>
        </div>
        <div className="space-y-1 p-3">
          {payments.map((payment) => (
            <Link key={payment.ref} to={`/operator/bookings/${payment.bookingId}`}>
              <VcoRow>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-foreground">{payment.ref}</p>
                    <p
                      className="mt-0.5 text-[10.5px]"
                      style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                    >
                      Booking {payment.bookingId}
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-2.5">
                    <StatusBadge status={payment.state} />
                    <span className="text-[13px] font-medium text-foreground">{payment.amount}</span>
                  </div>
                </div>
              </VcoRow>
            </Link>
          ))}
        </div>
      </VcoPanel>
    </div>
  )
}

// ── Operator Reports ───────────────────────────────────────────────────
const reportBarData = [
  { day: "M", h: 55 },
  { day: "T", h: 72 },
  { day: "W", h: 48 },
  { day: "T", h: 81 },
  { day: "F", h: 63 },
  { day: "S", h: 91, hi: true },
  { day: "S", h: 74 },
]

export function OperatorReportsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        context="Operator · Reports"
        title={<>Revenue & <em>Metrics</em></>}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <VcoKpiCard label="Revenue (7d)" value="$42,180" delta="↑ 9% vs prior week" up />
        <VcoKpiCard label="Bookings (7d)" value="347" delta="↑ 14 vs prior week" up />
        <VcoKpiCard label="Avg ticket" value="$121" delta="— stable" />
        <VcoKpiCard label="Utilization" value="84%" delta="↑ 3 pts" up />
      </div>

      <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
        {/* Revenue chart */}
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
              {reportBarData.map((b, i) => (
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
              {reportBarData.map((b, i) => (
                <div key={i} className="flex-1" style={{ color: b.hi ? "var(--primary)" : undefined }}>
                  {b.day}
                </div>
              ))}
            </div>
          </div>
        </VcoPanel>

        {/* Breakdown */}
        <VcoPanel>
          <div className="border-b border-border px-5 py-3.5">
            <h2
              className="text-[20px] leading-none tracking-[-0.02em] text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
            >
              Breakdown
            </h2>
          </div>
          <div className="space-y-1 p-3">
            {[
              { label: "Signature Wash", value: "$12,420", pct: 29 },
              { label: "Premium Detail", value: "$18,980", pct: 45 },
              { label: "Interior Reset", value: "$10,780", pct: 26 },
            ].map((row) => (
              <div key={row.label} className="rounded-[10px] border border-border bg-background px-3.5 py-3">
                <div className="flex justify-between">
                  <p className="text-[12.5px] text-foreground">{row.label}</p>
                  <p className="text-[12.5px] font-medium text-foreground">{row.value}</p>
                </div>
                <div className="mt-2 h-1 w-full rounded-full" style={{ background: "var(--muted)" }}>
                  <div
                    className="h-1 rounded-full"
                    style={{ width: `${row.pct}%`, background: "var(--primary)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </VcoPanel>
      </div>
    </div>
  )
}

// ── Operator Settings ──────────────────────────────────────────────────
export function OperatorSettingsPage() {
  const sections = [
    {
      title: "Business profile",
      items: ["Chelsea Flagship", "Miami Design District", "Brickell Flagship"],
    },
    {
      title: "Integrations",
      items: ["Payment provider — Stripe connected", "SMS notifications — Twilio connected", "Calendar sync — enabled"],
    },
    {
      title: "Team & access",
      items: ["Roles: Operator, Technician, Customer", "3 active accounts", "Audit log enabled"],
    },
  ]

  return (
    <div className="space-y-4">
      <PageHeader
        context="Operator · Settings"
        title={<>Business <em>Settings</em></>}
        action={
          <PrimaryButton>Save changes</PrimaryButton>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <VcoPanel key={section.title}>
            <div className="border-b border-border px-5 py-3.5">
              <h2
                className="text-[18px] leading-none tracking-[-0.02em] text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
              >
                {section.title}
              </h2>
            </div>
            <div className="space-y-1 p-3">
              {section.items.map((item) => (
                <div
                  key={item}
                  className="rounded-[10px] border border-border bg-background px-3.5 py-3 text-[13px] text-foreground"
                >
                  {item}
                </div>
              ))}
            </div>
          </VcoPanel>
        ))}
      </div>
    </div>
  )
}

