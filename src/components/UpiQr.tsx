import { useEffect, useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { Notice } from './ui';

/**
 * A UPI QR somebody can actually scan.
 *
 * IT IS ALWAYS BLACK ON WHITE, AND THAT IS NOT AN OVERSIGHT. Every other surface in this app follows
 * the viewer's theme. A QR must not: the pattern-recognition step in a camera scanner assumes dark
 * modules on a light field, and an inverted QR — white modules on this app's dark card — is refused
 * outright by a good number of Android scanners and most bank apps. Rendering it on a hard white
 * tile in dark mode looks like a mistake and is the only version that works. The white tile is the
 * "quiet zone" the spec requires as well, which is why the margin is not zero.
 *
 * THE ENCODER IS LOADED ON DEMAND. `qrcode` is around 50KB of the bundle and two screens in this
 * app can show a QR — a consultant who never sends a payment request should not pay for it on every
 * page load. The dynamic import puts it in its own chunk that arrives when the code is first drawn.
 *
 * ERROR CORRECTION IS M, not L. A phone screen photographed off another phone screen loses contrast
 * at the edges; L would encode a slightly smaller image and fail more often on a cracked or dim
 * display. H would be needlessly dense for a string this short.
 *
 * The QR is for showing a screen to somebody in front of you. For a message, send the `upi://` link
 * as text — see `paymentMessage` in promo.ts, which does exactly that, because a link is tappable on
 * the receiving phone and a picture of a QR is not.
 */
export function UpiQr({ uri, size = 208, label }: { uri: string; size?: number; label?: string }) {
  const [png, setPng] = useState<string | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setPng(null);
    setFailed(null);
    void import('qrcode')
      .then((m) => m.default.toDataURL(uri, {
        errorCorrectionLevel: 'M',
        margin: 2,
        width: size * 2, // 2x so it stays sharp on a retina screen and when photographed
        color: { dark: '#000000', light: '#ffffff' },
      }))
      .then((url: string) => { if (!cancelled) setPng(url); })
      .catch((e: unknown) => {
        if (!cancelled) setFailed(e instanceof Error ? e.message : 'Could not draw the QR code.');
      });
    return () => { cancelled = true; };
  }, [uri, size]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(uri);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // A denied clipboard is not worth an error strip; the link is visible below to select by hand.
    }
  };

  if (failed) return <Notice tone="warn">{failed}</Notice>;

  return (
    <div className="flex flex-col items-center gap-2.5">
      <div
        className="rounded-2xl bg-white p-3 shadow-sm"
        style={{ width: size + 24, height: size + 24 }}
      >
        {png ? (
          <img src={png} alt={label ?? 'UPI payment QR code'} width={size} height={size}
               className="block h-full w-full" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-transparent" />
          </div>
        )}
      </div>

      {label && <p className="text-[11px] text-muted-foreground">{label}</p>}

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => void copy()}
          className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition hover:text-foreground"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copied' : 'Copy link'}
        </button>
        {png && (
          <a
            href={png}
            download="upi-qr.png"
            className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition hover:text-foreground"
          >
            <Download className="h-3 w-3" /> Save
          </a>
        )}
      </div>
    </div>
  );
}
