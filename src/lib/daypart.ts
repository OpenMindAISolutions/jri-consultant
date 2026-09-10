import { useEffect, useState } from 'react';

/**
 * Which sky the visitor gets, from their own clock.
 *
 * The brand book's four windows, unchanged. Layout, type and components are
 * identical across all four — only the sky and its ink move — so the page never
 * reorganises itself under a returning visitor.
 *
 * It re-checks every minute rather than only on mount, because somebody leaving
 * a tab open across 17:00 should get dusk without reloading, and a minute is
 * cheap for a value that changes four times a day.
 */
export type Daypart = 'dawn' | 'day' | 'dusk' | 'night';

export function daypartForHour(h: number): Daypart {
  if (h >= 5 && h < 11) return 'dawn';
  if (h >= 11 && h < 17) return 'day';
  if (h >= 17 && h < 20) return 'dusk';
  return 'night';
}

/**
 * Sets `data-daypart` on <html> for as long as the calling component is
 * mounted, and REMOVES it on unmount.
 *
 * The removal matters: the attribute lives on the document root, and the rest
 * of this application is a warm-paper surface that must not inherit a sky when
 * somebody navigates from the landing page into the app.
 */
export function useDaypart(): Daypart {
  const [part, setPart] = useState<Daypart>(() => daypartForHour(new Date().getHours()));

  useEffect(() => {
    const apply = () => setPart(daypartForHour(new Date().getHours()));
    apply();
    const id = window.setInterval(apply, 60_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-daypart', part);
    return () => document.documentElement.removeAttribute('data-daypart');
  }, [part]);

  return part;
}
