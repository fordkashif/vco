import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons"
import {
  VEHICLE_COLORS,
  VEHICLE_MAKES,
  colorToHex,
  useCustomerStore,
} from "@/store/customer-store"

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 20 }, (_, i) => CURRENT_YEAR - i)

type FormState = {
  year: number
  make: string
  model: string
  color: string
  plate: string
}

type FieldErrors = Partial<Record<keyof FormState, string>>

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-1.5 text-[10px] uppercase tracking-[0.1em]"
      style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
    >
      {children}
    </p>
  )
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return (
    <p className="mt-1 text-[10.5px]" style={{ color: "var(--destructive)", fontFamily: "'Outfit', sans-serif" }}>
      {msg}
    </p>
  )
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 10,
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--foreground)",
  fontFamily: "'Outfit', sans-serif",
  fontSize: 15,
  padding: "10px 14px",
  outline: "none",
  appearance: "none",
}

const inputFocusClass = "focus:outline-none focus:ring-0"

export function CustomerAddVehiclePage() {
  const navigate = useNavigate()
  const { addVehicle } = useCustomerStore()

  const [form, setForm] = useState<FormState>({
    year: CURRENT_YEAR,
    make: "",
    model: "",
    color: VEHICLE_COLORS[0],
    plate: "",
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [saved, setSaved] = useState(false)

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate(): FieldErrors {
    const errs: FieldErrors = {}
    if (!form.make) errs.make = "Select a make"
    if (!form.model.trim()) errs.model = "Enter the model"
    return errs
  }

  function handleSubmit() {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    addVehicle(form)
    setSaved(true)
    setTimeout(() => navigate("/customer/vehicles"), 1400)
  }

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <div style={{ color: "var(--primary)" }}>
          <HugeiconsIcon icon={CheckmarkCircle01Icon} size={52} strokeWidth={1.4} />
        </div>
        <h2
          className="text-[26px] tracking-[-0.02em]"
          style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, color: "var(--foreground)" }}
        >
          {form.year} {form.make} <em>{form.model}</em>
        </h2>
        <p
          className="text-[11px] uppercase tracking-[0.08em]"
          style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
        >
          Added to your garage
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start gap-3">
        <button
          onClick={() => navigate(-1)}
          className="mt-1 flex-shrink-0"
          style={{ color: "var(--fg-3)" }}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={20} strokeWidth={1.6} />
        </button>
        <div>
          <p
            className="text-[10.5px] uppercase tracking-[0.1em]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
          >
            Garage · New vehicle
          </p>
          <h1
            className="mt-0.5 text-[30px] leading-none tracking-[-0.025em]"
            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, color: "var(--foreground)" }}
          >
            Add a <em>vehicle</em>
          </h1>
        </div>
      </div>

      {/* Form card */}
      <div className="rounded-[16px] border border-border bg-card p-5 space-y-5">

        {/* Year + Make row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Year</Label>
            <select
              value={form.year}
              onChange={(e) => set("year", Number(e.target.value))}
              style={inputStyle}
              className={inputFocusClass}
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Make</Label>
            <select
              value={form.make}
              onChange={(e) => set("make", e.target.value)}
              style={{
                ...inputStyle,
                borderColor: errors.make ? "var(--destructive)" : "var(--border)",
              }}
              className={inputFocusClass}
            >
              <option value="">Select…</option>
              {VEHICLE_MAKES.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <FieldError msg={errors.make} />
          </div>
        </div>

        {/* Model */}
        <div>
          <Label>Model</Label>
          <input
            type="text"
            placeholder="e.g. G-Class, Model S, Cayenne…"
            value={form.model}
            onChange={(e) => set("model", e.target.value)}
            style={{
              ...inputStyle,
              borderColor: errors.model ? "var(--destructive)" : "var(--border)",
            }}
            className={inputFocusClass}
          />
          <FieldError msg={errors.model} />
        </div>

        {/* Color */}
        <div>
          <Label>Colour</Label>
          <div className="grid grid-cols-4 gap-2 mt-1">
            {VEHICLE_COLORS.map((c) => {
              const selected = form.color === c
              return (
                <button
                  key={c}
                  onClick={() => set("color", c)}
                  className="flex flex-col items-center gap-1.5 rounded-[10px] border p-2 transition-all"
                  style={{
                    borderColor: selected ? "var(--primary)" : "var(--border)",
                    background: selected
                      ? "color-mix(in oklab, var(--primary) 8%, var(--card))"
                      : "var(--background)",
                  }}
                >
                  <span
                    className="block rounded-full"
                    style={{
                      width: 28,
                      height: 28,
                      background: colorToHex(c),
                      border: "1.5px solid color-mix(in oklab, var(--border) 60%, transparent)",
                      boxShadow: selected ? `0 0 0 2px var(--primary)` : "none",
                    }}
                  />
                  <span
                    className="text-center leading-tight"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 8,
                      color: selected ? "var(--primary)" : "var(--fg-3)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {c.split(" ").map((w) => w[0]).join("").toUpperCase()}
                  </span>
                </button>
              )
            })}
          </div>
          <p
            className="mt-2 text-[11px]"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--fg-3)" }}
          >
            Selected: {form.color}
          </p>
        </div>

        {/* Plate */}
        <div>
          <Label>Plate <span style={{ opacity: 0.5 }}>— optional</span></Label>
          <input
            type="text"
            placeholder="ABC-1234"
            value={form.plate}
            onChange={(e) => set("plate", e.target.value.toUpperCase())}
            style={{ ...inputStyle, textTransform: "uppercase", letterSpacing: "0.08em" }}
            className={inputFocusClass}
            maxLength={12}
          />
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-[14px] font-medium text-primary-foreground transition hover:opacity-90 active:scale-[0.98]"
      >
        Add to garage
        <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.8} />
      </button>

    </div>
  )
}

