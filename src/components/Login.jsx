import { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Lock, LogIn } from 'lucide-react';

const USERNAME = 'Farm@KinGAut0mat1on';
const PASSWORD = 'Farma@2007#$';

export default function Login({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (username === USERNAME && password === PASSWORD) {
        localStorage.setItem('farmaking_logged_in', 'true');
        onSuccess();
      } else {
        setError('Invalid credentials. Please try again.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      <div className="relative h-[55vh] w-full overflow-hidden">
        <Spline
          scene="https://prod.spline.design/LU2mWMPbF3Qi1Qxh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/20 to-neutral-950" />
        <div className="absolute inset-0 flex items-end justify-center pb-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 ring-1 ring-emerald-400/30">
              <Lock className="w-4 h-4 text-emerald-300" />
              <span className="text-emerald-200 text-sm tracking-wide">FarmaKing Automation Dashboard</span>
            </div>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Secure Access Portal
            </h1>
            <p className="mt-2 text-neutral-300 max-w-xl mx-auto">
              Manage tractor models, dealers, and customers with real-time pricing insights.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 -mt-16">
        <div className="w-full max-w-md bg-neutral-900/80 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-white/10 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-neutral-300 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-800/80 text-white placeholder-neutral-500 outline-none ring-1 ring-white/10 focus:ring-emerald-500/40 transition"
                placeholder="Enter username"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-800/80 text-white placeholder-neutral-500 outline-none ring-1 ring-white/10 focus:ring-emerald-500/40 transition"
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </div>
            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium shadow-lg shadow-emerald-900/30 hover:from-emerald-400 hover:to-teal-400 active:scale-[.99] transition"
            >
              <LogIn className="w-5 h-5" />
              {loading ? 'Verifying…' : 'Sign in'}
            </button>
            <p className="text-xs text-neutral-400 text-center">
              Use the provided credentials to access the dashboard.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
