'use client';
import { useState } from 'react';
import Link from 'next/link';
import ProductCard from './components/ProductCard';
import { fruits, testimonials } from './data/fruits';

const stats = [
  { value: '50+', label: 'Exotic Varieties' },
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '24h', label: 'Farm to Door' },
  { value: '12', label: 'Countries Sourced' },
];

const features = [
  { icon: '🌿', title: 'Certified Organic', desc: 'No pesticides. No chemicals. Pure nature.' },
  { icon: '❄️', title: 'Cold Chain Delivery', desc: 'Temperature-controlled from farm to doorstep.' },
  { icon: '🌍', title: 'Global Sourcing', desc: 'Directly partnered with farms in 12 countries.' },
  { icon: '👑', title: 'Royal Grade Only', desc: 'Only the top 5% of each harvest makes the cut.' },
];

export default function HomePage() {
  const featured = fruits.filter(f => f.featured);
  const [hoveredStat, setHoveredStat] = useState(null);

  return (
    <main>
      {/* ===== HERO ===== */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: `
          radial-gradient(ellipse at 70% 40%, rgba(212,175,55,0.12) 0%, transparent 55%),
          radial-gradient(ellipse at 20% 80%, rgba(212,175,55,0.07) 0%, transparent 45%),
          var(--black)
        `,
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', right: '-5%', top: '10%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', left: '-10%', bottom: '5%',
          width: 400, height: 400, borderRadius: '50%',
          border: '1px solid rgba(212,175,55,0.1)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          {/* Left */}
          <div className="animate-up">
            <div className="badge badge-gold" style={{ marginBottom: 20 }}>
              ✦ India's #1 Luxury Fruit Market
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
              Experience <br />
              <span className="gold-gradient-text">Fruits Fit</span>
              <br />for Royalty
            </h1>
            <p style={{ color: 'var(--grey-light)', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: 480, marginBottom: 36 }}>
              Hand-picked from the world's most prized orchards. Delivered within 24 hours, still bearing the morning dew.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/shop" className="btn btn-gold btn-lg">
                🛒 Shop Now
              </Link>
              <Link href="/about" className="btn btn-outline btn-lg">
                Our Story
              </Link>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: '20px', marginTop: '36px', flexWrap: 'wrap' }}>
              {['🌿 100% Organic', '🚀 Free Delivery', '💎 GI Certified'].map(t => (
                <span key={t} style={{ fontSize: '0.8rem', color: 'var(--grey)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right — floating fruit display */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', padding: '40px 0' }}>
            {featured.slice(0,6).map((fruit, i) => (
              <Link key={fruit.id} href={`/shop/${fruit.id}`} style={{ textDecoration: 'none' }}>
                <div className="glass" style={{
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  width: 130,
                  animation: `float ${3 + i * 0.4}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                }}>
                  <span style={{ fontSize: '3rem' }}>{fruit.emoji}</span>
                  <div style={{ fontWeight: 600, fontSize: '0.78rem', textAlign: 'center', color: 'var(--white)' }}>
                    {fruit.name.split(' ').slice(0,2).join(' ')}
                  </div>
                  <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem' }}>
                    ₹{fruit.price.toLocaleString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, animation: 'float 2s ease-in-out infinite' }}>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
          <span style={{ fontSize: '0.7rem', color: 'var(--grey)', letterSpacing: '2px', textTransform: 'uppercase' }}>Scroll</span>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section style={{ background: 'var(--black-2)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0' }}>
          {stats.map((s, i) => (
            <div key={i}
              onMouseEnter={() => setHoveredStat(i)}
              onMouseLeave={() => setHoveredStat(null)}
              style={{
                textAlign: 'center', padding: '24px',
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                transition: 'var(--transition)',
                background: hoveredStat === i ? 'rgba(212,175,55,0.04)' : 'transparent',
              }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--gold)' }}>
                {s.value}
              </div>
              <div style={{ color: 'var(--grey)', fontSize: '0.8rem', marginTop: 4, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="section">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="badge badge-gold" style={{ marginBottom: 16 }}>✦ Our Finest</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: 12 }}>
            Featured Collection
          </h2>
          <div className="divider" style={{ margin: '0 auto 16px' }} />
          <p style={{ color: 'var(--grey)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Curated from seasonal harvests across the globe. Each fruit tells a story of terroir and craftsmanship.
          </p>
        </div>
        <div className="product-grid">
          {featured.map(f => <ProductCard key={f.id} product={f} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/shop" className="btn btn-outline btn-lg">
            View All Products →
          </Link>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section style={{ background: 'var(--black-2)', borderTop: '1px solid rgba(212,175,55,0.08)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="badge badge-gold" style={{ marginBottom: 16 }}>✦ The Royale Difference</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: 12 }}>
              Why Choose Fruit Royale?
            </h2>
            <div className="divider" style={{ margin: '0 auto' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {features.map((f, i) => (
              <div key={i} className="card glass" style={{ padding: '32px 28px', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '10px', color: 'var(--gold)' }}>
                  {f.title}
                </h3>
                <p style={{ color: 'var(--grey-light)', fontSize: '0.88rem', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="badge badge-gold" style={{ marginBottom: 16 }}>✦ Royal Reviews</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: 12 }}>
            What Connoisseurs Say
          </h2>
          <div className="divider" style={{ margin: '0 auto' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {testimonials.map(t => (
            <div key={t.id} className="card" style={{ padding: '28px', borderRadius: 'var(--radius-lg)' }}>
              <div className="stars" style={{ marginBottom: 16 }}>{'★'.repeat(t.rating)}</div>
              <p style={{ color: 'var(--grey-light)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: 20, fontStyle: 'italic' }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.05))',
                  border: '1px solid rgba(212,175,55,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
                }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                  <div style={{ color: 'var(--grey)', fontSize: '0.75rem' }}>{t.role} · {t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section style={{
        margin: '0 24px 80px',
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)',
        border: '1px solid rgba(212,175,55,0.25)',
        padding: 'clamp(40px, 6vw, 80px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: 1280 - 48,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎁</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: 16 }}>
          First Order? Enjoy <span className="gold-gradient-text">15% Off</span>
        </h2>
        <p style={{ color: 'var(--grey-light)', maxWidth: 500, margin: '0 auto 28px', lineHeight: 1.8 }}>
          Join thousands of fruit connoisseurs. Use code <strong style={{ color: 'var(--gold)' }}>ROYAL15</strong> at checkout.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/register" className="btn btn-gold btn-lg">Create Account</Link>
          <Link href="/shop" className="btn btn-outline btn-lg">Browse First</Link>
        </div>
      </section>
    </main>
  );
}
