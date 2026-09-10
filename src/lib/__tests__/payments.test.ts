import { describe, expect, it } from 'vitest';
import QRCode from 'qrcode';
import {
  buildUpiUri, isLikelyIfsc, isLikelyVpa, maskAccount, safeNote, upiProblem,
} from '../upi';
import { PROMO_URL, paymentMessage, reminderMessage, waLink, withPromo } from '../promo';

/**
 * The money path, and the line that makes the funnel a funnel.
 *
 * WHY THESE TWO FILES GET A TEST WHEN NOTHING ELSE IN THIS APP DOES. Every other mistake in this
 * codebase announces itself — a broken screen looks broken, a failed save says so. These two fail
 * SILENTLY and expensively:
 *
 *   A malformed UPI link opens the payer's app, shows a plausible screen, and either refuses at the
 *   last tap or sends the money to a valid-but-different handle. Nobody finds out until a consultant
 *   asks where their fee went.
 *
 *   A promotional line that stops being appended costs nothing visible at all. The reminders keep
 *   working, the clients keep getting chased, and the one mechanism that turns this feature into
 *   customer acquisition quietly stops running.
 *
 * The QR assertion reads the data back OUT of the encoded symbol rather than checking that a picture
 * appeared. `qrcode` is a mature library and is not what is likely to be wrong; what we hand it is.
 */

describe('UPI links', () => {
  it('builds the NPCI deep-link format exactly', () => {
    expect(buildUpiUri({
      vpa: 'amar@okhdfcbank', payeeName: 'Amar Pandey', amount: 15000, note: 'August GST',
    })).toBe('upi://pay?pa=amar%40okhdfcbank&pn=Amar%20Pandey&am=15000.00&cu=INR&tn=August%20GST');
  });

  it('omits the amount for an open QR the payer fills in', () => {
    expect(buildUpiUri({ vpa: 'amar@okhdfcbank', payeeName: 'Amar' }))
      .toBe('upi://pay?pa=amar%40okhdfcbank&pn=Amar&cu=INR');
  });

  it('REFUSES rather than guessing when the VPA is malformed', () => {
    // The important half of the contract: a partial link is worse than no link, because a link is
    // sent and a null is a message the consultant reads before sending anything.
    expect(buildUpiUri({ vpa: 'not-a-vpa', amount: 100 })).toBeNull();
    expect(buildUpiUri({ vpa: 'a@b@c' })).toBeNull();
    expect(buildUpiUri({ vpa: 'amar pandey@ybl' })).toBeNull();
  });

  it('refuses a negative amount instead of shipping a QR that fails at the last tap', () => {
    expect(buildUpiUri({ vpa: 'amar@ybl', amount: -5 })).toBeNull();
  });

  it('formats the amount with no separators — "1,200.00" is not a number to a UPI app', () => {
    expect(buildUpiUri({ vpa: 'amar@ybl', amount: 1234.5 })).toContain('am=1234.50');
  });

  it('always sends a payee name, so the payer does not see a raw handle', () => {
    expect(buildUpiUri({ vpa: 'amar@ybl' })).toContain('pn=Payment');
  });

  it('THE AMPERSAND TRAP: a note can never introduce a query separator', () => {
    // Several UPI apps split on & before decoding. An escaped ampersand inside tn would truncate
    // the link there and the amount would silently vanish.
    const uri = buildUpiUri({ vpa: 'amar@ybl', note: 'Fees & tax = 5000' })!;
    expect(uri.split('&')).toHaveLength(4);          // pa, pn, cu, tn — and nothing extra
    expect(safeNote('Fees & GST = 5000')).toBe('Fees GST 5000');
  });

  it('truncates a note at 50 characters, the shortest limit across the major PSPs', () => {
    expect(safeNote('x'.repeat(80))).toHaveLength(50);
  });

  it('accepts real handle shapes and rejects the ones that cannot exist', () => {
    expect(isLikelyVpa('9876543210@ybl')).toBe(true);
    expect(isLikelyVpa('amar.pandey-1@okaxis')).toBe(true);
    expect(isLikelyVpa('amar')).toBe(false);
    expect(isLikelyVpa('')).toBe(false);
  });

  it('knows the IFSC shape: four letters, a zero, six more', () => {
    expect(isLikelyIfsc('HDFC0001234')).toBe(true);
    expect(isLikelyIfsc('HDFC1001234')).toBe(false);   // the fifth character must be a zero
  });

  it('shows only the last four digits of an account back to a person', () => {
    expect(maskAccount('123456789012')).toBe('••••••••9012');
  });

  it('explains the problem rather than leaving a form silent', () => {
    expect(upiProblem({ vpa: '' })).toContain('Settings');
    expect(upiProblem({ vpa: 'rubbish' })).toContain('name@bank');
    expect(upiProblem({ vpa: 'amar@ybl', amount: 100 })).toBeNull();
  });

  it('THE QR CARRIES THE URI BYTE FOR BYTE', () => {
    const uri = buildUpiUri({
      vpa: 'amar@okhdfcbank', payeeName: 'Amar Pandey', amount: 15000, note: 'August GST',
    })!;
    const sym = QRCode.create(uri, { errorCorrectionLevel: 'M' });
    // Byte-mode segments come back as raw bytes, alphanumeric ones as strings — decode both.
    const encoded = sym.segments.map((seg) =>
      typeof seg.data === 'string'
        ? seg.data
        : Array.from(seg.data as ArrayLike<number>).map((b) => String.fromCharCode(b)).join(''),
    ).join('');
    expect(encoded).toBe(uri);
  });
});

describe('the promotional line', () => {
  it('rides on every composed message', () => {
    expect(reminderMessage({ clientName: 'Ravi', title: 'GSTR-3B', dueDate: '2026-09-20' }))
      .toContain(PROMO_URL);
    expect(paymentMessage({ clientName: 'Ravi', amount: 100 })).toContain(PROMO_URL);
  });

  it('is appended once, however many times a message is recomposed', () => {
    const once = withPromo('Hello');
    expect(withPromo(once).split(PROMO_URL)).toHaveLength(2);
  });

  it('says the due date in words, because "20/09" is ambiguous to half the world', () => {
    expect(reminderMessage({ clientName: 'Ravi', title: 'GSTR-3B', dueDate: '2026-09-20' }))
      .toContain('20 September 2026');
  });
});

describe('wa.me links', () => {
  it('adds 91 to a bare Indian mobile', () => {
    expect(waLink('9876543210', 'hi')).toMatch(/^https:\/\/wa\.me\/919876543210\?/);
    expect(waLink('09876543210', 'hi')).toMatch(/^https:\/\/wa\.me\/919876543210\?/);
  });

  it('leaves a number that already carries a country code alone', () => {
    expect(waLink('+91 98765 43210', 'hi')).toMatch(/^https:\/\/wa\.me\/919876543210\?/);
  });

  it('REFUSES rather than linking to a stranger', () => {
    // The guess is 91 on exactly ten digits. Anything else is not a phone number we can complete,
    // and a link built from a wrong guess opens a chat with somebody who is not the client.
    expect(waLink('123', 'hi')).toBeNull();
    expect(waLink('', 'hi')).toBeNull();
    expect(waLink(null, 'hi')).toBeNull();
  });

  it('encodes the message so newlines survive the URL', () => {
    expect(waLink('9876543210', 'a\nb')).toContain('a%0Ab');
  });
});
