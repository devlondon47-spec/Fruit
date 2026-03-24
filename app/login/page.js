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
    setLoading(false);
    
    // Strict mock credential checking
    const email = form.email.toLowerCase().trim();
    const pass = form.password.trim();

    // 1. Check registered dynamic users in localStorage
    try {
      const users = JSON.parse(localStorage.getItem('fr_users') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === pass);
      if (foundUser) {
        login({ name: foundUser.name, email: foundUser.email, role: foundUser.role || 'user' });
        const route = foundUser.role === 'admin' ? '/admin' : foundUser.role === 'vendor' ? '/vendor' : foundUser.role === 'superadmin' ? '/superadmin' : '/dashboard';
        router.push(route);
        return;
      }
      // If email exists but password wrong
      if (users.find(u => u.email === email)) {
        setError('Invalid password. Please try again.');
        return;
      }
    } catch {}

    // 2. Fallback to hardcoded demo credentials
    const demoRoutes = {
      'admin@fruitroyale.com': { role: 'admin', path: '/admin', name: 'Platform Admin' },
      'vendor@fruitroyale.com': { role: 'vendor', path: '/vendor', name: 'Mango Orchards' },
      'super@fruitroyale.com': { role: 'superadmin', path: '/superadmin', name: 'Super Admin' },
      'user@fruitroyale.com': { role: 'user', path: '/dashboard', name: 'Royal Customer' }
    };

    if (demoRoutes[email]) {
      if (pass !== 'pass123') {
        setError('Invalid password. Please try again.');
        return;
      }
      login({ name: demoRoutes[email].name, email, role: demoRoutes[email].role });
      router.push(demoRoutes[email].path);
    } else {
      setError('Account not found. Please register first.');
    }
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
              <input type="email" required className="form-input" placeholder="user@fruitroyale.com"
                value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" required className="form-input" placeholder="pass123"
                value={form.password} onChange={e => setForm(p => ({...p, password: e.target.value}))} />
            </div>
            {error && <p style={{ color: 'var(--error)', fontSize: '0.85rem', background: 'rgba(255,0,0,0.1)', padding: '10px', borderRadius: 6 }}>{error}</p>}
            
            <button type="submit" className="btn btn-gold" style={{ justifyContent: 'center', marginTop: 10 }} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
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
