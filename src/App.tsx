import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '@/lib/stripe';
import { useEffect, lazy, Suspense } from 'react';
import posthog from 'posthog-js';
import SEOMeta from './components/SEOMeta';
import { trackSeoLandingView, trackSeoSignupStarted } from './lib/analytics';

// Public marketing pages — eagerly loaded (part of initial bundle)
import LandingPremium from './pages/LandingPremium';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Studio from './pages/Studio';
import NailTechDeposits from './pages/seo/NailTechDeposits';
import InstagramBooking from './pages/seo/InstagramBooking';
import FreshaAlternative from './pages/seo/FreshaAlternative';
import BookcyAlternative from './pages/seo/BookcyAlternative';
import BestBookingApp from './pages/seo/BestBookingApp';
import PricingCalculator from './pages/tools/PricingCalculator';
import CancellationPolicyGenerator from './pages/tools/CancellationPolicyGenerator';
import AppointmentReminderTemplates from './pages/tools/AppointmentReminderTemplates';
import ToolsIndex from './pages/tools/ToolsIndex';
import BlogIndex from './pages/blog/BlogIndex';
import BlogArticlePage from './pages/blog/BlogArticlePage';
import BookingsPage from './pages/features/Bookings';
import DepositsPage from './pages/features/Deposits';
import PaymentsPage from './pages/features/Payments';
import LinkInBioPage from './pages/features/LinkInBio';
import InstagramAutoDMPage from './pages/features/InstagramAutoDM';
import EmailNewslettersPage from './pages/features/EmailNewsletters';
import AudienceCapturePage from './pages/features/AudienceCapture';
import CRMPage from './pages/features/CRM';
import AnalyticsPage from './pages/features/Analytics';
import Pricing from './pages/Pricing';
import NailTechsPage from './pages/use-cases/NailTechs';
import LashTechsPage from './pages/use-cases/LashTechs';
import GetMoreClientsPage from './pages/use-cases/GetMoreClients';
import ReduceNoShowsPage from './pages/use-cases/ReduceNoShows';
import TurnFollowersPage from './pages/use-cases/TurnFollowersIntoBookings';
import GrowYourBeautyBusinessPage from './pages/use-cases/GrowYourBeautyBusiness';

