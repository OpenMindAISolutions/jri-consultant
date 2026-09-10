import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3, Building2, CalendarClock, Download, FileText, TrendingUp,
} from 'lucide-react';
import {
  practiceReport, prettyBytes,
  type BookReport, type DocumentsReport, type FunnelReport, type PracticeReport,
  type RemindersReport, type ReportKind,
} from '../lib/funnel';
import { Spinner } from '../components/Shell';
import { Badge, Notice, PageTitle, Section, fieldClass } from '../components/ui';
import { when } from '../lib/format';

/**
 * What the practice looks like from above.
 *
 * WHY A REPORT SCREEN AT ALL, when every number on it is visible somewhere else. Because they are
 * visible ONE CLIENT AT A TIME, and the questions a practice actually asks are the other shape:
 * which obligation do we keep missing, how many of the businesses we chase have come across to JRI,
 * where are the documents piling up. A per-client screen cannot answer any of those no matter how
 * well it is designed.
 *
 * THE WINDOW MEANS SOMETHING DIFFERENT ON EACH TAB, and each tab says which — the server sends it
 * back in `window.applies_to` rather than leaving this screen to describe a filter it did not
 * apply. The book ignores dates entirely: a client list is a statement about now.
 *
 * Every tab exports. A consultant's practice review happens in a spreadsheet, and a report that
 * cannot leave the browser is a report that gets retyped.
 */

const TABS: { id: ReportKind; label: string; icon: typeof BarChart3 }[] = [
  { id: 'book', label: 'The book', icon: Building2 },
  { id: 'funnel', label: 'Conversions', icon: TrendingUp },
  { id: 'reminders', label: 'Reminders', icon: CalendarClock },
  { id: 'documents', label: 'Documents', icon: FileText },
];

const isoDaysAgo = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString().slice(0, 10);

export default function Practice() {
  const [kind, setKind] = useState<ReportKind>('book');
  const [from, setFrom] = useState(isoDaysAgo(365));
  const [to, setTo] = useState(new Date().toISOString().slice(0, 10));
  const [report, setReport] = useState<PracticeReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setReport(await practiceReport(kind, from, to));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not build that report.');
      setReport(null);
    } finally {
      setLoading(false);
    }
  }, [kind, from, to]);

  useEffect(() => { void load(); }, [load]);

  return (
    <div>
      <PageTitle
        title="Your practice"
        subtitle="Across every business you look after that is not on JRI."
        actions={report ? <ExportButton report={report} /> : undefined}
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1.5">
          {TABS.map((t) => {
            const Icon = t.icon;
            const on = kind === t.id;
            return (
              <button
                key={t.id} type="button" onClick={() => setKind(t.id)}
                className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11.5px] font-semibold transition"
                style={on
                  ? { background: 'hsl(var(--jri-lavender))', borderColor: 'hsl(var(--jri-lavender))', color: 'white' }
                  : { borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}
              >
                <Icon className="h-3.5 w-3.5" /> {t.label}
              </button>
            );
          })}
        </div>

        {/* The book is current state, so a date range would be a control that does nothing —
            and a control that does nothing is worse than no control. */}
        {kind !== 'book' && (
          <div className="ml-auto flex items-center gap-1.5">
            <input type="date" className={fieldClass} style={{ width: 'auto' }}
                   value={from} onChange={(e) => setFrom(e.target.value)} />
            <span className="text-xs text-muted-foreground">to</span>
            <input type="date" className={fieldClass} style={{ width: 'auto' }}
                   value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
        )}
      </div>

      {error && <Notice className="mb-4">{error}</Notice>}

      {loading ? <Spinner label="Counting…" />
        : !report ? null
        : report.kind === 'book' ? <Book r={report} />
        : report.kind === 'funnel' ? <Funnel r={report} />
        : report.kind === 'reminders' ? <Reminders r={report} />
        : <Documents r={report} />}
    </div>
  );
}

// ── Tabs ────────────────────────────────────────────────────────────────────

function Totals({ items }: { items: { label: string; value: string | number; tone?: 'ok' | 'warn' }[] }) {
  return (
    <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((i) => (
        <div key={i.label} className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">{i.label}</p>
          <p className="mt-1.5 text-2xl font-semibold tabular-nums"
             style={i.tone ? { color: `hsl(var(--status-${i.tone}))` } : undefined}>
            {i.value}
          </p>
        </div>
      ))}
    </div>
  );
}

