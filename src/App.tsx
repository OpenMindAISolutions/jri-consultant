import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import { Shell, Spinner } from './components/Shell';
import SignIn from './pages/SignIn';
import ThisWeek from './pages/ThisWeek';
import Clients from './pages/Clients';
import ClientReports from './pages/ClientReports';
import ReportView from './pages/ReportView';
import Settings from './pages/Settings';

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

  if (!ready) return <Spinner label="Signing you in…" />;

  if (!session) {
    // `/invite` is the emailed link. It is the sign-in screen with the token carried through, so an
    // invitation lands on "create your account" rather than a login form with no explanation.
    return (
      <Routes>
        <Route path="/invite" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to={`/signin${location.search}`} replace />} />
      </Routes>
    );
  }

  return (
    <Shell email={session.user.email}>
      <Routes>
        <Route path="/" element={<ThisWeek />} />
        <Route path="/clients" element={<Clients />} />
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
