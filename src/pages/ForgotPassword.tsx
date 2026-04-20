import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F52B8C] to-[#E0167A] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Forgot your password?</h1>
        <p className="text-gray-600 mb-8 text-center">
          Enter your email and we'll send you a reset link.
        </p>

        {sent ? (
          <div className="text-center space-y-4">
            <div className="text-5xl mb-4">📬</div>
            <p className="font-semibold text-gray-900">Check your inbox!</p>
            <p className="text-sm text-gray-500">
              We sent a link to <strong>{email}</strong>
            </p>
            <Link
              to="/login"
              className="block w-full py-4 bg-[#F52B8C] text-white rounded-2xl font-bold text-center hover:opacity-90 transition mt-4"
            >
              Back to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#F52B8C] focus:outline-none transition"
              required
            />

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#F52B8C] text-white rounded-2xl font-bold text-lg hover:opacity-90 transition active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send reset link'}
            </button>

            <p className="text-center text-sm text-gray-600">
              <Link to="/login" className="text-[#F52B8C] font-semibold">Back to sign in</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
