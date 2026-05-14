import type { ReactNode } from "react"

import { SurfaceHeader } from "@/components/shared/surface-header"

type Panel = {
  title: string
  description?: string
  content: ReactNode
}

export function ShellPage({
  eyebrow,
  title,
  description,
  actions,
  panels,
}: {
  eyebrow: string
  title: string
  description?: string
  actions?: ReactNode
  panels: Panel[]
}) {
  return (
    <div className="space-y-6">
      <SurfaceHeader eyebrow={eyebrow} title={title} description={description} actions={actions} />
      <div className="grid gap-4 xl:grid-cols-2">
        {panels.map((panel) => (
          <div key={panel.title} className="rounded-[14px] border border-border bg-card">
            <div className="border-b border-border px-5 py-4">
              <h2
                className="text-[22px] leading-none tracking-[-0.02em] text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
              >
                {panel.title}
              </h2>
              {panel.description && (
                <p className="mt-1.5 text-[13px] text-muted-foreground">{panel.description}</p>
              )}
            </div>
            <div className="p-5">{panel.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
