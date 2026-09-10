import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import { acceptInvite } from './lib/api';
import { Shell, Spinner } from './components/Shell';
import { CommandPalette } from './components/CommandPalette';
import SignIn from './pages/SignIn';
import Landing from './pages/Landing';
import Join from './pages/Join';
import Dashboard from './pages/Dashboard';
import ThisWeek from './pages/ThisWeek';
import Clients from './pages/Clients';
import ClientReports from './pages/ClientReports';
import ReportView from './pages/ReportView';
import Settings from './pages/Settings';
import Managed from './pages/Managed';
import ManagedClient from './pages/ManagedClient';
import Practice from './pages/Practice';
import Inbox from './pages/Inbox';

/**
 * Routing and the session gate.
 *
 * There is no onboarding wizard anywhere in this app, and that is the whole point: a consultant has
 * no business of their own to set up. In the business app, a signed-in user with no workplace is
 * sent to create one — which is exactly the trap this separate application avoids by not having
 * that flow at all.
 */
export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  /**
   * Claim any invitation waiting for this person, on EVERY arrival with a session.
   *
   * This used to happen only on the sign-in form's submit, which quietly assumed the account is
   * created and the invite claimed in one unbroken visit. Email confirmation breaks that
   * assumption: you sign up, you leave for your inbox, you come back — and on the way back the
   * form never submits, so the invite was never claimed. The first real consultant ended up with a
   * working account, the role `platform_user`, and no link to the business that invited them.
   *
   * `accept_consultant_invite` is idempotent and matches on the token OR the signed-in address, so
   * calling it on arrival is safe to repeat and rescues anyone already stuck in that state. The
   * token is passed when the URL still carries one; email alone is enough when it does not.
   */
  useEffect(() => {
    if (!session) return;
    const token = new URLSearchParams(location.search).get('token') ?? undefined;
    void acceptInvite(token).catch(() => {
      // Nothing to claim is the normal case for a returning consultant, and a failure here must
      // never block a session that is otherwise fine.
    });
  }, [session, location.search]);

  if (!ready) return <Spinner label="Signing you in…" />;

  if (!session) {
    // `/invite` is the emailed link. It is the sign-in screen with the token carried through, so an
    // invitation lands on "create your account" rather than a login form with no explanation.
    return (
      <Routes>
        {/* The front door for anyone who has not been here. One page, and the only marketing
            surface this application has. */}
        <Route path="/" element={<Landing />} />

        {/* `/invite` is the emailed link and now has a page of its own rather than a login form
            with a toggle: an accountant clicking a link from a client needs to be told what they
            are signing in to, or the page is indistinguishable from a phishing attempt. */}
        <Route path="/invite" element={<Join />} />
        <Route path="/join" element={<Join />} />
        <Route path="/signin" element={<SignIn />} />

        {/* A deep link while signed out goes to sign-in, NOT to the landing page: that person has
            been here before and knows what this is — they just need their session back. */}
        <Route path="*" element={<Navigate to={`/signin${location.search}`} replace />} />
      </Routes>
    );
  }

  return (
    <Shell email={session.user.email}>
      {/* Mounted inside the authenticated shell so it can never appear on the sign-in screen,
          and once so the shortcut works from every route. */}
      <CommandPalette />
      <Routes>
        {/* The dashboard is the front door; the full queue moved to /work. A list answers "what
            is next" and cannot answer "am I on top of things", which is the first question. */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/work" element={<ThisWeek />} />
        <Route path="/clients" element={<Clients />} />
        {/* The off-platform book. `/clients` is what businesses shared WITH the consultant;
            `/managed` is the consultant's own record of businesses that are not on JRI at all.
            Two different trust stories, so two different routes and never one merged list. */}
        <Route path="/managed" element={<Managed />} />
        <Route path="/managed/:clientId" element={<ManagedClient />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/client/:workplaceId" element={<ClientReports />} />
        <Route path="/client/:workplaceId/report/:reportKey" element={<ReportView />} />
        {/* Someone following an invite link while already signed in has already been linked by
            accept_consultant_invite; send them to the list rather than a second sign-in. */}
        <Route path="/invite" element={<Navigate to="/" replace />} />
        <Route path="/signin" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Shell>
  );
}
