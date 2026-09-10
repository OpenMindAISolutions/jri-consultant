import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, Archive, Building2, CalendarClock, Check, FileText, IndianRupee, MessageCircle,
  Pencil, Plus, ScrollText, TrendingUp, Upload, X,
} from 'lucide-react';
import {
  addReminder, archiveClient, cancelReminder, managedClientDetail, myPaymentDetails, saveClient,
  signedFileUrl, uploadClientFile, convertClient, prettyBytes, generateCalendar, OBLIGATION_TAGS,
  obligationCatalogue,
  type GeneratedCalendar, type ManagedClientDetail, type ObligationRow, type PaymentDetails,
  type SaveClientInput,
} from '../lib/funnel';
import { myClients, myFirm, type Client, type MyFirm } from '../lib/api';
import { paymentMessage, prettyPhone, reminderMessage, waLink } from '../lib/promo';
import { buildUpiUri, maskAccount, upiProblem } from '../lib/upi';
import { UpiQr } from '../components/UpiQr';
import { Spinner } from '../components/Shell';
import { Badge, Button, Notice, PageTitle, Section, fieldClass } from '../components/ui';
import { Field } from './Managed';
import { when, whenExact } from '../lib/format';

/**
 * One off-platform business, and everything a consultant does about it.
 *
 * THE SHAPE OF THIS SCREEN IS AN ARGUMENT. Four things earn a consultant's time here — chase a
 * deadline, hold a document, get paid, and record the day the business came onto JRI — so there are
 * exactly four working panels and no others. Contact details are a card, not a form, because a phone
 * number is read a hundred times for every time it is changed.
 *
 * EVERY OUTGOING MESSAGE IS COMPOSED IN promo.ts AND CARRIES THE PROMOTIONAL LINE. That is not
 * enforced by this file remembering to do it; the composers do it, and this file cannot produce a
 * message any other way. Sending is a wa.me link — the consultant's own WhatsApp opens with the text
 * ready and they press send — because the API path needs a Meta Business account that does not exist
 * yet. When it does, the same composed text goes through `queue_consultant_whatsapp` unchanged.
 */

