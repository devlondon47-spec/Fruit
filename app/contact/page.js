'use client';
import { useState } from 'react';

const faqs = [
  { q: 'How soon will my fruits arrive?', a: 'We guarantee farm-to-door within 24 hours for metro cities, and 48 hours for Tier-2 cities. All deliveries use cold-chain logistics.' },
  { q: 'Are your fruits really organic?', a: 'Yes. Every product on Fruit Royale is FSSAI-approved and Global G.A.P. certified. We also do third-party lab tests quarterly.' },
  { q: 'What if my order arrives damaged?', a: 'Just click a photo and email us within 2 hours of delivery. We\'ll send a full replacement — no questions asked.' },
  { q: 'Do you ship pan-India?', a: 'Currently we deliver to 80+ cities. Enter your PIN at checkout to check availability.' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise(r => setTimeout(r, 800));
    setSent(true);
  };

  return (
    <main style={{ minHeight: '100vh', paddingBottom: 80 }}>
      <div style={{ background: 'linear-gradient(to bottom, rgba(212,175,55,0.08), transparent)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '48px 24px 36px', textAlign: 'center' }}>
        <div className="badge badge-gold" style={{ marginBottom: 14 }}>✦ Get in Touch</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 12 }}>Contact the Royale</h1>
        <p style={{ color: 'var(--grey)', maxWidth: 440, margin: '0 auto' }}>We respond within 2 business hours. Always human, never bots.</p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'start' }}>
        {/* Form */}
        <div>
          {!sent ? (
            <div className="glass" style={{ borderRadius: 'var(--radius-xl)', padding: '32px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 24, fontSize: '1.2rem' }}>Send a Message</h3>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[['name','Your Name','text'],['email','Email Address','email'],['subject','Subject','text']].map(([k,l,t]) => (
                  <div key={k} className="form-group">
                    <label className="form-label">{l} *</label>
                    <input type={t} required className="form-input" placeholder={l}
                      value={form[k]} onChange={e => setForm(p => ({...p, [k]: e.target.value}))} />
                  </div>
                ))}
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea required rows={5} className="form-input" placeholder="Tell us how we can help..."
                    value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))}
                    style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn btn-gold" style={{ justifyContent: 'center' }}>
                  Send Message →
                </button>
              </form>
            </div>
          ) : (
            <div className="glass" style={{ borderRadius: 'var(--radius-xl)', padding: '48px 32px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 8 }}>Message Sent!</h3>
              <p style={{ color: 'var(--grey-light)', lineHeight: 1.7 }}>
                Thank you for reaching out. Our team will respond within 2 hours during business hours.
              </p>
              <button onClick={() => setSent(false)} className="btn btn-outline btn-sm" style={{ marginTop: 24 }}>Send Another</button>
            </div>
          )}
        </div>

        {/* Right — Info + FAQ */}
        <div>
          {/* Contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
            {[
              { icon: '📧', label: 'Email', value: 'hello@fruitroyale.com' },
              { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
              { icon: '🏢', label: 'Office', value: 'Bandra West, Mumbai, Maharashtra — 400050' },
              { icon: '⏰', label: 'Support Hours', value: 'Mon–Sat, 9 AM – 9 PM IST' },
            ].map(c => (
              <div key={c.label} className="card" style={{ padding: '20px 24px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--grey)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>{c.label}</div>
                  <div style={{ fontSize: '0.9rem' }}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 16, fontSize: '1.1rem' }}>Frequently Asked</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="card" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{
                  width: '100%', textAlign: 'left', padding: '16px 20px', background: 'none', color: 'var(--white)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, cursor: 'pointer',
                  fontSize: '0.88rem', fontWeight: 600,
                }}>
                  {faq.q}
                  <span style={{ color: 'var(--gold)', flexShrink: 0, fontSize: '1.1rem', transition: 'transform 0.2s', transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {open === i && (
                  <div style={{ padding: '0 20px 16px', color: 'var(--grey-light)', fontSize: '0.85rem', lineHeight: 1.8 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
