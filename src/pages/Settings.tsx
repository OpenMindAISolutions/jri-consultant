import { useCallback, useEffect, useState } from 'react';
import { fieldClass, Notice } from '../components/ui';
import { MessageCircle, Building2, Plus, Trash2, ShieldCheck, Loader2, AlertTriangle } from 'lucide-react';
import {
  whatsappOverview, connectWhatsApp, disconnectWhatsApp, saveWhatsAppTemplate,
  recordOptin, recordOptout, createFirm, addFirmMember, myFirm,
  type WhatsAppOverview,
} from '../lib/api';
import { Spinner } from '../components/Shell';
import { whenExact } from '../lib/format';

/**
 * Your firm, and your WhatsApp.
 *
 * Both belong to the CONSULTANT, not to any client — which is why they live here and not on a
 * client screen. The copy says so repeatedly, because the distinction is the whole security story:
 * a business never sees these settings and never gains access to this number.
 */
const PURPOSES = [
  { id: 'document_request', label: 'Asking for a document' },
  { id: 'deadline_reminder', label: 'Deadline reminder' },
  { id: 'report_shared', label: 'A report was shared' },
  { id: 'filed_confirmation', label: 'Confirming a filing' },
  { id: 'custom', label: 'Something else' },
];

const input = fieldClass;
const btn = 'inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-50';

