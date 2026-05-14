import { createContext, useContext, useEffect, useState } from "react"
import type { BookingRecord, BookingStatus, VehicleRecord } from "@/data/mock"
import { bookings as seedBookings, vehicles as seedVehicles } from "@/data/mock"

export const PRIMARY_CUSTOMER_ID = "CUS-12"
const PRIMARY_TECHNICIAN = "Rafael M."

// New key forces a clean seed — old format had `bookings`, not `allBookings`
const STORAGE_KEY = "vco-app-store-v2"

// ── Internal state shape ───────────────────────────────────────────────

type StoreState = {
  vehicles: VehicleRecord[]   // CUS-12's vehicles only
  allBookings: BookingRecord[] // every booking across all customers
}

// ── Public types ───────────────────────────────────────────────────────

export type NewVehicleInput = {
  make: string
  model: string
  year: number
  color: string
  plate: string
}

type AppStore = {
  vehicles: VehicleRecord[]
  bookings: BookingRecord[]       // CUS-12 only — for customer pages
  allBookings: BookingRecord[]    // all — for operator / technician pages
  addVehicle: (data: NewVehicleInput) => VehicleRecord
  addBooking: (data: Omit<BookingRecord, "id" | "customerId">) => BookingRecord
  updateBookingStatus: (id: string, status: BookingStatus) => void
  resetToSeed: () => void
  clearCustomerData: () => void
}

// ── Seed ──────────────────────────────────────────────────────────────

function seed(): StoreState {
  return {
    vehicles: seedVehicles.filter((v) => v.customerId === PRIMARY_CUSTOMER_ID),
    allBookings: [...seedBookings],
  }
}

function loadState(): StoreState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as StoreState
      if (Array.isArray(parsed.allBookings)) return parsed
    }
  } catch {
    // Ignore malformed local data and fall back to seed state.
  }
  return seed()
}

// ── Context ───────────────────────────────────────────────────────────

const Ctx = createContext<AppStore | null>(null)

export function CustomerStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoreState>(loadState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  function addVehicle(data: NewVehicleInput): VehicleRecord {
    const vehicle: VehicleRecord = {
      id: `veh-${Date.now()}`,
      customerId: PRIMARY_CUSTOMER_ID,
      name: `${data.year} ${data.make} ${data.model}`,
      make: data.make,
      model: data.model,
      year: data.year,
      color: data.color,
      plate: data.plate.toUpperCase(),
      status: state.vehicles.length === 0 ? "Primary vehicle" : "Secondary vehicle",
      preference: "",
    }
    setState((prev) => ({ ...prev, vehicles: [...prev.vehicles, vehicle] }))
    return vehicle
  }

  function addBooking(data: Omit<BookingRecord, "id" | "customerId">): BookingRecord {
    const booking: BookingRecord = {
      ...data,
      id: `BK-${Math.floor(Math.random() * 9000) + 2100}`,
      customerId: PRIMARY_CUSTOMER_ID,
    }
    setState((prev) => ({ ...prev, allBookings: [...prev.allBookings, booking] }))
    return booking
  }

  function updateBookingStatus(id: string, status: BookingStatus) {
    setState((prev) => ({
      ...prev,
      allBookings: prev.allBookings.map((b) =>
        b.id === id ? { ...b, status } : b
      ),
    }))
  }

  function resetToSeed() {
    setState(seed())
  }

  function clearCustomerData() {
    setState((prev) => ({
      ...prev,
      vehicles: [],
      allBookings: prev.allBookings.filter((b) => b.customerId !== PRIMARY_CUSTOMER_ID),
    }))
  }

  const customerBookings = state.allBookings.filter(
    (b) => b.customerId === PRIMARY_CUSTOMER_ID
  )

  return (
    <Ctx.Provider
      value={{
        vehicles: state.vehicles,
        bookings: customerBookings,
        allBookings: state.allBookings,
        addVehicle,
        addBooking,
        updateBookingStatus,
        resetToSeed,
        clearCustomerData,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}

export function useCustomerStore() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useCustomerStore must be used inside CustomerStoreProvider")
  return ctx
}

// Alias used by technician / operator surfaces
export const useAppStore = useCustomerStore

// ── Derived helpers ────────────────────────────────────────────────────

export function getActiveBooking(bookings: BookingRecord[]) {
  return bookings.find((b) => b.status === "In progress" || b.status === "Ready") ?? null
}

export function getUpcomingBooking(bookings: BookingRecord[]) {
  return bookings.find((b) => b.status === "Confirmed" || b.status === "Assigned") ?? null
}

export function getCompletedBookings(bookings: BookingRecord[]) {
  return bookings.filter((b) => b.status === "Completed" || b.status === "Paid")
}

export function getTechnicianBookings(allBookings: BookingRecord[], techName = PRIMARY_TECHNICIAN) {
  return allBookings.filter((b) => b.technician === techName)
}

// ── Color helpers ──────────────────────────────────────────────────────

const COLOR_MAP: Record<string, string> = {
  "obsidian black":       "#0f0f0f",
  "santorini black":      "#1a1a2a",
  "midnight black":       "#111118",
  "pearl white":          "#ede9e4",
  "glacier white":        "#e8e8e8",
  "platinum silver":      "#9ca0a8",
  "arctic grey":          "#7a8090",
  "graphite":             "#4a4e58",
  "slate grey":           "#6b7280",
  "racing red":           "#b91c1c",
  "carmine red":          "#9b1a1a",
  "royal blue":           "#1d4ed8",
  "midnight blue":        "#1e3464",
  "british racing green": "#1a4a2a",
  "champagne gold":       "#c4a44a",
  "cognac brown":         "#7c4a28",
}

export function colorToHex(name: string): string {
  return COLOR_MAP[name.toLowerCase()] ?? "#3a3a3a"
}

// ── Static reference data ──────────────────────────────────────────────

export const VEHICLE_MAKES = [
  "Audi", "Bentley", "BMW", "Cadillac", "Ferrari", "Genesis",
  "Lamborghini", "Land Rover", "Lexus", "Maserati", "McLaren",
  "Mercedes-Benz", "Porsche", "Rolls-Royce", "Tesla", "Toyota",
  "Volvo", "Other",
]

export const VEHICLE_COLORS = [
  "Obsidian Black", "Santorini Black", "Pearl White", "Glacier White",
  "Platinum Silver", "Arctic Grey", "Graphite", "Slate Grey",
  "Racing Red", "Royal Blue", "Midnight Blue", "British Racing Green",
  "Champagne Gold",
]

export const BOOKING_TIMELINE = [
  "Confirmed",
  "Assigned",
  "In progress",
  "Ready",
  "Completed",
] as const
