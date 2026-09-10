/**
 * Every message this app helps a consultant send, and the one line that makes it a funnel.
 *
 * WHY THIS FILE IS THE POINT OF THE FEATURE. A consultant chasing a GST deadline for a business
 * that is not on JRI is doing unpaid marketing for us — but only if the business is told we exist.
 * The reminder is the delivery vehicle; `PROMO_LINE` is the payload. So the promotional line is not
 * a footer that each screen remembers to add: it is applied by `withPromo()`, and every composer
 * below returns text that has already been through it. A screen cannot forget it, because no screen
 * is trusted to add it.
 *
 * IT IS APPENDED ONCE, NOT PER CALL. `withPromo` is idempotent — it looks for the URL and leaves
 * the body alone if it is already there. Composing a message, editing it, and re-composing must not
 * stack three copies of the same advertisement on somebody's phone.
 *
 * TWO WAYS TO SEND, AND ONLY ONE OF THEM WORKS TODAY.
 *   1. `waLink()` — a wa.me deep link. Opens the consultant's own WhatsApp with the text prefilled;
 *      they press send. No Meta account, no template approval, no opt-in table. This is the path
 *      that works right now and it is the one the UI defaults to.
 *   2. `queue_consultant_whatsapp` (in api.ts) — the real API path. Needs a connected Meta Business
 *      account, a template Meta has APPROVED, and a recorded opt-in for the number. None of those
 *      exist yet, so that button only appears when the server says all three are in place.
 *
 * The consequence for copy: an API template's text is fixed by Meta at approval time, so the line
 * below has to survive being pasted into a template submission unchanged. Keep it one sentence.
 *
 * ★ THE CATEGORY PROBLEM, WHICH HAS TO BE DECIDED BEFORE ANY TEMPLATE IS SUBMITTED. ★
 *
 * Meta sorts templates into UTILITY (an account or transaction update) and MARKETING (a promotion
 * or invitation), and it re-categorises or rejects a UTILITY template that carries promotional
 * content. A deadline reminder is textbook UTILITY — until `PROMO_LINE` is appended to it, at which
 * point it is arguably MARKETING: more expensive per conversation, stricter opt-in, and separately
 * blockable by the recipient.
 *
 * NONE OF THAT APPLIES TO THE wa.me PATH. A message the consultant sends from their own phone is
 * free-form: no template, no category, no per-conversation fee. So the funnel runs unrestricted
 * exactly where it is unrestricted, and that is an argument for the deep link being the primary
 * path rather than a stopgap.
 *
 * WHEN TEMPLATES ARRIVE, the likely shape is: submit reminder templates as UTILITY WITHOUT this
 * line, and keep the promotion on the wa.me path (or a separate, occasional MARKETING template).
 * That needs one change here — a `promo: false` option on the composers — and it is deliberately
 * NOT written yet, because the right answer depends on how Meta actually categorises the first
 * submission and guessing it now would be one more untested branch.
 */

/**
 * Where a business that reads one of these messages actually lands.
 *
 * `jri.ai`, not `user.jri.ai`. It is shorter in a message where every character is read, it is the
 * brand somebody might already have heard, and the front door routes to signup anyway — whereas
 * `user.jri.ai` reads like an internal hostname that leaked into an advertisement.
 */
export const PROMO_URL = 'https://jri.ai';

/**
 * The most-read sentence in the product — it rides on every reminder, every payment request and
 * every document chase this app composes.
 *
 * SHORT ON PURPOSE, and shortened once already. It sits at the bottom of a message somebody opened
 * to find out when their GST is due; the longer it is, the more it reads as the point of the
 * message rather than a footnote to it. One line, both numbers, one link, no second sentence.
 *
 * It claims a multiple and never a rupee figure: a number with a currency symbol is a promise
 * somebody will hold us to.
 *
 * It also has to survive being pasted verbatim into a Meta template submission, because an approved
 * WhatsApp template's text is fixed at approval time and cannot be edited per message.
 */
export const PROMO_LINE =
  `10x the value, 5x the time saved — run your business with AI on ${PROMO_URL}`;

/** Appends the promotional line, exactly once, separated so it never reads as part of the message. */
export function withPromo(body: string): string {
  const trimmed = body.trimEnd();
  if (trimmed.includes(PROMO_URL)) return trimmed;
  return `${trimmed}\n\n${PROMO_LINE}`;
}

// ── Composers ───────────────────────────────────────────────────────────────
// Each returns a complete, sendable message. All of them go through withPromo().

const dateLong = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

