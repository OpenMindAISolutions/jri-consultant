import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Briefcase } from 'lucide-react';
import { supabase } from '../lib/supabase';

/** The frame every signed-in screen sits in. Intentionally thin: this app does one job. */
export function Shell({ children, email }: { children: ReactNode; email?: string | null }) {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-card/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-xl"
              style={{ background: 'hsl(var(--jri-lavender) / 0.14)', color: 'hsl(var(--jri-lavender))' }}
            >
              <Briefcase className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold">JRI.AI</span>
              <span className="type-eyebrow text-muted-foreground">for consultants</span>
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link to="/" className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground">This week</Link>
            <Link to="/clients" className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground">Clients</Link>
          </nav>
          <div className="flex items-center gap-3">
            {email && <span className="hidden text-xs text-muted-foreground sm:inline">{email}</span>}
            <button
              type="button"
              onClick={async () => { await supabase.auth.signOut(); navigate('/signin'); }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-7">{children}</main>
      <footer className="border-t border-border px-5 py-5">
        <p className="mx-auto max-w-6xl text-xs text-muted-foreground">
          You see only what each business has chosen to share. They can see when you opened it, and
          can stop sharing at any time.
        </p>
      </footer>
    </div>
  );
}

export function Empty({ title, line, icon }: { title: string; line: string; icon?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-14 text-center">
      {icon && (
        <span
          className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{ background: 'hsl(var(--jri-lavender) / 0.12)', color: 'hsl(var(--jri-lavender))' }}
        >
          {icon}
        </span>
      )}
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">{line}</p>
    </div>
  );
}

export function Spinner({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      {label}
    </div>
  );
}

/** How old a figure is, said plainly. The single most important thing on this app's screens. */
export function Freshness({ iso, ago }: { iso: string | null; ago: string }) {
  const stale = !iso || Date.now() - new Date(iso).getTime() > 45 * 86_400_000;
  return (
    <span
      className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10.5px] font-medium"
      style={{
        background: stale ? 'hsl(var(--status-warn) / 0.14)' : 'hsl(var(--status-ok) / 0.13)',
        color: stale ? 'hsl(var(--status-warn))' : 'hsl(var(--status-ok))',
      }}
    >
      {iso ? `figures from ${ago}` : 'never generated'}
    </span>
  );
}
