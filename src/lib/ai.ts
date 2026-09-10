import { supabase } from './supabase';

/**
 * Drafting help, on the consultant's own data.
 *
 * WHAT THE SERVER GUARANTEES, so this file does not have to. `consultant-ai` never uses a
 * service-role key — it builds its database client from the CALLER'S token, so every fact it reads
 * passes the same checks the browser does. Asking it to draft for a client you do not hold does not
 * return a filtered answer; the underlying function raises and the request dies before a prompt
 * exists. That is why nothing here needs to pre-authorise anything.
 *
 * WHAT IT DELIBERATELY DOES NOT RETURN: the promotional line. `withPromo()` owns that and applies
 * it once, at the point of sending. If the draft arrived with it attached, editing and re-drafting
 * would stack copies — the exact bug withPromo's idempotency exists to prevent.
 *
 * THE DRAFT IS ALWAYS SHOWN BEFORE IT SENDS. Not a nicety: the model is told it may restate only
 * the facts it is given, and a consultant reading the message is the check on that. Nothing here
 * sends anything.
 */

export type DraftIntent = 'reminder' | 'document' | 'payment' | 'custom';

async function callAi<T>(body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke('consultant-ai', { body });
  if (error) {
    // The function answers 429 for a spent daily allowance and 502 when the model itself failed,
    // and both carry a sentence worth showing. invoke() hides the body on a non-2xx, so dig it out.
    const ctx = (error as { context?: Response }).context;
    if (ctx && typeof ctx.json === 'function') {
      try {
        const payload = await ctx.json();
        if (payload?.error) throw new Error(payload.error);
      } catch (inner) {
        if (inner instanceof Error && inner.message) throw inner;
      }
    }
    throw new Error(error.message || 'The draft could not be written.');
  }
  const payload = data as { ok?: boolean; error?: string } & T;
  if (payload && payload.ok === false) throw new Error(payload.error || 'The draft could not be written.');
  return payload as T;
}

/** A WhatsApp message for one off-platform client, written from what the app already knows. */
export const draftMessage = (p: {
  clientId: string;
  intent: DraftIntent;
  note?: string | null;
  language?: 'en' | 'hi';
}) => callAi<{ text: string }>({
  action: 'draft_message',
  clientId: p.clientId,
  intent: p.intent,
  note: p.note ?? null,
  language: p.language ?? 'en',
}).then((r) => r.text);

/** One short paragraph on what needs the consultant this week. */
export const practiceSummary = (language: 'en' | 'hi' = 'en') =>
  callAi<{ text: string }>({ action: 'practice_summary', language }).then((r) => r.text);
