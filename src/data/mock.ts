export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Assigned"
  | "In progress"
  | "Ready"
  | "Completed"
  | "Paid"
  | "Pending payment"
  | "On shift"
  | "Off shift"
  | "Active"

export type VehicleRecord = {
  id: string
  customerId: string
  name: string
  make: string
  model: string
  year: number
  color: string
  plate: string
  status: string
  preference: string
}

export type CustomerRecord = {
  id: string
  name: string
  email: string
  phone: string
  membership: string
  spend: string
  vehicleIds: string[]
}

export type ServicePackage = {
  id: string
  name: string
  duration: string
  price: string
  description: string
  state: string
}

export type BookingRecord = {
  id: string
  customerId: string
  vehicleId: string
  serviceId: string
  addons: string[]
  dateLabel: string
  time: string
  location: string
  status: BookingStatus
  technician: string
  amount: string
  paymentStatus: BookingStatus
  notes: string
}

export type TeamMember = {
  id: string
  name: string
  status: BookingStatus
  jobs: number
  avg: string
}

export type PaymentRecord = {
  ref: string
  bookingId: string
  state: BookingStatus
  amount: string
}

export const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Memberships", href: "#memberships" },
  { label: "Workflow", href: "#workflow" },
] as const

export const customerNav = [
  { to: "/customer/home", label: "Home" },
  { to: "/customer/book", label: "Book service" },
  { to: "/customer/vehicles", label: "Vehicles" },
  { to: "/customer/membership", label: "Membership" },
  { to: "/customer/history", label: "History" },
  { to: "/customer/account", label: "Account" },
] as const

export const operatorNav = [
  { to: "/operator/dashboard", label: "Dashboard" },
  { to: "/operator/bookings", label: "Bookings" },
  { to: "/operator/customers", label: "Customers" },
  { to: "/operator/vehicles", label: "Vehicles" },
  { to: "/operator/services", label: "Services" },
  { to: "/operator/memberships", label: "Memberships" },
  { to: "/operator/team", label: "Team" },
  { to: "/operator/payments", label: "Payments" },
  { to: "/operator/reports", label: "Reports" },
  { to: "/operator/settings", label: "Settings" },
] as const

export const technicianNav = [
  { to: "/technician/jobs/active", label: "Active job" },
  { to: "/technician/jobs/completed", label: "Completed" },
  { to: "/technician/profile", label: "Profile" },
] as const

export const operatorMetrics = [
  { label: "Bookings today", value: "124", delta: "+14%" },
  { label: "Active memberships", value: "2,481", delta: "+8%" },
  { label: "Completed jobs", value: "97", delta: "+11%" },
  { label: "Revenue today", value: "$14.8k", delta: "+19%" },
] as const

export const bookingTimeline = [
  { label: "Confirmed", done: true },
  { label: "Assigned", done: true },
  { label: "In progress", done: true },
  { label: "Ready", done: false },
  { label: "Completed", done: false },
] as const

export const bookingSteps = [
  "Vehicle",
  "Package",
  "Add-ons",
  "Location",
  "Time",
  "Review",
  "Payment",
] as const

export const availableAddOns = [
  { id: "addon-ceramic", label: "Ceramic top-off", price: "$45" },
  { id: "addon-leather", label: "Leather reset", price: "$30" },
  { id: "addon-headlight", label: "Headlight polish", price: "$25" },
  { id: "addon-tire", label: "Tire dressing", price: "$15" },
] as const

export const locations = ["Miami Design District", "Brickell Flagship", "Mobile service"] as const
export const timeSlots = ["9:00 AM", "10:30 AM", "12:45 PM", "2:15 PM"] as const

export const serviceCatalog: ServicePackage[] = [
  {
    id: "svc-signature",
    name: "Signature Wash",
    duration: "35 min",
    price: "$45",
    description: "Fast exterior refresh for repeat weekly care.",
    state: "Active",
  },
  {
    id: "svc-premium",
    name: "Premium Detail",
    duration: "110 min",
    price: "$260",
    description: "Interior and exterior detail for high-value customer vehicles.",
    state: "Active",
  },
  {
    id: "svc-interior",
    name: "Interior Reset",
    duration: "60 min",
    price: "$120",
    description: "Deep interior refresh with odor and trim attention.",
    state: "Active",
  },
]

export const customers: CustomerRecord[] = [
  {
    id: "CUS-12",
    name: "Jordan Lee",
    email: "jordan@vco-demo.com",
    phone: "+1 (305) 555-0114",
    membership: "Premium",
    spend: "$1,820",
    vehicleIds: ["veh-g", "veh-p"],
  },
  {
    id: "CUS-44",
    name: "Maya Patel",
    email: "maya@vco-demo.com",
    phone: "+1 (305) 555-0144",
    membership: "Signature",
    spend: "$740",
    vehicleIds: ["veh-c"],
  },
  {
    id: "CUS-52",
    name: "Chris Wallace",
    email: "chris@vco-demo.com",
    phone: "+1 (305) 555-0152",
    membership: "None",
    spend: "$360",
    vehicleIds: ["veh-r"],
  },
]

