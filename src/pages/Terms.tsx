import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <Link to="/" className="text-[#F52B8C] hover:opacity-80 mb-6 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using Nelsy, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              If you do not agree with any of these terms, you are prohibited from using this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
            <p className="text-gray-600 mb-4">
              Permission is granted to temporarily use Nelsy for personal, non-commercial transitory viewing only.
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained in Nelsy</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Subscription and Payment</h2>
            <p className="text-gray-600 mb-4">
              Nelsy offers a 14-day free trial for new users. After the trial period, you will be charged
              according to the plan you selected. You can cancel at any time before the trial ends to avoid charges.
            </p>
            <p className="text-gray-600 mb-4">
              All payments are processed securely through Stripe. We do not store your payment information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. User Accounts</h2>
            <p className="text-gray-600 mb-4">
              You are responsible for maintaining the confidentiality of your account and password.
              You agree to accept responsibility for all activities that occur under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Prohibited Uses</h2>
            <p className="text-gray-600 mb-4">
              You may not use Nelsy:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>For any unlawful purpose</li>
              <li>To solicit others to perform or participate in any unlawful acts</li>
              <li>To violate any international, federal, provincial or state regulations</li>
              <li>To infringe upon or violate our intellectual property rights</li>
              <li>To harass, abuse, insult, harm, defame, slander, or otherwise violate the rights of others</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Disclaimer</h2>
            <p className="text-gray-600 mb-4">
              The materials on Nelsy are provided on an 'as is' basis. Nelsy makes no warranties, expressed or implied,
              and hereby disclaims and negates all other warranties including, without limitation, implied warranties
              or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual
              property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Limitations</h2>
            <p className="text-gray-600 mb-4">
              In no event shall Nelsy or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or
              inability to use Nelsy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Termination</h2>
            <p className="text-gray-600 mb-4">
              We may terminate or suspend your account and bar access to Nelsy immediately, without prior notice
              or liability, under our sole discretion, for any reason whatsoever and without limitation,
              including but not limited to a breach of the Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              Nelsy reserves the right to revise these terms of service at any time without notice.
              By using Nelsy you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">10. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-gray-600">
              Email: <a href="mailto:support@nelsy.app" className="text-[#F52B8C] hover:opacity-80">support@nelsy.app</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
