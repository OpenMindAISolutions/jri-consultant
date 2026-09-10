import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Inbox as InboxIcon, Send, Link2, Loader2 } from 'lucide-react';
import {
  inbox, thread as loadThread, markThreadRead, replyToThread, linkThreadClient,
  type InboxThread, type ThreadDetail,
} from '../lib/inbox';
import { myManagedClients, type ManagedClient } from '../lib/funnel';
import { prettyPhone } from '../lib/promo';
import { Empty, Spinner } from '../components/Shell';
import { Badge, Button, Notice, PageTitle, Section, fieldClass } from '../components/ui';
import { whenExact } from '../lib/format';

/**
 * The WhatsApp conversations.
 *
 * ★ THE WHOLE SCREEN TURNS ON ONE RULE. Meta allows a free-text reply for 24 hours after the
 * client's last message; after that only a template Meta approved in advance may be sent. So the
 * composer is not a text box that sometimes fails — when the window is closed there IS no text box,
 * because offering one would promise a reply the API will refuse.
 *
 * The window state comes from the server on every thread and every list row. This file never
 * computes it from a timestamp: a clock difference of a few minutes between browser and database
 * is exactly how a consultant ends up staring at a box that will not send.
 *
 * NOTHING HERE HAS EVER CARRIED A REAL MESSAGE. No Meta account is connected, so every conversation
 * below is empty by definition. The screen is built and proven against the database; it has not
 * been proven against a person.
 */

function WindowBadge({ open, minutes }: { open: boolean; minutes: number }) {
  if (!open) return <Badge tone="neutral">reply window closed</Badge>;
  if (minutes < 60) return <Badge tone="danger">{minutes}m left to reply</Badge>;
  const h = Math.floor(minutes / 60);
  return <Badge tone={h < 6 ? 'warn' : 'ok'}>{h}h left to reply</Badge>;
}

