'use client';
import Link from 'next/link';

const team = [
  { name: 'Aryan Kapoor', role: 'Founder & Sourcing Expert', emoji: '👑', bio: 'Former chef, now on a mission to bring global luxury fruits to Indian tables.' },
  { name: 'Priya Rajan', role: 'Head of Quality Control', emoji: '🔬', bio: 'Food scientist with 15 years of expertise in organic certification and cold chain logistics.' },
  { name: 'Miguel Santos', role: 'Global Farm Relations', emoji: '🌍', bio: 'Travels 200+ days a year across 12 countries to forge direct partnerships with elite orchards.' },
];

const milestones = [
  { year: '2019', title: 'Founded in Mumbai', desc: 'Launched with 5 exotic varieties and a vision.' },
  { year: '2020', title: '10,000 customers', desc: 'Crossed our first milestone during the pandemic — people craved quality.' },
  { year: '2022', title: 'GI & Organic Certified', desc: 'All products certified by FSSAI and Global G.A.P.' },
  { year: '2024', title: '50+ Varieties, 12 Countries', desc: 'The royal collection spans every corner of the globe.' },
];

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', paddingBottom: 80 }}>
      {/* Hero */}
      <section style={{
        padding: '80px 24px 60px', textAlign: 'center',
        background: 'linear-gradient(to bottom, rgba(212,175,55,0.1), transparent)',
        borderBottom: '1px solid rgba(212,175,55,0.1)',
      }}>
        <div className="badge badge-gold" style={{ marginBottom: 20 }}>✦ Our Story</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: 20, lineHeight: 1.2 }}>
          We Believe Every Fruit<br />Should Be <span className="gold-gradient-text">Extraordinary</span>
        </h1>
        <p style={{ color: 'var(--grey-light)', maxWidth: 560, margin: '0 auto', lineHeight: 1.9, fontSize: '1rem' }}>
          Fruit Royale began as a rebellion against mediocre fruit. Tasteless mangoes. Imported berries that rot overnight. 
          We knew the world's orchards produced something far more magnificent — and we set out to bring it home.
        </p>
      </section>

      {/* Mission Cards */}
      <section className="section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {[
            { icon: '🌏', title: 'Our Mission', text: 'To democratise access to the world\'s finest exotic fruits — ethically sourced, scientifically preserved, and delivered with love.' },
            { icon: '💚', title: 'Our Values', text: 'Sustainability. Farmer fairness. Radical freshness. Zero compromise on quality, zero compromise on the planet.' },
            { icon: '🔬', title: 'Our Promise', text: 'Every item passes 27-point quality checks. If it doesn\'t meet our standard, it doesn\'t reach your door.' },
          ].map(c => (
            <div key={c.title} className="card" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>{c.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 10, fontSize: '1.1rem' }}>{c.title}</h3>
              <p style={{ color: 'var(--grey-light)', fontSize: '0.88rem', lineHeight: 1.8 }}>{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: 'var(--black-2)', padding: '80px 24px', borderTop: '1px solid rgba(212,175,55,0.08)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.2rem)' }}>Our Journey</h2>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(212,175,55,0.2)', transform: 'translateX(-50%)' }} />
            {milestones.map((m, i) => (
              <div key={m.year} style={{ display: 'flex', gap: 40, marginBottom: 40, flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', alignItems: 'center' }}>
                <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                  <div style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 900 }}>{m.year}</div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{m.title}</div>
                  <div style={{ color: 'var(--grey)', fontSize: '0.85rem' }}>{m.desc}</div>
                </div>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, boxShadow: '0 0 12px rgba(212,175,55,0.5)' }} />
                <div style={{ flex: 1 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="badge badge-gold" style={{ marginBottom: 16 }}>✦ The People</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.2rem)' }}>Meet the Cultivators</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {team.map(m => (
            <div key={m.name} className="card" style={{ padding: '32px', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(10,10,10,0.5))', border: '2px solid rgba(212,175,55,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 20px' }}>
                {m.emoji}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 4 }}>{m.name}</h3>
              <p style={{ color: 'var(--gold)', fontSize: '0.78rem', marginBottom: 12, letterSpacing: '0.5px' }}>{m.role}</p>
              <p style={{ color: 'var(--grey)', fontSize: '0.85rem', lineHeight: 1.7 }}>{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '0 24px 40px' }}>
        <Link href="/shop" className="btn btn-gold btn-lg">Explore the Collection →</Link>
      </div>
    </main>
  );
}
