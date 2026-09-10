import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle, ArrowRight, Building2, CalendarClock, FileQuestion,
  MessageSquare, ShieldCheck, Sparkles, TrendingUp, Users,
} from 'lucide-react';
import { myWork, myClients, type WorkItem, type Client } from '../lib/api';
import { myManagedClients, type ManagedClient } from '../lib/funnel';
import { practiceSummary } from '../lib/ai';
import { Spinner } from '../components/Shell';
import { Badge, Notice, PageTitle, Section } from '../components/ui';

/**
 * The practice at a glance — the app's front door.
 *
 * WHY THIS REPLACED THE QUEUE AS THE HOME PAGE. `This week` is a good list and a bad landing: it
 * answers "what is next" and nothing else. A consultant opening the app first wants to know whether
 * they are on top of things — how many clients, how much is late, who is waiting on them — and only
 * then which item to pick up. A list cannot answer the first question, because counting rows is not
 * the same as being told a number.
 *
 * The queue still exists, in full, at /work. This page shows the five items that need attention
 * soonest and gets out of the way.
 *
 * WHAT IT DELIBERATELY DOES NOT DO. No charts. A practice with eleven open items does not need a
 * time series; it needs to know which eleven. Numbers here are counts a person can hold in their
 * head, and each one is a link to the thing it counts.
 */

type Stat = {
  label: string;
  value: number;
  tone: 'neutral' | 'ok' | 'warn' | 'danger' | 'accent';
  icon: typeof Users;
  to: string;
  hint: string;
};

function dueLabel(due: string | null): { text: string; tone: 'neutral' | 'warn' | 'danger' } {
  if (!due) return { text: 'no date', tone: 'neutral' };
  const days = Math.ceil((new Date(due).getTime() - Date.now()) / 86_400_000);
  if (days < 0) return { text: `${Math.abs(days)}d overdue`, tone: 'danger' };
  if (days === 0) return { text: 'due today', tone: 'danger' };
  if (days <= 7) return { text: `in ${days}d`, tone: 'warn' };
  return { text: `in ${days}d`, tone: 'neutral' };
}

const KIND_ICON = {
  document_request: FileQuestion,
  message: MessageSquare,
  obligation: ShieldCheck,
} as const;