export default function Settings() {
  const [wa, setWa] = useState<WhatsAppOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [route, setRoute] = useState<'meta_direct' | 'bsp'>('meta_direct');
  const [form, setForm] = useState({
    displayName: '', phoneE164: '', phoneNumberId: '', businessAccountId: '',
    accessToken: '', bspName: '', bspReference: '',
  });
  const [tpl, setTpl] = useState({ name: '', purpose: 'document_request', preview: '' });
  const [optin, setOptin] = useState({ phone: '', name: '' });
  const [firmName, setFirmName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [firmId, setFirmId] = useState<string | null>(null);
  const [firmLabel, setFirmLabel] = useState<string | null>(null);

  // Load the firm you ALREADY have. Without this, firmId was set only by createFirm, so a reload
  // hid the add-colleague block and a firm created yesterday was unreachable today.
  useEffect(() => {
    let cancelled = false;
    void myFirm()
      .then((f) => {
        if (cancelled || !f) return;
        setFirmId(f.id);
        setFirmLabel(f.name);
      })
      .catch(() => { /* no firm, or not reachable — the create path stays available */ });
    return () => { cancelled = true; };
  }, []);

  const load = useCallback(async () => {
    try { setWa(await whatsappOverview()); setError(null); }
    catch (e) { setError(e instanceof Error ? e.message : 'Could not load settings.'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const run = async (fn: () => Promise<unknown>) => {
    setBusy(true); setError(null);
    try { await fn(); await load(); }
    catch (e) { setError(e instanceof Error ? e.message : 'That did not work.'); }
    finally { setBusy(false); }
  };

  if (loading) return <Spinner label="Loading your settings…" />;
  const connected = wa?.connected === true ? wa : null;

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Your settings</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Your firm and your WhatsApp account. These are yours — your clients never see them, and
          connecting a number here gives no one access to your clients' data.
        </p>
      </div>

      {error && (
        <Notice>{error}</Notice>
      )}

      {/* ── Firm ── */}
      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <Building2 className="h-4 w-4" /> Your firm
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          A firm lets colleagues work your clients without sharing your login — so who did what stays
          on the record. Solo? You can skip this entirely.
        </p>
        {firmId ? (
          <p className="mt-3 text-sm">
            <span className="font-medium">{firmLabel ?? 'Your firm'}</span>
            <span className="text-muted-foreground"> · hand a client to a colleague from the Clients screen.</span>
          </p>
        ) : (
          <div className="mt-3 flex flex-wrap gap-2">
            <input className={`${input} max-w-xs`} placeholder="Firm name"
              value={firmName} onChange={(e) => setFirmName(e.target.value)} />
            <button type="button" disabled={busy || !firmName.trim()} className={btn}
              style={{ background: 'hsl(var(--jri-lavender))' }}
              onClick={() => void run(async () => {
                const id = await createFirm(firmName.trim());
                setFirmId(id); setFirmLabel(firmName.trim()); setFirmName('');
              })}>
              <Plus className="h-3.5 w-3.5" /> Create firm
            </button>
          </div>
        )}
        {firmId && (
          <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
            <input className={`${input} max-w-xs`} placeholder="Colleague's email"
              value={memberEmail} onChange={(e) => setMemberEmail(e.target.value)} />
            <button type="button" disabled={busy || !memberEmail.trim()} className={btn}
              style={{ background: 'hsl(var(--jri-cyan))' }}
              onClick={() => void run(async () => {
                const r = await addFirmMember(firmId, memberEmail.trim());
                if (r.status === 'no_account') {
                  // A different thing from failure: they must sign up first.
                  setError(`${r.email} has no account yet — ask them to sign up here first, then add them.`);
                }
                setMemberEmail('');
              })}>
              <Plus className="h-3.5 w-3.5" /> Add colleague
            </button>
          </div>
        )}
      </section>

      {/* ── WhatsApp ── */}
      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </h2>

        {!connected ? (
          <>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Connect <b>your own</b> WhatsApp Business account, so messages come from the number your
              clients already know. Meta must approve your message templates before you can start a
              conversation — that part is between you and Meta, and takes a few days.
            </p>

            <div className="mt-3 flex gap-1.5">
              {(['meta_direct', 'bsp'] as const).map((r) => (
                <button key={r} type="button" onClick={() => setRoute(r)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    route === r ? 'bg-[hsl(var(--jri-lavender)/0.13)] text-[hsl(var(--jri-lavender))]' : 'text-muted-foreground hover:text-foreground'
                  }`}>
                  {r === 'meta_direct' ? 'My own Meta account' : 'Through a provider'}
                </button>
              ))}
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <input className={input} placeholder="Name to show, e.g. Sharma & Co"
                value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} />
              <input className={input} placeholder="Your number, e.g. +919876543210"
                value={form.phoneE164} onChange={(e) => setForm({ ...form, phoneE164: e.target.value })} />
              {route === 'meta_direct' ? (
                <>
                  <input className={input} placeholder="Phone number ID (from Meta)"
                    value={form.phoneNumberId} onChange={(e) => setForm({ ...form, phoneNumberId: e.target.value })} />
                  <input className={input} placeholder="Business account ID (optional)"
                    value={form.businessAccountId} onChange={(e) => setForm({ ...form, businessAccountId: e.target.value })} />
                  <input className={`${input} sm:col-span-2`} type="password" placeholder="Access token"
                    value={form.accessToken} onChange={(e) => setForm({ ...form, accessToken: e.target.value })} />
                </>
              ) : (
                <>
                  <input className={input} placeholder="Provider, e.g. Twilio"
                    value={form.bspName} onChange={(e) => setForm({ ...form, bspName: e.target.value })} />
                  <input className={input} placeholder="Their reference for your account"
                    value={form.bspReference} onChange={(e) => setForm({ ...form, bspReference: e.target.value })} />
                </>
              )}
            </div>

            <p className="mt-2 flex items-start gap-1.5 text-[11px] leading-relaxed text-muted-foreground">
              <ShieldCheck className="mt-px h-3 w-3 shrink-0" />
              Your token is encrypted before it is stored and is never sent back to this screen — not
              even to you. If you lose it, disconnect and reconnect with a new one.
            </p>

            <button type="button" disabled={busy} className={`${btn} mt-3`}
              style={{ background: 'hsl(var(--jri-lavender))' }}
              onClick={() => void run(async () => {
                await connectWhatsApp({ provider: route, ...form });
                setForm({ displayName: '', phoneE164: '', phoneNumberId: '', businessAccountId: '', accessToken: '', bspName: '', bspReference: '' });
              })}>
              {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <MessageCircle className="h-3.5 w-3.5" />}
              Connect
            </button>
          </>
        ) : (
          <>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-3">
              <div>
                <p className="text-sm font-medium">
                  {connected.connection.display_name || connected.connection.phone_e164 || 'Connected'}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {connected.connection.provider === 'meta_direct' ? 'Your own Meta account' : 'Through a provider'}
                  {connected.connection.owned_by_firm ? ' · used by everyone in your firm' : ' · just you'}
                  {' · '}{connected.connection.status}
                </p>
                {connected.connection.last_error && (
                  <p className="mt-1 flex items-center gap-1 text-[11px]" style={{ color: 'hsl(var(--status-danger))' }}>
                    <AlertTriangle className="h-3 w-3" /> {connected.connection.last_error}
                  </p>
                )}
              </div>
              <button type="button" disabled={busy}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium"
                style={{ color: 'hsl(var(--status-danger))' }}
                onClick={() => void run(() => disconnectWhatsApp(connected.connection.id))}>
                <Trash2 className="h-3.5 w-3.5" /> Disconnect
              </button>
            </div>

            {/* Templates */}
            <div className="mt-4">
              <h3 className="text-xs font-semibold">Your approved templates</h3>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Meta approves these, not us. Add the name exactly as it appears in your Meta account,
                and say what you use it for so it can be picked automatically.
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                <input className={input} placeholder="Template name in Meta"
                  value={tpl.name} onChange={(e) => setTpl({ ...tpl, name: e.target.value })} />
                <select className={input} value={tpl.purpose}
                  onChange={(e) => setTpl({ ...tpl, purpose: e.target.value })}>
                  {PURPOSES.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
                </select>
                <button type="button" disabled={busy || !tpl.name.trim()} className={btn}
                  style={{ background: 'hsl(var(--status-ok))' }}
                  onClick={() => void run(async () => {
                    await saveWhatsAppTemplate(connected.connection.id, tpl.name.trim(), tpl.purpose, 'en', tpl.preview || null, true);
                    setTpl({ name: '', purpose: 'document_request', preview: '' });
                  })}>
                  <Plus className="h-3.5 w-3.5" /> Add
                </button>
              </div>
              {connected.templates.length === 0 ? (
                <p className="mt-2 text-[11px] text-muted-foreground">
                  None yet — without an approved template you cannot start a conversation.
                </p>
              ) : (
                <div className="mt-2 space-y-1">
                  {connected.templates.map((t) => (
                    <div key={t.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-1.5">
                      <span className="text-xs">{t.template_name}</span>
                      <span className="text-[10.5px] text-muted-foreground">
                        {PURPOSES.find((p) => p.id === t.purpose)?.label ?? t.purpose}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Consent */}
            <div className="mt-4 border-t border-border pt-3">
              <h3 className="text-xs font-semibold">Who you may message</h3>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Record consent before messaging anyone. Required by Meta and by India's messaging
                rules — and "they seemed fine with it" is not a defence.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <input className={`${input} max-w-[13rem]`} placeholder="+919876543210"
                  value={optin.phone} onChange={(e) => setOptin({ ...optin, phone: e.target.value })} />
                <input className={`${input} max-w-[13rem]`} placeholder="Their name"
                  value={optin.name} onChange={(e) => setOptin({ ...optin, name: e.target.value })} />
                <button type="button" disabled={busy || !optin.phone.trim()} className={btn}
                  style={{ background: 'hsl(var(--jri-cyan))' }}
                  onClick={() => void run(async () => {
                    await recordOptin(connected.connection.id, optin.phone.trim(), optin.name.trim() || null);
                    setOptin({ phone: '', name: '' });
                  })}>
                  <Plus className="h-3.5 w-3.5" /> Record consent
                </button>
              </div>
              {connected.optins.length > 0 && (
                <div className="mt-2 space-y-1">
                  {connected.optins.map((o) => (
                    <div key={o.phone_e164} className="flex items-center justify-between rounded-lg border border-border px-3 py-1.5">
                      <span className="text-xs">{o.display_name || o.phone_e164}</span>
                      <button type="button" disabled={busy || !o.active}
                        className="text-[10.5px] text-muted-foreground hover:text-foreground disabled:opacity-40"
                        onClick={() => void run(() => recordOptout(connected.connection.id, o.phone_e164))}>
                        {o.active ? 'Withdraw' : 'withdrawn'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {connected.recent.length > 0 && (
              <div className="mt-4 border-t border-border pt-3">
                <h3 className="text-xs font-semibold">Recent messages</h3>
                <div className="mt-2 space-y-1">
                  {connected.recent.slice(0, 6).map((m, i) => (
                    <p key={i} className="text-[11px] text-muted-foreground">
                      {m.phone_e164} · {m.status}{m.error ? ` — ${m.error}` : ''} · {whenExact(m.created_at)}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
