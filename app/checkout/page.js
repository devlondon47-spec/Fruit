'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', pin: '', payment: 'upi' });
  const [placing, setPlacing] = useState(false);

  if (cartItems.length === 0) return (
    <div style={{ textAlign: 'center', padding: '120px 24px' }}>
      <div style={{ fontSize: '4rem', marginBottom: 16 }}>🛒</div>
      <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 8 }}>Your cart is empty</h2>
      <Link href="/shop" className="btn btn-gold" style={{ display: 'inline-flex', marginTop: 20 }}>Browse Fruits</Link>
    </div>
  );

  const delivery = 0;
  const tax = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + delivery + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPlacing(true);
    await new Promise(r => setTimeout(r, 1500));
    const order = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      total: grandTotal,
      address: form.address + ', ' + form.city,
      payment: form.payment,
      status: 'Processing',
      date: new Date().toISOString(),
    };
    const prev = JSON.parse(localStorage.getItem('fr_orders') || '[]');
    localStorage.setItem('fr_orders', JSON.stringify([order, ...prev]));
    clearCart();
    router.push('/orders');
  };

  const paymentMethods = [
    { value: 'upi', label: '📱 UPI / PhonePe / GPay' },
    { value: 'card', label: '💳 Credit / Debit Card' },
    { value: 'netbanking', label: '🏦 Net Banking' },
    { value: 'cod', label: '💵 Cash on Delivery' },
  ];

  return (
    <main style={{ minHeight: '100vh', paddingBottom: 80 }}>
      <div style={{ background: 'linear-gradient(to bottom, rgba(212,175,55,0.08), transparent)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '40px 24px 32px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
          Royal Checkout
        </h1>
        <p style={{ color: 'var(--grey)', marginTop: 8 }}>Secure · Fast · Trusted</p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>
        {/* Left — Form */}
        <form onSubmit={handleSubmit}>
          {/* Delivery */}
          <div style={{ background: 'var(--black-3)', border: '1px solid rgba(212,175,55,0.1)', borderRadius: 'var(--radius-lg)', padding: '28px', marginBottom: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: '20px', fontSize: '1.1rem' }}>
              📦 Delivery Details
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[['name','Full Name','text'], ['email','Email Address','email'], ['phone','Phone Number','tel']].map(([k,l,t]) => (
                <div key={k} className="form-group">
                  <label className="form-label">{l} *</label>
                  <input required type={t} className="form-input" placeholder={l} value={form[k]}
                    onChange={e => setForm(p => ({...p, [k]: e.target.value}))} />
                </div>
              ))}
              <div className="form-group">
                <label className="form-label">Delivery Address *</label>
                <textarea required className="form-input" rows={2} placeholder="Street, Apartment, Landmark"
                  value={form.address} onChange={e => setForm(p => ({...p, address: e.target.value}))}
                  style={{ resize: 'vertical' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input required className="form-input" placeholder="City" value={form.city}
                    onChange={e => setForm(p => ({...p, city: e.target.value}))} />
                </div>
                <div className="form-group">
                  <label className="form-label">PIN Code *</label>
                  <input required className="form-input" placeholder="6-digit PIN" value={form.pin} maxLength={6}
                    onChange={e => setForm(p => ({...p, pin: e.target.value}))} />
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div style={{ background: 'var(--black-3)', border: '1px solid rgba(212,175,55,0.1)', borderRadius: 'var(--radius-lg)', padding: '28px', marginBottom: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: '20px', fontSize: '1.1rem' }}>
              💳 Payment Method
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {paymentMethods.map(pm => (
                <label key={pm.value} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '14px 16px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                  border: form.payment === pm.value ? '1px solid rgba(212,175,55,0.5)' : '1px solid rgba(255,255,255,0.07)',
                  background: form.payment === pm.value ? 'rgba(212,175,55,0.08)' : 'transparent',
                  transition: 'var(--transition)',
                }}>
                  <input type="radio" name="payment" value={pm.value} checked={form.payment === pm.value}
                    onChange={() => setForm(p => ({...p, payment: pm.value}))}
                    style={{ accentColor: 'var(--gold)' }} />
                  <span style={{ fontSize: '0.9rem' }}>{pm.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-gold btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={placing}>
            {placing ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} />
                Placing your Royal Order...
              </span>
            ) : '✓ Place Order'}
          </button>
        </form>

        {/* Right — Order Summary */}
        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ background: 'var(--black-3)', border: '1px solid rgba(212,175,55,0.1)', borderRadius: 'var(--radius-lg)', padding: '28px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: '20px', fontSize: '1.1rem' }}>
              🛒 Order Summary ({cartItems.length} items)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '1.5rem' }}>{item.emoji}</span>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.3 }}>{item.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--grey)' }}>× {item.qty}</div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 600, color: 'var(--gold)', whiteSpace: 'nowrap' }}>
                    ₹{(item.price * item.qty).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[['Subtotal', `₹${cartTotal.toLocaleString()}`], ['Delivery', 'FREE'], ['GST (5%)', `₹${tax.toLocaleString()}`]].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--grey)' }}>
                  <span>{l}</span>
                  <span style={{ color: v === 'FREE' ? 'var(--success)' : 'inherit' }}>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.15rem', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <span>Total</span>
                <span style={{ color: 'var(--gold)' }}>₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Coupon */}
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <label className="form-label" style={{ marginBottom: 8, display: 'block' }}>Have a coupon?</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input className="form-input" placeholder="e.g. ROYAL15" style={{ flex: 1 }} />
                <button type="button" className="btn btn-outline btn-sm" style={{ flexShrink: 0 }}>Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
