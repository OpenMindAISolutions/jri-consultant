import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ChevronRight, Inbox, Users } from 'lucide-react';
import { myClients, myFirm, assignLinkToFirm, type Client, type MyFirm } from '../lib/api';
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
  const [firm, setFirm] = useState<MyFirm | null>(null);
  const [firmLinks, setFirmLinks] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    myClients()
      .then((rows) => setClients(rows ?? []))
      .catch((e) => setError(e instanceof Error ? e.message : 'Could not load your clients.'))
      .finally(() => setLoading(false));
    // A firm is optional — a solo consultant simply never sees the control below.
    void myFirm()
      .then((f) => { if (f) { setFirm(f); setFirmLinks(new Set(f.firm_link_ids ?? [])); } })
      .catch(() => { /* no firm; the sharing control stays hidden */ });
  }, []);

  /**
   * Hand a client to the firm, or take it back.
   *
   * `assign_link_to_firm` has existed since the consultant platform shipped and had no UI at all,
   * so a firm owner could add colleagues and then never give them anything to work on — the firm
   * feature broke at its last step.
   */
  const toggleFirm = async (linkId: string) => {
    if (!firm) return;
    const isShared = firmLinks.has(linkId);
    setSaving(linkId);
    try {
      await assignLinkToFirm(linkId, isShared ? null : firm.id);
      setFirmLinks((prev) => {
        const next = new Set(prev);
        if (isShared) next.delete(linkId); else next.add(linkId);
        return next;
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not change who works this client.');
    } finally {
      setSaving(null);
    }
  };

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
            <div key={c.link_id} className="flex flex-col gap-1.5">
            <Link
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
            {firm?.is_owner && (
              <button
                type="button"
                disabled={saving === c.link_id}
                onClick={() => void toggleFirm(c.link_id)}
                title={firmLinks.has(c.link_id)
                  ? `Only you work this client again — colleagues at ${firm.name} lose access`
                  : `Let colleagues at ${firm.name} work this client`}
                className="mt-1 inline-flex items-center gap-1.5 self-start rounded-lg border border-border px-2.5 py-1 text-xs transition hover:bg-accent/15 disabled:opacity-50"
              >
                <Users className="h-3.5 w-3.5" />
                {firmLinks.has(c.link_id) ? `Worked by ${firm.name}` : 'Share with my firm'}
              </button>
            )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
