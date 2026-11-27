import { useEffect, useMemo, useState } from 'react';
import type { ReactElement } from 'react';
import { HashRouter, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useSession } from './hooks/useSession';
import { ProDataProvider } from './hooks/ProDataProvider';
import { useProData } from './hooks/useProData';
import { MobileTabBar } from './components/MobileTabBar';
import { Spinner } from './components/ui';
import { initNativeShell } from './lib/native';
import { readDemoFlag } from './lib/demo';
import { PINK } from './lib/constants';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import Bookings from './screens/Bookings';
import Studio from './screens/Studio';
import Preview from './screens/Preview';
import Settings from './screens/Settings';
import DeleteAccount from './screens/DeleteAccount';
import Audience from './screens/Audience';

function TabShell() {
  const { loading, error, data, refresh, signOut } = useProData();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-[100dvh] bg-white">
      <main className="pt-safe" style={{ paddingBottom: 'calc(60px + env(safe-area-inset-bottom, 0px))' }}>
        {loading && !data ? (
          <Spinner />
        ) : error && !data ? (
          <div className="px-6 pt-24 text-center">
            <p className="text-[17px] font-bold">We could not load your studio</p>
            <p className="mt-1 text-[14px] text-gray-500">{error}</p>
            <button type="button" onClick={() => void refresh()} className="mt-5 h-12 rounded-full px-6 font-bold text-white" style={{ backgroundColor: PINK }}>
              Try again
            </button>
            <button type="button" onClick={() => void signOut()} className="mt-2 block h-11 w-full text-[14px] font-semibold text-gray-500">
              Log out
            </button>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <MobileTabBar />
    </div>
  );
}

function Routed() {
  const navigate = useNavigate();
  const { session, ready } = useSession();
  const [demo, setDemo] = useState(() => readDemoFlag());
  const authed = demo || !!session;

  useEffect(() => {
    void initNativeShell(() => navigate(-1), (route) => navigate(route));
  }, [navigate]);

  const onSignedOut = useMemo(
    () => () => {
      setDemo(false);
      navigate('/welcome', { replace: true });
    },
    [navigate],
  );

  if (!ready) return <Spinner />;

  const gate = (el: ReactElement) => (authed ? el : <Navigate to="/welcome" replace />);

  return (
    <ProDataProvider demo={demo} userId={session?.user.id ?? null} email={session?.user.email ?? ''} onSignedOut={onSignedOut}>
      <Routes>
        <Route path="/welcome" element={authed ? <Navigate to="/home" replace /> : <Welcome />} />
        <Route path="/login" element={authed ? <Navigate to="/home" replace /> : <Login />} />
        <Route path="/signup" element={<Onboarding />} />
        <Route path="/settings/delete" element={gate(<DeleteAccount />)} />
        <Route element={gate(<TabShell />)}>
          <Route path="/home" element={<Home />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/audience" element={<Audience />} />
        </Route>
        <Route path="*" element={<Navigate to={authed ? '/home' : '/welcome'} replace />} />
      </Routes>
    </ProDataProvider>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routed />
    </HashRouter>
  );
}