export const vehicles: VehicleRecord[] = [
  {
    id: "veh-g",
    customerId: "CUS-12",
    name: "Mercedes G-Class",
    make: "Mercedes",
    model: "G-Class",
    year: 2025,
    color: "Obsidian Black",
    plate: "VCO-204",
    status: "Primary vehicle",
    preference: "Wheel finish and rear-seat interior attention",
  },
  {
    id: "veh-p",
    customerId: "CUS-12",
    name: "Porsche Cayenne",
    make: "Porsche",
    model: "Cayenne",
    year: 2024,
    color: "Arctic Grey",
    plate: "VCO-318",
    status: "Secondary vehicle",
    preference: "Weekly gloss upkeep",
  },
  {
    id: "veh-c",
    customerId: "CUS-44",
    name: "Porsche Cayenne",
    make: "Porsche",
    model: "Cayenne",
    year: 2024,
    color: "Graphite",
    plate: "VCO-552",
    status: "Primary vehicle",
    preference: "Interior fragrance free",
  },
  {
    id: "veh-r",
    customerId: "CUS-52",
    name: "Range Rover Sport",
    make: "Range Rover",
    model: "Sport",
    year: 2023,
    color: "Santorini Black",
    plate: "VCO-441",
    status: "Primary vehicle",
    preference: "Quick exterior turnaround",
  },
]

export const bookings: BookingRecord[] = [
  {
    id: "BK-2048",
    customerId: "CUS-12",
    vehicleId: "veh-g",
    serviceId: "svc-premium",
    addons: ["Ceramic top-off", "Leather reset"],
    dateLabel: "Apr 2, 2026",
    time: "10:30 AM",
    location: "Miami Design District",
    status: "In progress",
    technician: "Rafael M.",
    amount: "$260",
    paymentStatus: "Paid",
    notes: "Customer requested extra attention on rear seats and wheel finish.",
  },
  {
    id: "BK-2053",
    customerId: "CUS-44",
    vehicleId: "veh-c",
    serviceId: "svc-signature",
    addons: [],
    dateLabel: "Apr 2, 2026",
    time: "11:15 AM",
    location: "Brickell Flagship",
    status: "Assigned",
    technician: "Dante C.",
    amount: "$85",
    paymentStatus: "Paid",
    notes: "Customer waiting in lounge.",
  },
  {
    id: "BK-2061",
    customerId: "CUS-52",
    vehicleId: "veh-r",
    serviceId: "svc-interior",
    addons: ["Tire dressing"],
    dateLabel: "Apr 2, 2026",
    time: "12:45 PM",
    location: "Brickell Flagship",
    status: "Confirmed",
    technician: "Unassigned",
    amount: "$120",
    paymentStatus: "Pending payment",
    notes: "Interior odor reset requested.",
  },
  {
    id: "BK-1982",
    customerId: "CUS-12",
    vehicleId: "veh-g",
    serviceId: "svc-signature",
    addons: [],
    dateLabel: "Mar 18, 2026",
    time: "9:00 AM",
    location: "Miami Design District",
    status: "Completed",
    technician: "Rafael M.",
    amount: "$45",
    paymentStatus: "Paid",
    notes: "Completed on time.",
  },
  {
    id: "BK-1931",
    customerId: "CUS-12",
    vehicleId: "veh-g",
    serviceId: "svc-interior",
    addons: ["Leather reset"],
    dateLabel: "Mar 1, 2026",
    time: "2:15 PM",
    location: "Miami Design District",
    status: "Completed",
    technician: "Sophia T.",
    amount: "$120",
    paymentStatus: "Paid",
    notes: "Rear-seat attention completed as requested.",
  },
]

export const teamMembers: TeamMember[] = [
  { id: "tech-1", name: "Rafael M.", status: "On shift", jobs: 4, avg: "54 min" },
  { id: "tech-2", name: "Dante C.", status: "On shift", jobs: 3, avg: "46 min" },
  { id: "tech-3", name: "Sophia T.", status: "Off shift", jobs: 0, avg: "51 min" },
]

export const payments: PaymentRecord[] = [
  { ref: "PAY-1002", bookingId: "BK-2048", state: "Paid", amount: "$260" },
  { ref: "PAY-1007", bookingId: "BK-2053", state: "Paid", amount: "$85" },
  { ref: "PAY-1011", bookingId: "BK-2061", state: "Pending payment", amount: "$120" },
]

export const technicianChecklist = [
  { label: "Foam wash", done: true },
  { label: "Wheel and tire detail", done: true },
  { label: "Interior vacuum and wipe-down", done: true },
  { label: "Leather conditioning", done: false },
  { label: "Final gloss inspection", done: false },
] as const

export function getCustomerById(id: string) {
  return customers.find((customer) => customer.id === id)
}

export function getVehicleById(id: string) {
  return vehicles.find((vehicle) => vehicle.id === id)
}

export function getServiceById(id: string) {
  return serviceCatalog.find((service) => service.id === id)
}

export function getBookingById(id: string) {
  return bookings.find((booking) => booking.id === id)
}

export function getVehiclesByCustomerId(customerId: string) {
  return vehicles.filter((vehicle) => vehicle.customerId === customerId)
}

export function getBookingsByCustomerId(customerId: string) {
  return bookings.filter((booking) => booking.customerId === customerId)
}

export function getBookingsByVehicleId(vehicleId: string) {
  return bookings.filter((booking) => booking.vehicleId === vehicleId)
}

export function getPaymentByBookingId(bookingId: string) {
  return payments.find((payment) => payment.bookingId === bookingId)
}

export function getBookingDisplay(booking: BookingRecord) {
  const customer = getCustomerById(booking.customerId)
  const vehicle = getVehicleById(booking.vehicleId)
  const service = getServiceById(booking.serviceId)

  return {
    ...booking,
    customerName: customer?.name ?? "Unknown customer",
    customerEmail: customer?.email ?? "",
    customerPhone: customer?.phone ?? "",
    membership: customer?.membership ?? "None",
    vehicleName: vehicle?.name ?? "Unknown vehicle",
    plate: vehicle?.plate ?? "",
    color: vehicle?.color ?? "",
    serviceName: service?.name ?? "Unknown service",
    serviceDuration: service?.duration ?? "",
    servicePrice: service?.price ?? booking.amount,
  }
}
