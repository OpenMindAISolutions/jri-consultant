import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, FileQuestion, MessageSquare, ShieldCheck, Inbox } from 'lucide-react';
import { myWork, type WorkItem } from '../lib/api';
import { Empty, Spinner } from '../components/Shell';
import { when } from '../lib/format';

/**
 * The landing screen: one queue across the WHOLE book, sorted by what is due first.
 *
 * A consultant's real question is never "what is due for this client" — it is "what is due at all".
 * No per-client screen can answer that, which is why this exists and why it is the home page rather
 * than the client list.
 */
const KIND = {
  document_request: { label: 'Waiting on a document', icon: FileQuestion, tint: '--jri-amber' },
  message: { label: 'Conversation', icon: MessageSquare, tint: '--jri-cyan' },
  obligation: { label: 'Statutory deadline', icon: ShieldCheck, tint: '--jri-lavender' },
} as const;

function dueTone(due: string | null): { text: string; tint: string } {
  if (!due) return { text: 'no date', tint: '--muted-foreground' };
  const days = Math.ceil((new Date(due).getTime() - Date.now()) / 86_400_000);
  if (days < 0) return { text: `${Math.abs(days)}d overdue`, tint: '--status-danger' };
  if (days === 0) return { text: 'due today', tint: '--status-danger' };
  if (days <= 7) return { text: `in ${days}d`, tint: '--status-warn' };
  return { text: when(due), tint: '--muted-foreground' };
}

export default function ThisWeek() {
  const [items, setItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    myWork()
      .then((r) => setItems(r ?? []))
      .catch((e) => setError(e instanceof Error ? e.message : 'Could not load your work.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner label="Gathering your week…" />;
  if (error) {
    return <p className="rounded-xl px-4 py-3 text-sm"
      style={{ background: 'hsl(var(--status-danger) / 0.1)', color: 'hsl(var(--status-danger))' }}>{error}</p>;
  }

  const overdue = items.filter((i) => i.due_date && new Date(i.due_date) < new Date());

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">This week</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {items.length === 0
          ? 'Nothing needs you right now.'
          : `${items.length} item${items.length === 1 ? '' : 's'} across your clients${
              overdue.length ? ` · ${overdue.length} overdue` : ''
            }.`}
      </p>

      {items.length === 0 ? (
        <div className="mt-7">
          <Empty
            icon={<Inbox className="h-5 w-5" />}
            title="You are clear"
            line="Documents you have asked for, conversations, and deadlines your clients share with you all appear here — soonest first."
          />
        </div>
      ) : (
        <div className="mt-6 space-y-2">
          {items.map((it) => {
            const meta = KIND[it.kind] ?? KIND.message;
            const Icon = meta.icon;
            const tone = dueTone(it.due_date);
            return (
              <Link
                key={`${it.kind}-${it.ref_id}`}
                to={`/client/${it.workplace_id}`}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-3.5 transition hover:border-[hsl(var(--jri-lavender)/0.5)]"
              >
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: `hsl(var(${meta.tint}) / 0.12)`, color: `hsl(var(${meta.tint}))` }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{it.title}</p>
                  <p className="mt-0.5 truncate text-[11.5px] text-muted-foreground">
                    {it.workplace_name} · {meta.label}
                    {it.detail ? ` · ${it.detail}` : ''}
                  </p>
                </div>
                <span
                  className="shrink-0 whitespace-nowrap rounded px-1.5 py-0.5 text-[10.5px] font-semibold"
                  style={{ background: `hsl(var(${tone.tint}) / 0.13)`, color: `hsl(var(${tone.tint}))` }}
                >
                  <CalendarClock className="mr-1 inline h-3 w-3" />{tone.text}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
