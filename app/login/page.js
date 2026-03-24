'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 800));
    login({ name: 'Royal Member', email: form.email, role: 'user' });
    router.push('/dashboard');
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: '3rem' }}>🍇</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginTop: 12, marginBottom: 8 }}>
            Welcome Back
          </h1>
          <p style={{ color: 'var(--grey)' }}>Sign in to your Royal account</p>
        </div>

        <div className="glass" style={{ borderRadius: 'var(--radius-xl)', padding: '36px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" required className="form-input" placeholder="you@example.com"
                value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" required className="form-input" placeholder="Your password"
                value={form.password} onChange={e => setForm(p => ({...p, password: e.target.value}))} />
            </div>
            {error && <p style={{ color: 'var(--error)', fontSize: '0.82rem' }}>{error}</p>}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--gold)', cursor: 'pointer' }}>Forgot password?</span>
            </div>
            <button type="submit" className="btn btn-gold" style={{ justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
            <p style={{ color: 'var(--grey)', fontSize: '0.85rem' }}>
              Not a member?{' '}
              <Link href="/register" style={{ color: 'var(--gold)', fontWeight: 600 }}>Join Fruit Royale</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