const label = (s: string) => s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export default function ManagedClient() {
  const { clientId = '' } = useParams();
  const [d, setD] = useState<ManagedClientDetail | null>(null);
  const [pay, setPay] = useState<PaymentDetails | null>(null);
  const [jriClients, setJriClients] = useState<Client[]>([]);
  const [firm, setFirm] = useState<MyFirm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  const load = useCallback(async () => {
    try {
      setD(await managedClientDetail(clientId));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load that client.');
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => { void load(); }, [load]);

  useEffect(() => {
    // Both are optional context, and neither failing should take the screen down with it.
    void myPaymentDetails().then(setPay).catch(() => { /* none set: the panel offers to add them */ });
    void myClients().then(setJriClients).catch(() => { /* the convert picker just stays empty */ });
    void myFirm().then(setFirm).catch(() => { /* solo consultant */ });
  }, []);

  if (loading) return <Spinner label="Opening the client…" />;
  if (!d) return (
    <div>
      <BackLink />
      <Notice className="mt-4">{error ?? 'That client could not be opened.'}</Notice>
    </div>
  );

  const c = d.client;
  const scheduled = d.reminders.filter((r) => r.status === 'scheduled');
  const history = d.reminders.filter((r) => r.status !== 'scheduled');

  return (
    <div>
      <BackLink />

      <PageTitle
        title={c.name}
        subtitle={
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {c.converted_workplace_id ? (
              <Badge tone="ok" icon={<TrendingUp className="h-2.5 w-2.5" />}>
                joined JRI {c.converted_at ? when(c.converted_at) : ''}
              </Badge>
            ) : (
              <Badge>not on JRI</Badge>
            )}
            {c.status === 'archived' && <Badge tone="warn">archived</Badge>}
            {!d.is_owner && <Badge tone="accent">reaches you through your firm</Badge>}
            <span className="text-muted-foreground">added {when(c.created_at)}</span>
          </span>
        }
        actions={
          <>
            <Button icon={<Pencil className="h-3.5 w-3.5" />} onClick={() => setEditing((v) => !v)}>
              {editing ? 'Close' : 'Edit'}
            </Button>
            {c.status === 'active' && (
              <Button
                tone="ghost" icon={<Archive className="h-3.5 w-3.5" />}
                onClick={async () => {
                  if (!window.confirm(`Archive ${c.name}? Nothing is deleted — the record, its documents and its history stay, and it drops out of your active list.`)) return;
                  try { await archiveClient(c.id); await load(); }
                  catch (e) { setError(e instanceof Error ? e.message : 'Could not archive that client.'); }
                }}
              >
                Archive
              </Button>
            )}
          </>
        }
      />

      {error && <Notice className="mb-4">{error}</Notice>}

      {editing && (
        <EditClient
          client={c} firm={firm}
          onDone={async () => { setEditing(false); await load(); }}
          onError={setError}
        />
      )}

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <Reminders
            clientId={c.id}
            clientName={c.contact_name || c.name}
            phone={c.phone_e164}
            fromName={firm?.name ?? null}
            scheduled={scheduled}
            history={history}
            onChange={load}
            onError={setError}
          />

          <ComplianceCalendar client={c} onChange={load} onError={setError} />

          <Files clientId={c.id} files={d.files} onChange={load} onError={setError} />
        </div>

        <div className="space-y-4 lg:col-span-2">
          <ContactCard client={c} />

          <GetPaid
            clientName={c.contact_name || c.name}
            phone={c.phone_e164}
            pay={pay}
            fromName={firm?.name ?? pay?.bank_account_name ?? null}
          />

          <Convert
            client={c}
            convertedName={d.converted_workplace_name}
            jriClients={jriClients}
            onDone={load}
            onError={setError}
          />
        </div>
      </div>
    </div>
  );
}

function BackLink() {
  return (
    <Link to="/managed"
          className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground">
      <ArrowLeft className="h-3.5 w-3.5" /> All your clients
    </Link>
  );
}

// ── Contact ─────────────────────────────────────────────────────────────────

function ContactCard({ client: c }: { client: ManagedClientDetail['client'] }) {
  const rows: [string, string | null][] = [
    ['Contact', c.contact_name],
    ['WhatsApp', c.phone_e164 ? prettyPhone(c.phone_e164) : null],
    ['Email', c.email],
    ['Entity', c.entity_type ? label(c.entity_type) : null],
    ['GSTIN', c.gstin],
    ['PAN', c.pan],
    ['Place', [c.city, c.state].filter(Boolean).join(', ') || null],
  ];
  const present = rows.filter(([, v]) => v);

  return (
    <Section title="Details" icon={<Building2 className="h-4 w-4" />}>
      {present.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nothing recorded yet. Add a WhatsApp number and you can start sending reminders.
        </p>
      ) : (
        <dl className="space-y-2">
          {present.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3">
              <dt className="text-[11.5px] text-muted-foreground">{k}</dt>
              <dd className="min-w-0 truncate text-right text-xs font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      )}
      {c.notes && (
        <p className="mt-3 whitespace-pre-wrap rounded-xl bg-accent/10 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
          {c.notes}
        </p>
      )}
    </Section>
  );
}

/**
 * The edit form.
 *
 * IT POSTS EVERY FIELD, ALWAYS. `consultant_save_client` overwrites rather than merges — an omitted
 * argument is written as null — so a form that sent only the changed fields would silently wipe the
 * GSTIN off a client whose city was corrected. `firmId` is included for exactly the same reason: a
 * save without it would quietly take the client back off the firm.
 */
function EditClient({
  client: c, firm, onDone, onError,
}: {
  client: ManagedClientDetail['client'];
  firm: MyFirm | null;
  onDone: () => Promise<void>;
  onError: (m: string) => void;
}) {
  const [f, setF] = useState<SaveClientInput>({
    clientId: c.id, name: c.name, contactName: c.contact_name, phoneE164: c.phone_e164,
    email: c.email, gstin: c.gstin, pan: c.pan, entityType: c.entity_type,
    city: c.city, state: c.state, notes: c.notes, firmId: c.firm_id,
  });
  const [saving, setSaving] = useState(false);

  return (
    <Section className="mb-4" title="Edit this client" icon={<Pencil className="h-4 w-4" />}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Business name" required>
          <input className={fieldClass} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
        </Field>
        <Field label="Who you speak to">
          <input className={fieldClass} value={f.contactName ?? ''} onChange={(e) => setF({ ...f, contactName: e.target.value })} />
        </Field>
        <Field label="WhatsApp number">
          <input className={fieldClass} value={f.phoneE164 ?? ''} inputMode="tel" onChange={(e) => setF({ ...f, phoneE164: e.target.value })} />
        </Field>
        <Field label="Email">
          <input className={fieldClass} value={f.email ?? ''} type="email" onChange={(e) => setF({ ...f, email: e.target.value })} />
        </Field>
        <Field label="GSTIN">
          <input className={fieldClass} value={f.gstin ?? ''} onChange={(e) => setF({ ...f, gstin: e.target.value.toUpperCase() })} />
        </Field>
        <Field label="PAN">
          <input className={fieldClass} value={f.pan ?? ''} onChange={(e) => setF({ ...f, pan: e.target.value.toUpperCase() })} />
        </Field>
        <Field label="City">
          <input className={fieldClass} value={f.city ?? ''} onChange={(e) => setF({ ...f, city: e.target.value })} />
        </Field>
        <Field label="State">
          <input className={fieldClass} value={f.state ?? ''} onChange={(e) => setF({ ...f, state: e.target.value })} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Notes">
            <textarea className={`${fieldClass} min-h-[70px] resize-y`} value={f.notes ?? ''}
                      onChange={(e) => setF({ ...f, notes: e.target.value })} />
          </Field>
        </div>
        {firm && (
          <label className="flex items-start gap-2 sm:col-span-2">
            <input type="checkbox" className="mt-0.5" checked={f.firmId != null}
                   onChange={(e) => setF({ ...f, firmId: e.target.checked ? firm.id : null })} />
            <span className="text-xs leading-relaxed text-muted-foreground">
              Shared with <strong className="text-foreground">{firm.name}</strong>
            </span>
          </label>
        )}
      </div>
      <div className="mt-4">
        <Button
          tone="primary" busy={saving}
          onClick={async () => {
            if (!f.name.trim()) { onError('A business needs a name.'); return; }
            setSaving(true);
            try { await saveClient(f); await onDone(); }
            catch (e) { onError(e instanceof Error ? e.message : 'Could not save.'); }
            finally { setSaving(false); }
          }}
        >
          Save changes
        </Button>
      </div>
    </Section>
  );
}

// ── Reminders ───────────────────────────────────────────────────────────────

function Reminders({
  clientId, clientName, phone, fromName, scheduled, history, onChange, onError,
}: {
  clientId: string;
  clientName: string;
  phone: string | null;
  fromName: string | null;
  scheduled: ManagedClientDetail['reminders'];
  history: ManagedClientDetail['reminders'];
  onChange: () => Promise<void>;
  onError: (m: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [f, setF] = useState({ title: '', dueDate: '', note: '', channel: 'whatsapp' as const });

  const add = async () => {
    if (!f.title.trim() || !f.dueDate) { onError('A reminder needs a title and a date.'); return; }
    setSaving(true);
    try {
      await addReminder(clientId, f.title, f.dueDate, f.note || null, f.channel);
      setF({ title: '', dueDate: '', note: '', channel: 'whatsapp' });
      setOpen(false);
      await onChange();
    } catch (e) {
      onError(e instanceof Error ? e.message : 'Could not save that reminder.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Section
      title="Reminders"
      subtitle="What you have to chase them about, and the message that does it."
      icon={<CalendarClock className="h-4 w-4" />}
      actions={
        <Button size="sm" icon={<Plus className="h-3 w-3" />} onClick={() => setOpen((v) => !v)}>
          {open ? 'Close' : 'Add'}
        </Button>
      }
    >
      {open && (
        <div className="mb-4 space-y-3 rounded-xl border border-border p-3.5">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="What is due" required>
              <input className={fieldClass} value={f.title} autoFocus
                     placeholder="GSTR-3B for August"
                     onChange={(e) => setF({ ...f, title: e.target.value })} />
            </Field>
            <Field label="When" required>
              <input className={fieldClass} type="date" value={f.dueDate}
                     onChange={(e) => setF({ ...f, dueDate: e.target.value })} />
            </Field>
          </div>
          <Field label="Anything to add" hint="Goes into the WhatsApp message under the deadline.">
            <textarea className={`${fieldClass} min-h-[60px] resize-y`} value={f.note}
                      placeholder="Please send the purchase register by the 15th."
                      onChange={(e) => setF({ ...f, note: e.target.value })} />
          </Field>
          <Button tone="primary" size="sm" busy={saving} onClick={() => void add()}>Save reminder</Button>
        </div>
      )}

      {scheduled.length === 0 ? (
        <p className="py-5 text-center text-sm text-muted-foreground">
          Nothing scheduled. Add what is next due and you can send it in one tap.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {scheduled.map((r) => {
            const days = Math.ceil((new Date(`${r.due_date}T00:00:00`).getTime() - Date.now()) / 86_400_000);
            const tone = days < 0 ? 'danger' : days <= 7 ? 'warn' : 'neutral';
            const text = days < 0 ? `${Math.abs(days)}d overdue` : days === 0 ? 'due today' : `in ${days}d`;
            const link = waLink(phone, reminderMessage({
              clientName, title: r.title, dueDate: r.due_date, note: r.note, fromName,
            }));
            return (
              <li key={r.id} className="flex flex-wrap items-start justify-between gap-2.5 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">{r.title}</span>
                    <Badge tone={tone}>{text}</Badge>
                    {r.period_label && <Badge tone="accent">{r.period_label}</Badge>}
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {when(r.due_date)}{r.note ? ` · ${r.note}` : ''}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  {link ? (
                    <a href={link} target="_blank" rel="noreferrer"
                       className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11.5px] font-semibold text-white transition hover:opacity-90"
                       style={{ background: 'hsl(var(--jri-lavender))' }}>
                      <MessageCircle className="h-3 w-3" /> Send
                    </a>
                  ) : (
                    <span className="text-[10.5px] text-muted-foreground">add a number to send</span>
                  )}
                  <Button
                    tone="ghost" size="sm"
                    onClick={async () => {
                      try { await cancelReminder(r.id); await onChange(); }
                      catch (e) { onError(e instanceof Error ? e.message : 'Could not cancel it.'); }
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {history.length > 0 && (
        <details className="mt-3">
          <summary className="cursor-pointer text-[11.5px] text-muted-foreground transition hover:text-foreground">
            {history.length} sent or cancelled
          </summary>
          <ul className="mt-2 divide-y divide-border">
            {history.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-2 py-2">
                <span className="min-w-0 truncate text-xs text-muted-foreground">{r.title}</span>
                <Badge tone={r.status === 'sent' ? 'ok' : 'neutral'}>
                  {r.status === 'sent' ? `sent ${when(r.sent_at)}` : 'cancelled'}
                </Badge>
              </li>
            ))}
          </ul>
        </details>
      )}
    </Section>
  );
}


// ── The compliance calendar ─────────────────────────────────────────────────

/**
 * Fill a year of statutory dates in one press.
 *
 * WHAT THE CHECKBOXES ARE FOR, AND WHY THEY ARE NOT OPTIONAL CLEVERNESS. Two of these can be
 * inferred from the record — a GSTIN means GST-registered, and the entity type separates a company
 * from a proprietor — and they are ticked for you. The rest cannot be inferred by anything: nothing
 * in a client record says whether they deduct TDS or employ twenty people on PF. Guessing them would
 * fill a shopkeeper's calendar with payroll deadlines, and a consultant who sees one obligation that
 * obviously does not apply stops trusting the twenty that do.
 *
 * THE LINE ABOUT EXTENSIONS IS LOAD-BEARING. Every date here is the one the statute fixes. CBIC and
 * CBDT push deadlines by notification most years, and nothing in this product tracks a notification.
 * Saying so on the button is the difference between a tool that is precise about its limits and one
 * that quietly misleads on the years when a date moves.
 */
function ComplianceCalendar({
  client: c, onChange, onError,
}: {
  client: ManagedClientDetail['client'];
  onChange: () => Promise<void>;
  onError: (m: string) => void;
}) {
  const today = new Date();
  const iso = (d: Date) => d.toISOString().slice(0, 10);

  // Derived exactly the way the server derives them when no tags are passed, so the boxes a
  // consultant sees ticked match what they would have got by not choosing at all.
  const derived = useMemo(() => {
    const t: string[] = [];
    if (c.gstin) t.push('gst_regular');
    t.push(['private_limited', 'public_limited', 'opc', 'company'].includes(c.entity_type ?? '')
      ? 'company' : 'individual_or_firm');
    return t;
  }, [c.gstin, c.entity_type]);

  const [tags, setTags] = useState<string[]>(derived);
  const [from, setFrom] = useState(iso(today));
  const [to, setTo] = useState(iso(new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())));
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<GeneratedCalendar | null>(null);
  const [open, setOpen] = useState(false);
  const [catalogue, setCatalogue] = useState<ObligationRow[] | null>(null);

  // Loaded when the panel is opened, not on mount: most visits to a client screen are not about
  // the calendar, and this is reference data that changes when a statute does.
  useEffect(() => {
    if (!open || catalogue) return;
    void obligationCatalogue().then(setCatalogue).catch(() => { /* the preview simply stays hidden */ });
  }, [open, catalogue]);

  /**
   * What is about to be added, before it is added.
   *
   * The matching rule is the server's, restated: an obligation with no tags applies to everybody,
   * otherwise it needs one of the ticks. Reading the count back from the real catalogue also
   * quietly cross-checks the tag list hard-coded in this app against the one in the database — if
   * they ever drift, this number goes wrong in a place somebody is looking at.
   */
  const matching = useMemo(() => {
    if (!catalogue) return null;
    return catalogue.filter(
      (o) => o.applies_when.length === 0 || o.applies_when.some((t) => tags.includes(t)),
    );
  }, [catalogue, tags]);

  const run = async () => {
    if (tags.length === 0) { onError('Tick at least one thing that applies to them.'); return; }
    setBusy(true);
    setResult(null);
    try {
      const r = await generateCalendar(c.id, from, to, tags);
      setResult(r);
      await onChange();
    } catch (e) {
      onError(e instanceof Error ? e.message : 'Could not build that calendar.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Section
      title="Compliance calendar"
      subtitle="Fill their statutory dates from the rule book instead of typing them in."
      icon={<ScrollText className="h-4 w-4" />}
      actions={
        <Button size="sm" onClick={() => setOpen((v) => !v)}>{open ? 'Close' : 'Set it up'}</Button>
      }
    >
      {!open ? (
        <p className="text-sm leading-relaxed text-muted-foreground">
          GST, TDS, payroll, advance tax and ROC dates, generated for the period you choose. Running it
          again later never duplicates anything.
        </p>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-[11.5px] font-medium text-muted-foreground">What applies to them?</p>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {OBLIGATION_TAGS.map((t) => (
                <label key={t.id} className="flex items-start gap-2 rounded-lg border border-border px-2.5 py-2">
                  <input
                    type="checkbox" className="mt-0.5" checked={tags.includes(t.id)}
                    onChange={(e) => setTags((prev) =>
                      e.target.checked ? [...prev, t.id] : prev.filter((x) => x !== t.id))}
                  />
                  <span className="min-w-0">
                    <span className="block text-[11.5px] font-medium">{t.label}</span>
                    <span className="block text-[10.5px] leading-relaxed text-muted-foreground">{t.hint}</span>
                  </span>
                </label>
              ))}
            </div>
            {derived.length > 0 && (
              <p className="mt-2 text-[10.5px] text-muted-foreground">
                Ticked from what you already recorded: {derived.join(', ').replace(/_/g, ' ')}. The rest
                are things only you know.
              </p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="From"><input type="date" className={fieldClass} value={from}
                                       onChange={(e) => setFrom(e.target.value)} /></Field>
            <Field label="To" hint="Up to 18 months at a time."><input type="date" className={fieldClass}
                                     value={to} onChange={(e) => setTo(e.target.value)} /></Field>
          </div>

          {matching && (
            <details className="rounded-xl border border-border px-3 py-2">
              <summary className="cursor-pointer text-[11.5px] text-muted-foreground transition hover:text-foreground">
                {matching.length} obligation{matching.length === 1 ? '' : 's'} apply — see which
              </summary>
              <ul className="mt-2 space-y-1.5">
                {matching.map((o) => (
                  <li key={o.key}>
                    <p className="text-[11.5px] font-medium">{o.label}</p>
                    <p className="text-[10.5px] leading-relaxed text-muted-foreground">{o.authority}</p>
                    {o.note && (
                      <p className="mt-0.5 text-[10.5px] leading-relaxed"
                         style={{ color: 'hsl(var(--status-warn))' }}>{o.note}</p>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <Button tone="primary" busy={busy} onClick={() => void run()}>Fill the calendar</Button>
            <span className="text-[10.5px] leading-relaxed text-muted-foreground">
              These are the dates the law fixes. Extensions announced by CBIC or CBDT are not tracked.
            </span>
          </div>

          {result && (
            <div className="rounded-xl border border-border p-3">
              <p className="text-xs font-medium">
                {result.created === 0
                  ? `Nothing new — all ${result.skipped} of those were already on the calendar.`
                  : `Added ${result.created} date${result.created === 1 ? '' : 's'}${result.skipped ? `, skipped ${result.skipped} already there` : ''}.`}
              </p>
              {result.items.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {result.items.slice(0, 8).map((i) => (
                    <li key={`${i.key}-${i.period}`} className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="min-w-0 truncate text-muted-foreground">{i.title}</span>
                      <span className="shrink-0 tabular-nums">{when(i.due_date)}</span>
                    </li>
                  ))}
                  {result.items.length > 8 && (
                    <li className="text-[10.5px] text-muted-foreground">
                      …and {result.items.length - 8} more, all listed under Reminders above.
                    </li>
                  )}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </Section>
  );
}

// ── Files ───────────────────────────────────────────────────────────────────

/**
 * Documents held for a business that has no account here.
 *
 * They cannot upload anything themselves — that is the difference between this and the JRI document
 * flow, and it is why the copy says the consultant received it. The bucket is private and every URL
 * is signed for sixty seconds, because these are somebody's bank statements and they have no way to
 * check who read them.
 */
function Files({
  clientId, files, onChange, onError,
}: {
  clientId: string;
  files: ManagedClientDetail['files'];
  onChange: () => Promise<void>;
  onError: (m: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [opening, setOpening] = useState<string | null>(null);

  const upload = async (list: FileList | null) => {
    if (!list || list.length === 0) return;
    setBusy(true);
    try {
      // Sequential on purpose: a parallel burst of uploads to a private bucket makes one failure
      // impossible to attribute, and a consultant picking four files wants to know which one failed.
      for (const file of Array.from(list)) await uploadClientFile(clientId, file);
      await onChange();
    } catch (e) {
      onError(e instanceof Error ? e.message : 'That upload did not go through.');
    } finally {
      setBusy(false);
    }
  };

  const open = async (path: string) => {
    setOpening(path);
    try {
      const url = await signedFileUrl(path);
      window.open(url, '_blank', 'noopener');
    } catch (e) {
      onError(e instanceof Error ? e.message : 'Could not open that file.');
    } finally {
      setOpening(null);
    }
  };

  return (
    <Section
      title="Documents"
      subtitle="What they have sent you. Stored privately — only you and your firm can open these."
      icon={<FileText className="h-4 w-4" />}
      actions={
        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-[11.5px] font-semibold text-muted-foreground transition hover:text-foreground">
          {busy ? (
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <Upload className="h-3 w-3" />
          )}
          {busy ? 'Uploading…' : 'Add files'}
          <input type="file" multiple className="hidden" disabled={busy}
                 onChange={(e) => { void upload(e.target.files); e.target.value = ''; }} />
        </label>
      }
    >
      {files.length === 0 ? (
        <p className="py-5 text-center text-sm text-muted-foreground">
          Nothing filed yet. Add what they send you — a GST return, a bank statement, a signed form —
          and it stays here against their name.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {files.map((f) => (
            <li key={f.id} className="flex items-center justify-between gap-2.5 py-2.5 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{f.title}</p>
                <p className="text-[11px] text-muted-foreground">
                  {prettyBytes(f.size_bytes)} · {whenExact(f.created_at)}
                </p>
              </div>
              <Button size="sm" busy={opening === f.storage_path}
                      onClick={() => void open(f.storage_path)}>
                Open
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

// ── Getting paid ────────────────────────────────────────────────────────────

function GetPaid({
  clientName, phone, pay, fromName,
}: {
  clientName: string;
  phone: string | null;
  pay: PaymentDetails | null;
  fromName: string | null;
}) {
  const [amount, setAmount] = useState('');
  const [forWhat, setForWhat] = useState('');
  const [showQr, setShowQr] = useState(false);

  const amt = amount.trim() === '' ? null : Number(amount);
  const problem = useMemo(
    () => upiProblem({ vpa: pay?.upi_id ?? '', amount: amt }),
    [pay?.upi_id, amt],
  );

  const uri = useMemo(() => {
    if (!pay?.upi_id) return null;
    return buildUpiUri({
      vpa: pay.upi_id,
      payeeName: pay.bank_account_name ?? fromName ?? null,
      amount: amt,
      note: forWhat || 'Professional fees',
    });
  }, [pay?.upi_id, pay?.bank_account_name, fromName, amt, forWhat]);

  const message = paymentMessage({
    clientName,
    amount: amt,
    forWhat: forWhat || null,
    upiUri: uri,
    upiId: pay?.upi_id ?? null,
    bank: pay ? {
      name: pay.bank_account_name, account: pay.bank_account_number, ifsc: pay.bank_ifsc,
    } : null,
    note: pay?.payment_note ?? null,
    fromName,
  });
  const link = waLink(phone, message);

  const hasAnything = pay && (pay.upi_id || pay.bank_account_number);

  return (
    <Section title="Get paid" icon={<IndianRupee className="h-4 w-4" />}
             subtitle={pay?.source === 'firm' ? 'Using your firm’s published details.' : undefined}>
      {!hasAnything ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            You have not added a UPI ID or bank account yet, so there is nothing to ask them to pay into.
          </p>
          <Link to="/settings"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                style={{ background: 'hsl(var(--jri-lavender))' }}>
            Add your payment details
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Amount" hint="Leave blank to let them type it.">
              <input className={fieldClass} inputMode="decimal" value={amount} placeholder="15000"
                     onChange={(e) => setAmount(e.target.value)} />
            </Field>
            <Field label="For what">
              <input className={fieldClass} value={forWhat} placeholder="August GST filing"
                     onChange={(e) => setForWhat(e.target.value)} />
            </Field>
          </div>

          {problem && <Notice tone="warn">{problem}</Notice>}

          {pay?.upi_id && !problem && (
            <div className="rounded-xl border border-border p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[11px] text-muted-foreground">UPI</p>
                  <p className="truncate text-xs font-medium">{pay.upi_id}</p>
                </div>
                <Button size="sm" onClick={() => setShowQr((v) => !v)}>
                  {showQr ? 'Hide QR' : 'Show QR'}
                </Button>
              </div>
              {showQr && uri && (
                <div className="mt-3">
                  <UpiQr uri={uri} label={amt ? `₹${amt.toLocaleString('en-IN')} to ${pay.upi_id}` : `Any amount to ${pay.upi_id}`} />
                </div>
              )}
            </div>
          )}

          {pay?.bank_account_number && (
            <div className="rounded-xl border border-border p-3 text-xs">
              <p className="mb-1 text-[11px] text-muted-foreground">Bank transfer</p>
              {pay.bank_account_name && <p className="font-medium">{pay.bank_account_name}</p>}
              <p className="text-muted-foreground">
                A/c {maskAccount(pay.bank_account_number)}{pay.bank_ifsc ? ` · ${pay.bank_ifsc}` : ''}
              </p>
            </div>
          )}

          {link ? (
            <a href={link} target="_blank" rel="noreferrer"
               className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90"
               style={{ background: 'hsl(var(--jri-lavender))' }}>
              <MessageCircle className="h-3.5 w-3.5" /> Send the request on WhatsApp
            </a>
          ) : (
            <p className="text-[11px] text-muted-foreground">
              Add a WhatsApp number to this client and you can send the request from here.
            </p>
          )}

          <details>
            <summary className="cursor-pointer text-[11px] text-muted-foreground transition hover:text-foreground">
              See exactly what they will read
            </summary>
            <pre className="mt-2 whitespace-pre-wrap rounded-xl bg-accent/10 px-3 py-2.5 text-[11px] leading-relaxed text-muted-foreground">
              {message}
            </pre>
          </details>
        </div>
      )}
    </Section>
  );
}

// ── The conversion ──────────────────────────────────────────────────────────

/**
 * "They joined JRI."
 *
 * THE PICKER IS THE ONLY HONEST UI HERE. The function will record a conversion against any workplace
 * that exists — deliberately, so a consultant can stamp it the day it happens rather than the day
 * the invitation arrives. But this app has no way to LEARN a workplace id until the business invites
 * the consultant, and asking somebody to paste a uuid is asking them to get it wrong. So the choice
 * is drawn from the businesses that have actually shared with you, and when the list is empty the
 * panel says what has to happen first instead of offering a text box.
 */
function Convert({
  client: c, convertedName, jriClients, onDone, onError,
}: {
  client: ManagedClientDetail['client'];
  convertedName: string | null;
  jriClients: Client[];
  onDone: () => Promise<void>;
  onError: (m: string) => void;
}) {
  const [pick, setPick] = useState('');
  const [saving, setSaving] = useState(false);

  if (c.converted_workplace_id) {
    return (
      <Section title="On JRI" icon={<TrendingUp className="h-4 w-4" />}>
        <div className="flex items-start gap-2.5">
          <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'hsl(var(--status-ok))' }} />
          <div className="min-w-0">
            <p className="text-sm font-medium">{convertedName ?? 'Signed up'}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Recorded {c.converted_at ? when(c.converted_at) : '—'}. This is the one number the funnel
              is measuring, and it does not move once set.
            </p>
            <Link to={`/client/${c.converted_workplace_id}`}
                  className="mt-2 inline-block text-[11.5px] font-semibold"
                  style={{ color: 'hsl(var(--jri-lavender))' }}>
              Open their JRI workspace →
            </Link>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section title="Did they join JRI?" icon={<TrendingUp className="h-4 w-4" />}
             subtitle="Record it once they sign up, so your practice can see which of your clients came across.">
      {jriClients.length === 0 ? (
        <p className="text-sm leading-relaxed text-muted-foreground">
          None of your clients have shared a JRI workspace with you yet. Once this business signs up and
          invites you, they appear here and you can tie the two records together.
        </p>
      ) : (
        <div className="space-y-3">
          <Field label="Which workspace is theirs?">
            <select className={fieldClass} value={pick} onChange={(e) => setPick(e.target.value)}>
              <option value="">Choose…</option>
              {jriClients.map((j) => (
                <option key={j.workplace_id} value={j.workplace_id}>{j.workplace_name}</option>
              ))}
            </select>
          </Field>
          <Button
            tone="primary" disabled={!pick} busy={saving}
            onClick={async () => {
              setSaving(true);
              try { await convertClient(c.id, pick); await onDone(); }
              catch (e) { onError(e instanceof Error ? e.message : 'Could not record that.'); }
              finally { setSaving(false); }
            }}
          >
            They joined JRI
          </Button>
        </div>
      )}
    </Section>
  );
}
