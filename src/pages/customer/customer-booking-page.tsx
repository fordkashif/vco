import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Calendar01Icon,
  Car01Icon,
  CheckmarkCircle01Icon,
  Location01Icon,
  LockIcon,
} from "@hugeicons/core-free-icons"

import {
  availableAddOns,
  locations,
  serviceCatalog,
} from "@/data/mock"
import { colorToHex, useCustomerStore } from "@/store/customer-store"

// ── Helpers ────────────────────────────────────────────────────────────

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 155
}

function BookingEmptyIllustration() {
  return (
    <svg
      viewBox="0 0 320 180"
      className="h-auto w-[220px]"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="26" y="24" width="268" height="132" rx="18" opacity="0.35" />
        <path d="M84 46h152M84 58h152" opacity="0.5" />
        <rect x="84" y="68" width="152" height="76" rx="12" />
        <path d="M111 104h20M160 100v24M148 112h24" />
        <path d="M112 84h20M136 84h16" opacity="0.7" />
      </g>
    </svg>
  )
}

// ── Step definitions ───────────────────────────────────────────────────

const STEPS = ["Location", "Package", "Time", "Vehicle", "Add-ons", "Confirm"] as const
type Step = 0 | 1 | 2 | 3 | 4 | 5

const LOCATION_SERVICES: Record<(typeof locations)[number], string[]> = {
  "Miami Design District": ["svc-signature", "svc-premium", "svc-interior"],
  "Brickell Flagship": ["svc-signature", "svc-interior"],
  "Mobile service": ["svc-signature"],
}

const LOCATION_TIMES: Record<(typeof locations)[number], string[]> = {
  "Miami Design District": ["9:00 AM", "10:30 AM", "12:45 PM", "2:15 PM"],
  "Brickell Flagship": ["10:30 AM", "12:45 PM", "2:15 PM"],
  "Mobile service": ["9:00 AM", "12:45 PM"],
}

// ── Step progress bar ──────────────────────────────────────────────────

