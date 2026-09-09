import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Check, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Badge } from './ui';

/**
 * What arrived while you were away.
 *
 * WHY THIS EXISTS. The weekly digest and the overdue-document chase both write to `notifications`,
 * and until now this app had nowhere to show one — so a digest reached a consultant only if they
 * had email switched on for that type. A notification nobody can see is a notification that did not
 * happen, and it would have made the automation look broken rather than unheard.
 *
 * NO NEW BACKEND WAS NEEDED. `notifications` RLS is `profile_id = auth.uid()`, so a consultant
 * already reads exactly their own rows and nobody else's. The business app's bell is a much larger
 * component because it serves six notification streams; this one serves the consultant's own row
 * and deliberately stays small.
 *
 * REALTIME, not polling: the same `postgres_changes` subscription the business app uses. An
 * accountant leaves this tab open all day, and a poll would be the wrong trade for a page that is
 * mostly idle.
 */

type Notification = {
  id: string;
  type: string;
  title: string;
  /** The sentence that actually says what happened. NOT NULL in the schema — the title alone is a
   *  label, and a bell that shows only labels tells a consultant nothing they can act on. */
  content: string;
  link: string | null;
  read: boolean;
  created_at: string;
};

function ago(iso: string): string {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return days === 1 ? 'yesterday' : `${days}d ago`;
}

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const load = useCallback(async () => {
    const { data } = await supabase
      .from('notifications')
      .select('id, type, title, content, link, read, created_at')
      .order('created_at', { ascending: false })
      .limit(20);
    setItems((data ?? []) as Notification[]);
    setLoading(false);
  }, []);

  useEffect(() => { void load(); }, [load]);

  // A new row for this consultant arrives while the tab sits open.
  useEffect(() => {
    const channel = supabase
      .channel('consultant-notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, () => void load())
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [load]);

  // Close on an outside click. A panel that traps you is worse than no panel.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const unread = items.filter((n) => !n.read).length;

  const markAllRead = async () => {
    const ids = items.filter((n) => !n.read).map((n) => n.id);
    if (ids.length === 0) return;
    setMarking(true);
    // Optimistic: the only failure mode is a badge that comes back on the next load.
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    await supabase.from('notifications').update({ read: true }).in('id', ids);
    setMarking(false);
  };

  const openItem = async (n: Notification) => {
    if (!n.read) {
      setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
      await supabase.from('notifications').update({ read: true }).eq('id', n.id);
    }
    setOpen(false);
    // Links are written by the business app and may point at surfaces that do not exist here.
    // Follow only in-app paths; anything else just marks read.
    if (n.link && n.link.startsWith('/')) navigate(n.link);
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={unread ? `${unread} unread notifications` : 'Notifications'}
        className="relative inline-flex items-center rounded-lg px-2 py-1.5 text-muted-foreground transition hover:text-foreground"
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span
            className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9.5px] font-bold text-white"
            style={{ background: 'hsl(var(--status-danger))' }}
          >
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-2 w-80 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5">
            <span className="text-xs font-semibold">Notifications</span>
            {unread > 0 && (
              <button
                type="button"
                onClick={() => void markAllRead()}
                disabled={marking}
                className="inline-flex items-center gap-1 text-[11px] text-muted-foreground transition hover:text-foreground disabled:opacity-50"
              >
                {marking ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <p className="px-3.5 py-8 text-center text-xs text-muted-foreground">Loading…</p>
            ) : items.length === 0 ? (
              <p className="px-3.5 py-8 text-center text-xs text-muted-foreground">
                Nothing yet. Your weekly summary and anything a client sends will appear here.
              </p>
            ) : (
              items.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => void openItem(n)}
                  className={`flex w-full items-start gap-2.5 border-b border-border px-3.5 py-2.5 text-left transition last:border-b-0 hover:bg-accent/15 ${
                    n.read ? '' : 'bg-accent/10'
                  }`}
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: n.read ? 'transparent' : 'hsl(var(--jri-lavender))' }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className={`block text-xs ${n.read ? 'text-muted-foreground' : 'font-medium'}`}>
                      {n.title}
                    </span>
                    {n.content && (
                      <span className="mt-0.5 block text-[11px] leading-relaxed text-muted-foreground">
                        {n.content}
                      </span>
                    )}
                    <span className="mt-1 flex items-center gap-1.5">
                      <Badge tone={n.read ? 'neutral' : 'accent'}>{ago(n.created_at)}</Badge>
                    </span>
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
