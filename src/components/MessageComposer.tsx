import { useState } from 'react';
import { MessageCircle, Sparkles, Loader2 } from 'lucide-react';
import { draftMessage, type DraftIntent } from '../lib/ai';
import { waLink, withPromo, PROMO_LINE } from '../lib/promo';
import { Badge, Button, Notice, Section, fieldClass } from './ui';

/**
 * Write a message to an off-platform client — by hand, or with the AI writing the first version.
 *
 * WHY DRAFTING RATHER THAN SENDING. The model is told it may restate only the facts it is handed,
 * and this screen is where that instruction gets checked by somebody who can tell. Every draft
 * lands in an editable box and nothing leaves until the consultant presses send. This platform has
 * already been burned by generated compliance dates that looked right and were not; a human reading
 * the sentence before it goes to their own client is the safeguard that actually holds.
 *
 * THE PROMOTIONAL LINE IS APPENDED HERE, NOT BY THE MODEL. `withPromo` is idempotent, so drafting,
 * editing and re-drafting can never stack two copies — and because the model never sees it, it
 * cannot paraphrase it into something we did not write.
 *
 * HINDI IS NOT A TOGGLE ON A TRANSLATION. The server carries the brand's register rules — spoken
 * Hindustani, courteous -इए imperatives, statutory terms left in English — because a model left to
 * itself writes textbook Hindi that no shopkeeper in Surat says out loud.
 */

const INTENTS: { id: DraftIntent; label: string; hint: string }[] = [
  { id: 'reminder', label: 'A deadline', hint: 'Chase what is due' },
  { id: 'document', label: 'A document', hint: 'Ask them to send something' },
  { id: 'payment', label: 'Payment', hint: 'Ask to be paid' },
  { id: 'custom', label: 'Something else', hint: 'Say what you need' },
];

export function MessageComposer({
  clientId, clientName, phone,
}: {
  clientId: string;
  clientName: string;
  phone: string | null;
}) {
  const [intent, setIntent] = useState<DraftIntent>('reminder');
  const [note, setNote] = useState('');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const write = async () => {
    setBusy(true);
    setError(null);
    try {
      setText(await draftMessage({ clientId, intent, note: note.trim() || null, language }));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'The draft could not be written.');
    } finally {
      setBusy(false);
    }
  };

  // What actually goes out: the edited text plus the one promotional line, exactly once.
  const outgoing = text.trim() ? withPromo(text) : '';
  const link = outgoing ? waLink(phone, outgoing) : null;

  return (
    <Section
      title="Write a message"
      subtitle="The AI writes a first version from what this app already knows. You edit it, then you send it."
      icon={<Sparkles className="h-4 w-4" />}
      actions={
        <div className="flex items-center gap-1">
          {(['en', 'hi'] as const).map((l) => (
            <button
              key={l} type="button" onClick={() => setLanguage(l)}
              className="rounded-lg px-2 py-1 text-[11px] font-semibold transition"
              style={language === l
                ? { background: 'hsl(var(--jri-lavender))', color: 'white' }
                : { color: 'hsl(var(--muted-foreground))' }}
            >
              {l === 'en' ? 'English' : 'हिंदी'}
            </button>
          ))}
        </div>
      }
    >
      {error && <Notice className="mb-3">{error}</Notice>}

      <div className="flex flex-wrap gap-1.5">
        {INTENTS.map((i) => (
          <button
            key={i.id} type="button" onClick={() => setIntent(i.id)} title={i.hint}
            className="rounded-lg border px-2.5 py-1.5 text-[11.5px] font-semibold transition"
            style={intent === i.id
              ? { borderColor: 'hsl(var(--jri-lavender))', color: 'hsl(var(--jri-lavender))' }
              : { borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}
          >
            {i.label}
          </button>
        ))}
      </div>

      <input
        className={`${fieldClass} mt-3`}
        value={note}
        placeholder={intent === 'document' ? 'last month’s bank statement' : 'Anything to add (optional)'}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button tone="primary" busy={busy} icon={<Sparkles className="h-3.5 w-3.5" />} onClick={() => void write()}>
          {text ? 'Rewrite it' : 'Write it for me'}
        </Button>
        {busy && (
          <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin" /> reading this client’s file…
          </span>
        )}
      </div>

      <label className="mt-4 block">
        <span className="mb-1 block text-[11.5px] font-medium text-muted-foreground">
          The message — edit it freely
        </span>
        <textarea
          className={`${fieldClass} min-h-[130px] resize-y`}
          value={text}
          placeholder="Write it yourself, or let the AI start it."
          onChange={(e) => setText(e.target.value)}
        />
      </label>

      {text.trim() && (
        <p className="mt-2 rounded-xl bg-accent/10 px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
          <Badge tone="accent">added automatically</Badge>{' '}
          {PROMO_LINE}
        </p>
      )}

      <div className="mt-4">
        {link ? (
          <a
            href={link} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold text-white transition hover:opacity-90"
            style={{ background: 'hsl(var(--jri-lavender))' }}
          >
            <MessageCircle className="h-3.5 w-3.5" /> Send to {clientName} on WhatsApp
          </a>
        ) : (
          <p className="text-[11px] text-muted-foreground">
            {phone ? 'Write or draft a message and the send button appears.'
                   : 'Add a WhatsApp number to this client first.'}
          </p>
        )}
      </div>
    </Section>
  );
}
