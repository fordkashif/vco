import type { ReactNode } from "react"
import { lazy, Suspense } from "react"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { CustomerStoreProvider } from "@/store/customer-store"

const CustomerLayout = lazy(async () => {
  const mod = await import("@/components/app-shell/surface-layouts")
  return { default: mod.CustomerLayout }
})
const OperatorLayout = lazy(async () => {
  const mod = await import("@/components/app-shell/surface-layouts")
  return { default: mod.OperatorLayout }
})
const TechnicianLayout = lazy(async () => {
  const mod = await import("@/components/app-shell/surface-layouts")
  return { default: mod.TechnicianLayout }
})
const MarketingPage = lazy(async () => {
  const mod = await import("@/pages/marketing/marketing-page")
  return { default: mod.MarketingPage }
})
const NotFoundPage = lazy(async () => {
  const mod = await import("@/pages/not-found-page")
  return { default: mod.NotFoundPage }
})
const CustomerBookingPage = lazy(async () => {
  const mod = await import("@/pages/customer/customer-booking-page")
  return { default: mod.CustomerBookingPage }
})
const CustomerHomePage = lazy(async () => {
  const mod = await import("@/pages/customer/customer-pages")
  return { default: mod.CustomerHomePage }
})
const CustomerVehiclesPage = lazy(async () => {
  const mod = await import("@/pages/customer/customer-pages")
  return { default: mod.CustomerVehiclesPage }
})
const CustomerVehicleDetailPage = lazy(async () => {
  const mod = await import("@/pages/customer/customer-pages")
  return { default: mod.CustomerVehicleDetailPage }
})
const CustomerMembershipPage = lazy(async () => {
  const mod = await import("@/pages/customer/customer-pages")
  return { default: mod.CustomerMembershipPage }
})
const CustomerHistoryPage = lazy(async () => {
  const mod = await import("@/pages/customer/customer-pages")
  return { default: mod.CustomerHistoryPage }
})
const CustomerHistoryDetailPage = lazy(async () => {
  const mod = await import("@/pages/customer/customer-pages")
  return { default: mod.CustomerHistoryDetailPage }
})
const CustomerAccountPage = lazy(async () => {
  const mod = await import("@/pages/customer/customer-pages")
  return { default: mod.CustomerAccountPage }
})
const CustomerAddVehiclePage = lazy(async () => {
  const mod = await import("@/pages/customer/customer-add-vehicle-page")
  return { default: mod.CustomerAddVehiclePage }
})
const OperatorDashboardPage = lazy(async () => {
  const mod = await import("@/pages/operator/operator-dashboard-page")
  return { default: mod.OperatorDashboardPage }
})
const OperatorBookingDetailPage = lazy(async () => {
  const mod = await import("@/pages/operator/operator-booking-detail-page")
  return { default: mod.OperatorBookingDetailPage }
})
const OperatorBookingsPage = lazy(async () => {
  const mod = await import("@/pages/operator/operator-pages")
  return { default: mod.OperatorBookingsPage }
})
const OperatorCustomersPage = lazy(async () => {
  const mod = await import("@/pages/operator/operator-pages")
  return { default: mod.OperatorCustomersPage }
})
const OperatorCustomerDetailPage = lazy(async () => {
  const mod = await import("@/pages/operator/operator-pages")
  return { default: mod.OperatorCustomerDetailPage }
})
const OperatorVehiclesPage = lazy(async () => {
  const mod = await import("@/pages/operator/operator-pages")
  return { default: mod.OperatorVehiclesPage }
})
const OperatorVehicleDetailPage = lazy(async () => {
  const mod = await import("@/pages/operator/operator-pages")
  return { default: mod.OperatorVehicleDetailPage }
})
const OperatorServicesPage = lazy(async () => {
  const mod = await import("@/pages/operator/operator-pages")
  return { default: mod.OperatorServicesPage }
})
const OperatorMembershipsPage = lazy(async () => {
  const mod = await import("@/pages/operator/operator-pages")
  return { default: mod.OperatorMembershipsPage }
})
const OperatorTeamPage = lazy(async () => {
  const mod = await import("@/pages/operator/operator-pages")
  return { default: mod.OperatorTeamPage }
})
const OperatorPaymentsPage = lazy(async () => {
  const mod = await import("@/pages/operator/operator-pages")
  return { default: mod.OperatorPaymentsPage }
})
const OperatorReportsPage = lazy(async () => {
  const mod = await import("@/pages/operator/operator-pages")
  return { default: mod.OperatorReportsPage }
})
const OperatorSettingsPage = lazy(async () => {
  const mod = await import("@/pages/operator/operator-pages")
  return { default: mod.OperatorSettingsPage }
})
const TechnicianJobPage = lazy(async () => {
  const mod = await import("@/pages/technician/technician-job-page")
  return { default: mod.TechnicianJobPage }
})
const TechnicianTodayPage = lazy(async () => {
  const mod = await import("@/pages/technician/technician-pages")
  return { default: mod.TechnicianTodayPage }
})
const TechnicianCompletedJobsPage = lazy(async () => {
  const mod = await import("@/pages/technician/technician-pages")
  return { default: mod.TechnicianCompletedJobsPage }
})
const TechnicianProfilePage = lazy(async () => {
  const mod = await import("@/pages/technician/technician-pages")
  return { default: mod.TechnicianProfilePage }
})

function RouteLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-6">
      <div
        className="rounded-full border border-border bg-card px-4 py-2 text-[12px] text-muted-foreground"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        Loading…
      </div>
    </div>
  )
}

function withSuspense(node: ReactNode) {
  return <Suspense fallback={<RouteLoader />}>{node}</Suspense>
}

const router = createBrowserRouter([
  // ── Marketing ──────────────────────────────────────────────
  {
    path: "/",
    element: withSuspense(<MarketingPage />),
  },

  // ── Customer app — mobile-first, isolated ──────────────────
  {
    path: "customer",
    element: withSuspense(<CustomerLayout />),
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      { path: "home",              element: withSuspense(<CustomerHomePage />) },
      { path: "book",              element: withSuspense(<CustomerBookingPage />) },
      { path: "vehicles",            element: withSuspense(<CustomerVehiclesPage />) },
      { path: "vehicles/new",        element: withSuspense(<CustomerAddVehiclePage />) },
      { path: "vehicles/:vehicleId", element: withSuspense(<CustomerVehicleDetailPage />) },
      { path: "membership",        element: withSuspense(<CustomerMembershipPage />) },
      { path: "history",           element: withSuspense(<CustomerHistoryPage />) },
      { path: "history/:bookingId", element: withSuspense(<CustomerHistoryDetailPage />) },
      { path: "account",           element: withSuspense(<CustomerAccountPage />) },
    ],
  },

  // ── Operator app — desktop sidebar, isolated ───────────────
  {
    path: "operator",
    element: withSuspense(<OperatorLayout />),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard",                  element: withSuspense(<OperatorDashboardPage />) },
      { path: "bookings",                   element: withSuspense(<OperatorBookingsPage />) },
      { path: "bookings/:bookingId",        element: withSuspense(<OperatorBookingDetailPage />) },
      { path: "customers",                  element: withSuspense(<OperatorCustomersPage />) },
      { path: "customers/:customerId",      element: withSuspense(<OperatorCustomerDetailPage />) },
      { path: "vehicles",                   element: withSuspense(<OperatorVehiclesPage />) },
      { path: "vehicles/:vehicleId",        element: withSuspense(<OperatorVehicleDetailPage />) },
      { path: "services",                   element: withSuspense(<OperatorServicesPage />) },
      { path: "memberships",                element: withSuspense(<OperatorMembershipsPage />) },
      { path: "team",                       element: withSuspense(<OperatorTeamPage />) },
      { path: "payments",                   element: withSuspense(<OperatorPaymentsPage />) },
      { path: "reports",                    element: withSuspense(<OperatorReportsPage />) },
      { path: "settings",                   element: withSuspense(<OperatorSettingsPage />) },
    ],
  },

  // ── Technician app — tablet/mobile, isolated ───────────────
  {
    path: "technician",
    element: withSuspense(<TechnicianLayout />),
    children: [
      { index: true, element: <Navigate to="today" replace /> },
      { path: "today",           element: withSuspense(<TechnicianTodayPage />) },
      { path: "jobs/active",     element: withSuspense(<TechnicianJobPage />) },
      { path: "jobs/:bookingId", element: withSuspense(<TechnicianJobPage />) },
      { path: "jobs/completed",  element: withSuspense(<TechnicianCompletedJobsPage />) },
      { path: "profile",         element: withSuspense(<TechnicianProfilePage />) },
    ],
  },

  { path: "app", element: <Navigate to="/operator" replace /> },
  { path: "*",   element: withSuspense(<NotFoundPage />) },
])

function App() {
  return (
    <CustomerStoreProvider>
      <RouterProvider router={router} />
    </CustomerStoreProvider>
  )
}

export default App

