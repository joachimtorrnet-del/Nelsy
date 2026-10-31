import { Link } from 'react-router-dom';

const PINK = '#F52B8C';

export default function SiteFooter() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* ── Hub links ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          <div>
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3">Product</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Booking app</Link></li>
              <li><Link to="/studio/maya" className="hover:text-white transition">Demo</Link></li>
              <li><Link to="/onboarding" className="hover:text-white transition">Start free</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3">Guides</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/nail-tech-deposits" className="hover:text-white transition">Collect deposits</Link></li>
              <li><Link to="/instagram-booking-for-nail-techs" className="hover:text-white transition">Instagram booking</Link></li>
              <li><Link to="/blog/how-to-get-more-nail-clients" className="hover:text-white transition">Get more clients</Link></li>
              <li><Link to="/blog/nail-tech-pricing-guide" className="hover:text-white transition">Pricing guide</Link></li>
              <li><Link to="/blog/nail-tech-deposit-policy" className="hover:text-white transition">Deposit policy</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3">Free tools</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/tools/nail-tech-pricing-calculator" className="hover:text-white transition">Pricing calculator</Link></li>
              <li><Link to="/tools/nail-tech-cancellation-policy-generator" className="hover:text-white transition">Cancellation policy</Link></li>
              <li><Link to="/tools/nail-tech-appointment-reminder-templates" className="hover:text-white transition">Reminder templates</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3">Compare</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/best-booking-app-for-nail-techs" className="hover:text-white transition">Best booking apps</Link></li>
              <li><Link to="/fresha-alternative-nail-techs" className="hover:text-white transition">Fresha alternative</Link></li>
              <li><Link to="/booksy-alternative-nail-techs" className="hover:text-white transition">Booksy alternative</Link></li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md" style={{ backgroundColor: PINK }} />
            <span className="font-bold text-white">Nelsy</span>
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms</Link>
            <a href="mailto:support@getnelsy.com" className="hover:text-white transition">Contact</a>
          </div>
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} Nelsy</p>
        </div>
      </div>
    </footer>
  );
}
