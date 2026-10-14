import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { BrandLogo } from '@/components/brand'
import { Button } from '@/components/ui/button'
import { APP_CONFIG } from '@/lib/config'
import { formatINR } from '@/lib/money'

export const metadata: Metadata = {
  title: 'About the project',
  description: 'How CartShare works: architecture, security model, and how to connect a real database.',
}

const SECTIONS = [
  {
    id: 'problem',
    title: 'The problem',
    body: 'Roommates, students, and office teams usually plan shared purchases across scattered chat messages and notes. Items get duplicated, nobody knows the running total, and splitting the bill afterwards is painful.',
  },
  {
    id: 'solution',
    title: 'The solution',
    body: `CartShare gives each group a room with a short invite code. Everyone adds products to one shared cart, sees who added what, tracks progress to the ${formatINR(APP_CONFIG.freeDeliveryThresholdPaise)} free-delivery threshold, and prints a group receipt with per-person contributions.`,
  },
  {
    id: 'architecture',
    title: 'Architecture',
    body: 'Next.js App Router with Route Handlers as the API. Clients sync every few seconds with SWR and refresh instantly after their own changes. All money is stored as integer paise to avoid floating-point errors, and every edit uses a version number so stale updates are rejected instead of silently overwriting someone else.',
  },
  {
    id: 'security',
    title: 'Security model',
    body: 'Each participant receives an HttpOnly, signed session cookie when they create or join a room. Every API request checks that the session belongs to an active member of that room before reading or changing data. All input is validated on the server with Zod, and names are rendered as text so they cannot inject markup.',
  },
  {
    id: 'database',
    title: 'Connecting a real database',
    body: 'This preview runs in demo mode with an in-memory store, which resets when the server restarts. The data layer is isolated behind a single store module, so it can be swapped for Supabase or Neon Postgres. Connect a database from the project settings and the same rooms, participants, items, and activity tables can be created with row-level checks by room membership.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-dvh">
      <header className="border-b bg-card">
        <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-4 sm:px-6">
          <BrandLogo />
          <Button variant="ghost" render={<Link href="/" />}>
            <ArrowLeft aria-hidden="true" />
            Home
          </Button>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight text-balance">About {APP_CONFIG.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{APP_CONFIG.tagline}</p>
        <div className="mt-8 flex flex-col gap-4">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-6 rounded-2xl border bg-card p-5">
              <h2 id={`${s.id}-h`} className="font-semibold">
                {s.title}
              </h2>
              <p className="mt-2 leading-relaxed text-muted-foreground text-pretty">{s.body}</p>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}
