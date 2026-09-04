import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, FileText, Inbox } from 'lucide-react';
import {
  clientReports, myClients, clientActivity,
  type SharedReport, type Client, type ClientActivity,
} from '../lib/api';
import { Collaboration } from '../components/Collaboration';
import { reportName, reportCategory } from '../lib/reportNames';
import { howLongAgo } from '../lib/format';
import { Empty, Spinner, Freshness } from '../components/Shell';

/** One client: everything they have shared, grouped the way an accountant thinks about it. */
export default function ClientReports() {
  const { workplaceId = '' } = useParams();
  const [reports, setReports] = useState<SharedReport[]>([]);
  const [client, setClient] = useState<Client | null>(null);
  const [activity, setActivity] = useState<ClientActivity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    return Promise.all([clientReports(workplaceId), myClients(), clientActivity(workplaceId)])
      .then(([rows, clients, act]) => {
        setReports(rows ?? []);
        setClient((clients ?? []).find((c) => c.workplace_id === workplaceId) ?? null);
        setActivity(act);
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Could not load this client.'))
      .finally(() => setLoading(false));
  }, [workplaceId]);

  useEffect(() => { void load(); }, [load]);

  if (loading) return <Spinner />;
  if (error) {
    return (
      <p className="rounded-xl px-4 py-3 text-sm"
         style={{ background: 'hsl(var(--status-danger) / 0.1)', color: 'hsl(var(--status-danger))' }}>
        {error}
      </p>
    );
  }

  const byCategory = reports.reduce<Record<string, SharedReport[]>>((acc, r) => {
    const cat = reportCategory(r.report_key);
    (acc[cat] ??= []).push(r);
    return acc;
  }, {});

  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> All clients
      </Link>

      <h1 className="mt-3 text-2xl font-semibold tracking-tight">
        {client?.workplace_name ?? 'Client'}
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {[client?.entity_type, client?.gstin].filter(Boolean).join(' · ') || 'Shared reports'}
      </p>

      {reports.length === 0 ? (
        <div className="mt-7">
          <Empty
            icon={<Inbox className="h-5 w-5" />}
            title="They have not shared a report yet"
            line="This business added you, but has not ticked any reports. Ask them to choose which ones you should see."
          />
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {Object.entries(byCategory).map(([cat, rows]) => (
            <section key={cat}>
              <h2 className="type-eyebrow text-muted-foreground">{cat}</h2>
              <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                {rows.map((r) => (
                  <Link
                    key={r.grant_id}
                    to={`/client/${workplaceId}/report/${r.report_key}${r.financial_year ? `?fy=${r.financial_year}` : ''}`}
                    className="group rounded-xl border border-border bg-card p-3.5 transition hover:border-[hsl(var(--jri-lavender)/0.5)]"
                  >
                    <div className="flex items-start gap-2.5">
                      <span
                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                        style={{ background: 'hsl(var(--jri-lavender) / 0.12)', color: 'hsl(var(--jri-lavender))' }}
                      >
                        <FileText className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{reportName(r.report_key)}</p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {r.financial_year ? `FY ${r.financial_year}` : 'All periods'}
                        </p>
                        <div className="mt-1.5">
                          <Freshness iso={r.last_generated_at} ago={howLongAgo(r.last_generated_at)} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {activity && (
        <section className="mt-8">
          <h2 className="type-eyebrow text-muted-foreground">Working with them</h2>
          <div className="mt-2.5">
            <Collaboration activity={activity} onChanged={() => { void load(); }} />
          </div>
        </section>
      )}
    </div>
  );
}
