import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!supabase) throw new Error('Supabase not configured');

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;
      if (data.user) navigate('/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid credentials';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F52B8C] to-[#E0167A] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Welcome back! 👋</h1>
        <p className="text-gray-600 mb-8 text-center">Sign in to your Nelsy dashboard</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#F52B8C] focus:outline-none transition"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            className="w-full py-4 bg-[#F52B8C] text-white rounded-2xl font-bold text-lg hover:bg-[#E0167A] transition active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 space-y-3 text-center text-sm text-gray-600">
          <p>
            <Link to="/forgot-password" className="text-[#F52B8C] font-semibold hover:opacity-75">
              Forgot your password?
            </Link>
          </p>
          <p>
            No account yet?{' '}
            <Link to="/onboarding" className="text-[#F52B8C] font-semibold">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
