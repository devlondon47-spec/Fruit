'use client';
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      background: 'var(--black-2)',
      borderTop: '1px solid rgba(212,175,55,0.15)',
      padding: '64px 24px 32px',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '48px', marginBottom: '48px' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: '2rem' }}>🍇</span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, background: 'linear-gradient(135deg, #f0d060, #d4af37)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>FRUIT ROYALE</div>
            </div>
            <p style={{ color: 'var(--grey)', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: 260 }}>
              The world's finest exotic fruits, delivered to your door. Farm-to-table. Chemical-free. 
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {['🐦', '📸', '▶️', '💼'].map((icon, i) => (
                <button key={i} style={{
                  width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', cursor: 'pointer', fontSize: '0.9rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{icon}</button>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 16, fontSize: '1rem' }}>Shop</h4>
            {['Tropical Fruits', 'Exotic Collection', 'Berries', 'Citrus', 'Stone Fruits', 'Gift Boxes'].map(l => (
              <Link key={l} href="/shop" style={{ display: 'block', color: 'var(--grey)', fontSize: '0.85rem', marginBottom: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'var(--grey)'}
              >{l}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 16, fontSize: '1rem' }}>Company</h4>
            {[['About Us', '/about'], ['Contact', '/contact'], ['Blog', '#'], ['Careers', '#'], ['Press', '#']].map(([l, href]) => (
              <Link key={l} href={href} style={{ display: 'block', color: 'var(--grey)', fontSize: '0.85rem', marginBottom: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'var(--grey)'}
              >{l}</Link>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 8, fontSize: '1rem' }}>Royal Newsletter</h4>
            <p style={{ color: 'var(--grey)', fontSize: '0.8rem', marginBottom: 16, lineHeight: 1.6 }}>
              Get exclusive drops, seasonal harvests, and member-only offers.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="email"
                placeholder="your@email.com"
                className="form-input"
                style={{ flex: 1, padding: '10px 14px', fontSize: '0.8rem' }}
              />
              <button className="btn btn-gold btn-sm" style={{ padding: '10px 16px', flexShrink: 0 }}>→</button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: 'var(--grey)', fontSize: '0.78rem' }}>
            © {year} Fruit Royale. All rights reserved. Made with 🍇 in India.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(l => (
              <span key={l} style={{ color: 'var(--grey)', fontSize: '0.78rem', cursor: 'pointer' }}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
