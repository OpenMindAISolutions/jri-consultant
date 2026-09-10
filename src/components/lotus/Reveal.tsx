import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Reveal on scroll — one opacity and one translate, nothing showy.
 *
 * An IntersectionObserver rather than a scroll listener, and it UNOBSERVES
 * after the first intersection: a section that fades back out when it leaves
 * the viewport is a section somebody has to watch appear twice.
 *
 * `prefers-reduced-motion` is handled in CSS, not here — the media query sets
 * the revealed state directly, so a reader who has asked for less motion gets
 * the content immediately rather than getting it via a shortened animation.
 */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref} className={`lotus-reveal ${className}`}>{children}</div>;
}