// App routes — lazy loaded (kept out of the marketing bundle)
const OfferEditor = lazy(() => import('./pages/dashboard/OfferEditor'));
const CollectionEditor = lazy(() => import('./pages/dashboard/CollectionEditor'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const OnboardingSuccess = lazy(() => import('./pages/OnboardingSuccess'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const OnboardingStripe = lazy(() => import('./pages/OnboardingStripe'));
const StripeReturn = lazy(() => import('./pages/StripeReturn'));
const Login = lazy(() => import('./pages/Login'));
const BookingConfirmed = lazy(() => import('./pages/BookingConfirmed'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function PageviewTracker() {
  const location = useLocation();

  useEffect(() => {
    const handleUnload = () => posthog.capture('$pageleave');
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  useEffect(() => {
    return () => { posthog.capture('$pageleave'); };
  }, [location.pathname]);

  useEffect(() => {
    posthog.capture('$pageview');
    // SEO acquisition: record landing page in sessionStorage + fire landing event
    trackSeoLandingView(location.pathname);
    // SEO attribution: read sessionStorage source when user reaches /onboarding
    if (location.pathname === '/onboarding') {
      trackSeoSignupStarted();
    }
  }, [location.pathname]);

  return null;
}

// Redirects /learn/:slug → /blog/:slug permanently
function LearnArticleRedirect() {
  const { slug = '' } = useParams<{ slug: string }>();
  return <Navigate to={`/blog/${slug}`} replace />;
}

// Minimal fallback — keeps layout stable during lazy load
function AppFallback() {
  return <div style={{ minHeight: '100vh', background: '#fff' }} aria-hidden="true" />;
}

export default function App() {
  return (
    <Elements stripe={getStripe()}>
      <BrowserRouter>
        <ScrollToTop />
        <PageviewTracker />
        <Suspense fallback={<AppFallback />}>
          <Routes>
            {/* ── Public indexable routes ────────────────────────────────── */}
            <Route path="/" element={<LandingPremium />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/studio/:slug" element={<Studio />} />

            {/* ── SEO content pages (Wave 1) ─────────────────────────────── */}
            <Route path="/nail-tech-deposits" element={<NailTechDeposits />} />
            <Route path="/instagram-booking-for-nail-techs" element={<InstagramBooking />} />
            <Route path="/fresha-alternative-nail-techs" element={<FreshaAlternative />} />
            <Route path="/booksy-alternative-nail-techs" element={<BookcyAlternative />} />

            {/* ── SEO content pages (Wave 2) ─────────────────────────────── */}
            <Route path="/best-booking-app-for-nail-techs" element={<BestBookingApp />} />
            <Route path="/tools" element={<ToolsIndex />} />
            <Route path="/tools/nail-tech-pricing-calculator" element={<PricingCalculator />} />

            {/* ── Feature landing pages ──────────────────────────────────── */}
            <Route path="/features/bookings" element={<BookingsPage />} />
            <Route path="/features/deposits" element={<DepositsPage />} />
            <Route path="/features/payments" element={<PaymentsPage />} />
            <Route path="/features/link-in-bio" element={<LinkInBioPage />} />
            <Route path="/features/instagram-autodm" element={<InstagramAutoDMPage />} />
            <Route path="/features/email-newsletters" element={<EmailNewslettersPage />} />
            <Route path="/features/audience-capture" element={<AudienceCapturePage />} />
            <Route path="/features/crm" element={<CRMPage />} />
            <Route path="/features/analytics" element={<AnalyticsPage />} />

            {/* ── Use case pages ─────────────────────────────────────────── */}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/use-cases/nail-techs" element={<NailTechsPage />} />
            <Route path="/use-cases/lash-techs" element={<LashTechsPage />} />
            <Route path="/use-cases/get-more-clients" element={<GetMoreClientsPage />} />
            <Route path="/use-cases/reduce-no-shows" element={<ReduceNoShowsPage />} />
            <Route path="/use-cases/turn-followers-into-bookings" element={<TurnFollowersPage />} />
            <Route path="/use-cases/grow-your-beauty-business" element={<GrowYourBeautyBusinessPage />} />

            {/* ── Blog / editorial hub (/blog is canonical; /learn redirects) */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
            <Route path="/learn" element={<Navigate to="/blog" replace />} />
            <Route path="/learn/:slug" element={<LearnArticleRedirect />} />
            <Route path="/tools/nail-tech-cancellation-policy-generator" element={<CancellationPolicyGenerator />} />
            <Route path="/tools/nail-tech-appointment-reminder-templates" element={<AppointmentReminderTemplates />} />



            {/* ── App routes — noindex ───────────────────────────────────── */}
            <Route
              path="/dashboard/offer/:serviceId"
              element={
                <>
                  <SEOMeta title="Edit service" description="" noindex />
                  <OfferEditor />
                </>
              }
            />
            <Route
              path="/dashboard/collection/:collectionId"
              element={
                <>
                  <SEOMeta title="Edit collection" description="" noindex />
                  <CollectionEditor />
                </>
              }
            />
            <Route
              path="/onboarding"
              element={
                <>
                  <SEOMeta
                    title="Create your nail tech booking page"
                    description="Set up your Nelsy booking page in minutes."
                    canonical="/onboarding"
                    noindex
                  />
                  <Onboarding />
                </>
              }
            />
            <Route
              path="/onboarding/success"
              element={
                <>
                  <SEOMeta title="Welcome to Nelsy" description="" noindex />
                  <OnboardingSuccess />
                </>
              }
            />
            <Route
              path="/dashboard/*"
              element={
                <>
                  <SEOMeta title="Dashboard" description="" noindex />
                  <Dashboard />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <SEOMeta title="Log in to Nelsy" description="" canonical="/login" noindex />
                  <Login />
                </>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <>
                  <SEOMeta title="Reset password" description="" noindex />
                  <ForgotPassword />
                </>
              }
            />
            <Route
              path="/reset-password"
              element={
                <>
                  <SEOMeta title="Set new password" description="" noindex />
                  <ResetPassword />
                </>
              }
            />
            <Route
              path="/onboarding-stripe"
              element={
                <>
                  <SEOMeta title="Connect Stripe" description="" noindex />
                  <OnboardingStripe />
                </>
              }
            />
            <Route
              path="/stripe/return"
              element={
                <>
                  <SEOMeta title="Stripe setup" description="" noindex />
                  <StripeReturn />
                </>
              }
            />
            <Route
              path="/booking-confirmed"
              element={
                <>
                  <SEOMeta title="Booking confirmed" description="" noindex />
                  <BookingConfirmed />
                </>
              }
            />

            {/* ── Catch-all studio slug (must stay last) ─────────────────── */}
            <Route path="/:slug" element={<Studio />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Elements>
  );
}