function StepBar({ step }: { step: Step }) {
  return (
    <div className="flex items-center gap-1.5">
      {STEPS.map((label, i) => {
        const done = i < step
        const active = i === step
        return (
          <div key={label} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="h-1 w-full rounded-full transition-all duration-300"
              style={{
                background: done
                  ? "var(--primary)"
                  : active
                  ? "color-mix(in oklab, var(--primary) 40%, var(--border))"
                  : "var(--border)",
              }}
            />
            <span
              className="text-[8.5px] uppercase tracking-[0.07em] transition-colors"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: active ? "var(--primary)" : done ? "var(--fg-3)" : "var(--border)",
              }}
            >
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ── Back button ────────────────────────────────────────────────────────

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
      style={{ color: "var(--fg-3)" }}
    >
      <HugeiconsIcon icon={ArrowLeft01Icon} size={16} strokeWidth={1.8} />
      <span
        className="text-[11px] uppercase tracking-[0.08em]"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        Back
      </span>
    </button>
  )
}

// ── Continue button ────────────────────────────────────────────────────

function ContinueButton({
  label = "Continue",
  onClick,
  disabled = false,
}: {
  label?: string
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center justify-center gap-2 rounded-full py-4 text-[14px] font-medium tracking-[-0.01em] transition hover:opacity-90 active:scale-[0.98]"
      style={{
        fontFamily: "'Instrument Serif', serif",
        background: "var(--primary)",
        color: "var(--primary-foreground)",
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {label}
      <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={2} />
    </button>
  )
}

// ── Service category screen ────────────────────────────────────────────

function ServiceCategoryScreen({ onSelect }: { onSelect: () => void }) {
  return (
    <div className="space-y-6">
      <div>
        <p
          className="text-[11px] uppercase tracking-[0.1em]"
          style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
        >
          New booking
        </p>
        <h1
          className="mt-1.5 text-[38px] leading-[1.0] tracking-[-0.025em]"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, color: "var(--foreground)" }}
        >
          What do you<br /><em>need today</em>?
        </h1>
      </div>

      <div className="space-y-3 pt-1">

        {/* Car Wash — active */}
        <button type="button" onClick={onSelect} className="w-full text-left">
          <div
            className="relative overflow-hidden rounded-[22px] px-6 py-7 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background: "var(--card)",
              border: "1.5px solid var(--border)",
            }}
          >
            {/* Lime glow accent */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
              style={{
                background: "radial-gradient(60% 70% at 20% 100%, color-mix(in oklab, var(--primary) 12%, transparent), transparent)",
              }}
            />

            <div className="relative flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Icon + label */}
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl"
                    style={{ background: "color-mix(in oklab, var(--primary) 14%, var(--muted))" }}
                  >
                    {/* Water-drop / wash SVG */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C6 9 4 13.5 4 16a8 8 0 0 0 16 0c0-2.5-2-7-8-14z" />
                    </svg>
                  </div>
                  <span
                    className="text-[11px] uppercase tracking-[0.1em]"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "var(--primary)" }}
                  >
                    Available
                  </span>
                </div>

                <p
                  className="text-[28px] leading-none tracking-[-0.02em]"
                  style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, color: "var(--foreground)" }}
                >
                  Car <em>Wash</em>
                </p>
                <p
                  className="mt-2 text-[11.5px] leading-relaxed"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                >
                  Exterior wash, interior reset, premium detailing — choose your package.
                </p>
              </div>

              <div
                className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                style={{ background: "var(--primary)" }}
              >
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={2.2} primaryColor="var(--primary-foreground)" />
              </div>
            </div>
          </div>
        </button>

        {/* Others — coming soon */}
        <div
          className="relative overflow-hidden rounded-[22px] px-6 py-7"
          style={{
            background: "var(--card)",
            border: "1.5px solid var(--border)",
            opacity: 0.45,
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{ background: "var(--muted)" }}
                >
                  <HugeiconsIcon icon={LockIcon} size={18} strokeWidth={1.6} primaryColor="var(--fg-3)" />
                </div>
                <span
                  className="text-[11px] uppercase tracking-[0.1em]"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
                >
                  Coming soon
                </span>
              </div>

              <p
                className="text-[28px] leading-none tracking-[-0.02em]"
                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, color: "var(--foreground)" }}
              >
                Other <em>services</em>
              </p>
              <p
                className="mt-2 text-[11.5px] leading-relaxed"
                style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
              >
                Paint correction, ceramic coating, tint, and more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Step 1: Vehicle ────────────────────────────────────────────────────