/** "GSTR-3B is due on 20 September." The workhorse. */
export function reminderMessage(p: {
  clientName: string;
  title: string;
  dueDate: string;
  note?: string | null;
  fromName?: string | null;
}): string {
  const lines = [
    `Hello ${p.clientName.trim()},`,
    '',
    `A reminder: ${p.title.trim()} is due on ${dateLong(p.dueDate)}.`,
  ];
  if (p.note && p.note.trim()) lines.push('', p.note.trim());
  lines.push('', p.fromName?.trim() ? `— ${p.fromName.trim()}` : 'Please send anything pending at your earliest.');
  return withPromo(lines.join('\n'));
}

/** Asking for a document. Separate from a reminder because the ask, not the date, is the subject. */
export function documentMessage(p: {
  clientName: string;
  what: string;
  byDate?: string | null;
  fromName?: string | null;
}): string {
  const lines = [
    `Hello ${p.clientName.trim()},`,
    '',
    p.byDate
      ? `Could you please send ${p.what.trim()} by ${dateLong(p.byDate)}?`
      : `Could you please send ${p.what.trim()}?`,
  ];
  if (p.fromName?.trim()) lines.push('', `— ${p.fromName.trim()}`);
  return withPromo(lines.join('\n'));
}

/**
 * A request for money.
 *
 * The UPI link is included as text and NOT as the QR image: WhatsApp cannot render a QR from a text
 * message, and a `upi://` link is tappable on the phone that receives it — which is strictly better
 * than a picture of a QR that the same phone would have to scan with its own camera. The QR exists
 * for the other case: showing the screen to somebody standing in front of you.
 */
export function paymentMessage(p: {
  clientName: string;
  amount?: number | null;
  forWhat?: string | null;
  upiUri?: string | null;
  upiId?: string | null;
  bank?: { name?: string | null; account?: string | null; ifsc?: string | null } | null;
  note?: string | null;
  fromName?: string | null;
}): string {
  const amount = typeof p.amount === 'number' && Number.isFinite(p.amount) && p.amount > 0
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 })
        .format(p.amount)
    : null;

  const lines = [`Hello ${p.clientName.trim()},`, ''];
  const forWhat = p.forWhat?.trim();
  if (amount && forWhat) lines.push(`Invoice for ${forWhat}: ${amount}.`);
  else if (amount) lines.push(`Amount due: ${amount}.`);
  else if (forWhat) lines.push(`Payment request for ${forWhat}.`);
  else lines.push('Here are the details to pay by.');

  if (p.upiId?.trim()) {
    lines.push('', `UPI: ${p.upiId.trim()}`);
    if (p.upiUri) lines.push(`Tap to pay: ${p.upiUri}`);
  }

  const b = p.bank;
  if (b && (b.account || b.ifsc || b.name)) {
    lines.push('', 'Bank transfer:');
    if (b.name) lines.push(`Name: ${b.name}`);
    if (b.account) lines.push(`A/c: ${b.account}`);
    if (b.ifsc) lines.push(`IFSC: ${b.ifsc}`);
  }

  if (p.note?.trim()) lines.push('', p.note.trim());
  if (p.fromName?.trim()) lines.push('', `— ${p.fromName.trim()}`);
  return withPromo(lines.join('\n'));
}

// ── Delivery ────────────────────────────────────────────────────────────────

/**
 * A wa.me link, or null when the number cannot be trusted to be a number.
 *
 * THE COUNTRY-CODE JUDGEMENT. wa.me needs digits with a country code and no `+`. A stored number
 * that already carries one is used as it stands. A bare 10-digit number gets `91` — this platform
 * is India-only and a 10-digit Indian mobile is the overwhelmingly common way somebody types a
 * phone number into a form. That IS a guess, and it is why anything that is not 10 digits, or is
 * outside a plausible international length, returns null rather than a link to a stranger.
 */
export function waLink(phone: string | null | undefined, text: string): string | null {
  const digits = (phone ?? '').replace(/\D/g, '');
  if (!digits) return null;
  let msisdn = digits;
  if (digits.length === 10) msisdn = `91${digits}`;
  else if (digits.length === 11 && digits.startsWith('0')) msisdn = `91${digits.slice(1)}`;
  if (msisdn.length < 11 || msisdn.length > 15) return null;
  return `https://wa.me/${msisdn}?text=${encodeURIComponent(text)}`;
}

/** The same number, shown back to a person. Never used for dialling — only for reading. */
export function prettyPhone(phone: string | null | undefined): string {
  const digits = (phone ?? '').replace(/\D/g, '');
  if (digits.length === 10) return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return phone?.trim() || '—';
}
