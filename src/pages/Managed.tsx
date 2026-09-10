import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2, Plus, Search, Sparkles, TrendingUp, X, MessageCircle, CalendarClock, FileText,
} from 'lucide-react';
import {
  myManagedClients, saveClient, type ManagedClient, type SaveClientInput,
} from '../lib/funnel';
import { myFirm, type MyFirm } from '../lib/api';
import { reminderMessage, waLink, prettyPhone } from '../lib/promo';
import { Empty, Spinner } from '../components/Shell';
import { Badge, Button, Notice, PageTitle, Row, Section, fieldClass } from '../components/ui';
import { when } from '../lib/format';

/**
 * The consultant's own client book — businesses that are NOT on JRI.
 *
 * WHY THIS SCREEN IS THE FUNNEL. Every other screen in this app serves a business that already
 * signed up. This one serves the ones that have not, and the whole design leans on a single number:
 * how many of them have since joined. That is why the conversion count sits in the header strip
 * rather than buried in a report, and why a converted client keeps its row instead of graduating out
 * of the list — a list that removes its successes cannot show you that it works.
 *
 * WHAT A CONSULTANT GETS OUT OF IT, which is the only reason they would type a client in at all:
 * reminders they can send on WhatsApp in one tap, a place to keep documents, and a way to get paid.
 * The promotional line rides along on every message — see promo.ts. Nobody is asked to advertise
 * anything; they are asked to do the work they already do, in a place where the work advertises.
 */

const ENTITY_TYPES = [
  '', 'proprietorship', 'partnership', 'llp', 'private_limited', 'public_limited', 'opc',
  'trust', 'society', 'huf', 'individual',
] as const;

const label = (s: string) => s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const EMPTY_FORM: SaveClientInput = {
  name: '', contactName: '', phoneE164: '', email: '', gstin: '', pan: '',
  entityType: '', city: '', state: '', notes: '', firmId: null,
};

