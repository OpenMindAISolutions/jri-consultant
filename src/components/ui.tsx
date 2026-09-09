import type { ReactNode } from 'react';

/**
 * The shared vocabulary for this app's surfaces.
 *
 * WHY IT EXISTS. The tokens in index.css were copied carefully from the business app, so the
 * COLOURS were already right — but every screen still hand-rolled the things built from them. Two
 * pages declared their own `input` constant, buttons were assembled inline with slightly different
 * padding each time, and status pills were written out longhand wherever one was needed. Colour
 * consistency without component consistency still reads as two different products.
 *
 * The rule these follow: a token is never hard-coded as a hex or an hsl() literal, only referenced
 * as `hsl(var(--token))`. That is what makes dark mode work without a second definition anywhere,
 * and it is why the accent colours here are inline `style` rather than Tailwind classes — the
 * palette lives in CSS variables that Tailwind's compiler cannot see at build time.
 */

// ── Layout ──────────────────────────────────────────────────────────────────

/** A titled region. The one container everything sits in, so panels stop drifting apart. */
export function Section({
  title, subtitle, icon, actions, children, className = '',
}: {
  title?: string; subtitle?: string; icon?: ReactNode;
  actions?: ReactNode; children: ReactNode; className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-border bg-card p-5 ${className}`}>
      {(title || actions) && (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            {icon && (
              <span
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{ background: 'hsl(var(--jri-lavender) / 0.13)', color: 'hsl(var(--jri-lavender))' }}
              >
                {icon}
              </span>
            )}
            <div className="min-w-0">
              {title && <h2 className="text-sm font-semibold">{title}</h2>}
              {subtitle && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
          {actions && <div className="flex shrink-0 flex-wrap items-center gap-1.5">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

/** The heading every page opens with, so no two pages introduce themselves differently. */
export function PageTitle({
  title, subtitle, actions,
}: { title: string; subtitle?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

// ── Controls ────────────────────────────────────────────────────────────────

type Tone = 'primary' | 'secondary' | 'ghost' | 'danger';

const TONE_BG: Record<Exclude<Tone, 'secondary' | 'ghost'>, string> = {
  primary: 'hsl(var(--jri-lavender))',
  danger: 'hsl(var(--status-danger))',
};

export function Button({
  tone = 'secondary', size = 'md', busy, icon, children, className = '', ...rest
}: {
  tone?: Tone; size?: 'sm' | 'md'; busy?: boolean; icon?: ReactNode; children?: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const pad = size === 'sm' ? 'px-2.5 py-1 text-[11.5px]' : 'px-3.5 py-2 text-xs';
  const base =
    `inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold transition ` +
    `disabled:cursor-not-allowed disabled:opacity-50 ${pad} ${className}`;

  if (tone === 'primary' || tone === 'danger') {
    return (
      <button {...rest} disabled={rest.disabled || busy}
        className={`${base} text-white hover:opacity-90`}
        style={{ background: TONE_BG[tone], ...rest.style }}>
        {busy ? <Spin /> : icon}{children}
      </button>
    );
  }
  const quiet = tone === 'ghost'
    ? 'text-muted-foreground hover:text-foreground'
    : 'border border-border text-foreground hover:bg-accent/15';
  return (
    <button {...rest} disabled={rest.disabled || busy} className={`${base} ${quiet}`}>
      {busy ? <Spin /> : icon}{children}
    </button>
  );
}

function Spin() {
  return <span className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent" />;
}

/**
 * One class for every text input, select and textarea.
 *
 * `[color-scheme]` is not decoration: a browser draws a native date picker's calendar from it, so
 * without these an `<input type="date">` renders a white popup on a dark page.
 */
export const fieldClass =
  'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground ' +
  'placeholder:text-muted-foreground outline-none transition ' +
  'focus:border-[hsl(var(--jri-lavender))] focus:ring-2 focus:ring-[hsl(var(--jri-lavender)/0.2)] ' +
  'disabled:cursor-not-allowed disabled:opacity-60 [color-scheme:light] dark:[color-scheme:dark]';

// ── Status ──────────────────────────────────────────────────────────────────

export type BadgeTone = 'neutral' | 'ok' | 'warn' | 'danger' | 'accent';

const BADGE: Record<BadgeTone, { bg: string; fg: string }> = {
  neutral: { bg: 'hsl(var(--muted))', fg: 'hsl(var(--muted-foreground))' },
  ok: { bg: 'hsl(var(--status-ok) / 0.13)', fg: 'hsl(var(--status-ok))' },
  warn: { bg: 'hsl(var(--status-warn) / 0.14)', fg: 'hsl(var(--status-warn))' },
  danger: { bg: 'hsl(var(--status-danger) / 0.13)', fg: 'hsl(var(--status-danger))' },
  accent: { bg: 'hsl(var(--jri-cyan) / 0.13)', fg: 'hsl(var(--jri-cyan))' },
};

export function Badge({
  tone = 'neutral', icon, children,
}: { tone?: BadgeTone; icon?: ReactNode; children: ReactNode }) {
  const c = BADGE[tone];
  return (
    <span
      className="inline-flex items-center gap-1 whitespace-nowrap rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold"
      style={{ background: c.bg, color: c.fg }}
    >
      {icon}{children}
    </span>
  );
}

/**
 * A failure the reader can act on.
 *
 * Deliberately a strip and not a toast: these describe a state that is still true after three
 * seconds — a reply that did not send, an order that did not save — and a toast would take the only
 * evidence away with it.
 */
export function Notice({
  tone = 'danger', children, className = '',
}: { tone?: BadgeTone; children: ReactNode; className?: string }) {
  const c = BADGE[tone];
  return (
    <p role="status" className={`rounded-xl px-4 py-3 text-sm ${className}`}
       style={{ background: c.bg, color: c.fg }}>
      {children}
    </p>
  );
}

/** An interactive row. One hover treatment for every list in the app. */
export function Row({
  children, className = '', ...rest
}: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={`rounded-xl border border-border bg-card transition hover:border-[hsl(var(--jri-lavender)/0.5)] ${className}`}
    >
      {children}
    </div>
  );
}
