import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '@/lib/stripe';
import { useEffect } from 'react';
import posthog from 'posthog-js';
import Landing from './pages/Landing';
import LandingPremium from './pages/LandingPremium';
import Onboarding from './pages/Onboarding';
import OnboardingSuccess from './pages/OnboardingSuccess';
import Studio from './pages/Studio';
import Dashboard from './pages/Dashboard';
import OnboardingStripe from './pages/OnboardingStripe';
import StripeReturn from './pages/StripeReturn';
import Login from './pages/Login';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import BookingConfirmed from './pages/BookingConfirmed';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function PageviewTracker() {
  const location = useLocation();
  useEffect(() => {
    posthog.capture('$pageview');
  }, [location.pathname]);
  return null;
}

export default function App() {
  return (
    <Elements stripe={getStripe()}>
      <BrowserRouter>
        <PageviewTracker />
        <Routes>
          <Route path="/" element={<LandingPremium />} />
          <Route path="/landing-old" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/onboarding/success" element={<OnboardingSuccess />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding-stripe" element={<OnboardingStripe />} />
          <Route path="/stripe/return" element={<StripeReturn />} />
          <Route path="/booking-confirmed" element={<BookingConfirmed />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/studio/:slug" element={<Studio />} />
          <Route path="/:slug" element={<Studio />} />
        </Routes>
      </BrowserRouter>
    </Elements>
  );
}