export default function Dashboard() {
  const [work, setWork] = useState<WorkItem[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [book, setBook] = useState<ManagedClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * The AI brief, and it is deliberately ON DEMAND rather than on load.
   *
   * A summary generated every time somebody opens the dashboard is a DeepSeek call every time
   * somebody opens the dashboard — for a paragraph most visits do not need, since the counts and
   * the list below already say the same thing at a glance. The button is the consent.
   */
  const [brief, setBrief] = useState<string | null>(null);
  const [briefBusy, setBriefBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([myWork(), myClients()])
      .then(([w, c]) => {
        if (cancelled) return;
        setWork(w ?? []);
        setClients(c ?? []);
      })
      .catch((e) => !cancelled && setError(e instanceof Error ? e.message : 'Could not load your dashboard.'))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, []);

  /**
   * The off-platform book, loaded separately and allowed to fail quietly.
   *
   * It is a different question from "what did my JRI clients share with me", and a consultant with
   * no book at all is the normal case on day one — so a failure here must never take down a
   * dashboard whose other half is fine.
   */
  useEffect(() => {
    let cancelled = false;
    void myManagedClients()
      .then((b) => { if (!cancelled) setBook(b ?? []); })
      .catch(() => { /* no book, or it could not be read; the panel invites them to start one */ });
    return () => { cancelled = true; };
  }, []);

  if (loading) return <Spinner label="Getting your practice…" />;
  if (error) return <Notice>{error}</Notice>;

  const now = Date.now();
  const overdue = work.filter((w) => w.due_date && new Date(w.due_date).getTime() < now);
  const waiting = work.filter((w) => w.kind === 'document_request');
  const conversations = work.filter((w) => w.kind === 'message');

  const stats: Stat[] = [
    { label: 'Clients', value: clients.length, tone: 'accent', icon: Users, to: '/clients',
      hint: clients.length === 0 ? 'none yet' : 'sharing with you' },
    { label: 'Overdue', value: overdue.length, tone: overdue.length ? 'danger' : 'ok', icon: AlertTriangle, to: '/work',
      hint: overdue.length === 0 ? 'nothing late' : 'needs you now' },
    { label: 'Awaiting documents', value: waiting.length, tone: waiting.length ? 'warn' : 'ok', icon: FileQuestion, to: '/work',
      hint: waiting.length === 0 ? 'nothing pending' : 'you asked, they have not sent' },
    { label: 'Conversations', value: conversations.length, tone: 'neutral', icon: MessageSquare, to: '/work',
      hint: conversations.length === 0 ? 'all quiet' : 'open threads' },
  ];

  // Soonest first, undated last — the same order the queue uses, so the two agree.
  const soonest = [...work]
    .sort((a, b) => {
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    })
    .slice(0, 5);

  return (
    <div>
      <PageTitle
        title="Your practice"
        subtitle={
          work.length === 0
            ? 'Nothing needs you right now.'
            : `${work.length} open item${work.length === 1 ? '' : 's'} across ${clients.length} client${clients.length === 1 ? '' : 's'}.`
        }
      />

      {/* One paragraph on what needs them, written from the reminders report. */}
      <div className="mb-5 rounded-2xl border border-border bg-card p-4">
        {brief ? (
          <p className="text-sm leading-relaxed">{brief}</p>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Want it in a sentence? The AI reads your reminders and tells you what is pressing.
            </p>
            <button
              type="button"
              disabled={briefBusy}
              onClick={() => {
                setBriefBusy(true);
                void practiceSummary()
                  .then(setBrief)
                  .catch((e) => setBrief(e instanceof Error ? e.message : 'Could not write a summary.'))
                  .finally(() => setBriefBusy(false));
              }}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[11.5px] font-semibold text-muted-foreground transition hover:text-foreground disabled:opacity-50"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {briefBusy ? 'Reading your week…' : 'Brief me'}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              to={s.to}
              className="rounded-2xl border border-border bg-card p-4 transition hover:border-[hsl(var(--jri-lavender)/0.5)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <p className="mt-2 text-2xl font-semibold tabular-nums">{s.value}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{s.hint}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        <Section
          className="lg:col-span-3"
          title="Needs you soonest"
          subtitle={soonest.length === 0 ? undefined : 'Across every client, the ones closest to their date.'}
          icon={<CalendarClock className="h-4 w-4" />}
          actions={
            work.length > 5 ? (
              <Link to="/work" className="inline-flex items-center gap-1 text-[11.5px] text-muted-foreground transition hover:text-foreground">
                All {work.length} <ArrowRight className="h-3 w-3" />
              </Link>
            ) : undefined
          }
        >
          {soonest.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              You are clear. Anything a client sends, or any deadline they share, will surface here.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {soonest.map((w) => {
                const Icon = KIND_ICON[w.kind] ?? MessageSquare;
                const d = dueLabel(w.due_date);
                return (
                  <li key={`${w.kind}-${w.ref_id}`} className="py-2.5 first:pt-0 last:pb-0">
                    <Link to={`/client/${w.workplace_id}`} className="flex items-start gap-2.5">
                      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm">{w.title}</span>
                        <span className="block truncate text-[11px] text-muted-foreground">{w.workplace_name}</span>
                      </span>
                      <Badge tone={d.tone}>{d.text}</Badge>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Section>

        <Section
          className="lg:col-span-2"
          title="Shared with you"
          icon={<Building2 className="h-4 w-4" />}
          actions={
            <Link to="/clients" className="inline-flex items-center gap-1 text-[11.5px] text-muted-foreground transition hover:text-foreground">
              All <ArrowRight className="h-3 w-3" />
            </Link>
          }
        >
          {clients.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No one has shared with you yet. When a business invites you, they appear here.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {clients.slice(0, 6).map((c) => {
                const late = work.filter(
                  (w) => w.workplace_id === c.workplace_id && w.due_date && new Date(w.due_date).getTime() < now,
                ).length;
                return (
                  <li key={c.link_id} className="py-2.5 first:pt-0 last:pb-0">
                    <Link to={`/client/${c.workplace_id}`} className="flex items-center justify-between gap-2">
                      <span className="min-w-0">
                        <span className="block truncate text-sm">{c.workplace_name}</span>
                        <span className="block truncate text-[11px] text-muted-foreground">
                          {c.report_count === 0 ? 'no reports shared' : `${c.report_count} report${c.report_count === 1 ? '' : 's'}`}
                        </span>
                      </span>
                      {late > 0 && <Badge tone="danger">{late} late</Badge>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Section>

        {/* The other half of a practice: businesses that are NOT on JRI. It sits on the dashboard
            because the conversion count is the one number this whole side of the product exists to
            move, and a number nobody passes on the way to work is a number nobody watches. */}
        <Section
          className="lg:col-span-2 lg:col-start-4"
          title="Your own clients"
          subtitle="Businesses you look after that are not on JRI."
          icon={<Building2 className="h-4 w-4" />}
          actions={
            <Link to="/managed" className="inline-flex items-center gap-1 text-[11.5px] text-muted-foreground transition hover:text-foreground">
              Open <ArrowRight className="h-3 w-3" />
            </Link>
          }
        >
          {book.length === 0 ? (
            <p className="py-5 text-sm leading-relaxed text-muted-foreground">
              Add a business you already look after. You can send WhatsApp reminders, hold their
              documents and ask to be paid — and every message invites them onto JRI.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-border p-3">
                  <p className="text-[11px] text-muted-foreground">On your books</p>
                  <p className="mt-1 text-xl font-semibold tabular-nums">
                    {book.filter((b) => b.status === 'active').length}
                  </p>
                </div>
                <div className="rounded-xl border border-border p-3">
                  <p className="text-[11px] text-muted-foreground">Joined JRI</p>
                  <p className="mt-1 text-xl font-semibold tabular-nums"
                     style={{ color: 'hsl(var(--status-ok))' }}>
                    {book.filter((b) => b.converted_workplace_id).length}
                  </p>
                </div>
              </div>
              {(() => {
                const soon = book
                  .filter((b) => b.next_due_date)
                  .sort((a, b) => (a.next_due_date! < b.next_due_date! ? -1 : 1))
                  .slice(0, 3);
                if (soon.length === 0) return null;
                return (
                  <ul className="mt-3 divide-y divide-border">
                    {soon.map((b) => {
                      const late = new Date(`${b.next_due_date}T00:00:00`).getTime() < now;
                      return (
                        <li key={b.id} className="py-2 first:pt-0 last:pb-0">
                          <Link to={`/managed/${b.id}`} className="flex items-center justify-between gap-2">
                            <span className="min-w-0 truncate text-xs">{b.name}</span>
                            <Badge tone={late ? 'danger' : 'warn'}>
                              {late ? 'overdue' : 'due'}
                            </Badge>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                );
              })()}
              <Link to="/practice"
                    className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-semibold"
                    style={{ color: 'hsl(var(--jri-lavender))' }}>
                <TrendingUp className="h-3 w-3" /> See your practice reports
              </Link>
            </>
          )}
        </Section>
      </div>
    </div>
  );
}
