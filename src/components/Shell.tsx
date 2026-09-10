import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, CalendarClock, Users, Settings as SettingsIcon, LogOut,
  Building2, BarChart3,
} from 'lucide-react';
import { BrandMark } from './BrandMark';

/**
 * One source for both navigations, so the top bar and the phone bar can never disagree.
 *
 * `short` exists because a phone is 375px wide and five labels have to fit across it. `phone: false`
 * keeps an entry off the bottom bar entirely — six thumb targets in a row is a mis-tap, and Reports
 * is something a consultant opens deliberately rather than flicks between.
 *
 * THE TWO CLIENT ENTRIES ARE NOT A DUPLICATE. "Shared" is what businesses on JRI have shared with
 * this consultant. "Clients" is the consultant's own book of businesses that are NOT on JRI. Naming
 * them apart in the navigation is the cheapest place to teach that difference.
 */
const NAV = [
  { to: '/', label: 'Dashboard', short: 'Home', icon: LayoutDashboard, phone: true },
  { to: '/work', label: 'This week', short: 'Week', icon: CalendarClock, phone: true },
  { to: '/clients', label: 'Shared with me', short: 'Shared', icon: Users, phone: true },
  { to: '/managed', label: 'Your clients', short: 'Clients', icon: Building2, phone: true },
  { to: '/practice', label: 'Reports', short: 'Reports', icon: BarChart3, phone: false },
  { to: '/settings', label: 'Settings', short: 'Settings', icon: SettingsIcon, phone: true },
] as const;
import { supabase } from '../lib/supabase';
import { NotificationBell } from './NotificationBell';

/** The frame every signed-in screen sits in. Intentionally thin: this app does one job. */
export function Shell({ children, email }: { children: ReactNode; email?: string | null }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-card/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-5">
          {/* The lotus, not a stand-in icon. This header was drawing a briefcase in a lavender
              tile while the actual brand mark sat unused — see components/BrandMark.tsx. */}
          <BrandMark size="sm" className="sm:hidden" />
          <BrandMark size="sm" subtitle="for consultants" className="hidden sm:flex" />
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to}
                className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <NotificationBell />
            {email && <span className="hidden text-xs text-muted-foreground lg:inline">{email}</span>}
            <button
              type="button"
              onClick={async () => { await supabase.auth.signOut(); navigate('/signin'); }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground"
            >
              <LogOut className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-24 sm:px-5 sm:py-7 md:pb-7">{children}</main>

      {/* Bottom navigation, phones only. A thumb reaches the bottom of a phone and not the top, and
          four links across a 375px header leaves no room for the bell or the account. */}
      <nav
        className="fixed inset-x-0 bottom-0 z-20 flex border-t border-border bg-card/95 backdrop-blur md:hidden"
        aria-label="Sections"
      >
        {NAV.filter((n) => n.phone).map((n) => {
          const Icon = n.icon;
          const active = pathname === n.to || (n.to !== '/' && pathname.startsWith(n.to));
          return (
            <Link
              key={n.to}
              to={n.to}
              className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10.5px] font-medium transition"
              style={{ color: active ? 'hsl(var(--jri-lavender))' : 'hsl(var(--muted-foreground))' }}
            >
              <Icon className="h-[18px] w-[18px]" />
              {n.short}
            </Link>
          );
        })}
      </nav>
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
