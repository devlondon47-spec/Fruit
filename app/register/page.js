'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    login({ name: form.name, email: form.email, phone: form.phone, role: 'user' });
    router.push('/');
  };

  const benefits = ['🎁 15% off first order', '🚀 Free express delivery', '👑 Exclusive member drops', '🌿 Personalized picks'];

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ width: '100%', maxWidth: 880, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
        {/* Left benefits */}
        <div>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>🍇</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: 16, lineHeight: 1.2 }}>
            Join the <span className="gold-gradient-text">Royale</span><br />Inner Circle
          </h1>
          <p style={{ color: 'var(--grey-light)', lineHeight: 1.8, marginBottom: 28 }}>
            Become a member and unlock the finest exotic fruit experience in India.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {benefits.map(b => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--grey-light)' }}>
                {b}
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div className="glass" style={{ borderRadius: 'var(--radius-xl)', padding: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: 24, color: 'var(--gold)' }}>Create Account</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[['name','Full Name','text','Your full name'],['email','Email Address','email','your@email.com'],['phone','Phone Number','tel','10-digit mobile'],['password','Password','password','Min 8 characters']].map(([k,l,t,ph]) => (
              <div key={k} className="form-group">
                <label className="form-label">{l} *</label>
                <input type={t} required className="form-input" placeholder={ph}
                  value={form[k]} onChange={e => setForm(p => ({...p, [k]: e.target.value}))} minLength={k==='password'?8:1} />
              </div>
            ))}
            <p style={{ fontSize: '0.75rem', color: 'var(--grey)', lineHeight: 1.5 }}>
              By joining, you agree to our Terms of Service and Privacy Policy.
            </p>
            <button type="submit" className="btn btn-gold btn-lg" style={{ justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Creating account...' : '✨ Create Royal Account'}
            </button>
          </form>
          <div style={{ marginTop: 20, textAlign: 'center', fontSize: '0.85rem', color: 'var(--grey)' }}>
            Already a member?{' '}
            <Link href="/login" style={{ color: 'var(--gold)', fontWeight: 600 }}>Sign In</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
