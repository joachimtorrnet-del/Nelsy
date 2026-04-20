import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { validatePassword } from '../utils/validation';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const check = validatePassword(password);
    if (!check.valid) { setError(check.errors[0]); return; }
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (!supabase) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      navigate('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F52B8C] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F52B8C] to-[#E0167A] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">New password</h1>
        <p className="text-gray-600 mb-8 text-center">Choose a strong password for your account.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <input
              type="password"
              placeholder="New password (min 8 chars, uppercase, number)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#F52B8C] focus:outline-none transition"
              required
            />
            {password && validatePassword(password).valid && (
              <p className="text-xs text-green-600 ml-1">✓ Strong password</p>
            )}
          </div>

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
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
            {loading ? 'Updating...' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  );
}