function StepVehicle({
  vehicles,
  selectedId,
  onSelect,
}: {
  vehicles: { id: string; name: string; plate: string; color: string; year: number }[]
  selectedId: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-[11px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
          Step 4 of 6
        </p>
        <h2
          className="mt-1.5 text-[34px] leading-[1.0] tracking-[-0.02em]"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, color: "var(--foreground)" }}
        >
          Which <em>vehicle</em>?
        </h2>
      </div>

      <div className="space-y-3 pt-2">
        {vehicles.map((v) => {
          const hex = colorToHex(v.color)
          const light = isLightColor(hex)
          const selected = v.id === selectedId
          return (
            <button key={v.id} type="button" onClick={() => onSelect(v.id)} className="w-full text-left">
              <div
                className="relative overflow-hidden rounded-[20px] transition-all duration-200"
                style={{
                  minHeight: 120,
                  background: `linear-gradient(135deg, ${hex} 0%, color-mix(in oklab, ${hex} 45%, var(--card)) 55%, var(--card) 100%)`,
                  border: selected ? "2px solid var(--primary)" : "1.5px solid color-mix(in oklab, var(--border) 60%, transparent)",
                  boxShadow: selected ? "0 0 0 4px color-mix(in oklab, var(--primary) 18%, transparent)" : "none",
                }}
              >
                <div className="absolute right-4 top-4">
                  <span
                    className="rounded-lg px-2.5 py-1 text-[10px] uppercase tracking-[0.14em]"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      background: light ? "rgba(0,0,0,0.14)" : "rgba(255,255,255,0.14)",
                      color: light ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.75)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {v.plate}
                  </span>
                </div>
                {selected && (
                  <div className="absolute left-4 top-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: "var(--primary)" }}>
                      <span style={{ color: "var(--primary-foreground)", fontSize: 13, lineHeight: 1 }}>✓</span>
                    </div>
                  </div>
                )}
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%)" }}
                >
                  <p className="text-[17px] font-medium leading-tight" style={{ color: light ? "rgba(0,0,0,0.88)" : "white" }}>
                    {v.name}
                  </p>
                  <p
                    className="mt-0.5 text-[10px] uppercase tracking-[0.09em]"
                    style={{ fontFamily: "'Outfit', sans-serif", color: light ? "rgba(0,0,0,0.42)" : "rgba(255,255,255,0.5)" }}
                  >
                    {v.year} · {v.color}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Step 2: Package ────────────────────────────────────────────────────

function StepPackage({
  packages,
  selectedId,
  onSelect,
}: {
  packages: (typeof serviceCatalog)
  selectedId: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-[11px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
          Step 2 of 6
        </p>
        <h2
          className="mt-1.5 text-[34px] leading-[1.0] tracking-[-0.02em]"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, color: "var(--foreground)" }}
        >
          Choose a <em>package</em>
        </h2>
      </div>

      <div className="space-y-3 pt-2">
        {packages.map((pkg) => {
          const selected = pkg.id === selectedId
          return (
            <button key={pkg.id} type="button" onClick={() => onSelect(pkg.id)} className="w-full text-left">
              <div
                className="relative overflow-hidden rounded-[20px] px-5 py-5 transition-all duration-200"
                style={{
                  background: selected ? "var(--primary)" : "var(--card)",
                  border: selected ? "2px solid var(--primary)" : "1.5px solid var(--border)",
                  boxShadow: selected ? "0 0 0 4px color-mix(in oklab, var(--primary) 18%, transparent)" : "none",
                }}
              >
                <span
                  className="inline-block rounded-full px-3 py-0.5 text-[9.5px] uppercase tracking-[0.1em]"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    background: selected ? "color-mix(in oklab, var(--primary-foreground) 14%, transparent)" : "var(--muted)",
                    color: selected ? "var(--primary-foreground)" : "var(--fg-3)",
                  }}
                >
                  {pkg.duration}
                </span>
                <p
                  className="mt-3 text-[42px] leading-none tracking-[-0.03em]"
                  style={{ fontFamily: "'Instrument Serif', serif", color: selected ? "var(--primary-foreground)" : "var(--foreground)" }}
                >
                  {pkg.price}
                </p>
                <p
                  className="mt-2 text-[16px] font-medium"
                  style={{ color: selected ? "var(--primary-foreground)" : "var(--foreground)" }}
                >
                  {pkg.name}
                </p>
                <p
                  className="mt-1 text-[11px] leading-snug"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: selected ? "color-mix(in oklab, var(--primary-foreground) 60%, transparent)" : "var(--fg-3)",
                  }}
                >
                  {pkg.description}
                </p>
                {selected && (
                  <div className="absolute right-4 top-4">
                    <div
                      className="flex h-6 w-6 items-center justify-center rounded-full"
                      style={{ background: "color-mix(in oklab, var(--primary-foreground) 18%, transparent)" }}
                    >
                      <span style={{ color: "var(--primary-foreground)", fontSize: 13, lineHeight: 1 }}>✓</span>
                    </div>
                  </div>
                )}
              </div>
            </button>
          )
        })}
        {packages.length === 0 && (
          <div className="rounded-[18px] border border-border bg-card px-5 py-6 text-center">
            <p className="text-[13px]" style={{ color: "var(--fg-3)" }}>
              No packages available for this location.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Step 3: Add-ons ────────────────────────────────────────────────────

function StepAddons({ selectedIds, onToggle }: { selectedIds: string[]; onToggle: (id: string) => void }) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-[11px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
          Step 5 of 6
        </p>
        <h2
          className="mt-1.5 text-[34px] leading-[1.0] tracking-[-0.02em]"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, color: "var(--foreground)" }}
        >
          Any <em>extras</em>?
        </h2>
        <p className="mt-1.5 text-[11.5px]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
          Optional — tap to add, tap again to remove.
        </p>
      </div>

      <div className="space-y-2.5 pt-2">
        {availableAddOns.map((item) => {
          const selected = selectedIds.includes(item.id)
          return (
            <button key={item.id} type="button" onClick={() => onToggle(item.id)} className="w-full text-left">
              <div
                className="flex items-center justify-between rounded-[16px] border px-5 py-4 transition-all duration-200"
                style={{
                  borderColor: selected ? "var(--primary)" : "var(--border)",
                  background: selected ? "color-mix(in oklab, var(--primary) 9%, var(--card))" : "var(--card)",
                  boxShadow: selected ? "0 0 0 3px color-mix(in oklab, var(--primary) 16%, transparent)" : "none",
                }}
              >
                <p
                  className="text-[15px]"
                  style={{ color: selected ? "var(--primary)" : "var(--foreground)" }}
                >
                  {item.label}
                </p>
                <div className="flex items-center gap-3.5">
                  <span
                    className="text-[20px] leading-none tracking-[-0.02em]"
                    style={{ fontFamily: "'Instrument Serif', serif", color: selected ? "var(--primary)" : "var(--muted-foreground)" }}
                  >
                    {item.price}
                  </span>
                  <div
                    className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-all"
                    style={{
                      background: selected ? "var(--primary)" : "var(--muted)",
                      border: selected ? "none" : "1.5px solid var(--border)",
                    }}
                  >
                    {selected && <span style={{ color: "var(--primary-foreground)", fontSize: 12, lineHeight: 1 }}>✓</span>}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Step 4: Location ───────────────────────────────────────────────────

function StepLocation({ selected, onSelect }: { selected: string; onSelect: (loc: string) => void }) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-[11px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
          Step 1 of 6
        </p>
        <h2
          className="mt-1.5 text-[34px] leading-[1.0] tracking-[-0.02em]"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, color: "var(--foreground)" }}
        >
          Where <em>today</em>?
        </h2>
      </div>

      <div className="space-y-3 pt-2">
        {locations.map((loc) => {
          const isSelected = selected === loc
          return (
            <button key={loc} type="button" onClick={() => onSelect(loc)} className="w-full text-left">
              <div
                className="flex items-center gap-4 rounded-[18px] border px-5 py-5 transition-all duration-200"
                style={{
                  borderColor: isSelected ? "var(--primary)" : "var(--border)",
                  background: isSelected ? "color-mix(in oklab, var(--primary) 9%, var(--card))" : "var(--card)",
                  boxShadow: isSelected ? "0 0 0 3px color-mix(in oklab, var(--primary) 16%, transparent)" : "none",
                }}
              >
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ background: isSelected ? "color-mix(in oklab, var(--primary) 18%, transparent)" : "var(--muted)" }}
                >
                  <HugeiconsIcon icon={Location01Icon} size={18} strokeWidth={1.6} primaryColor={isSelected ? "var(--primary)" : "var(--fg-3)"} />
                </div>
                <p
                  className="text-[16px]"
                  style={{ color: isSelected ? "var(--primary)" : "var(--foreground)" }}
                >
                  {loc}
                </p>
                {isSelected && (
                  <div className="ml-auto flex h-6 w-6 items-center justify-center rounded-full" style={{ background: "var(--primary)" }}>
                    <span style={{ color: "var(--primary-foreground)", fontSize: 12, lineHeight: 1 }}>✓</span>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Step 5: Time ───────────────────────────────────────────────────────

function StepTime({
  slots,
  selected,
  onSelect,
}: {
  slots: string[]
  selected: string
  onSelect: (t: string) => void
}) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-[11px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
          Step 3 of 6
        </p>
        <h2
          className="mt-1.5 text-[34px] leading-[1.0] tracking-[-0.02em]"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, color: "var(--foreground)" }}
        >
          Pick a <em>time</em>
        </h2>
        <p className="mt-1.5 text-[11px] uppercase tracking-[0.08em]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
          May 20, 2026
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        {slots.map((slot) => {
          const isSelected = selected === slot
          return (
            <button key={slot} type="button" onClick={() => onSelect(slot)}>
              <div
                className="flex flex-col items-center justify-center rounded-[18px] border py-6 transition-all duration-200"
                style={{
                  borderColor: isSelected ? "var(--primary)" : "var(--border)",
                  background: isSelected ? "color-mix(in oklab, var(--primary) 9%, var(--card))" : "var(--card)",
                  boxShadow: isSelected ? "0 0 0 3px color-mix(in oklab, var(--primary) 16%, transparent)" : "none",
                }}
              >
                <p
                  className="text-[24px] leading-none tracking-[-0.02em]"
                  style={{ fontFamily: "'Instrument Serif', serif", color: isSelected ? "var(--primary)" : "var(--foreground)" }}
                >
                  {slot}
                </p>
              </div>
            </button>
          )
        })}
      </div>
      {slots.length === 0 && (
        <div className="rounded-[18px] border border-border bg-card px-5 py-6 text-center">
          <p className="text-[13px]" style={{ color: "var(--fg-3)" }}>
            No time slots available for this location.
          </p>
        </div>
      )}
    </div>
  )
}

// ── Step 6: Confirm ────────────────────────────────────────────────────

function StepConfirm({
  vehicle,
  service,
  addons,
  location,
  time,
  total,
  onConfirm,
}: {
  vehicle: { name: string; plate: string; color: string; year: number } | undefined
  service: (typeof serviceCatalog)[number] | undefined
  addons: (typeof availableAddOns)[number][]
  location: string
  time: string
  total: string
  onConfirm: () => void
}) {
  const hex = vehicle ? colorToHex(vehicle.color) : "#3a3a3a"
  const light = isLightColor(hex)

  return (
    <div className="space-y-4">
      <div>
        <p className="text-[11px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
          Step 6 of 6
        </p>
        <h2
          className="mt-1.5 text-[34px] leading-[1.0] tracking-[-0.02em]"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, color: "var(--foreground)" }}
        >
          Looks <em>good</em>?
        </h2>
      </div>

      {vehicle && (
        <div
          className="relative overflow-hidden rounded-[18px]"
          style={{ height: 88, background: `linear-gradient(135deg, ${hex} 0%, color-mix(in oklab, ${hex} 40%, var(--card)) 55%, var(--card) 100%)` }}
        >
          <div className="absolute inset-0 flex flex-col justify-end px-5 pb-4">
            <p className="text-[16px] font-medium" style={{ color: light ? "rgba(0,0,0,0.88)" : "white" }}>
              {vehicle.name}
            </p>
            <p
              className="text-[10px] uppercase tracking-[0.1em]"
              style={{ fontFamily: "'Outfit', sans-serif", color: light ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.5)" }}
            >
              {vehicle.plate} · {vehicle.color}
            </p>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-[18px] border border-border" style={{ background: "var(--card)" }}>
        <div className="divide-y divide-border">
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: "var(--muted)" }}>
                <HugeiconsIcon icon={Car01Icon} size={15} strokeWidth={1.6} primaryColor="var(--fg-3)" />
              </div>
              <div>
                <p className="text-[13px] font-medium">{service?.name}</p>
                <p className="text-[10px]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>{service?.duration}</p>
              </div>
            </div>
            <span className="text-[18px] tracking-[-0.02em]" style={{ fontFamily: "'Instrument Serif', serif" }}>{service?.price}</span>
          </div>

          {addons.map((addon) => (
            <div key={addon.id} className="flex items-center justify-between px-5 py-3.5">
              <p className="text-[13px]" style={{ color: "var(--muted-foreground)" }}>+ {addon.label}</p>
              <span className="text-[15px]" style={{ fontFamily: "'Instrument Serif', serif", color: "var(--muted-foreground)" }}>{addon.price}</span>
            </div>
          ))}

          <div className="flex items-center gap-3 px-5 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: "var(--muted)" }}>
              <HugeiconsIcon icon={Location01Icon} size={15} strokeWidth={1.6} primaryColor="var(--fg-3)" />
            </div>
            <p className="text-[13px] font-medium">{location}</p>
          </div>

          <div className="flex items-center gap-3 px-5 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: "var(--muted)" }}>
              <HugeiconsIcon icon={Calendar01Icon} size={15} strokeWidth={1.6} primaryColor="var(--fg-3)" />
            </div>
            <p className="text-[13px] font-medium">May 20, 2026 · {time}</p>
          </div>
        </div>

        <div
          className="flex items-baseline justify-between border-t border-border px-5 py-5"
          style={{ background: "var(--background)" }}
        >
          <span className="text-[11px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
            Total
          </span>
          <span className="text-[40px] leading-none tracking-[-0.03em]" style={{ fontFamily: "'Instrument Serif', serif", color: "var(--primary)" }}>
            {total}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onConfirm}
        className="flex w-full items-center justify-center gap-2 rounded-full py-4 text-[15px] tracking-[-0.01em] transition hover:opacity-90 active:scale-[0.98]"
        style={{ fontFamily: "'Instrument Serif', serif", background: "var(--primary)", color: "var(--primary-foreground)" }}
      >
        <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} strokeWidth={1.8} />
        Confirm &amp; pay
      </button>

      <p className="text-center text-[10.5px]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
        You'll receive a confirmation when a technician is assigned.
      </p>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────

export function CustomerBookingPage() {
  const { vehicles, addBooking } = useCustomerStore()
  const navigate = useNavigate()

  const [categoryChosen, setCategoryChosen] = useState(false)
  const [step, setStep] = useState<Step>(0)
  const [confirmed, setConfirmed] = useState(false)
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0]?.id ?? "")
  const [selectedServiceId, setSelectedServiceId] = useState("")
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")

  const locationServices = selectedLocation ? LOCATION_SERVICES[selectedLocation as (typeof locations)[number]] ?? [] : []
  const locationTimeSlots = selectedLocation ? LOCATION_TIMES[selectedLocation as (typeof locations)[number]] ?? [] : []
  const availableServices = serviceCatalog.filter((service) => locationServices.includes(service.id))

  useEffect(() => {
    if (!selectedLocation) {
      setSelectedServiceId("")
      setSelectedTime("")
      return
    }
    if (!locationServices.includes(selectedServiceId)) {
      setSelectedServiceId(locationServices[0] ?? "")
    }
    if (!locationTimeSlots.includes(selectedTime)) {
      setSelectedTime(locationTimeSlots[0] ?? "")
    }
  }, [locationServices, locationTimeSlots, selectedLocation, selectedServiceId, selectedTime])

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) ?? vehicles[0]
  const selectedService = availableServices.find((s) => s.id === selectedServiceId) ?? availableServices[0]
  const selectedAddOnRecords = availableAddOns.filter((item) => selectedAddOns.includes(item.id))

  const total = useMemo(() => {
    const base = Number((selectedService?.price ?? "$0").replace(/[$,]/g, ""))
    const extras = selectedAddOnRecords.reduce((sum, item) => sum + Number(item.price.replace(/[$,]/g, "")), 0)
    return `$${base + extras}`
  }, [selectedAddOnRecords, selectedService?.price])

  function advance() { setStep((s) => Math.min(s + 1, 5) as Step) }
  function back() {
    if (step === 0) {
      setCategoryChosen(false)
    } else {
      setStep((s) => Math.max(s - 1, 0) as Step)
    }
  }

  function toggleAddOn(id: string) {
    setSelectedAddOns((curr) => curr.includes(id) ? curr.filter((i) => i !== id) : [...curr, id])
  }

  function handleConfirm() {
    addBooking({
      vehicleId: selectedVehicleId,
      serviceId: selectedServiceId,
      addons: selectedAddOnRecords.map((a) => a.label),
      dateLabel: "May 20, 2026",
      time: selectedTime,
      location: selectedLocation,
      status: "Confirmed",
      technician: "Unassigned",
      amount: total,
      paymentStatus: "Paid",
      notes: "",
    })
    setConfirmed(true)
    setTimeout(() => navigate("/customer/home"), 2500)
  }

  // ── Confirmed ──────────────────────────────────────────────────────────

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
        <div
          className="flex h-24 w-24 items-center justify-center rounded-full"
          style={{ background: "color-mix(in oklab, var(--primary) 12%, var(--card))", border: "1px solid color-mix(in oklab, var(--primary) 28%, transparent)" }}
        >
          <HugeiconsIcon icon={CheckmarkCircle01Icon} size={50} strokeWidth={1.2} primaryColor="var(--primary)" />
        </div>
        <div>
          <h2
            className="text-[36px] tracking-[-0.02em]"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            All <em>booked</em>
          </h2>
          <p className="mt-2 text-[11px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
            {selectedService?.name ?? "Service"} · {selectedTime}
          </p>
        </div>
        <p className="text-[11px]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
          Heading back to home…
        </p>
      </div>
    )
  }

  // ── No vehicles ────────────────────────────────────────────────────────

  if (vehicles.length === 0) {
    return (
      <div className="space-y-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
            Booking
          </p>
          <h1
            className="mt-1 leading-none tracking-[-0.03em]"
            style={{ fontFamily: "'Instrument Serif', serif", fontSize: 38, fontWeight: 400, color: "var(--foreground)" }}
          >
            Start a <em>new booking</em>
          </h1>
        </div>
        <div className="flex min-h-[58vh] items-center justify-center px-6">
          <div className="flex flex-col items-center justify-center gap-5 text-center">
            <div style={{ color: "color-mix(in oklab, var(--primary) 50%, var(--fg-3))" }}>
              <BookingEmptyIllustration />
            </div>
            <div>
              <p
                className="text-[22px] tracking-[-0.02em]"
                style={{ fontFamily: "'Instrument Serif', serif", color: "var(--foreground)", fontWeight: 400 }}
              >
                No vehicles yet
              </p>
              <p className="mt-1.5 text-[13px]" style={{ color: "var(--muted-foreground)" }}>
                Add a vehicle before booking a service.
              </p>
            </div>
            <Link
              to="/customer/vehicles/new"
              className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-[14px] font-medium transition hover:opacity-90 active:scale-[0.98]"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              Add your first vehicle
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ── Category selection ─────────────────────────────────────────────────

  if (!categoryChosen) {
    return <ServiceCategoryScreen onSelect={() => setCategoryChosen(true)} />
  }

  // ── Stepper ────────────────────────────────────────────────────────────

  return (
    <div className="space-y-5">
      {/* Top nav */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <BackButton onClick={back} />
          <span className="text-[10px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}>
            {step + 1} / {STEPS.length}
          </span>
        </div>
        <StepBar step={step} />
      </div>

      {/* Step content */}
      <div>
        {step === 0 && <StepLocation selected={selectedLocation} onSelect={setSelectedLocation} />}
        {step === 1 && (
          <StepPackage
            packages={availableServices}
            selectedId={selectedServiceId}
            onSelect={setSelectedServiceId}
          />
        )}
        {step === 2 && <StepTime slots={locationTimeSlots} selected={selectedTime} onSelect={setSelectedTime} />}
        {step === 3 && <StepVehicle vehicles={vehicles} selectedId={selectedVehicleId} onSelect={setSelectedVehicleId} />}
        {step === 4 && <StepAddons selectedIds={selectedAddOns} onToggle={toggleAddOn} />}
        {step === 5 && (
          <StepConfirm
            vehicle={selectedVehicle}
            service={selectedService}
            addons={selectedAddOnRecords}
            location={selectedLocation}
            time={selectedTime}
            total={total}
            onConfirm={handleConfirm}
          />
        )}
      </div>

      {step < 5 && (
        <ContinueButton
          label={step === 4 ? "Review booking" : "Continue"}
          onClick={advance}
          disabled={
            (step === 0 && !selectedLocation)
            || (step === 1 && !selectedServiceId)
            || (step === 2 && !selectedTime)
            || (step === 3 && !selectedVehicleId)
          }
        />
      )}
    </div>
  )
}

