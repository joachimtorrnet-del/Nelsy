import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import CookieBanner from './components/CookieBanner';
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
import InstagramEngagementCalculator from './pages/tools/InstagramEngagementCalculator';
import CreatorRateCalculator from './pages/tools/CreatorRateCalculator';
import DepositCalculator from './pages/tools/DepositCalculator';
import NoShowCostCalculator from './pages/tools/NoShowCostCalculator';
import BookingAppFeeCalculator from './pages/tools/BookingAppFeeCalculator';
import GlossaryIndex from './pages/glossary/GlossaryIndex';
import GlossaryTermPage from './pages/glossary/GlossaryTermPage';
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
import CoursesPage from './pages/features/Courses';
import DigitalProductsPage from './pages/features/DigitalProducts';
import CoachingPage from './pages/features/Coaching';
import MembershipsPage from './pages/features/Memberships';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Demo from './pages/Demo';
import NotFound from './pages/NotFound';
import NailTechsPage from './pages/use-cases/NailTechs';
import BeautyCreatorsPage from './pages/use-cases/BeautyCreators';
import IndependentBeautyProsPage from './pages/use-cases/IndependentBeautyPros';
import LashTechsPage from './pages/use-cases/LashTechs';
import ReduceNoShowsPage from './pages/use-cases/ReduceNoShows';
import TurnFollowersPage from './pages/use-cases/TurnFollowersIntoBookings';

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
const ProductDownload = lazy(() => import('./pages/ProductDownload'));
const Unsubscribe = lazy(() => import('./pages/Unsubscribe'));
// DEV-only sandboxes (digital products). import.meta.env.DEV is false in production builds.
const ProductsSandbox = import.meta.env.DEV ? lazy(() => import('./pages/dev/ProductsSandbox').then((m) => ({ default: m.ProductsSandbox }))) : null;
const StudioSandbox = import.meta.env.DEV ? lazy(() => import('./pages/dev/ProductsSandbox').then((m) => ({ default: m.StudioSandbox }))) : null;
const AudienceSandbox = import.meta.env.DEV ? lazy(() => import('./pages/dev/ProductsSandbox').then((m) => ({ default: m.AudienceSandbox }))) : null;
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
            <Route path="/tools/instagram-engagement-calculator" element={<InstagramEngagementCalculator />} />
            <Route path="/tools/creator-rate-calculator" element={<CreatorRateCalculator />} />
            <Route path="/tools/deposit-calculator" element={<DepositCalculator />} />
            <Route path="/tools/no-show-cost-calculator" element={<NoShowCostCalculator />} />
            <Route path="/tools/booking-app-fee-calculator" element={<BookingAppFeeCalculator />} />
            <Route path="/glossary" element={<GlossaryIndex />} />
            <Route path="/glossary/:term" element={<GlossaryTermPage />} />

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
            <Route path="/features/courses" element={<CoursesPage />} />
            <Route path="/features/digital-products" element={<DigitalProductsPage />} />
            <Route path="/features/coaching" element={<CoachingPage />} />
            <Route path="/features/memberships" element={<MembershipsPage />} />

            {/* ── Use case pages ─────────────────────────────────────────── */}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/use-cases/nail-techs" element={<NailTechsPage />} />
            <Route path="/use-cases/beauty-creators" element={<BeautyCreatorsPage />} />
            <Route path="/use-cases/independent-beauty-pros" element={<IndependentBeautyProsPage />} />
            <Route path="/use-cases/lash-techs" element={<LashTechsPage />} />
            <Route path="/use-cases/reduce-no-shows" element={<ReduceNoShowsPage />} />
            <Route path="/use-cases/turn-followers-into-bookings" element={<TurnFollowersPage />} />

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

            <Route
              path="/d/:orderId"
              element={
                <>
                  <SEOMeta title="Download your purchase" description="" noindex />
                  <ProductDownload />
                </>
              }
            />
            <Route
              path="/r/:claimId"
              element={
                <>
                  <SEOMeta title="Download your free resource" description="" noindex />
                  <ProductDownload />
                </>
              }
            />
            <Route
              path="/u/:contactId"
              element={
                <>
                  <SEOMeta title="Unsubscribe" description="" noindex />
                  <Unsubscribe />
                </>
              }
            />
            {ProductsSandbox && <Route path="/dev/products" element={<ProductsSandbox />} />}
            {AudienceSandbox && <Route path="/dev/audience" element={<AudienceSandbox />} />}
            {StudioSandbox && <Route path="/dev/studio" element={<StudioSandbox />} />}

            {/* ── Catch-all studio slug (must stay last) ─────────────────── */}
            <Route path="/:slug" element={<Studio />} />
            {/* Unknown multi-segment URLs: real not-found page with noindex instead of a blank screen */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <CookieBanner />
      </BrowserRouter>
    </Elements>
  );
}
