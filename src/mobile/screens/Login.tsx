import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { track, identify } from '@/lib/analytics';
import { Logo } from '../components/Logo';
import { PINK, WEB } from '../lib/constants';
import { openExternal } from '../lib/native';

const inputCls =
  'h-14 w-full rounded-2xl border-2 border-gray-200 bg-white px-4 text-[16px] outline-none transition placeholder:text-gray-400 focus:border-[#F52B8C]';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError('Login is not available in this build. Please try again later.');
      return;
    }
    setBusy(true);
    setError('');
    const { data, error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (err) {
      setError(err.message.toLowerCase().includes('invalid') ? 'Wrong email or password.' : err.message);
      track('app_login_failed');
      return;
    }
    if (data.user) identify(data.user.id);
    track('app_login');
    navigate('/home', { replace: true });
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white pt-safe">
      <div className="px-safe pt-2">
        <Link to="/welcome" className="-ml-2 inline-flex h-11 items-center gap-1.5 px-2 text-[15px] font-semibold text-gray-600">
          <ArrowLeft size={18} /> Back
        </Link>
      </div>
      <form onSubmit={submit} className="flex flex-1 flex-col px-safe pb-safe">
        <div className="flex-1 pt-6">
          <Logo size={30} />
          <h1 className="mt-6 text-[28px] font-extrabold tracking-tight">Welcome back</h1>
          <p className="mt-1.5 text-[15px] text-gray-500">Log in with the account you use on getnelsy.com.</p>

          <label className="mt-7 block">
            <span className="mb-1.5 block text-[13px] font-semibold text-gray-700">Email</span>
            <input
              className={inputCls}
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="mt-4 block">
            <span className="mb-1.5 block text-[13px] font-semibold text-gray-700">Password</span>
            <div className="relative">
              <input
                className={`${inputCls} pr-20`}
                type={show ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-1 top-1/2 flex h-11 -translate-y-1/2 items-center gap-1 px-3 text-[13px] font-semibold text-gray-500"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>
          <button
            type="button"
            onClick={() => openExternal(WEB.forgotPassword)}
            className="mt-1 h-11 text-[14px] font-semibold"
            style={{ color: PINK }}
          >
            Forgot password?
          </button>
          {error && (
            <p role="alert" className="mt-2 rounded-xl bg-[#FDECEC] px-3 py-2.5 text-[13px] font-medium text-[#B42318]">
              {error}
            </p>
          )}
        </div>

        <div className="pb-4">
          <button
            type="submit"
            disabled={busy || !email || !password}
            className="h-14 w-full rounded-full text-[16px] font-bold text-white transition active:scale-[0.98] disabled:opacity-40"
            style={{ backgroundColor: PINK }}
          >
            {busy ? 'Logging in...' : 'Log in'}
          </button>
          <p className="mt-3 text-center text-[15px] text-gray-500">
            New to Nelsy?{' '}
            <Link to="/signup" className="inline-flex h-11 items-center font-bold text-[#1A1A1A]">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
