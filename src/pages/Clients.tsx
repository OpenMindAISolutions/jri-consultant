import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ChevronRight, Inbox } from 'lucide-react';
import { myClients, type Client } from '../lib/api';
import { Empty, Spinner } from '../components/Shell';

/**
 * The consultant's book: every business that shared something.
 *
 * The empty state carries real weight here. A consultant who signs up before anyone has shared
 * with them must understand that nothing is broken and nothing is missing — they are simply
 * waiting on a client. That is a different message from "no results".
 */
export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    myClients()
      .then((rows) => setClients(rows ?? []))
      .catch((e) => setError(e instanceof Error ? e.message : 'Could not load your clients.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner label="Loading your clients…" />;

  if (error) {
    return (
      <p className="rounded-xl px-4 py-3 text-sm"
         style={{ background: 'hsl(var(--status-danger) / 0.1)', color: 'hsl(var(--status-danger))' }}>
        {error}
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Your clients</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {clients.length === 0
          ? 'Businesses that share reports with you will appear here.'
          : `${clients.length} business${clients.length === 1 ? '' : 'es'} shares reports with you.`}
      </p>

      {clients.length === 0 ? (
        <div className="mt-7">
          <Empty
            icon={<Inbox className="h-5 w-5" />}
            title="Nothing shared with you yet"
            line="When a business invites you and ticks the reports they want you to see, they show up here. Nothing is missing — you are just waiting on them."
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {clients.map((c) => (
            <Link
              key={c.link_id}
              to={`/client/${c.workplace_id}`}
              className="group flex items-start justify-between gap-3 rounded-2xl border border-border bg-card p-4 transition hover:border-[hsl(var(--jri-lavender)/0.5)]"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: 'hsl(var(--jri-cyan) / 0.13)', color: 'hsl(var(--jri-cyan))' }}
                  >
                    <Building2 className="h-4 w-4" />
                  </span>
                  <span className="truncate text-sm font-semibold">{c.workplace_name}</span>
                </div>
                <p className="mt-2 truncate text-xs text-muted-foreground">
                  {[c.entity_type, c.gstin].filter(Boolean).join(' · ') || 'No entity details shared'}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {c.report_count === 0
                    ? 'No reports shared yet'
                    : `${c.report_count} report${c.report_count === 1 ? '' : 's'} shared`}
                </p>
              </div>
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
