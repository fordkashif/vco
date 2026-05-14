import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-blue-700">404</p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-[-0.06em] text-slate-950">
          Route not found.
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          The surface you asked for does not exist in the current VCO scaffold.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild className="rounded-full px-5">
            <Link to="/">Back to marketing</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-5">
            <Link to="/operator/dashboard">Open app shell</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
