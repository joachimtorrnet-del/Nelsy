import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <Link to="/" className="text-[#F52B8C] hover:opacity-80 mb-6 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Account information (name, email, phone number)</li>
              <li>Business information (salon name, bio, location)</li>
              <li>Service information (services you offer, pricing)</li>
              <li>Booking information (client details, appointments)</li>
              <li>Payment information (processed securely by Stripe)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze trends and usage</li>
              <li>Detect, prevent, and address technical issues</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not share your personal information with third parties except:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With service providers who assist us (Stripe for payments, Supabase for hosting)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-gray-600 mb-4">
              We take reasonable measures to help protect your personal information from loss, theft,
              misuse, unauthorized access, disclosure, alteration, and destruction. All data is encrypted
              in transit and at rest.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Cookies and Tracking</h2>
            <p className="text-gray-600 mb-4">
              We use cookies and similar tracking technologies to track activity on our service and
              hold certain information. You can instruct your browser to refuse all cookies or to
              indicate when a cookie is being sent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Your Rights (GDPR)</h2>
            <p className="text-gray-600 mb-4">
              If you are a resident of the European Economic Area (EEA), you have certain data protection rights:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>The right to access, update or delete your information</li>
              <li>The right of rectification</li>
              <li>The right to object</li>
              <li>The right of restriction</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Data Retention</h2>
            <p className="text-gray-600 mb-4">
              We will retain your personal information only for as long as is necessary for the purposes
              set out in this Privacy Policy. We will retain and use your information to comply with our
              legal obligations, resolve disputes, and enforce our policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Children's Privacy</h2>
            <p className="text-gray-600 mb-4">
              Our service is not directed to children under 18. We do not knowingly collect personal
              information from children under 18. If you become aware that a child has provided us with
              personal information, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Changes to This Privacy Policy</h2>
            <p className="text-gray-600 mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">10. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <p className="text-gray-600">
              Email: <a href="mailto:privacy@nelsy.app" className="text-[#F52B8C] hover:opacity-80">privacy@nelsy.app</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
