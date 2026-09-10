/**
 * UPI payment links, and the validation that stops a wrong one from being sent.
 *
 * WHY THIS IS THE MOST FAILURE-SENSITIVE FILE IN THE APP. Every other mistake here shows itself: a
 * broken layout looks broken, a failed save says so. A malformed UPI link does not — it opens the
 * payer's app, shows a plausible screen, and either refuses at the last step or, far worse, sends
 * money to a valid-but-wrong handle. Nobody discovers it until a consultant asks where the money
 * went. So every value that goes into a link is validated BEFORE the link exists, and `buildUpiUri`
 * returns null rather than a link it is not sure about.
 *
 * The format is NPCI's deep-link spec: upi://pay?pa=<vpa>&pn=<payee>&am=<amount>&cu=INR&tn=<note>.
 * `cu` is always INR — this platform is India-only, and a UPI collect in another currency does not
 * exist.
 */

/**
 * A virtual payment address: local part, `@`, handle.
 *
 * Deliberately permissive on the local part (banks allow dots, hyphens, underscores and digits, and
 * some issue numeric-only handles from a phone number) and strict on the shape: exactly one `@`,
 * something either side, no whitespace. A regex that tried to enumerate valid handles would reject
 * next month's PSP.
 */
const VPA = /^[a-zA-Z0-9](?:[a-zA-Z0-9.\-_]{0,255})@[a-zA-Z][a-zA-Z0-9.\-_]{1,63}$/;

export function isLikelyVpa(value: string | null | undefined): boolean {
  return VPA.test((value ?? '').trim());
}

/** IFSC is a fixed shape: four letters, a zero, then six alphanumerics. */
const IFSC = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export function isLikelyIfsc(value: string | null | undefined): boolean {
  return IFSC.test((value ?? '').trim().toUpperCase());
}

/**
 * Indian bank account numbers have no national format — lengths run from 9 to 18 digits and some
 * banks include letters. So this checks only that it could not be a typo of nothing: digits and
 * letters, 6 to 20 characters. Anything stricter would reject real accounts.
 */
export function isPlausibleAccount(value: string | null | undefined): boolean {
  return /^[A-Za-z0-9]{6,20}$/.test((value ?? '').trim());
}

/**
 * A transaction note, made safe for a naive parser.
 *
 * `encodeURIComponent` already escapes these correctly, and a spec-compliant UPI app would read
 * them back. Not every UPI app is spec-compliant: several split the query string on `&` before
 * decoding, so an escaped ampersand inside `tn` truncates the link at that point and the amount
 * silently disappears. Stripping the four structural characters costs a comma in somebody's note
 * and removes an entire class of "it asked me for the wrong amount".
 *
 * 50 characters because that is the shortest limit across the major PSPs; a longer note is not
 * rejected, it is quietly cut, which would put half a sentence on a payer's screen.
 */
export function safeNote(note: string | null | undefined, max = 50): string {
  return (note ?? '')
    .replace(/[&=?#]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
    .trim();
}

export interface UpiRequest {
  /** The payee's VPA. Required — there is no UPI link without one. */
  vpa: string;
  /** The payee's name as the payer will see it. */
  payeeName?: string | null;
  /** Rupees. Omit for an open QR the payer types an amount into. */
  amount?: number | null;
  note?: string | null;
}

/**
 * The link, or null when it would not be a link worth sending.
 *
 * Returns null — never a partial link — when the VPA is malformed, or when an amount is present but
 * not a positive finite number. A zero or negative amount is not "no amount": it is a mistake, and
 * passing it through would produce a QR that fails at the payer's last tap.
 */
export function buildUpiUri(req: UpiRequest): string | null {
  const vpa = (req.vpa ?? '').trim();
  if (!isLikelyVpa(vpa)) return null;

  const params: string[] = [`pa=${encodeURIComponent(vpa)}`];

  // Every major UPI app shows *something* where the payee name goes; when the field is absent they
  // fall back to the raw handle, which reads like a machine address to whoever is paying.
  const name = (req.payeeName ?? '').trim();
  params.push(`pn=${encodeURIComponent(name || 'Payment')}`);

  if (req.amount != null && req.amount !== 0) {
    if (!Number.isFinite(req.amount) || req.amount < 0) return null;
    // Two decimals, no separators. `1,200.00` is not a number to a UPI app.
    params.push(`am=${req.amount.toFixed(2)}`);
  }

  params.push('cu=INR');

  const note = safeNote(req.note);
  if (note) params.push(`tn=${encodeURIComponent(note)}`);

  return `upi://pay?${params.join('&')}`;
}

/**
 * Why a link could not be built, for a form to say out loud.
 *
 * Kept separate from `buildUpiUri` so the builder has exactly one return type and the UI does not
 * have to interpret a null. A validator that also builds tends to grow a third state.
 */
export function upiProblem(req: Partial<UpiRequest>): string | null {
  const vpa = (req.vpa ?? '').trim();
  if (!vpa) return 'Add your UPI ID in Settings before sending a payment request.';
  if (!isLikelyVpa(vpa)) return `"${vpa}" does not look like a UPI ID — it should read like name@bank.`;
  if (req.amount != null && req.amount !== 0 && (!Number.isFinite(req.amount) || req.amount < 0)) {
    return 'An amount has to be a positive number, or left blank for the payer to fill in.';
  }
  return null;
}

/** Shown, not sent. The last four digits are enough for a consultant to confirm the right account. */
export function maskAccount(account: string | null | undefined): string {
  const s = (account ?? '').trim();
  if (s.length <= 4) return s || '—';
  return `${'•'.repeat(Math.min(s.length - 4, 12))}${s.slice(-4)}`;
}
