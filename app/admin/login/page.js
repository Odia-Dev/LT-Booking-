"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [step, setStep] = useState(1); // 1: Login, 2: 2FA
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setStep(2); // Move to 2FA
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handle2FA = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/admin/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 bg-[#161B22] p-10 rounded-3xl border border-gray-800 shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
            Laxmi Toyota <span className="text-[#ff2b2b]">Admin</span>
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {step === 1 ? 'Authorized Personnel Only' : 'Enter 2FA Verification Code'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full bg-[#0B0F19] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff2b2b] transition-colors"
                  placeholder="admin@laxmitoyota.com"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full bg-[#0B0F19] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff2b2b] transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-xl text-white bg-[#ff2b2b] hover:bg-black transition-all uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handle2FA}>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Verification Code</label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block w-full bg-[#0B0F19] border border-gray-800 rounded-xl px-4 py-3 text-white text-center text-2xl tracking-[0.5em] font-mono focus:outline-none focus:border-[#ff2b2b] transition-colors"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>
              <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest">
                Check your registered device for the code
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-xl text-white bg-[#ff2b2b] hover:bg-black transition-all uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>
            
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-[10px] text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
            >
              Back to Login
            </button>
          </form>
        )}

        <div className="text-center pt-4">
          <Link href="/" className="text-[10px] text-gray-600 hover:text-gray-400 uppercase tracking-widest transition-colors">
            Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
