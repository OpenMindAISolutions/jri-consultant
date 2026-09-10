import { Link } from 'react-router-dom';

/**
 * The lotus and the wordmark, in one place.
 *
 * WHY A COMPONENT FOR SEVEN LINES OF MARKUP. Because it was not seven lines in one place — the
 * header drew a briefcase icon in a lavender tile, the sign-in screen drew a different one, and
 * neither used the actual logo. A brand mark assembled at each call site is a brand mark that
 * drifts, and this app is a consultant's second impression of a company they met somewhere else.
 *
 * THE CASING IS "Jri.AI". Recorded as the decision in June and still contradicted in a few places
 * in the business app, where BrandMark renders "JRI.AI". One of the two is wrong everywhere; this
 * app follows the decision rather than the drift.
 *
 * The wordmark is Cormorant Garamond — warm serif over graphite sans is the whole identity, and it
 * is the one place a serif is allowed. `font-brand` carries a real fallback chain because the face
 * arrives over the network and a wordmark that reflows on load is the first thing anyone notices.
 */
export function BrandMark({
  size = 'md', subtitle, to = '/', className = '',
}: {
  size?: 'sm' | 'md' | 'lg';
  /** "for consultants" — shown small under the wordmark. Omit on tight surfaces. */
  subtitle?: string;
  /** Where the mark links. Pass null for a mark that is not a link (a landing hero). */
  to?: string | null;
  className?: string;
}) {
  const dim = size === 'lg' ? 'h-11 w-11' : size === 'sm' ? 'h-7 w-7' : 'h-9 w-9';
  const word = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-lg' : 'text-xl';

  const inner = (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/jri-logo.png"
        alt=""
        aria-hidden="true"
        className={`${dim} shrink-0 select-none`}
        draggable={false}
      />
      <span className="leading-none">
        <span className={`font-brand block font-semibold tracking-tight ${word}`}>Jri.AI</span>
        {subtitle && (
          <span className="type-eyebrow mt-1 block text-muted-foreground">{subtitle}</span>
        )}
      </span>
    </span>
  );

  // alt="" plus a visible wordmark on purpose: the name is already text next to it, so describing
  // the image again would make a screen reader say "Jri.AI Jri.AI".
  return to ? <Link to={to} className="inline-flex">{inner}</Link> : inner;
}
