import { useState } from 'react';
import { FileQuestion, MessageSquare, ShieldCheck, Plus, Send, Check, X } from 'lucide-react';
import {
  requestDocument, cancelDocumentRequest, startThread, postMessage, recordFiling,
  type ClientActivity,
} from '../lib/api';
import { when, whenExact } from '../lib/format';

/**
 * The three things a consultant does between reports: chase a document, ask a question, and record
 * that something was filed.
 *
 * Each write goes through an RPC that re-checks the relationship, so nothing here is trusted — this
 * component only decides what to show.
 */
type Tab = 'requests' | 'messages' | 'filings';

export function Collaboration({
  activity, onChanged,
}: { activity: ClientActivity; onChanged: () => void }) {
  const [tab, setTab] = useState<Tab>('requests');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [reqTitle, setReqTitle] = useState('');
  const [reqNote, setReqNote] = useState('');
  const [reqDue, setReqDue] = useState('');

  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [openThread, setOpenThread] = useState<string | null>(null);
  const [reply, setReply] = useState('');

  const [filTitle, setFilTitle] = useState('');
  const [filPeriod, setFilPeriod] = useState('');
  const [filAck, setFilAck] = useState('');

  const run = async (fn: () => Promise<unknown>) => {
    setBusy(true); setError(null);
    try { await fn(); onChanged(); }
    catch (e) { setError(e instanceof Error ? e.message : 'That did not work.'); }
    finally { setBusy(false); }
  };

  const openRequests = activity.requests.filter((r) => r.status === 'open');
  const tabs: { id: Tab; label: string; icon: typeof FileQuestion; count: number }[] = [
    { id: 'requests', label: 'Documents', icon: FileQuestion, count: openRequests.length },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: activity.threads.filter((t) => !t.closed).length },
    { id: 'filings', label: 'Filed', icon: ShieldCheck, count: activity.filings.length },
  ];

  const input = 'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-[hsl(var(--jri-lavender))]';
  const primary = 'inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-50';

  return (
    <div className="rounded-2xl border border-border bg-card">
      <div className="flex items-center gap-1 border-b border-border px-2 py-1.5">
        {tabs.map((t) => (
          <button
            key={t.id} type="button" onClick={() => setTab(t.id)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              tab === t.id ? 'bg-[hsl(var(--jri-lavender)/0.13)] text-[hsl(var(--jri-lavender))]' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <t.icon className="h-3.5 w-3.5" /> {t.label}
            {t.count > 0 && <span className="rounded bg-[hsl(var(--muted))] px-1 text-[10px]">{t.count}</span>}
          </button>
        ))}
      </div>

      {error && (
        <p className="mx-3 mt-3 rounded-lg px-3 py-2 text-xs"
           style={{ background: 'hsl(var(--status-danger) / 0.1)', color: 'hsl(var(--status-danger))' }}>{error}</p>
      )}

      <div className="p-3.5">
        {tab === 'requests' && (
          <div className="space-y-3">
            <div className="rounded-xl border border-border p-3">
              <p className="text-xs font-semibold">Ask for a document</p>
              <div className="mt-2 space-y-2">
                <input className={input} placeholder="What do you need? e.g. April bank statement"
                  value={reqTitle} onChange={(e) => setReqTitle(e.target.value)} />
                <input className={input} placeholder="Any detail (optional)"
                  value={reqNote} onChange={(e) => setReqNote(e.target.value)} />
                <div className="flex gap-2">
                  <input className={input} type="date" value={reqDue} onChange={(e) => setReqDue(e.target.value)} />
                  <button type="button" disabled={busy || !reqTitle.trim()} className={primary}
                    style={{ background: 'hsl(var(--jri-lavender))' }}
                    onClick={() => void run(async () => {
                      await requestDocument(activity.link_id, reqTitle.trim(), reqNote.trim() || null, reqDue || null);
                      setReqTitle(''); setReqNote(''); setReqDue('');
                    })}>
                    <Plus className="h-3.5 w-3.5" /> Ask
                  </button>
                </div>
              </div>
            </div>

            {activity.requests.length === 0 ? (
              <p className="py-6 text-center text-xs text-muted-foreground">
                Nothing requested yet. What you ask for appears on their side with a link to upload it.
              </p>
            ) : activity.requests.map((r) => (
              <div key={r.id} className="flex items-start justify-between gap-3 rounded-xl border border-border p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{r.title}</p>
                  {r.note && <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{r.note}</p>}
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {r.status === 'fulfilled'
                      ? `Received ${when(r.fulfilled_at)}`
                      : r.status === 'cancelled' ? 'Cancelled'
                      : r.due_date ? `Needed by ${when(r.due_date)}` : 'No date set'}
                  </p>
                </div>
                {r.status === 'open' ? (
                  <button type="button" title="Cancel this request" disabled={busy}
                    className="shrink-0 rounded-lg border border-border p-1.5 text-muted-foreground hover:text-foreground"
                    onClick={() => void run(() => cancelDocumentRequest(r.id))}>
                    <X className="h-3.5 w-3.5" />
                  </button>
                ) : r.status === 'fulfilled' ? (
                  <Check className="mt-1 h-4 w-4 shrink-0" style={{ color: 'hsl(var(--status-ok))' }} />
                ) : null}
              </div>
            ))}
          </div>
        )}

        {tab === 'messages' && (
          <div className="space-y-3">
            <div className="rounded-xl border border-border p-3">
              <p className="text-xs font-semibold">Start a conversation</p>
              <div className="mt-2 space-y-2">
                <input className={input} placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                <textarea className={input} rows={2} placeholder="Your question"
                  value={body} onChange={(e) => setBody(e.target.value)} />
                <button type="button" disabled={busy || !subject.trim() || !body.trim()} className={primary}
                  style={{ background: 'hsl(var(--jri-lavender))' }}
                  onClick={() => void run(async () => {
                    await startThread(activity.link_id, subject.trim(), body.trim());
                    setSubject(''); setBody('');
                  })}>
                  <Send className="h-3.5 w-3.5" /> Send
                </button>
              </div>
            </div>

            {activity.threads.length === 0 ? (
              <p className="py-6 text-center text-xs text-muted-foreground">
                No conversations yet. Questions stay attached to the client, so next year's query sits
                under last year's answer.
              </p>
            ) : activity.threads.map((t) => (
              <div key={t.id} className="rounded-xl border border-border p-3">
                <button type="button" className="flex w-full items-start justify-between gap-3 text-left"
                  onClick={() => setOpenThread(openThread === t.id ? null : t.id)}>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{t.subject}</span>
                    <span className="block text-[11px] text-muted-foreground">
                      {t.messages.length} message{t.messages.length === 1 ? '' : 's'} · {whenExact(t.last_message_at)}
                    </span>
                  </span>
                </button>
                {openThread === t.id && (
                  <div className="mt-3 border-t border-border pt-3">
                    {/* A conversation, not a log. Mine sit right and solid; theirs sit left and
                        quiet, so who said what is answered by position and weight before anyone
                        reads a label. */}
                    <div className="space-y-2.5">
                      {t.messages.map((m) => (
                        <div key={m.id} className={`flex ${m.mine ? 'justify-end' : 'justify-start'}`}>
                          <div className="max-w-[85%]">
                            <div
                              className={`rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${
                                m.mine ? 'rounded-br-sm text-white' : 'rounded-bl-sm text-foreground'
                              }`}
                              style={{
                                background: m.mine ? 'hsl(var(--jri-lavender))' : 'hsl(var(--muted))',
                              }}
                            >
                              <p className="whitespace-pre-wrap break-words">{m.body}</p>
                            </div>
                            <p className={`mt-1 text-[10px] text-muted-foreground ${m.mine ? 'text-right' : ''}`}>
                              {m.mine ? 'You' : m.author || 'Them'} · {whenExact(m.created_at)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* A textarea, not an input: an accountant's reply is a paragraph more often
                        than it is a sentence, and a one-line box quietly discourages the longer
                        answer that is usually the useful one. */}
                    <div className="mt-3 flex items-end gap-2">
                      <textarea
                        className={`${input} min-h-[38px] resize-y`}
                        rows={2}
                        placeholder="Write a reply…  (⌘/Ctrl + Enter to send)"
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        onKeyDown={(e) => {
                          if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && reply.trim() && !busy) {
                            e.preventDefault();
                            void run(async () => { await postMessage(t.id, reply.trim()); setReply(''); });
                          }
                        }}
                      />
                      <button type="button" disabled={busy || !reply.trim()} className={primary}
                        style={{ background: 'hsl(var(--jri-lavender))' }}
                        onClick={() => void run(async () => { await postMessage(t.id, reply.trim()); setReply(''); })}>
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'filings' && (
          <div className="space-y-3">
            <div className="rounded-xl border border-border p-3">
              <p className="text-xs font-semibold">Record a filing</p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                The client sees this, so they know it is done and what the acknowledgement was.
              </p>
              <div className="mt-2 space-y-2">
                <input className={input} placeholder="What was filed? e.g. GSTR-3B"
                  value={filTitle} onChange={(e) => setFilTitle(e.target.value)} />
                <div className="flex gap-2">
                  <input className={input} placeholder="Period e.g. Aug 2026"
                    value={filPeriod} onChange={(e) => setFilPeriod(e.target.value)} />
                  <input className={input} placeholder="Acknowledgement no."
                    value={filAck} onChange={(e) => setFilAck(e.target.value)} />
                </div>
                <button type="button" disabled={busy || !filTitle.trim()} className={primary}
                  style={{ background: 'hsl(var(--status-ok))' }}
                  onClick={() => void run(async () => {
                    await recordFiling(activity.link_id, filTitle.trim(), filPeriod.trim() || null, filAck.trim() || null, null);
                    setFilTitle(''); setFilPeriod(''); setFilAck('');
                  })}>
                  <ShieldCheck className="h-3.5 w-3.5" /> Record
                </button>
              </div>
            </div>

            {activity.filings.length === 0 ? (
              <p className="py-6 text-center text-xs text-muted-foreground">Nothing recorded as filed yet.</p>
            ) : activity.filings.map((f) => (
              <div key={f.id} className="rounded-xl border border-border p-3">
                <p className="text-sm font-medium">{f.title}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {[f.period_label, f.acknowledgement_ref && `ack ${f.acknowledgement_ref}`, whenExact(f.filed_at)]
                    .filter(Boolean).join(' · ')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
