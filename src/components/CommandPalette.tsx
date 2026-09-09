import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building2, CornerDownLeft } from 'lucide-react';
import { myClients, type Client } from '../lib/api';

/**
 * Jump to a client by typing its name. ⌘K, or Ctrl+K.
 *
 * WHY. The app is six screens, which is fine at five clients and painful at fifty: reaching one
 * means Clients → scan a grid → click. A practice with a real book opens this many times an hour,
 * and a navigation you repeat that often should cost two keystrokes, not three decisions.
 *
 * The list is loaded ONCE when the palette first opens and then filtered in memory — a consultant's
 * book does not change between keystrokes, and a request per character would be slower than the
 * scrolling it replaces.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [clients, setClients] = useState<Client[] | null>(null);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // ⌘K / Ctrl+K to open, Escape to close. Bound on the window so it works from any screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Fetch once, on first open.
  useEffect(() => {
    if (!open || clients !== null) return;
    void myClients().then((rows) => setClients(rows ?? [])).catch(() => setClients([]));
  }, [open, clients]);

  useEffect(() => {
    if (open) { setQuery(''); setActive(0); inputRef.current?.focus(); }
  }, [open]);

  const results = useMemo(() => {
    const list = clients ?? [];
    const q = query.trim().toLowerCase();
    if (!q) return list.slice(0, 8);
    return list
      .filter((c) =>
        c.workplace_name.toLowerCase().includes(q) ||
        (c.gstin ?? '').toLowerCase().includes(q) ||
        (c.entity_type ?? '').toLowerCase().includes(q))
      .slice(0, 8);
  }, [clients, query]);

  if (!open) return null;

  const go = (c: Client) => { setOpen(false); navigate(`/client/${c.workplace_id}`); };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center gap-2 border-b border-border px-3.5">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => Math.min(i + 1, results.length - 1)); }
              if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
              if (e.key === 'Enter' && results[active]) { e.preventDefault(); go(results[active]); }
            }}
            placeholder="Go to a client…"
            className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">esc</kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-1.5">
          {clients === null ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">Loading your clients…</p>
          ) : results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              {query ? `Nothing matches “${query}”.` : 'No clients yet.'}
            </p>
          ) : (
            results.map((c, i) => (
              <button
                key={c.link_id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => go(c)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition ${
                  i === active ? 'bg-accent/20' : ''
                }`}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: 'hsl(var(--jri-cyan) / 0.13)', color: 'hsl(var(--jri-cyan))' }}
                >
                  <Building2 className="h-3.5 w-3.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{c.workplace_name}</span>
                  <span className="block truncate text-[11px] text-muted-foreground">
                    {[c.entity_type, c.gstin].filter(Boolean).join(' · ') || 'No entity details shared'}
                  </span>
                </span>
                {i === active && <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