export default function Managed() {
  const [clients, setClients] = useState<ManagedClient[]>([]);
  const [firm, setFirm] = useState<MyFirm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<SaveClientInput>(EMPTY_FORM);
  const [query, setQuery] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  const load = useCallback(async () => {
    try {
      setClients(await myManagedClients());
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load your clients.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  // The firm is optional and its absence is normal — a solo consultant has no firm row at all.
  useEffect(() => {
    void myFirm().then(setFirm).catch(() => { /* no firm: the share-with-firm control stays hidden */ });
  }, []);

  const submit = async () => {
    if (!form.name.trim()) { setError('A business needs a name.'); return; }
    setSaving(true);
    setError(null);
    try {
      await saveClient(form);
      setForm(EMPTY_FORM);
      setAdding(false);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save that client.');
    } finally {
      setSaving(false);
    }
  };

  const active = clients.filter((c) => c.status === 'active');
  const converted = clients.filter((c) => c.converted_workplace_id);
  const dueSoon = clients.filter(
    (c) => c.next_due_date && new Date(`${c.next_due_date}T00:00:00`).getTime() < Date.now() + 7 * 86_400_000,
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clients
      .filter((c) => (showArchived ? true : c.status === 'active'))
      .filter((c) => !q || [c.name, c.contact_name, c.city, c.gstin, c.phone_e164]
        .some((v) => v?.toLowerCase().includes(q)));
  }, [clients, query, showArchived]);

  if (loading) return <Spinner label="Loading your client book…" />;

  return (
    <div>
      <PageTitle
        title="Your clients"
        subtitle="Businesses you look after that are not on JRI. Private to you — they have no account here and see nothing but the messages you send."
        actions={
          <Button tone="primary" icon={<Plus className="h-3.5 w-3.5" />} onClick={() => setAdding((v) => !v)}>
            {adding ? 'Close' : 'Add a business'}
          </Button>
        }
      />

      {error && <Notice className="mb-4">{error}</Notice>}

      {clients.length > 0 && (
        <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="On your books" value={active.length} hint="not on JRI" icon={Building2} />
          <Stat label="Joined JRI" value={converted.length}
                hint={converted.length === 0 ? 'none yet' : 'through you'} icon={TrendingUp} tone="ok" />
          <Stat label="Due this week" value={dueSoon.length}
                hint={dueSoon.length === 0 ? 'nothing close' : 'reminders to send'} icon={CalendarClock}
                tone={dueSoon.length ? 'warn' : 'neutral'} />
          <Stat label="Documents held" value={clients.reduce((n, c) => n + (c.file_count ?? 0), 0)}
                hint="across every client" icon={FileText} />
        </div>
      )}

      {adding && (
        <Section
          className="mb-5"
          title="Add a business"
          subtitle="Only the name is required. Everything else can be filled in later — a client you cannot name is not a client you can chase."
          icon={<Plus className="h-4 w-4" />}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Business name" required>
              <input className={fieldClass} value={form.name} autoFocus
                     placeholder="Sharma Traders"
                     onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Who you speak to">
              <input className={fieldClass} value={form.contactName ?? ''}
                     placeholder="Anil Sharma"
                     onChange={(e) => setForm({ ...form, contactName: e.target.value })} />
            </Field>
            <Field label="WhatsApp number" hint="Used for reminders. Indian mobiles can be typed as 10 digits.">
              <input className={fieldClass} value={form.phoneE164 ?? ''} inputMode="tel"
                     placeholder="+91 98765 43210"
                     onChange={(e) => setForm({ ...form, phoneE164: e.target.value })} />
            </Field>
            <Field label="Email">
              <input className={fieldClass} value={form.email ?? ''} type="email"
                     placeholder="anil@sharmatraders.in"
                     onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </Field>
            <Field label="Entity type">
              <select className={fieldClass} value={form.entityType ?? ''}
                      onChange={(e) => setForm({ ...form, entityType: e.target.value })}>
                {ENTITY_TYPES.map((t) => (
                  <option key={t} value={t}>{t === '' ? 'Not sure yet' : label(t)}</option>
                ))}
              </select>
            </Field>
            <Field label="GSTIN">
              <input className={fieldClass} value={form.gstin ?? ''}
                     placeholder="27AAAAA0000A1Z5"
                     onChange={(e) => setForm({ ...form, gstin: e.target.value.toUpperCase() })} />
            </Field>
            <Field label="PAN">
              <input className={fieldClass} value={form.pan ?? ''}
                     placeholder="AAAAA0000A"
                     onChange={(e) => setForm({ ...form, pan: e.target.value.toUpperCase() })} />
            </Field>
            <Field label="City">
              <input className={fieldClass} value={form.city ?? ''}
                     onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </Field>
            <Field label="State">
              <input className={fieldClass} value={form.state ?? ''}
                     onChange={(e) => setForm({ ...form, state: e.target.value })} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Notes">
                <textarea className={`${fieldClass} min-h-[70px] resize-y`} value={form.notes ?? ''}
                          placeholder="Anything you need to remember about them."
                          onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </Field>
            </div>
            {firm && (
              <label className="flex items-start gap-2 sm:col-span-2">
                <input type="checkbox" className="mt-0.5" checked={form.firmId != null}
                       onChange={(e) => setForm({ ...form, firmId: e.target.checked ? firm.id : null })} />
                <span className="text-xs leading-relaxed text-muted-foreground">
                  Share with <strong className="text-foreground">{firm.name}</strong> — anyone in the firm
                  can then work this client. Leave it off and the record is yours alone.
                </span>
              </label>
            )}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Button tone="primary" busy={saving} onClick={() => void submit()}>Save client</Button>
            <Button tone="ghost" onClick={() => { setAdding(false); setForm(EMPTY_FORM); }}>Cancel</Button>
          </div>
        </Section>
      )}

      {clients.length === 0 ? (
        <Empty
          icon={<Sparkles className="h-5 w-5" />}
          title="Your book is empty"
          line="Add a business you already look after. You can send them WhatsApp reminders, keep their documents, and ask to be paid — and each message carries an invitation to bring them onto JRI."
        />
      ) : (
        <>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <div className="relative min-w-[180px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                className={fieldClass} style={{ paddingLeft: '2.1rem' }}
                placeholder="Search by name, contact, city or GSTIN"
                value={query} onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} aria-label="Clear search"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <Button tone={showArchived ? 'secondary' : 'ghost'} size="sm"
                    onClick={() => setShowArchived((v) => !v)}>
              {showArchived ? 'Hiding nothing' : 'Show archived'}
            </Button>
          </div>

          {visible.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
              Nothing matches “{query}”.
            </p>
          ) : (
            <ul className="space-y-2.5">
              {visible.map((c) => <ClientRow key={c.id} c={c} />)}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

function ClientRow({ c }: { c: ManagedClient }) {
  const overdue = c.next_due_date && new Date(`${c.next_due_date}T00:00:00`).getTime() < Date.now();

  // One tap to the next thing owed. Composed here rather than on the detail screen because the
  // reason a consultant opens this list at all is usually to send exactly this.
  const wa = c.next_due_date
    ? waLink(c.phone_e164, reminderMessage({
        clientName: c.contact_name || c.name,
        title: 'your upcoming filing',
        dueDate: c.next_due_date,
      }))
    : null;

  return (
    <li>
      <Row className="p-3.5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <Link to={`/managed/${c.id}`} className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="truncate text-sm font-semibold">{c.name}</span>
              {c.converted_workplace_id && <Badge tone="ok">on JRI</Badge>}
              {c.status === 'archived' && <Badge>archived</Badge>}
              {!c.is_owner && <Badge tone="accent">firm</Badge>}
            </div>
            <p className="mt-1 truncate text-xs text-muted-foreground">
              {[
                c.contact_name,
                c.phone_e164 ? prettyPhone(c.phone_e164) : null,
                c.entity_type ? label(c.entity_type) : null,
                c.city,
              ].filter(Boolean).join(' · ') || 'No contact details yet'}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {c.open_reminder_count > 0 && (
                <Badge tone={overdue ? 'danger' : 'warn'} icon={<CalendarClock className="h-2.5 w-2.5" />}>
                  {c.next_due_date ? `${overdue ? 'overdue' : 'due'} ${when(c.next_due_date)}` : `${c.open_reminder_count} scheduled`}
                </Badge>
              )}
              {c.file_count > 0 && (
                <Badge icon={<FileText className="h-2.5 w-2.5" />}>{c.file_count} file{c.file_count === 1 ? '' : 's'}</Badge>
              )}
            </div>
          </Link>
          <div className="flex shrink-0 items-center gap-1.5">
            {wa && (
              <a href={wa} target="_blank" rel="noreferrer"
                 className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-[11.5px] font-semibold text-muted-foreground transition hover:text-foreground">
                <MessageCircle className="h-3 w-3" /> Remind
              </a>
            )}
            <Link to={`/managed/${c.id}`}
                  className="inline-flex items-center rounded-lg border border-border px-2.5 py-1 text-[11.5px] font-semibold text-muted-foreground transition hover:text-foreground">
              Open
            </Link>
          </div>
        </div>
      </Row>
    </li>
  );
}

function Stat({
  label: text, value, hint, icon: Icon, tone = 'neutral',
}: {
  label: string; value: number; hint: string; icon: typeof Building2;
  tone?: 'neutral' | 'ok' | 'warn';
}) {
  const colour = tone === 'ok' ? 'hsl(var(--status-ok))'
    : tone === 'warn' ? 'hsl(var(--status-warn))' : undefined;
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{text}</span>
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <p className="mt-2 text-2xl font-semibold tabular-nums" style={colour ? { color: colour } : undefined}>
        {value}
      </p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}

export function Field({
  label: text, hint, required, children,
}: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11.5px] font-medium text-muted-foreground">
        {text}{required && <span style={{ color: 'hsl(var(--status-danger))' }}> *</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[10.5px] leading-relaxed text-muted-foreground">{hint}</span>}
    </label>
  );
}