function Book({ r }: { r: BookReport }) {
  return (
    <>
      <Totals items={[
        { label: 'Clients', value: r.totals.clients },
        { label: 'Active', value: r.totals.active },
        { label: 'Joined JRI', value: r.totals.converted, tone: 'ok' },
        { label: 'Documents held', value: r.totals.files },
      ]} />
      <Section title="Every client" subtitle={r.window} icon={<Building2 className="h-4 w-4" />}>
        {r.rows.length === 0 ? <EmptyLine /> : (
          <div className="-mx-2 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-xs">
              <thead className="text-[10.5px] uppercase tracking-wide text-muted-foreground">
                <tr>
                  <Th>Client</Th><Th>Where</Th><Th right>Files</Th>
                  <Th right>Open</Th><Th>Next due</Th><Th>On JRI</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {r.rows.map((row) => (
                  <tr key={row.id}>
                    <Td>
                      <Link to={`/managed/${row.id}`} className="font-medium hover:underline">{row.name}</Link>
                      {row.status === 'archived' && <span className="ml-1.5"><Badge>archived</Badge></span>}
                    </Td>
                    <Td muted>{row.city ?? '—'}</Td>
                    <Td right>{row.file_count}</Td>
                    <Td right>{row.open_reminders}</Td>
                    <Td muted>{row.next_due_date ? when(row.next_due_date) : '—'}</Td>
                    <Td>{row.converted ? <Badge tone="ok">{when(row.converted_at)}</Badge> : '—'}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </>
  );
}

function Funnel({ r }: { r: FunnelReport }) {
  const max = Math.max(1, ...r.by_month.map((m) => m.converted));
  return (
    <>
      <Totals items={[
        { label: 'On your books', value: r.totals.clients },
        { label: 'Came across to JRI', value: r.totals.converted, tone: 'ok' },
        { label: 'Conversion rate', value: `${r.totals.conversion_rate_pct}%` },
        {
          label: 'Typical time to convert',
          value: r.totals.median_days_to_convert == null ? '—' : `${Math.round(r.totals.median_days_to_convert)}d`,
        },
      ]} />

      <div className="grid gap-4 lg:grid-cols-5">
        <Section className="lg:col-span-3" title="By month" subtitle={r.window.applies_to}
                 icon={<TrendingUp className="h-4 w-4" />}>
          {r.by_month.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No conversions in this window yet. Every reminder you send carries an invitation — this
              is where it shows up when one lands.
            </p>
          ) : (
            <ul className="space-y-2">
              {r.by_month.map((m) => (
                <li key={m.month} className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-[11px] tabular-nums text-muted-foreground">{m.month}</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-accent/20">
                    <span className="block h-full rounded-full"
                          style={{ width: `${(m.converted / max) * 100}%`, background: 'hsl(var(--status-ok))' }} />
                  </span>
                  <span className="w-6 shrink-0 text-right text-xs font-semibold tabular-nums">{m.converted}</span>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section className="lg:col-span-2" title="Most recent" icon={<Building2 className="h-4 w-4" />}>
          {r.recent.length === 0 ? <EmptyLine /> : (
            <ul className="divide-y divide-border">
              {r.recent.map((c) => (
                <li key={`${c.name}-${c.converted_at}`} className="flex items-center justify-between gap-2 py-2.5 first:pt-0">
                  <span className="min-w-0 truncate text-xs">{c.name}</span>
                  <Badge tone="ok">
                    {c.days_to_convert == null ? when(c.converted_at) : `${c.days_to_convert}d`}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>
    </>
  );
}

function Reminders({ r }: { r: RemindersReport }) {
  return (
    <>
      <Totals items={[
        { label: 'Scheduled', value: r.totals.scheduled },
        { label: 'Overdue', value: r.totals.overdue, tone: r.totals.overdue ? 'warn' : undefined },
        { label: 'From the calendar', value: r.totals.generated },
        { label: 'Typed by hand', value: r.totals.hand_written },
      ]} />

      <div className="grid gap-4 lg:grid-cols-5">
        <Section className="lg:col-span-3" title="Next twenty" icon={<CalendarClock className="h-4 w-4" />}>
          {r.next_due.length === 0 ? <EmptyLine /> : (
            <ul className="divide-y divide-border">
              {r.next_due.map((n, i) => (
                <li key={`${n.client}-${n.title}-${i}`} className="flex items-start justify-between gap-2.5 py-2.5 first:pt-0">
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-medium">{n.title}</span>
                    <span className="block truncate text-[11px] text-muted-foreground">{n.client}</span>
                  </span>
                  <Badge tone={n.overdue ? 'danger' : 'neutral'}>
                    {n.overdue ? 'overdue ' : ''}{when(n.due_date)}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </Section>

        {/* The only actionable thing in the whole report: which obligation this practice keeps
            letting slip. Sorted by overdue, because that is the order a partner would read it in. */}
        <Section className="lg:col-span-2" title="Which one slips"
                 subtitle="Generated obligations only — a hand-typed reminder has no rule to group it under."
                 icon={<BarChart3 className="h-4 w-4" />}>
          {r.by_obligation.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Nothing generated yet. Open a client and fill their compliance calendar.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {r.by_obligation.map((o) => (
                <li key={o.key} className="flex items-center justify-between gap-2 py-2.5 first:pt-0">
                  <span className="min-w-0 truncate text-xs">{o.label}</span>
                  <span className="flex shrink-0 items-center gap-1">
                    {o.overdue > 0 && <Badge tone="danger">{o.overdue} late</Badge>}
                    <Badge>{o.scheduled} open</Badge>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>
    </>
  );
}

function Documents({ r }: { r: DocumentsReport }) {
  return (
    <>
      <Totals items={[
        { label: 'Files', value: r.totals.files },
        { label: 'Stored', value: prettyBytes(r.totals.bytes) },
        { label: 'Clients with files', value: r.totals.clients_with_files },
        { label: 'Window', value: `${when(r.window.from)} →` },
      ]} />
      <div className="grid gap-4 lg:grid-cols-5">
        <Section className="lg:col-span-2" title="By client" icon={<Building2 className="h-4 w-4" />}>
          {r.by_client.length === 0 ? <EmptyLine /> : (
            <ul className="divide-y divide-border">
              {r.by_client.map((c) => (
                <li key={c.client} className="flex items-center justify-between gap-2 py-2.5 first:pt-0">
                  <span className="min-w-0 truncate text-xs">{c.client}</span>
                  <span className="shrink-0 text-[11px] text-muted-foreground">
                    {c.files} · {prettyBytes(c.bytes)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Section>
        <Section className="lg:col-span-3" title="Most recent" subtitle={r.window.applies_to}
                 icon={<FileText className="h-4 w-4" />}>
          {r.recent.length === 0 ? <EmptyLine /> : (
            <ul className="divide-y divide-border">
              {r.recent.map((f, i) => (
                <li key={`${f.client}-${f.title}-${i}`} className="flex items-start justify-between gap-2.5 py-2.5 first:pt-0">
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-medium">{f.title}</span>
                    <span className="block truncate text-[11px] text-muted-foreground">{f.client}</span>
                  </span>
                  <span className="shrink-0 text-[11px] text-muted-foreground">
                    {prettyBytes(f.size_bytes)} · {when(f.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>
    </>
  );
}

// ── Bits ────────────────────────────────────────────────────────────────────

const Th = ({ children, right }: { children: React.ReactNode; right?: boolean }) => (
  <th className={`px-2 pb-2 font-medium ${right ? 'text-right' : ''}`}>{children}</th>
);
const Td = ({ children, right, muted }: { children: React.ReactNode; right?: boolean; muted?: boolean }) => (
  <td className={`px-2 py-2 ${right ? 'text-right tabular-nums' : ''} ${muted ? 'text-muted-foreground' : ''}`}>
    {children}
  </td>
);
const EmptyLine = () => (
  <p className="py-6 text-center text-sm text-muted-foreground">Nothing to show for this window.</p>
);

/**
 * CSV, built here rather than on the server.
 *
 * The report already crossed the wire as JSON; asking the server to render the same rows again in a
 * second format would double the round trips and give two places for the column list to drift. The
 * quoting is the part worth getting right — a client called "Sharma, Bros & Co" would otherwise
 * split into two columns in every spreadsheet that opens it.
 */
function ExportButton({ report }: { report: PracticeReport }) {
  const csv = useMemo(() => toCsv(report), [report]);
  const href = useMemo(
    () => URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' })),
    [csv],
  );
  useEffect(() => () => URL.revokeObjectURL(href), [href]);

  return (
    <a href={href} download={`jri-practice-${report.kind}-${new Date().toISOString().slice(0, 10)}.csv`}
       className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-xs font-semibold text-muted-foreground transition hover:text-foreground">
      <Download className="h-3.5 w-3.5" /> Export CSV
    </a>
  );
}

function cell(v: unknown): string {
  if (v == null) return '';
  const s = String(v);
  // Excel treats a leading =, +, - or @ as a formula. Prefixing an apostrophe is the standard
  // defence and costs nothing on a value that was never going to be a formula.
  const safe = /^[=+\-@]/.test(s) ? `'${s}` : s;
  return /[",\n]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

function rowsFor(r: PracticeReport): { headers: string[]; rows: unknown[][] } {
  switch (r.kind) {
    case 'book':
      return {
        headers: ['Client', 'Status', 'City', 'Entity', 'GSTIN on file', 'Files', 'Open reminders', 'Next due', 'On JRI', 'Joined', 'Added'],
        rows: r.rows.map((x) => [x.name, x.status, x.city, x.entity_type, x.has_gstin ? 'yes' : 'no',
          x.file_count, x.open_reminders, x.next_due_date, x.converted ? 'yes' : 'no', x.converted_at, x.created_at]),
      };
    case 'funnel':
      return {
        headers: ['Month', 'Conversions'],
        rows: r.by_month.map((m) => [m.month, m.converted]),
      };
    case 'reminders':
      return {
        headers: ['Obligation', 'Scheduled', 'Sent', 'Cancelled', 'Overdue'],
        rows: r.by_obligation.map((o) => [o.label, o.scheduled, o.sent, o.cancelled, o.overdue]),
      };
    case 'documents':
      return {
        headers: ['Client', 'Files', 'Bytes'],
        rows: r.by_client.map((c) => [c.client, c.files, c.bytes]),
      };
  }
}

function toCsv(r: PracticeReport): string {
  const { headers, rows } = rowsFor(r);
  return [headers.map(cell).join(','), ...rows.map((row) => row.map(cell).join(','))].join('\n');
}
