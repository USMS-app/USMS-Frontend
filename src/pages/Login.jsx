import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, RefreshCcw } from 'lucide-react';
import logo from '../assets/images/logo.jpg';
const ROLES = [
  { key: 'admin', label: 'Admin' },
  { key: 'teacher', label: 'Teacher' },
  { key: 'student', label: 'Student/Parents' },
];

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const captcha = useMemo(() => generateCaptcha(), [role]);

  function generateCaptcha() {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  const [captchaValue, setCaptchaValue] = useState(captcha);
  function refreshCaptcha() {
    setCaptchaValue(generateCaptcha());
    setCaptchaInput('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (captchaInput !== captchaValue) {
      setError('Invalid captcha');
      return;
    }
    setLoading(true);
    try {
      // TODO: Integrate with your auth API
      // await api.post('/auth/login', { username, password, role })
      // Temporary: navigate to dashboard for student/parents
      if (role === 'student') {
        navigate('/dashboard');
      } else {
        alert(`Login submitted for ${username} as ${role}`);
      }
    } catch (err) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FEFEFC] p-4">
      <div className="w-full max-w-2xl md:max-w-3xl">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="USMS"
            className=" sm:h-20 md:h-24 w-auto max-w-[140px] sm:max-w-[200px] md:max-w-[250px] object-contain"
          />
        </div>

        {/* Card */}
        <div className="rounded-3xl shadow-2xl bg-blue-900 text-white p-6 sm:p-8 md:p-10 border border-blue-800">
          {/* Tabs */}
          <div className="bg-blue-800/60 rounded-lg p-1 grid grid-cols-3 gap-1">
            {ROLES.map((r, idx) => {
              const active = role === r.key;
              const divider = idx === 1 ? ' border-x border-blue-700/50' : '';
              return (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setRole(r.key)}
                  className={`${active ? 'bg-amber-400 text-blue-900' : 'bg-blue-700 text-white'} min-w-0 w-full h-11 sm:h-12 rounded font-semibold text-xs sm:text-[15px] leading-4 px-2 sm:px-3 text-center whitespace-normal break-words${divider}`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Username */}
            <div>
              <label className="block text-[18px] tracking-wide text-slate-200 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md px-3.5 py-3 text-blue-900 placeholder-slate-400 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Enter Username"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[18px] tracking-wide text-slate-200 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md px-3.5 py-3 pr-12 text-blue-900 placeholder-slate-400 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="Enter Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-2 my-auto h-9 w-9 grid place-items-center rounded text-blue-900 bg-slate-200 hover:bg-slate-300"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Captcha header row */}
            <div className="flex items-center justify-between">
              <label className="text-xs tracking-wide text-slate-200">Enter captcha</label>
              <a href="#" className="text-[11px] text-slate-200/80 hover:text-white">Forgot password? <span className="underline">Click here</span></a>
            </div>

            {/* Captcha row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="sm:flex-1 grid grid-cols-[1fr_auto] gap-2">
                <div className="rounded-md bg-slate-200 text-blue-900 font-semibold h-12 grid place-items-center select-none">
                  {captchaValue}
                </div>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="w-12 h-12 rounded-md bg-slate-300 text-blue-900 grid place-items-center hover:bg-slate-200"
                  aria-label="Refresh Captcha"
                  title="Refresh Captcha"
                >
                  <RefreshCcw className="w-5 h-5" />
                </button>
              </div>
              <input
                type="text"
                inputMode="numeric"
                pattern="\\d{6}"
                maxLength={6}
                value={captchaInput}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/\D/g, '');
                  setCaptchaInput(onlyDigits);
                }}
                className="w-full sm:w-64 sm:flex-none rounded-md px-3.5 py-3 text-blue-900 placeholder-slate-400 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Enter Captcha"
                required
                aria-label="Captcha input (numbers only)"
              />
            </div>

            {error && <p className="text-sm text-amber-300">{error}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-amber-400 hover:bg-amber-500 text-blue-900 font-bold py-4 rounded-md text-lg disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