export default function Inbox() {
  const [threads, setThreads] = useState<InboxThread[]>([]);
  const [clients, setClients] = useState<ManagedClient[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [detail, setDetail] = useState<ThreadDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const bottom = useRef<HTMLDivElement>(null);

  const refresh = useCallback(async () => {
    try {
      setThreads(await inbox());
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load your conversations.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);
  useEffect(() => {
    void myManagedClients().then(setClients).catch(() => { /* the link control just stays empty */ });
  }, []);

  const open = useCallback(async (id: string) => {
    setOpenId(id);
    setDetail(null);
    try {
      const d = await loadThread(id);
      setDetail(d);
      // Reading it is what marks it read — there is no separate button, because a consultant who
      // has the conversation on screen has read it.
      await markThreadRead(id).catch(() => { /* a stuck badge is not worth an error strip */ });
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not open that conversation.');
    }
  }, [refresh]);

  useEffect(() => {
    bottom.current?.scrollIntoView({ block: 'end' });
  }, [detail]);

  const send = async () => {
    if (!openId || !draft.trim()) return;
    setBusy(true);
    setError(null);
    try {
      await replyToThread(openId, draft.trim());
      setDraft('');
      await open(openId);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'That reply did not go.');
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <Spinner label="Opening your conversations…" />;

  return (
    <div>
      <PageTitle
        title="Conversations"
        subtitle="WhatsApp with the businesses you look after. Replies are free for 24 hours after they write to you; after that only an approved template can go."
      />

      {error && <Notice className="mb-4">{error}</Notice>}

      {threads.length === 0 ? (
        <Empty
          icon={<InboxIcon className="h-5 w-5" />}
          title="No conversations yet"
          line="When a client replies to one of your messages on WhatsApp, the conversation appears here. Connect your WhatsApp account in Settings first — until then nothing can arrive."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-5">
          {/* ── The list ─────────────────────────────────────────────── */}
          <Section className="lg:col-span-2" title="Threads" icon={<InboxIcon className="h-4 w-4" />}>
            <ul className="divide-y divide-border">
              {threads.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => void open(t.id)}
                    className={`w-full py-3 text-left transition ${openId === t.id ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="min-w-0 truncate text-sm font-medium">
                        {t.client_name || t.display_name || prettyPhone(t.phone_e164)}
                      </span>
                      {t.unread_count > 0 && <Badge tone="danger">{t.unread_count}</Badge>}
                    </div>
                    <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                      {t.last_message?.direction === 'out' ? 'You: ' : ''}
                      {t.last_message?.snippet || 'No messages yet'}
                    </p>
                    <span className="mt-1.5 inline-block">
                      <WindowBadge open={t.window.open} minutes={t.window.minutes_left} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Section>

          {/* ── The conversation ─────────────────────────────────────── */}
          <Section
            className="lg:col-span-3"
            title={detail ? (detail.thread.client_name || prettyPhone(detail.thread.phone_e164)) : 'Pick a conversation'}
            icon={<Send className="h-4 w-4" />}
            actions={detail ? <WindowBadge open={detail.window.open} minutes={detail.window.minutes_left} /> : undefined}
          >
            {!openId ? (
              <p className="py-10 text-center text-sm text-muted-foreground">
                Choose a thread on the left.
              </p>
            ) : !detail ? (
              <Spinner label="Loading…" />
            ) : (
              <>
                {/* Attach the number to a client, so the rest of the app knows who this is. */}
                {!detail.thread.client_id && clients.length > 0 && (
                  <div className="mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-border p-2.5">
                    <Link2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-[11px] text-muted-foreground">Whose number is this?</span>
                    <select
                      className={fieldClass} style={{ width: 'auto' }}
                      defaultValue=""
                      onChange={(e) => {
                        if (!e.target.value) return;
                        void linkThreadClient(detail.thread.id, e.target.value)
                          .then(() => open(detail.thread.id))
                          .catch((err) => setError(err instanceof Error ? err.message : 'Could not link that.'));
                      }}
                    >
                      <option value="">Choose a client…</option>
                      {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                )}

                <div className="max-h-[420px] space-y-2.5 overflow-y-auto pr-1">
                  {detail.entries.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">Nothing in this conversation yet.</p>
                  ) : detail.entries.map((e) => (
                    <div key={e.key} className={`flex ${e.direction === 'out' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className="max-w-[80%] rounded-2xl px-3.5 py-2.5"
                        style={e.direction === 'out'
                          ? { background: 'hsl(var(--jri-lavender) / 0.14)' }
                          : { background: 'hsl(var(--muted))' }}
                      >
                        <p className="whitespace-pre-wrap text-[13px] leading-relaxed">
                          {e.body || e.snippet || <span className="italic text-muted-foreground">{e.message_type}</span>}
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                          <Clock className="h-2.5 w-2.5" />
                          {whenExact(e.at)}
                          {e.direction === 'out' && e.status && <span>· {e.status}</span>}
                          {e.direction === 'out' && e.template && <span>· template</span>}
                        </p>
                        {e.error && (
                          <p className="mt-1 text-[10px]" style={{ color: 'hsl(var(--status-danger))' }}>{e.error}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={bottom} />
                </div>

                {/* THE COMPOSER, OR THE REASON THERE ISN'T ONE. */}
                <div className="mt-4 border-t border-border pt-4">
                  {detail.window.open ? (
                    <>
                      <textarea
                        className={`${fieldClass} min-h-[76px] resize-y`}
                        value={draft}
                        placeholder="Reply… (⌘/Ctrl + Enter to send)"
                        onChange={(ev) => setDraft(ev.target.value)}
                        onKeyDown={(ev) => {
                          if ((ev.metaKey || ev.ctrlKey) && ev.key === 'Enter') void send();
                        }}
                      />
                      <div className="mt-2 flex items-center gap-2">
                        <Button tone="primary" busy={busy} disabled={!draft.trim()}
                                icon={<Send className="h-3.5 w-3.5" />} onClick={() => void send()}>
                          Send
                        </Button>
                        {busy && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />}
                      </div>
                    </>
                  ) : (
                    <div className="rounded-xl border border-border p-3.5">
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        More than 24 hours have passed since they last wrote, so WhatsApp will not
                        carry a free-text reply. You can still send one of your approved templates —
                        open the client and use a reminder, a document request or a payment request.
                      </p>
                      {detail.thread.client_id && (
                        <Link
                          to={`/managed/${detail.thread.client_id}`}
                          className="mt-2.5 inline-block text-[11.5px] font-semibold"
                          style={{ color: 'hsl(var(--jri-lavender))' }}
                        >
                          Open {detail.thread.client_name} →
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </Section>
        </div>
      )}
    </div>
  );
}
