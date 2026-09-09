import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, FileQuestion, MessageSquare, ShieldCheck, Inbox, Send, X, Loader2 } from 'lucide-react';
import { myWork, postMessage, cancelDocumentRequest, type WorkItem } from '../lib/api';
import { Empty, Spinner } from '../components/Shell';
import { when } from '../lib/format';

/**
 * The landing screen: one queue across the WHOLE book, sorted by what is due first.
 *
 * A consultant's real question is never "what is due for this client" — it is "what is due at all".
 * No per-client screen can answer that, which is why this exists and why it is the home page rather
 * than the client list.
 *
 * EVERY ROW NOW CARRIES ITS OWN ACTION. It used to be a list of links: each item cost a navigation
 * to the client screen, a hunt for the right thread, and a navigation back. At five clients that is
 * tedious; at fifty it is the reason the app gets closed. A reply and a withdrawn document request
 * are the two things done most here and both are a single call, so both happen in place.
 *
 * A statutory deadline deliberately has NO inline action. Recording a filing means an
 * acknowledgement reference and usually evidence; squeezing that into a list row would produce bad
 * records faster than it saved time. Those still open the client.
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
  /** Which row has its reply box open, keyed exactly as the list is. */
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState('');
  const [busy, setBusy] = useState<string | null>(null);

  const load = () =>
    myWork()
      .then((r) => setItems(r ?? []))
      .catch((e) => setError(e instanceof Error ? e.message : 'Could not load your work.'))
      .finally(() => setLoading(false));

  useEffect(() => { void load(); }, []);

  const rowKey = (it: WorkItem) => `${it.kind}-${it.ref_id}`;

  const sendReply = async (it: WorkItem) => {
    const body = replyBody.trim();
    if (!body) return;
    setBusy(rowKey(it));
    setError(null);
    try {
      await postMessage(it.ref_id, body);
      setReplyBody('');
      setReplyingTo(null);
      await load();   // once you have answered, the item is no longer waiting on you
    } catch (e) {
      setError(e instanceof Error ? e.message : 'That reply did not send.');
    } finally {
      setBusy(null);
    }
  };

  const cancelRequest = async (it: WorkItem) => {
    setBusy(rowKey(it));
    setError(null);
    try {
      await cancelDocumentRequest(it.ref_id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'That request could not be withdrawn.');
    } finally {
      setBusy(null);
    }
  };

  if (loading) return <Spinner label="Gathering your week…" />;

  // An error with nothing loaded is the whole screen; an error after a failed action is a strip
  // above a list that still works.
  if (error && items.length === 0) {
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

      {error && items.length > 0 && (
        <p className="mt-4 rounded-xl px-4 py-3 text-sm"
           style={{ background: 'hsl(var(--status-danger) / 0.1)', color: 'hsl(var(--status-danger))' }}>{error}</p>
      )}

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
            const key = rowKey(it);
            const working = busy === key;
            return (
              <div key={key} className="rounded-xl border border-border bg-card transition hover:border-[hsl(var(--jri-lavender)/0.5)]">
                <div className="flex items-start gap-3 p-3.5">
                  <span
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `hsl(var(${meta.tint}) / 0.12)`, color: `hsl(var(${meta.tint}))` }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <Link to={`/client/${it.workplace_id}`} className="block">
                      <p className="truncate text-sm font-medium">{it.title}</p>
                      <p className="mt-0.5 truncate text-[11.5px] text-muted-foreground">
                        {it.workplace_name} · {meta.label}
                        {it.detail ? ` · ${it.detail}` : ''}
                      </p>
                    </Link>

                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      {it.kind === 'message' && (
                        <button
                          type="button"
                          disabled={working}
                          onClick={() => { setReplyingTo(replyingTo === key ? null : key); setReplyBody(''); }}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2 py-1 text-[11.5px] transition hover:bg-accent/15 disabled:opacity-50"
                        >
                          <Send className="h-3 w-3" /> {replyingTo === key ? 'Close' : 'Reply'}
                        </button>
                      )}
                      {it.kind === 'document_request' && (
                        <button
                          type="button"
                          disabled={working}
                          onClick={() => void cancelRequest(it)}
                          title="Withdraw this request — you no longer need the document"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2 py-1 text-[11.5px] transition hover:bg-accent/15 disabled:opacity-50"
                        >
                          {working ? <Loader2 className="h-3 w-3 animate-spin" /> : <X className="h-3 w-3" />}
                          No longer needed
                        </button>
                      )}
                      <Link
                        to={`/client/${it.workplace_id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11.5px] text-muted-foreground transition hover:text-foreground"
                      >
                        Open {it.workplace_name}
                      </Link>
                    </div>

                    {replyingTo === key && (
                      <div className="mt-2 flex items-start gap-1.5">
                        <textarea
                          autoFocus
                          rows={2}
                          value={replyBody}
                          onChange={(e) => setReplyBody(e.target.value)}
                          placeholder={`Reply to ${it.workplace_name}…`}
                          className="min-w-0 flex-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs outline-none transition focus:border-[hsl(var(--jri-lavender))]"
                        />
                        <button
                          type="button"
                          disabled={working || !replyBody.trim()}
                          onClick={() => void sendReply(it)}
                          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-white transition disabled:opacity-50"
                          style={{ background: 'hsl(var(--jri-lavender))' }}
                        >
                          {working ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                          Send
                        </button>
                      </div>
                    )}
                  </div>

                  <span
                    className="shrink-0 whitespace-nowrap rounded px-1.5 py-0.5 text-[10.5px] font-semibold"
                    style={{ background: `hsl(var(${tone.tint}) / 0.13)`, color: `hsl(var(${tone.tint}))` }}
                  >
                    <CalendarClock className="mr-1 inline h-3 w-3" />{tone.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
